/*
 * Constructores de datos estructurados schema.org (E40-I03, AT-006, ADR-001, ADR-053).
 * - Person y WebSite con @id estables compartidos entre /es/ y /en/: son la misma entidad
 *   en las dos versiones. Se conservan los @id del sitio antiguo (`main:index.html`).
 * - `hasCredential` se genera desde src/data/certifications.ts: nunca se escribe a mano,
 *   así que coincide con la cifra del hero (ADR-053).
 * - `sameAs` y el correo salen de social-links.ts (ADR-044).
 * - Los idiomas se declaran con su código BCP 47 (`es-CL`, `en-US`), sin objetos Language.
 * Funciones puras: reciben todo por parámetro para poder verificarlas fuera de Astro.
 */
import { certifications, type CertificationIssuer } from '../../data/certifications';
import { socialLinks } from '../layout/social-links';
import { langCodes, type Lang } from '../../i18n/lang';

/** Emisor de cada credencial. Si se agrega un emisor a los datos, TypeScript exige sumarlo aquí. */
const issuerOrganizations: Record<CertificationIssuer, { name: string; url: string }> = {
  oracle: { name: 'Oracle', url: 'https://www.oracle.com' },
  aws: { name: 'Amazon Web Services', url: 'https://aws.amazon.com' },
  'python-institute': { name: 'Python Institute', url: 'https://pythoninstitute.org' },
  anthropic: { name: 'Anthropic', url: 'https://www.anthropic.com' },
};

// Nombres propios de instituciones: no se traducen (ADR-025).
const inacap = 'Universidad Tecnológica de Chile INACAP';
const iplacex = 'Instituto Profesional IPLACEX';
const duoc = 'Instituto Profesional Duoc UC';
const university = (name: string) => ({ '@type': 'CollegeOrUniversity', name });

export interface PersonContent {
  jobTitle: string[];
  description: string;
  knowsAbout: string[];
  contactType: string;
}

export interface StructuredDataContext {
  lang: Lang;
  /** Dominio del sitio (`Astro.site`). */
  site: URL;
  /** Ruta de la portada del idioma, con barra final (por ejemplo `/es/`). */
  homePath: string;
  /** Ruta de la página de contacto del idioma, con barra final. */
  contactPath: string;
  /** URL absoluta del retrato. */
  image: string;
}

const absolute = (site: URL, path: string) => new URL(path, site).href;

/** @id estables: iguales en /es/ y /en/ y en todas las páginas del sitio. */
export const entityIds = (site: URL) => ({
  person: absolute(site, '/#felipe-cuevas'),
  website: absolute(site, '/#sitio'),
});

/** Correo de contacto, tomado de las redes del sitio. */
export const contactEmail = (): string => {
  const link = socialLinks.find((item) => item.icon === 'email');
  if (!link) throw new Error('Falta el correo en social-links.ts');
  return link.href.replace(/^mailto:/, '');
};

/** Credenciales de Person derivadas de los datos de certificaciones. */
export const buildCredentials = () =>
  certifications.map((certification) => ({
    '@type': 'EducationalOccupationalCredential',
    name: certification.name,
    credentialCategory: 'certificate',
    recognizedBy: {
      '@type': 'Organization',
      ...issuerOrganizations[certification.issuer],
    },
    url: certification.url,
    dateCreated: certification.issuedAt,
  }));

export const buildPerson = (context: StructuredDataContext, content: PersonContent) => {
  const { site, homePath, contactPath, image } = context;
  const email = contactEmail();
  const languages = Object.values(langCodes);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': entityIds(site).person,
    name: 'Felipe Cuevas',
    url: absolute(site, homePath),
    email,
    image,
    jobTitle: content.jobTitle,
    description: content.description,
    nationality: { '@type': 'Country', name: 'Chile' },
    knowsLanguage: languages,
    knowsAbout: content.knowsAbout,
    alumniOf: [university(inacap), university(iplacex)],
    worksFor: [university(inacap), university(duoc), university(iplacex)],
    sameAs: socialLinks.filter((link) => link.external).map((link) => link.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: content.contactType,
      email,
      url: absolute(site, contactPath),
      availableLanguage: languages,
    },
    hasCredential: buildCredentials(),
  };
};

export const buildWebSite = (context: StructuredDataContext) => {
  const { lang, site, homePath } = context;
  const ids = entityIds(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ids.website,
    url: absolute(site, homePath),
    name: 'Felipe Cuevas',
    inLanguage: langCodes[lang],
    author: { '@id': ids.person },
  };
};

/** Serializa para un <script type="application/ld+json">: `<` escapado para no cerrar la etiqueta. */
export const serializeJsonLd = (data: object): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');
