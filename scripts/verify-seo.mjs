/*
 * Verificación de SEO y datos estructurados de la portada sobre `dist/` (E40-I03).
 * Sin red y sin dependencias: lee el HTML ya construido y lo compara con las fuentes de
 * datos (certificaciones y redes). Corre con `pnpm build && pnpm verify:seo`.
 * Valida sintaxis y estructura; NO reemplaza la Prueba de resultados enriquecidos de
 * Google ni el validador de schema.org, que Felipe corre con las URL de preview.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { certifications, getCountDisplay } from '../src/data/certifications.ts';
import { socialLinks } from '../src/components/layout/social-links.ts';

const SITE = 'https://felipecuevas.dev';
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const LANGS = {
  es: { code: 'es-CL', og: 'es_CL', other: 'en', path: '/es/' },
  en: { code: 'en-US', og: 'en_US', other: 'es', path: '/en/' },
};

let failures = 0;
let checks = 0;
const check = (ok, message) => {
  checks += 1;
  if (!ok) {
    failures += 1;
    console.error(`  ✗ ${message}`);
  }
};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const read = (path) => readFileSync(join(DIST, path), 'utf8');

/** Atributos de una etiqueta `<meta>` o `<link>` como objeto. */
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]),
  );
const tags = (head, name) =>
  [...head.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((match) => attrs(match[0]));

/** Ancho y alto de un JPEG leyendo su marcador SOF (sin dependencias). */
const jpegSize = (file) => {
  const buffer = readFileSync(file);
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
};

/** Recorre un valor JSON y reúne cada cadena que parece una URL. */
const urls = (value, found = []) => {
  if (typeof value === 'string') {
    if (/^(https?:|\/|mailto:)/.test(value)) found.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => urls(item, found));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => urls(item, found));
  }
  return found;
};

const pages = {};
for (const [lang, info] of Object.entries(LANGS)) {
  console.log(`\n/${lang}/ (${info.code})`);
  const html = read(`${lang}/index.html`);
  const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
  const metas = tags(head, 'meta');
  const links = tags(head, 'link');
  const meta = (key) => metas.find((m) => m.name === key || m.property === key)?.content;
  const title = decode(/<title>([^<]*)<\/title>/.exec(head)?.[1] ?? '');
  const canonical = SITE + info.path;

  // --- Metadatos ---
  check(html.includes(`<html lang="${info.code}"`), `<html lang="${info.code}">`);
  check(
    title.length > 0 && title.length <= 70,
    `title presente y de hasta 70 caracteres (${title.length})`,
  );
  const description = meta('description') ?? '';
  check(
    description.length >= 50 && description.length <= 170,
    `description de 50 a 170 caracteres (${description.length})`,
  );
  const icon = links.find((l) => l.rel === 'icon');
  check(
    icon?.type === 'image/svg+xml' &&
      icon?.href === '/static/img/favicon.svg' &&
      existsSync(join(DIST, 'static/img/favicon.svg')),
    'favicon SVG declarado y presente en dist/',
  );
  check(links.filter((l) => l.rel === 'canonical').length === 1, 'un solo canonical');
  check(links.find((l) => l.rel === 'canonical')?.href === canonical, `canonical = ${canonical}`);
  const alternates = links.filter((l) => l.rel === 'alternate' && l.hreflang);
  check(
    same(
      alternates.map((l) => [l.hreflang, l.href]).sort(),
      [
        ['en-US', `${SITE}/en/`],
        ['es-CL', `${SITE}/es/`],
        ['x-default', `${SITE}/es/`],
      ].sort(),
    ),
    'hreflang es-CL, en-US y x-default (→ /es/) recíprocos y con barra final',
  );
  check(meta('og:type') === 'website', 'og:type = website');
  check(meta('og:locale') === info.og, `og:locale = ${info.og}`);
  check(
    meta('og:locale:alternate') === LANGS[info.other].og,
    `og:locale:alternate = ${LANGS[info.other].og}`,
  );
  check(meta('og:url') === canonical, 'og:url = canonical');
  check(
    meta('og:title') === title && meta('twitter:title') === title,
    'og:title y twitter:title = title',
  );
  check(
    meta('og:description') === description && meta('twitter:description') === description,
    'og:description y twitter:description = description',
  );
  const ogImage = meta('og:image');
  check(
    Boolean(ogImage?.startsWith(`${SITE}/`)) && ogImage === meta('twitter:image'),
    'og:image absoluta y igual a twitter:image',
  );
  check(
    Boolean(ogImage) && existsSync(join(DIST, new URL(ogImage).pathname)),
    'og:image existe en dist/',
  );
  check(
    meta('og:image:width') === '1200' && meta('og:image:height') === '630',
    'og:image de 1200×630',
  );
  const ogFile = ogImage ? join(DIST, new URL(ogImage).pathname) : '';
  const ogSize = ogFile && /\.jpe?g$/.test(ogFile) ? jpegSize(ogFile) : null;
  check(
    ogSize?.width === 1200 && ogSize?.height === 630,
    `el archivo de la imagen OG mide 1200×630 (${ogSize ? `${ogSize.width}×${ogSize.height}` : 'no es JPEG'})`,
  );
  check(Boolean(ogFile) && statSync(ogFile).size <= 300 * 1024, 'la imagen OG pesa 300 KB o menos');
  check(
    (meta('og:image:alt') ?? '').length > 10 && meta('og:image:alt') === meta('twitter:image:alt'),
    'texto alternativo de la imagen OG',
  );
  check(meta('twitter:card') === 'summary_large_image', 'twitter:card = summary_large_image');

  // --- JSON-LD ---
  const blocks = [
    ...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map((m) => m[1]);
  check(blocks.length === 2, `2 bloques JSON-LD (${blocks.length})`);
  const parsed = [];
  for (const block of blocks) {
    try {
      parsed.push(JSON.parse(block));
    } catch (error) {
      check(false, `JSON-LD con sintaxis válida: ${error.message}`);
    }
  }
  const person = parsed.find((d) => d['@type'] === 'Person');
  const website = parsed.find((d) => d['@type'] === 'WebSite');
  check(Boolean(person) && Boolean(website), 'hay un Person y un WebSite');
  check(
    parsed.length > 0 && parsed.every((d) => d['@context'] === 'https://schema.org'),
    '@context = https://schema.org',
  );
  pages[lang] = { person, website };
  if (!person || !website) continue;

  check(person['@id'] === `${SITE}/#felipe-cuevas`, 'Person @id estable');
  check(
    person.name === 'Felipe Cuevas' && !('alternateName' in person),
    'Person name «Felipe Cuevas», sin alternateName',
  );
  check(person.url === canonical, 'Person url = portada del idioma');
  check(
    person.email === socialLinks.find((l) => l.icon === 'email').href.replace('mailto:', ''),
    'email desde social-links.ts',
  );
  check(person.contactPoint?.email === person.email, 'contactPoint.email = email');
  check(same(person.knowsLanguage, ['es-CL', 'en-US']), 'knowsLanguage = es-CL y en-US');
  check(
    same(person.contactPoint?.availableLanguage, ['es-CL', 'en-US']),
    'availableLanguage = es-CL y en-US',
  );
  check(
    same(
      person.sameAs,
      socialLinks.filter((l) => l.external).map((l) => l.href),
    ),
    'sameAs desde social-links.ts',
  );
  check(Array.isArray(person.jobTitle) && person.jobTitle.length === 3, 'jobTitle con 3 cargos');
  check(person.description.length > 50, 'Person description');
  check(
    Array.isArray(person.knowsAbout) && person.knowsAbout.length === 13,
    'knowsAbout con 13 temas',
  );

  const credentials = person.hasCredential ?? [];
  check(
    credentials.length === certifications.length,
    `hasCredential tiene ${certifications.length} (datos) y hay ${credentials.length}`,
  );
  check(
    certifications.every(
      (c, i) =>
        credentials[i]?.name === c.name &&
        credentials[i]?.url === c.url &&
        credentials[i]?.dateCreated === c.issuedAt,
    ),
    'hasCredential coincide con certifications.ts (nombre, URL y fecha)',
  );
  check(
    credentials.every(
      (c) =>
        c['@type'] === 'EducationalOccupationalCredential' &&
        c.credentialCategory === 'certificate' &&
        c.recognizedBy?.name &&
        c.recognizedBy?.url,
    ),
    'cada credencial con tipo, categoría y emisor (nombre y URL)',
  );
  const { value, plus } = getCountDisplay(credentials.length);
  const expected = `${plus ? '+' : ''}${value}`;
  const shown = [
    ...html.matchAll(/<dt[^>]*>(?:Certificaciones|Certifications)<\/dt><dd[^>]*>(.*?)<\/dd>/g),
  ].map((m) => m[1].replace(/<span class="context"[^>]*>.*?<\/span>/, '').replace(/<[^>]+>/g, ''));
  check(
    shown.length >= 1 && shown.every((s) => s === expected),
    `cifra de la banda (${shown.join(', ')}) = derivada de ${credentials.length} credenciales (${expected})`,
  );

  // El párrafo del perfil Desarrollador usa la cifra derivada de los datos (ADR-053).
  const prose = plus ? `${lang === 'es' ? 'más de' : 'more than'} ${value}` : String(value);
  check(
    html.includes(`Respaldado por ${prose} certificaciones`) ||
      html.includes(`Backed by ${prose} current professional certifications`),
    `párrafo del hero con "${prose}" certificaciones (derivado de los datos)`,
  );

  check(website['@id'] === `${SITE}/#sitio`, 'WebSite @id estable');
  check(website.url === canonical, 'WebSite url = portada del idioma');
  check(website.inLanguage === info.code, `WebSite inLanguage = ${info.code}`);
  check(website.author?.['@id'] === person['@id'], 'WebSite author → @id de Person');

  const allUrls = urls(parsed);
  check(
    allUrls.every((u) => /^(https:\/\/|mailto:)/.test(u)),
    'toda URL del JSON-LD es https absoluta',
  );
  check(
    allUrls.every((u) => !u.includes(' ')),
    'ninguna URL con espacios',
  );
  check(existsSync(join(DIST, new URL(person.image).pathname)), 'Person image existe en dist/');
}

// --- Educación (E50-I01): metadatos, estructura y paridad de la formación ---
const EDUCATION = { es: 'es/educacion', en: 'en/education' };
const education = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = EDUCATION[lang];
  const other = EDUCATION[info.other];
  console.log(`\n/${route}/ (${info.code})`);
  const html = read(`${route}/index.html`);
  const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
  const metas = tags(head, 'meta');
  const links = tags(head, 'link');
  const meta = (key) => metas.find((m) => m.name === key || m.property === key)?.content;
  const title = decode(/<title>([^<]*)<\/title>/.exec(head)?.[1] ?? '');
  const description = meta('description') ?? '';
  const canonical = `${SITE}/${route}/`;

  check(html.includes(`<html lang="${info.code}"`), `<html lang="${info.code}">`);
  check(title.length > 0 && title.length <= 70, `title de hasta 70 caracteres (${title.length})`);
  check(
    description.length >= 50 && description.length <= 170,
    `description de 50 a 170 caracteres (${description.length})`,
  );
  check(links.find((l) => l.rel === 'canonical')?.href === canonical, `canonical = ${canonical}`);
  check(
    same(
      links
        .filter((l) => l.rel === 'alternate' && l.hreflang)
        .map((l) => [l.hreflang, l.href])
        .sort(),
      [
        [LANGS[lang].code, canonical],
        [LANGS[info.other].code, `${SITE}/${other}/`],
        ['x-default', `${SITE}/${EDUCATION.es}/`],
      ].sort(),
    ),
    'hreflang recíprocos con barra final y x-default → /es/',
  );
  check(meta('og:url') === canonical && meta('og:locale') === info.og, 'og:url y og:locale');
  check(
    meta('og:title') === title && meta('twitter:title') === title,
    'og:title y twitter:title = title',
  );
  check(
    meta('og:description') === description && meta('twitter:description') === description,
    'og:description y twitter:description = description',
  );
  const ogImage = meta('og:image');
  check(
    Boolean(ogImage) &&
      ogImage === meta('twitter:image') &&
      existsSync(join(DIST, new URL(ogImage).pathname)),
    'og:image absoluta, igual a twitter:image y presente en dist/',
  );
  check((meta('og:image:alt') ?? '').length > 10, 'texto alternativo de la imagen OG');

  const body = html.slice(html.indexOf('<body'));
  const count = (re) => (body.match(re) ?? []).length;
  check(count(/<main[\s>]/g) === 1, 'un solo <main>');
  check(count(/<h1[\s>]/g) === 1, 'un solo <h1>');
  const mainHtml = body.slice(body.indexOf('<main'), body.indexOf('</main>'));
  check(/<h1[\s>]/.test(mainHtml), 'el <h1> está dentro de <main>');
  const levels = [...mainHtml.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  check(
    levels.every((level, i) => i === 0 || level - levels[i - 1] <= 1),
    `encabezados sin saltos (${levels.join(',')})`,
  );
  check(
    (mainHtml.match(/<h3[\s>]/g) ?? []).length === 9,
    'la formación tiene 9 tarjetas (6 formaciones y 3 distinciones)',
  );
  check(
    (mainHtml.match(/<button|<input|<select/g) ?? []).length === 0,
    'sin controles: no hay filtros ni conmutador (decisión de Felipe, ADR-060)',
  );
  check(!/<script[\s>]/.test(mainHtml), 'sin JavaScript dentro de <main>');
  education[lang] = { cells: [...mainHtml.matchAll(/class="cell ([^"]*)"/g)].map((m) => m[1]) };
}
check(same(education.es?.cells, education.en?.cells), 'mismo mosaico en /es/ y /en/');

// --- Paridad entre idiomas ---
console.log('\nParidad es / en');
const { es, en } = pages;
if (es?.person && en?.person) {
  check(
    es.person['@id'] === en.person['@id'] && es.website['@id'] === en.website['@id'],
    '@id compartidos entre /es/ y /en/',
  );
  check(es.person.description !== en.person.description, 'Person description distinta por idioma');
  check(!same(es.person.jobTitle, en.person.jobTitle), 'jobTitle distinto por idioma');
  check(
    same(es.person.hasCredential, en.person.hasCredential),
    'hasCredential idéntico (nombres propios, ADR-025)',
  );
  check(
    same(es.person.sameAs, en.person.sameAs) && es.person.email === en.person.email,
    'sameAs y correo iguales',
  );
  check(
    es.person.knowsAbout.length === en.person.knowsAbout.length,
    'knowsAbout con el mismo largo',
  );
} else {
  check(false, 'falta Person en alguno de los idiomas');
}

console.log(`\n${checks - failures} de ${checks} comprobaciones correctas`);
if (failures > 0) {
  console.error(`${failures} con error`);
  process.exit(1);
}
