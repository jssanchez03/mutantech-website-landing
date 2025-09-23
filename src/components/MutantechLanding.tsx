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

const MutantechLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Datos del equipo (corregidos los caracteres especiales)
  const team = [
    { name: 'Josué Brazales', role: 'Ingeniero ITIN', specialty: 'QA Tester' },
    { name: 'Jair Sánchez', role: 'Ingeniero ITIN', specialty: 'Mobile Developer' },
    { name: 'Josué Espinoza', role: 'Ingeniero ITIN', specialty: 'Backend Developer' },
    { name: 'Raúl Faz', role: 'Ingeniero ITIN', specialty: 'Frontend Developer' },
    { name: 'Lesly Gaibor', role: 'Ingeniera ITIN', specialty: 'UI/UX Designer' }
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

  // Tecnologías
  const technologies = [
    'JavaScript', 'TypeScript', 'PHP', 'Java', 'Python', 'React', 'Node.js', 
    'Laravel', 'Spring Boot', 'MySQL', 'MongoDB', 'AWS', 'Docker'
  ];

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
      const sections = ['inicio', 'servicios', 'nosotros', 'equipo', 'contacto'];
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
      element.scrollIntoView({ behavior: 'smooth' });
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
              {['Inicio', 'Servicios', 'Nosotros', 'Equipo', 'Contacto'].map((item) => (
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
              {['Inicio', 'Servicios', 'Nosotros', 'Equipo', 'Contacto'].map((item) => (
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
      <section id="servicios" className={`py-20 ${theme.bgSecondary} transition-colors duration-300`}>
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
      <section id="nosotros" className={`py-20 ${theme.bg} transition-colors duration-300`}>
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
                  <div className="text-3xl font-bold text-green-500">13+</div>
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
      <section id="equipo" className={`py-20 ${theme.bgSecondary} transition-colors duration-300`}>
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

      {/* Contact Section */}
      <section id="contacto" className={`py-20 ${theme.bg} transition-colors duration-300`}>
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
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} border-t border-green-500/30 transition-colors duration-300`}>
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