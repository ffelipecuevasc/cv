/*
 * Redirecciones 301 del sitio antiguo (E180-I01, ADR-019, ADR-020, ADR-077, AT-005, AT-031, AT-043).
 * Sin dependencias: solo `fetch` nativo de Node. Hace dos cosas:
 *
 *   1. Revisa el archivo `_redirects` (por defecto `public/_redirects`, que crea Felipe, ADR-033):
 *      sintaxis, código 301 explícito, límites de Cloudflare (2.000 reglas estáticas, 100 dinámicas,
 *      1.000 caracteres por regla), reglas estáticas sin duplicados, destinos con barra final que
 *      existen en `dist/`, ninguna cadena (un destino nunca es el origen de otra regla), y que el
 *      conjunto de reglas sea exactamente el del mapa esperado (derivado de `src/i18n/routes.ts`).
 *   2. Con `--base <url>` pide cada URL antigua a esa base (por ejemplo la preview de workers.dev)
 *      SIN seguir redirecciones y comprueba: estado 301, `Location` igual al destino esperado, que el
 *      destino responda 200 (un solo salto), que `/eventos` y `/eventos.html` respondan 404 sin
 *      `Location` (ADR-077) y que los archivos de `public/static/` respondan 200 en la misma ruta,
 *      sin redirección y con el mismo peso (AT-043).
 *
 * Uso:
 *   pnpm build && pnpm check:redirects                       (solo el archivo)
 *   pnpm check:redirects --base https://<preview>.workers.dev (archivo y red)
 *   pnpm check:redirects --file ruta/_redirects --sin-red
 *   pnpm check:redirects --print                              (imprime el bloque esperado)
 * `DIST_DIR=<carpeta>` apunta a otra copia del build. Código de salida 1 si algo falla.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DIST } from './lib/dist-html.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const ROUTES_FILE = join(ROOT, 'src/i18n/routes.ts');
const PUBLIC_STATIC = join(ROOT, 'public/static');

/** Límites de Cloudflare para `_redirects` (verificado en su documentación el 14-11-2026). */
const MAX_STATIC = 2000;
const MAX_DYNAMIC = 100;
const MAX_LINE = 1000;

/** Páginas del sitio antiguo: nombre de la URL y clave del mapa de rutas (`routes` o `internalRoutes`). */
const OLD_PAGES = [
  ['educacion', 'education'],
  ['experiencia', 'experience'],
  ['desarrollador', 'developer'],
  ['docente', 'lecturer'],
  ['instructor', 'instructor'],
  ['talento-digital', 'talentoDigital'],
  ['foro', 'forum'],
  ['recursos', 'resources'],
  ['contacto', 'contact'],
  ['agradecimiento', 'thankYou'],
];
/** `/comunidad` salió del sitio, pero `main` la redirigía a `/foro` (AT-031): va directo a `/es/foro/`. */
const OLD_ALIASES = [
  ['comunidad', 'forum'],
  ['comunidad.html', 'forum'],
];
/** `/index.html` es la variante .html de `/`; `/` en sí es de E180-I03 y aquí no se toca. */
const INDEX_HTML = ['index.html', 'home'];
/** Sin redirección: responden 404 (ADR-077). */
const GONE = ['/eventos', '/eventos.html'];
/** Orígenes que nunca pueden tener regla: taparían páginas reales o archivos públicos. */
const FORBIDDEN_PREFIXES = ['/eventos', '/static/', '/es/', '/en/', '/api/', '/_astro/'];
/** URL antiguas sin regla que solo se informan (no fallan): vista previa social de `main` y barra final. */
const INFO_ONLY = ['/static/img/felipe_cuevas_cv.png', '/educacion/'];

// ---------------------------------------------------------------------------------------------
// Argumentos
// ---------------------------------------------------------------------------------------------
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const at = args.indexOf(name);
  return at >= 0 ? args[at + 1] : undefined;
};
const BASE = option('--base') ?? process.env.REDIRECTS_BASE;
const FILE = option('--file') ?? join(ROOT, 'public/_redirects');
const SKIP_NETWORK = flag('--sin-red');

// ---------------------------------------------------------------------------------------------
// Mapa esperado (a partir de `routes.ts`, leído como texto: ese módulo no se importa desde Node)
// ---------------------------------------------------------------------------------------------
const routesSource = readFileSync(ROUTES_FILE, 'utf8');
const esRoute = Object.fromEntries(
  [...routesSource.matchAll(/(\w+):\s*\{\s*es:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}/g)].map(
    ([, key, es]) => [key, es],
  ),
);

/** Reglas esperadas: { from, to }. 23 en total: 10 páginas × 2, 2 de comunidad y `/index.html`. */
const buildExpected = () => {
  const rules = [];
  const add = (name, key) => {
    const to = esRoute[key];
    if (!to) throw new Error(`routes.ts no tiene la clave "${key}"`);
    rules.push({ from: `/${name}`, to });
  };
  for (const [slug, key] of OLD_PAGES) {
    add(slug, key);
    add(`${slug}.html`, key);
  }
  for (const [name, key] of OLD_ALIASES) add(name, key);
  add(...INDEX_HTML);
  return rules;
};
const expected = buildExpected();
const expectedKey = (rule) => `${rule.from} ${rule.to}`;

const renderBlock = () => expected.map((rule) => `${rule.from} ${rule.to} 301`).join('\n');

if (flag('--print')) {
  console.log(renderBlock());
  process.exit(0);
}

// ---------------------------------------------------------------------------------------------
// Contadores
// ---------------------------------------------------------------------------------------------
let checks = 0;
const failures = [];
const check = (ok, message) => {
  checks += 1;
  if (!ok) failures.push(message);
};
const section = (title) => console.log(`\n${title}`);

// ---------------------------------------------------------------------------------------------
// 1. Archivo `_redirects`
// ---------------------------------------------------------------------------------------------
/** Convierte el texto del archivo en reglas con su número de línea. */
const parseRedirects = (text) =>
  text.split(/\r?\n/).flatMap((raw, index) => {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) return [];
    return [{ line: index + 1, raw, tokens: line.split(/\s+/) }];
  });

const lintFile = (file) => {
  section(`Archivo ${relative(ROOT, file).split(sep).join('/')}`);
  if (!existsSync(file)) {
    check(false, `no existe ${file}: lo crea Felipe con el bloque de la bitácora (ADR-033)`);
    return;
  }
  const text = readFileSync(file, 'utf8');
  const rules = parseRedirects(text);
  check(rules.length > 0, '_redirects no tiene reglas');

  const isDynamic = (source) => /[*:]/.test(source);
  const statics = rules.filter((r) => !isDynamic(r.tokens[0]));
  const dynamics = rules.filter((r) => isDynamic(r.tokens[0]));
  check(statics.length <= MAX_STATIC, `${statics.length} reglas estáticas (máximo ${MAX_STATIC})`);
  check(
    dynamics.length <= MAX_DYNAMIC,
    `${dynamics.length} reglas dinámicas (máximo ${MAX_DYNAMIC})`,
  );
  check(
    dynamics.length === 0,
    `hay reglas dinámicas (comodines o marcadores): ${dynamics.map((r) => `línea ${r.line}`).join(', ')}`,
  );

  const seen = new Map();
  const sources = new Set(rules.map((r) => r.tokens[0]));
  for (const rule of rules) {
    const where = `línea ${rule.line}`;
    const [source, destination, code, ...rest] = rule.tokens;
    check(
      rule.raw.length <= MAX_LINE,
      `${where}: ${rule.raw.length} caracteres (máximo ${MAX_LINE})`,
    );
    check(
      rule.tokens.length === 3 && rest.length === 0,
      `${where}: debe tener origen, destino y código (tiene ${rule.tokens.length} campos)`,
    );
    check(
      code === '301',
      `${where}: el código debe ser 301 explícito (sin código Cloudflare usa 302)`,
    );
    check(source?.startsWith('/'), `${where}: el origen debe empezar con "/"`);
    check(
      destination?.startsWith('/') && !/^\/\//.test(destination),
      `${where}: el destino debe ser una ruta interna`,
    );
    check(
      destination?.endsWith('/'),
      `${where}: el destino ${destination} debe terminar en "/" (si no, suma otro salto 307)`,
    );
    check(
      !seen.has(source),
      `${where}: el origen ${source} está repetido (ya estaba en la línea ${seen.get(source)})`,
    );
    seen.set(source, rule.line);
    check(source !== destination, `${where}: el origen y el destino son iguales`);
    check(
      !sources.has(destination),
      `${where}: cadena, porque el destino ${destination} es origen de otra regla`,
    );
    check(
      !FORBIDDEN_PREFIXES.some((prefix) => source?.startsWith(prefix)),
      `${where}: el origen ${source} no puede tener regla (ADR-077, AT-043 o taparía una página real)`,
    );
    if (destination) {
      const target = join(DIST, destination.slice(1), 'index.html');
      check(
        existsSync(target),
        `${where}: el destino ${destination} no existe en dist/ (¿corriste pnpm build?)`,
      );
    }
  }

  // Conjunto exacto: las 23 reglas esperadas; solo se tolera `/ → /es/` (E180-I03).
  const actual = new Map(
    rules.map((r) => [expectedKey({ from: r.tokens[0], to: r.tokens[1] }), r]),
  );
  for (const rule of expected) {
    check(actual.has(expectedKey(rule)), `falta la regla ${rule.from} → ${rule.to} 301`);
  }
  const expectedKeys = new Set(expected.map(expectedKey));
  for (const rule of rules) {
    const key = `${rule.tokens[0]} ${rule.tokens[1]}`;
    const isRoot = rule.tokens[0] === '/' && rule.tokens[1] === '/es/';
    check(
      expectedKeys.has(key) || isRoot,
      `línea ${rule.line}: regla fuera del mapa esperado (${key})`,
    );
  }
  for (const gone of GONE) {
    check(!sources.has(gone), `${gone} no debe tener regla: responde 404 (ADR-077)`);
  }
  console.log(
    `  ${rules.length} reglas (${statics.length} estáticas, ${dynamics.length} dinámicas); ` +
      `esperadas ${expected.length}; límites ${MAX_STATIC} / ${MAX_DYNAMIC} / ${MAX_LINE} caracteres`,
  );
};

if (!flag('--sin-archivo')) lintFile(FILE);

// ---------------------------------------------------------------------------------------------
// 2. Red: cada URL antigua contra la base, sin seguir redirecciones
// ---------------------------------------------------------------------------------------------
/** Pide una URL sin seguir redirecciones. Devuelve estado, Location y peso del cuerpo. */
const probe = async (url) => {
  const res = await fetch(url, {
    redirect: 'manual',
    headers: { 'user-agent': 'check-redirects/1.0 (E180-I01)', accept: '*/*' },
    signal: AbortSignal.timeout(20_000),
  });
  const body = Buffer.from(await res.arrayBuffer());
  return {
    status: res.status,
    location: res.headers.get('location'),
    type: res.headers.get('content-type') ?? '',
    bytes: body.length,
  };
};

/** Archivos de `public/static/`, con su ruta pública y su peso. */
const listStatic = (dir = PUBLIC_STATIC) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) return listStatic(full);
        return [
          {
            url: `/${relative(join(ROOT, 'public'), full).split(sep).join('/')}`,
            bytes: statSync(full).size,
          },
        ];
      })
    : [];

const checkNetwork = async (base) => {
  const root = new URL(base);
  const abs = (path) => new URL(path, root).href;
  section(`Red: ${root.origin}`);

  for (const rule of expected) {
    const label = `${rule.from} → ${rule.to}`;
    let first;
    try {
      first = await probe(abs(rule.from));
    } catch (error) {
      check(false, `${label}: no respondió (${error.message})`);
      continue;
    }
    check(first.status === 301, `${label}: estado ${first.status}, se esperaba 301`);
    const target = first.location ? new URL(first.location, abs(rule.from)).href : null;
    check(
      target === abs(rule.to),
      `${label}: Location ${first.location ?? '(vacío)'}, se esperaba ${rule.to}`,
    );
    if (first.status === 301 && target === abs(rule.to)) {
      try {
        const second = await probe(target);
        check(
          second.status === 200,
          `${label}: el destino responde ${second.status}${second.location ? ` hacia ${second.location}` : ''}, se esperaba 200 (cadena de redirecciones)`,
        );
      } catch (error) {
        check(false, `${label}: el destino no respondió (${error.message})`);
      }
    }
  }

  for (const path of GONE) {
    try {
      const res = await probe(abs(path));
      check(
        res.status === 404,
        `${path}: estado ${res.status}${res.location ? ` con Location ${res.location}` : ''}, se esperaba 404 directo (ADR-077)`,
      );
      check(!res.location, `${path}: no debe tener Location (tiene ${res.location})`);
      console.log(
        `  ${path} → ${res.status}${res.location ? ` Location ${res.location}` : ' (sin Location)'}`,
      );
    } catch (error) {
      check(false, `${path}: no respondió (${error.message})`);
    }
  }

  const files = listStatic();
  check(files.length > 0, 'public/static/ no tiene archivos que comprobar');
  for (const file of files) {
    try {
      const res = await probe(abs(file.url));
      check(
        res.status === 200,
        `${file.url}: estado ${res.status}${res.location ? ` hacia ${res.location}` : ''}, se esperaba 200 sin redirección (AT-043)`,
      );
      check(
        res.bytes === file.bytes,
        `${file.url}: pesa ${res.bytes} bytes y el archivo local ${file.bytes}`,
      );
      check(
        !res.type.includes('text/html'),
        `${file.url}: responde ${res.type} (¿una página en lugar del archivo?)`,
      );
    } catch (error) {
      check(false, `${file.url}: no respondió (${error.message})`);
    }
  }
  console.log(
    `  ${expected.length} URL antiguas, ${GONE.length} sin redirección y ${files.length} archivos de /static/`,
  );

  section('Informe (sin regla, no falla)');
  for (const path of INFO_ONLY) {
    try {
      const res = await probe(abs(path));
      console.log(`  ${path} → ${res.status}${res.location ? ` Location ${res.location}` : ''}`);
    } catch (error) {
      console.log(`  ${path} → sin respuesta (${error.message})`);
    }
  }
};

if (BASE && !SKIP_NETWORK) await checkNetwork(BASE);
else if (!SKIP_NETWORK) console.log('\nSin --base: no se comprobó la red.');

// ---------------------------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------------------------
console.log('');
if (failures.length > 0) {
  console.error(`Fallos (${failures.length}):`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  console.error(`\n${checks - failures.length} de ${checks} comprobaciones correctas`);
  process.exit(1);
}
console.log(`${checks} de ${checks} comprobaciones correctas`);
