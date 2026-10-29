// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

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
  vite: {
    plugins: [tailwindcss()],
  },
});
