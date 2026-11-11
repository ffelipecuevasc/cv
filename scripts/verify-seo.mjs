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
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { certifications, getCountDisplay } from '../src/data/certifications.ts';
import { socialLinks } from '../src/components/layout/social-links.ts';
import { PRIVACY_POLICY_VERSION } from '../src/data/privacy-policy.ts';

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

  // Enlaces internos del <main>: cada uno existe en dist/. La lista cerrada de rutas pendientes
  // de ADR-065 se retiró en E100-I01, al existir las 4 páginas de perfil (ADR-075).
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
  const unresolved = hrefs.filter((href) => !routeExists(href));
  check(unresolved.length === 0, `todo enlace existe en dist/ (${unresolved.join(', ') || 'ok'})`);
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

// --- Instructor (E90-I01, ADR-072): metadatos, cabecera, banda titular, cursos y planes SENCE ---
const INSTRUCTOR = { es: 'es/instructor', en: 'en/instructor' };
const INSTRUCTOR_TEXT = {
  es: { h1: 'Instructor REUF', certificate: 'Descargar Certificado REUF (PDF)' },
  en: { h1: 'REUF Instructor', certificate: 'Download REUF certificate (PDF, Spanish)' },
};
// La misma URL de main (AT-043): el PDF se copia sin cambios a public/static/.
const REUF_CERTIFICATE = '/static/Certificado_REUF_Aprobados_Felipe_Cuevas_2026.pdf';
// Relatoría (E90-I02): ids, instituciones y año de inicio, del más reciente al más antiguo.
const TEACHING_IDS = [
  'skillnest',
  'alura-latam',
  'otec-transversal',
  'otec-planacap',
  'otec-los-andes',
  'otec-degasa',
];
const TEACHING_INSTITUTIONS = [
  'Skillnest',
  'Alura Latam',
  'OTEC Transversal',
  'OTEC Planacap',
  'OTEC Los Andes',
  'OTEC DEGASA',
];
const TEACHING_YEARS = ['2026', '2026', '2025', '2025', '2024', '2023'];
const instructor = {};
console.log('\nCertificado REUF');
check(existsSync(join(DIST, REUF_CERTIFICATE)), `existe dist${REUF_CERTIFICATE} (AT-043)`);
for (const [lang, info] of Object.entries(LANGS)) {
  const route = INSTRUCTOR[lang];
  const other = INSTRUCTOR[info.other];
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
        ['x-default', `${SITE}/${INSTRUCTOR.es}/`],
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
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '');
  check(h1 === INSTRUCTOR_TEXT[lang].h1, `<h1> «${INSTRUCTOR_TEXT[lang].h1}» (${h1})`);
  const lead = /<p[^>]*data-lead[^>]*>([\s\S]*?)<\/p>/.exec(mainHtml)?.[1] ?? '';
  check(/<strong[^>]*>REUF<\/strong>/.test(lead), 'bajada con énfasis en REUF (ADR-068)');
  check(!mainHtml.includes('**'), 'sin asteriscos de énfasis sin procesar');

  // Banda titular: «+3» y «+150» derivadas de stats.json; certificado con la URL de main.
  const statsHtml = /<dl[^>]*data-titular-stats[^>]*>([\s\S]*?)<\/dl>/.exec(mainHtml)?.[1] ?? '';
  const figures = [...statsHtml.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/g)].map((m) =>
    text(m[1]).replace(/\s+/g, ''),
  );
  check(same(figures, ['+3', '+150']), `cifras del titular +3 / +150 (${figures.join(' / ')})`);
  const cert = /<div[^>]*data-certificate[^>]*>([\s\S]*?)<\/div>/.exec(mainHtml)?.[1] ?? '';
  const certLink = attrs(/<a\s[^>]*>/.exec(cert)?.[0] ?? '');
  check(certLink.href === REUF_CERTIFICATE, `certificado en ${REUF_CERTIFICATE}`);
  check('download' in certLink, 'el enlace del certificado lleva el atributo de descarga');
  check(
    certLink['aria-label'] === INSTRUCTOR_TEXT[lang].certificate,
    `nombre accesible «${INSTRUCTOR_TEXT[lang].certificate}» (${certLink['aria-label']})`,
  );
  check(
    /data-language-note/.test(cert) === (lang === 'en'),
    lang === 'en' ? 'aviso de PDF en español (ADR-017)' : 'sin aviso de idioma en es-CL',
  );

  // Principales cursos: 1 destacado con 4 datos y 6 etiquetas, y 7 bootcamps.
  const featured = /data-featured-course[^>]*>([\s\S]*?)<\/article>/.exec(mainHtml)?.[1] ?? '';
  const facts = [...featured.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/g)].map((m) => text(m[1]));
  check(
    same(facts, ['190', '9', 'N4', '2026']),
    `PF1822: 190 h, 9 módulos, N4 y 2026 (${facts.join(' / ')})`,
  );
  check((featured.match(/class="tag[\s"]/g) ?? []).length === 6, 'PF1822 con 6 etiquetas');
  const courses = count(/data-course[\s>]/g);
  check(courses === 7, `7 bootcamps (${courses})`);

  // Planes SENCE: 2 fechas (agosto 2026 y octubre 2025) y 6 planes, PF1822 destacado.
  const plans = /<ol[^>]*data-plans[^>]*>([\s\S]*?)<\/ol>/.exec(mainHtml)?.[1] ?? '';
  const dates = [...plans.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => text(m[1]));
  check(
    dates.length === 2 && /2026/.test(dates[0]) && /2025/.test(dates[1]),
    `fechas 2026 y 2025 (${dates.join(' / ')})`,
  );
  const planItems = [...plans.matchAll(/<li[^>]*data-plan[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  check(planItems.length === 6, `6 planes SENCE (${planItems.length})`);
  check(
    /featured/.test(planItems[0] ?? '') && /PF1822/.test(planItems[0] ?? ''),
    'PF1822 es el plan destacado',
  );
  check(/PF1163/.test(planItems[1] ?? ''), 'PF1163 es el segundo plan');
  check(!/<button|<input|<select|<script|<dialog/.test(mainHtml), 'sin controles ni scripts');

  // Relatoría (E90-I02, ADR-073): 6 experiencias en orden descendente, con instituciones sin
  // traducir, un periodo cada una y énfasis sin clases (ADR-068).
  const teachingHtml = /<ul[^>]*data-teaching[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1];
  check(teachingHtml !== undefined, 'existe la sección de relatoría');
  const experiences = [...(teachingHtml ?? '').matchAll(/data-experience="([^"]+)"/g)].map(
    (m) => m[1],
  );
  check(
    same(experiences, TEACHING_IDS),
    `6 experiencias en orden descendente (${experiences.join(', ')})`,
  );
  const institutions = [...(teachingHtml ?? '').matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) =>
    text(m[1]),
  );
  check(
    same(institutions, TEACHING_INSTITUTIONS),
    `instituciones sin traducir (${institutions.join(', ')})`,
  );
  const periods = [...(teachingHtml ?? '').matchAll(/<p class="meta"[^>]*>([\s\S]*?)<\/p>/g)].map(
    (m) => text(m[1]),
  );
  check(
    periods.length === 6 && periods.every((p, i) => p.includes(TEACHING_YEARS[i])),
    `periodo con el año correcto en cada experiencia (${periods.map((p) => /\d{4}/.exec(p)?.[0]).join(', ')})`,
  );
  check(
    (teachingHtml ?? '').includes('<strong'),
    'la relatoría lleva énfasis renderizado como <strong>',
  );
  check(
    !/<strong[^>]*\sclass=/.test(mainHtml),
    'ningún <strong> lleva clases (énfasis con **, ADR-068)',
  );
  check(
    TEACHING_IDS.every((id) => new RegExp(`\\sid="${id}"`).test(teachingHtml ?? '')),
    'cada experiencia conserva su ancla de main (#skillnest, #alura-latam…)',
  );

  instructor[lang] = {
    levels,
    figures,
    facts,
    courses,
    experiences,
    institutions,
    dates: dates.length,
    plans: planItems.map((p) => /featured/.test(p)),
    hrefs: [...mainHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]),
  };
}
check(
  same(instructor.es, instructor.en),
  'paridad Instructor: mismos encabezados, cifras, cursos, planes y enlaces en /es/ y /en/',
);

// --- Talento Digital (E100-I01, ADR-074): metadatos, cabecera, 6 franjas y horas de fuente única ---
const TALENTO = { es: 'es/talento-digital', en: 'en/talento-digital' };
const TALENTO_TEXT = {
  es: {
    lead: '2.000 horas',
    hours: 'horas',
    diploma: 'Diplomado en Estrategias Metodológicas y Evaluativas para la Formación Laboral',
  },
  en: {
    lead: '2,000 hours',
    hours: 'hours',
    diploma: 'Diploma in Methodological and Assessment Strategies for Workforce Training',
  },
};
// Orden de main: plan, horas, años y portada (las 5 portadas de main, sin cambios).
const BOOTCAMPS = [
  ['PF1162', 480, '2023-2024', 'bootcamp-java.svg'],
  ['PF1487', 207, '2024-2025', 'bootcamp-datos.svg'],
  ['PF1164', 462, '2025', 'bootcamp-python.svg'],
  ['PF1164', 462, '2025-2026', 'bootcamp-python.svg'],
  ['PF1479', 475, '2026', 'bootcamp-javascript.svg'],
  ['PF1163', 472, '2026', 'bootcamp-javascript-v1.svg'],
];
// Logros (E100-I02): textos esperados por idioma; las cifras, las de stats.json.
const TALENTO_ACHIEVEMENTS = {
  es: {
    kicker: 'Alianzas Estratégicas',
    title: 'Logros',
    alliances: ['JetBrains', 'AWS', 'Masterclasses'],
    figures: ['+2.000', '+5', '+150'],
  },
  en: {
    kicker: 'Strategic Partnerships',
    title: 'Achievements',
    alliances: ['JetBrains', 'AWS', 'Masterclasses'],
    figures: ['+2,000', '+5', '+150'],
  },
};
const talento = {};
console.log('\nPortadas de los bootcamps');
for (const cover of new Set(BOOTCAMPS.map((b) => b[3]))) {
  check(existsSync(join(DIST, 'static/img', cover)), `existe dist/static/img/${cover} (AT-043)`);
}
for (const [lang, info] of Object.entries(LANGS)) {
  const route = TALENTO[lang];
  const other = TALENTO[info.other];
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
  check(title.includes('Talento Digital para Chile'), 'el title nombra el programa sin traducir');
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
        ['x-default', `${SITE}/${TALENTO.es}/`],
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
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '');
  check(
    h1 === 'Talento Digital para Chile',
    `<h1> «Talento Digital para Chile» sin traducir (${h1})`,
  );
  const lead = /<p[^>]*data-lead[^>]*>([\s\S]*?)<\/p>/.exec(mainHtml)?.[1] ?? '';
  check(
    text(lead).includes(TALENTO_TEXT[lang].lead) && /<strong[^>]*>[^<]*\d/.test(lead),
    `bajada con «${TALENTO_TEXT[lang].lead}» de stats.json, con énfasis (ADR-053)`,
  );
  check(
    !mainHtml.includes('**') && !/\{[a-z-]+\}/.test(mainHtml),
    'sin ** ni marcadores sin procesar',
  );
  const badgesHtml = /<ul[^>]*data-badges[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const badges = [...badgesHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1]));
  check(badges.length === 3, `3 insignias (${badges.length})`);
  check(
    badges[2] === TALENTO_TEXT[lang].diploma,
    'la insignia del diploma usa el nombre largo de Educación (DESIGN.md 11.4)',
  );

  // Franjas: 6 bootcamps en el orden de main, con portada, etiquetas, Logros y horas | años.
  const stripes = [
    ...mainHtml.matchAll(/data-bootcamp="([^"]+)"[\s\S]*?data-duration[^>]*>([\s\S]*?)<\/p>/g),
  ];
  check(
    same(
      stripes.map((m) => m[1]),
      BOOTCAMPS.map((b) => b[0]),
    ),
    `6 franjas en el orden de main (${stripes.map((m) => m[1]).join(', ')})`,
  );
  const durations = stripes.map((m) => text(m[2]));
  check(
    BOOTCAMPS.every(
      ([, hours, years], i) => durations[i] === `${hours} ${TALENTO_TEXT[lang].hours} | ${years}`,
    ),
    `horas | años de cada franja (${durations.join(' / ')})`,
  );
  const covers = [...mainHtml.matchAll(/<img[^>]*class="cover"[^>]*>/g)].map((m) => attrs(m[0]));
  check(
    same(
      covers.map((c) => c.src),
      BOOTCAMPS.map((b) => `/static/img/${b[3]}`),
    ),
    'cada franja usa su portada de main en /static/img/',
  );
  check(
    covers.every((c) => (c.alt ?? '').length > 10 && c.width && c.height && c.loading === 'lazy'),
    'portadas con alt, ancho y alto declarados y carga diferida',
  );
  check(count(/class="achievements-title/g) === 6, '6 subtítulos «Logros» (h4)');
  const sections = [...mainHtml.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map(
    (m) => m[1],
  );
  const stripeLabels = sections.filter((s) => s.includes(' '));
  check(
    stripeLabels.length === 6 &&
      stripeLabels.every((s) => s.split(' ').every((id) => mainHtml.includes(`id="${id}"`))),
    'cada franja se nombra por titular y bajada (titulares repetidos)',
  );
  check(!/<button|<input|<select|<script|<dialog/.test(mainHtml), 'sin controles ni scripts');
  check(!/data-aos/.test(html), 'sin AOS');

  // Fuente única de horas de PF1163 (E100-I01): el plan SENCE de Instructor dice lo mismo.
  const instructorHtml = read(`${INSTRUCTOR[lang]}/index.html`);
  const pf1163 = [...instructorHtml.matchAll(/<li[^>]*data-plan[\s>][\s\S]*?<\/li>/g)]
    .map((m) => text(m[0]))
    .find((t) => t.includes('PF1163'));
  check(
    Boolean(pf1163) &&
      pf1163.includes(`472 ${TALENTO_TEXT[lang].hours}`) &&
      Boolean(durations[5]?.startsWith('472 ')),
    'PF1163: 472 horas en Talento Digital y en los planes de Instructor (fuente única)',
  );

  // Logros (E100-I02, ADR-076): «Alianzas Estratégicas», 3 alianzas con ícono y 3 cifras de
  // stats.json por id (class-hours, bootcamps y reuf-modules, ADR-053).
  const achievementsHtml =
    /<section[^>]*data-achievements[^>]*>([\s\S]*?)<\/dl>/.exec(mainHtml)?.[1] ?? '';
  check(achievementsHtml.length > 0, 'existe la sección Logros');
  const achievementsH2 = text(/<h2[^>]*>([\s\S]*?)<\/h2>/.exec(achievementsHtml)?.[1] ?? '');
  check(
    achievementsH2 === TALENTO_ACHIEVEMENTS[lang].title,
    `h2 «${TALENTO_ACHIEVEMENTS[lang].title}» (${achievementsH2})`,
  );
  check(
    text(achievementsHtml).includes(TALENTO_ACHIEVEMENTS[lang].kicker),
    `rótulo «${TALENTO_ACHIEVEMENTS[lang].kicker}»`,
  );
  check(
    (achievementsHtml.match(/<strong/g) ?? []).length === 2,
    'bajada de Logros con 2 énfasis, como main',
  );
  const alliancesHtml = /<ul[^>]*data-alliances[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const alliances = [...alliancesHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1]);
  check(
    alliances.length === 3 && alliances.every((li) => /<svg[^>]*aria-hidden="true"/.test(li)),
    `3 alianzas con ícono decorativo (${alliances.length})`,
  );
  check(
    TALENTO_ACHIEVEMENTS[lang].alliances.every((word, i) =>
      text(alliances[i] ?? '').includes(word),
    ),
    'alianzas en el orden de main (JetBrains, AWS, Masterclasses)',
  );
  const achievementStatsHtml =
    /<dl[^>]*data-achievement-stats[^>]*>([\s\S]*?)<\/dl>/.exec(mainHtml)?.[1] ?? '';
  const achievementFigures = [...achievementStatsHtml.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/g)].map(
    (m) => text(m[1]).replace(/\s+/g, ''),
  );
  check(
    same(achievementFigures, TALENTO_ACHIEVEMENTS[lang].figures),
    `cifras de Logros ${TALENTO_ACHIEVEMENTS[lang].figures.join(' / ')} (${achievementFigures.join(' / ')})`,
  );
  check(
    /<section[^>]*class="[^"]*texture-band[^"]*"[^>]*>[\s\S]*?data-achievement-stats/.test(
      mainHtml.slice(mainHtml.indexOf('data-achievements')),
    ),
    'las cifras de Logros van en una banda (7.8)',
  );
  check(!/ld\+json/.test(html), 'sin JSON-LD propio (ADR-076, AT-093)');

  talento[lang] = {
    achievements: achievementFigures.map((f) => f.replace(/[.,]/g, '')),
    alliances: alliances.length,
    levels,
    badges: badges.length,
    plans: stripes.map((m) => m[1]),
    covers: covers.map((c) => c.src),
    tags: [...mainHtml.matchAll(/class="tag[\s"]/g)].length,
    years: durations.map((d) => d.split('|')[1]?.trim()),
  };
}
check(
  same(talento.es, talento.en),
  'paridad Talento Digital: mismos encabezados, insignias, franjas, portadas, etiquetas y años',
);

// --- Destacados REUF de Educación (E90-I01, ADR-072): «10+» y «5+» salen de stats.json ---
console.log('\nDestacados REUF de Educación');
for (const [lang, expected] of Object.entries({
  es: ['10+ Años de Experiencia', '5+ Bootcamps de Talento Digital'],
  en: ['10+ years of experience', '5+ Talento Digital bootcamps'],
})) {
  const html = read(`${EDUCATION[lang]}/index.html`);
  const list = /<ul class="highlights"[^>]*>([\s\S]*?)<\/ul>/.exec(html)?.[1] ?? '';
  const items = [...list.matchAll(/<span[^>]*>([^<]*)<\/span>/g)].map((m) => decode(m[1]).trim());
  check(same(items, expected), `${lang}: ${expected.join(' · ')} (${items.join(' · ')})`);
}

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

// --- Foro (E120-I01, ADR-022 y ADR-078): metadatos, estructura, Giscus y paridad ---
const FORUM = { es: 'es/foro', en: 'en/forum' };
// Identificadores públicos de main (static/js/config/comunidad.config.js): no se cambian.
const FORUM_GISCUS = {
  'data-repo': 'ffelipecuevasc/comunidad',
  'data-repo-id': 'R_kgDOT6gwGg',
  'data-category': 'Dudas por ruta',
  'data-category-id': 'DIC_kwDOT6gwGs4DDiHV',
  'data-term': 'foro-general',
  'data-theme-light': 'light',
  'data-theme-dark': 'transparent_dark',
  'data-root-margin': '400px',
  'data-script': 'https://giscus.app/client.js',
  'data-origin': 'https://giscus.app',
};
const FORUM_DISCUSSIONS = 'https://github.com/ffelipecuevasc/comunidad/discussions';
const FORUM_TEXT = {
  es: { h1: 'Foro de Aprendizaje', rules: 'Ocho reglas breves', notice: 'giscus.app y a GitHub' },
  en: { h1: 'Learning Forum', rules: 'Eight short rules', notice: 'giscus.app and GitHub' },
};
const forum = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = FORUM[lang];
  const other = FORUM[info.other];
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
  check(
    !/rastreo|tracking/i.test(description),
    'la description no promete «sin rastreo de terceros» (ADR-078)',
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
        ['x-default', `${SITE}/${FORUM.es}/`],
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
  check(!head.includes('application/ld+json'), 'sin JSON-LD (main no lo tenía)');

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
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '');
  check(h1 === FORUM_TEXT[lang].h1, `<h1> = «${FORUM_TEXT[lang].h1}»`);
  check(
    tags(body, 'a').some((a) => a.href === `/${other}/` && a.hreflang === LANGS[info.other].code),
    'el selector de idioma lleva a la página equivalente',
  );

  // Pasos (banda), categorías (bg-alt) y conversación, en ese orden.
  const steps = /<ul[^>]*data-steps[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const stepItems = steps.match(/<li[\s>]/g) ?? [];
  check(stepItems.length === 3, `3 pasos (${stepItems.length})`);
  check(
    /texture-band[^>]*>[\s\S]*data-steps/.test(mainHtml),
    'los pasos van dentro de una banda (7.8)',
  );
  check(
    text(steps).includes(FORUM_TEXT[lang].rules),
    `paso 2: «${FORUM_TEXT[lang].rules}» (AT-094)`,
  );
  check(
    (steps.match(/target="_blank" rel="noopener noreferrer"/g) ?? []).length === 2,
    'los pasos 1 y 2 enlazan afuera con pestaña nueva',
  );
  const categories = /<ul[^>]*data-categories[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const categoryItems = categories.match(/<li[\s>]/g) ?? [];
  check(categoryItems.length === 4, `4 categorías (${categoryItems.length})`);
  check(!/<img[\s>]/.test(categories), 'las categorías no llevan foto');
  const order = ['data-steps', 'data-categories', 'data-forum-notice', 'data-forum-thread'].map(
    (marker) => mainHtml.indexOf(marker),
  );
  check(
    order.every((pos, i) => pos > 0 && (i === 0 || pos > order[i - 1])),
    'orden: pasos → categorías → aviso → panel de Giscus',
  );

  // Giscus: identificadores públicos de main, idioma por página y nada cargado en el HTML.
  const panelTag = /<div[^>]*data-forum-thread[^>]*>/.exec(mainHtml)?.[0] ?? '';
  const panel = attrs(panelTag);
  for (const [name, value] of Object.entries(FORUM_GISCUS)) {
    check(panel[name] === value, `${name} = ${value}`);
  }
  check(panel['data-lang'] === lang, `data-lang = ${lang} (AT-027)`);
  check(
    !/<script[^>]*giscus\.app/.test(html),
    'giscus.app no se carga en el HTML (carga diferida)',
  );
  check(!/<iframe[\s>]/.test(mainHtml), 'sin iframe en el HTML');
  check(
    /data-forum-placeholder[\s\S]*?role="status"/.test(mainHtml) && !/animate-spin/.test(mainHtml),
    'marcador estático con role="status", sin spinner (DESIGN.md 8)',
  );
  check(text(mainHtml).includes(FORUM_TEXT[lang].notice), 'el aviso nombra giscus.app y GitHub');
  const noscript = /<noscript>([\s\S]*?)<\/noscript>/.exec(mainHtml)?.[1] ?? '';
  check(
    noscript.includes(`href="${FORUM_DISCUSSIONS}"`) &&
      /\[data-forum-thread\]\s*\{[^}]*display:\s*none/.test(noscript),
    '<noscript> oculta el panel y enlaza a las discusiones',
  );
  check(
    (mainHtml.match(new RegExp(`href="${FORUM_DISCUSSIONS}"`, 'g')) ?? []).length === 2,
    'enlace a GitHub bajo el panel y en <noscript>',
  );
  check(
    !/(client_secret|ghp_[A-Za-z0-9]|github_pat_|gho_[A-Za-z0-9]|api[_-]?key|token=)/i.test(html),
    'sin claves privadas ni tokens en el HTML',
  );

  forum[lang] = {
    giscus: Object.keys(FORUM_GISCUS).map((name) => panel[name]),
    steps: stepItems.length,
    categories: categoryItems.length,
    levels,
  };
}
check(
  same(forum.es?.giscus, forum.en?.giscus),
  'mismo repo, categoría y término en /es/ y /en/ (ADR-022)',
);
check(
  forum.es?.steps === forum.en?.steps && forum.es?.categories === forum.en?.categories,
  'mismos pasos y categorías en /es/ y /en/',
);
check(same(forum.es?.levels, forum.en?.levels), 'misma estructura de encabezados en /es/ y /en/');

// --- Recursos (E130-I01, ADR-079): bóveda mixta, ruta Web & IA con progreso y su hilo ---
const RESOURCES = { es: 'es/recursos', en: 'en/resources' };
// Pasos de la ruta desarrollo-web-ia de main, en orden (ids de rutas-progreso, ADR-023).
const ROUTE_STEPS = Array.from({ length: 25 }, (_, i) => i + 9);
const ROUTE_STAGES = 6;
// Archivos locales de la ruta con la URL de main (AT-043) y su peso exacto en bytes.
const ROUTE_FILES = {
  '/static/recursos/ia/desarrollo-web/glosario-vibe-coding-ingenieria-ia.pdf': 136278,
  '/static/recursos/ia/desarrollo-web/etapa-1-planificacion.pdf': 926842,
  '/static/recursos/ia/desarrollo-web/etapa-2-diseno-google-stitch.pdf': 707648,
  '/static/recursos/ia/desarrollo-web/prompt-maestro-stitch.txt': 3110,
  '/static/recursos/ia/desarrollo-web/etapa-3-arquitectura-proyecto.pdf': 715117,
  '/static/recursos/ia/desarrollo-web/plantilla-agents-md.txt': 955,
  '/static/recursos/ia/desarrollo-web/etapa-4-publicacion-git-github-cicd.pdf': 923064,
  '/static/recursos/ia/desarrollo-web/plantilla-gitignore.txt': 214,
  '/static/recursos/ia/desarrollo-web/esqueleto-workflow-publicar.yml': 1286,
  '/static/recursos/ia/desarrollo-web/etapa-5-delegar-claude-code.pdf': 976904,
};
// Archivos de los recursos 1 al 8 (E130-I02, AT-043), también con la URL y el peso de main.
const THEME_FILES = {
  '/static/recursos/empleabilidad/manual-optimizar-perfil-linkedin.pdf': 6320756,
  '/static/recursos/empleabilidad/taller-cv-online.pdf': 1588681,
  '/static/recursos/python/actividad-hackaton-de-estudio.pdf': 2985165,
  '/static/recursos/python/taller-despliegue-plataforma-alwaysdata.pdf': 2122586,
  '/static/recursos/python/taller-despliegue-plataforma-google-cloud.pdf': 12077850,
};
// Temáticas en orden, con sus recursos (decisión de Felipe, 03-11-2026; ADR-081).
const THEMES = [
  ['empleabilidad', [1, 3]],
  ['python', [2, 4, 5, 6, 7]],
  ['java', [8]],
];
const RESOURCES_TEXT = {
  es: { h1: 'Bóveda de recursos', title: 'Bóveda de recursos | Felipe Cuevas' },
  en: { h1: 'Resource vault', title: 'Resource vault | Felipe Cuevas' },
};
console.log('\nArchivos locales de Recursos (ruta y temáticas)');
for (const [path, size] of Object.entries({ ...ROUTE_FILES, ...THEME_FILES })) {
  const file = join(DIST, path);
  check(existsSync(file) && statSync(file).size === size, `dist${path} (${size} bytes, AT-043)`);
}
const resources = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = RESOURCES[lang];
  const other = RESOURCES[info.other];
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
  check(title === RESOURCES_TEXT[lang].title, `title = «${RESOURCES_TEXT[lang].title}» (AT-037)`);
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
        ['x-default', `${SITE}/${RESOURCES.es}/`],
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
    `el <h1> abre el <main> y los encabezados no saltan`,
  );
  const text = (fragment) =>
    decode(fragment.replace(/<[^>]+>/g, ' '))
      .replace(/\s+/g, ' ')
      .trim();
  const h1 = text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '');
  check(h1 === RESOURCES_TEXT[lang].h1, `<h1> = «${RESOURCES_TEXT[lang].h1}» (AT-037)`);
  check(
    tags(body, 'a').some((a) => a.href === `/${other}/` && a.hreflang === LANGS[info.other].code),
    'el selector de idioma lleva a la página equivalente',
  );

  // Ruta: ficha en banda, pasos en orden, etapas y progreso solo con JavaScript.
  check(
    /texture-band[^>]*>[\s\S]*data-route-progress/.test(mainHtml),
    'la ficha de la ruta va en una banda (7.8)',
  );
  check(
    /<dl class="facts[^"]*"[^>]*>/.test(mainHtml) &&
      (mainHtml.match(/<dt[\s>]/g) ?? []).length === 3,
    'ficha con 3 datos en <dl>',
  );
  const sectionTag = /<section[^>]*data-route="[^"]*"[^>]*>/.exec(mainHtml)?.[0] ?? '';
  const section = attrs(sectionTag);
  check(section['data-route'] === 'desarrollo-web-ia', 'data-route = desarrollo-web-ia (ADR-023)');
  check(section['data-total'] === String(ROUTE_STEPS.length), `data-total = ${ROUTE_STEPS.length}`);
  const stepIds = [...mainHtml.matchAll(/data-step="(\d+)"/g)].map((m) => Number(m[1]));
  check(same(stepIds, ROUTE_STEPS), 'pasos 9 al 33 en el orden de main');
  check(
    (mainHtml.match(/data-stage="stage-\d+"/g) ?? []).length === ROUTE_STAGES,
    `${ROUTE_STAGES} etapas`,
  );
  check(
    (mainHtml.match(/<input type="checkbox" value="(\d+)"/g) ?? []).length === ROUTE_STEPS.length,
    'una casilla por paso, con el id como valor',
  );
  check(
    [...mainHtml.matchAll(/<label[^>]*data-step-check[^>]*>/g)].every((m) =>
      /\shidden/.test(m[0]),
    ) &&
      /<div[^>]*data-route-progress[^>]*hidden/.test(mainHtml) &&
      /<div[^>]*data-route-search[^>]*hidden/.test(mainHtml),
    'casillas, progreso y buscador nacen ocultos (sin JavaScript se lee la ruta)',
  );
  const starts = [...mainHtml.matchAll(/<ol class="steps[^"]*" start="(\d+)"/g)].map((m) =>
    Number(m[1]),
  );
  check(starts.length === ROUTE_STAGES && starts[0] === 1, 'numeración de pasos de corrido');
  for (const path of Object.keys(ROUTE_FILES)) {
    check(
      new RegExp(`<a href="${path.replace(/\./g, '\\.')}" download`).test(mainHtml),
      `descarga ${path.split('/').pop()}`,
    );
  }
  const routeHtml = mainHtml.slice(
    mainHtml.indexOf('data-stages'),
    mainHtml.indexOf('data-forum-thread'),
  );
  const external = [...routeHtml.matchAll(/<a href="(https:[^"]+)"([^>]*)>/g)].filter(
    ([, href]) => !href.startsWith('https://github.com/ffelipecuevasc/comunidad'),
  );
  check(
    external.length === ROUTE_STEPS.length - Object.keys(ROUTE_FILES).length &&
      external.every(([, , rest]) => rest.includes('target="_blank" rel="noopener noreferrer"')),
    'pasos externos con pestaña nueva avisada',
  );
  check(
    !/static\/js\/|rutas\.js|data-aos|animate-spin/.test(html),
    'sin JS de main, AOS ni spinner',
  );

  // Hilo de la ruta con la sección común de Giscus.
  const panel = attrs(/<div[^>]*data-forum-thread[^>]*>/.exec(mainHtml)?.[0] ?? '');
  check(panel['data-term'] === 'ruta-desarrollo-web-ia', 'Giscus: término ruta-desarrollo-web-ia');
  check(panel['data-repo'] === 'ffelipecuevasc/comunidad', 'Giscus: repo de main');
  check(panel['data-lang'] === lang, `Giscus: data-lang = ${lang}`);
  check(!/ruta-(python|empleabilidad|java)\b/.test(html), 'sin los hilos de las rutas retiradas');
  check(!/<script[^>]*giscus\.app/.test(html), 'giscus.app no se carga en el HTML');
  check(
    mainHtml.indexOf('data-stages') < mainHtml.indexOf('data-forum-thread'),
    'orden: ficha → pasos → conversación',
  );

  // Temáticas (E130-I02, ADR-081): grilla sobre bg-alt después del hilo, sin progreso.
  const themesHtml = mainHtml.slice(mainHtml.indexOf('<section class="themes'));
  check(
    /<section class="themes[^"]*"[^>]*aria-labelledby="themes-title"/.test(mainHtml) &&
      mainHtml.indexOf('data-forum-thread') < mainHtml.indexOf('<section class="themes'),
    'orden: … → conversación → temáticas',
  );
  const themeIds = [...themesHtml.matchAll(/data-theme="([a-z-]+)"/g)].map((m) => m[1]);
  check(
    same(
      themeIds,
      THEMES.map(([id]) => id),
    ),
    'temáticas Empleabilidad, Python y Java en orden',
  );
  const themeItems = themesHtml
    .split(/data-theme="/)
    .slice(1)
    .map((chunk) => [...chunk.matchAll(/data-resource="(\d+)"/g)].map((m) => Number(m[1])));
  check(
    same(
      themeItems,
      THEMES.map(([, ids]) => ids),
    ),
    'recursos 1 al 8 en su temática (el 8 solo en Java)',
  );
  check(
    (themesHtml.match(/<h3[\s>]/g) ?? []).length === THEMES.length &&
      (themesHtml.match(/<h4[\s>]/g) ?? []).length === 8,
    'un h3 por temática y un h4 por recurso',
  );
  check(!/type="checkbox"|data-step=/.test(themesHtml), 'las temáticas no tienen progreso');
  for (const path of Object.keys(THEME_FILES)) {
    check(
      new RegExp(`<a href="${path.replace(/\./g, '\\.')}" download`).test(themesHtml),
      `descarga ${path.split('/').pop()}`,
    );
  }
  check(
    [...themesHtml.matchAll(/<a href="(https:[^"]+)"([^>]*)>/g)].length === 3,
    '3 videos externos en las temáticas',
  );

  // Peso visible y aviso de idioma junto a cada archivo local (AT-034).
  const downloads = [
    ...mainHtml.matchAll(
      /<a href="(\/static\/[^"]+)" download[^>]*data-bytes="(\d+)"[\s\S]*?<\/a>\s*<span class="file-meta[^"]*"[^>]*>([^<]*)<\/span>/g,
    ),
  ];
  const allFiles = { ...ROUTE_FILES, ...THEME_FILES };
  check(
    downloads.length === Object.keys(allFiles).length &&
      downloads.every(([, path, bytes]) => allFiles[path] === Number(bytes)),
    `${Object.keys(allFiles).length} descargas con su peso exacto (data-bytes = archivo)`,
  );
  const sizeRe = lang === 'es' ? /\d+(,\d)? (MB|KB)/ : /\d+(\.\d)? (MB|KB)/;
  check(
    downloads.every(
      ([, path, , meta]) =>
        decode(meta).startsWith(path.split('.').pop().toUpperCase()) && sizeRe.test(meta),
    ),
    `tipo y peso visibles junto al enlace (${lang === 'es' ? '«6,0 MB»' : '«6.0 MB»'})`,
  );
  check(
    downloads.every(([, , , meta]) => meta.includes('In Spanish') === (lang === 'en')),
    lang === 'en' ? 'aviso «In Spanish» en cada archivo (AT-034)' : 'sin aviso de idioma en /es/',
  );

  // JSON-LD (ADR-082): un solo Course para la ruta, sin ItemList.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let course;
  try {
    course = JSON.parse(blocks[0]?.[1] ?? '{}');
  } catch {
    course = {};
  }
  check(blocks.length === 1 && course['@type'] === 'Course', 'un solo JSON-LD, de tipo Course');
  check(
    course['@context'] === 'https://schema.org' &&
      course['@id'] === `${canonical}#ruta-desarrollo-web-ia` &&
      course.url === `${canonical}?ruta=desarrollo-web-ia`,
    'Course: @context, @id y url con ?ruta=',
  );
  check(
    [course.name, course.description, course.teaches, course.coursePrerequisites].every(
      (value) => typeof value === 'string' && value.length > 0,
    ),
    'Course: name, description, teaches y coursePrerequisites',
  );
  check(
    course.inLanguage === 'es' && course.isAccessibleForFree === true,
    'Course: inLanguage es (materiales en español) y gratuito',
  );
  const personId = `${SITE}/#felipe-cuevas`;
  check(
    course.provider?.['@id'] === personId &&
      course.hasCourseInstance?.['@type'] === 'CourseInstance' &&
      course.hasCourseInstance?.courseMode === 'online' &&
      course.hasCourseInstance?.courseWorkload === 'PT8H' &&
      course.hasCourseInstance?.instructor?.['@id'] === personId,
    'Course: proveedor e instructor = Person de la portada; CourseInstance en línea, PT8H',
  );
  check(!/ItemList/.test(html), 'sin ItemList (las temáticas no se describen)');

  resources[lang] = { stepIds, levels, term: panel['data-term'], starts, themeItems };
}
check(
  same(resources.es?.stepIds, resources.en?.stepIds) &&
    same(resources.es?.starts, resources.en?.starts),
  'mismos pasos y etapas en /es/ y /en/',
);
check(same(resources.es?.levels, resources.en?.levels), 'misma estructura de encabezados');
check(resources.es?.term === resources.en?.term, 'mismo hilo de Giscus en /es/ y /en/ (ADR-022)');
check(same(resources.es?.themeItems, resources.en?.themeItems), 'mismas temáticas en /es/ y /en/');

// --- Contacto (E140-I01, ADR-035 y ADR-083): metadatos, estructura, formulario y terceros ---
const CONTACT_ROUTES = { es: 'es/contacto', en: 'en/contact' };
const CONTACT_TEXT = {
  es: { h1: 'Contáctame', privacy: '/es/privacidad/' },
  en: { h1: 'Get in touch', privacy: '/en/privacy/' },
};
// Canales de main:contacto.html, en orden, sin Discord (ADR-044).
const CONTACT_CHANNELS = [
  'mailto:contacto@felipecuevas.dev',
  'https://www.linkedin.com/in/ffelipecuevasc/',
  'https://github.com/ffelipecuevasc',
  'https://chilefacilitadores.cl/users/detail/ffelipecuevasc',
];
/*
 * Rutas que se aceptan como enlace interno aunque aún no tengan página. Sin excepciones vigentes:
 * E155-I01 publicó /es/privacidad/ y /en/privacy/ y vació esta lista (ADR-083, ADR-087).
 */
const PENDING_ROUTES = [];
const CONTACT_FIELDS = [
  'contact-name',
  'contact-email',
  'contact-subject',
  'contact-message',
  'contact-consent',
];
const contact = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = CONTACT_ROUTES[lang];
  const other = CONTACT_ROUTES[info.other];
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
        ['x-default', `${SITE}/${CONTACT_ROUTES.es}/`],
      ].sort(),
    ),
    'hreflang recíprocos con barra final y x-default → /es/',
  );
  check(meta('og:url') === canonical && meta('og:locale') === info.og, 'og:url y og:locale');
  check(
    meta('og:title') === title && meta('og:description') === description,
    'og:title y og:description = title y description',
  );
  check((meta('og:image:alt') ?? '').length > 10, 'texto alternativo de la imagen OG');
  check(!head.includes('application/ld+json'), 'sin JSON-LD (main no lo tenía)');

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
  check(
    text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(mainHtml)?.[1] ?? '') === CONTACT_TEXT[lang].h1,
    `<h1> = «${CONTACT_TEXT[lang].h1}»`,
  );
  check(
    tags(body, 'a').some((a) => a.href === `/${other}/` && a.hreflang === LANGS[info.other].code),
    'el selector de idioma lleva a la página equivalente',
  );

  // Composición A: canales en banda → formulario → Calendly.
  const channels = /<ul[^>]*data-channels[^>]*>([\s\S]*?)<\/ul>/.exec(mainHtml)?.[1] ?? '';
  const channelLinks = tags(channels, 'a');
  check(
    same(
      channelLinks.map((a) => a.href),
      CONTACT_CHANNELS,
    ),
    'los 4 canales de main sin Discord, en orden (ADR-044)',
  );
  check(
    channelLinks.every((a) =>
      a.href.startsWith('mailto:')
        ? !a.target
        : a.target === '_blank' && a.rel === 'noopener noreferrer',
    ),
    'los canales externos abren pestaña nueva; el correo no',
  );
  check(
    /texture-band[^>]*>[\s\S]*data-channels/.test(mainHtml),
    'los canales van en una banda (7.8)',
  );
  const order = ['data-channels', 'data-contact-form', 'data-calendly'].map((m) =>
    mainHtml.indexOf(m),
  );
  check(
    order.every((pos, i) => pos > 0 && (i === 0 || pos > order[i - 1])),
    'orden: canales → formulario → Calendly',
  );

  // Formulario: destino, campos con etiqueta, consentimiento y versión de la política.
  const formTag = attrs(/<form[^>]*data-contact-form[^>]*>/.exec(mainHtml)?.[0] ?? '');
  const formHtml = /<form[^>]*data-contact-form[\s\S]*?<\/form>/.exec(mainHtml)?.[0] ?? '';
  check(
    formTag.action === '/api/contacto' && formTag.method === 'post',
    'envía por POST a /api/contacto',
  );
  for (const id of CONTACT_FIELDS) {
    const control = /<(input|textarea)\b[^>]*>/g;
    const tag = [...formHtml.matchAll(control)]
      .map((m) => m[0])
      .find((t) => t.includes(`id="${id}"`));
    check(
      new RegExp(`<label[^>]*for="${id}"`).test(formHtml) && /\srequired/.test(tag ?? ''),
      `${id}: etiqueta visible y obligatorio`,
    );
    check(formHtml.includes(`id="${id}-error"`), `${id}: mensaje de error propio`);
  }
  check(
    /id="contact-consent"[^>]*type="checkbox"/.test(formHtml),
    'el consentimiento es un checkbox',
  );
  check(
    tags(formHtml, 'a').some((a) => a.href === CONTACT_TEXT[lang].privacy),
    `el checkbox enlaza a ${CONTACT_TEXT[lang].privacy} (ADR-035)`,
  );
  const version = tags(formHtml, 'input').find((i) => i.name === 'versionPolitica');
  check(
    version?.type === 'hidden' && version.value === PRIVACY_POLICY_VERSION,
    `versión de la política = ${PRIVACY_POLICY_VERSION} (constante única, ADR-083)`,
  );
  check(
    /<button[^>]*type="submit"/.test(formHtml) &&
      !/<button[^>]*type="submit"[^>]*\sdisabled/.test(formHtml),
    'botón de envío presente y no deshabilitado (ADR-035)',
  );
  check(!/<(input|textarea)[^>]*\sdisabled/.test(formHtml), 'ningún campo nace deshabilitado');
  check(/<noscript>[\s\S]*data-contact-noscript/.test(formHtml), 'aviso sin JavaScript');
  check(/role="status"[^>]*data-form-status/.test(formHtml), 'región de estado del envío');

  // Terceros diferidos: ni Turnstile ni Calendly se cargan en el HTML (AT-024).
  check(
    !/<script[^>]*(challenges\.cloudflare\.com|calendly\.com)/.test(html) &&
      !/<iframe[\s>]/.test(mainHtml),
    'Turnstile y Calendly no se cargan en el HTML',
  );
  check(
    attrs(/<div[^>]*data-turnstile[^>]*>/.exec(mainHtml)?.[0] ?? '')['data-language'] === lang,
    `Turnstile en el idioma de la página (${lang})`,
  );
  check(
    /<noscript>[\s\S]*data-calendly-load/.test(mainHtml),
    'sin JavaScript se oculta «Cargar el calendario»',
  );
  check(
    mainHtml.includes('href="https://calendly.com/ffelipecuevasc/entrevista-breve"'),
    'enlace directo a Calendly',
  );
  check(
    !/(client_secret|TURNSTILE_SECRET|CF_EMAIL_TOKEN|api[_-]?key|token=)/i.test(html),
    'sin claves privadas ni tokens en el HTML',
  );

  // Enlaces internos: todos existen, salvo la excepción temporal de la política (E155-I01).
  const internal = [
    ...new Set(
      tags(mainHtml, 'a')
        .map((a) => a.href)
        .filter((h) => h?.startsWith('/')),
    ),
  ];
  const unresolved = internal.filter((h) => !routeExists(h) && !PENDING_ROUTES.includes(h));
  check(
    unresolved.length === 0,
    `enlaces internos existentes (${unresolved.join(', ') || 'todos'})`,
  );

  contact[lang] = { levels, channels: channelLinks.map((a) => a.href) };
}
check(same(contact.es?.levels, contact.en?.levels), 'Contacto: misma estructura de encabezados');
check(same(contact.es?.channels, contact.en?.channels), 'Contacto: mismos canales en /es/ y /en/');

// --- Función de envío (E140-I02, ADR-084): Worker solo para /api/*, política y redirección ---
console.log('\nFunción de envío /api/contacto');
const SRC = fileURLToPath(new URL('../src/', import.meta.url));
const srcText = (path) => readFileSync(join(SRC, path), 'utf8');
const workerEntry = srcText('worker/index.ts');
const workerContact = srcText('worker/contact.ts');
check(
  workerEntry.includes("'/api/contacto'") && workerEntry.includes('handleContact'),
  'src/worker/index.ts atiende /api/contacto',
);
check(
  /import \{ PRIVACY_POLICY_VERSION \} from '\.\.\/data\/privacy-policy\.ts'/.test(workerContact) &&
    !/PRIVACY_POLICY_VERSION\s*=/.test(workerContact),
  'el Worker importa PRIVACY_POLICY_VERSION y no la redefine (ADR-083)',
);
const versionDefinitions = [
  'data/privacy-policy.ts',
  'worker/contact.ts',
  'worker/index.ts',
  'scripts/contact.ts',
  'data/contact.ts',
].filter((path) => /PRIVACY_POLICY_VERSION\s*=/.test(srcText(path)));
check(
  same(versionDefinitions, ['data/privacy-policy.ts']),
  'una sola definición de la versión de la política',
);
check(
  /raw\.consentimiento !== true/.test(workerContact) &&
    /raw\.versionPolitica !== PRIVACY_POLICY_VERSION/.test(workerContact),
  'el Worker exige consentimiento y la versión vigente (ADR-035)',
);
check(
  workerContact.includes('challenges.cloudflare.com/turnstile/v0/siteverify'),
  'el Worker verifica Turnstile en el servidor',
);
check(
  !/(0x4AAAAAA[A-Za-z0-9_-]{6,}|Bearer [A-Za-z0-9]{20,}|secret\s*[:=]\s*['"][^'"]{8,})/.test(
    workerEntry + workerContact,
  ),
  'sin claves ni tokens escritos en el Worker',
);
check(!/console\.(log|error)\([^)]*fields\./.test(workerContact), 'los registros no usan campos');
check(!existsSync(join(DIST, 'functions')), 'dist/ no incluye functions/ de Pages');
// La página de agradecimiento (ruta interna) está en el mapa; la publicó E150-I01 (AT-099, ADR-086).
const routesSource = srcText('i18n/routes.ts');
for (const [lang, path] of Object.entries({ es: '/es/agradecimiento/', en: '/en/thank-you/' })) {
  check(
    routesSource.includes(`thankYou: { es: '/es/agradecimiento/', en: '/en/thank-you/' }`),
    `thankYou.${lang} = ${path} en el mapa de rutas`,
  );
  const formHtml = read(`${CONTACT_ROUTES[lang]}/index.html`);
  check(
    attrs(/<form[^>]*data-contact-form[^>]*>/.exec(formHtml)?.[0] ?? '')['data-thank-you'] === path,
    `el formulario /${lang}/ redirige a ${path} tras un envío correcto`,
  );
}

// --- Worker fuera de /api/* (E140-I03, ADR-085, AT-102): las rutas inexistentes van a los assets ---
console.log('\nWorker: rutas fuera de /api/*');
{
  const worker = (await import('../src/worker/index.ts')).default;
  const assetsCalls = [];
  const env = {
    ASSETS: {
      fetch: async (request) => {
        assetsCalls.push(new URL(request.url).pathname);
        return new Response('<!doctype html><title>404</title>', {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      },
    },
  };
  for (const path of ['/es/agradecimiento/', '/en/thank-you/', '/favicon.ico', '/es/no-existe/']) {
    const res = await worker.fetch(new Request(`https://site.dev${path}`), env);
    const type = res.headers.get('Content-Type') ?? '';
    check(
      assetsCalls.at(-1) === path && !type.includes('application/json'),
      `${path} lo responden los assets (no JSON)`,
    );
  }
  const apiRes = await worker.fetch(new Request('https://site.dev/api/otra'), env);
  check(
    apiRes.status === 404 &&
      (apiRes.headers.get('Content-Type') ?? '').includes('application/json') &&
      assetsCalls.length === 4,
    '/api/otra responde 404 JSON sin pasar por los assets',
  );
}

// --- Política de privacidad (E155-I01, ADR-035 y ADR-087): página, versión, pie y avisos ---
const PRIVACY_ROUTES = { es: 'es/privacidad', en: 'en/privacy' };
const PRIVACY_SECTIONS = [
  'responsable',
  'datos',
  'formulario',
  'turnstile',
  'agenda',
  'conversaciones',
  'navegador',
  'cambios',
];
// Cada tratamiento de ADR-035 debe nombrarse en la página (texto en minúsculas).
const PRIVACY_TERMS = [
  'turnstile',
  'calendly',
  'giscus',
  'github',
  'cloudflare',
  'theme',
  'perfil-hero',
  'rutas-progreso',
];
const PRIVACY_DISCLAIMER = { es: 'no constituye asesoría legal', en: 'not legal advice' };
const privacy = {};
for (const [lang, info] of Object.entries(LANGS)) {
  const route = PRIVACY_ROUTES[lang];
  const other = PRIVACY_ROUTES[info.other];
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
        ['x-default', `${SITE}/${PRIVACY_ROUTES.es}/`],
      ].sort(),
    ),
    'hreflang recíprocos con barra final y x-default → /es/',
  );
  check(meta('og:url') === canonical && meta('og:locale') === info.og, 'og:url y og:locale');
  check(
    meta('og:title') === title && meta('og:description') === description,
    'og:title y og:description = title y description',
  );
  check(!meta('robots'), 'indexable: sin metaetiqueta robots (ADR-087)');
  check(!head.includes('application/ld+json'), 'sin JSON-LD');

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
  const mainText = decode(mainHtml.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .toLowerCase();

  // Versión y vigencia visibles; la versión sale de la constante única (no se duplica).
  check(
    new RegExp(`<dd[^>]*data-policy-version[^>]*>${PRIVACY_POLICY_VERSION}</dd>`).test(mainHtml),
    `versión visible = constante (${PRIVACY_POLICY_VERSION})`,
  );
  check(
    mainHtml.includes(`<time datetime="${PRIVACY_POLICY_VERSION}"`),
    'fecha de vigencia visible con <time datetime>',
  );
  check(mainText.includes(PRIVACY_DISCLAIMER[lang]), 'declara que no es asesoría legal');

  // Índice con anclas: una por sección y cada una existe.
  const indexHtml = /<nav[^>]*class="index[^"]*"[\s\S]*?<\/nav>/.exec(mainHtml)?.[0] ?? '';
  const anchors = [...indexHtml.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  check(same(anchors, PRIVACY_SECTIONS), `índice con las ${PRIVACY_SECTIONS.length} secciones`);
  check(
    anchors.every((id) => new RegExp(`<section[^>]*id="${id}"`).test(mainHtml)),
    'cada ancla del índice tiene su sección',
  );
  const missing = PRIVACY_TERMS.filter((term) => !mainText.includes(term));
  check(
    missing.length === 0,
    `cubre los tratamientos de ADR-035 (${missing.join(', ') || 'todos'})`,
  );
  const externals = tags(mainHtml, 'a').filter((a) => a.href?.startsWith('https://'));
  check(
    externals.length > 0 &&
      externals.every((a) => a.target === '_blank' && /noopener/.test(a.rel ?? '')),
    'enlaces externos con rel="noopener noreferrer"',
  );
  check(
    tags(html, 'a').some((a) => a.hreflang === LANGS[info.other].code && a.href === `/${other}/`),
    'el selector de idioma lleva a la política del otro idioma',
  );
  privacy[lang] = { levels, anchors };
}
check(same(privacy.es?.levels, privacy.en?.levels), 'Privacidad: misma estructura de encabezados');
check(
  same(privacy.es?.anchors, privacy.en?.anchors),
  'Privacidad: mismas secciones en /es/ y /en/',
);

// La versión vive solo en la constante: no se repite en componentes, contenido ni páginas.
console.log('\nVersión única de la política');
{
  const literal = new RegExp(PRIVACY_POLICY_VERSION);
  const files = ['components', 'content', 'pages', 'worker', 'scripts'].flatMap((dir) =>
    readdirSync(join(SRC, dir), { recursive: true, withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => join(f.parentPath, f.name)),
  );
  const duplicated = files.filter((file) => literal.test(readFileSync(file, 'utf8')));
  check(
    duplicated.length === 0,
    `la versión no se repite fuera de la constante (${duplicated.length})`,
  );
}

// El pie de todas las páginas (también agradecimiento) enlaza a la política del idioma activo, la
// navbar no cambia y el aviso de Giscus del Foro y de Recursos la enlaza.
console.log('\nEnlace a la política (pie y avisos)');
{
  const pages = readdirSync(DIST, { recursive: true })
    .map((f) => String(f).replaceAll('\\', '/'))
    .filter((f) => /^(es|en)\/.*index\.html$/.test(f));
  const withoutFooterLink = [];
  const navbarWithLink = [];
  for (const file of pages) {
    const lang = file.startsWith('es/') ? 'es' : 'en';
    const html = read(file);
    // El pie del sitio es `<footer class="footer">`; las tarjetas de testimonio también usan <footer>.
    const footer = /<footer class="footer"[\s\S]*<\/footer>/.exec(html)?.[0] ?? '';
    const header = /<header[\s\S]*?<\/header>/.exec(html)?.[0] ?? '';
    const href = `/${PRIVACY_ROUTES[lang]}/`;
    if (!tags(footer, 'a').some((a) => a.href === href)) withoutFooterLink.push(file);
    if (tags(header, 'a').some((a) => a.href === href)) navbarWithLink.push(file);
  }
  check(pages.length >= 24, `páginas revisadas (${pages.length})`);
  check(
    withoutFooterLink.length === 0,
    `el pie enlaza a la política en todas las páginas (${withoutFooterLink.join(', ') || 'todas'})`,
  );
  check(navbarWithLink.length === 0, 'la navbar no enlaza a la política');
  for (const [lang, file] of [
    ['es', 'es/foro/index.html'],
    ['en', 'en/forum/index.html'],
    ['es', 'es/recursos/index.html'],
    ['en', 'en/resources/index.html'],
  ]) {
    const notice = /<p[^>]*data-forum-notice[\s\S]*?<\/p>/.exec(read(file))?.[0] ?? '';
    check(
      tags(notice, 'a').some((a) => a.href === `/${PRIVACY_ROUTES[lang]}/`),
      `/${file.replace('/index.html', '')}/: el aviso de Giscus enlaza a la política`,
    );
  }
  const routesText = srcText('i18n/routes.ts');
  check(
    routesText.indexOf('privacy:') < routesText.indexOf('export const internalRoutes'),
    'privacy está en `routes` (indexable) y no en `internalRoutes`',
  );
}

// --- Página 404 (E160-I01, ADR-088 y ADR-089): tres 404.html con el nombre que busca Cloudflare ---
console.log('\n404 (raíz, /es/ y /en/)');
{
  const NOT_FOUND = {
    root: {
      file: '404.html',
      code: 'es-CL',
      og: 'es_CL',
      h1: 'Página no encontrada',
      home: '/es/',
      contact: '/es/contacto/',
      switchTo: '/en/404/',
    },
    es: {
      file: 'es/404.html',
      code: 'es-CL',
      og: 'es_CL',
      h1: 'Página no encontrada',
      home: '/es/',
      contact: '/es/contacto/',
      switchTo: '/en/404/',
    },
    en: {
      file: 'en/404.html',
      code: 'en-US',
      og: 'en_US',
      h1: 'Page not found',
      home: '/en/',
      contact: '/en/contact/',
      switchTo: '/es/404/',
    },
  };
  const canonical404 = { root: `${SITE}/es/404/`, es: `${SITE}/es/404/`, en: `${SITE}/en/404/` };
  // Cloudflare solo reconoce archivos llamados exactamente 404.html (ADR-037): nada de carpetas.
  check(
    !existsSync(join(DIST, 'es/404')) && !existsSync(join(DIST, 'en/404')),
    'sin carpetas es/404 ni en/404 (las movió scripts/place-404.mjs)',
  );
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  check(
    /node scripts\/place-404\.mjs/.test(packageJson.scripts.build),
    'el script build ejecuta scripts/place-404.mjs',
  );
  const notFoundHtml = {};
  for (const [name, info] of Object.entries(NOT_FOUND)) {
    console.log(`  ${info.file}`);
    if (!existsSync(join(DIST, info.file))) {
      check(false, `existe dist/${info.file}`);
      continue;
    }
    const html = read(info.file);
    notFoundHtml[name] = html;
    const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
    const metas = tags(head, 'meta');
    const links = tags(head, 'link');
    const meta = (key) => metas.find((m) => m.name === key || m.property === key)?.content;
    const title = decode(/<title>([^<]*)<\/title>/.exec(head)?.[1] ?? '');
    const description = meta('description') ?? '';
    const other = name === 'en' ? 'es' : 'en';
    check(html.includes(`<html lang="${info.code}"`), `<html lang="${info.code}">`);
    check(title.length > 0 && title.length <= 70, `title de hasta 70 caracteres (${title.length})`);
    check(
      description.length >= 50 && description.length <= 170,
      `description de 50 a 170 caracteres (${description.length})`,
    );
    check(meta('robots') === 'noindex, follow', 'robots = noindex, follow');
    check(
      links.find((l) => l.rel === 'canonical')?.href === canonical404[name],
      `canonical = ${canonical404[name]}`,
    );
    check(
      same(
        links
          .filter((l) => l.rel === 'alternate' && l.hreflang)
          .map((l) => [l.hreflang, l.href])
          .sort(),
        [
          ['es-CL', `${SITE}/es/404/`],
          ['en-US', `${SITE}/en/404/`],
          ['x-default', `${SITE}/es/404/`],
        ].sort(),
      ),
      'hreflang recíprocos hacia /es/404/ y /en/404/ y x-default → /es/',
    );
    check(
      meta('og:url') === canonical404[name] && meta('og:locale') === info.og,
      'og:url y og:locale',
    );
    check(
      meta('og:title') === title && meta('og:description') === description,
      'og:title y og:description = title y description',
    );
    check((meta('og:image:alt') ?? '').length > 10, 'texto alternativo de la imagen OG');
    check(!head.includes('application/ld+json'), 'sin JSON-LD');
    const body = html.slice(html.indexOf('<body'));
    const count = (re) => (body.match(re) ?? []).length;
    check(count(/<main[\s>]/g) === 1 && count(/<h1[\s>]/g) === 1, 'un solo <main> y un solo <h1>');
    const mainHtml = body.slice(body.indexOf('<main'), body.indexOf('</main>'));
    check(
      new RegExp(`<h1[^>]*>${info.h1}</h1>`).test(mainHtml),
      `h1 = «${info.h1}» dentro del <main>`,
    );
    const buttons = tags(mainHtml, 'a').map((a) => a.href);
    check(same(buttons, [info.home, info.contact]), `botones → ${info.home} y ${info.contact}`);
    // AT-004: ninguna URL relativa, para que la 404 funcione a cualquier profundidad de ruta.
    const relative = [...html.matchAll(/\s(?:href|src)="([^"]*)"/g)]
      .map((m) => decode(m[1]))
      .filter((u) => u && !/^(\/|#|https?:|mailto:|data:)/.test(u));
    check(
      relative.length === 0,
      `todas las URL son absolutas (${relative.join(', ') || 'ninguna relativa'})`,
    );
    const stylesheets = tags(html, 'link').filter((l) => l.rel === 'stylesheet');
    check(
      stylesheets.every((l) => l.href.startsWith('/')) &&
        (/<style/.test(html) || stylesheets.length > 0),
      'estilos por ruta absoluta o en línea',
    );
    // AT-003: el logotipo es el mismo componente y su script anima.
    check(
      /data-typewriter=/.test(html),
      'el logotipo lleva su máquina de escribir (data-typewriter)',
    );
    check(
      tags(html, 'script').some((s) => /Logo\.astro_astro_type_script/.test(s.src ?? '')),
      'carga el script del logotipo',
    );
    const footer = /<footer class="footer"[\s\S]*<\/footer>/.exec(html)?.[0] ?? '';
    const privacyHref = `/${PRIVACY_ROUTES[name === 'en' ? 'en' : 'es']}/`;
    check(
      tags(footer, 'a').some((a) => a.href === privacyHref),
      `el pie enlaza a ${privacyHref}`,
    );
    check(
      tags(html, 'a').some(
        (a) =>
          a.hreflang === NOT_FOUND[other === 'es' ? 'es' : 'en'].code && a.href === info.switchTo,
      ),
      `el selector de idioma lleva a ${info.switchTo}`,
    );
  }
  // La 404 raíz y la de /es/ son la misma página; la de /en/ difiere solo en el idioma.
  check(
    notFoundHtml.root !== undefined &&
      notFoundHtml.es !== undefined &&
      notFoundHtml.root === notFoundHtml.es,
    '404 raíz = 404 de /es/ (misma página en español)',
  );
  const routesText404 = srcText('i18n/routes.ts');
  check(
    routesText404.indexOf('notFound:') > routesText404.indexOf('export const internalRoutes') &&
      routesText404.includes("notFound: { es: '/es/404/', en: '/en/404/' }"),
    'notFound está en `internalRoutes` (fuera del sitemap)',
  );
}

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
