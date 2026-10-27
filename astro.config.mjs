// @ts-check
import { defineConfig } from 'astro/config';

// Salida 100 % estática, sin adaptador de servidor (ADR-018).
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
});
