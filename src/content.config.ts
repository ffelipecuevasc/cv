/*
 * Colecciones de contenido bilingüe (E30-I02, ADR-048).
 * Todo texto visible se declara con `localized()`: un objeto { es, en } donde ambos
 * idiomas son obligatorios y no vacíos. Una entrada incompleta hace fallar
 * `pnpm build` y `pnpm check` (prueba de paridad, AT-026).
 * Cada épica de página agrega aquí su colección (testimonios, certificaciones, etc.).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { routes } from './i18n/routes';

/** Texto con paridad obligatoria es-CL / en-US. */
export const localized = () =>
  z
    .object({
      es: z.string().trim().min(1, 'Falta el texto es-CL'),
      en: z.string().trim().min(1, 'Falta el texto en-US'),
    })
    .strict();

// Metadatos de SEO por página. El id del archivo debe ser una clave del mapa de rutas.
const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    route: z.enum(Object.keys(routes) as [keyof typeof routes, ...(keyof typeof routes)[]]),
    title: localized(),
    description: localized(),
  }),
});

export const collections = { pages };
