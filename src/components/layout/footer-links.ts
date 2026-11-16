/*
 * Enlaces de la columna de navegación del pie (DESIGN.md 7.9, ADR-057): una lista propia
 * y corta, distinta del menú completo de nav-items.ts. "Experiencia" lleva a la página
 * Resumen. El sexto enlace, "Política de privacidad" (`t.footer.privacy`), va al final de la
 * lista (E155-I01, ADR-035) y aparece en el pie de todas las páginas.
 */
import type { NavLink } from './nav-items';
import type { useTranslations } from '../../i18n/ui';

export const getFooterLinks = (t: ReturnType<typeof useTranslations>): NavLink[] => [
  { key: 'home', label: t.nav.home },
  { key: 'education', label: t.nav.education },
  { key: 'experience', label: t.nav.experience },
  { key: 'resources', label: t.nav.resources },
  { key: 'contact', label: t.nav.contact },
  { key: 'privacy', label: t.footer.privacy },
];

/** El CV es el PDF de siempre (ADR-050) y solo existe en español (ADR-017). Vive en el pie. */
export const cv = {
  href: '/static/CV_Felipe_Cuevas_2026.pdf',
  file: 'CV_Felipe_Cuevas_2026.pdf',
} as const;
