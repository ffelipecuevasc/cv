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

/*
 * Hero de la portada (E40-I01). Un archivo por perfil en src/content/hero/profiles/. El id
 * del archivo es el valor de `perfil-hero` y de `?perfil=` (ADR-023): `instructor`,
 * `docente` y `desarrollador`; es un valor de dominio que no se traduce (ADR-025).
 *
 * Párrafos: `**texto**` marca énfasis. `{certifications}` se reemplaza con la cifra
 * derivada de src/data/certifications.ts (ADR-053); no se escribe esa cifra a mano.
 */
const phrases = z
  .object({
    es: z.array(z.string().trim().min(1)).min(2),
    en: z.array(z.string().trim().min(1)).min(2),
  })
  .strict()
  .refine((p) => p.es.length === p.en.length, 'Las frases deben tener el mismo largo en es y en');

const heroMetric = z.discriminatedUnion('kind', [
  // Cifra escrita en el contenido; `plus` agrega el signo "+".
  z.object({
    kind: z.literal('number'),
    value: z.number().int().nonnegative(),
    plus: z.boolean(),
    label: localized(),
  }),
  // Cifra derivada de los datos de certificaciones (ADR-053).
  z.object({ kind: z.literal('certifications'), label: localized() }),
]);

const heroProfiles = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/hero/profiles' }),
  schema: z.object({
    order: z.number().int().positive(),
    tab: localized(),
    /** Parte fija del <h1>; la parte destacada rota con la máquina de escribir. */
    headline: localized(),
    phrases,
    paragraph: localized(),
    cta: z.object({
      route: z.enum(['instructor', 'lecturer', 'developer']),
      label: localized(),
    }),
    metrics: z.array(heroMetric).length(3),
  }),
});

// Textos del hero comunes a los tres perfiles (un solo archivo: shared.json).
const heroShared = defineCollection({
  loader: glob({ pattern: 'shared.json', base: './src/content/hero' }),
  schema: z.object({
    kicker: localized(),
    tablistLabel: localized(),
    portraitAlt: localized(),
    cv: z.object({ label: localized(), accessibleLabel: localized() }),
    credentials: z.object({ title: localized(), label: localized() }),
    social: z.object({ label: localized(), email: localized() }),
    moreThan: localized(),
  }),
});

/*
 * Franja de cifras y testimonios de la portada (E40-I02). El texto en inglés de los
 * testimonios es una traducción del español (ADR-017): la tarjeta lo indica. Las fotos
 * viven en src/assets/testimonials/ y Astro las optimiza (la ruta es relativa al JSON).
 */
const homeStats = defineCollection({
  loader: glob({ pattern: 'stats.json', base: './src/content/home' }),
  schema: z.object({
    kicker: localized(),
    title: localized(),
    items: z
      .array(
        z.discriminatedUnion('kind', [
          z.object({
            kind: z.literal('number'),
            value: z.number().int().nonnegative(),
            plus: z.boolean(),
            label: localized(),
            context: localized(),
          }),
          // Cifra derivada de los datos de certificaciones (ADR-053).
          z.object({ kind: z.literal('certifications'), label: localized(), context: localized() }),
        ]),
      )
      .length(5),
  }),
});

const testimonialsSection = defineCollection({
  loader: glob({ pattern: 'testimonials-section.json', base: './src/content/home' }),
  schema: z.object({
    kicker: localized(),
    title: localized(),
    carousel: z.object({
      label: localized(),
      previous: localized(),
      next: localized(),
      /** Lleva `{current}` y `{total}`. */
      page: localized(),
    }),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/testimonials' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      /** Nombre propio: no se traduce (ADR-025). */
      name: z.string().trim().min(1),
      role: localized(),
      /** Cita: `es` es el original; `en` es la traducción (ADR-017). */
      quote: localized(),
      photo: image(),
    }),
});

export const collections = {
  pages,
  heroProfiles,
  heroShared,
  homeStats,
  testimonialsSection,
  testimonials,
};
