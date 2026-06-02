import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  Scale, 
  Globe, 
  ArrowRight, 
  X, 
  CheckCircle, 
  Lock,
  MessageSquare,
  ShieldCheck,
  Award,
  MapPin,
  Calendar
} from 'lucide-react';
import { Language, translations } from './types';
import advogadosFoto from './assets/images/advogados-foto.jpeg';
import logoImg from './assets/images/logo.png';

interface Office {
  city: string;
  address: string;
  cep?: string;
  schedule: string;
  phone?: string;
  details?: string;
  isHQ?: boolean;
}

const officesData: Record<'pt' | 'en', Office[]> = {
  pt: [
    {
      city: 'Anápolis',
      address: 'Travessa Julio Guerra, Nº 55, Centro, Anápolis',
      cep: 'CEP: 75020-320',
      schedule: 'Segunda a sexta-feira: 08:00 às 11:30 e das 13:00 às 17:30',
      phone: '(62) 3321-4895',
      isHQ: true
    },
    {
      city: 'Goiânia',
      address: 'Rua 20, Nº 95, Jardim Goiás, Goiânia',
      cep: 'CEP: 74805-230',
      schedule: 'Agendar atendimento',
    },
    {
      city: 'Águas Lindas',
      address: 'Qd 38, Lt 25, Jardim Brasília, Águas Lindas de Goiás',
      details: '1ª rua após os correios',
      schedule: 'Quarta-feira das 08:00 às 11:30',
    },
    {
      city: 'Ceres',
      address: 'Rua Alfredo de Padua, Nº 108-A, Qd. P, Lt 36, Centro, Ceres - GO',
      schedule: 'Quinta-feira das 08:00 às 11:30',
    },
    {
      city: 'Jaraguá',
      address: 'Praça Sílvio de Castro Ribeiro, Qd 01, Lt. 01, Setor Central, Jaraguá - GO',
      details: 'Esquina com o banco Bradesco',
      schedule: 'Quinta-feira das 14:00 às 17:30',
    },
    {
      city: 'Abadiânia',
      address: 'Avenida Geraldo Rodrigues dos Santos, Qd 38, Lt 01, Nº 812, Centro, Abadiânia - GO',
      schedule: 'Segunda e quarta-feira das 08:00 às 11:30',
    }
  ],
  en: [
    {
      city: 'Anápolis',
      address: '55 Julio Guerra St, Downtown, Anápolis',
      cep: 'Zip: 75020-320',
      schedule: 'Monday to Friday: 08:00 AM - 11:30 AM & 01:00 PM - 05:30 PM',
      phone: '(62) 3321-4895',
      isHQ: true
    },
    {
      city: 'Goiânia',
      address: '95 Street 20, Jardim Goiás, Goiânia',
      cep: 'Zip: 74805-230',
      schedule: 'Scheduled in-person support / appointments',
    },
    {
      city: 'Águas Lindas',
      address: 'Qd 38, Lt 25, Jardim Brasília, Águas Lindas de Goiás',
      details: '1st street past the post office',
      schedule: 'Wednesday: 08:00 AM to 11:30 AM',
    },
    {
      city: 'Ceres',
      address: '108-A Alfredo de Padua St, Qd. P, Lt 36, Downtown, Ceres - GO',
      schedule: 'Thursday: 08:00 AM to 11:30 AM',
    },
    {
      city: 'Jaraguá',
      address: 'Sylvio de Castro Ribeiro Square, Qd 01, Lt 01, Central Area, Jaraguá - GO',
      details: 'Corner with Bradesco Bank',
      schedule: 'Thursday: 02:00 PM to 05:30 PM',
    },
    {
      city: 'Abadiânia',
      address: '812 Geraldo Rodrigues dos Santos Ave, Qd 38, Lt 01, Downtown, Abadiânia - GO',
      schedule: 'Monday and Wednesday: 08:00 AM to 11:30 AM',
    }
  ]
};

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: 'civil',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[lang];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: 'civil',
        message: ''
      });
    }, 1200);
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'pt' ? 'en' : 'pt'));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#15408C] selection:text-white overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="w-full bg-[#15408C] border-b border-white/10 py-2.5 text-[11px] text-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Contacts */}
          <div className="flex flex-wrap justify-center items-center gap-6 font-sans tracking-wide">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3 h-3 text-white/80" />
              <span>{t.topBar.phone}</span>
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-3 h-3 text-white/80" />
              <span>{t.topBar.email}</span>
            </span>
            <span className="hidden sm:flex items-center gap-2 opacity-95">
              <Clock className="w-3 h-3 text-white/80" />
              <span>{t.topBar.schedule}</span>
            </span>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white bg-white/10 py-1 px-2.5 rounded border border-white/10 animate-pulse-slow">
              <Award className="w-3 h-3 text-white/90" />
              <span className="text-[10px] tracking-widest font-medium uppercase">
                {lang === 'pt' ? 'Escritório de Elite' : 'Elite Legal Practice'}
              </span>
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-[10px] text-white font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
              title="Mudar Idioma / Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo / Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-[#15408C] border border-slate-200/25 rounded-[5px] group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden">
              <img 
                src={logoImg} 
                alt="Logo" 
                className="w-full h-full object-cover rounded-[5px] group-hover:scale-105 transition-transform duration-300" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-[0.1em] font-normal text-slate-800 group-hover:text-[#15408C] transition-colors duration-300 leading-none uppercase">
                DOGIMAR GOMES DOS SANTOS
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#15408C] mt-1.5 uppercase font-semibold">
                {lang === 'pt' ? 'Advocacia e Consultoria Jurídica' : 'Law & Legal Consulting'}
              </span>
            </div>
          </motion.div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'about', label: t.nav.about },
              { id: 'services', label: t.nav.services },
              { id: 'contact', label: t.nav.contact }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  const el = document.getElementById(item.id === 'contact' ? 'contact' : item.id === 'about' ? 'details' : 'details');
                  if (item.id === 'about') {
                    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item.id === 'services') {
                    document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item.id === 'contact') {
                    setIsModalOpen(true);
                  }
                }}
                className={`text-xs tracking-[0.22em] font-semibold uppercase transition-all relative py-2 cursor-pointer ${
                  activeMenu === item.id ? 'text-[#15408C]' : 'text-slate-600 hover:text-[#15408C]'
                }`}
              >
                {item.label}
                {activeMenu === item.id && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#15408C]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Pages dropdown style */}
            <div className="relative group cursor-pointer">
              <span className="text-xs tracking-[0.22em] font-semibold uppercase text-slate-500 group-hover:text-[#15408C] flex items-center gap-1 transition-colors">
                {lang === 'pt' ? 'Mídia' : 'Pages'}
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href="#unidades" onClick={(e) => { e.preventDefault(); document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' }) }} className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#15408C] font-semibold tracking-wide">
                  {lang === 'pt' ? 'Nossas Unidades' : 'Our Branches'}
                </a>
                <a href="#sobre" onClick={(e) => { e.preventDefault(); document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' }) }} className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#15408C] font-semibold tracking-wide">
                  {lang === 'pt' ? 'Nossos Valores' : 'Our Principles'}
                </a>
              </div>
            </div>
          </nav>

          {/* CTA Consultation Button */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="relative hidden sm:inline-flex items-center justify-center px-6 py-3 border-2 border-[#15408C] bg-[#15408C] hover:bg-[#11316B] text-white text-xs tracking-[0.18em] font-bold uppercase transition-all duration-300 cursor-pointer rounded-[4px] shadow-sm hover:shadow-md"
            >
              {t.nav.cta}
            </motion.button>
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden p-2 text-[#15408C] hover:bg-slate-50 rounded border border-slate-200"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 3. HERO / IMAGE SECTION - SIDE-BY-SIDE PLATINUM LAYOUT */}
      <section className="relative min-h-[calc(100vh-120px)] flex flex-col lg:flex-row items-stretch overflow-hidden bg-white border-b border-slate-200/80">
        
        {/* Left Column: Content */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-24 relative z-15">
          <div className="max-w-2xl mx-auto lg:mx-0">
            
            {/* Decorative Blue Bar */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-20 h-[3.5px] bg-[#15408C] mb-8 origin-left"
            />

            {/* Core Elegant Headline with Italic Elements */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800 leading-tight mb-8 tracking-wide"
            >
              {lang === 'pt' ? (
                <>
                  Excelência e <span className="font-semibold italic text-[#15408C]">Tradição Jurídica</span>
                </>
              ) : (
                <>
                  Excellence and <span className="font-semibold italic text-[#15408C]">Legal Tradition</span>
                </>
              )}
            </motion.h1>

            {/* The multi-paragraph requested text blocks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 max-w-2xl font-sans text-slate-700/90 text-[13.5px] sm:text-sm leading-relaxed mb-8 font-light"
            >
              {lang === 'pt' ? (
                <>
                  <p>
                    Há mais de 27 anos, o escritório <strong className="font-bold text-[#15408C]">Dogimar Gomes dos Santos</strong> atua com compromisso, dedicação e excelência na defesa dos direitos da population de Anápolis e região.
                  </p>
                  <p>
                    Nossa história foi construída através da confiança de clientes que encontraram em nosso trabalho um atendimento sério, humanizado e especializado, sempre buscando soluções eficientes para cada situação.
                  </p>
                  <p>
                    Somos referência na atuação em <strong className="font-bold text-[#15408C]">Direito Previdenciário</strong>, auxiliando diariamente pessoas que tiveram benefícios negados ou indeferidos pelo INSS, além de atuar em demandas envolvendo aposentadorias, pensão por morte, salário-maternidade, auxílio-doença, auxílio-acidente, BPC/LOAS e demais benefícios previdenciários.
                  </p>
                  <p>
                    Também prestamos atendimento especializado nas áreas <strong className="font-bold text-[#15408C]">trabalhista, cível e agrária</strong>, sempre prezando pela qualidade dos serviços prestados, responsabilidade profissional e dedicação em cada causa assumida.
                  </p>
                  <p>
                    Ao longo desses anos, entendemos que cada processo representa muito mais do que documentos e procedimentos jurídicos. Por trás de cada demanda existe uma história, uma família e direitos que precisam ser respeitados e defendidos.
                  </p>
                  <p>
                    Por isso, seguimos atuando com transparência, experiência e compromisso, buscando oferecer segurança jurídica e um atendimento próximo para cada cliente que deposita sua confiança em nosso escritório.
                  </p>
                  <p className="border-l-2 border-[#15408C] pl-4 py-1 italic font-semibold text-[#15408C] text-sm sm:text-base mt-6">
                    Dogimar Gomes dos Santos — tradição, experiência e dedicação há mais de 27 anos.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    For over 27 years, <strong className="font-bold text-[#15408C]">Dogimar Gomes dos Santos</strong> law firm has acted with commitment, dedication, and excellence in defending the rights of the people of Anápolis and its surrounding region.
                  </p>
                  <p>
                    Our history was built upon the trust of clients who found in our work a serious, humanized, and highly specialized representation, always looking for efficient solutions in every single scenario.
                  </p>
                  <p>
                    We are a benchmark in <strong className="font-bold text-[#15408C]">Social Security Law</strong>, helping individuals daily whose benefits were denied or rejected by the INSS, additionally handling retirements, survivor pensions, maternity allowances, disability benefits, accident aid, BPC/LOAS, and other social welfare demands.
                  </p>
                  <p>
                    We also deliver specialized legal advice in the <strong className="font-bold text-[#15408C]">labor, civil, and agrarian</strong> fields, always valuing the premium quality of our practices, professional responsibility, and devotion to every case we take on.
                  </p>
                  <p>
                    Throughout these years, we have come to understand that each lawsuit represents far more than just documents and bureaucratic court proceedings. Behind each claim is a real story, a family, and fundamental rights that demand respect and defense.
                  </p>
                  <p>
                    Thus, we continue to serve with transparency, solid experience, and absolute commitment, aiming to provide outstanding legal security and highly personal guidance to every client who places their trust in our firm.
                  </p>
                  <p className="border-l-2 border-[#15408C] pl-4 py-1 italic font-semibold text-[#15408C] text-sm sm:text-base mt-6">
                    Dogimar Gomes dos Santos — tradition, experience, and dedication for over 27 years.
                  </p>
                </>
              )}
            </motion.div>

            {/* Gorgeous Action Trigger Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#15408C] hover:bg-[#11316B] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer rounded"
              >
                <span>{t.nav.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/90" />
              </button>

              <button 
                onClick={() => {
                  const element = document.getElementById('details');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-slate-350 hover:border-[#15408C] font-sans font-bold text-xs uppercase tracking-widest text-[#333] hover:text-[#15408C] hover:bg-slate-50 transition-all duration-300 cursor-pointer rounded"
              >
                {lang === 'pt' ? 'Ver Atuação' : 'Our Practice'}
              </button>
            </motion.div>

            {/* Dynamic statistics row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="border-t border-slate-200/80 pt-8 flex"
            >
              <div className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl text-[#15408C] font-semibold tracking-tight mb-0.5">
                  {t.stats.years.value}
                </span>
                <span className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold font-sans">
                  {t.stats.years.label}
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Column: Visual Frame featuring Lawyer Team Photo */}
        <div className="lg:w-1/2 w-full flex flex-col justify-between relative bg-white overflow-hidden">
          
          {/* Visual Image container - Height optimized for beautiful aspect ratio on mobile & tablet, preventing cropping */}
          <div className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] lg:h-full min-h-[450px] lg:min-h-[580px] overflow-hidden">
            <motion.img 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              src={advogadosFoto} 
              alt="Advocacia Dogimar Gomes dos Santos" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_18%] sm:object-[center_22%] md:object-center pointer-events-none filter brightness-[0.99] contrast-[1.01]"
            />
            {/* Pure Edge Masks: No radial/general blur over the center of the image. The team is 100% visible and extremely crisp. */}
            {/* Soft fade-out edges on the left and right */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/90 via-white/20 to-transparent z-10 pointer-events-none opacity-40" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/90 via-white/20 to-transparent z-10 pointer-events-none opacity-40" />
            {/* Soft fade-out edges on the top and bottom */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/90 via-white/20 to-transparent z-10 pointer-events-none opacity-40" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/95 via-white/20 to-transparent z-10 pointer-events-none opacity-50" />
            
            {/* Thin Aesthetic Blue Frame overlay on the visual area */}
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-[#15408C]/12 z-20 pointer-events-none hidden sm:block rounded" />
          </div>

          {/* OAB Credentials list - Side on desktop (top-1/2 absolute translation), below on mobile (standard layout flow) */}
          <div className="lg:absolute lg:right-6 lg:bottom-6 w-full lg:w-[290px] p-6 lg:bg-white/95 lg:backdrop-blur-md lg:border lg:border-slate-200 lg:rounded-lg lg:shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-30 bg-[#F8FAFC]/95 border-t border-slate-200 border-l-4 border-l-[#15408C] select-none text-left">
            <h3 className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#15408C] mb-4 font-bold border-b border-slate-100 pb-2">
              {lang === 'pt' ? 'Corpo Jurídico' : 'Legal Members'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-col group">
                <span className="text-slate-800 font-serif text-[13px] font-semibold tracking-wide group-hover:text-[#15408C] transition-colors duration-200">
                  Pedro Lucas Nogueira dos Santos
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                  OAB/GO 76.522
                </span>
              </div>

              <div className="flex flex-col group border-t border-slate-100 pt-3">
                <span className="text-slate-800 font-serif text-[13px] font-semibold tracking-wide group-hover:text-[#15408C] transition-colors duration-200">
                  Dogimar Gomes dos Santos
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                  OAB/GO 17.792
                </span>
              </div>

              <div className="flex flex-col group border-t border-slate-100 pt-3">
                <span className="text-slate-800 font-serif text-[13px] font-semibold tracking-wide group-hover:text-[#15408C] transition-colors duration-200">
                  Isadora Nogueira dos Santos
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                  OAB/GO 64.126
                </span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 4. KEY METADATA SUMMARY GRID BAR */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 bg-white overflow-hidden">
        
        <button 
          onClick={() => {
            const el = document.getElementById('unidades');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="relative px-8 sm:px-12 py-8 border-r border-slate-150 flex flex-col justify-center text-left hover:bg-slate-50/70 active:bg-slate-100/60 transition-all duration-300 focus:outline-none cursor-pointer group overflow-hidden"
        >
          {/* Elegant royal blue accent bar indicating clickability */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#15408C] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="flex items-center justify-between w-full mb-1.5">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#15408C] font-semibold flex items-center gap-1.5 transition-colors">
              {lang === 'pt' ? 'Unidades em Goiás' : 'Offices in Goiás'} 
              <span className="text-[10px] bg-blue-100/80 text-[#15408C] px-2 py-0.5 rounded-full font-sans font-bold leading-none">6</span>
            </p>
            {/* Call to action arrow that slides on hover */}
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#15408C]/80 group-hover:text-[#15408C] group-hover:translate-x-1 transition-all duration-300 font-sans font-semibold">
              {lang === 'pt' ? 'Ver todas →' : 'See all →'}
            </span>
          </div>
          <p className="text-sm font-light text-slate-600 font-sans tracking-wide leading-relaxed group-hover:text-slate-900 transition-colors pr-6">
            {lang === 'pt' 
              ? 'Anápolis, Goiânia, Águas Lindas, Ceres, Jaraguá e Abadiânia' 
              : 'Anápolis, Goiânia, Águas Lindas, Ceres, Jaraguá & Abadiânia'}
          </p>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="px-8 sm:px-12 py-8 border-r border-slate-150 flex flex-col justify-center"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#15408C] mb-1.5 font-bold">
            {lang === 'pt' ? 'Atendimento Direto' : 'Direct Support'}
          </p>
          <p className="text-sm font-medium text-slate-705 font-mono tracking-wide">
            (62) 9 8222-3911 / 3321-4895
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="px-8 sm:px-12 py-8 flex flex-col justify-center"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#15408C] mb-1.5 font-bold">
            {lang === 'pt' ? 'Áreas Principais' : 'Core Disciplines'}
          </p>
          <p className="text-sm font-light text-slate-600 font-sans tracking-wide leading-relaxed">
            {lang === 'pt' ? 'Previdenciário, trabalhista, civil e agrário' : 'Social security, labor, civil and agrarian law'}
          </p>
        </motion.div>

      </section>

      {/* 5. PRACTICAL HIGHLIGHT DETAILS AREA */}
      <section id="details" className="relative bg-[#F8FAFC] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#15408C] mb-3 font-semibold font-sans">
              {lang === 'pt' ? 'Nossos Valores' : 'Our Principles'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-slate-800">
              {lang === 'pt' ? 'Alto Padrão em Advocacia' : 'The Standard of True Craftsmanship'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              className="p-8 bg-white border border-slate-200/80 border-t-4 border-t-[#15408C]/60 hover:border-t-[#15408C] rounded-lg hover:border-x-[#15408C]/20 hover:border-b-[#15408C]/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 border border-blue-105 rounded flex items-center justify-center text-[#15408C] mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-slate-800 mb-3">
                {lang === 'pt' ? 'Segurança & Sigilo' : 'Safety & Security'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Garantimos absoluto sigilo profissional e compliance rígido com todas as leis de segurança de dados.' 
                  : 'We guarantee absolute professional secrecy and strict compliance with all data protection regulations.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="p-8 bg-white border border-slate-200/80 border-t-4 border-t-[#15408C]/60 hover:border-t-[#15408C] rounded-lg hover:border-x-[#15408C]/20 hover:border-b-[#15408C]/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 border border-blue-105 rounded flex items-center justify-center text-[#15408C] mb-6">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-slate-800 mb-3">
                {lang === 'pt' ? 'Altíssima Reputação' : 'High Reputation'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Consolidado como um dos escritórios de maior prestígio, com atuação destacada em tribunais de todo o país.' 
                  : 'Established as one of the most prestigious law firms, with outstanding achievements across federal courts.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="p-8 bg-white border border-slate-200/80 border-t-4 border-t-[#15408C]/60 hover:border-t-[#15408C] rounded-lg hover:border-x-[#15408C]/20 hover:border-b-[#15408C]/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 border border-blue-105 rounded flex items-center justify-center text-[#15408C] mb-6">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-slate-800 mb-3">
                {lang === 'pt' ? 'Atendimento Personalizado' : 'Personalized Support'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Cada cliente recebe atendimento dedicado com soluções sob medida focadas na resolução ágil do seu problema.' 
                  : 'Every client receives dedicated support with customized solutions focused on rapid conflict resolution.'}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5.5 REGIONAL OFFICES / LOCATIONS SECTION */}
      <section id="unidades" className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(21,64,140,0.02),transparent_45%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#15408C] mb-3 font-semibold font-sans">
              {lang === 'pt' ? 'Presença Regional' : 'Regional Presence'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-slate-800 mb-4">
              {lang === 'pt' ? 'Nossos Escritórios' : 'Our Office Branches'}
            </h2>
            <div className="w-12 h-[2px] bg-[#15408C] mx-auto mb-4" />
            <p className="text-sm text-slate-600 max-w-2xl mx-auto font-light font-sans leading-relaxed">
              {lang === 'pt' 
                ? 'Estrutura sólida com assessoria presencial e agendada em múltiplos municípios estratégicos do estado de Goiás.'
                : 'Solid regional presence offering scheduled and on-site premium legal consultations in major cities of Goiás.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officesData[lang].map((office, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                className="group relative bg-[#F8FAFC] border border-slate-200/80 border-t-4 border-t-[#15408C]/40 hover:border-t-[#15408C] rounded-lg p-8 hover:border-x-[#15408C]/20 hover:border-b-[#15408C]/20 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between"
              >
                {/* Visual border blue outline on hover */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#15408C]/0 via-[#15408C] to-[#15408C]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-lg" />
                
                <div>
                  {/* City Name Header & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50/50 border border-blue-100/50 rounded text-[#15408C] group-hover:bg-blue-100/30 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-slate-800 group-hover:text-[#15408C] transition-colors">
                        {office.city}
                      </h3>
                    </div>
                    {office.isHQ && (
                      <span className="text-[9.5px] bg-[#15408C]/10 text-[#15408C] border border-[#15408C]/20 px-2 py-0.5 rounded font-sans font-bold uppercase tracking-wider">
                        {lang === 'pt' ? 'Sede' : 'HQ'}
                      </span>
                    )}
                  </div>

                  {/* Fully Readable Address Detail */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans font-light tracking-wide">
                      {office.address}
                    </p>
                    
                    {office.cep && (
                      <p className="text-[10.5px] font-mono text-[#15408C] font-semibold">
                        {office.cep}
                      </p>
                    )}

                    {office.details && (
                      <div className="inline-block bg-blue-50/40 border border-blue-100/60 rounded px-2.5 py-1 text-[11px] text-slate-500 font-sans">
                        <span className="italic">{office.details}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Structured Schedule Section Card Footer */}
                <div className="border-t border-slate-200/60 pt-5 mt-auto flex flex-col gap-3">
                  <div className="flex items-start gap-2.5 text-slate-600 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#15408C] mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-[#15408C] font-bold font-sans">
                        {lang === 'pt' ? 'Atendimento Presencial' : 'Consultation Hours'}
                      </span>
                      <span className="text-slate-600 font-light mt-1 font-sans leading-relaxed">
                        {office.schedule}
                      </span>
                    </div>
                  </div>

                  {office.phone && (
                    <div className="flex items-center gap-2.5 text-xs text-slate-600 mt-1 border-t border-slate-100 pt-3">
                      <Phone className="w-3.5 h-3.5 text-[#15408C] flex-shrink-0" />
                      <span className="font-mono text-slate-700 font-medium">{office.phone}</span>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. IMMERSIVE COMPACT FOOTER */}
      <footer className="w-full bg-[#112954] border-t border-slate-200/20 py-10 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Paulo César. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          <div className="flex gap-6 font-sans tracking-widest text-[10px] uppercase">
            <span className="hover:text-white cursor-pointer transition-colors">Termos de Uso</span>
            <span className="hover:text-white cursor-pointer transition-colors">Política de Privacidade</span>
          </div>
        </div>
      </footer>

      {/* 6. MODAL CONSULTATION FORMS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setIsSubmitted(false);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-2xl z-10 overflow-hidden"
            >
              
              {/* Elegant Blue Trim */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#15408C]" />

              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSubmitted(false);
                }}
                className="absolute top-5 right-5 p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Scale className="w-5 h-5 text-[#15408C]" />
                      <h2 className="font-serif text-2xl font-bold text-slate-800">
                        {t.modal.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                      {t.modal.subtitle}
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                          {t.modal.name} *
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={lang === 'pt' ? 'Ex: Robert Silva' : 'e.g. Robert Smith'}
                          className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 placeholder-slate-400 px-4 py-2.5 rounded text-sm outline-none transition-colors shadow-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                            {t.modal.email} *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="roberto@provedor.com"
                            className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 placeholder-slate-400 px-4 py-2.5 rounded text-sm outline-none transition-colors shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                            {t.modal.phone} *
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(62) 98222-3911"
                            className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 placeholder-slate-400 px-4 py-2.5 rounded text-sm outline-none transition-colors shadow-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                          {t.modal.area}
                        </label>
                        <select 
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 px-4 py-2.5 rounded text-sm outline-none transition-colors cursor-pointer shadow-sm"
                        >
                          <option value="civil">{lang === 'pt' ? 'Direito Civil / Contratos' : 'Civil Law & Contracts'}</option>
                          <option value="business">{lang === 'pt' ? 'Direito Empresarial & Tributário' : 'Corporate & Tax Law'}</option>
                          <option value="criminal">{lang === 'pt' ? 'Defesa Criminal de Elite' : 'Elite Criminal Defense'}</option>
                          <option value="labor">{lang === 'pt' ? 'Direito Trabalhista Empresarial' : 'Employment & Labor'}</option>
                          <option value="other">{lang === 'pt' ? 'Outra Família de Casos' : 'Other Case Types'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                          {t.modal.message} *
                        </label>
                        <textarea 
                          name="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={lang === 'pt' ? 'Gostaria de agendar uma consulta sobre...' : 'I would like to schedule a session regarding...'}
                          className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 placeholder-slate-400 px-4 py-2.5 rounded text-sm outline-none transition-colors resize-none shadow-sm"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <Lock className="w-3.5 h-3.5 text-[#15408C]/70" />
                        <span>{lang === 'pt' ? 'Suas informações estão 100% criptografadas e seguras.' : 'Your information is 100% encrypted and secure.'}</span>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-[#15408C] hover:bg-[#11316B] text-white text-xs tracking-[0.15em] font-bold uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer rounded"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span>{t.modal.submit}</span>
                        )}
                      </button>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#15408C] mb-6 animate-pulse">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">
                      {lang === 'pt' ? 'Solicitação Enviada!' : 'Request Received!'}
                    </h3>
                    <p className="text-sm text-slate-550 max-w-sm leading-relaxed mb-8">
                      {t.modal.success}
                    </p>
                    <button 
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsSubmitted(false);
                      }}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs tracking-wider uppercase font-semibold transition-all rounded outline-none cursor-pointer"
                    >
                      {t.modal.close}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
