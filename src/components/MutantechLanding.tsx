import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Code, 
  Smartphone, 
  Globe, 
  MessageSquare, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import ContactForm from './ContactForm';
import CardSwap, { Card } from './CardSwap';
import LogoLoop, { type LogoItem } from './LogoLoop';
import Folder from './Folder';

const MutantechLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Hook para detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Datos del equipo con portafolios
  const team = [
    { 
      name: 'Josué Brazales', 
      role: 'Ingeniero de TI', 
      specialty: 'QA Tester',
      portfolio: '#', // Pendiente
      image: 'https://via.placeholder.com/300x400/1f2937/10b981?text=Josué+B' // Placeholder temporal
    },
    { 
      name: 'Jair Sánchez', 
      role: 'Ingeniero de TI', 
      specialty: 'Mobile Developer',
      portfolio: 'https://jairsanchez.vercel.app/',
      image: 'https://res.cloudinary.com/dq8at3uoc/image/upload/v1758655291/Captura_de_pantalla_2025-09-23_142043_homyjo.png'
    },
    { 
      name: 'Josué Espinoza', 
      role: 'Ingeniero de TI', 
      specialty: 'Backend Developer',
      portfolio: 'https://josueespinoza.netlify.app/',
      image: 'https://res.cloudinary.com/dq8at3uoc/image/upload/v1758655338/Captura_de_pantalla_2025-09-23_142201_kjshwg.png'
    },
    { 
      name: 'Raúl Faz', 
      role: 'Ingeniero de TI', 
      specialty: 'Frontend Developer',
      portfolio: '#', // Pendiente
      image: 'https://via.placeholder.com/300x400/1f2937/10b981?text=Raúl+F' // Placeholder temporal
    },
    { 
      name: 'Lesly Gaibor', 
      role: 'Ingeniera de TI', 
      specialty: 'UI/UX Designer',
      portfolio: 'https://portafolio-lesly.netlify.app/',
      image: 'https://res.cloudinary.com/dq8at3uoc/image/upload/v1758655405/Captura_de_pantalla_2025-09-23_142257_fysxkt.png'
    }
  ];

  // Servicios
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Desarrollo de Software a Medida',
      description: 'Creamos soluciones personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio.',
      features: ['Análisis de requerimientos', 'Arquitectura escalable', 'Testing completo', 'Mantenimiento continuo']
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Desarrollo Móvil',
      description: 'Aplicaciones nativas e híbridas para iOS y Android con las últimas tecnologías y mejores prácticas.',
      features: ['Apps nativas', 'Cross-platform', 'UI/UX optimizada', 'Store deployment']
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Administración de Páginas Web',
      description: 'Gestión completa de sitios web, desde el desarrollo hasta el mantenimiento y optimización.',
      features: ['CMS personalizado', 'SEO optimización', 'Hosting y dominio', 'Actualizaciones regulares']
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Chatbots Inteligentes',
      description: 'Automatiza la atención al cliente con chatbots inteligentes que mejoran la experiencia del usuario.',
      features: ['IA conversacional', 'Integración multicanal', 'Analytics avanzados', 'Personalización completa']
    }
  ];

  // Tecnologías principales
  const technologies = [
    'JavaScript', 'TypeScript', 'PHP', 'Java', 'Python', 'React', 'Node.js', 
    'Laravel', 'Spring Boot', 'MySQL', 'MongoDB', 'AWS', 'Docker'
  ];

  // Estado para el tooltip de tecnología
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Tecnologías adicionales con LogoLoop
  const getAdditionalTechnologyLogos = (): LogoItem[] => {
    const baseUrl = 'https://res.cloudinary.com/dq8at3uoc/image/upload';
    
    const additionalTechnologies = [
      { name: 'JavaScript', src: `${baseUrl}/v1758658967/javascript_anvpik.svg`, alt: 'JavaScript' },
      { name: 'TypeScript', src: `${baseUrl}/v1758658997/typescript_t62nnw.svg`, alt: 'TypeScript' },
      { name: 'React', src: isDarkMode ? `${baseUrl}/v1758658987/React_dark_wnxmlp.svg` : `${baseUrl}/v1758658990/React_light_jgqoyv.svg`, alt: 'React' },
      { name: 'Node.js', src: `${baseUrl}/v1758658975/nodejs_trtdbc.svg`, alt: 'Node.js' },
      { name: 'PHP', src: isDarkMode ? `${baseUrl}/v1758658981/Php_dark_plaq8j.svg` : `${baseUrl}/v1758658982/Php_light_m16uti.svg`, alt: 'PHP' },
      { name: 'Java', src: `${baseUrl}/v1758658967/java_zklgre.svg`, alt: 'Java' },
      { name: 'Python', src: `${baseUrl}/v1758658986/python_pdzovh.svg`, alt: 'Python' },
      { name: 'Laravel', src: `${baseUrl}/v1758658971/laravel_v65ajo.svg`, alt: 'Laravel' },
      { name: 'Spring Boot', src: `${baseUrl}/v1758658993/spring_qmkbyj.svg`, alt: 'Spring Boot' },
      { name: 'Express.js', src: isDarkMode ? `${baseUrl}/v1758658953/Express.js_dark_zmf6l6.svg` : `${baseUrl}/v1758658954/Express.js_light_q2xdde.svg`, alt: 'Express.js' },
      { name: 'Flask', src: isDarkMode ? `${baseUrl}/v1758658957/Flask_dark_omrfjs.svg` : `${baseUrl}/v1758658958/Flask_light_akmpib.svg`, alt: 'Flask' },
      { name: 'MySQL', src: `${baseUrl}/v1758658977/mysql_aoysh6.svg`, alt: 'MySQL' },
      { name: 'MongoDB', src: `${baseUrl}/v1758658972/mongodb_svjgdf.svg`, alt: 'MongoDB' },
      { name: 'PostgreSQL', src: `${baseUrl}/v1758658983/postgresql_v4pub1.svg`, alt: 'PostgreSQL' },
      { name: 'SQL Server', src: `${baseUrl}/v1758658994/sql-server_lbmlae.svg`, alt: 'SQL Server' },
      { name: 'Docker', src: `${baseUrl}/v1758658952/docker_ph406u.svg`, alt: 'Docker' },
      { name: 'Git', src: `${baseUrl}/v1758658961/git_lfab3b.svg`, alt: 'Git' },
      { name: 'GitHub', src: isDarkMode ? `${baseUrl}/v1758658962/GitHub_dark_qyqj4q.svg` : `${baseUrl}/v1758658964/GitHub_light_qzcxwe.svg`, alt: 'GitHub' },
      { name: 'VS Code', src: `${baseUrl}/v1758659008/vscode_hfnjzg.svg`, alt: 'VS Code' },
      { name: 'Figma', src: `${baseUrl}/v1758658956/figma_qgnrg8.svg`, alt: 'Figma' },
      { name: 'Tailwind CSS', src: `${baseUrl}/v1758658995/tailwindcss_jttn4r.svg`, alt: 'Tailwind CSS' },
      { name: 'Bootstrap', src: `${baseUrl}/v1758658947/bootstrap_of2rkf.svg`, alt: 'Bootstrap' },
      { name: 'HTML5', src: `${baseUrl}/v1758658965/html5_o7degc.svg`, alt: 'HTML5' },
      { name: 'CSS3', src: `${baseUrl}/v1758658949/css_old_qtdvg4.svg`, alt: 'CSS3' },
      { name: 'Angular', src: `${baseUrl}/v1758658946/angular_gpqdyb.svg`, alt: 'Angular' },
      { name: 'Flutter', src: `${baseUrl}/v1758658960/flutter_pfpv4x.svg`, alt: 'Flutter' },
      { name: 'Dart', src: `${baseUrl}/v1758658950/dart_s3osol.svg`, alt: 'Dart' },
      { name: 'Android', src: `${baseUrl}/v1758658945/android-icon_flenrr.svg`, alt: 'Android' },
      { name: 'Vite', src: `${baseUrl}/v1758659006/vitejs_w3t0f4.svg`, alt: 'Vite' },
      { name: 'Vercel', src: isDarkMode ? `${baseUrl}/v1758659003/Vercel_dark_g8pdja.svg` : `${baseUrl}/v1758659004/Vercel_light_xbbrtn.svg`, alt: 'Vercel' },
      { name: 'Postman', src: `${baseUrl}/v1758658986/postman_h8ngia.svg`, alt: 'Postman' },
      { name: 'NPM', src: `${baseUrl}/v1758658978/npm_rumf4p.svg`, alt: 'NPM' },
      { name: 'JWT', src: `${baseUrl}/v1758658970/jwt_xrpiqh.svg`, alt: 'JWT' },
      { name: 'Cloudinary', src: `${baseUrl}/v1758658948/cloudinary_gkpqok.svg`, alt: 'Cloudinary' },
      { name: 'Canva', src: `${baseUrl}/v1758658948/canva_rftjed.svg`, alt: 'Canva' },
      { name: 'Notion', src: `${baseUrl}/v1758658976/notion_helaep.svg`, alt: 'Notion' },
      { name: 'UI/UX', src: isDarkMode ? `${baseUrl}/v1758658999/ui_dark_cdzrbp.svg` : `${baseUrl}/v1758659001/ui_light_thi24l.svg`, alt: 'UI/UX Design' }
    ];

    return additionalTechnologies.map((tech) => ({
      src: tech.src,
      alt: tech.alt,
      title: tech.name,
      onMouseEnter: (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setHoveredTech(tech.name);
      },
      onMouseLeave: () => {
        setHoveredTech(null);
      }
    } as LogoItem));
  };

  // Sistema de colores para ambos temas (corregido)
  const getThemeClasses = () => {
    if (isDarkMode) {
      return {
        bg: 'bg-gray-900',
        bgSecondary: 'bg-gray-800',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        textMuted: 'text-gray-400',
        // Cards con bordes verdes visibles en modo oscuro
        card: 'bg-gray-700 border-2 border-green-500/80 shadow-lg',
        cardHover: 'hover:border-green-400 hover:shadow-xl hover:shadow-green-500/30',
        input: 'bg-gray-700 border-2 border-gray-600',
        accent: 'text-green-500',
        gradient: 'from-gray-900 via-gray-800 to-gray-900'
      };
    } else {
      return {
        bg: 'bg-gray-50',
        bgSecondary: 'bg-white',
        text: 'text-gray-900',
        textSecondary: 'text-gray-800',
        textMuted: 'text-gray-700',
        // Cards con bordes verdes en modo claro - colores más fuertes
        card: 'bg-white border-2 border-green-500/60 shadow-lg',
        cardHover: 'hover:border-green-600 hover:shadow-xl hover:shadow-green-500/25',
        input: 'bg-white border-2 border-gray-300',
        accent: 'text-green-600',
        gradient: 'from-gray-50 via-white to-gray-100'
      };
    }
  };

  const theme = getThemeClasses();

  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 800, // Duración de las animaciones
      easing: 'ease-out-cubic', // Tipo de easing
      once: false, // Permitir animaciones repetidas
      offset: 100, // Offset desde el trigger point
      delay: 0, // Delay global
      mirror: true, // Animar elementos al salir del viewport
    });

    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'nosotros', 'equipo', 'portafolios', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura del header fijo
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Componente de fondo animado mejorado
  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradiente base dinámico */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}></div>
      
      {/* Malla de circuitos animada */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Patrón de circuito */}
            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M 0 50 L 25 50 L 25 25 L 75 25 L 75 75 L 100 75" 
                fill="none" 
                stroke="#00ff88" 
                strokeWidth="1" 
                opacity="0.6"
              />
              <circle cx="25" cy="50" r="3" fill="#00ff88" opacity="0.8"/>
              <circle cx="75" cy="25" r="3" fill="#00ff88" opacity="0.8"/>
              <circle cx="75" cy="75" r="3" fill="#00ff88" opacity="0.8"/>
            </pattern>
            
            {/* Patrón de puntos */}
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#00ff88" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
              </circle>
            </pattern>
            
            {/* Gradiente radial para orbes */}
            <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
            </radialGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#circuit)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      {/* Orbes flotantes animados */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl animate-pulse"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: 'url(#orbGradient)',
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Líneas de energía que se mueven */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, #00ff88, transparent)`,
              top: `${20 + i * 15}%`,
              animationName: 'slide',
              animationDuration: `${4 + i}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationName: 'float',
              animationDuration: `${6 + Math.random() * 4}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Efectos de brillo en las esquinas */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Overlay de gradiente para mejorar legibilidad */}
      <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-gray-900/60 via-gray-900/30 to-gray-900/60' : 'from-white/80 via-white/60 to-white/80'}`}></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 ${!isDarkMode ? 'light-mode' : ''}`}>
      <style>{`
        @keyframes slide {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          66% { transform: translateY(-10px) translateX(-5px); opacity: 0.5; }
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm z-50 border-b border-green-500/30 transition-colors duration-300`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-2xl font-bold text-green-500">MT</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Inicio', 'Servicios', 'Nosotros', 'Equipo', 'Portafolios', 'Contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-green-500 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-green-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-green-500/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-green-500/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden mt-4 py-4 ${theme.bgSecondary} rounded-lg`}>
              {['Inicio', 'Servicios', 'Nosotros', 'Equipo', 'Portafolios', 'Contacto'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 hover:text-green-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section con fondo mejorado */}
      <section id="inicio" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="text-green-500">MUTAN</span>
              <span className={theme.text}>TECH</span>
            </h1>
            <p 
              className={`text-xl md:text-2xl mb-8 ${isDarkMode ? theme.textSecondary : 'text-gray-800 font-medium'}`}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Transformamos ideas en soluciones tecnológicas innovadoras
            </p>
            <p 
              className={`text-lg mb-8 ${isDarkMode ? theme.textMuted : 'text-gray-700 font-normal'} max-w-2xl mx-auto`}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Somos una empresa especialistas en Tecnologías de la Información, 
              comprometidos con la excelencia en desarrollo de software.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <button
                onClick={() => scrollToSection('servicios')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold btn-parallax flex items-center justify-center gap-2"
              >
                Ver Servicios <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-semibold btn-parallax"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ChevronDown className={`w-6 h-6 ${theme.textMuted}`} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className={`py-32 ${theme.bgSecondary} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-green-500">Servicios</span>
            </h2>
            <p className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
              Ofrecemos soluciones tecnológicas integrales para impulsar tu negocio hacia el futuro digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${theme.card} ${theme.cardHover} rounded-lg p-8 service-card`}
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="text-green-500 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={`${theme.textSecondary} mb-6`}>{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center gap-3 ${theme.textMuted}`}>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className={`py-32 ${theme.bg} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                ¿Quiénes <span className="text-green-500">Somos?</span>
              </h2>
              <p className={`text-lg ${theme.textSecondary} mb-6`}>
                Mutantech es un equipo de 5 ingenieros especializados en Tecnologías de la Información.
              </p>
              <p className={`text-lg ${theme.textSecondary} mb-6`}>
                Nos caracterizamos por nuestra pasión por la innovación y nuestro compromiso con la 
                excelencia técnica. Cada proyecto es una oportunidad para aplicar las mejores prácticas 
                y las tecnologías más avanzadas del mercado.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">5+</div>
                  <div className={theme.textMuted}>Ingenieros Expertos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">35+</div>
                  <div className={theme.textMuted}>Tecnologías</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4" data-aos="fade-left">
              {technologies.slice(0, 9).map((tech, index) => (
                <div 
                  key={index} 
                  className={`${theme.card} ${theme.cardHover} p-4 rounded-lg text-center tech-card`}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="text-green-500 font-semibold">{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className={`py-32 ${theme.bgSecondary} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestro <span className="text-green-500">Equipo</span>
            </h2>
            <p className={`text-xl ${theme.textSecondary}`}>
              Ingenieros ITIN especializados en diferentes áreas del desarrollo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index} 
                className={`${theme.card} ${theme.cardHover} rounded-lg p-6 text-center team-card`}
                data-aos="flip-up"
                data-aos-delay={index * 150}
              >
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-green-500/30' : 'bg-green-500/20'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Users className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-green-500 mb-2">{member.role}</p>
                <p className={`${theme.textMuted} text-sm`}>{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Technologies Section */}
      <section className={`py-20 ${theme.bg} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Más <span className="text-green-500">Tecnologías</span>
            </h2>
            <p className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto`}>
              Explora todas las herramientas y tecnologías que dominamos para crear soluciones completas
            </p>
          </div>
          
          <div className="relative" data-aos="fade-up" data-aos-delay="200">
            <div className={`${isMobile ? 'h-24' : 'h-32'} relative overflow-hidden rounded-lg ${isMobile ? 'px-2' : ''}`}>
              <LogoLoop
                logos={getAdditionalTechnologyLogos()}
                speed={isMobile ? 40 : 50}
                direction="left"
                logoHeight={isMobile ? 36 : 56}
                gap={isMobile ? 64 : 56}
                pauseOnHover={true}
                fadeOut={!isMobile}
                fadeOutColor={isDarkMode ? '#111827' : '#f9fafb'}
                scaleOnHover={!isMobile}
                ariaLabel="Tecnologías adicionales que utilizamos"
                className="h-full"
              />
            </div>
            
            {/* Tooltip para mostrar nombre de tecnología */}
            {hoveredTech && (
              <div 
                className={`fixed ${theme.bgSecondary} ${theme.text} px-3 py-2 rounded-lg text-sm font-medium z-50 shadow-xl border border-green-500/50 pointer-events-none transform -translate-x-1/2 -translate-y-full`}
                style={{ 
                  left: tooltipPosition.x,
                  top: tooltipPosition.y - 8,
                  transition: 'all 0.2s ease-out'
                }}
              >
                <div className="text-center font-semibold">
                  {hoveredTech}
                </div>
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent`} 
                     style={{ borderTopColor: isDarkMode ? '#374151' : '#ffffff' }}></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portafolios" className={`py-32 ${theme.bg} transition-colors duration-300 relative overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center max-w-7xl mx-auto">
            {/* Contenido de texto */}
            <div data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Conoce Nuestros <span className="text-green-500">Portafolios</span>
              </h2>
              <p className={`text-lg ${theme.textSecondary} mb-8`}>
                Cada miembro de nuestro equipo tiene su propio portafolio donde puedes ver 
                sus proyectos, habilidades y experiencia. Haz clic en las tarjetas para 
                explorar el trabajo individual de cada desarrollador.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={theme.textSecondary}>Proyectos personales y profesionales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={theme.textSecondary}>Tecnologías y herramientas utilizadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={theme.textSecondary}>Experiencia y especialización</span>
                </div>
              </div>

              {/* Acceso rápido a portafolios */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Acceso Rápido:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
                  {team.map((member, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (member.portfolio && member.portfolio !== '#') {
                          window.open(member.portfolio, '_blank');
                        }
                      }}
                      disabled={member.portfolio === '#'}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-300 text-left
                        ${member.portfolio !== '#' 
                          ? `${theme.card} ${theme.cardHover} cursor-pointer hover:scale-105` 
                          : `${theme.card} opacity-50 cursor-not-allowed`
                        }
                      `}
                    >
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{member.name}</p>
                        <p className="text-xs text-green-500 truncate">{member.specialty}</p>
                      </div>
                      {member.portfolio !== '#' && (
                        <ArrowRight className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                      {member.portfolio === '#' && (
                        <span className="text-xs text-gray-500 flex-shrink-0">Próximamente</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tarjetas animadas - Condicional PC/Móvil */}
            {!isMobile ? (
              // Vista PC - CardSwap original
              <div className="relative h-[600px] w-full flex items-center justify-center" data-aos="fade-left">
                <CardSwap
                  cardDistance={30}
                  verticalDistance={40}
                  delay={5000}
                  pauseOnHover={true}
                  onCardClick={(index) => {
                    const member = team[index];
                    if (member.portfolio && member.portfolio !== '#') {
                      window.open(member.portfolio, '_blank');
                    }
                  }}
                >
                  {team.map((member, index) => (
                    <Card key={index} className="cursor-pointer group">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        {/* Imagen de fondo */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                          style={{ 
                            backgroundImage: `url(${member.image})`,
                            filter: 'brightness(0.8)'
                          }}
                        />
                        
                        {/* Overlay con gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        
                        {/* Contenido */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                          <div className="transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                            <p className="text-green-400 font-semibold mb-1">{member.specialty}</p>
                            <p className="text-gray-300 text-sm mb-4">{member.role}</p>
                            
                            {member.portfolio !== '#' && (
                              <div className="flex items-center gap-2 text-green-400 text-sm">
                                <ArrowRight className="w-4 h-4" />
                                <span>Ver portafolio</span>
                              </div>
                            )}
                            
                            {member.portfolio === '#' && (
                              <div className="text-gray-400 text-sm">
                                <span>Portafolio próximamente</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Efecto de brillo en hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            ) : (
              // Vista Móvil - Dos carpetas separadas por responsabilidades
              <div className="relative w-full flex flex-col items-center justify-center space-y-12 px-4 mt-24" data-aos="fade-left">
                {/* Texto descriptivo arriba */}
                <div className="text-center mb-16">
                  <h4 className="text-2xl font-bold mb-4">
                    Nuestro <span className="text-green-500">Equipo</span>
                  </h4>
                  <p className={`text-base ${theme.textSecondary} max-w-md mx-auto`}>
                    Conoce a los profesionales que hacen posible cada proyecto
                  </p>
                </div>
                
                {/* Carpeta Frontend & Design */}
                <div className="flex flex-col items-center mb-16">
                  <h5 className="text-lg font-semibold mb-8 text-blue-400">Frontend & Design</h5>
                  <Folder 
                    size={1.2} 
                    color="#3b82f6" 
                    className="mb-8"
                    items={[
                      // Jair Sánchez - Mobile Developer
                      <div 
                        key={0}
                        className="w-full h-full rounded-lg overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                          const member = team[1]; // Jair
                          if (member.portfolio && member.portfolio !== '#') {
                            window.open(member.portfolio, '_blank');
                          }
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${team[1].image})`,
                            filter: 'brightness(0.9)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-1">
                          <div className="text-white text-center">
                            <p className="text-xs font-bold leading-tight">Jair</p>
                            <p className="text-xs text-blue-400 leading-tight">Mobile</p>
                          </div>
                        </div>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                      </div>,
                      
                      // Raúl Faz - Frontend Developer
                      <div 
                        key={1}
                        className="w-full h-full rounded-lg overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                          const member = team[3]; // Raúl
                          if (member.portfolio && member.portfolio !== '#') {
                            window.open(member.portfolio, '_blank');
                          }
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${team[3].image})`,
                            filter: 'brightness(0.9)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-1">
                          <div className="text-white text-center">
                            <p className="text-xs font-bold leading-tight">Raúl</p>
                            <p className="text-xs text-blue-400 leading-tight">Frontend</p>
                          </div>
                        </div>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gray-400" />
                      </div>,
                      
                      // Lesly Gaibor - UI/UX Designer
                      <div 
                        key={2}
                        className="w-full h-full rounded-lg overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                          const member = team[4]; // Lesly
                          if (member.portfolio && member.portfolio !== '#') {
                            window.open(member.portfolio, '_blank');
                          }
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${team[4].image})`,
                            filter: 'brightness(0.9)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-1">
                          <div className="text-white text-center">
                            <p className="text-xs font-bold leading-tight">Lesly</p>
                            <p className="text-xs text-blue-400 leading-tight">UI/UX</p>
                          </div>
                        </div>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                      </div>
                    ]}
                  />
                </div>
                
                {/* Carpeta Backend & QA */}
                <div className="flex flex-col items-center">
                  <h5 className="text-lg font-semibold mb-8 text-purple-400">Backend & QA</h5>
                  <Folder 
                    size={1.2} 
                    color="#8b5cf6" 
                    className="mb-8"
                    items={[
                      // Josué Espinoza - Backend Developer
                      <div 
                        key={0}
                        className="w-full h-full rounded-lg overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                          const member = team[2]; // Josué Espinoza
                          if (member.portfolio && member.portfolio !== '#') {
                            window.open(member.portfolio, '_blank');
                          }
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${team[2].image})`,
                            filter: 'brightness(0.9)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-1">
                          <div className="text-white text-center">
                            <p className="text-xs font-bold leading-tight">Josué</p>
                            <p className="text-xs text-purple-400 leading-tight">Backend</p>
                          </div>
                        </div>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                      </div>,
                      
                      // Josué Brazales - QA Tester
                      <div 
                        key={1}
                        className="w-full h-full rounded-lg overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                          const member = team[0]; // Josué Brazales
                          if (member.portfolio && member.portfolio !== '#') {
                            window.open(member.portfolio, '_blank');
                          }
                        }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundImage: `url(${team[0].image})`,
                            filter: 'brightness(0.9)'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-1">
                          <div className="text-white text-center">
                            <p className="text-xs font-bold leading-tight">Josué</p>
                            <p className="text-xs text-purple-400 leading-tight">QA</p>
                          </div>
                        </div>
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gray-400" />
                      </div>,
                      
                      // Paper vacío para mantener estructura
                      <div 
                        key={2}
                        className="w-full h-full rounded-lg overflow-hidden relative"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                          <p className="text-xs text-gray-400 text-center">Más<br/>pronto</p>
                        </div>
                      </div>
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className={`py-32 ${theme.bgSecondary} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hablemos de tu <span className="text-green-500">Proyecto</span>
            </h2>
            <p className={`text-xl ${theme.textSecondary}`}>
              ¿Tienes una idea? Nosotros tenemos la experiencia para hacerla realidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-green-500" />
                  <span>mutantech.dev@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-green-500" />
                  <span>+593 99 123 4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-green-500" />
                  <span>Quito, Ecuador</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Síguenos</h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => window.open('https://github.com/mutantech', '_blank')}
                    className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-gray-900 transition-colors"
                    aria-label="Ir a nuestro GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => window.open('https://linkedin.com/company/mutantech', '_blank')}
                    className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-gray-900 transition-colors"
                    aria-label="Ir a nuestro LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Formulario de contacto con EmailJS */}
            <div data-aos="fade-left">
              <ContactForm theme={theme} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${theme.bg} border-t border-green-500/30 transition-colors duration-300`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Code className="w-6 h-6 text-green-500" />
            <span className="text-xl font-bold text-green-500">MUTANTECH</span>
          </div>
          <p className={theme.textMuted}>
            © 2025 Mutantech. Transformando ideas en realidad digital.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MutantechLanding;