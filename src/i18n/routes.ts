/*
 * Mapa de rutas equivalentes es-CL ↔ en-US (ADR-020, ADR-035, ADR-047, ADR-048).
 * - Las 12 páginas navegables del área L de la auditoría más la política de privacidad.
 * - Toda ruta empieza con /es/ o /en/, termina en barra y nunca lleva .html (AT-005).
 * - La 404 no está en el mapa: no es una URL navegable; su selector de idioma lleva a la
 *   portada del otro idioma (E160-I01).
 * Cambiar un slug después del cutover exige una 301 (E180-I01).
 */
import { langs, otherLang, type Lang } from './lang';

export const routes = {
  home: { es: '/es/', en: '/en/' },
  education: { es: '/es/educacion/', en: '/en/education/' },
  experience: { es: '/es/experiencia/', en: '/en/experience/' },
  developer: { es: '/es/desarrollador/', en: '/en/developer/' },
  lecturer: { es: '/es/docente/', en: '/en/lecturer/' },
  instructor: { es: '/es/instructor/', en: '/en/instructor/' },
  talentoDigital: { es: '/es/talento-digital/', en: '/en/talento-digital/' },
  events: { es: '/es/eventos/', en: '/en/events/' },
  forum: { es: '/es/foro/', en: '/en/forum/' },
  resources: { es: '/es/recursos/', en: '/en/resources/' },
  contact: { es: '/es/contacto/', en: '/en/contact/' },
  thankYou: { es: '/es/agradecimiento/', en: '/en/thank-you/' },
  privacy: { es: '/es/privacidad/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

/** Páginas internas (noindex, fuera del sitemap y de la navegación). */
export const internalRoutes = {
  designSample: { es: '/es/muestra-diseno/', en: '/en/design-sample/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
export type InternalRouteKey = keyof typeof internalRoutes;
export type AnyRouteKey = RouteKey | InternalRouteKey;

const allRoutes: Record<AnyRouteKey, Record<Lang, string>> = { ...routes, ...internalRoutes };

// Validación al construir: si el mapa queda mal escrito, `pnpm build` falla.
const seen = new Set<string>();
for (const [key, paths] of Object.entries(allRoutes)) {
  for (const lang of langs) {
    const path = paths[lang];
    if (!path.startsWith(`/${lang}/`) || !path.endsWith('/') || path.includes('.html')) {
      throw new Error(`Ruta inválida en ${key}.${lang}: ${path} (ADR-047, AT-005)`);
    }
    if (seen.has(path)) throw new Error(`Ruta duplicada en el mapa: ${path}`);
    seen.add(path);
  }
}

/** Rutas de una página en ambos idiomas. */
export const routePaths = (key: AnyRouteKey): Record<Lang, string> => allRoutes[key];

/** Ruta de una página en un idioma. */
export const getRoute = (key: AnyRouteKey, lang: Lang): string => allRoutes[key][lang];

/** Clave de la página a partir de su ruta (con o sin barra final). */
export const routeKeyFromPath = (path: string): AnyRouteKey | undefined => {
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return (Object.keys(allRoutes) as AnyRouteKey[]).find((key) =>
    Object.values(allRoutes[key]).includes(normalized),
  );
};

/**
 * Ruta equivalente en el otro idioma (o en `target`). Si la ruta no está en el mapa
 * (por ejemplo, la 404), devuelve la portada del idioma de destino.
 */
export const getEquivalentPath = (path: string, target?: Lang): string => {
  const key = routeKeyFromPath(path);
  const lang: Lang = target ?? otherLang(path.startsWith('/en/') ? 'en' : 'es');
  return key ? getRoute(key, lang) : routes.home[lang];
};
