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
    phone: string;
    cpf: string;
    subject: string;
    submit: string;
    success: string;
    close: string;
  };
}

export const translations: Record<Language, TranslationSet> = {
  pt: {
    topBar: {
      phone: "(62) 3321-4895",
      email: "dogimaradv@hotmail.com",
      schedule: "Atendimento Seg - Sex: 08:00 - 11:30 | 13:00 - 17:30",
    },
    nav: {
      brand: "DOGIMAR GOMES DOS SANTOS",
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
      years: { value: "27+", label: "Anos de Experiência" },
      cases: { value: "1.2k+", label: "Casos de Sucesso" },
      rating: { value: "99%", label: "Taxa de Aprovação" },
    },
    modal: {
      title: "Entre em Contato",
      subtitle: "Descreva resumidamente o seu caso ou necessidade jurídica abaixo. Você será redirecionado para o nosso WhatsApp para receber atendimento imediato e especializado.",
      name: "Nome Completo",
      phone: "Telefone / WhatsApp",
      cpf: "CPF",
      subject: "Resumo do Caso",
      submit: "ENVIAR MENSAGEM VIA WHATSAPP",
      success: "Redirecionando para o WhatsApp...",
      close: "Fechar",
    },
  },
  en: {
    topBar: {
      phone: "(62) 3321-4895",
      email: "dogimaradv@hotmail.com",
      schedule: "Hours Mon - Fri: 08:00 AM - 11:30 AM | 01:00 PM - 05:30 PM",
    },
    nav: {
      brand: "DOGIMAR GOMES DOS SANTOS",
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
      years: { value: "27+", label: "Years Experience" },
      cases: { value: "1.2k+", label: "Successful Cases" },
      rating: { value: "99%", label: "Satisfaction Rate" },
    },
    modal: {
      title: "Get in Touch",
      subtitle: "Briefly describe your case or legal need below. You will be redirected to our WhatsApp to receive immediate and specialized service.",
      name: "Full Name",
      phone: "Phone / WhatsApp",
      cpf: "CPF Number",
      subject: "Case Summary",
      submit: "SEND MESSAGE VIA WHATSAPP",
      success: "Redirecting to WhatsApp...",
      close: "Close",
    },
  }
};
