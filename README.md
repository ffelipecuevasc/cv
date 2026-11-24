# felipecuevas.dev

Sitio personal de Felipe Cuevas: currículum en línea, portafolio y comunidad. Producción: <https://felipecuevas.dev>.

Es un sitio **estático y bilingüe** (`es-CL` y `en-US`) hecho con **Astro 7**, **Tailwind CSS v4** y **PNPM**, con HTML5 semántico y JavaScript mínimo. Se sirve desde **Cloudflare Workers** con assets estáticos; un Worker propio atiende solo `/api/*` (formulario de contacto). La migración desde el sitio anterior (HTML, JavaScript y Cloudflare Pages) terminó con el cutover de la épica E190.

## Requisitos
- **Node.js 24 LTS** (rama 24.x). La versión está en `.nvmrc` y en `engines` de `package.json` (ADR-027). La migración a Node 26 queda para después del cutover y depende de que Workers Builds la ofrezca (ADR-100).
- **PNPM 12**: la versión exacta está fijada en `packageManager` de `package.json`. Se activa con Corepack, que viene incluido en Node.
- **npm, yarn y bun están bloqueados** (ADR-003). Un script `preinstall` cancela la instalación con cualquier gestor que no sea PNPM, y `engineStrict` (en `pnpm-workspace.yaml`) la cancela si Node o PNPM no cumplen `engines`. Solo se usan `pnpm` y `pnpm dlx`.

## Instalación
```sh
git clone https://github.com/ffelipecuevasc/cv.git
cd cv
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```
El servidor de desarrollo queda en <http://localhost:4321/>. La raíz `/` redirige a `/es/`.

## Comandos
| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo de Astro. |
| `pnpm build` | Genera el sitio estático en `dist/` y deja las 404 de idioma donde las busca Cloudflare (`scripts/place-404.mjs`, ADR-089). |
| `pnpm preview` | Sirve `dist/` en local. |
| `pnpm check` | `astro check`: tipos y plantillas `.astro`. |
| `pnpm lint` | ESLint sobre el proyecto. |
| `pnpm format` / `pnpm format:check` | Prettier: formatea / verifica sin modificar. |
| `pnpm verify` | Revisa los enlaces internos, anclas, `srcset`, canónicas, `hreflang` y metaetiquetas del `dist/` (`scripts/verify-links.mjs`). |
| `pnpm check:i18n` | Paridad `es-CL` / `en-US`: mapa de rutas contra `dist/`, `lang`, canónicas, `hreflang`, selector de idioma y estructura de encabezados (`scripts/check-i18n.mjs`). |
| `pnpm verify:seo` | Metaetiquetas, datos estructurados, sitemap, `robots.txt`, cabeceras de seguridad, presupuesto de peso y más (`scripts/verify-seo.mjs`). |
| `pnpm check:redirects` | Exige las 25 reglas de `public/_redirects` y, con `--base <URL>`, comprueba en una URL desplegada los 301, los 404 sin redirección y los archivos de `/static/` (`scripts/check-redirects.mjs`). |
| `pnpm astro …` | Acceso directo a la CLI de Astro. |

`pnpm verify`, `check:i18n`, `verify:seo` y `check:redirects` leen `dist/`: se ejecutan después de `pnpm build`. Antes de proponer un cambio deben pasar `pnpm build`, `check`, `lint`, `verify`, `check:i18n`, `verify:seo` y `check:redirects`.

## Estructura
```
.
├── src/
│   ├── pages/            ← páginas: es/ (es-CL), en/ (en-US) y la 404 de la raíz
│   ├── components/       ← componentes por página y primitivas (src/components/ui)
│   ├── content/          ← contenido bilingüe en JSON, validado con content.config.ts
│   ├── data/             ← datos compartidos (certificaciones, estadísticas, versión de la política)
│   ├── i18n/             ← diccionario de interfaz (ui.ts) y mapa de rutas (routes.ts)
│   ├── layouts/          ← BaseLayout
│   ├── scripts/          ← JavaScript de mejora progresiva
│   ├── styles/global.css ← Tailwind CSS v4 y tokens en @theme
│   └── worker/           ← Worker de /api/* (contacto)
├── public/               ← se copia tal cual al build: _headers, _redirects, robots.txt y static/
├── scripts/              ← verificaciones y utilidades de build
├── wrangler.jsonc        ← Worker con assets estáticos (ADR-037)
├── astro.config.mjs      ← Astro, i18n, sitemap y Tailwind (@tailwindcss/vite)
├── AGENTS.md             ← instrucciones para agentes de IA
├── DESIGN.md             ← única fuente de verdad del diseño
└── _planificacion/       ← épicas, iteraciones, decisiones, auditoría y bitácoras
```

## Idiomas (i18n)
- Todas las páginas existen en `/es/` y `/en/`, siempre con prefijo de idioma y barra final (ADR-047). El sitio tiene 12 páginas por idioma (11 indexables y Agradecimiento) más la 404.
- Los slugs de `/es/` están en español y los de `/en/` en inglés (por ejemplo `/es/contacto/` y `/en/contact/`); el mapa de rutas equivalentes (`src/i18n/routes.ts`) es la única fuente. Los textos de interfaz salen del diccionario (`src/i18n/ui.ts`).
- Cada página declara `hreflang` es-CL, en-US y `x-default` hacia la versión `/es/` (ADR-019, ADR-098). La raíz `/` responde 301 a `/es/`.
- No hay contenido de respaldo entre idiomas. El inglés lo redacta el agente y lo valida Felipe (ADR-017).

## Verificaciones y calidad
- Las verificaciones de la sección «Comandos» fallan ante casos rotos y se prueban con mutaciones sobre copias de `dist/`.
- Accesibilidad: contraste y estructura según `DESIGN.md` (tabla 4.4); `pa11y` con axe se usó en E170-I01 (0 violaciones).
- Rendimiento: los umbrales están en ADR-015 y la línea base vigente (noviembre de 2026) en [`_planificacion/00_producto/linea-base/`](_planificacion/00_producto/linea-base/README.md) (ADR-105); no se deben empeorar.
- Seguridad: CSP estricta con hashes de scripts en línea y demás cabeceras en `public/_headers` (ADR-092).
- Movimiento: se respeta `prefers-reduced-motion`; el contenido es legible sin JavaScript.

## Despliegue y operación
- **Plataforma (ADR-037):** Cloudflare Workers con assets estáticos. Workers Builds construye con `pnpm build` y despliega con `pnpm exec wrangler deploy` cada push a la rama de producción, que desde el cutover es `main`. `workers.dev` está apagado (`"workers_dev": false`).
- **Preview por rama (E200, ADR-108, ADR-123 y ADR-124):** la épica E200 trabaja en la rama larga `ajustes-visuales`; cada push genera una Worker Preview en `https://ajustes-visuales-felipecuevas-dev.felipe-cuevas.workers.dev` (pública, con `X-Robots-Tag: noindex` y sin los secretos de producción), donde Felipe aprueba antes de mergear a `main` por lotes. `"preview_urls": true` está activo solo durante E200 y se apaga al cerrarla. El agente revisa con Playwright MCP (`.mcp.json`, ADR-109).
- **Worker `felipecuevas-dev`:** `wrangler.jsonc` sirve `./dist`, con `not_found_handling: "404-page"`. El Worker (`src/worker/`) atiende solo `/api/*` (`run_worker_first`); el resto lo sirven los assets (ADR-084, ADR-085).
- **Formulario de contacto (ADR-035, ADR-084):** `POST /api/contacto` valida en el servidor, exige el consentimiento y la versión vigente de la política (`src/data/privacy-policy.ts`), verifica Cloudflare Turnstile y envía el correo con la API de correo de Cloudflare, con la fecha, la hora y la versión como evidencia. Los registros no llevan datos personales.
- **Secretos del Worker** (solo los nombres; los valores los configura Felipe en Cloudflare, nunca en el repositorio): `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY` y `CONTACTO_DESTINO`.
- **`public/_redirects` (ADR-093, ADR-098):** 25 reglas estáticas 301 de un solo salto (URL antiguas del sitio anterior, `/` y `/sitemap.xml`). `public/_headers` y `wrangler.jsonc` los edita solo Felipe (ADR-033).
- **SEO:** sitemap bilingüe con `@astrojs/sitemap` (`sitemap-index.xml`, ADR-095 y ADR-096) y `robots.txt` en ASCII (AT-136).
- **Cómo se hizo el cambio de despliegue y cómo se revierte:** el procedimiento paso a paso, con la reversa que no depende de nadie más, está en [`_planificacion/190_epica-cutover/E190-I02-procedimiento-cutover.md`](_planificacion/190_epica-cutover/E190-I02-procedimiento-cutover.md) (ADR-101).

### Volver al sitio antiguo
Hay dos caminos, de más rápido a más lento. Ambos los ejecuta Felipe desde el panel de Cloudflare y `git`:
1. **Reversa de producción (minutos):** quitar el Custom Domain del Worker, volver a asociar `felipecuevas.dev` al proyecto Pages `felipe-cuevas-cv` y, si hace falta, usar «Rollback to this deployment» sobre el último deployment del sitio antiguo. Pasos exactos en la sección 6 del procedimiento (el último deployment del sitio antiguo es `5d4464c8-8994-4e6c-bd13-652fc5dcc220`; `www` hoy no figura como dominio de Pages y hay que agregarlo de nuevo). Esto **no reconstruye** nada desde `main`.
2. **Recuperar el código antiguo:** el sitio anterior (HTML, `static/`, `functions/` y el resto) ya no está en `main`. Está en el historial: usa el tag `sitio-antiguo-2026-11` (apunta a `b49a5bb`, el último commit de `main` antes del merge) con `git checkout sitio-antiguo-2026-11`, o ubica el último commit previo al merge con `git log`. Mientras el despliegue automático de Pages esté desactivado, no se vuelve a construir el sitio antiguo.

## Convenciones
- **Idioma del código (ADR-025):** identificadores en inglés; comentarios, documentación y mensajes de commit en español de Chile. No se traducen los slugs de `/es/`, las claves de `localStorage` (`theme`, `perfil-hero` y `rutas-progreso`) ni los nombres propios de dominio.
- **Estilos:** Tailwind CSS v4 con los tokens de `DESIGN.md` en `@theme`; sin colores sueltos.
- **Dependencias:** las nuevas requieren un ADR aceptado en [`_planificacion/00_producto/decisiones.md`](_planificacion/00_producto/decisiones.md). Hoy hay una de ejecución propia (`@astrojs/sitemap`, ADR-095) además de Astro.
- Los commits, los pushes y los merges los hace el desarrollador (ADR-012).

## Créditos y licencias
- Ícono del logotipo: «terminal» de [Material Symbols Light](https://fonts.google.com/icons) (Google), licencia [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). El aviso también está en `src/assets/logo/terminal-icon.svg` (ADR-057).
- Íconos del sistema: trazados de contorno de [Material Symbols Light](https://fonts.google.com/icons) (Google, colección `material-symbols-light` de Iconify), licencia [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). El aviso está en `src/components/ui/icons.ts` (ADR-063).
- Tipografías autoalojadas: Cinzel y Josefin Sans, licencia OFL 1.1 (ADR-041).

## WebStorm
Las configuraciones `pnpm dev`, `pnpm build` y `pnpm check` vienen en `.run/`. La carpeta `.idea/` no se versiona. Los ajustes recomendados (Node, PNPM, Prettier, ESLint y fin de línea LF) están en [`_planificacion/00_producto/guia-webstorm.md`](_planificacion/00_producto/guia-webstorm.md).

## Documentación
- [`AGENTS.md`](AGENTS.md): reglas para agentes de IA (Claude Code y Antigravity).
- [`DESIGN.md`](DESIGN.md): sistema de diseño.
- [`_planificacion/`](_planificacion/README.md): estado de la migración, épicas, iteraciones, decisiones y auditoría.
