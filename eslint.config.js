// @ts-check
// Configuración plana de ESLint 10 para Astro y TypeScript (ADR-030).
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // Salida, dependencias y carpeta local de Wrangler (AT-129).
  globalIgnores(['dist/', '.astro/', 'node_modules/', '.wrangler/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  // Scripts de Node y archivos de configuración de la raíz.
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
