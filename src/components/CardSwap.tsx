import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef
} from 'react';
import type { ReactElement, ReactNode, RefObject } from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border-2 border-green-500/60 bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] shadow-2xl shadow-green-500/20 ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    style={{
      ...rest.style,
      filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))',
      WebkitBackfaceVisibility: 'hidden',
      WebkitTransform: 'translateZ(0)',
      transform: 'translateZ(0)'
    }}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 30,
  verticalDistance = 60,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 2,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement | null>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    // Control manual con scroll del mouse
    const node = container.current!;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let isScrolling = false;
    
    const quickSwap = () => {
      if (order.current.length < 2 || isScrolling) return;
      
      isScrolling = true;
      const [front, ...rest] = order.current;
      
      // Animación rápida y directa sin el efecto de caída
      const tl = gsap.timeline({
        onComplete: () => {
          isScrolling = false;
        }
      });
      
      // Mover todas las cartas directamente a sus nuevas posiciones
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          zIndex: slot.zIndex,
          duration: 0.6,
          ease: 'power2.out'
        }, 0);
      });
      
      // Mover la carta frontal al final
      const frontEl = refs[front].current!;
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.to(frontEl, {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        zIndex: backSlot.zIndex,
        duration: 0.6,
        ease: 'power2.out'
      }, 0);
      
      tl.call(() => {
        order.current = [...rest, front];
      });
    };
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Pausar animación automática
      tlRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      // Ejecutar swap rápido en la dirección del scroll
      if (Math.abs(e.deltaY) > 10 && !isScrolling) {
        quickSwap();
      }
      
      // Reiniciar animación automática después de 3 segundos sin scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isScrolling) {
          intervalRef.current = window.setInterval(swap, delay);
        }
      }, 3000);
    };

    if (pauseOnHover) {
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      node.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        node.removeEventListener('wheel', handleWheel);
        clearTimeout(scrollTimeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      node.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        node.removeEventListener('wheel', handleWheel);
        clearTimeout(scrollTimeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs.length, config.durDrop, config.durMove, config.durReturn, config.ease, config.promoteOverlap, config.returnDelay]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center w-full h-full perspective-[1200px] overflow-visible"
      style={{ 
        width: typeof width === 'number' ? width + 200 : width, 
        height: typeof height === 'number' ? height + 100 : height,
        transformStyle: 'preserve-3d'
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
