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
// `ogImageAlt` es el texto alternativo de la imagen Open Graph (la imagen no lleva texto).
const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    route: z.enum(Object.keys(routes) as [keyof typeof routes, ...(keyof typeof routes)[]]),
    title: localized(),
    description: localized(),
    ogImageAlt: localized().optional(),
  }),
});

/*
 * Hero de la portada (E40-I01, simplificado en E40-I04: sin llamados a la acción ni métricas,
 * ADR-058). Un archivo por perfil en src/content/hero/profiles/. El id
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

const heroProfiles = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/hero/profiles' }),
  schema: z.object({
    order: z.number().int().positive(),
    tab: localized(),
    /** Parte fija del <h1>; la parte destacada rota con la máquina de escribir. */
    headline: localized(),
    phrases,
    paragraph: localized(),
  }),
});

// Textos del hero comunes a los tres perfiles (un solo archivo: shared.json).
const heroShared = defineCollection({
  loader: glob({ pattern: 'shared.json', base: './src/content/hero' }),
  schema: z.object({
    kicker: localized(),
    tablistLabel: localized(),
    portraitAlt: localized(),
    /** Fila de certificaciones: rótulo ("Profesional certificado") y nombre accesible de la lista. */
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

/*
 * Datos estructurados Person de la portada (E40-I03). Los textos que cambian con el idioma
 * viven aquí con paridad obligatoria; lo que no cambia (nombre, correo, redes, organizaciones
 * y credenciales) sale de los módulos de datos, no se escribe a mano (ADR-053).
 */
const localizedList = () =>
  z
    .object({
      es: z.array(z.string().trim().min(1)).min(1),
      en: z.array(z.string().trim().min(1)).min(1),
    })
    .strict()
    .refine((p) => p.es.length === p.en.length, 'Las listas deben tener el mismo largo en es y en');

const personSeo = defineCollection({
  loader: glob({ pattern: 'person.json', base: './src/content/seo' }),
  schema: z.object({
    jobTitle: localizedList(),
    description: localized(),
    knowsAbout: localizedList(),
    contactType: localized(),
  }),
});

/*
 * Formación académica y diplomados de Educación (E50-I01, ADR-060). Un archivo por formación
 * en src/content/education/entries/ y los textos de la página en page.json.
 * - `order` fija el orden de lectura (peso `major`, luego `standard` y `minor`, y dentro de cada
 *   peso el más reciente primero): la página no tiene filtros ni conmutador de orden.
 * - `weight` decide el tamaño de la tarjeta en el mosaico; `category`, su ícono y su rótulo.
 * - Instituciones y años son nombres propios y cifras: no se traducen (ADR-025). Todo lo demás
 *   lleva `localized()`. Los textos `en` los redacta el agente y Felipe los valida (ADR-017).
 */
const educationEntries = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/education/entries' }),
  schema: z
    .object({
      order: z.number().int().positive(),
      weight: z.enum(['major', 'standard', 'minor']),
      category: z.enum(['university', 'diploma', 'technical', 'recognition']),
      title: localized(),
      institution: z.string().trim().min(1),
      startYear: z.number().int().optional(),
      endYear: z.number().int(),
      /** Horas del programa, si corresponde ("120 horas cronológicas"). */
      duration: localized().optional(),
      status: localized(),
      description: localized().optional(),
      achievements: localizedList().optional(),
      tags: localizedList().optional(),
    })
    .refine((entry) => entry.startYear === undefined || entry.startYear <= entry.endYear, {
      message: 'startYear no puede ser posterior a endYear',
    }),
});

const educationPage = defineCollection({
  loader: glob({ pattern: 'page.json', base: './src/content/education' }),
  schema: z.object({
    header: z.object({ kicker: localized(), title: localized(), lead: localized() }),
    formation: z.object({
      kicker: localized(),
      title: localized(),
      /** Nombre accesible de la lista de formaciones y distinciones. */
      listLabel: localized(),
    }),
    /** Rótulo de cada categoría, en la tarjeta. */
    categories: z.object({
      university: localized(),
      diploma: localized(),
      technical: localized(),
      recognition: localized(),
    }),
  }),
});

export const collections = {
  pages,
  personSeo,
  educationEntries,
  educationPage,
  heroProfiles,
  heroShared,
  homeStats,
  testimonialsSection,
  testimonials,
};
