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
  
  // Estados para controlar el scroll
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      // No hacer swap si estamos en modo scroll
      if (isScrollingRef.current || order.current.length < 2) return;

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

    // Función mejorada para swap rápido con scroll
    const quickSwap = () => {
      if (order.current.length < 2) return;
      
      const [front, ...rest] = order.current;
      
      // Matar cualquier animación en curso
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Actualizar orden después de completar la animación
          order.current = [...rest, front];
        }
      });
      
      // Animar todas las cartas de forma simultánea y rápida
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          zIndex: slot.zIndex,
          duration: 0.4,
          ease: 'power2.out'
        }, 0);
      });
      
      // Mover la carta frontal directamente al final SIN animación de caída
      const frontEl = refs[front].current!;
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.to(frontEl, {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        zIndex: backSlot.zIndex,
        duration: 0.4,
        ease: 'power2.out'
      }, 0);
    };
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Debounce el scroll para evitar múltiples ejecuciones
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
      
      scrollDebounceRef.current = setTimeout(() => {
        // Solo procesar si el scroll es significativo
        if (Math.abs(e.deltaY) > 20 && !isScrollingRef.current) {
          isScrollingRef.current = true;
          
          // Detener animación automática
          if (tlRef.current) {
            tlRef.current.kill();
            tlRef.current = null;
          }
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
          }
          
          // Ejecutar swap rápido
          quickSwap();
          
          // Resetear estado después de un breve delay
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 500);
        }
        
        // Reiniciar animación automática después de inactividad
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          if (!isScrollingRef.current && !intervalRef.current) {
            intervalRef.current = window.setInterval(swap, delay);
          }
        }, 2000);
      }, 50); // Debounce de 50ms
    };

    // Inicializar
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    const node = container.current!;

    if (pauseOnHover) {
      const pause = () => {
        if (tlRef.current) tlRef.current.pause();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      };
      
      const resume = () => {
        if (!isScrollingRef.current) {
          if (tlRef.current && tlRef.current.paused()) {
            tlRef.current.play();
          }
          if (!intervalRef.current) {
            intervalRef.current = window.setInterval(swap, delay);
          }
        }
      };
      
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      node.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        node.removeEventListener('wheel', handleWheel);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (tlRef.current) tlRef.current.kill();
      };
    } else {
      node.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        node.removeEventListener('wheel', handleWheel);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (tlRef.current) tlRef.current.kill();
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