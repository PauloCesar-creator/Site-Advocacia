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
  Award
} from 'lucide-react';
import { Language, translations } from './types';
import lawyerBg from './assets/images/lawyer_hand_on_chin_1779310808629.png';

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
    <div className="min-h-screen bg-legal-dark text-[#E5E5E5] font-sans selection:bg-gold-light selection:text-legal-dark overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="w-full bg-[#050505] border-b border-white/5 py-2.5 text-[11px] text-white/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Contacts */}
          <div className="flex flex-wrap justify-center items-center gap-6 font-sans tracking-wide">
            <span className="flex items-center gap-2 hover:text-gold-light transition-colors cursor-pointer">
              <Phone className="w-3 h-3 text-gold-dark" />
              <span>{t.topBar.phone}</span>
            </span>
            <span className="flex items-center gap-2 hover:text-gold-light transition-colors cursor-pointer">
              <Mail className="w-3 h-3 text-gold-dark" />
              <span>{t.topBar.email}</span>
            </span>
            <span className="hidden sm:flex items-center gap-2 opacity-80">
              <Clock className="w-3 h-3 text-gold-dark/80" />
              <span>{t.topBar.schedule}</span>
            </span>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/40 bg-white/[0.03] py-1 px-2.5 rounded border border-white/5">
              <Award className="w-3 h-3 text-gold-dark" />
              <span className="text-[10px] tracking-widest font-medium uppercase text-white/70">
                {lang === 'pt' ? 'Escritório de Elite' : 'Elite Legal Practice'}
              </span>
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded text-[10px] text-gold-light font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
              title="Mudar Idioma / Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 w-full bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo / Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="p-2.5 bg-white/[0.02] border border-white/10 rounded group-hover:border-gold-light/40 transition-all duration-300">
              <Scale className="w-5 h-5 text-gold-dark group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-light text-white group-hover:text-gold-light transition-colors duration-300 leading-none">
                ADVOCACIA <span className="text-gold-dark font-bold">&</span> ASSOCIADOS
              </span>
              <span className="text-[9px] tracking-[0.4em] text-gold-light/80 mt-1.5 uppercase font-medium">
                {lang === 'pt' ? 'Estratégia Jurídica de Alto Impacto' : 'High Impact Legal Strategy'}
              </span>
            </div>
          </motion.div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'about', label: t.nav.about },
              { id: 'services', label: t.nav.services },
              { id: 'contact', label: t.nav.contact }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`text-xs tracking-[0.22em] font-medium uppercase transition-all relative py-2 cursor-pointer ${
                  activeMenu === item.id ? 'text-gold-light' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {activeMenu === item.id && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Pages dropdown style */}
            <div className="relative group cursor-pointer">
              <span className="text-xs tracking-[0.22em] font-medium uppercase text-white/50 group-hover:text-white flex items-center gap-1 transition-colors">
                {lang === 'pt' ? 'Mídia' : 'Pages'}
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#151515] border border-white/5 rounded shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href="#blog" className="block px-4 py-2.5 text-xs text-white/60 hover:bg-white/[0.02] hover:text-[#C5A059] font-medium tracking-wide">
                  {lang === 'pt' ? 'Artigos & Notícias' : 'Articles & News'}
                </a>
                <a href="#faq" className="block px-4 py-2.5 text-xs text-white/60 hover:bg-white/[0.02] hover:text-[#C5A059] font-medium tracking-wide">
                  {lang === 'pt' ? 'Perguntas Frequentes' : 'FAQ'}
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
              className="relative hidden sm:inline-flex items-center justify-center px-6 py-3 border border-gold-dark hover:bg-gold-dark hover:text-black text-gold-light text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer"
            >
              {t.nav.cta}
            </motion.button>
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden p-2 text-[#C5A059] hover:bg-white/[0.02] rounded border border-white/10"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 3. HERO / IMAGE SECTION - SIDE-BY-SIDE PLATINUM LAYOUT */}
      <section className="relative min-h-[calc(100vh-120px)] flex flex-col lg:flex-row items-stretch overflow-hidden bg-[#0F0F0F] border-b border-white/5">
        
        {/* Left Column: Content */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-24 relative z-15">
          <div className="max-w-2xl mx-auto lg:mx-0">
            
            {/* Decorative Gold Bar */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-20 h-[3px] bg-gold-dark mb-8 origin-left"
            />

            {/* Core Elegant Headline with Italic Elements */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light italic text-white leading-[1.15] mb-6 tracking-wide"
            >
              {lang === 'pt' ? (
                <>
                  Estratégia Jurídica <br />
                  <span className="font-bold not-italic text-gold-light">de Alto Impacto</span>
                </>
              ) : (
                <>
                  High-Impact <br />
                  <span className="font-bold not-italic text-gold-light">Legal Strategy</span>
                </>
              )}
            </motion.h1>

            {/* Styled Subtitle text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-sans text-base sm:text-lg text-white/50 max-w-md mb-10 leading-relaxed font-light"
            >
              {lang === 'pt' 
                ? 'Defenderemos seus interesses com a sofisticação, rigor técnico e excelência estratégica que casos complexos demandam.'
                : 'We defend your interests with the sophistication, technical precision, and absolute dedication that complex cases demand.'}
            </motion.p>

            {/* Gorgeous Action Trigger Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-gold-dark hover:bg-[#D4B57A] text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>{t.nav.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => {
                  const element = document.getElementById('details');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-white/20 hover:border-gold-light font-sans font-bold text-xs uppercase tracking-widest text-[#E5E5E5] hover:text-gold-light hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
              >
                {lang === 'pt' ? 'Ver Atuação' : 'Our Practice'}
              </button>
            </motion.div>

            {/* Dynamic statistics row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 sm:gap-8 border-t border-white/10 pt-8"
            >
              {[
                { stat: t.stats.years.value, label: t.stats.years.label },
                { stat: t.stats.cases.value, label: t.stats.cases.label },
                { stat: t.stats.rating.value, label: t.stats.rating.label }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl text-gold-light font-light tracking-tight mb-0.5">
                    {item.stat}
                  </span>
                  <span className="text-[10px] text-white/40 tracking-widest uppercase font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Right Column: Visual Frame featuring Seated Thinker Image */}
        <div className="lg:w-1/2 w-full min-h-[450px] lg:min-h-0 relative bg-[#151515] overflow-hidden flex items-center justify-center">
          
          {/* Subtle Background Silhouette Element */}
          <div className="absolute inset-0 z-0">
            <img 
              src={lawyerBg} 
              alt="Lawyer Seated" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 pointer-events-none filter brightness-95 opacity-80"
            />
            {/* Dynamic linear overlay fade-out to black from left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-transparent z-10 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10 lg:hidden" />
          </div>

          {/* Majestic Thin Aesthetic Gold Frame overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] border border-[#C5A059]/25 z-20 pointer-events-none hidden sm:block" />

          {/* Platinum Context Medal Badge (Bottom right) */}
          <div className="absolute bottom-10 right-10 text-right z-30">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-semibold">
              {lang === 'pt' ? 'Dr. Fulano de Tal' : 'Dr. Fulano de Tal'}
            </span>
            <br />
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium mt-1 inline-block">
              {lang === 'pt' ? 'Sócio Fundador' : 'Senior Partner'}
            </span>
          </div>

        </div>

      </section>

      {/* 4. KEY METADATA SUMMARY GRID BAR */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 bg-white/[0.01]">
        
        <div className="px-8 sm:px-12 py-8 border-r border-[#151515] md:border-white/5 flex flex-col justify-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-1.5 font-semibold">
            {lang === 'pt' ? 'Localização' : 'Location'}
          </p>
          <p className="text-sm font-light text-white/80 font-sans tracking-wide">
            {lang === 'pt' ? 'Av. Paulista, 2000 — São Paulo, SP' : 'Paulista Ave, 2000 — São Paulo, Brazil'}
          </p>
        </div>

        <div className="px-8 sm:px-12 py-8 border-r border-[#151515] md:border-white/5 flex flex-col justify-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-1.5 font-semibold">
            {lang === 'pt' ? 'Atendimento Direto' : 'Direct Support'}
          </p>
          <p className="text-sm font-light text-white/80 font-sans tracking-wide">
            {t.topBar.phone}
          </p>
        </div>

        <div className="px-8 sm:px-12 py-8 flex flex-col justify-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-1.5 font-semibold">
            {lang === 'pt' ? 'Áreas Principais' : 'Core Disciplines'}
          </p>
          <p className="text-sm font-light italic text-white/70 font-serif">
            {lang === 'pt' ? 'Corporativo, Tributário & Civil de Elite' : 'Corporate, Tax & Elite Civil Litigation'}
          </p>
        </div>

      </section>

      {/* 5. PRACTICAL HIGHLIGHT DETAILS AREA */}
      <section id="details" className="relative bg-[#111] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059] mb-3 font-semibold font-sans">
              {lang === 'pt' ? 'Nossos Valores' : 'Our Principles'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
              {lang === 'pt' ? 'Alto Padrão em Advocacia' : 'The Standard of True Craftsmanship'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 bg-[#151515] border border-white/5 rounded-lg hover:border-[#C5A059]/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/[0.02] border border-white/10 rounded flex items-center justify-center text-[#C5A059] mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-3">
                {lang === 'pt' ? 'Segurança & Sigilo' : 'Safety & Security'}
              </h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Garantimos absoluto sigilo profissional e compliance rígido com todas as leis de segurança de dados.' 
                  : 'We guarantee absolute professional secrecy and strict compliance with all data protection regulations.'}
              </p>
            </div>

            <div className="p-8 bg-[#151515] border border-white/5 rounded-lg hover:border-[#C5A059]/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/[0.02] border border-white/10 rounded flex items-center justify-center text-[#C5A059] mb-6">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-3">
                {lang === 'pt' ? 'Altíssima Reputação' : 'High Reputation'}
              </h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Consolidado como um dos escritórios de maior prestígio, com atuação destacada em tribunais de todo o país.' 
                  : 'Established as one of the most prestigious law firms, with outstanding achievements across federal courts.'}
              </p>
            </div>

            <div className="p-8 bg-[#151515] border border-white/5 rounded-lg hover:border-[#C5A059]/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/[0.02] border border-white/10 rounded flex items-center justify-center text-[#C5A059] mb-6">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-3">
                {lang === 'pt' ? 'Atendimento Personalizado' : 'Personalized Support'}
              </h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light font-sans">
                {lang === 'pt' 
                  ? 'Cada cliente recebe atendimento dedicado com soluções sob medida focadas na resolução ágil do seu problema.' 
                  : 'Every client receives dedicated support with customized solutions focused on rapid conflict resolution.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. IMMERSIVE COMPACT FOOTER */}
      <footer className="w-full bg-[#050505] border-t border-white/5 py-10 text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Paulo César. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          <div className="flex gap-6 font-sans tracking-widest text-[10px] uppercase">
            <span className="hover:text-gold-light cursor-pointer transition-colors">Termos de Uso</span>
            <span className="hover:text-gold-light cursor-pointer transition-colors">Política de Privacidade</span>
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
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-lg shadow-2xl z-10 overflow-hidden"
            >
              
              {/* Elegant Gold Trim */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />

              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSubmitted(false);
                }}
                className="absolute top-5 right-5 p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
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
                      <Scale className="w-5 h-5 text-gold-light" />
                      <h2 className="font-serif text-2xl font-medium text-stone-100">
                        {t.modal.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-400 mb-6 leading-relaxed">
                      {t.modal.subtitle}
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                          {t.modal.name} *
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={lang === 'pt' ? 'Ex: Dr. Roberto Silva' : 'e.g. Robert Smith'}
                          className="w-full bg-stone-950 border border-stone-800 focus:border-gold-light text-stone-100 placeholder-stone-600 px-4 py-2.5 rounded text-sm outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                            {t.modal.email} *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="roberto@provedor.com"
                            className="w-full bg-stone-950 border border-stone-800 focus:border-gold-light text-stone-100 placeholder-stone-600 px-4 py-2.5 rounded text-sm outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                            {t.modal.phone} *
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(11) 99999-9999"
                            className="w-full bg-stone-950 border border-stone-800 focus:border-gold-light text-stone-100 placeholder-stone-600 px-4 py-2.5 rounded text-sm outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                          {t.modal.area}
                        </label>
                        <select 
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full bg-stone-950 border border-stone-800 focus:border-gold-light text-stone-100 px-4 py-2.5 rounded text-sm outline-none transition-colors cursor-pointer"
                        >
                          <option value="civil">{lang === 'pt' ? 'Direito Civil / Contratos' : 'Civil Law & Contracts'}</option>
                          <option value="business">{lang === 'pt' ? 'Direito Empresarial & Tributário' : 'Corporate & Tax Law'}</option>
                          <option value="criminal">{lang === 'pt' ? 'Defesa Criminal de Elite' : 'Elite Criminal Defense'}</option>
                          <option value="labor">{lang === 'pt' ? 'Direito Trabalhista Empresarial' : 'Employment & Labor'}</option>
                          <option value="other">{lang === 'pt' ? 'Outra Família de Casos' : 'Other Case Types'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                          {t.modal.message} *
                        </label>
                        <textarea 
                          name="message"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={lang === 'pt' ? 'Gostaria de agendar uma consulta sobre...' : 'I would like to schedule a session regarding...'}
                          className="w-full bg-stone-950 border border-stone-800 focus:border-gold-light text-stone-100 placeholder-stone-600 px-4 py-2.5 rounded text-sm outline-none transition-colors resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                        <Lock className="w-3.5 h-3.5 text-gold-light/50" />
                        <span>{lang === 'pt' ? 'Suas informações estão 100% criptografadas e seguras.' : 'Your information is 100% encrypted and secure.'}</span>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-gold-light hover:bg-gold-hover text-legal-dark text-xs tracking-[0.15em] font-bold uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-legal-dark border-t-transparent rounded-full animate-spin" />
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
                    <div className="w-16 h-16 bg-stone-950 border border-gold-light/40 rounded-full flex items-center justify-center text-gold-light mb-6 animate-pulse">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-stone-100 mb-3">
                      {lang === 'pt' ? 'Solicitação Enviada!' : 'Request Received!'}
                    </h3>
                    <p className="text-sm text-stone-400 max-w-sm leading-relaxed mb-8">
                      {t.modal.success}
                    </p>
                    <button 
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsSubmitted(false);
                      }}
                      className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-100 text-xs tracking-wider uppercase font-semibold transition-all rounded outline-none cursor-pointer"
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
