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
    events: 'Eventos',
    forum: 'Foro',
    resources: 'Recursos',
    contact: 'Contacto',
    downloadCv: 'Descargar CV',
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
    tagline: 'Formando desarrolladores en Inteligencia Artificial y Desarrollo de Aplicaciones.',
    navTitle: 'Explorar',
    socialTitle: 'Redes',
    privacy: 'Política de privacidad',
    rights: 'Todos los derechos reservados.',
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
    events: 'Events',
    forum: 'Forum',
    resources: 'Resources',
    contact: 'Contact',
    downloadCv: 'Download CV',
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
    tagline: 'Training developers in Artificial Intelligence and Application Development.',
    navTitle: 'Explore',
    socialTitle: 'Social',
    privacy: 'Privacy policy',
    rights: 'All rights reserved.',
  },
  backToTop: 'Back to top',
};

export const ui: Record<Lang, Dictionary> = { es, en };

/** Textos de interfaz de un idioma. */
export const useTranslations = (lang: Lang): Dictionary => ui[lang];
