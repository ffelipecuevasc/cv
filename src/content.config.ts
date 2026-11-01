/*
 * Colecciones de contenido bilingüe (E30-I02, ADR-048).
 * Todo texto visible se declara con `localized()`: un objeto { es, en } donde ambos
 * idiomas son obligatorios y no vacíos. Una entrada incompleta hace fallar
 * `pnpm build` y `pnpm check` (prueba de paridad, AT-026).
 * Cada épica de página agrega aquí su colección (testimonios, certificaciones, etc.).
 */
import { defineCollection } from 'astro:content';
import type { ImageFunction } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { routes } from './i18n/routes';
import { symbolIcons, type SymbolIconName } from './components/ui/icons';

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
export const STAT_IDS = ['reuf-years', 'reuf-modules', 'teaching-years', 'students'] as const;
export type StatId = (typeof STAT_IDS)[number];

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
            /** Clave estable para que otras páginas lean la cifra sin repetirla (Docente, ADR-070). */
            id: z.enum(STAT_IDS),
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
    // Certificaciones (E50-I02, ADR-061): encabezado, franjas por categoría y diálogo de detalle.
    certifications: z.object({
      kicker: localized(),
      title: localized(),
      lead: localized(),
      stripeKicker: localized(),
      categories: z.object({ ai: localized(), cloud: localized(), 'dev-data': localized() }),
      issued: localized(),
      skills: localized(),
      verify: localized(),
      details: localized(),
      close: localized(),
      newTab: localized(),
    }),
    // Bloque «Instructor REUF» y cierre del sitio antiguo (AT-076). `{modules}` se reemplaza por
    // la cifra de módulos REUF de src/content/home/stats.json, para que no se desfase.
    reuf: z.object({
      title: localized(),
      paragraph: localized(),
      highlights: localizedList(),
    }),
    closing: z.object({
      kicker: localized(),
      cv: localized(),
      cvLabel: localized(),
      contact: localized(),
    }),
  }),
});

/*
 * Resumen de experiencia (E60-I01, ADR-065): encabezado y 3 perfiles en una grilla simétrica de
 * tarjetas. Un perfil puede llevar uno o dos enlaces; `route` es una clave del mapa de rutas
 * (src/i18n/routes.ts), así que la URL nunca se escribe a mano y puede apuntar a una página
 * que todavía no existe. Instituciones, periodo y nombres de tecnologías son nombres propios y
 * cifras; el resto lleva `localized()`. Los textos `en` los redacta el agente y Felipe los valida
 * (ADR-017). Las fotos viven en src/assets/experience/ y Astro las optimiza.
 */
const experienceProfile = (image: ImageFunction) =>
  z.object({
    id: z.enum(['lecturer', 'developer', 'instructor']),
    image: image(),
    imageAlt: localized(),
    kicker: localized(),
    title: localized(),
    /** Instituciones: nombres propios, no se traducen (ADR-025). */
    institutions: z.string().trim().min(1),
    /** `**texto**` marca énfasis. */
    paragraph: localized(),
    tags: localizedList(),
    period: localized(),
    modality: localized(),
    links: z
      .array(
        z.object({
          route: z.enum(Object.keys(routes) as [keyof typeof routes, ...(keyof typeof routes)[]]),
          text: localized(),
          /** Nombre accesible si el texto visible no basta (varios «Más detalles» iguales). */
          label: localized().optional(),
        }),
      )
      .min(1)
      .max(2),
  });

const experiencePage = defineCollection({
  loader: glob({ pattern: 'page.json', base: './src/content/experience' }),
  schema: ({ image }) =>
    z.object({
      header: z.object({ kicker: localized(), title: localized(), lead: localized() }),
      /** Línea de tiempo compacta (ADR-066): 3 hitos en el orden del sitio antiguo. */
      timeline: z.object({
        /** Nombre accesible de la lista de hitos. */
        label: localized(),
        items: z
          .array(
            z.object({
              /** Ícono de Material Symbols Light de `icons.ts` (ADR-063). */
              icon: z.enum(Object.keys(symbolIcons) as [SymbolIconName, ...SymbolIconName[]]),
              title: localized(),
              /** Instituciones: nombres propios, no se traducen (ADR-025). */
              institutions: z.string().trim().min(1),
              period: localized(),
            }),
          )
          .length(3),
      }),
      /** Nombre accesible de la lista de perfiles. */
      listLabel: localized(),
      profiles: z.array(experienceProfile(image)).length(3),
    }),
});

/*
 * Página Desarrollador (E70-I01, ADR-067): cabecera, aspectos técnicos y muro de tecnologías.
 * Las 36 tecnologías y sus 5 categorías vienen de main:desarrollador.html; `icon` es el nombre
 * del SVG en src/assets/technologies/ (sin extensión). Nombres de tecnologías e instituciones:
 * nombres propios, no se traducen (ADR-025).
 */
const SYMBOL_NAMES = Object.keys(symbolIcons) as [SymbolIconName, ...SymbolIconName[]];
const TECHNOLOGY_COUNTS = { ai: 4, languages: 12, data: 9, infrastructure: 6, tools: 5 } as const;
const developerPage = defineCollection({
  loader: glob({ pattern: 'page.json', base: './src/content/developer' }),
  schema: z.object({
    header: z.object({
      kicker: localized(),
      title: localized(),
      institutions: z.string().trim().min(1),
      period: localized(),
      modality: localized(),
    }),
    aspects: z.object({
      kicker: localized(),
      title: localized(),
      lead: localized(),
      items: z
        .array(z.object({ icon: z.enum(SYMBOL_NAMES), title: localized(), text: localized() }))
        .length(4),
    }),
    technologies: z.object({
      kicker: localized(),
      title: localized(),
      lead: localized(),
      categories: z
        .array(
          z.object({
            id: z.enum(Object.keys(TECHNOLOGY_COUNTS) as [keyof typeof TECHNOLOGY_COUNTS]),
            title: localized(),
            items: z
              .array(
                z.object({
                  icon: z.string().regex(/^[a-z0-9-]+$/),
                  name: z.string().trim().min(1),
                  role: localized(),
                }),
              )
              .min(1),
          }),
        )
        .length(5)
        // Cada categoría con su cantidad del sitio antiguo (36 en total), sin íconos repetidos.
        .refine(
          (list) => list.every((cat) => cat.items.length === TECHNOLOGY_COUNTS[cat.id]),
          'Cantidades por categoría distintas de las de main:desarrollador.html',
        )
        .refine(
          (list) => new Set(list.flatMap((cat) => cat.items.map((t) => t.icon))).size === 36,
          'Se esperan 36 tecnologías con ícono único',
        ),
    }),
  }),
});

/*
 * Portafolio de Desarrollador (E70-I02, ADR-068): los 12 proyectos de
 * main:static/js/datos/portafolio.datos.js, en el mismo orden. De aquí salen las tarjetas, los
 * filtros y el JSON-LD ItemList. Etiquetas de tecnología: nombres propios, no se traducen.
 */
const PORTFOLIO_CATEGORIES = ['frontend', 'fullstack', 'backend'] as const;
const portfolioCategory = () => z.object({ icon: z.enum(SYMBOL_NAMES), label: localized() });
const portfolioPage = defineCollection({
  loader: glob({ pattern: 'page.json', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      header: z.object({ kicker: localized(), title: localized(), lead: localized() }),
      filters: z.object({ label: localized(), all: localized(), status: localized() }),
      categories: z.object({
        frontend: portfolioCategory(),
        fullstack: portfolioCategory(),
        backend: portfolioCategory(),
      }),
      actions: z.object({ repository: localized(), site: localized() }),
      listName: localized(),
      projects: z
        .array(
          z.object({
            id: z.string().regex(/^[a-z0-9-]+$/),
            category: z.enum(PORTFOLIO_CATEGORIES),
            image: image(),
            programmingLanguage: z.string().trim().min(1),
            url: z.url(),
            title: localized(),
            imageAlt: localized(),
            description: localized(),
            tags: z.array(z.string().trim().min(1)).min(1),
          }),
        )
        .length(12)
        .refine((list) => new Set(list.map((p) => p.id)).size === 12, 'ids repetidos'),
    }),
});

/*
 * Página Docente (E80-I01, ADR-070): cabecera, asignaturas en grilla 2 × 2, una franja por
 * institución en zigzag, banda de tutoría y cargos especiales. Periodo y modalidad de la
 * cabecera salen del perfil «lecturer» de Experiencia y las cifras «+10 años» y «+2.000» de
 * src/content/home/stats.json (ADR-053): no se repiten aquí. Instituciones, años y nombres de
 * tecnologías son nombres propios y cifras (ADR-025).
 */
const lecturerPage = defineCollection({
  loader: glob({ pattern: 'page.json', base: './src/content/lecturer' }),
  schema: ({ image }) =>
    z.object({
      header: z.object({
        kicker: localized(),
        title: localized(),
        institutions: z.string().trim().min(1),
        /** Lleva `{years}`: la cifra de años docente de stats.json. */
        highlight: localized().refine(
          (t) => t.es.includes('{years}') && t.en.includes('{years}'),
          'highlight debe llevar {years} en es y en',
        ),
        indexLabel: localized(),
      }),
      courses: z.object({
        kicker: localized(),
        title: localized(),
        items: z
          .array(z.object({ title: localized(), text: localized(), tags: localizedList() }))
          .length(4),
      }),
      institutions: z.object({
        kicker: localized(),
        title: localized(),
        moreInfo: localized(),
        moreInfoUrl: z.url(),
        items: z
          .array(
            z.object({
              id: z.enum(['iplacex', 'duoc', 'inacap']),
              name: z.string().trim().min(1),
              shortName: z.string().trim().min(1),
              period: localized(),
              summary: localized(),
              text: localized(),
              photo: z
                .object({
                  image: image(),
                  alt: localized(),
                  caption: localized(),
                  note: localized(),
                })
                .optional(),
            }),
          )
          .length(3),
      }),
      mentoring: z.object({
        kicker: localized(),
        title: localized(),
        role: localized(),
        text: localized(),
        stats: z
          .array(
            z.union([
              z.object({ source: z.enum(STAT_IDS), label: localized() }),
              z.object({ value: z.number().int().positive(), label: localized() }),
            ]),
          )
          .length(3),
      }),
      roles: z.object({
        kicker: localized(),
        title: localized(),
        items: z
          .array(
            z.object({
              icon: z.enum(SYMBOL_NAMES),
              title: localized(),
              detail: localized(),
              year: z.number().int(),
              institution: z.string().trim().min(1),
            }),
          )
          .length(2),
      }),
    }),
});

export const collections = {
  pages,
  experiencePage,
  developerPage,
  portfolioPage,
  lecturerPage,
  personSeo,
  educationEntries,
  educationPage,
  heroProfiles,
  heroShared,
  homeStats,
  testimonialsSection,
  testimonials,
};
