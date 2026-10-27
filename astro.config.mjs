// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Salida 100 % estática, sin adaptador de servidor (ADR-018).
// Tailwind CSS v4 se integra como plugin de Vite, nunca con @astrojs/tailwind (ADR-004).
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
