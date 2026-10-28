// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Salida 100 % estática, sin adaptador de servidor (ADR-018).
// Tailwind CSS v4 se integra como plugin de Vite, nunca con @astrojs/tailwind (ADR-004).
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
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
  vite: {
    plugins: [tailwindcss()],
  },
});
