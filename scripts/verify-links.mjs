/*
 * Verificación de enlaces sobre `dist/` (E170-I04). Sin red y sin dependencias (decisión de
 * Felipe, 13-11-2026: reemplaza a linkinator del sitio antiguo). Corre con `pnpm build && pnpm verify`.
 *
 * Lee cada .html de `dist/` y valida los enlaces internos de href, src, srcset, action, poster,
 * canonical, hreflang, og:image / og:url y la redirección `meta refresh`:
 *   - el archivo de destino existe en `dist/` (`/ruta/` → `ruta/index.html`);
 *   - la ruta de página termina en barra, sin `.html` (ADR-047, AT-005);
 *   - el ancla `#id` existe en la página de destino.
 * Los enlaces externos NO se consultan por red: solo se listan y se valida su formato (URL válida,
 * https). Sale con código 1 si hay roturas. `DIST_DIR=<carpeta>` apunta a otra copia del build
 * (sirve para probar un caso roto sin tocar `dist/`).
 */
import { existsSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { DIST, SITE, decode, listHtml, pageUrl, readMarkup, tagsOf } from './lib/dist-html.mjs';

/** Atributos que llevan una URL por etiqueta. `meta` se trata aparte (content). */
const URL_ATTRS = {
  a: ['href'],
  area: ['href'],
  link: ['href'],
  script: ['src'],
  img: ['src'],
  source: ['src'],
  iframe: ['src'],
  video: ['src', 'poster'],
  audio: ['src'],
  form: ['action'],
  use: ['href', 'xlink:href'],
  object: ['data'],
};
const SRCSET_TAGS = ['img', 'source'];
const META_URLS = ['og:image', 'og:url', 'og:image:url', 'twitter:image', 'twitter:url'];
/** Esquemas que no son enlaces de página ni de archivo: no se resuelven. */
const SKIP = /^(mailto:|tel:|sms:|data:|blob:|#?$)/i;

/** URL virtuales de las páginas 404: Cloudflare sirve 404.html en cualquier ruta inexistente (ADR-037, ADR-088). */
const VIRTUAL = { '/404/': '404.html', '/es/404/': 'es/404.html', '/en/404/': 'en/404.html' };
/** Rutas que atiende el Worker y no son archivos de dist/ (
un_worker_first, ADR-084). */
const WORKER_PREFIX = '/api/';

const failures = [];
const fail = (file, message) => failures.push(`${file}: ${message}`);

const pages = listHtml().sort();
const idCache = new Map();
const idsOf = (file) => {
  if (!idCache.has(file)) {
    const markup = readMarkup(file);
    const ids = new Set(tagsOf(markup, '[a-zA-Z][-\\w:]*').flatMap((a) => [a.id, a.name]));
    ids.delete(undefined);
    ids.delete('');
    idCache.set(file, ids);
  }
  return idCache.get(file);
};

/** Archivo de `dist/` al que apunta una ruta, o `null` si no corresponde a uno (con el motivo). */
const targetFile = (pathname) => {
  if (VIRTUAL[pathname]) return { file: VIRTUAL[pathname] };
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return { error: 'ruta con codificación inválida' };
  }
  const last = decoded.split('/').pop();
  let rel;
  if (decoded.endsWith('/')) rel = `${decoded.slice(1)}index.html`;
  else if (last.includes('.')) rel = decoded.slice(1);
  else return { error: 'ruta sin barra final ni extensión (ADR-047)' };
  if (/\.html$/.test(rel) && !decoded.endsWith('/')) {
    return { error: 'enlace a una página con .html (AT-005)' };
  }
  const full = resolve(DIST, rel);
  if (!full.startsWith(resolve(DIST) + sep)) return { error: 'ruta fuera de dist/' };
  if (!existsSync(full) || !statSync(full).isFile())
    return { error: 'el archivo no existe en dist/' };
  return { file: rel };
};

const workerRoutes = new Set();
const external = new Map(); // url → Set de páginas
let internalCount = 0;
let anchorCount = 0;
const internalTargets = new Set();

const checkUrl = (page, raw, where) => {
  const value = raw.trim();
  if (SKIP.test(value)) return;
  if (value.startsWith('#')) {
    // Ancla de la propia página: se valida contra su propio archivo.
    anchorCount += 1;
    const id = decodeURIComponent(value.slice(1));
    if (id.toLowerCase() !== 'top' && !idsOf(page).has(id)) {
      fail(page, `${where}: «${value}» → el ancla #${id} no existe en la página`);
    }
    return;
  }
  if (/^javascript:/i.test(value)) return fail(page, `${where}: enlace javascript:`);
  let url;
  try {
    url = new URL(value, `${SITE}${pageUrl(page)}`);
  } catch {
    return fail(page, `${where}: URL con formato inválido «${value}»`);
  }
  if (!/^https?:$/.test(url.protocol))
    return fail(page, `${where}: esquema no admitido «${value}»`);
  if (url.origin !== SITE) {
    if (url.protocol !== 'https:') fail(page, `${where}: enlace externo sin https «${value}»`);
    if (!url.hostname.includes('.')) fail(page, `${where}: dominio externo sin punto «${value}»`);
    if (!external.has(url.href)) external.set(url.href, new Set());
    external.get(url.href).add(page);
    return;
  }
  internalCount += 1;
  if (url.pathname.startsWith(WORKER_PREFIX)) {
    workerRoutes.add(url.pathname);
    return;
  }
  const target = targetFile(url.pathname);
  if (target.error) return fail(page, `${where}: «${value}» → ${target.error}`);
  internalTargets.add(target.file);
  const fragment = decodeURIComponent(url.hash.slice(1));
  if (fragment && fragment.toLowerCase() !== 'top' && target.file.endsWith('.html')) {
    anchorCount += 1;
    if (!idsOf(target.file).has(fragment)) {
      fail(page, `${where}: «${value}» → el ancla #${fragment} no existe en ${target.file}`);
    }
  }
};

const srcsetUrls = (srcset) =>
  srcset
    .split(',')
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean);

for (const page of pages) {
  const markup = readMarkup(page);
  for (const [tag, names] of Object.entries(URL_ATTRS)) {
    for (const a of tagsOf(markup, tag)) {
      for (const name of names) {
        if (a[name] === undefined) continue;
        checkUrl(page, a[name], `<${tag} ${name}>`);
      }
      if (SRCSET_TAGS.includes(tag) && a.srcset) {
        for (const u of srcsetUrls(a.srcset)) checkUrl(page, u, `<${tag} srcset>`);
      }
    }
  }
  for (const m of tagsOf(markup, 'meta')) {
    const key = m.property ?? m.name;
    if (META_URLS.includes(key) && m.content) checkUrl(page, m.content, `<meta ${key}>`);
    if (m['http-equiv']?.toLowerCase() === 'refresh') {
      const target = /url=(.+)$/i.exec(m.content ?? '')?.[1];
      if (target) checkUrl(page, target, '<meta refresh>');
    }
  }
}

// Informe
console.log(`Páginas .html revisadas: ${pages.length}`);
console.log(
  `Enlaces internos validados: ${internalCount} (${internalTargets.size} destinos, ${anchorCount} con ancla)`,
);
const hosts = new Map();
for (const url of external.keys()) {
  const host = new URL(url).host;
  hosts.set(host, (hosts.get(host) ?? 0) + 1);
}
if (workerRoutes.size > 0) {
  console.log(`Rutas del Worker (no son archivos): ${[...workerRoutes].join(', ')}`);
}
console.log(
  `Enlaces externos (sin consulta de red): ${external.size} únicos en ${hosts.size} dominios`,
);
for (const [host, count] of [...hosts].sort()) console.log(`  · ${host} (${count})`);
for (const [url, from] of [...external].sort()) {
  console.log(
    `    ${url}  ← ${[...from].slice(0, 3).join(', ')}${from.size > 3 ? ` y ${from.size - 3} más` : ''}`,
  );
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} enlace(s) roto(s):`);
  for (const message of failures) console.error(`  ✗ ${decode(message)}`);
  process.exit(1);
}
console.log('\n✓ Enlaces internos sin roturas.');
