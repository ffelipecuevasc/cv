/*
 * Utilidades comunes de `verify-links.mjs` y `check-i18n.mjs` (E170-I04). Sin dependencias.
 * Lee los .html de `dist/` (o de la carpeta de `DIST_DIR`, útil para probar con un caso roto).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE = 'https://felipecuevas.dev';
export const DIST = process.env.DIST_DIR
  ? resolve(process.env.DIST_DIR)
  : fileURLToPath(new URL('../../dist/', import.meta.url));

export const decode = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

/** Rutas (con `/`) de todos los .html bajo `dist/`, relativas a `dist/`. */
export const listHtml = (dir = DIST) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listHtml(full);
    return entry.name.endsWith('.html') ? [relative(DIST, full).split(sep).join('/')] : [];
  });

/** HTML sin el contenido de `<script>`, `<style>` ni comentarios (no contienen enlaces reales). */
export const readMarkup = (file) =>
  readFileSync(join(DIST, file), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => m.slice(0, m.indexOf('>') + 1));

/** Atributos de una etiqueta como objeto (nombres en minúscula, valores decodificados). */
export const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:="([^"]*)"|='([^']*)'|=([^\s>"']+))?/g)]
      .slice(1)
      .map(([, key, dq, sq, bare]) => [key.toLowerCase(), decode(dq ?? sq ?? bare ?? '')]),
  );

/** Todas las etiquetas de apertura con ese nombre, ya convertidas a objeto de atributos. */
export const tagsOf = (markup, name) =>
  [...markup.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => attrs(m[0]));

/** URL pública (con barra final) de una página de `dist/`: `es/x/index.html` → `/es/x/`. */
export const pageUrl = (file) => {
  if (file === 'index.html') return '/';
  if (file.endsWith('/index.html')) return `/${file.slice(0, -'index.html'.length)}`;
  return `/${file}`;
};
