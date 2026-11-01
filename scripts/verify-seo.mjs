/*
 * Verificación de SEO y datos estructurados de la portada sobre `dist/` (E40-I03).
 * Sin red y sin dependencias: lee el HTML ya construido y lo compara con las fuentes de
 * datos (certificaciones y redes). Corre con `pnpm build && pnpm verify:seo`.
 * Valida sintaxis y estructura; NO reemplaza la Prueba de resultados enriquecidos de
 * Google ni el validador de schema.org, que Felipe corre con las URL de preview.
 * Cubre la portada (E40-I03), Educación (E50), Experiencia (E60-I01, con control de enlaces) y
 * Desarrollador (E70-I01: 36 tecnologías y paridad; E70-I02: portafolio, filtros e ItemList;
 * E70-I03: placa de los logos en oscuro) y Docente (E80-I01: cabecera, asignaturas, franjas por
 * institución, tutoría, cargos especiales y paridad).
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
    (mainHtml.match(/class="cell /g) ?? []).length === 9,
    'la formación tiene 9 tarjetas (6 formaciones y 3 distinciones)',
  );
  const formation = mainHtml.slice(0, mainHtml.indexOf('data-certs'));
  check(
    !/<button|<input|<select|<script/.test(formation),
    'formación sin controles ni scripts (ADR-060)',
  );

  // --- Certificaciones (E50-I02, ADR-061) ---
  const certItems = [...mainHtml.matchAll(/<li[^>]*data-cert[\s>][\s\S]*?<\/li>/g)].map(
    (m) => m[0],
  );
  check(
    certItems.length === certifications.length,
    `${certifications.length} credenciales en las franjas (${certItems.length})`,
  );
  check(
    certifications.every((c) =>
      certItems.some(
        (item) => item.includes(c.name) && item.includes(`href="${c.url.replace(/&/g, '&amp;')}"`),
      ),
    ),
    'cada credencial con su nombre y su enlace de verificación (URL sin cambios)',
  );
  check(
    certItems.every(
      (item) =>
        /<img[^>]*loading="lazy"/.test(item) && /<img[^>]*width="\d+"[^>]*height="\d+"/.test(item),
    ),
    'insignias con carga diferida, width y height',
  );
  check(
    certItems.every((item) => /data-cert-open[^>]*hidden|hidden[^>]*data-cert-open/.test(item)),
    'botón de detalle oculto sin JavaScript (el detalle se ve en la franja)',
  );
  check(
    (mainHtml.match(/<section[^>]*id="certs-(ai|cloud|dev-data)"/g) ?? []).length === 3,
    '3 franjas: IA, Cloud y Desarrollo y datos',
  );
  check(
    /<dialog[^>]*aria-labelledby="cert-dialog-title"/.test(mainHtml),
    '<dialog> con nombre accesible',
  );
  check(
    /data-cert-close/.test(mainHtml) && /download="CV_Felipe_Cuevas_2026.pdf"/.test(mainHtml),
    'botón de cierre del diálogo y CV en el cierre (AT-076)',
  );

  // --- JSON-LD ---
  const ld = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let eduPerson = null;
  try {
    eduPerson = JSON.parse(ld[0]?.[1] ?? 'null');
  } catch (error) {
    check(false, `JSON-LD con sintaxis válida: ${error.message}`);
  }
  check(ld.length === 1 && eduPerson?.['@type'] === 'Person', 'un bloque JSON-LD Person');
  check(eduPerson?.['@id'] === `${SITE}/#felipe-cuevas`, 'Person @id = el de la portada');
  check(
    certifications.every(
      (c, i) =>
        eduPerson?.hasCredential?.[i]?.name === c.name &&
        eduPerson?.hasCredential?.[i]?.url === c.url &&
        eduPerson?.hasCredential?.[i]?.dateCreated === c.issuedAt,
    ) && eduPerson?.hasCredential?.length === certifications.length,
    'hasCredential coincide con certifications.ts',
  );
  education[lang] = {
    cells: [...mainHtml.matchAll(/class="cell ([^"]*)"/g)].map((m) => m[1]),
    credentials: eduPerson?.hasCredential,
    certs: certItems.length,
  };
}
check(same(education.es?.cells, education.en?.cells), 'mismo mosaico en /es/ y /en/');
check(
  same(education.es?.credentials, education.en?.credentials),
  'hasCredential idéntico en Educación /es/ y /en/',
);
check(
  same(education.es?.credentials, pages.es?.person?.hasCredential),
  'hasCredential de Educación = el de la portada',
);

// --- Experiencia (E60-I01, ADR-065): metadatos, estructura, grilla de 3 perfiles y enlaces ---
const EXPERIENCE = { es: 'es/experiencia', en: 'en/experience' };
// Destinos de los cuatro perfiles, en el orden en que aparecen en las tarjetas.
const PROFILE_LINKS = {
  es: ['/es/docente/', '/es/desarrollador/', '/es/instructor/', '/es/talento-digital/'],
  en: ['/en/lecturer/', '/en/developer/', '/en/instructor/', '/en/talento-digital/'],
};
// Lista cerrada de páginas de perfil que aún no existen (ADR-065). Solo vale para el control de
// enlaces de esta página. Cada épica retira las suyas al crear la página: E70 desarrollador,
// E80 docente, E90 instructor y E100 talento-digital. Si una ruta de la lista ya existe en
// dist/, el control falla hasta que se retire. E70-I01 retiró /es/desarrollador/ y /en/developer/;
// E80-I01, /es/docente/ y /en/lecturer/.
const PENDING_PROFILE_ROUTES = [
  '/es/instructor/',
  '/en/instructor/',
  '/es/talento-digital/',
  '/en/talento-digital/',
];
const routeExists = (path) => existsSync(join(DIST, path, 'index.html'));
const experience = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = EXPERIENCE[lang];
  const other = EXPERIENCE[info.other];
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
        ['x-default', `${SITE}/${EXPERIENCE.es}/`],
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

  // Grilla simétrica de 3 tarjetas, sin controles ni scripts (DESIGN.md 11.5).
  const cards = [...mainHtml.matchAll(/<article[^>]*profile-card[^>]*>[\s\S]*?<\/article>/g)].map(
    (m) => m[0],
  );
  check(cards.length === 3, `3 tarjetas de perfil (${cards.length})`);
  check(
    cards.every((card) => (card.match(/<h2[\s>]/g) ?? []).length === 1),
    'cada tarjeta con un solo <h2>',
  );
  check(
    cards.every((card) => /<img[^>]*\salt="[^"]{10,}"/.test(card)),
    'cada foto con texto alternativo',
  );
  check(
    cards.every(
      (card) => /<img[^>]*\swidth="\d+"[^>]*\sheight="\d+"/.test(card) && /srcset=/.test(card),
    ),
    'cada foto con ancho y alto declarados y srcset',
  );
  check(
    cards.every((card) => (card.match(/class="tag"/g) ?? []).length >= 3),
    'cada tarjeta con sus etiquetas',
  );
  // Línea de tiempo compacta (E60-I02, ADR-066): 3 hitos con ícono decorativo y periodo.
  const timeline = /<ol[^>]*data-timeline[^>]*>([\s\S]*?)<\/ol>/.exec(mainHtml)?.[1] ?? '';
  const milestones = [...timeline.matchAll(/<li[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  check(milestones.length === 3, `línea de tiempo con 3 hitos (${milestones.length})`);
  check(
    milestones.every((item) => /<svg[^>]*aria-hidden="true"/.test(item)),
    'cada hito con un ícono decorativo (aria-hidden)',
  );
  const present = lang === 'es' ? 'Actualidad' : 'Present';
  check(
    same(
      milestones.map((item) => /class="period[^"]*"[^>]*>([^<]*)</.exec(item)?.[1]),
      [`2023 - ${present}`, `2013 - ${present}`, `2011 - ${present}`],
    ),
    'periodos de los hitos: 2023, 2013 y 2011, hasta la actualidad',
  );
  check(
    cards.some((card) => card.includes(`2011 - ${present}`)) && !/2020/.test(mainHtml),
    'tarjeta Desarrollador vigente (2011 - hoy) y sin «2020» en la página',
  );
  check(
    !/<button|<input|<select|<script|<dialog/.test(mainHtml),
    'página sin controles ni scripts',
  );
  check(!/\sdownload[=\s>]/.test(mainHtml), 'sin «Descargar CV» en la página (ADR-057)');

  // Enlaces internos del <main>: cada uno existe en dist/ o está en la lista cerrada (ADR-065).
  const hrefs = [...mainHtml.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map((m) => decode(m[1]));
  check(
    same(hrefs, PROFILE_LINKS[lang]),
    `4 enlaces a los perfiles, en orden (${hrefs.join(', ')})`,
  );
  check(
    hrefs.every(
      (href) => href.startsWith(`/${lang}/`) && href.endsWith('/') && !href.includes('.html'),
    ),
    'enlaces con prefijo de idioma, barra final y sin .html',
  );
  const unresolved = hrefs.filter(
    (href) => !routeExists(href) && !PENDING_PROFILE_ROUTES.includes(href),
  );
  check(
    unresolved.length === 0,
    `todo enlace existe en dist/ o está en la lista cerrada de ADR-065 (${unresolved.join(', ') || 'ok'})`,
  );
  const retire = PENDING_PROFILE_ROUTES.filter(routeExists);
  check(
    retire.length === 0,
    `la lista cerrada no incluye rutas que ya existen (retira ${retire.join(', ') || 'ninguna'})`,
  );
  experience[lang] = {
    milestones: milestones.length,
    photos: cards.map((card) => /<img[^>]*\ssrc="[^"]*\/([a-z]+)\./.exec(card)?.[1]),
    tags: cards.map((card) => (card.match(/class="tag"/g) ?? []).length),
    links: hrefs.length,
    h2: levels.filter((level) => level === 2).length,
  };
}
check(
  same(experience.es, experience.en),
  'misma grilla (fotos, etiquetas y enlaces) en /es/ y /en/',
);

// --- Desarrollador (E70-I01, ADR-067): metadatos, cabecera, aspectos técnicos y 36 tecnologías ---
const DEVELOPER = { es: 'es/desarrollador', en: 'en/developer' };
// Cantidad de tecnologías por categoría, en el orden de main:desarrollador.html (36 en total).
const TECH_COUNTS = [4, 12, 9, 6, 5];
const DEVELOPER_TEXT = {
  es: { h1: 'Desarrollador Full Stack', meta: '2011 - Actualidad · Modalidad presencial' },
  en: { h1: 'Full Stack Developer', meta: '2011 - Present · On-site' },
};
const developer = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = DEVELOPER[lang];
  const other = DEVELOPER[info.other];
  console.log(`\n/${route}/ (${info.code})`);
  if (!existsSync(join(DIST, route, 'index.html'))) {
    check(false, `existe dist/${route}/index.html`);
    continue;
  }
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
        ['x-default', `${SITE}/${DEVELOPER.es}/`],
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
  check((meta('og:image:alt') ?? '').length > 10, 'texto alternativo de la imagen OG');

  const body = html.slice(html.indexOf('<body'));
  const count = (re) => (body.match(re) ?? []).length;
  check(count(/<main[\s>]/g) === 1, 'un solo <main>');
  check(count(/<h1[\s>]/g) === 1, 'un solo <h1>');
  const mainHtml = body.slice(body.indexOf('<main'), body.indexOf('</main>'));
  const levels = [...mainHtml.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  check(
    levels[0] === 1 && levels.every((level, i) => i === 0 || level - levels[i - 1] <= 1),
    `el <h1> abre el <main> y los encabezados no saltan (${levels.join(',')})`,
  );
  const text = (fragment) =>
    decode(fragment.replace(/<[^>]+>/g, ' '))
      .replace(/\s+/g, ' ')
      .trim();

  // Cabecera (ADR-067): institución igual a Experiencia y sin «UTECH INACAP | Duoc UC».
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '');
  check(h1 === DEVELOPER_TEXT[lang].h1, `<h1> = «${DEVELOPER_TEXT[lang].h1}» (${h1})`);
  const header = mainHtml.slice(0, mainHtml.indexOf('</h1>') + 400);
  check(/class="institutions[^"]*"[^>]*>\s*INACAP\s*</.test(header), 'institución «INACAP»');
  check(
    text(/data-period[^>]*>([\s\S]*?)<\/p>/.exec(mainHtml)?.[1] ?? '') ===
      DEVELOPER_TEXT[lang].meta,
    `periodo y modalidad = «${DEVELOPER_TEXT[lang].meta}»`,
  );
  check(!/UTECH|Duoc/i.test(mainHtml), 'sin «UTECH INACAP | Duoc UC» en la página (ADR-067)');

  // Aspectos técnicos: 4 entradas con h3 e ícono decorativo de icons.ts.
  const aspects = /<ul[^>]*data-aspects[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const aspectItems = [...aspects.matchAll(/<li[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  check(aspectItems.length === 4, `4 aspectos técnicos (${aspectItems.length})`);
  check(
    aspectItems.every((item) => /<h3[\s>]/.test(item) && /<svg[^>]*aria-hidden="true"/.test(item)),
    'cada aspecto con h3 e ícono decorativo',
  );

  // Muro de tecnologías: 5 categorías con h3 y lista, 36 fichas con SVG presente en dist/.
  const wall = /<div[^>]*data-technologies[^>]*>([\s\S]*)/.exec(mainHtml)?.[1] ?? '';
  const categories = [
    ...wall.matchAll(
      /<h3[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h3>\s*<ul[^>]*aria-labelledby="([^"]+)"[^>]*>([\s\S]*?)<\/ul>/g,
    ),
  ];
  check(categories.length === 5, `5 categorías de tecnologías (${categories.length})`);
  check(
    categories.every((m) => m[1] === m[3]),
    'cada lista nombrada por el h3 de su categoría',
  );
  const tiles = categories.map((m) =>
    [...m[4].matchAll(/<li[^>]*data-tech="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g)].map((t) => ({
      id: t[1],
      html: t[2],
      name: text(/class="name[^"]*"[^>]*>([\s\S]*?)<\/span>/.exec(t[2])?.[1] ?? ''),
    })),
  );
  const flat = tiles.flat();
  check(
    same(
      tiles.map((list) => list.length),
      TECH_COUNTS,
    ),
    `tecnologías por categoría ${TECH_COUNTS.join('/')} (${tiles.map((l) => l.length).join('/')})`,
  );
  check(
    flat.length === 36 && new Set(flat.map((t) => t.id)).size === 36,
    `36 tecnologías sin repetir (${flat.length})`,
  );
  const images = flat.map((t) => /<img\s[^>]*>/.exec(t.html)?.[0] ?? '');
  check(
    images.every(
      (img) =>
        /\salt=""/.test(img) &&
        /\swidth="28"/.test(img) &&
        /\sheight="28"/.test(img) &&
        /\sloading="lazy"/.test(img),
    ),
    'cada logo decorativo, de 28 × 28 declarados y con carga diferida',
  );
  check(
    images.every((img) => {
      const src = /\ssrc="([^"]+)"/.exec(img)?.[1] ?? '';
      return src.startsWith('/_astro/') && src.endsWith('.svg') && existsSync(join(DIST, src));
    }),
    'cada logo es un SVG presente en dist/_astro/ (sin data URI)',
  );
  check(
    flat.every((t) => t.name.length > 0 && /class="role/.test(t.html)),
    'cada ficha con nombre y rol visibles',
  );
  // Desde E70-I02 el portafolio lleva filtros: el control se acota a lo anterior a él.
  check(
    !/<button|<input|<select|<script|<dialog/.test(mainHtml.split('data-portfolio')[0]),
    'cabecera, aspectos y tecnologías sin controles ni scripts',
  );
  developer[lang] = {
    counts: tiles.map((list) => list.length),
    ids: flat.map((t) => t.id),
    names: flat.map((t) => t.name),
    aspects: aspectItems.length,
    levels,
  };
}
check(
  same(developer.es?.ids, developer.en?.ids) &&
    same(developer.es?.names, developer.en?.names) &&
    same(developer.es?.counts, developer.en?.counts) &&
    developer.es?.aspects === developer.en?.aspects &&
    same(developer.es?.levels, developer.en?.levels),
  'paridad Desarrollador: mismas 36 tecnologías, nombres, categorías y encabezados en /es/ y /en/',
);

// --- Docente (E80-I01, ADR-070): metadatos, cabecera, asignaturas, zigzag, tutoría y cargos ---
const LECTURER = { es: 'es/docente', en: 'en/lecturer' };
const LECTURER_TEXT = {
  es: {
    h1: 'Docente Universitario',
    meta: '2013 - Actualidad · Modalidad semipresencial',
    highlight: 'Docente con +10 años de experiencia',
    stats: ['+10', '+2.000', '1'],
  },
  en: {
    h1: 'University Lecturer',
    meta: '2013 - Present · Blended format',
    highlight: 'Lecturer with +10 years of experience',
    stats: ['+10', '+2,000', '1'],
  },
};
const LECTURER_INSTITUTIONS = ['iplacex', 'duoc', 'inacap'];
const LINKEDIN_EXPERIENCE = 'https://www.linkedin.com/in/ffelipecuevasc/details/experience/';
const lecturer = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = LECTURER[lang];
  const other = LECTURER[info.other];
  console.log(`\n/${route}/ (${info.code})`);
  if (!existsSync(join(DIST, route, 'index.html'))) {
    check(false, `existe dist/${route}/index.html`);
    continue;
  }
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
        ['x-default', `${SITE}/${LECTURER.es}/`],
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
  check((meta('og:image:alt') ?? '').length > 10, 'texto alternativo de la imagen OG');

  const body = html.slice(html.indexOf('<body'));
  const count = (re) => (body.match(re) ?? []).length;
  check(count(/<main[\s>]/g) === 1, 'un solo <main>');
  check(count(/<h1[\s>]/g) === 1, 'un solo <h1>');
  const mainHtml = body.slice(body.indexOf('<main'), body.indexOf('</main>'));
  const levels = [...mainHtml.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  check(
    levels[0] === 1 && levels.every((level, i) => i === 0 || level - levels[i - 1] <= 1),
    `el <h1> abre el <main> y los encabezados no saltan (${levels.join(',')})`,
  );
  const text = (fragment) =>
    decode(fragment.replace(/<[^>]+>/g, ' '))
      .replace(/\s+/g, ' ')
      .trim();

  // Cabecera (ADR-070): instituciones sin UTECH, periodo y modalidad de Experiencia y cifra
  // derivada de stats.json, como texto (no <button>).
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '');
  check(h1 === LECTURER_TEXT[lang].h1, `<h1> = «${LECTURER_TEXT[lang].h1}» (${h1})`);
  check(
    /class="institutions[^"]*"[^>]*>\s*INACAP \| Duoc UC \| IPLACEX\s*</.test(mainHtml),
    'instituciones «INACAP | Duoc UC | IPLACEX»',
  );
  check(!/UTECH/.test(mainHtml), 'sin «UTECH» en la página (ADR-070)');
  check(
    text(/data-period[^>]*>([\s\S]*?)<\/p>/.exec(mainHtml)?.[1] ?? '') === LECTURER_TEXT[lang].meta,
    `periodo y modalidad = «${LECTURER_TEXT[lang].meta}»`,
  );
  const highlight = text(/data-highlight[^>]*>([\s\S]*?)<\/p>/.exec(mainHtml)?.[1] ?? '').replace(
    /\+\s+/g,
    '+',
  );
  check(
    highlight === LECTURER_TEXT[lang].highlight,
    `cifra de la cabecera = «${LECTURER_TEXT[lang].highlight}» (${highlight})`,
  );
  const index = /<nav[^>]*class="index[^"]*"[^>]*>([\s\S]*?)<\/nav>/.exec(mainHtml)?.[1] ?? '';
  check(
    same(
      [...index.matchAll(/href="#([a-z]+)"/g)].map((m) => m[1]),
      LECTURER_INSTITUTIONS,
    ),
    'índice de instituciones con enlaces a #iplacex, #duoc e #inacap',
  );

  // Asignaturas: grilla de 4 tarjetas con h3 y 2 etiquetas cada una.
  const courses = /<ul[^>]*data-courses[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const courseItems = [...courses.matchAll(/<li[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  check(courseItems.length === 4, `4 asignaturas (${courseItems.length})`);
  check(
    courseItems.every(
      (item) => /<h3[\s>]/.test(item) && (item.match(/class="tag"/g) ?? []).length === 2,
    ),
    'cada asignatura con h3 y 2 etiquetas',
  );

  // Zigzag: 3 franjas con id, h3, enlace externo avisado y nombre accesible distinto.
  const stripes = LECTURER_INSTITUTIONS.map((id) => {
    const start = mainHtml.indexOf(`<section id="${id}"`);
    return start < 0 ? '' : mainHtml.slice(start, mainHtml.indexOf('</section>', start));
  });
  check(
    stripes.every((s) => s.length > 0 && /<h3[\s>]/.test(s)),
    '3 franjas (#iplacex, #duoc, #inacap) con h3',
  );
  check(
    stripes.every((s) => {
      const a = /<a\s[^>]*>[\s\S]*?<\/a>/.exec(s)?.[0] ?? '';
      return (
        a.includes(`href="${LINKEDIN_EXPERIENCE}"`) &&
        /target="_blank"/.test(a) &&
        /rel="noopener noreferrer"/.test(a) &&
        /class="sr-only"/.test(a)
      );
    }),
    '«Ver más información» a LinkedIn en pestaña nueva, avisada',
  );
  const moreNames = stripes.map((s) => text(/<a\s[^>]*>([\s\S]*?)<\/a>/.exec(s)?.[1] ?? ''));
  check(new Set(moreNames).size === 3, 'los 3 enlaces a LinkedIn con nombre accesible distinto');
  const photo = /<img\s[^>]*>/.exec(stripes[2])?.[0] ?? '';
  check(
    /\salt="[^"]{10,}"/.test(photo) &&
      /\swidth="\d+"/.test(photo) &&
      /\sheight="\d+"/.test(photo) &&
      /\sloading="lazy"/.test(photo),
    'foto de INACAP con alt, ancho y alto declarados y carga diferida',
  );
  check(
    !/2014/.test(stripes[2]),
    'el texto de INACAP no repite el año del EFC (un solo hito, 2015)',
  );

  // Tutoría: 3 cifras, «+10» y «+2.000» derivadas de stats.json.
  const statsHtml = /<dl[^>]*data-mentoring-stats[^>]*>([\s\S]*?)<\/dl>/.exec(mainHtml)?.[1] ?? '';
  const figures = [...statsHtml.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/g)].map((m) =>
    text(m[1]).replace(/\s+/g, ''),
  );
  check(
    same(figures, LECTURER_TEXT[lang].stats),
    `cifras de tutoría ${LECTURER_TEXT[lang].stats.join(' / ')} (${figures.join(' / ')})`,
  );

  // Cargos especiales: 2 entradas; EFC en 2015 y hackatón en 2018, ambos en INACAP.
  const roles = /<ul[^>]*data-roles[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const years = [...roles.matchAll(/data-year[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1]));
  check(
    same(years, ['2015 · INACAP', '2018 · INACAP']),
    `cargos especiales 2015 y 2018 en INACAP (${years.join(' / ')})`,
  );
  check(!/<button|<input|<select|<script|<dialog/.test(mainHtml), 'sin controles ni scripts');

  lecturer[lang] = {
    levels,
    courses: courseItems.length,
    stripes: stripes.map((s) => s.length > 0),
    figures: figures.map((f) => f.replace(/[.,]/g, '')),
    years,
    hrefs: [...mainHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]),
  };
}
check(
  same(lecturer.es, lecturer.en),
  'paridad Docente: mismos encabezados, asignaturas, franjas, cifras, cargos y enlaces en /es/ y /en/',
);

// --- Placa de los logos en oscuro (E70-I03, ADR-069): variable de componente por tema ---
{
  console.log('\nPlaca de los logos de tecnologías');
  const html = read(`${DEVELOPER.es}/index.html`);
  const css =
    [...html.matchAll(/href="(\/_astro\/[^"]+\.css)"/g)]
      .map((m) => readFileSync(join(DIST, m[1]), 'utf8'))
      .join('') + [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('');
  check(
    /:root\{[^}]*--tech-plate-bg:var\(--color-bg\)/.test(css),
    'en claro la placa usa `bg` (sin cambio)',
  );
  check(
    /\.dark\{[^}]*--tech-plate-bg:var\(--color-orient-50\)/.test(css),
    'en oscuro la placa usa `orient-50`',
  );
  check(/background-color:var\(--tech-plate-bg\)/.test(css), 'la caja del logo usa la placa');
}

// --- Portafolio de Desarrollador (E70-I02, ADR-068): 12 proyectos, filtros e ItemList ---
const PORTFOLIO_FILTERS = ['all', 'frontend', 'fullstack', 'backend'];
const portfolio = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = DEVELOPER[lang];
  console.log(`\n/${route}/ portafolio (${info.code})`);
  if (!existsSync(join(DIST, route, 'index.html'))) continue;
  const html = read(`${route}/index.html`);
  const mainHtml = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const section = /<section[^>]*data-portfolio[\s\S]*?<\/section>/.exec(mainHtml)?.[0] ?? '';
  check(section.length > 0, 'sección del portafolio dentro de <main>');

  // Filtros: grupo oculto sin JavaScript, botones nativos con aria-pressed y región anunciada.
  const group = /<div[^>]*data-portfolio-filters[^>]*>/.exec(section)?.[0] ?? '';
  check(
    /role="group"/.test(group) && /aria-label="[^"]{5,}"/.test(group) && /\shidden/.test(group),
    'grupo de filtros con nombre accesible y oculto sin JavaScript',
  );
  const buttons = [...section.matchAll(/<button\s[^>]*>/g)].map((m) => attrs(m[0]));
  check(
    same(
      buttons.map((b) => b['data-filter']),
      PORTFOLIO_FILTERS,
    ),
    `4 filtros en orden (${buttons.map((b) => b['data-filter']).join(', ')})`,
  );
  check(
    buttons.every((b) => b.type === 'button') &&
      same(
        buttons.map((b) => b['aria-pressed']),
        ['true', 'false', 'false', 'false'],
      ),
    'filtros type="button" con aria-pressed («Todos» activo)',
  );
  check(
    /aria-live="polite"[^>]*data-portfolio-status/.test(section),
    'resultado anunciado (aria-live)',
  );
  check(
    /<script[^>]*type="module"/.test(html) || /<script[^>]*src="[^"]+\.js"/.test(html),
    'script de filtros enlazado',
  );

  // Tarjetas: 12, ninguna oculta en el HTML, con h3, imagen optimizada y enlace externo.
  const cells = [
    ...section.matchAll(
      /<li[^>]*data-category="([a-z]+)"[^>]*data-project="([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/article>/g,
    ),
  ];
  check(cells.length === 12, `12 proyectos (${cells.length})`);
  check(
    cells.every((c) => !/^[^>]*\shidden/.test(c[0])),
    'sin JavaScript se listan los 12',
  );
  check(
    cells.every((c) => (c[3].match(/<h3[\s>]/g) ?? []).length === 1),
    'cada proyecto con un solo h3',
  );
  const covers = cells.map((c) => /<img\s[^>]*srcset=[^>]*>/.exec(c[3])?.[0] ?? '');
  check(
    covers.every(
      (img) =>
        /\salt="[^"]{10,}"/.test(img) &&
        /\swidth="\d+"/.test(img) &&
        /\sheight="\d+"/.test(img) &&
        /\sloading="lazy"/.test(img) &&
        /\.webp/.test(img),
    ),
    'cada portada WebP con srcset, alt, ancho, alto y carga diferida',
  );
  const actions = cells.map((c) => attrs(/<a\s[^>]*class="action[^>]*>/.exec(c[3])?.[0] ?? ''));
  check(
    actions.every(
      (a) =>
        /^https:\/\//.test(a.href ?? '') && a.target === '_blank' && /noopener/.test(a.rel ?? ''),
    ),
    'cada proyecto con enlace externo en pestaña nueva (noopener)',
  );

  // JSON-LD ItemList derivado del mismo contenido.
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map((m) => JSON.parse(m[1]));
  const list = blocks.find((b) => b['@type'] === 'ItemList');
  const pageUrl = `${SITE}/${route}/`;
  check(Boolean(list), 'JSON-LD ItemList presente');
  check(
    list?.['@id'] === `${pageUrl}#portfolio` && list?.url === pageUrl,
    '@id y url del ItemList absolutos con barra final',
  );
  check(
    list?.numberOfItems === 12 && list?.itemListElement?.length === 12,
    'ItemList con 12 elementos',
  );
  check(
    !('inLanguage' in (list ?? {})) &&
      (list?.itemListElement ?? []).every((e) => e.item?.inLanguage === info.code),
    `inLanguage solo en cada SoftwareSourceCode (${info.code}), no en la raíz del ItemList (E70-I04)`,
  );
  const elements = list?.itemListElement ?? [];
  check(
    elements.every((e, i) => e.position === i + 1 && e.item?.['@type'] === 'SoftwareSourceCode'),
    'posiciones 1 a 12 de tipo SoftwareSourceCode',
  );
  const titles = cells.map((c) =>
    decode(/<h3[^>]*>([\s\S]*?)<\/h3>/.exec(c[3])?.[1] ?? '')
      .replace(/\s+/g, ' ')
      .trim(),
  );
  check(
    same(
      elements.map((e) => e.item?.name),
      titles,
    ),
    'nombres del ItemList = títulos de las tarjetas, en orden',
  );
  check(
    same(
      elements.map((e) => e.item?.url),
      actions.map((a) => a.href),
    ),
    'url del ItemList = enlaces de las tarjetas',
  );
  check(
    elements.every(
      (e) =>
        /^https:\/\//.test(e.item?.image ?? '') &&
        existsSync(join(DIST, new URL(e.item.image).pathname)) &&
        e.item?.author?.['@id'] === `${SITE}/#felipe-cuevas` &&
        !/\*\*/.test(e.item?.description ?? ''),
    ),
    'imagen absoluta presente en dist/, autor = Person y descripción sin marcas',
  );
  check(
    elements.every((e) =>
      /github\.com/.test(e.item.url)
        ? e.item.codeRepository === e.item.url
        : !e.item.codeRepository,
    ),
    'codeRepository solo en los repositorios de GitHub',
  );
  portfolio[lang] = {
    ids: cells.map((c) => c[2]),
    categories: cells.map((c) => c[1]),
    urls: actions.map((a) => a.href),
    languages: elements.map((e) => e.item?.programmingLanguage),
    descriptions: elements.map((e) => e.item?.description),
  };
}
check(
  same(portfolio.es?.ids, portfolio.en?.ids) &&
    same(portfolio.es?.categories, portfolio.en?.categories) &&
    same(portfolio.es?.urls, portfolio.en?.urls) &&
    same(portfolio.es?.languages, portfolio.en?.languages),
  'paridad del portafolio: mismos 12 proyectos, categorías y enlaces en /es/ y /en/',
);
check(
  (portfolio.es?.descriptions ?? []).every((d, i) => d !== portfolio.en?.descriptions?.[i]),
  'descripciones del ItemList traducidas en /en/',
);

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
