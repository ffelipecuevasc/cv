# Decisiones de arquitectura (ADR)

Reglas del registro:
- Una decisión **no se revierte ni se edita**: se sustituye con un ADR nuevo, y la original pasa a estado "Sustituida por ADR-###".
- Se lee al inicio de cada iteración.
- Las decisiones D-01 a D-13 fueron cerradas por Felipe Cuevas en el prompt maestro. Las ADR-014 en adelante derivan de la auditoría y del punto de control del 28-09-2026.
- Al final hay una sección aparte de **propuestas pendientes**, que no son vinculantes hasta ser aceptadas.

---

## ADR-001 · Idiomas y rutas (D-01)
- **Contexto:** el sitio actual existe solo en español (`lang="es"`, `og:locale` `es_CL`) y no tiene `hreflang`.
- **Decisión:** sitio completo en español de Chile (`es-CL`) bajo `/es/` y en inglés de EE. UU. (`en-US`) bajo `/en/`. Un botón visible en la barra superior cambia todo el sitio de idioma y lleva a la página equivalente. Toda página existe en ambos idiomas.
- **Consecuencias:** ninguna iteración se cierra sin paridad; se requiere mapa de rutas equivalentes (ADR-020), `hreflang` y sitemap bilingüe.
- **Origen:** D-01, prompt maestro. **Estado:** Aceptada.

## ADR-002 · Framework y runtime (D-02)
- **Contexto:** Astro no publica versiones LTS; su documentación indica que da mantenimiento extendido solo con correcciones de seguridad a la mayor anterior. Node.js sí tiene LTS.
- **Decisión:** "Última LTS" de Astro se interpreta como **última versión mayor estable**: Astro 7.x (7.3.5 al 28-09-2026, verificado en docs.astro.build/en/upgrade-astro). Node.js: **Active LTS vigente, v24** (24.21.0 al 28-09-2026, verificado en nodejs.org). Astro 7.3.5 exige Node >= 22.12.
- **Consecuencias:** actualizaciones menores y parches de Astro se aceptan dentro de 7.x; un cambio de mayor requiere ADR nuevo. Node 26 pasará a LTS durante el proyecto: se reevalúa en BL-02.
- **Origen:** D-02. **Estado:** Aceptada. La versión de Node.js fue sustituida parcialmente por ADR-027.

## ADR-003 · Gestor de paquetes PNPM estricto (D-03)
- **Contexto:** el sitio actual usa npm con `package-lock.json` (AT-020). PNPM vigente al 28-09-2026: 12.6.0. Desde PNPM 11, los scripts de compilación de dependencias se controlan con `allowBuilds` en `pnpm-workspace.yaml`, las opciones antiguas (`onlyBuiltDependencies` y similares) fueron eliminadas y PNPM ya no lee el campo `pnpm` de `package.json`.
- **Decisión:** PNPM obligatorio. Prohibidos npm, yarn y bun. Mecanismos: campo `packageManager` con versión exacta, `engines` para node y pnpm, bloqueo de otros gestores en la instalación, `pnpm-lock.yaml` versionado, `allowBuilds` explícito y revisado con `pnpm approve-builds`, `strictDepBuilds` activo.
- **Consecuencias:** cualquier dependencia que ejecute scripts de instalación necesita aprobación explícita. El mecanismo exacto de bloqueo se registra en E10-I02.
- **Origen:** D-03. **Estado:** Aceptada.

## ADR-004 · Tailwind CSS v4 con @tailwindcss/vite (D-04)
- **Contexto:** el sitio actual usa Tailwind 3.4.19 con `tailwind.config.js` (AT-019). Verificado el 28-09-2026: `tailwindcss` y `@tailwindcss/vite` 4.3.3; el plugin declara compatibilidad con Vite 5 a 8, y Astro 7.3.5 usa Vite `^8.0.13`.
- **Decisión:** Tailwind CSS v4 compilado localmente con Node.js y PNPM mediante `@tailwindcss/vite`. La integración `@astrojs/tailwind` está obsoleta y no se usa. Tokens en `@theme`. Fuentes de escaneo restringidas a `src/`.
- **Consecuencias:** la compatibilidad se prueba en E10-I03 antes de dar la decisión por cumplida; si falla, se registra un ADR nuevo.
- **Origen:** D-04. **Estado:** Aceptada. Compatibilidad verificada en E10-I03 (ver ADR-029).

## ADR-005 · HTML5 semántico (D-05)
- **Decisión:** HTML5 semántico en todo el sitio: landmarks correctos, un único `<main>` con todo el contenido principal, jerarquía de encabezados sin saltos, controles nativos.
- **Consecuencias:** corrige AT-012 (contenido fuera de `<main>` en la portada).
- **Origen:** D-05. **Estado:** Aceptada.

## ADR-006 · IDE WebStorm (D-06)
- **Decisión:** WebStorm de JetBrains. Configuración inicial planificada en E10-I05: plugin oficial de Astro (Marketplace) y Astro Language Server, intérprete de Node, PNPM como gestor, soporte de Tailwind, Prettier y ESLint para Astro, configuraciones de ejecución y política de versionado de `.idea/`.
- **Origen:** D-06. **Estado:** Aceptada.

## ADR-007 · Una épica por página (D-07)
- **Decisión:** cada archivo HTML del sitio actual es una épica independiente con al menos una iteración. Son 13: `index`, `educacion`, `experiencia`, `desarrollador`, `docente`, `instructor`, `talento-digital`, `eventos`, `foro`, `recursos`, `contacto`, `agradecimiento` y `404` (E40 a E160).
- **Origen:** D-07. **Estado:** Aceptada.

## ADR-008 · Barra de navegación y logotipo (D-08)
- **Decisión:** rediseño total del diseño y estilo de la barra, manteniendo exactamente las mismas opciones de menú (ver auditoría, área D). El logotipo (ícono SVG + texto con efecto máquina de escribir) se conserva idéntico en apariencia y comportamiento. La barra incluye el botón de apariencia (claro/oscuro) y el botón de idioma.
- **Consecuencias:** cualquier cambio del logotipo exige un ADR que sustituya a este. La especificación exacta está en `DESIGN.md`.
- **Origen:** D-08. **Estado:** Aceptada.

## ADR-009 · Hero de la portada (D-09)
- **Decisión:** rediseño libre, incluso completo, del hero para que en escritorio se vea entero al cargar, sin scroll, incluidas las 3 certificaciones (Oracle, AWS, Python Institute) y las redes sociales.
- **Consecuencias:** se mide con la matriz de ADR-016. No se elimina ningún elemento de la lista de conservación (E40-I01) sin ADR.
- **Origen:** D-09. **Estado:** Aceptada.

## ADR-010 · DESIGN.md como única fuente de verdad (D-10)
- **Decisión:** `DESIGN.md`, en la raíz del proyecto, es la única fuente de verdad del diseño. Es un archivo nuevo, distinto del antiguo. Nace como esqueleto y se completa en E20-I01, antes de la navbar y del hero.
- **Origen:** D-10. **Estado:** Aceptada.

## ADR-011 · AGENTS.md como instrucciones para agentes (D-11)
- **Decisión:** se usa `AGENTS.md` en la raíz del proyecto (no `CLAUDE.md`). Es un archivo nuevo, distinto del antiguo.
- **Consecuencias:** ver ADR-024.
- **Origen:** D-11. **Estado:** Aceptada.

## ADR-012 · Git: el agente no hace commit, push ni merge (D-12)
- **Decisión:** el agente de IA nunca hace commit, push ni merge; los hace siempre el desarrollador. Puede crear ramas nuevas solo tras consultar. Nunca trabaja sobre `main`.
- **Consecuencias:** `.claude/settings.json` debe denegar esos comandos (E10-I06). El `.claude/settings.json` antiguo los dejaba en "preguntar" (AT-021).
- **Origen:** D-12. **Estado:** Aceptada.

## ADR-013 · Estrategia de ramas (D-13)
- **Decisión:** el proyecto nuevo se construye completo en una sub-rama, sin trabajar en `main`, hasta que esté terminado. Después el desarrollador realiza la migración completa a la rama principal.
- **Origen:** D-13. **Estado:** Aceptada.

## ADR-014 · La rama de migración parte desde main
- **Contexto:** pregunta abierta 1 del punto de control.
- **Decisión:** la rama de migración se crea desde `main`. Nombre propuesto: `migracion-astro` (se confirma en E10-I01). Los archivos del sitio antiguo permanecen en la rama como referencia de solo lectura y se retiran en E190-I03. Los archivos antiguos que el proyecto nuevo reemplaza (`package.json`, `package-lock.json`, `tailwind.config.js`, `.gitignore`, `.claude/settings.json`, `README.md`, `AGENTS.md`, `DESIGN.md`) se sustituyen en la rama; sus versiones originales siguen disponibles con `git show main:<ruta>`.
- **Consecuencias:** el cutover es un merge normal. `git log main --not HEAD` permite detectar contenido publicado en producción durante la migración (E190-I01). Tailwind debe restringir su escaneo a `src/` (ADR-004).
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-015 · Umbrales de rendimiento y plan de CWV
- **Contexto:** el archivo del proyecto es el plan de refactorización de septiembre (etapas 0 a 6, cerradas). El plan de Core Web Vitals de agosto ya se completó y el sitio en producción vive con su resultado; Cloudflare aún no emite informes suficientes.
- **Decisión:** no hay trabajo de CWV pendiente que absorber. Umbrales para la Definition of Done: valores "buenos" de Google en percentil 75 (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1) y, en laboratorio, ninguna página con puntaje de rendimiento inferior a su línea base (`docs/linea-base/2026-08-12/resumen-lighthouse.md` del sitio actual). Los informes de Cloudflare se revisan a fines de octubre de 2026 (BL-01) y, si mejoran la línea base, se registra un ADR que la actualice.
- **Consecuencias:** resuelve AT-035.
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-016 · Matriz de viewports de referencia del hero
- **Decisión:** 1366×768, 1440×900, 1536×864 y 1920×1080, descontando 130 px por la barra de tareas y la interfaz del navegador. Áreas visibles a verificar: 1366×638, 1440×770, 1536×734 y 1920×950 px, en ambos temas y ambos idiomas.
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-017 · Estrategia de contenido en inglés
- **Decisión:** el agente redacta la versión `en-US` y Felipe la valida en cada iteración. Los testimonios se muestran traducidos con la indicación "traducido del español". Los PDFs (CV, certificado REUF y recursos) quedan en español con un aviso en `/en/` hasta que Felipe entregue versiones en inglés (BL-04).
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-018 · Salida estática
- **Decisión:** Astro con salida 100 % estática, sin adaptador de renderizado en servidor. La única lógica de servidor es la función de contacto, que vive fuera de Astro según la plataforma que resuelva D-14.
- **Consecuencias:** estados dependientes de la fecha (eventos) se calculan en el cliente con estado base del build (AT-039).
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-019 · Comportamiento de la raíz y x-default
- **Decisión:** `/` responde 301 hacia `/es/`. `x-default` apunta a la versión `/es/` de cada página. No se detecta el idioma del navegador.
- **Consecuencias:** comportamiento cacheable y predecible. Se implementa en E180-I03.
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-020 · Slugs traducidos en inglés
- **Decisión:** las rutas en `/en/` usan slugs en inglés según el mapa de la auditoría (área L); por ejemplo `/en/education`, `/en/experience`, `/en/developer`, `/en/lecturer`, `/en/contact`. "Talento Digital" e "Instructor" se mantienen. El mapa se cierra en E30-I02 con validación de Felipe.
- **Consecuencias:** cambiar un slug después del cutover exige 301.
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-021 · Ubicación de apariencia y CV en la barra
- **Decisión:** el botón "Apariencia" pasa del pie a la barra (hoy en `index.html:898`). "Descargar CV" se conserva en la barra como parte de sus opciones.
- **Origen:** supuesto declarado en el punto de control, sin objeción; deriva de ADR-008. **Estado:** Aceptada.

## ADR-022 · Foro compartido entre idiomas
- **Decisión:** Giscus usa el mismo término `foro-general` en `/es/foro` y `/en/forum`; solo cambia el idioma de su interfaz.
- **Consecuencias:** una sola comunidad y ninguna conversación huérfana.
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-023 · Claves de almacenamiento local independientes del idioma
- **Decisión:** se conservan las claves actuales de `localStorage`: `theme`, `perfil-hero` y `rutas-progreso`, con el mismo formato de valor, y son compartidas por ambos idiomas.
- **Consecuencias:** los visitantes actuales conservan su tema, su perfil del hero y su progreso en las rutas de aprendizaje.
- **Origen:** hallazgo AT-028. **Estado:** Aceptada.

## ADR-024 · Sin CLAUDE.md ni GEMINI.md
- **Contexto:** Claude Code 2.1.277 lee `AGENTS.md` solo cuando no hay `CLAUDE.md` en el directorio de trabajo ni en los superiores. En Antigravity, `GEMINI.md` tiene precedencia sobre `AGENTS.md`.
- **Decisión:** no se crea `CLAUDE.md` ni `GEMINI.md` en ninguna ruta del proyecto. La carga de `AGENTS.md` se verifica en E10-I06 con la línea de arranque o preguntando al agente por sus instrucciones, no con `/memory` (AT-036).
- **Origen:** verificación web del 28-09-2026; deriva de ADR-011. **Estado:** Aceptada.

## ADR-025 · Idioma del código y de los comentarios
- **Contexto:** propuesta P-02. El sitio actual usa identificadores en español (por ejemplo `leerProgreso` y `rutasUI` en `static/js/rutas.js`), mientras que las API de Astro y del ecosistema están en inglés.
- **Decisión:**
  - Identificadores de código en **inglés**: variables, funciones, tipos, componentes, carpetas y archivos dentro de `src/` (salvo las excepciones).
  - Comentarios, JSDoc, documentación, bitácoras y mensajes de commit en **español de Chile**.
  - **Excepciones que no se traducen:**
    1. los slugs de ruta en español bajo `src/pages/es/` (ADR-020), por ejemplo `recursos.astro`;
    2. las claves de `localStorage` `theme`, `perfil-hero` y `rutas-progreso`, con su formato de valor (ADR-023);
    3. los nombres propios de dominio, por ejemplo `talento-digital` o `reuf`.
- **Consecuencias:**
  - Los nombres previstos en español en los archivos de iteración se ajustan al inglés (`Logotipo.astro` pasa a `Logo.astro` y `components/inicio` pasa a `components/home`).
  - Los textos visibles para el visitante no se ven afectados: siguen en `es-CL` y `en-US` según ADR-001.
- **Origen:** propuesta P-02, aprobada por Felipe el 24-10-2026. **Estado:** Aceptada.

## ADR-026 · Reglas de protección para los agentes de IA
- **Contexto:** propuesta P-04. `AGENTS.md` tenía cinco reglas marcadas como "derivadas", pendientes de aprobación. Tres ya tenían respaldo (ADR-003, la regla de dependencias y las reglas del registro de decisiones y de la auditoría); dos eran nuevas.
- **Decisión:** las cinco reglas pasan a ser vinculantes, con dos ajustes:
  1. **Historial y ramas:** el agente no reescribe el historial (`rebase`, `reset --hard`, `push --force` ni equivalentes) ni elimina ramas. **Ajuste:** puede eliminar una rama local temporal que él mismo creó en la sesión, solo después de consultar a Felipe y recibir su autorización. Nunca elimina ramas remotas.
  2. **Gestor de paquetes:** solo `pnpm` y `pnpm dlx`. Prohibidos npm, yarn, bun y `npx` (amplía ADR-003, que no mencionaba `npx`).
  3. **Dependencias:** no se agrega ninguna dependencia sin un ADR aceptado en `decisiones.md`.
  4. **Despliegue:** no se toca la configuración de despliegue sin consultar a Felipe. **Ajuste:** incluye Cloudflare (panel y API), Wrangler y sus archivos de configuración (`wrangler.toml`, `wrangler.json`, `wrangler.jsonc`), `_headers`, `_redirects`, `.dev.vars`, variables de entorno y secretos.
  5. **Registros:** no se borran entradas de la auditoría ni se revierten ADR; todo cambio se hace con una entrada nueva que sustituye a la anterior.
- **Consecuencias:**
  - En `AGENTS.md`, la subsección "Reglas derivadas" se reemplaza por "Reglas de protección (ADR-026)", sin la marca "derivada".
  - E10-I06 usa estas reglas como base para las denegaciones de `.claude/settings.json`, incluidas `npx` y la escritura en archivos de Wrangler y `.dev.vars`.
- **Origen:** propuesta P-04, aprobada por Felipe el 24-10-2026 con los ajustes a las reglas 1 y 4. **Estado:** Aceptada.

## ADR-027 · Node.js 24 durante la construcción; migración a Node 26 agendada
- **Contexto:** ADR-002 fijó Node.js 24 por ser la Active LTS al 28-09-2026. Al 27-10-2026, según endoflife.date y fuentes secundarias (no verificado aún en nodejs.org), Node 24 pasó a Maintenance LTS el 20-10-2026 y Node 26 pasa a Active LTS el 28-10-2026. Node 24 mantiene soporte de seguridad hasta el 30-04-2028.
- **Decisión:** la construcción del proyecto continúa con Node 24 (rama 24.x). La migración a Node 26 se agenda en BL-02, antes de E190-I01, previa verificación de compatibilidad con Astro 7, Tailwind CSS v4, PNPM y la plataforma de despliegue (P-01).
- **Consecuencias:**
  - `engines` y el archivo de versión de Node de E10-I02 usan 24.x.
  - La migración a Node 26 requerirá un ADR nuevo que sustituya a este.
  - ADR-002 queda parcialmente sustituida en lo referente a la versión de Node.js; la parte sobre Astro 7.x sigue vigente.
- **Origen:** consulta de E10-I02 (BL-02), decisión de Felipe el 27-10-2026. **Estado:** Aceptada.

## ADR-028 · Versiones fijadas y mecanismo de bloqueo de gestores
- **Contexto:** ADR-003 dejó el mecanismo exacto de bloqueo para E10-I02. Las versiones de ADR-002 y ADR-003 eran del 28-09-2026; el 27-10-2026 se volvieron a verificar en registry.npmjs.org y nodejs.org/dist: Astro 7.4.2 (exige Node >= 22.23.4 y usa Vite `^8.3.4`), PNPM 12.15.0, Node 24.22.1 (LTS "Krypton") y `create-astro` 5.3.1.
- **Decisión:**
  - `astro` queda fijado en la versión exacta `7.4.2` y es la única dependencia del proyecto (cubierta por ADR-002). Se usó la plantilla `minimal` sin integraciones, sin `.vscode/`, sin los favicons de ejemplo y sin el `AGENTS.md` ni el `README.md` de la plantilla.
  - `packageManager: "pnpm@12.15.0"`; `engines` con `node: "24.x"` y `pnpm: "12.x"` (ADR-027); `engineStrict: true` en `pnpm-workspace.yaml`.
  - El archivo de versión de Node es `.nvmrc` con el valor `24`, para aceptar cualquier 24.x.
  - **Bloqueo en dos capas, sin dependencias:**
    1. Corepack rechaza yarn por el campo `packageManager`.
    2. El script `preinstall` ejecuta `scripts/only-pnpm.mjs`, que revisa `npm_config_user_agent` y termina con código 1 y un mensaje en español si el gestor no es PNPM.
  - Se descarta `only-allow`, porque se ejecuta con `npx` (prohibido por ADR-026) y agrega una dependencia.
  - `strictDepBuilds: true` y `allowBuilds: {}`. La instalación no requiere ningún script de compilación: Vite 8 usa Rolldown en lugar de esbuild, y `sharp` 0.35.5 (dependencia opcional de Astro) no tiene script `install` y usa los binarios precompilados `@img/*`. `pnpm approve-builds` informa que no hay paquetes por aprobar.
  - Sin `.npmrc`: desde PNPM 11 la configuración vive en `pnpm-workspace.yaml`, y no hay autenticación ni registro que declarar.
- **Consecuencias:**
  - Cualquier dependencia futura con scripts de compilación hará fallar la instalación hasta que se revise y se agregue a `allowBuilds`.
  - Las subidas de versión de Astro dentro de 7.x se hacen cambiando la versión exacta.
- **Origen:** E10-I02, 27-10-2026. **Estado:** Aceptada.

## ADR-029 · Dependencias de Tailwind CSS v4 y verificación de compatibilidad
- **Contexto:** ADR-004 dejó la prueba de compatibilidad para E10-I03. Verificado el 27-10-2026 en registry.npmjs.org: `tailwindcss` y `@tailwindcss/vite` siguen en 4.3.3, y el plugin declara peer `vite ^5.2.0 || ^6 || ^7 || ^8`. `pnpm why vite` muestra una sola versión, `vite@8.3.5`, traída por `astro@7.4.2`.
- **Decisión:**
  - Se agregan como `devDependencies`, con versión exacta, `tailwindcss` 4.3.3 y `@tailwindcss/vite` 4.3.3 (`pnpm add -D -E`). Son las únicas dependencias nuevas.
  - El plugin se registra en `vite.plugins` de `astro.config.mjs`. No se usa `@astrojs/tailwind` ni `tailwind.config.js` (este se eliminó de la rama; el original sigue en `main`).
  - La hoja global `src/styles/global.css` usa `@import "tailwindcss" source(none);` y `@source "../../src";`: se desactiva la detección automática desde la raíz y el escaneo queda limitado a `src/`.
  - `allowBuilds` sigue vacío: `@tailwindcss/oxide` usa binarios precompilados y `pnpm approve-builds` no informa paquetes por aprobar.
  - **No se instala `@tailwindcss/forms`.** Los formularios del sitio nuevo (E140-I01) se estilizarán con utilidades y tokens de `@theme`. Si E140-I01 lo necesita, se propone con un ADR nuevo. `@tailwindcss/container-queries` tampoco se instala: las container queries son nativas en v4.
- **Verificación:** `pnpm build` sin advertencias de peer dependencies; la utilidad arbitraria `text-[13.37px]` de `src/pages/index.astro` aparece en el CSS de `dist/`, y `backdrop-blur-md` y `tracking-tight` (presentes solo en los HTML antiguos) no. Prueba de control: sin `source(none)`, esas clases antiguas sí aparecen.
- **Consecuencias:** las subidas de versión de Tailwind se hacen cambiando ambas versiones exactas a la vez. Los tokens llegan en E20-I02.
- **Origen:** E10-I03, 27-10-2026. **Estado:** Aceptada.

## ADR-030 · Dependencias de calidad de código: astro check, ESLint y Prettier
- **Contexto:** E10-I04 traía versiones del 28-09-2026. El 27-10-2026 se volvieron a verificar en registry.npmjs.org (`pnpm view`): `@astrojs/check` 0.9.12 (peer `typescript ^5 || ^6`), `eslint-plugin-astro` 3.2.1 (peer `eslint >=10`, Node `^22.22.3 || ^24.16.0`), `prettier-plugin-astro` 1.1.2 (peer `prettier ^3.5.3`, Node `>=22.12`), ESLint 10.13.0 (solo configuración plana), `typescript-eslint` 8.72.x (peer `typescript <6.1.0`). La última TypeScript es 7.0.2, que **no** es compatible con `@astrojs/check` ni con `typescript-eslint` (AT-044). PNPM 12 aplica `minimumReleaseAge` y rechazó `typescript-eslint` 8.72.1 (publicada el 26-10-2026) agregando excepciones automáticas a `pnpm-workspace.yaml`.
- **Decisión:**
  - Se agregan como `devDependencies` exactas (`pnpm add -D -E`), y son las únicas nuevas:
    1. `@astrojs/check` 0.9.12: script `check` (`astro check`).
    2. `typescript` 6.0.3: peer obligatorio de `@astrojs/check`; se fija en 6.x por AT-044.
    3. `eslint` 10.13.0: script `lint` con `eslint.config.js` (configuración plana, `defineConfig` y `globalIgnores` de `eslint/config`).
    4. `@eslint/js` 10.0.1: reglas recomendadas de JavaScript.
    5. `typescript-eslint` 8.72.0: analiza TypeScript en `.ts` y en el frontmatter de `.astro`; se usa 8.72.0 y no 8.72.1 para respetar `minimumReleaseAge` sin excepciones.
    6. `eslint-plugin-astro` 3.2.1: configuración `recommended`.
    7. `globals` 17.13.0: globales de Node para `scripts/` y archivos `*.config.*` (PNPM estricto no permite importar la copia transitiva).
    8. `prettier` 3.9.10 y `prettier-plugin-astro` 1.1.2: scripts `format` y `format:check`.
  - **No se instalan:** `eslint-plugin-jsx-a11y` (peer opcional; la accesibilidad se revisa en E170-I01), `prettier-plugin-tailwindcss` (ordenar clases requiere un ADR propio), `@typescript-eslint/parser` por separado (lo trae `typescript-eslint`).
  - Prettier: comillas simples, comas finales, ancho 100 y `endOfLine: "auto"` (Git en Windows con `autocrlf` deja CRLF en la copia de trabajo).
  - El sitio antiguo (`/*.html`, `static/`, `functions/`, `docs/`, `sitemap.xml`, `robots.txt`, `_redirects`, `linkinator.config.json`) queda excluido de ESLint y Prettier. También se excluyen de Prettier los Markdown (`*.md`, `_planificacion/`), que se redactan a mano, `pnpm-lock.yaml` y `.claude/`.
  - `pnpm-workspace.yaml` no cambia: `allowBuilds` sigue vacío y `pnpm approve-builds` no informa paquetes por aprobar; no hay excepciones a `minimumReleaseAge`.
- **Consecuencias:** TypeScript no sube a 7.x hasta que `@astrojs/check` y `typescript-eslint` lo admitan (ADR nuevo). Las subidas de versión respetan `minimumReleaseAge`.
- **Origen:** E10-I04, 27-10-2026. **Estado:** Aceptada.

## ADR-031 · Configuración de WebStorm fuera de `.idea/`
- **Contexto:** AT-022. `.gitignore` ignoraba `.idea/`, pero `.idea/.gitignore` estaba versionado. E10-I05 proponía versionar `.idea/runConfigurations/`.
- **Decisión:** no se versiona nada de `.idea/` (decisión de Felipe, 27-10-2026). `.idea/.gitignore` sale del índice (`git rm --cached`; el archivo local se conserva). Las configuraciones de ejecución compartidas (`pnpm dev`, `pnpm build` y `pnpm check`) se versionan en `.run/` de la raíz, la carpeta estándar de JetBrains para configuraciones guardadas como archivo de proyecto. Los ajustes del IDE se documentan en `_planificacion/00_producto/guia-webstorm.md`.
- **Consecuencias:** cada desarrollador configura WebStorm siguiendo la guía; `.run/` es la única configuración de IDE versionada.
- **Origen:** E10-I05, 27-10-2026; verificada por Felipe en WebStorm 2026.2.3 con el plugin de Astro 262.10968.63. **Estado:** Aceptada.

## ADR-032 · Fin de línea LF en el repositorio
- **Contexto:** sugerencia de E10-I04. El repositorio ya guarda LF, pero con `core.autocrlf=true` la copia de trabajo en Windows queda con CRLF, por lo que Prettier usaba `endOfLine: "auto"`.
- **Decisión:** `.gitattributes` con `* text=auto eol=lf` y binarios marcados (`png`, `jpg`, `webp`, `avif`, `gif`, `ico`, `pdf`, `woff`, `woff2`). Prettier pasa a `endOfLine: "lf"` (sustituye ese punto de ADR-030). Los archivos del sitio antiguo no se reescriben: su contenido en el repositorio ya es LF y su copia local se normaliza en el próximo checkout.
- **Consecuencias:** los archivos nuevos y editados quedan en LF en cualquier sistema operativo; WebStorm debe usar LF como separador de línea (ver la guía).
- **Origen:** E10-I05, aprobada por Felipe el 27-10-2026. **Estado:** Aceptada.

## ADR-033 · Permisos de Claude Code en `.claude/settings.json`
- **Contexto:** AT-021. El archivo antiguo permitía npm y dejaba `git commit` en `ask`, contra ADR-003 y ADR-012. AT-045 documenta los límites de las reglas.
- **Decisión:** `.claude/settings.json` versionado con tres niveles:
  - `allow`: scripts `pnpm dev|build|preview|check|lint|format|format:check|test` (también con `pnpm run`) y lecturas de git (`status`, `diff`, `log`, `show`, rama actual);
  - `ask`: instalar o quitar dependencias, `pnpm dlx`, `git add|checkout|switch|restore|stash|rm|mv|clean|reset|tag|cherry-pick|revert`, `rm` y edición de `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml` y `astro.config.mjs`;
  - `deny` (en Bash y PowerShell): `git commit|push|merge|pull|rebase|reset --hard`, borrado de ramas, reescritura de historial, `npm`, `npx`, `yarn`, `bun`, `bunx` y `wrangler`; edición de `.claude/`, `AGENTS.md`, `DESIGN.md`, `CLAUDE.md`, `GEMINI.md`, archivos de Wrangler, `.dev.vars`, `_headers`, `_redirects` y archivos del sitio antiguo; lectura de `.env` y `.dev.vars`.
  - `autoMemoryEnabled: false`. Los ajustes personales van en `.claude/settings.local.json`, ignorado por git.
- **Consecuencias:** el agente no puede editar sus propios permisos ni `AGENTS.md`; Felipe los cambia a mano. Se recomienda el modo de permisos predeterminado, porque en modo automático las acciones en `ask` pueden ejecutarse sin confirmación (AT-045).
- **Origen:** E10-I06, 27-10-2026; verificada por Felipe en Claude Code 2.1.311. **Estado:** Aceptada.

## ADR-034 · Configuración i18n nativa y tratamiento provisorio de `/`
- **Contexto:** E10-I07. API verificada el 28-10-2026 en los tipos de Astro 7.4.2 y en docs.astro.build/en/guides/internationalization. Con `prefixDefaultLocale: true`, la opción `redirectToDefaultLocale` exige una `src/pages/index.astro` (error `MissingIndexForInternationalization`).
- **Decisión:**
  - `i18n.locales` como objetos: `{ path: 'es', codes: ['es-CL', 'es'] }` y `{ path: 'en', codes: ['en-US', 'en'] }`; `defaultLocale: 'es'`; `routing.prefixDefaultLocale: true`.
  - Sin `i18n.fallback`: una página que falte en un idioma responde 404, nunca el contenido del otro idioma (ADR-001).
  - El atributo `lang` se toma de `Astro.currentLocale`, que entrega el primer código del idioma (`es-CL` o `en-US`).
  - Las páginas viven en `src/pages/es/` y `src/pages/en/`; no hay páginas en la raíz de `src/pages/`.
  - `/` se trata con `redirects: { '/': '/es/' }`: en salida estática genera `dist/index.html` con meta refresh, `noindex` y canónica a `/es/`. Es **provisorio**: la 301 de producción se implementa en E180-I03 (ADR-019).
  - No se usa middleware ni adaptador: todo se resuelve en el build (ADR-018).
- **Consecuencias:** E30-I01 y E30-I02 parten de `Astro.currentLocale` y de las funciones de `astro:i18n`. E180-I03 debe reemplazar o complementar la redirección de `/` con una 301 de la plataforma (AT-046).
- **Origen:** E10-I07, 28-10-2026. **Estado:** Aceptada.

## ADR-035 · Política de privacidad y consentimiento en el formulario (Ley 21.719)
- **Contexto:** AT-047. La Ley 21.719 de protección de datos personales entra en vigor en Chile el 1 de diciembre de 2026. El sitio actual no tiene política de privacidad y su formulario de contacto no pide consentimiento.
- **Decisión:**
  - Se crea una página de política de privacidad en una épica nueva, **E155 · Política de privacidad**, siguiendo el patrón de una épica por página.
  - Slugs: `/es/privacidad` y `/en/privacy` (coherente con ADR-020).
  - El enlace a la política va en el **pie de todas las páginas**. No va en la navbar, que se mantiene sin cambios.
  - El formulario de contacto incorpora un **checkbox obligatorio** de aceptación de la política, con un enlace a ella.
  - El botón de envío **permanece siempre activo**. Si se intenta enviar sin marcar el checkbox, se muestra un error accesible asociado al checkbox, porque un botón deshabilitado no recibe foco ni explica el motivo.
  - La función de envío valida en el servidor que el consentimiento venga marcado y registra como evidencia la fecha y hora y la versión de la política aceptada (trazabilidad del consentimiento). No se usa base de datos ni dependencia nueva: la evidencia viaja en el correo que recibe Felipe.
  - La política cubre, en forma breve, todos los tratamientos del sitio: formulario de contacto, Turnstile, Calendly, Giscus (GitHub), el progreso guardado en el navegador (E130, ADR-023) y la preferencia de tema.
  - El texto de la política lo valida un especialista externo antes del cutover. Ninguna iteración lo presenta como asesoría legal.
- **Consecuencias:** se agregan E155 y E155-I01 (14 páginas, 28 con ambos idiomas). Se ajustan E30-I02 (mapa de rutas), E30-I06 (pie), E140 (checkbox y función de envío), E170 (totales y CSP), E180-I02 (sitemap) y E190-I01 (precondiciones). E140-I01 pasa a depender de E155-I01, por lo que E155 se ejecuta antes que E140. La validación del especialista queda como pendiente de Felipe antes de E190 (BL-08). Si se agrega un servicio de terceros nuevo, la política se actualiza y cambia de versión.
- **Origen:** aprobada por Felipe el 28-10-2026. **Estado:** Aceptada.

## ADR-036 · Sistema común con composición propia por página
- **Contexto:** el sitio actual repite la misma estructura visual en todas las páginas; en Educación, las certificaciones se muestran en una línea de tiempo con igual protagonismo.
- **Decisión:**
  - E20 define un **sistema común**: paletas clara y oscura (se mantienen las actuales), tipografía, espaciados, movimiento y primitivas.
  - Cada página tiene una **composición propia** que arma esas piezas con un patrón distinto (zigzag, mosaico, línea de tiempo, etc.). No todas las páginas se ven iguales.
  - Todo patrón de composición se documenta en `DESIGN.md`, que sigue siendo la única fuente de verdad del diseño (ADR-010).
  - E20-I01 define la regla general y los patrones de **Inicio** y **Educación**. Los patrones del resto de las páginas se definen al inicio de la primera iteración de cada épica de página, con validación de Felipe, y se agregan a `DESIGN.md`.
  - **Educación:** las certificaciones se agrupan por categoría en **franjas de ancho completo**, llamativas, con el título de la categoría y las insignias en tamaño pequeño. Las franjas alternan la orientación (zigzag: título a la izquierda e insignias a la derecha, luego al revés). En móvil se apilan en una sola columna.
  - Se agrega un campo de categoría a los datos de certificaciones. No se elimina contenido: solo se reorganiza.
  - Clasificación **propuesta, por validar por Felipe**: Inteligencia artificial (AWS AI Practitioner, Oracle AI Associate, Oracle AI Professional); Cloud (AWS Cloud Practitioner, AWS Developer Associate, Oracle OCI Associate); Desarrollo y datos (Python Institute PCEP, Oracle Developer Professional, Oracle Data Science Professional).
- **Consecuencias:** `DESIGN.md` incorpora la sección "Composición por página" en E20-I01 (el agente no edita `DESIGN.md` fuera de esa iteración, ADR-033). E20-I05 agrega la primitiva "franja temática". La primera iteración de cada épica de página incluye definir y validar su patrón; E40-I01 y E50-I01 aplican el definido en E20-I01. La clasificación de certificaciones queda por validar (BL-07) y bloquea esa parte de E50-I02 hasta que Felipe la confirme.
- **Origen:** aprobada por Felipe el 28-10-2026. **Estado:** Aceptada.

---

## Propuestas pendientes (no vinculantes hasta ser aceptadas)

### P-01 · D-14: Cloudflare Pages o Workers con assets estáticos
- **Estado:** Pendiente. Se resuelve en E10-I09 con un ADR nuevo.
- **Evidencia al 28-09-2026:** la guía oficial de migración (actualizada el 22-09-2026) indica que:
  - Workers ofrece más funciones que Pages y que la inversión nueva de Cloudflare se concentra en Workers;
  - `_headers` y `_redirects` funcionan de forma nativa en ambos;
  - una carpeta `functions/` de Pages debe compilarse en un único script de Worker o reescribirse;
  - los alias de rama personalizados en Workers figuran como "próximamente".
- **Propuesta:** Worker nuevo con assets estáticos, conectado solo a la rama de migración.
  - Producción sigue en el proyecto Pages actual hasta el cutover.
  - El cutover mueve el dominio al Worker.
  - La reversa lo devuelve a Pages.

### P-02 · Convención de idioma para código y comentarios
- **Estado:** Aceptada el 24-10-2026. Ver ADR-025.
- **Propuesta:** comentarios y documentación en español de Chile. Identificadores de código en inglés, por coherencia con Astro y el ecosistema, salvo nombres de dominio propios (por ejemplo `talento-digital`). Alternativa: mantener identificadores en español como en el sitio actual.

### P-03 · Logotipo como enlace al inicio
- **Estado:** Pendiente (AT-009).
- **Propuesta:** el logotipo pasa a ser un enlace a la portada del idioma activo, sin cambiar su apariencia ni su animación. Requiere aprobación porque ADR-008 exige comportamiento idéntico.

### P-04 · Reglas derivadas de AGENTS.md
- **Estado:** Aceptada el 24-10-2026 con ajustes. Ver ADR-026.
- **Contenido:** las reglas marcadas como "derivada" en `AGENTS.md`: no reescribir historial ni eliminar ramas; no usar npm, yarn ni bun; no agregar dependencias sin ADR; no tocar la configuración de despliegue sin consultar; no borrar entradas de la auditoría ni revertir ADR sin una entrada nueva que lo sustituya.
- **Vigencia:** reemplazada por ADR-026.

### P-05 · Marca "fecudev"
- **Estado:** Pendiente (BL-05).
- **Contexto:** el término no aparece en el sitio actual.
- **Propuesta:** tratarlo como nombre de la comunidad (foro, eventos, recursos y Discord) en textos de contenido, sin cambiar la etiqueta "Comunidad" del menú (ADR-008).
