/*
 * Diccionario de textos de interfaz del armazón (E30-I02, ADR-001, ADR-017).
 * `en` debe tener exactamente las mismas claves que `es`: TypeScript lo exige con
 * `Dictionary` (astro check falla si falta o sobra una clave).
 * Etiquetas del menú: DESIGN.md 2.1. Textos en-US redactados por el agente; Felipe valida.
 */
import type { Lang } from './lang';

const es = {
  skipLink: 'Saltar al contenido',
  logo: {
    label: 'Felipe Cuevas, inicio',
  },
  nav: {
    label: 'Navegación principal',
    home: 'Inicio',
    education: 'Educación',
    experience: 'Experiencia',
    experienceSummary: 'Resumen',
    developer: 'Desarrollador',
    lecturer: 'Docente Universitario',
    instructor: 'Instructor REUF',
    talentoDigital: 'Talento Digital',
    community: 'Comunidad',
    forum: 'Foro',
    resources: 'Recursos',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  theme: {
    toDark: 'Activar tema oscuro',
    toLight: 'Activar tema claro',
  },
  language: {
    label: 'Idioma',
    // Nombre del enlace que lleva a ESTA versión de idioma; se lee de ui[idioma de destino]
    // y el enlace lleva lang y hreflang de destino (DESIGN.md 7.2).
    versionLink: 'Versión en español de esta página',
  },
  footer: {
    // Máximo 40 caracteres (decidida por Felipe).
    tagline: 'Instructor de Desarrollo Fullstack e IA.',
    navTitle: 'Explorar',
    socialTitle: 'Redes',
    downloadCv: 'Descargar CV',
    // Nombre accesible y title del enlace de descarga (DESIGN.md 7.3: formato del archivo).
    downloadCvLabel: 'Descargar CV (PDF)',
    privacy: 'Política de privacidad',
    newTab: '(se abre en una pestaña nueva)',
  },
  // Formulario de contacto (E140-I01, ADR-035 y ADR-083). Textos en-US por validar (ADR-017).
  contactForm: {
    name: 'Nombre completo',
    namePlaceholder: 'Ej.: Ana Rojas',
    email: 'Correo electrónico',
    emailPlaceholder: 'Ej.: ana@correo.cl',
    subject: 'Asunto',
    subjectPlaceholder: 'Ej.: Propuesta de trabajo',
    message: 'Mensaje',
    messagePlaceholder: 'Cuéntame tu propuesta o consulta…',
    // El checkbox se arma como: consentBefore + enlace (consentLink) + consentAfter.
    consentBefore: 'Leí y acepto la ',
    consentLink: 'política de privacidad',
    consentAfter: '.',
    required: '(obligatorio)',
    submit: 'Enviar mensaje',
    sending: 'Enviando tu mensaje…',
    errorSummary: 'Revisa los campos marcados para poder enviar tu mensaje.',
    errorName: 'Escribe tu nombre.',
    errorEmail: 'Escribe un correo válido, por ejemplo ana@correo.cl.',
    errorSubject: 'Escribe el asunto del mensaje.',
    errorMessage: 'Escribe tu mensaje.',
    errorConsent: 'Para enviar el mensaje debes aceptar la política de privacidad.',
    errorTurnstile:
      'Espera un momento a que termine la verificación de seguridad y vuelve a enviar.',
    errorTurnstileDown:
      'La verificación de seguridad no está disponible. Escríbeme a contacto@felipecuevas.dev mientras tanto.',
    errorSend:
      'No pude enviar tu mensaje. Inténtalo de nuevo en unos minutos o escríbeme a contacto@felipecuevas.dev.',
    noscript:
      'Este formulario necesita JavaScript para verificar que no eres un robot. Si prefieres no activarlo, escríbeme a contacto@felipecuevas.dev o por LinkedIn.',
  },
  // Página de agradecimiento (E150-I01, ADR-086). Textos en-US por validar (ADR-017).
  thankYou: {
    metaTitle: 'Mensaje enviado | Felipe Cuevas',
    metaDescription:
      'Tu mensaje fue enviado correctamente. Te responderé a la brevedad al correo que indicaste.',
    ogImageAlt:
      'Felipe Cuevas, ingeniero informático, con las insignias de sus certificaciones de Oracle, AWS, Python Institute y Anthropic',
    kicker: 'Contacto',
    title: '¡Mensaje enviado!',
    lead: 'Gracias por contactarme. Recibí tu mensaje correctamente y me comprometo a responderte a la brevedad posible (usualmente dentro de 24-48 horas).',
    home: 'Volver al inicio',
    another: 'Enviar otro mensaje',
  },
  backToTop: 'Volver arriba',
};

type Dictionary = {
  [K in keyof typeof es]: (typeof es)[K] extends string
    ? string
    : { [P in keyof (typeof es)[K]]: string };
};

const en: Dictionary = {
  skipLink: 'Skip to content',
  logo: {
    label: 'Felipe Cuevas, home',
  },
  nav: {
    label: 'Main navigation',
    home: 'Home',
    education: 'Education',
    experience: 'Experience',
    experienceSummary: 'Overview',
    developer: 'Developer',
    lecturer: 'University Lecturer',
    instructor: 'REUF Instructor',
    talentoDigital: 'Talento Digital',
    community: 'Community',
    forum: 'Forum',
    resources: 'Resources',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  theme: {
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
  },
  language: {
    label: 'Language',
    versionLink: 'English version of this page',
  },
  footer: {
    // Máximo 40 caracteres (decidida por Felipe).
    tagline: 'Teaching AI and Fullstack Development.',
    navTitle: 'Explore',
    socialTitle: 'Social',
    downloadCv: 'Download CV',
    // El CV solo existe en español (ADR-017).
    downloadCvLabel: 'Download CV (PDF, Spanish)',
    privacy: 'Privacy policy',
    newTab: '(opens in a new tab)',
  },
  contactForm: {
    name: 'Full name',
    namePlaceholder: 'E.g. Jane Doe',
    email: 'Email',
    emailPlaceholder: 'E.g. jane@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'E.g. Job offer',
    message: 'Message',
    messagePlaceholder: 'Tell me about your proposal or question…',
    consentBefore: 'I have read and accept the ',
    consentLink: 'privacy policy',
    consentAfter: '.',
    required: '(required)',
    submit: 'Send message',
    sending: 'Sending your message…',
    errorSummary: 'Please check the highlighted fields to send your message.',
    errorName: 'Enter your name.',
    errorEmail: 'Enter a valid email address, for example jane@example.com.',
    errorSubject: 'Enter a subject for your message.',
    errorMessage: 'Enter your message.',
    errorConsent: 'You must accept the privacy policy to send your message.',
    errorTurnstile: 'Please wait for the security check to finish, then send again.',
    errorTurnstileDown:
      'The security check is not available. Please email me at contacto@felipecuevas.dev in the meantime.',
    errorSend:
      'Your message could not be sent. Please try again in a few minutes or email me at contacto@felipecuevas.dev.',
    noscript:
      'This form needs JavaScript to check that you are not a robot. If you prefer not to enable it, email me at contacto@felipecuevas.dev or reach me on LinkedIn.',
  },
  thankYou: {
    metaTitle: 'Message sent | Felipe Cuevas',
    metaDescription:
      'Your message was sent successfully. I will reply as soon as possible to the email address you provided.',
    ogImageAlt:
      'Felipe Cuevas, computer engineer, with the badges of the Oracle, AWS, Python Institute and Anthropic certifications',
    kicker: 'Contact',
    title: 'Message sent!',
    lead: 'Thank you for reaching out. I received your message and I will get back to you as soon as possible (usually within 24-48 hours).',
    home: 'Back to home',
    another: 'Send another message',
  },
  backToTop: 'Back to top',
};

export const ui: Record<Lang, Dictionary> = { es, en };

/** Textos de interfaz de un idioma. */
export const useTranslations = (lang: Lang): Dictionary => ui[lang];
