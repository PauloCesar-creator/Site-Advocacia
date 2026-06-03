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
  MessageCircle,
  ShieldCheck,
  Award,
  MapPin,
  Calendar,
  Instagram
} from 'lucide-react';
import { Language, translations } from './types';
import advogadosFoto from './assets/images/advogados-foto.jpeg';
import logoSuperior from './assets/images/logo-superior.png';
import logoCentro from './assets/images/logo-centro.png';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    subject: ''
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
    
    // Prepare data for the professional WhatsApp message dispatch
    const whatsappPhone = "5562982223911";
    const textMessage = `⚖️ *Solicitação de Agendamento - Dogimar Advocacia*\n\n` +
      `👤 *Nome:* ${formData.name}\n` +
      `📞 *Telefone:* ${formData.phone}\n` +
      `🪪 *CPF:* ${formData.cpf}\n` +
      `📝 *Assunto:* ${formData.subject}\n\n` +
      `📥 _Enviado automaticamente pelo formulário de agendamento online._`;
    
    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedText}`;

    // Simulate API request and trigger external WhatsApp redirection safely
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Open in a new tab safely
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      setFormData({
        name: '',
        phone: '',
        cpf: '',
        subject: ''
      });
    }, 1200);
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'pt' ? 'en' : 'pt'));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#15408C] selection:text-white overflow-x-hidden">
      
      {/* 1. HERO WRAPPER - IMMERSIVE PHOTO BACKGROUND HOUSING HEADER AND THE MAIN CENTRAL BADGE */}
      <section id="home" className="relative min-h-screen flex flex-col justify-between items-center text-white bg-[#0A0D14] overflow-hidden">
        
        {/* Background Image Container with Deep Premium Vignette Overlay - Highly visible lawyers */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {/* Responsive background image */}
          <img 
            src={advogadosFoto} 
            alt="Advocacia Dogimar Gomes dos Santos" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_12%] sm:object-[center_18%] md:object-[center_12%] lg:object-[center_14%] xl:object-[center_16%] brightness-[0.72] contrast-[1.08] transition-all duration-300"
          />
          {/* Subtle overlay so text remains perfectly readable while making photo extremely clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/60 via-[#0A0D14]/10 to-[#0A0D14]/90 sm:from-[#0A0D14]/75 sm:via-[#0A0D14]/12 sm:to-[#0A0D14]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#0A0D14_98%)] sm:bg-[radial-gradient(ellipse_at_center,transparent_35%,#0A0D14_85%)]" />
        </div>

        {/* FLOATING NAVBAR STRUCTURE - FLOATS AT THE TOP */}
        <div className="w-full z-30 flex flex-col relative select-none">
          
          {/* THE TOP NARROW UTILITY CONTACT LINE */}
          <div className="w-full bg-black/45 backdrop-blur-xs border-b border-white/5 py-2.5 text-[9.5px] xs:text-[10px] tracking-normal xs:tracking-[0.12em] sm:tracking-[0.18em]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-slate-350 font-medium font-sans">
              
              {/* Call Links - Left */}
              <div className="flex flex-col gap-1 py-0.5 justify-center">
                <a href="tel:6233214895" className="flex items-center gap-1.5 hover:text-[#d4af37] transition-all cursor-pointer">
                  <Phone className="w-3.5 h-3.5 text-amber-500/90" />
                  <span className="font-mono text-[10px] xs:text-[10.5px] font-medium tracking-normal">(62) 3321-4895</span>
                </a>
                <a 
                  href="https://wa.me/5562982223911" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-[#25D366] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="font-mono text-[10px] xs:text-[10.5px] font-medium tracking-normal">(62) 98222-3911</span>
                </a>
              </div>

              {/* Center / Right - Contacts, Social & Lang */}
              <div className="flex items-center gap-2 xs:gap-3 sm:gap-6">
                {/* Email Link */}
                <a href="mailto:dogimaradv@hotmail.com" className="hidden md:flex items-center gap-2 hover:text-[#d4af37] transition-all cursor-pointer">
                  <Mail className="w-3.5 h-3.5 text-amber-500/90" />
                  <span className="lowercase font-sans text-slate-400 font-light hover:text-white transition-colors">dogimaradv@hotmail.com</span>
                </a>

                {/* Instagram button: visible on both desktop & mobile config */}
                <a 
                  href="https://www.instagram.com/dogimar.advocacia?igsh=MXU1bWh6ZmRrcTdlNw==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 hover:text-[#d4af37] transition-all cursor-pointer text-slate-350"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-amber-500/90" />
                  <span className="font-sans text-[9px] xs:text-[10px] sm:text-[10.5px] text-slate-400 font-medium hover:text-white transition-colors tracking-tight xs:tracking-normal sm:tracking-wider lowercase">dogimar.advocacia</span>
                </a>

                {/* Action Language Button - Right (condensed on mobile) */}
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 hover:text-[#d4af37] transition-all cursor-pointer bg-white/5 py-0.5 px-1.5 xs:py-1 xs:px-2 rounded border border-white/10 text-[9px] xs:text-[10px]"
                  title="Switch Language / Alterar Idioma"
                >
                  <Globe className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-amber-500/95" />
                  <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* MAIN NAVBAR LOGO AREA */}
          <header className="w-full py-5 px-6 max-w-7xl mx-auto flex justify-between items-center bg-transparent border-b border-white/5">
            
            <div className="flex items-center gap-8 md:gap-12">
              {/* Elegant Logo Image "logo-superior" replacing the previous monogram div, maintaining exact size and aspect ratio with gold glowing neon drop-shadow and background lift */}
              <a href="#home" className="flex items-center group cursor-pointer select-none" id="navbar-logo-link">
                <div className="relative flex items-center justify-center">
                  {/* Subtle minimalist golden background aura */}
                  <div className="absolute w-16 h-8 bg-[#d4af37]/8 rounded-full filter blur-xl -z-10 pointer-events-none opacity-80" />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center justify-center"
                  >
                    <img 
                      src={logoSuperior} 
                      alt="Logo Superior" 
                      className="w-24 sm:w-28 h-14 sm:h-16 object-contain select-none transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_14px_rgba(212,175,55,0.6)] drop-shadow-[0_0_4px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_4px_28px_rgba(212,175,55,0.85)] brightness-110 saturate-[1.05]"
                    />
                  </motion.div>
                </div>
              </a>

              {/* Desktop Horizontal Navigation Links (Main menu next to logo) */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                <button 
                  onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-serif text-sm tracking-wide text-slate-350 hover:text-amber-400 hover:scale-105 transition-all duration-300 cursor-pointer text-left font-medium"
                >
                  {lang === 'pt' ? 'Nossa História' : 'Our Story'}
                </button>

                <button 
                  onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-serif text-sm tracking-wide text-slate-350 hover:text-amber-400 hover:scale-105 transition-all duration-300 cursor-pointer text-left font-medium"
                >
                  {lang === 'pt' ? 'Atuação & Valores' : 'Practice & Values'}
                </button>

                <button 
                  onClick={() => document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-serif text-sm tracking-wide text-slate-350 hover:text-amber-400 hover:scale-105 transition-all duration-300 cursor-pointer text-left font-medium"
                >
                  {lang === 'pt' ? 'Nossos Escritórios' : 'Our Branches'}
                </button>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="font-serif text-sm tracking-wide text-amber-500 hover:text-amber-400 hover:scale-105 transition-all duration-300 font-bold cursor-pointer text-left"
                >
                  {lang === 'pt' ? 'Agendar Consulta' : 'Book Appointment'}
                </button>
              </nav>
            </div>

            {/* Hamburger white toggle menu trigger - ONLY visible under desktop size (hidden on md and up) */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="block md:hidden p-1.5 rounded hover:bg-white/10 text-white hover:text-amber-400 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </header>

        </div>

        {/* HERO CENTRAL BRAND BOX AREA - HOUSES MAIN SLOGANS (LOGO REPLACED AND TEXT RE-POSITIONED BELOW FACE LINE) */}
        <div className="max-w-4xl mx-auto px-6 pt-[54vh] xs:pt-[57vh] sm:pt-[60vh] md:pt-[62vh] pb-24 flex flex-col items-center justify-center text-center relative z-10 select-none w-full">
          
          {/* Group wrapper for both the elements to ensure unified containment and custom spacing */}
          <div className="flex flex-col items-center justify-center w-full gap-0 select-none">
            
            {/* Central Logo Box represented by "logo-centro" image with a minimalist elegant gold border */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.88, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.1 }}
              className="relative w-40 xs:w-44 sm:w-48 h-26 xs:h-28 sm:h-32 p-3 border border-[#d4af37]/25 rounded-[1px] bg-black/20 backdrop-blur-xs shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_0_12px_rgba(212,175,55,0.04)] mb-0 sm:mb-0.5 flex items-center justify-center select-none group transition-all duration-500 hover:border-[#d4af37]/45"
            >
              <img 
                src={logoCentro} 
                alt="Logo Centro" 
                className="w-11/12 h-11/12 object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] transition-all duration-500 group-hover:scale-[1.02]"
              />
            </motion.div>

            {/* Grouped hero content container for tighter, adjustable spacing as requested by the user */}
            <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto mt-0">
              {/* Main Display Headline name */}
              <motion.h1 
                initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.2em] sm:tracking-[0.25em] text-[#faf6e8] leading-tight mb-2 select-text uppercase font-semibold"
              >
                DOGIMAR GOMES DOS SANTOS
              </motion.h1>

              {/* Subtle sub head */}
              <motion.p 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.95, ease: "easeOut", delay: 0.4 }}
                className="font-sans text-[10px] sm:text-xs text-amber-500 uppercase tracking-[0.3em] font-bold mb-4 select-text"
              >
                {lang === 'pt' ? 'ADVOCACIA E CONSULTORIA JURÍDICA' : 'LAW & LEGAL CONSULTING'}
              </motion.p>

              {/* Diamond Line element separator */}
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1, delay: 0.45 }}
                className="w-full max-w-sm h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/65 to-transparent flex items-center justify-center mb-4 relative"
              >
                <div className="bg-[#0A0D14]/90 px-3 py-0.5 rounded text-amber-500 text-xs translate-y-[-0.5px]">
                  ◇
                </div>
              </motion.div>

              {/* Excelencia | Tradicao | Confianca alignment */}
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                className="font-sans text-[10.5px] sm:text-xs text-[#d1c3a7] tracking-[0.35em] sm:tracking-[0.45em] font-semibold uppercase mb-5 text-center"
              >
                {lang === 'pt' ? (
                  <>EXCELÊNCIA <span className="text-[#d4af37]/50 mx-2 sm:mx-4">|</span> TRADIÇÃO <span className="text-[#d4af37]/50 mx-2 sm:mx-4">|</span> CONFIANÇA</>
                ) : (
                  <>EXCELLENCE <span className="text-[#d4af37]/50 mx-2 sm:mx-4">|</span> TRADITION <span className="text-[#d4af37]/50 mx-2 sm:mx-4">|</span> TRUST</>
                )}
              </motion.p>

              {/* Beautiful text: Há mais de 27 anos defendendo direitos com excelência... */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                className="font-serif text-[#ebe3cd] text-base sm:text-lg lg:text-xl font-light italic leading-relaxed max-w-2xl mb-7 select-text"
              >
                {lang === 'pt' ? (
                  <>
                    Há mais de <strong className="font-bold text-amber-400 not-italic">27 anos</strong> defendendo direitos com excelência e dedicação.
                  </>
                ) : (
                  <>
                    For over <strong className="font-bold text-amber-400 not-italic">27 years</strong> defending rights with excellence and dedication.
                  </>
                )}
              </motion.p>

              {/* Premium clear button CTA with balance scale symbol */}
              <div className="flex flex-col items-center w-full">
                <motion.button 
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.75 }}
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 sm:px-6 py-3.5 sm:py-4 bg-transparent border border-[#d4af37]/80 hover:bg-[#d4af37]/10 text-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 rounded shadow-[0_4px_20px_rgba(212,175,55,0.03)] flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer hover:shadow-[0_4px_30px_rgba(212,175,55,0.12)] hover:border-[#d4af37] w-fit max-w-[260px] sm:max-w-xs mx-auto"
                >
                  <Scale className="w-4 h-4 text-[#d4af37]" />
                  <span>{lang === 'pt' ? 'FALAR COM UM ESPECIALISTA' : 'TALK TO A SPECIALIST'}</span>
                </motion.button>
              </div>
            </div>

          </div>

        </div>

        {/* Elegant physical wave curve transition exactly mimicking the design picture */}
        <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none translate-y-[2px]">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto select-none">
            <path 
              d="M0,80 Q720,135 1440,80 L1440,120 L0,120 Z" 
              fill="#F8FAFC" 
            />
          </svg>
          
          {/* Animated golden arrow sitting on the peak of the curve */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-slate-100 transition-colors pointer-events-auto"
               onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="w-6 h-6 text-[#d4af37] animate-bounce" />
          </div>
        </div>

      </section>

      {/* 2. DETAILED HISTORY & DIRECT BIO SECTION (Replaced side-by-side with beautiful text flow) */}
      <section id="historia" className="relative bg-[#F8FAFC] py-24 px-6 sm:px-12 lg:px-20 border-b border-slate-200/50">
        
        {/* Soft luxury glow background lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/15 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Block: Complete set of 6 paragraphs with full unmodified reading structure with smooth scroll trigger */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-8 space-y-6"
            >
              
              <div className="flex flex-col mb-6">
                <span className="text-xs uppercase tracking-[0.3em] text-[#15408C] font-bold mb-2 block font-sans">
                  {lang === 'pt' ? 'Quem Somos' : 'Legal Counsel & Firm History'}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-slate-800 leading-tight">
                  {lang === 'pt' ? (
                    <>
                      Tradição, <span className="font-semibold italic text-[#15408C]">Experiência</span> e Compromisso
                    </>
                  ) : (
                    <>
                      Tradition, <span className="font-semibold italic text-[#15408C]">Experience</span> & Commitment
                    </>
                  )}
                </h2>
                <div className="w-16 h-[3px] bg-[#15408C] mt-4" />
              </div>

              {/* Original unmodified text blocks */}
              <div className="space-y-5 text-slate-700 font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed font-light text-left">
                {lang === 'pt' ? (
                  <>
                    <p>
                      Há mais de 27 anos, o escritório <strong className="font-bold text-[#15408C]">Dogimar Gomes dos Santos</strong> atua com compromisso, dedicação e excelência na defesa dos direitos da população de todo o estado de Goiás e Online por todo país.
                    </p>
                    <p>
                      Nossa história foi construída através da confiança de clientes que encontraram em nosso trabalho um atendimento sério, humanizado e especializado, sempre buscando soluções eficientes para cada situação.
                    </p>
                    <p>
                      Somos referência na atuação em <strong className="font-bold text-[#15408C]">Direito Previdenciário</strong>, auxiliando diariamente pessoas que tiveram benefícios negados pelo INSS, além de atuar em demandas envolvendo aposentadorias, pensão por morte, salário-maternidade, auxílio-doença, auxílio-acidente, BPC/LOAS e demais benefícios previdenciários.
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
                  </>
                )}
              </div>

            </motion.div>

            {/* Right Block: OAB legal credentials and members lists with micro-slide design on scroll */}
            <motion.div 
              initial={{ opacity: 0, xl: 10, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
              className="lg:col-span-4 lg:sticky lg:top-24 bg-white border border-slate-200/80 rounded-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] border-l-4 border-l-[#15408C]"
            >
              <h3 className="font-serif text-[10.5px] tracking-[0.25em] uppercase text-[#15408C] mb-6 font-bold border-b border-slate-100 pb-3">
                {lang === 'pt' ? 'Corpo Jurídico Residente' : 'Active Legal Council'}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex flex-col group">
                  <span className="text-slate-800 font-serif text-[13px] font-semibold tracking-wide group-hover:text-[#15408C] transition-colors duration-200">
                    Pedro Lucas Nogueira dos Santos
                  </span>
                  <span className="text-[10px] text-[#15408C] font-mono mt-0.5 font-bold">
                    OAB/GO 76.522
                  </span>
                </div>

                <div className="flex flex-col group border-t border-slate-100 pt-3">
                  <span className="text-slate-800 font-serif text-[13px] font-semibold tracking-wide group-hover:text-[#15408C] transition-colors duration-200">
                    Dogimar Gomes dos Santos
                  </span>
                  <span className="text-[10px] text-[#15408C] font-mono mt-0.5 font-bold">
                    OAB/GO 17.792
                  </span>
                </div>

                <div className="flex flex-col group border-t border-slate-100 pt-3">
                  <span className="text-slate-800 font-serif text-[13px] font-semibold tracking-wide group-hover:text-[#15408C] transition-colors duration-200">
                    Isadora Nogueira dos Santos
                  </span>
                  <span className="text-[10px] text-[#15408C] font-mono mt-0.5 font-bold">
                    OAB/GO 64.126
                  </span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 bg-[#15408C] hover:bg-[#11316B] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded cursor-pointer shadow-sm hover:shadow-md"
                >
                  {lang === 'pt' ? 'SOLICITAR CONSULTA' : 'REQUEST CONSULTATION'}
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. KEY METADATA SUMMARY STICKY GRID BAR WITH SCROLL ANIMATIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 bg-white overflow-hidden">
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={() => {
            const el = document.getElementById('unidades');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="relative px-8 sm:px-12 py-8 border-r border-slate-150 flex flex-col justify-center text-left hover:bg-slate-50/70 active:bg-slate-100/60 transition-all duration-300 focus:outline-none cursor-pointer group overflow-hidden"
        >
          {/* Elegant royal blue accent bar indicating clickability */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#15408C] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="flex items-center justify-between w-full mb-1.5">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#15408C] font-semibold flex items-center gap-1.5 transition-colors font-bold">
              {lang === 'pt' ? 'Unidades em Goiás' : 'Offices in Goiás'} 
              <span className="text-[10px] bg-blue-105 text-[#15408C] px-2 py-0.5 rounded-full font-sans font-bold leading-none">6</span>
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
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="px-8 sm:px-12 py-8 border-r border-slate-150 flex flex-col justify-center text-left"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#15408C] mb-1.5 font-bold">
            {lang === 'pt' ? 'Atendimento Direto' : 'Direct Support'}
          </p>
          <p className="text-sm font-medium text-slate-700 font-mono tracking-wide">
            (62) 9 8222-3911 / 3321-4895
          </p>
          <a 
            href="https://www.instagram.com/dogimar.advocacia?igsh=MXU1bWh6ZmRrcTdlNw==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-xs text-[#15408C]/90 hover:text-[#15408C] font-sans font-medium transition-colors mt-2"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
          className="px-8 sm:px-12 py-8 flex flex-col justify-center text-left"
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
                {lang === 'pt' ? 'Compromisso com Resultados' : 'Commitment to Results'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Dedicação total à entrega de soluções jurídicas eficazes, com uma atuação técnica diferenciada e totalmente orientada ao êxito de suas causas.' 
                  : 'Total dedication to delivering effective legal solutions, with distinguished technical performance fully oriented toward the success of your cases.'}
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
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p>© 2026 Paulo César. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
            <a 
              href="https://www.instagram.com/dogimar.advocacia?igsh=MXU1bWh6ZmRrcTdlNw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer sm:border-l sm:border-slate-200/20 sm:pl-4 pt-1 sm:pt-0"
              title="Instagram Dogimar Advocacia"
            >
              <Instagram className="w-4 h-4 text-slate-400" />
              <span className="font-sans">Instagram</span>
            </a>
          </div>
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
                            {t.modal.phone} *
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(62) 98222-3911"
                            className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 placeholder-slate-400 px-4 py-2.5 rounded text-sm outline-none transition-colors shadow-sm font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                            {t.modal.cpf} *
                          </label>
                          <input 
                            type="text" 
                            name="cpf"
                            required
                            value={formData.cpf}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, "");
                              if (val.length > 11) val = val.slice(0, 11);
                              if (val.length > 9) {
                                val = val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                              } else if (val.length > 6) {
                                val = val.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
                              } else if (val.length > 3) {
                                val = val.replace(/(\d{3})(\d{0,3})/, "$1.$2");
                              }
                              setFormData(prev => ({ ...prev, cpf: val }));
                            }}
                            placeholder="000.000.000-00"
                            className="w-full bg-white border border-slate-200 focus:border-[#15408C] text-slate-800 placeholder-slate-400 px-4 py-2.5 rounded text-sm outline-none transition-colors shadow-sm font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-600 mb-1.5 font-bold">
                          {t.modal.subject} *
                        </label>
                        <textarea 
                          name="subject"
                          required
                          rows={3}
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={lang === 'pt' ? 'Ex: Gostaria de agendar uma consulta sobre aposentadoria...' : 'e.g. I would like to schedule a consultation regarding retirement...'}
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

      {/* 7. SLIDE-OUT MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Semi-transparent backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-[#06080F]/90 backdrop-blur-md"
            />

            {/* Drawer content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 24, stiffness: 190 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#0B0D14] border-l border-white/5 shadow-2xl p-8 flex flex-col justify-between z-10"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-8 border-b border-white/5 mb-8">
                  {/* Elegant Logo Image "logo-superior" inside mobile drawer, matching navbar style with floating animation */}
                  <div className="relative flex items-center justify-center select-none">
                    {/* Subtle minimalist golden background aura */}
                    <div className="absolute w-14 h-7 bg-[#d4af37]/8 rounded-full filter blur-xl -z-10 pointer-events-none opacity-80" />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex items-center justify-center"
                    >
                      <img 
                        src={logoSuperior} 
                        alt="Logo Superior" 
                        className="w-24 h-14 object-contain select-none filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.55)] drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] brightness-110 saturate-[1.05]"
                      />
                    </motion.div>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 px-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-6">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left font-serif text-lg text-slate-300 hover:text-amber-400 transition-colors py-1 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Nossa História' : 'Our Story'}
                  </button>

                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left font-serif text-lg text-slate-300 hover:text-amber-400 transition-colors py-1 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Atuação & Valores' : 'Practice & Values'}
                  </button>

                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left font-serif text-lg text-slate-300 hover:text-amber-400 transition-colors py-1 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Nossos Escritórios' : 'Our Branches'}
                  </button>

                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="text-left font-serif text-lg text-amber-500 hover:text-amber-400 transition-colors py-1 font-bold cursor-pointer"
                  >
                    {lang === 'pt' ? 'Agendar Consulta' : 'Book Appointment'}
                  </button>
                </nav>
              </div>

              {/* Brand details and Instagram link at bottom of drawer */}
              <div className="border-t border-white/5 pt-8 mt-auto flex flex-col gap-4">
                <a 
                  href="https://www.instagram.com/dogimar.advocacia?igsh=MXU1bWh6ZmRrcTdlNw==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-[#d4af37] transition-colors"
                >
                  <Instagram className="w-5 h-5 text-amber-500" />
                  <span>Instagram</span>
                </a>
                <p className="text-[10px] text-slate-500 font-sans tracking-tight">
                  © 2026 Dogimar Gomes dos Santos.<br />{lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
                </p>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 8. FLOATING WHATSAPP BUTTON (Directs user to the "Agendar Consulta" form system with elegant official styling) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.65)] hover:bg-[#20BA5A] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          title={lang === 'pt' ? 'Agendar Consulta via WhatsApp' : 'Book Consultation via WhatsApp'}
          id="whatsapp-floating-button"
        >
          <svg 
            className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 transition-transform" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White speech bubble background wrapper */}
            <path 
              fill="#FFFFFF" 
              d="M12.004 2c-5.51 0-9.993 4.483-9.993 9.993 0 1.761.458 3.479 1.329 4.987l-1.411 5.15 5.271-1.385c1.451.79 3.09 1.208 4.804 1.208 5.51 0 9.993-4.483 9.993-9.993C21.997 6.483 17.514 2 12.004 2z" 
            />
            {/* Original WhatsApp brand green phone logo inside */}
            <path 
              fill="#25D366" 
              d="M16.945 14.542c-.225-.113-1.328-.656-1.533-.73-.205-.075-.353-.112-.503.112-.149.225-.578.73-.709.88-.13.15-.261.169-.486.056-.225-.113-.949-.35-1.808-1.117-.668-.596-1.12-1.332-1.251-1.558-.131-.225-.014-.347.098-.459.102-.101.225-.262.338-.393.112-.131.15-.225.225-.375.075-.15.037-.281-.019-.393-.056-.113-.503-1.213-.69-1.662-.181-.437-.367-.377-.503-.385-.13-.006-.28-.007-.43-.007-.15 0-.393.056-.599.28-.206.225-.786.769-.786 1.874 0 1.106.804 2.175.917 2.325.113.15 1.582 2.415 3.832 3.385.535.23 1.042.414 1.4.527.537.171 1.025.147 1.411.089.43-.064 1.329-.543 1.515-1.066.187-.524.187-.973.131-1.066-.056-.093-.206-.15-.43-.262z" 
            />
          </svg>
        </button>
      </div>

    </div>
  );
}
