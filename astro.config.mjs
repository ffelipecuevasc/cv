// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { internalRoutes, routes } from './src/i18n/routes.ts';

/**
 * Valores de un par de rutas como string[] (el mapa de rutas usa tipos literales).
 * @param {Record<string, string>} paths
 */
const pathsOf = (paths) => Object.values(paths);

// Salida 100 % estática, sin adaptador de servidor (ADR-018).
// Tailwind CSS v4 se integra como plugin de Vite, nunca con @astrojs/tailwind (ADR-004).
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  // Dominio de producción: base de canonical, hreflang y og:url absolutos (ADR-047).
  site: 'https://felipecuevas.dev',
  // Todas las rutas terminan en barra (/es/, /en/design-sample/): una sola forma por URL (ADR-047).
  trailingSlash: 'always',
  // i18n nativo (ADR-001): es-CL en /es/ y en-US en /en/, ambos con prefijo.
  // Sin `fallback`: una página que falte en un idioma da 404, no se sirve la del otro.
  i18n: {
    locales: [
      { path: 'es', codes: ['es-CL', 'es'] },
      { path: 'en', codes: ['en-US', 'en'] },
    ],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  // Tratamiento provisorio de /: en salida estática Astro genera dist/index.html con una
  // redirección por meta refresh (y rel=canonical) hacia /es/, sin contenido propio.
  // La 301 definitiva de producción se implementa en E180-I03 (ADR-019).
  redirects: {
    '/': '/es/',
  },
  // Fuentes autoalojadas con la API de fuentes y el proveedor local (ADR-041, ADR-043).
  // Archivos WOFF2 variables, subconjunto latino, en src/assets/fonts/ (licencias OFL junto a ellos).
  // Astro genera respaldos con métricas ajustadas a partir del último respaldo genérico.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Cinzel',
      cssVariable: '--font-cinzel',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            weight: '400 600',
            style: 'normal',
            src: ['./src/assets/fonts/cinzel-latin-wght.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Josefin Sans',
      cssVariable: '--font-josefin-sans',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '300 600',
            style: 'normal',
            src: ['./src/assets/fonts/josefin-sans-latin-wght.woff2'],
          },
          {
            weight: '300 400',
            style: 'italic',
            src: ['./src/assets/fonts/josefin-sans-latin-wght-italic.woff2'],
          },
        ],
      },
    },
  ],
  // Sitemap bilingüe con @astrojs/sitemap (ADR-095, sustituye a ADR-094). Genera sitemap-index.xml
  // y sitemap-0.xml con alternativas es-CL / en-US. El filtro deja fuera las rutas internas del mapa
  // de rutas (404, agradecimiento y muestra de tokens, AT-106) y la raíz / (E180-I03). Sin x-default.
  // `i18n` empareja los idiomas cambiando el segmento de la ruta y no sirve con slugs traducidos
  // (/es/contacto/ ↔ /en/contact/): `serialize` entrega las alternativas desde el mapa de rutas (ADR-020).
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-CL', en: 'en-US' } },
      filter: (page) => {
        const { pathname } = new URL(page);
        const internal = new Set(Object.values(internalRoutes).flatMap(pathsOf));
        return pathname !== '/' && pathname !== '/404/' && !internal.has(pathname);
      },
      serialize: (item) => {
        const { pathname } = new URL(item.url);
        const paths = Object.values(routes).find((entry) => pathsOf(entry).includes(pathname));
        if (!paths) return undefined;
        item.links = [
          { url: new URL(paths.es, item.url).href, lang: 'es-CL' },
          { url: new URL(paths.en, item.url).href, lang: 'en-US' },
        ];
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
