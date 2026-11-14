/*
 * Paridad es-CL / en-US sobre `dist/` (E170-I04, ADR-001). Sin red y sin dependencias.
 * Corre con `pnpm build && pnpm check:i18n`. Falla (código 1) si una ruta existe en un idioma
 * y no en el otro. Toma el mapa de rutas equivalentes de `src/i18n/routes.ts` (ADR-020, ADR-035)
 * leyendo el texto del archivo, porque ese módulo no se puede importar directo desde Node.
 *
 * Por cada par del mapa comprueba:
 *   - existen las dos páginas en `dist/` (la 404 de cada idioma se publica como `<idioma>/404.html`);
 *   - `<html lang>`, `canonical`, `hreflang` (es-CL, en-US y x-default → /es/) y `og:locale`;
 *   - el selector de idioma (`a[hreflang]`) lleva a la página equivalente;
 *   - la misma cantidad de `<h1>`, `<h2>` y `<h3>` en ambos idiomas.
 * Y al revés: no queda en `dist/` ninguna página de idioma fuera del mapa.
 * `DIST_DIR=<carpeta>` apunta a otra copia del build (para probar un caso roto).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE, listHtml, readMarkup, tagsOf } from './lib/dist-html.mjs';

const ROUTES_FILE = fileURLToPath(new URL('../src/i18n/routes.ts', import.meta.url));
/** Pares esperados: 11 páginas indexables + Muestra de diseño + Agradecimiento (sin Eventos, ADR-077); la 404 va aparte. */
const EXPECTED_PAIRS = 13;
const LANGS = {
  es: { code: 'es-CL', og: 'es_CL', other: 'en' },
  en: { code: 'en-US', og: 'en_US', other: 'es' },
};

let checks = 0;
const failures = [];
const check = (ok, message) => {
  checks += 1;
  if (!ok) failures.push(message);
};

// 1. Mapa de rutas (texto de routes.ts): { clave: { es, en } }
const source = readFileSync(ROUTES_FILE, 'utf8');
const pairs = [...source.matchAll(/(\w+):\s*\{\s*es:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)].map(
  ([, key, es, en]) => ({ key, es, en }),
);
const notFound = pairs.find((p) => p.key === 'notFound');
const pagePairs = pairs.filter((p) => p.key !== 'notFound');
check(
  pagePairs.length === EXPECTED_PAIRS,
  `el mapa de rutas tiene ${pagePairs.length} pares de páginas y se esperaban ${EXPECTED_PAIRS}`,
);
check(Boolean(notFound), 'el mapa de rutas no tiene el par `notFound` (404)');
const privacy = pairs.find((p) => p.key === 'privacy');
check(
  privacy?.es === '/es/privacidad/' && privacy?.en === '/en/privacy/',
  'el par de privacidad debe ser /es/privacidad/ ↔ /en/privacy/ (ADR-035)',
);

/** Archivo de `dist/` que sirve una ruta del mapa. */
const fileOf = (route) =>
  /\/404\/$/.test(route) ? `${route.slice(1, -1)}.html` : `${route.slice(1)}index.html`;

const dist = new Set(listHtml());
const countHeadings = (markup, level) => tagsOf(markup, `h${level}`).length;

for (const pair of [...pagePairs, ...(notFound ? [notFound] : [])]) {
  const files = { es: fileOf(pair.es), en: fileOf(pair.en) };
  const present = { es: dist.has(files.es), en: dist.has(files.en) };
  check(present.es, `${pair.key}: falta ${files.es} (existe solo en en-US)`);
  check(present.en, `${pair.key}: falta ${files.en} (existe solo en es-CL)`);
  if (!present.es || !present.en) continue;

  const markups = { es: readMarkup(files.es), en: readMarkup(files.en) };
  for (const [lang, info] of Object.entries(LANGS)) {
    const own = pair[lang];
    const other = pair[info.other];
    const markup = markups[lang];
    const where = `${pair.key} (${lang})`;
    const html = tagsOf(markup, 'html')[0] ?? {};
    check(
      html.lang === info.code,
      `${where}: <html lang="${html.lang}"> y debía ser «${info.code}»`,
    );

    const links = tagsOf(markup, 'link');
    const canonical = links.find((l) => l.rel === 'canonical')?.href;
    check(
      canonical === `${SITE}${own}`,
      `${where}: canonical «${canonical}» y debía ser ${SITE}${own}`,
    );
    const alt = (hreflang) =>
      links.find((l) => l.rel === 'alternate' && l.hreflang === hreflang)?.href;
    check(alt('es-CL') === `${SITE}${pair.es}`, `${where}: hreflang es-CL «${alt('es-CL')}»`);
    check(alt('en-US') === `${SITE}${pair.en}`, `${where}: hreflang en-US «${alt('en-US')}»`);
    check(
      alt('x-default') === `${SITE}${pair.es}`,
      `${where}: hreflang x-default «${alt('x-default')}»`,
    );

    const metas = tagsOf(markup, 'meta');
    const og = (property) => metas.filter((m) => m.property === property).map((m) => m.content);
    check(og('og:locale')[0] === info.og, `${where}: og:locale «${og('og:locale')[0]}»`);
    check(
      og('og:locale:alternate').includes(LANGS[info.other].og),
      `${where}: falta og:locale:alternate ${LANGS[info.other].og}`,
    );

    const switchers = tagsOf(markup, 'a').filter((a) => a.hreflang);
    check(switchers.length > 0, `${where}: no tiene selector de idioma (a[hreflang])`);
    check(
      switchers.every((a) => a.href === other && a.hreflang === LANGS[info.other].code),
      `${where}: el selector de idioma no lleva a ${other} (${switchers.map((a) => a.href).join(', ')})`,
    );
  }

  for (const level of [1, 2, 3]) {
    const counts = { es: countHeadings(markups.es, level), en: countHeadings(markups.en, level) };
    check(
      counts.es === counts.en,
      `${pair.key}: <h${level}> distintos (es ${counts.es} · en ${counts.en})`,
    );
  }
}

// 2. Al revés: ninguna página de idioma en `dist/` fuera del mapa.
const mapped = new Set(pairs.flatMap((p) => [fileOf(p.es), fileOf(p.en)]));
for (const file of dist) {
  if (file === 'index.html' || file === '404.html') continue; // raíz: redirección y 404 sin idioma
  check(mapped.has(file), `${file} está en dist/ y no figura en el mapa de rutas (¿falta su par?)`);
}
const count = (lang) => [...dist].filter((f) => f.startsWith(`${lang}/`)).length;
check(
  count('es') === count('en'),
  `páginas es-CL (${count('es')}) y en-US (${count('en')}) no coinciden`,
);

// Informe
console.log(
  `Mapa de rutas: ${pagePairs.length} pares de páginas + 404 → ${pagePairs.length * 2} páginas`,
);
console.log(`Páginas en dist/ por idioma: es ${count('es')} · en ${count('en')} (con 404)`);
console.log(`Par de privacidad: ${privacy?.es} ↔ ${privacy?.en}`);
console.log(`${checks} comprobaciones`);
if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} falla(s) de paridad:`);
  for (const message of failures) console.error(`  ✗ ${message}`);
  process.exit(1);
}
console.log('✓ Paridad es-CL / en-US correcta.');
