/*
 * Configuración de Giscus del foro (E120-I01, ADR-022 y ADR-078). Son los identificadores
 * públicos de main (static/js/config/comunidad.config.js): no son secretos, Giscus los pide
 * escritos en la página. Cambiar el repositorio, la categoría o el término dejaría huérfana la
 * conversación existente.
 * - Cada hilo usa el mismo término en ambos idiomas: una sola conversación (ADR-022). Solo el Foro
 *   usa Giscus, con `foro-general`. Desde E200-I14 (ADR-122) las rutas de Recursos no tienen
 *   conversación: el hilo `ruta-desarrollo-web-ia` sigue en GitHub (no se borra), igual que
 *   `ruta-python`, `ruta-empleabilidad` y `ruta-java` de main, pero el sitio ya no los muestra.
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
export const GISCUS_TERMS = ['foro-general'] as const;
export type GiscusTerm = (typeof GISCUS_TERMS)[number];
