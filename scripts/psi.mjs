/*
 * Mide la categoría de accesibilidad con la API de PageSpeed Insights (E170-I01).
 *
 * - Sin dependencias: usa `fetch` nativo de Node.
 * - La clave se lee SOLO de `process.env.PSI_API_KEY`. Nunca se acepta por argumento, nunca se
 *   imprime y nunca se escribe en un archivo. Si falta, el script se detiene.
 * - Mide 26 URL en móvil y escritorio: las 22 páginas indexables (se leen de `routes` en
 *   `src/i18n/routes.ts`), Agradecimiento ×2 y las 404 de idioma sin barra final (AT-109).
 *
 * Uso:
 *   node scripts/psi.mjs                         # mide la preview de workers.dev
 *   node scripts/psi.mjs --base https://otro.host
 *   node scripts/psi.mjs --category performance  # rendimiento: puntaje, LCP, CLS, TBT y peso
 *   node scripts/psi.mjs --only /es/foro/,/en/forum/
 *   node scripts/psi.mjs --json resultados.json  # además guarda el detalle (sin la clave)
 */
import { readFile, writeFile } from 'node:fs/promises';

const DEFAULT_BASE = 'https://felipecuevas-dev.felipe-cuevas.workers.dev';
const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const STRATEGIES = ['mobile', 'desktop'];
const CONCURRENCY = 3;
const MIN_SCORE = 96; // Criterio de E170-I01.

const key = process.env.PSI_API_KEY;
if (!key) {
  console.error(
    [
      'Falta la variable de entorno PSI_API_KEY. El script se detiene.',
      '',
      'Cómo definirla en tu sesión de PowerShell, sin dejar la clave en el historial:',
      "  $sec = Read-Host 'PSI_API_KEY' -AsSecureString",
      '  $env:PSI_API_KEY = [System.Net.NetworkCredential]::new("", $sec).Password',
      '',
      'La variable vive solo en esa ventana: inicia Claude Code desde la misma ventana (o reinícialo',
      'ahí) para que este proceso la herede. Para crear la clave: Google Cloud Console → habilita',
      '"PageSpeed Insights API" → Credenciales → Crear clave de API.',
    ].join('\n'),
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

// Categoría a medir: `accessibility` (por defecto) o `performance` (E170-I02).
const category = option('--category') ?? 'accessibility';
if (!['accessibility', 'performance'].includes(category)) {
  console.error('--category debe ser accessibility o performance');
  process.exit(1);
}
const base = (option('--base') ?? DEFAULT_BASE).replace(/\/$/, '');
const jsonOut = option('--json');
const only = option('--only')
  ?.split(',')
  .map((p) => p.trim())
  .filter(Boolean);

/** Rutas indexables: se leen del mapa para no desfasarse (bloque `routes`, sin `internalRoutes`). */
async function indexablePaths() {
  const source = await readFile(new URL('../src/i18n/routes.ts', import.meta.url), 'utf8');
  const block = source.match(/export const routes = \{([\s\S]*?)\} as const/)?.[1] ?? '';
  const paths = [...block.matchAll(/es: '([^']+)', en: '([^']+)'/g)].flatMap((m) => [m[1], m[2]]);
  if (paths.length !== 22)
    throw new Error(`Se esperaban 22 rutas indexables y hay ${paths.length}`);
  return paths;
}

const extras = ['/es/agradecimiento/', '/en/thank-you/', '/es/404', '/en/404'];
const paths = only ?? [...(await indexablePaths()), ...extras];

async function measure(path, strategy, attempt = 1) {
  const url = new URL(API);
  url.searchParams.set('url', base + path);
  url.searchParams.set('category', category);
  url.searchParams.set('strategy', strategy);
  url.searchParams.set('key', key);
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(150_000) });
    if (!res.ok) {
      // No se imprime la URL (lleva la clave) ni el cuerpo completo.
      if ((res.status === 429 || res.status >= 500) && attempt < 3) {
        await new Promise((r) => setTimeout(r, 4000 * attempt));
        return measure(path, strategy, attempt + 1);
      }
      return { path, strategy, error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    const lh = data.lighthouseResult;
    if (lh?.runtimeError) return { path, strategy, error: lh.runtimeError.code };
    const score = Math.round((lh?.categories?.[category]?.score ?? 0) * 100);
    const metric = (id) => lh?.audits?.[id]?.numericValue;
    const metrics =
      category === 'performance'
        ? {
            lcp: metric('largest-contentful-paint'),
            cls: metric('cumulative-layout-shift'),
            tbt: metric('total-blocking-time'),
            bytes: metric('total-byte-weight'),
          }
        : undefined;
    const failed = Object.values(lh?.audits ?? {})
      .filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative')
      .map((a) => ({
        id: a.id,
        title: a.title,
        items: (a.details?.items ?? []).slice(0, 8).map((i) => ({
          selector: i.node?.selector,
          snippet: i.node?.snippet?.slice(0, 160),
          explanation: i.node?.explanation?.slice(0, 300),
        })),
      }));
    return {
      path,
      strategy,
      score,
      metrics,
      failed,
      finalUrl: lh?.finalDisplayedUrl?.replace(base, ''),
    };
  } catch (error) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 4000 * attempt));
      return measure(path, strategy, attempt + 1);
    }
    return { path, strategy, error: error?.name ?? 'Error de red' };
  }
}

const jobs = paths.flatMap((path) => STRATEGIES.map((strategy) => ({ path, strategy })));
const results = [];
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      const result = await measure(job.path, job.strategy);
      results.push(result);
      console.error(`[${results.length}/${jobs.length}] ${job.strategy.padEnd(7)} ${job.path}`);
    }
  }),
);

// Tabla: una fila por página.
const byPath = new Map(paths.map((p) => [p, {}]));
for (const r of results) byPath.get(r.path)[r.strategy] = r;
const cell = (r) => (r ? (r.error ? `ERR ${r.error}` : String(r.score)) : '—');
const pad = (s, n) => String(s).padEnd(n);
const width = Math.max(...paths.map((p) => p.length)) + 2;

console.log(
  `\n${category === 'performance' ? 'Rendimiento' : 'Accesibilidad'} (PageSpeed Insights) · ${base}\n`,
);
console.log(`${pad('Página', width)}${pad('Móvil', 10)}${pad('Escritorio', 12)}Fallas`);
for (const [path, r] of byPath) {
  const ids = [
    ...new Set([...(r.mobile?.failed ?? []), ...(r.desktop?.failed ?? [])].map((a) => a.id)),
  ];
  console.log(
    `${pad(path, width)}${pad(cell(r.mobile), 10)}${pad(cell(r.desktop), 12)}${ids.join(', ')}`,
  );
}

const scored = results.filter((r) => !r.error);
const below = scored.filter((r) => r.score < MIN_SCORE);
const errors = results.filter((r) => r.error);
console.log(
  `\nMediciones: ${scored.length}/${results.length} · mínimo ${Math.min(...scored.map((r) => r.score))} · bajo ${MIN_SCORE}: ${below.length} · con error: ${errors.length}`,
);

if (jsonOut) {
  await writeFile(
    jsonOut,
    JSON.stringify({ base, date: new Date().toISOString(), results }, null, 2),
  );
  console.log(`Detalle guardado en ${jsonOut}`);
}
process.exit(below.length || errors.length ? 2 : 0);
