export type Language = 'pt' | 'en';

export interface TranslationSet {
  topBar: {
    phone: string;
    email: string;
    schedule: string;
  };
  nav: {
    brand: string;
    home: string;
    about: string;
    services: string;
    contact: string;
    cta: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: {
    years: { value: string; label: string };
    cases: { value: string; label: string };
    rating: { value: string; label: string };
  };
  modal: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    area: string;
    message: string;
    submit: string;
    success: string;
    close: string;
  };
}

export const translations: Record<Language, TranslationSet> = {
  pt: {
    topBar: {
      phone: "+55 (11) 98765-4321",
      email: "contato@attorneyster.com.br",
      schedule: "Atendimento Seg - Sex: 08:00 - 18:00",
    },
    nav: {
      brand: "ATTORNEYSTER",
      home: "Início",
      about: "Sobre Nós",
      services: "Áreas de Atuação",
      contact: "Contato",
      cta: "AGENDAR CONSULTA",
    },
    hero: {
      tagline: "ADVOGADOS ESPECIALISTAS CERTIFICADOS",
      title: "Excelência e Compromisso em Defesa dos Seus Direitos",
      description: "Auxiliamos indivíduos e famílias em disputas judiciais de alta complexidade contra grandes corporações, garantindo uma representação jurídica implacável e ética.",
      ctaPrimary: "ENTRAR EM CONTATO",
      ctaSecondary: "CONHEÇA NOSSO TRABALHO",
    },
    stats: {
      years: { value: "15+", label: "Anos de Experiência" },
      cases: { value: "1.2k+", label: "Casos de Sucesso" },
      rating: { value: "99%", label: "Taxa de Aprovação" },
    },
    modal: {
      title: "Agende sua Consulta",
      subtitle: "Preencha o formulário abaixo e um de nossos especialistas entrará em contato em menos de 2 horas.",
      name: "Nome Completo",
      email: "E-mail de Contato",
      phone: "Telefone / WhatsApp",
      area: "Área Jurídica de Interesse",
      message: "Breve resumo do seu caso",
      submit: "ENVIAR SOLICITAÇÃO",
      success: "Solicitação enviada com sucesso! Entraremos em contato em breve.",
      close: "Fechar",
    },
  },
  en: {
    topBar: {
      phone: "+1 (911) 98765-4321",
      email: "contact@attorneyster.com",
      schedule: "Hours Mon - Fri: 08:00 AM - 06:00 PM",
    },
    nav: {
      brand: "ATTORNEYSTER",
      home: "Home",
      about: "About Us",
      services: "Practice Areas",
      contact: "Contact",
      cta: "BOOK A CONSULTATION",
    },
    hero: {
      tagline: "CERTIFIED LAW PROFESSIONALS",
      title: "We're Group Of Certified Law Professionals",
      description: "We have helped countless clients and families go up against the largest offshore companies and international entities and win.",
      ctaPrimary: "GET IN TOUCH",
      ctaSecondary: "LEARN MORE",
    },
    stats: {
      years: { value: "15+", label: "Years Experience" },
      cases: { value: "1.2k+", label: "Successful Cases" },
      rating: { value: "99%", label: "Satisfaction Rate" },
    },
    modal: {
      title: "Book your Consultation",
      subtitle: "Fill out the form below and one of our experts will contact you within 2 hours.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp",
      area: "Legal Area of Interest",
      message: "Brief summary of your case",
      submit: "SUBMIT REQUEST",
      success: "Request submitted successfully! We will get in touch shortly.",
      close: "Close",
    },
  }
};
