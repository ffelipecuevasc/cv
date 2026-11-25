/*
 * Redes del sitio (ADR-044): LinkedIn, GitHub, REUF y correo.
 * URL tomadas del sitio antiguo: LinkedIn, GitHub y correo, de su pie (`main:index.html`);
 * REUF, de su riel social (`main:index.html:618`), porque el pie antiguo no la traía.
 * Los nombres propios no se traducen (ADR-025). El correo no lleva etiqueta aquí: cada componente
 * la toma del diccionario (pie: `footer.email`, E200-I04; riel del hero: su propia prop).
 */
import type { BrandIconName } from '../ui/icons';

export interface SocialLink {
  icon: BrandIconName;
  /** Nombre propio de la red; el correo no lo tiene (su texto sale del diccionario). */
  label?: string;
  href: string;
  /** Los enlaces `mailto:` no abren pestaña nueva. */
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ffelipecuevasc/',
    external: true,
  },
  { icon: 'github', label: 'GitHub', href: 'https://github.com/ffelipecuevasc', external: true },
  {
    icon: 'reuf',
    label: 'REUF',
    href: 'https://chilefacilitadores.cl/users/detail/ffelipecuevasc',
    external: true,
  },
  {
    icon: 'email',
    href: 'mailto:contacto@felipecuevas.dev',
    external: false,
  },
];
