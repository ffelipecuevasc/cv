# felipecuevas.dev

Sitio personal de Felipe Cuevas: CV en línea, portafolio y comunidad. Producción: <https://felipecuevas.dev>.

Este repositorio está en **migración a Astro** en la rama `migracion-astro`. El objetivo es un sitio estático y bilingüe (`es-CL` y `en-US`), con Astro 7, Tailwind CSS v4 y PNPM. Mientras dure la migración, los archivos del sitio anterior (`*.html`, `static/`, `functions/`, `docs/` y otros) siguen en la raíz como referencia de solo lectura: no se editan.

## Requisitos
- **Node.js 24 LTS** (rama 24.x). La versión está en `.nvmrc` y en `engines` de `package.json` (ADR-027). Mientras rija ADR-027, la migración a Node 26 queda agendada y no se adelanta.
- **PNPM 12**: la versión exacta está fijada en `packageManager` de `package.json`. Se activa con Corepack, que viene incluido en Node.
- **npm, yarn y bun están bloqueados** (ADR-003). Un script `preinstall` cancela la instalación con cualquier gestor que no sea PNPM, y `engineStrict` (en `pnpm-workspace.yaml`) la cancela si Node o PNPM no cumplen `engines`.

## Instalación
```sh
git clone https://github.com/ffelipecuevasc/cv.git
cd cv
git switch migracion-astro
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```
El servidor de desarrollo queda en <http://localhost:4321/>. La raíz `/` redirige a `/es/`.

## Scripts
| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo de Astro. |
| `pnpm build` | Genera el sitio estático en `dist/`. |
| `pnpm preview` | Sirve `dist/` en local para revisar el build. |
| `pnpm check` | `astro check`: diagnóstico de tipos y plantillas `.astro`. |
| `pnpm lint` | ESLint sobre el proyecto (excluye el sitio antiguo). |
| `pnpm format` | Formatea con Prettier. |
| `pnpm format:check` | Verifica el formato sin modificar archivos. |
| `pnpm astro …` | Acceso directo a la CLI de Astro. |

Antes de proponer un cambio, deben pasar `pnpm build`, `pnpm check`, `pnpm lint` y `pnpm format:check`.

## Estructura
```
.
├── src/
│   ├── pages/
│   │   ├── es/            ← páginas en español (es-CL)
│   │   └── en/            ← páginas en inglés (en-US)
│   └── styles/global.css  ← Tailwind CSS v4 y tokens en @theme
├── public/                ← archivos que se copian tal cual al build
├── scripts/only-pnpm.mjs  ← bloqueo de gestores distintos de PNPM
├── .run/                  ← configuraciones de ejecución de WebStorm
├── astro.config.mjs       ← Astro, i18n y Tailwind (@tailwindcss/vite)
├── eslint.config.js
├── pnpm-workspace.yaml    ← ajustes de PNPM
├── AGENTS.md              ← instrucciones para agentes de IA
├── DESIGN.md              ← única fuente de verdad del diseño
└── _planificacion/        ← épicas, iteraciones, decisiones y bitácoras
```

## Idiomas (i18n)
- Todas las páginas existen en `/es/` (`es-CL`) y `/en/` (`en-US`), siempre con prefijo de idioma.
- No hay contenido de respaldo entre idiomas: si una página falta en un idioma, responde 404.
- Los slugs se traducen (por ejemplo `/es/contacto` y `/en/contact`) y se relacionan con un mapa de rutas equivalentes.
- La redirección de `/` a `/es/` es provisoria y se reemplaza durante la migración.

## Convenciones
- **Idioma del código (ADR-025):** identificadores en inglés; comentarios, documentación y mensajes de commit en español de Chile. No se traducen los slugs de `/es/`, las claves de `localStorage` (`theme`, `perfil-hero` y `rutas-progreso`) ni los nombres propios de dominio.
- **Versión de Node (ADR-027):** Node 24.x durante la construcción.
- Las dependencias nuevas requieren una decisión registrada en [`_planificacion/00_producto/decisiones.md`](_planificacion/00_producto/decisiones.md).

## Créditos y licencias
- Ícono del logotipo: «terminal» de [Material Symbols Light](https://fonts.google.com/icons) (Google), licencia [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). El aviso también está en `src/assets/logo/terminal-icon.svg` (ADR-057).

## WebStorm
Las configuraciones `pnpm dev`, `pnpm build` y `pnpm check` vienen en `.run/`. La carpeta `.idea/` no se versiona. Los ajustes recomendados (Node, PNPM, Prettier, ESLint y fin de línea LF) están en [`_planificacion/00_producto/guia-webstorm.md`](_planificacion/00_producto/guia-webstorm.md).

## Documentación
- [`AGENTS.md`](AGENTS.md): reglas para agentes de IA (Claude Code y Antigravity).
- [`DESIGN.md`](DESIGN.md): sistema de diseño.
- [`_planificacion/`](_planificacion/README.md): estado de la migración, épicas, iteraciones y decisiones.
