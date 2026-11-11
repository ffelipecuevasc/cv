// Deja las 404 de idioma con el nombre que busca Cloudflare (E160-I01, ADR-089).
// Con el `build.format` por defecto, Astro genera `dist/es/404/index.html` y `dist/en/404/index.html`,
// pero `assets.not_found_handling: "404-page"` solo reconoce archivos llamados exactamente
// `404.html` (ADR-037). Este script mueve cada uno a `dist/<idioma>/404.html` y borra la carpeta
// vacía. La 404 de la raíz ya sale como `dist/404.html`.
// Se ejecuta después de `astro build` (ver el script `build` de package.json). Sin dependencias.
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const LANGS = ['es', 'en'];

if (!existsSync(join(DIST, '404.html'))) {
  console.error('place-404: falta dist/404.html (la 404 de la raíz).');
  process.exit(1);
}

for (const lang of LANGS) {
  const folder = join(DIST, lang, '404');
  const source = join(folder, 'index.html');
  const target = join(DIST, lang, '404.html');
  if (!existsSync(source)) {
    console.error(`place-404: falta ${source}`);
    process.exit(1);
  }
  mkdirSync(join(DIST, lang), { recursive: true });
  renameSync(source, target);
  // La carpeta debe quedar vacía; si no, algo más la usa y no se borra.
  if (readdirSync(folder).length === 0) rmSync(folder, { recursive: true });
  console.log(`place-404: dist/${lang}/404/index.html → dist/${lang}/404.html`);
}
