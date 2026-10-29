/*
 * Idiomas del sitio (ADR-001). La clave corta es el prefijo de la ruta; el código BCP 47
 * va en <html lang> y en hreflang; el de Open Graph usa guion bajo.
 */
export const langs = ['es', 'en'] as const;
export type Lang = (typeof langs)[number];

export const defaultLang: Lang = 'es';

export const langCodes: Record<Lang, string> = { es: 'es-CL', en: 'en-US' };
export const ogLocales: Record<Lang, string> = { es: 'es_CL', en: 'en_US' };

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** Idioma a partir de Astro.currentLocale ('es-CL', 'en-US', 'es' o 'en'). */
export const langFromLocale = (locale: string | undefined): Lang =>
  locale?.startsWith('en') ? 'en' : 'es';
