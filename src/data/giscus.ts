/*
 * Configuración de Giscus del foro (E120-I01, ADR-022 y ADR-078). Son los identificadores
 * públicos de main (static/js/config/comunidad.config.js): no son secretos, Giscus los pide
 * escritos en la página. Cambiar el repositorio, la categoría o el término dejaría huérfana la
 * conversación existente.
 * - Mismo término `foro-general` en /es/foro/ y /en/forum/: una sola conversación (ADR-022).
 * - Solo cambia `data-lang` según la página (AT-027).
 */
import type { Lang } from '../i18n/lang';

export const GISCUS = {
  origin: 'https://giscus.app',
  script: 'https://giscus.app/client.js',
  repo: 'ffelipecuevasc/comunidad',
  repoId: 'R_kgDOT6gwGg',
  category: 'Dudas por ruta',
  categoryId: 'DIC_kwDOT6gwGs4DDiHV',
  term: 'foro-general',
  // El oscuro es transparente para que el panel `surface` del sitio sea el fondo, como en main.
  themes: { light: 'light', dark: 'transparent_dark' },
  /** Margen con que se adelanta la carga diferida (main: `margenCarga`). */
  rootMargin: '400px',
  discussionsUrl: 'https://github.com/ffelipecuevasc/comunidad/discussions',
} as const;

/** Idioma de la interfaz de Giscus por página (códigos de Giscus). */
export const GISCUS_LANG: Record<Lang, string> = { es: 'es', en: 'en' };
