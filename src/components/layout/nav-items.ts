/*
 * Estructura única del menú (DESIGN.md 2.1): la usan la navbar de escritorio y el menú
 * móvil, así que las opciones, su orden y sus etiquetas no pueden divergir (AT-008).
 */
import type { RouteKey } from '../../i18n/routes';
import type { useTranslations } from '../../i18n/ui';

export type NavLink = { key: RouteKey; label: string };
export type NavGroup = { id: string; label: string; children: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const isGroup = (item: NavItem): item is NavGroup => 'children' in item;

export const getNavItems = (t: ReturnType<typeof useTranslations>): NavItem[] => [
  { key: 'home', label: t.nav.home },
  { key: 'education', label: t.nav.education },
  {
    id: 'experience',
    label: t.nav.experience,
    children: [
      { key: 'experience', label: t.nav.experienceSummary },
      { key: 'developer', label: t.nav.developer },
      { key: 'lecturer', label: t.nav.lecturer },
      { key: 'instructor', label: t.nav.instructor },
      { key: 'talentoDigital', label: t.nav.talentoDigital },
    ],
  },
  {
    id: 'community',
    label: t.nav.community,
    children: [
      { key: 'events', label: t.nav.events },
      { key: 'forum', label: t.nav.forum },
      { key: 'resources', label: t.nav.resources },
    ],
  },
  { key: 'contact', label: t.nav.contact },
];

/** El CV es el PDF de siempre (ADR-050) y solo existe en español (ADR-017). */
export const cv = {
  href: '/static/CV_Felipe_Cuevas_2026.pdf',
  file: 'CV_Felipe_Cuevas_2026.pdf',
} as const;
