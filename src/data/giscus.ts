/*
 * Configuración de Giscus del foro (E120-I01, ADR-022 y ADR-078). Son los identificadores
 * públicos de main (static/js/config/comunidad.config.js): no son secretos, Giscus los pide
 * escritos en la página. Cambiar el repositorio, la categoría o el término dejaría huérfana la
 * conversación existente.
 * - Cada hilo usa el mismo término en ambos idiomas: una sola conversación (ADR-022). El Foro usa
 *   `foro-general`; la ruta de Recursos, `ruta-desarrollo-web-ia` (ADR-079). Los hilos
 *   `ruta-python`, `ruta-empleabilidad` y `ruta-java` de main siguen en GitHub, pero el sitio ya no
 *   los muestra.
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
  // El oscuro es transparente para que el panel `surface` del sitio sea el fondo, como en main.
  themes: { light: 'light', dark: 'transparent_dark' },
  /** Margen con que se adelanta la carga diferida (main: `margenCarga`). */
  rootMargin: '400px',
  discussionsUrl: 'https://github.com/ffelipecuevasc/comunidad/discussions',
} as const;

/** Idioma de la interfaz de Giscus por página (códigos de Giscus). */
export const GISCUS_LANG: Record<Lang, string> = { es: 'es', en: 'en' };

/** Hilos que muestra el sitio. */
export const GISCUS_TERMS = ['foro-general', 'ruta-desarrollo-web-ia'] as const;
export type GiscusTerm = (typeof GISCUS_TERMS)[number];
