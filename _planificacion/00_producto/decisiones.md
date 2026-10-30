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
- **Origen:** D-08. **Estado:** Aceptada. Sustituida en parte por ADR-049 (composición y tipografía del logotipo, logotipo como enlace).

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
  - Se crea una página de política de privacidad en una épica nueva, **E155 · Política de privacidad**. **Amplía ADR-007** (una épica por página), que pasa a cubrir 14 páginas; ADR-007 no se edita.
  - Slugs: `/es/privacidad` y `/en/privacy` (coherente con ADR-020).
  - El enlace a la política va en el **pie de todas las páginas**. No va en la navbar, que se mantiene sin cambios.
  - El formulario de contacto incorpora un **checkbox obligatorio** de aceptación de la política, con un enlace a ella.
  - El botón de envío **permanece siempre activo**. Si se intenta enviar sin marcar el checkbox, se muestra un error accesible asociado al checkbox, porque un botón deshabilitado no recibe foco ni explica el motivo.
  - La función de envío valida en el servidor que el consentimiento venga marcado y registra como evidencia la fecha y hora y la versión de la política aceptada (trazabilidad del consentimiento). No se usa base de datos ni dependencia nueva: la evidencia viaja en el correo que recibe Felipe.
  - La política cubre, en forma breve, todos los tratamientos del sitio: formulario de contacto, Turnstile, Calendly, Giscus (GitHub), el progreso guardado en el navegador (E130, ADR-023) y la preferencia de tema.
  - El texto de la política lo valida un especialista externo antes del cutover. Ninguna iteración lo presenta como asesoría legal.
- **Consecuencias:** se agregan E155 y E155-I01 (14 páginas, 28 con ambos idiomas). Se ajustan E30-I02 (mapa de rutas), E140 (checkbox, función de envío y constante única de versión de la política en E140-I02), E155-I01 (página y enlace en el pie de todas las páginas), E170 (totales y CSP), E180-I02 (sitemap: la política es indexable salvo que se decida `noindex`) y E190-I01 (precondiciones). Se mantiene el orden numérico: E140 no depende de E155 y E155 depende de E140-I02. La validación del especialista queda como pendiente de Felipe antes de E190 (BL-08). Si se agrega un servicio de terceros nuevo, la política se actualiza y cambia de versión.
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

## ADR-037 · D-14: Cloudflare Workers con assets estáticos
- **Contexto:** propuesta P-01. Verificado el 28-10-2026 en developers.cloudflare.com: Workers Builds permite elegir la rama de producción y activar o no las previews de otras ramas; `not_found_handling: "404-page"` sirve el `404.html` más cercano con estado 404; la carpeta `functions/` de Pages se compila o se reescribe; un Custom Domain exige borrar antes el CNAME existente y no cubre `www` por sí solo; el build image usa Node 24.22.1 por defecto y respeta `packageManager`. Detalle en `99_bitacora/2026-10-28_E10-I09.md`.
- **Decisión:**
  - Worker nuevo **`felipecuevas-dev`** con assets estáticos (`./dist`), conectado al repositorio por Workers Builds.
  - **Rama de producción del Worker: `migracion-astro`** hasta el cutover. Sin rutas ni dominio: solo responde en workers.dev. **Preview Builds desactivado.**
  - Build `pnpm build`; deploy `pnpm exec wrangler deploy` (sin `npx`, ADR-026).
  - `wrangler.jsonc` en la raíz: `name`, `compatibility_date`, `assets.directory` y `assets.not_found_handling: "404-page"`; sin `main`.
  - El proyecto Pages `felipe-cuevas-cv` sigue sirviendo producción desde `main` hasta E190-I02; sus previews pasan a "None".
  - Plan posterior: la función de contacto se reescribe como Worker en E140-I02 (con secretos cargados de nuevo); en E190-I02 la rama de producción pasa a `main`, se borra el CNAME del apex, se agrega el Custom Domain y `www` se resuelve con registro de relleno con proxy y redirección 301. Email Routing no se toca. Reversa: quitar el Custom Domain y devolver el dominio al proyecto Pages.
- **Consecuencias:** resuelve AT-042. AT-029 queda para E140-I02. Hasta E160-I01 no hay `404.html` en `dist/` y el Worker responde un 404 genérico. La URL de workers.dev es pública (AT-048).
- **Complemento (28-10-2026, antes del primer commit del ADR):** Felipe agregó a mano en `wrangler.jsonc` `"workers_dev": true` (la URL de workers.dev queda activa de forma explícita) y `"preview_urls": false` (sin URL de preview por versión). URL desplegada: https://felipecuevas-dev.felipe-cuevas.workers.dev (Node 24.22.1, pnpm 12.15.0, build sin errores).
- **Origen:** P-01, decisión de Felipe el 28-10-2026 (E10-I09). **Estado:** Aceptada.

## ADR-038 · Wrangler como devDependency exacta
- **Contexto:** Workers Builds usa el Wrangler de `package.json`; sin él, el deploy requeriría `npx` (ADR-026). Al 28-10-2026 la última versión es 4.154.0 (publicada el 27-10-2026, a menos de un día), que no cumple `minimumReleaseAge`.
- **Decisión:**
  - `wrangler` **4.153.0** exacta (`pnpm add -D -E`), publicada el 26-10-2026; cumple el mínimo de 4.135.0 y `minimumReleaseAge` sin excepciones.
  - Scripts de instalación: `esbuild` 0.28.2 y `workerd` 1.20261023.1 traen un `postinstall` que solo valida el binario o lo descarga si falta la dependencia opcional de la plataforma. Ambos binarios llegan como dependencias opcionales y se comprobó que funcionan sin el script. Se declaran **denegados** en `allowBuilds` (`esbuild: false`, `workerd: false`); `strictDepBuilds` sigue activo y `pnpm approve-builds` no informa pendientes.
  - El agente no ejecuta `wrangler` (deny en `.claude/settings.json`); solo lo usa Workers Builds.
- **Consecuencias:** si un build en Cloudflare falla por un binario no validado, se reevalúa aprobar el script con un ADR nuevo. Las subidas de versión respetan `minimumReleaseAge`.
- **Origen:** E10-I09, aprobada por Felipe el 28-10-2026. **Estado:** Aceptada.

## ADR-039 · Dirección visual: prototipos aprobados como referencia de DESIGN.md v1
- **Contexto:** E20-I01 preveía proponer dos o tres direcciones visuales. Felipe entregó el 29-10-2026 dos prototipos HTML del index (modo claro y modo oscuro) con su nueva identidad, que respetan la paleta original. Los prototipos incluyen secciones que el index no tiene (Trayectoria, Especialización y Contacto), un logotipo distinto del vigente, opciones de menú distintas de ADR-008, un hero que no cumple la lista de conservación de E40-I01 ni la matriz de ADR-016, contenido ficticio y dependencias externas (Google Fonts, Tailwind por CDN v3 y una foto de Unsplash).
- **Decisión:**
  - Los prototipos son la **referencia visual** de `DESIGN.md` v1. Se guardan en `_planificacion/20_epica-sistema-diseno/prototipos/` y no se publican ni se compilan.
  - `DESIGN.md` v1 los plasma y **prevalece sobre ellos** si difieren (ADR-010).
  - No son referencia de: el contenido (se toma de `main`), el logotipo (ADR-008 sigue vigente sin cambios), las opciones de la navbar (ADR-008), las secciones Trayectoria, Especialización y Contacto (patrones reservados que solo se reutilizan con aprobación de Felipe por página) ni sus dependencias externas.
  - El hero conserva el lenguaje visual del prototipo y se recompone para incluir todos los elementos de E40-I01 y cumplir ADR-016, sin eliminar ninguno (ADR-009).
  - `DESIGN.md` v1 lo redacta el asesor del proyecto y Felipe lo copia a la raíz. El agente no edita `DESIGN.md` (ADR-033 sin cambios); en E20-I01 lo verifica y cierra la documentación.
  - Educación: las franjas temáticas de ADR-036 reutilizan el tratamiento de la banda de cifras del prototipo.
- **Consecuencias:** se sustituye la tarea de E20-I01 "proponer dos o tres direcciones visuales". E20-I02 a E20-I05 se ajustan a `DESIGN.md` v1. AT-050 a AT-053 registran los problemas de los prototipos.
- **Origen:** decisión de Felipe el 29-10-2026. **Estado:** Aceptada.

## ADR-040 · Tonos de apoyo de la paleta
- **Contexto:** ADR-036 mantiene las paletas actuales. Los prototipos usan la escala `orient`, `primary`, `vibrant` y `accent-gold` originales, más `stone` `#F5F9FC` y `surface` `#001A26`, que no existen en `main:tailwind.config.js`, y dos tonos casi iguales a la escala original: `#00222F` (`orient-900` es `#00212F`) y `#00384F` (`orient-800` es `#003B51`).
- **Decisión:**
  - Se usan los valores originales `orient-900` y `orient-800` en lugar de `#00222F` y `#00384F`.
  - Se agregan dos tonos de apoyo: `stone` `#F5F9FC` (fondo alterno en claro) y `orient-925` `#001A26` (fondo alterno en oscuro; `surface` en el prototipo).
  - Se mantiene `gold-deep` `#7A5C00` (`accent-gold-deep` original) para el trazo de las estrellas en claro.
  - Reglas de contraste: texto con opacidad mínima del 60 %; foco `primary` en claro y `vibrant` en oscuro; `vibrant` y `gold` nunca son texto sobre fondo claro; avatares de iniciales sin `orient-400` de fondo.
- **Consecuencias:** amplía ADR-036 en lo referente a la paleta; ADR-036 no se edita. Los tokens y la tabla de contrastes están en `DESIGN.md` 4. Resuelve AT-051 al verificarse en E20-I01.
- **Origen:** decisión de Felipe el 29-10-2026. **Estado:** Aceptada.

## ADR-041 · Familias tipográficas
- **Contexto:** el sitio actual usa solo Lexend desde Google Fonts (AT-017). Los prototipos usan Cinzel para títulos y Josefin Sans para texto, también desde Google Fonts. `DESIGN.md` 3.2 exige Lexend 700 para el logotipo.
- **Decisión:**
  - **Cinzel** (OFL 1.1) en titulares y cifras, pesos 400, 500 y 600.
  - **Josefin Sans** (OFL 1.1) en texto, pesos 300, 400 y 600, y cursiva 300 y 400. Los párrafos van en 300, como en el prototipo.
  - **Lexend** 700 **solo** en el logotipo.
  - Las tres se autoalojan; ninguna se carga desde Google Fonts. El mecanismo de carga se decide en E20-I03 con su propio ADR.
- **Consecuencias:** el sitio carga tres familias; E20-I03 limita pesos y subconjuntos y mide el efecto en LCP frente a ADR-015. La legibilidad de Josefin Sans 300 en tamaños pequeños se revisa en E170-I01.
- **Origen:** decisión de Felipe el 29-10-2026. **Estado:** Aceptada. Sustituida en parte por ADR-049: Lexend se retira.

## ADR-042 · Tema oscuro por clase y semánticos como variables
- **Contexto:** E20-I02. `DESIGN.md` 9 pide la variante oscura por clase o atributo en `<html>` y semánticos que cambien de valor según el tema. El sitio actual usa la clase `dark` en `<html>` y guarda `theme` con los valores `dark` o `light` (`main:index.html:57-62`, `main:static/js/servicios/tema.js:56`).
- **Decisión:**
  - Variante `dark` por **clase** `.dark` en `<html>` (`@custom-variant dark (&:where(.dark, .dark *))`), con la misma clave y los mismos valores de `theme` (ADR-023). El script anti-parpadeo queda en E30-I01.
  - Los semánticos se declaran en `@theme` con su valor claro y el bloque `.dark` los redefine; los componentes no usan `dark:` para el color.
  - `--color-*: initial` anula la paleta de Tailwind: solo existen los tokens de `DESIGN.md` 4.1, más `black` (solo en sombras oscuras), `transparent` y `current`.
  - Las transparencias usan `color-mix(in srgb, …)`. `border-strong` usa 25 %, el extremo alto del rango 20–25 % de 4.2.
  - Contenedor `--container-page` (1.280 px, `max-w-page`); quiebre `--breakpoint-cards` (1.100 px).
  - Texturas de 4.5 como utilidades `texture-dots`, `texture-halo`, `texture-band` (en oscuro fija `kicker` dorado), `texture-frame` y `texture-portrait`. La máscara del campo de puntos se desvanece del 30 % al 75 % (4.5 no fija el alcance).
  - Muestra interna en `/es/muestra-diseno/` y `/en/design-sample/` con `noindex, nofollow`; E180-I02 la excluye del sitemap.
- **Consecuencias:** E30-I01 solo agrega o quita la clase `dark`. Todo color nuevo exige un token en `DESIGN.md`.
- **Origen:** E20-I02, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026).

## ADR-043 · Fuentes con la API de fuentes de Astro (proveedor local) e íconos SVG propios
- **Contexto:** E20-I03, ADR-041. Verificado el 29-10-2026 en https://docs.astro.build/en/guides/fonts/, https://docs.astro.build/en/reference/configuration-reference/ y https://docs.astro.build/en/reference/font-provider-reference/: la API de fuentes es estable desde astro@6.0.0 (opción `fonts` de primer nivel), tiene proveedor local `fontProviders.local()`, el componente `<Font />` de `astro:assets` con `preload` filtrable, genera respaldos métricos a partir del último respaldo genérico y copia los archivos a `_astro/fonts`. AT-016: el sitio actual carga Material Symbols completo para unos 57 íconos.
- **Decisión:**
  - **Fuentes:** API de fuentes de Astro con `fontProviders.local()`, sin dependencias nuevas. Archivos WOFF2 **variables**, subconjunto latino (U+0000–00FF y signos comunes; cubre á é í ó ú ü ñ ¿ ¡), descargados una sola vez del repositorio de Google Fonts y versionados en `src/assets/fonts/` con su `OFL-*.txt`. Ni el build ni el sitio hacen solicitudes externas.
    - Cinzel: un archivo variable acotado a `400 600` (cubre 400, 500 y 600), 25,3 KB.
    - Josefin Sans: normal `300 600` (27,9 KB) y cursiva `300 400` (30,4 KB).
    - Lexend: 700 (14,5 KB), solo para el logotipo.
    - Total: 98 KB.
  - **Respaldos:** Georgia → `serif` (Cinzel), `system-ui` → `sans-serif` (Josefin) y `sans-serif` (Lexend), con `optimizedFallbacks` activo (Astro genera `size-adjust` y los ajustes de ascendente y descendente contra CLS). `font-display: swap`.
  - **Precarga:** solo Josefin normal (texto) y Cinzel (h1). Lexend y la cursiva no se precargan; E30-I03 reevalúa Lexend si el logotipo produce CLS o un FOUT visible.
  - Tokens `--font-display`, `--font-sans` y `--font-logo` apuntan a las variables que genera Astro. `<Font />` va en el `<head>`; E30-I01 lo traslada al `BaseLayout`.
  - **Íconos:** componente `src/components/ui/Icon.astro`, decorativo por defecto (`aria-hidden`, `focusable="false"`) y con `label` opcional (`role="img"`). Datos en `src/components/ui/icons.ts`: íconos de línea **propios** en retícula de 24 px y trazo de 1,6 px (DESIGN.md 7.14), y los 5 SVG de marca del sitio actual (LinkedIn, GitHub, REUF, correo y Discord, tomados de `main:index.html`), con `currentColor`.
  - **Inventario:** el conjunto base cubre los íconos de sistema de `DESIGN.md` 7 (menu, close, chevron-down, flechas, download, external-link, sun, moon, check, info, alert, star y mail). Los íconos propios de cada página del inventario de Material Symbols (`school`, `verified`, `workspace_premium`, `history_edu`, `groups`, `event_*`, `forum`, `terminal`, etc.) se dibujan en la épica de esa página y se agregan a `icons.ts`. Ninguna página carga Material Symbols.
- **Consecuencias:** resuelve AT-016 y AT-017. Cada épica de página suma sus íconos al mismo módulo. Una actualización de las fuentes exige descargar de nuevo y actualizar este ADR.
  - Nota (ADR-044): el SVG de marca de Discord se retiró de `icons.ts`; las redes de marca son 4 (LinkedIn, GitHub, REUF y correo). 
- **Origen:** E20-I03 y E20-I04, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026).

## ADR-044 · Discord sale de las redes del sitio
- **Contexto:** `DESIGN.md` v1 (ADR-039) y el sitio actual listan 5 redes: LinkedIn, GitHub, REUF, correo y Discord. Felipe Cuevas decide dejar de publicar el vínculo a Discord.
- **Decisión:**
  - Las redes del sitio son 4: LinkedIn, GitHub, REUF y correo.
  - Se retiran el enlace, el ícono y toda mención en texto de un servidor o canal de Discord, en el sitio nuevo y en la planificación.
  - Se retira el SVG de Discord de `Icon.astro` y de la página de muestra.
- **Consecuencias:** modifica `DESIGN.md` 7 (tabla), 7.4 (riel) y 7.9 (pie), que Felipe edita a mano (ADR-033). Ajusta E30-I06, E40-I01 y la visión de producto. La comunidad conserva eventos, foro (GitHub Discussions) y recursos. No se edita ADR-039.
- **Origen:** decisión de Felipe el 29-10-2026. **Estado:** Aceptada.

## ADR-045 · Movimiento sin AOS: aparición con IntersectionObserver y CSS
- **Contexto:** E20-I04. AT-018 (AOS sin mantenimiento) y AT-040 (guardián en línea de 1.500 ms que revela todo si AOS no arranca). `DESIGN.md` 8: sin animaciones de entrada en Inicio, contenido visible sin JavaScript, sin CLS, respeto de `prefers-reduced-motion` y tokens de duración y curva.
- **Decisión:**
  - **Utilidad de aparición:** módulo `src/scripts/reveal.ts` (`initReveal()`) con `IntersectionObserver` y atributo `data-reveal`. Sin dependencias.
  - **Visible por defecto:** el CSS solo oculta `[data-reveal]` cuando `<html>` tiene la clase `reveal-ready`, que pone el propio script. Sin JavaScript, sin `IntersectionObserver` o si el script falla, nada queda oculto, así que no hace falta guardián.
  - **Sin parpadeo:** lo que ya está en pantalla al iniciar se marca visible antes de activar el modo.
  - **Movimiento:** opacidad y 4 px con `translate` (dentro del rango de 2 a 4 px de `DESIGN.md` 8), duración `--duration-slow` y curva `--ease-out-soft`. `translate` no desplaza el layout, así que no suma CLS.
  - **Movimiento reducido:** el script no se activa, y una regla global anula transiciones, animaciones y desplazamiento suave. El desplazamiento suave entre anclas solo se aplica con `no-preference`.
  - **Inicio:** no importa el módulo ni usa `data-reveal` (`DESIGN.md` 8). Las páginas que lo necesiten lo importan en su épica.
  - **Tokens:** `@theme static`, para que se emitan todas las variables aunque ninguna clase las use (la muestra y los estilos en línea las leen; ver AT-055).
- **Consecuencias:** resuelve AT-018 y la parte de movimiento de AT-040. El script de tema único del `<head>` sigue en E30-I01. No se vuelve a usar AOS.
  - Punto de prueba: confirmar en la primera página que use `data-reveal` que, al imprimir, ningún bloque queda oculto.
- **Origen:** E20-I03 y E20-I04, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026).

## ADR-046 · Primitivas de componentes y variables de componente por tema
- **Contexto:** E20-I05. `DESIGN.md` 7.3, 7.6 y 7.7 fijan valores distintos por tema que no equivalen a un semántico de 4.2: fondo de hover del botón de ícono, colores de la flecha, contorno de la tarjeta en oscuro, colores de la etiqueta y trazo de la estrella. La sección 9 prohíbe `dark:` para el color.
- **Decisión:**
  - **Primitivas** en `src/components/ui/`, sin JavaScript de cliente:
    - `Container`, `GoldRule`, `Tag`, `SectionHeader` (`left`, `center` y `band`, con `level` para no saltar niveles), `Button` (`primary`, `secondary` y `gold`; enlace o `<button>`; `size="bar"` de 44 px), `IconButton` (`icon` 44 × 44 y `arrow` 54 × 54, con `label` obligatorio), `Card`, `TestimonialCard`, `Band`, `ThemeStripe` y `ExternalLink`;
    - estilos con `<style>` acotado al componente y solo variables de tokens.
  - **Variables de componente:**
    - Se declaran en `global.css` (`:root` y `.dark`) con valores tomados de la paleta y de `DESIGN.md` 7: `--button-primary-*`, `--button-icon-hover-bg`, `--button-arrow-hover-*`, `--card-outline*`, `--chip-*` y `--star-stroke`. No son tokens nuevos de diseño: traducen a CSS los valores por tema que `DESIGN.md` ya fija.
    - **Convención de nombre:** `--<componente>-<propiedad>[-<estado>]`, en inglés (ADR-025).
    - **Regla de origen:** solo se declara una variable de componente cuando `DESIGN.md` 7 fija un valor por tema que no equivale a un semántico de 4.2, y el comentario de la variable cita la sección de `DESIGN.md` de la que sale. Si el valor sí equivale a un semántico, se usa el semántico.
    - **Alcance:** una variable de componente no se reutiliza en otro componente. Un color nuevo, con o sin variable, exige primero su entrada en `DESIGN.md`.
  - **Equivalencias con semánticos:**
    - el primario usa `text` y `bg` invertidos (claro `orient-950`/blanco, oscuro `orient-50`/`orient-950`) y `accent` al pasar;
    - el texto del secundario al pasar usa `heading`.
  - **Foco global:** `:focus-visible` con 2 px `focus` y 2 px de separación (7.3).
  - **Franja temática:** `reverse` reordena las zonas con la grilla desde 1.024 px; el HTML siempre va título → contenido. Proporción 5/12 y 7/12, y fondo `band` (retícula) o `bg`.
  - **Testimonio:** en `en-US` agrega "Translated from Spanish" (ADR-017); la nota de 5 estrellas va en texto para lectores de pantalla.
  - **Enlace externo:** se usa sobre `bg` o `surface`. Sobre `band` lleva `text` y no `accent`, porque es texto pequeño (4.3).
  - **Impresión:** `[data-reveal]` siempre visible en `@media print` (punto de prueba de ADR-045).
- **Consecuencias:** resuelve AT-052. Amplía ADR-042 sin modificarlo: los semánticos siguen siendo la vía principal y las variables de componente son la excepción acotada. Riel social, selector de idioma, botón de apariencia, navbar, pie, formularios, aviso y carrusel se construyen en E30, E40 y E140 sobre estas primitivas, con la misma regla de origen. `DESIGN.md` 9 lo reconoce en una oración.
- **Origen:** E20-I05, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026).

## ADR-047 · Dominio del sitio y barra final en todas las rutas
- **Contexto:** E30-I01. `canonical`, `hreflang` y `og:url` necesitan URL absolutas, y cada página debe tener una sola forma de URL. Astro genera `dist/<ruta>/index.html` (formato `directory`).
- **Decisión:**
  - `site: 'https://felipecuevas.dev'` en `astro.config.mjs`: base de toda URL absoluta (`Astro.site`).
  - `trailingSlash: 'always'`: toda ruta termina en barra (`/es/`, `/en/design-sample/`), coherente con el formato `directory` y con lo que sirven los assets estáticos de Cloudflare.
  - `canonical`, `hreflang` (es-CL, en-US, x-default → versión `/es/`, ADR-019) y `og:url` se escriben siempre con barra final.
- **Consecuencias:** los enlaces internos se escriben con barra final; en desarrollo, una ruta sin barra da 404. El mapa de rutas de E30-I02 y las 301 de E180-I01 usan la misma forma.
- **Origen:** E30-I01, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026).

## ADR-048 · Diccionario de interfaz, mapa de rutas y colecciones bilingües
- **Contexto:** E30-I02. ADR-001 exige paridad es-CL / en-US; ADR-020 deja el cierre del mapa de slugs para esta iteración; AT-026 pide un modelo de contenido con validación de paridad.
- **Decisión:**
  - **Idiomas** en `src/i18n/lang.ts`: claves `es` y `en`, códigos `es-CL` / `en-US` y `es_CL` / `en_US`.
  - **Diccionario** en `src/i18n/ui.ts`: textos del armazón (skip link, navegación de `DESIGN.md` 2.1, apariencia, idioma, pie y volver arriba). El tipo de `en` se deriva de `es`: si falta o sobra una clave, `pnpm check` falla. Se lee con `useTranslations(lang)`.
  - **Mapa de rutas** en `src/i18n/routes.ts`, validado por Felipe: las 12 páginas navegables del área L de la auditoría más `/es/privacidad/` ↔ `/en/privacy/` (ADR-035), todas con barra final (ADR-047) y sin `.html` (AT-005). `getRoute`, `routePaths`, `routeKeyFromPath` y `getEquivalentPath`. Al construir se valida prefijo de idioma, barra final, ausencia de `.html` y unicidad; un error rompe `pnpm build`. Las páginas internas (muestra de tokens) van en `internalRoutes`, fuera de la navegación.
  - **404:** no entra al mapa porque no es una URL navegable; `getEquivalentPath` de una ruta desconocida devuelve la portada del otro idioma. La 404 por idioma se resuelve en E160-I01.
  - **Colecciones** en `src/content.config.ts` (API de colecciones de Astro, sin dependencias nuevas): todo texto visible se declara con `localized()`, un objeto `{ es, en }` estricto con ambos idiomas obligatorios y no vacíos. Una entrada incompleta hace fallar `pnpm build`. Primera colección: `pages` (título y descripción de SEO por clave de ruta), con la portada.
  - `BaseLayout` recibe `route` (clave del mapa) en lugar de rutas escritas a mano.
- **Consecuencias:** cada épica de página agrega su colección con `localized()` y su entrada en `pages`. Los textos `en-US` del diccionario los redacta el agente y Felipe los valida (ADR-017). Cambiar un slug del mapa después del cutover exige 301 (ADR-020).
- **Origen:** E30-I02, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026), incluidos la exclusión de la 404 del mapa y los textos `en-US` del diccionario.

## ADR-049 · Logotipo en dos renglones y enlace a la portada
- **Contexto:** E30-I03. Felipe rediseñó la composición del logotipo en `DESIGN.md` 3: el nombre pasa a ser fijo y las frases rotan debajo. ADR-008 exigía un logotipo idéntico al actual, y la propuesta P-03 (logotipo como enlace) estaba pendiente.
- **Decisión:**
  - **Sustituye en parte a ADR-008** en lo que toca al logotipo. Se conservan el ícono (`main:static/img/favicon.svg` como máscara de 32 × 32), sus colores (`orient-600` / `orient-400`, 300 ms), la separación de 12 px y el ritmo del efecto (1.400 / 84 + 0–34 / 42 / 3.600 / 500 ms).
  - Cambian la composición y la tipografía:
    - renglón 1, "Felipe Cuevas" fijo en Cinzel;
    - renglón 2, frases con máquina de escribir en Josefin Sans, oculto bajo 640 px.
    - Las frases son "Instructor Dev", "Dev Full Stack" e "Instructor IA" en `es-CL`; en `en-US` las propone el agente y las valida Felipe.
  - **Acepta P-03:** el logotipo es un enlace a la portada del idioma activo (`getRoute('home', lang)`), con nombre accesible "Felipe Cuevas, inicio" / "Felipe Cuevas, home".
  - El nombre usa el semántico `heading`, que da los valores que fija `DESIGN.md` 3.2 (`#00131D` / `#FFFFFF`; ver AT-057).
  - **Lexend se retira:** sin uso tras el cambio, sale de `astro.config.mjs`, de `src/assets/fonts/` (archivo y licencia), del `<Font />` de `BaseLayout` y de `--font-logo`. Sustituye en parte a ADR-041 (Lexend solo en el logotipo) y a ADR-043 (tres familias). El sitio carga dos familias. `DESIGN.md` 5.1 y 9 aún la nombran (AT-058).
  - **Motor reutilizable** `src/scripts/typewriter.ts`, sin dependencias, para el logotipo y el hero (E40-I01):
    - cada frase se copia invisible en la misma celda, para reservar el ancho de la más ancha;
    - el cursor se dibuja como fondo del texto, lo que deja CLS 0;
    - pausa con la pestaña oculta o fuera de pantalla;
    - con movimiento reducido o sin JavaScript queda la primera frase fija.
- **Consecuencias:**
  - Resuelve AT-009. AT-003 avanza: un único componente en el layout; la 404 lo recibe en E160-I01.
  - Cualquier cambio del ícono, sus colores o el ritmo exige un ADR que sustituya a este (`DESIGN.md` 3.5).
  - ADR-008 sigue vigente para la barra de navegación.
- **Origen:** E30-I03, 29-10-2026; composición decidida por Felipe en `DESIGN.md` 3. **Estado:** Aceptada (validada el 29-10-2026), incluidas las frases `en-US`.

## ADR-050 · El CV vive en `public/static/` con la misma URL
- **Contexto:** AT-059. "Descargar CV" enlaza a `/static/CV_Felipe_Cuevas_2026.pdf` (URL de producción), pero Astro no copiaba el archivo al build y las previews daban 404.
- **Decisión:** el PDF se copia sin cambios a `public/static/CV_Felipe_Cuevas_2026.pdf`. Astro publica `public/` tal cual en la raíz de `dist/`, así que la URL no cambia y no hace falta 301. El original en `static/` no se toca (sitio antiguo, referencia de solo lectura hasta E190-I03). El CV sigue solo en español (ADR-017).
- **Consecuencias:** `public/static/` solo contiene lo que el sitio nuevo sirve con su URL de siempre; cada épica de página agrega allí lo que necesite (por ejemplo, los PDFs de recursos en E130-I02). Hasta E190-I03 el archivo existe duplicado en `static/` y en `public/static/`.
- **Origen:** E30-I05, 29-10-2026. **Estado:** Aceptada (decidida por Felipe el 29-10-2026).

## ADR-051 · Menú móvil: tema e idioma pasan al panel bajo 420 px
- **Contexto:** E30-I05. `DESIGN.md` 7.2 oculta bajo 1.280 px solo el menú y "Descargar CV", y deja en la barra el botón de apariencia y el selector de idioma. El logotipo (vinculante, `DESIGN.md` 3) ocupa unos 156 px, el selector de idioma 91 px y cada botón 44 px: con el botón de menú, la barra necesita unos 400 px y a 360 y 390 px desborda.
- **Decisión:**
  - Desde 420 px, tema e idioma van en la barra, junto al botón de menú (como en `DESIGN.md` 7.2).
  - Bajo 420 px van al final del panel del menú, después de "Descargar CV", separados por una línea `border`.
  - Es el mismo componente en dos lugares, y solo uno se muestra a la vez (el otro queda con `display: none`, fuera del árbol de accesibilidad). Los botones de tema se sincronizan entre sí.
  - El logotipo no cambia ni se achica. El selector de idioma mantiene sus 44 px.
  - Alternativa descartada: llevar tema e idioma al panel en todos los anchos. Eso vaciaría la barra en tableta (768 px) sin necesidad.
- **Consecuencias:** `DESIGN.md` 7.2 no menciona esta excepción; queda como AT-061 para que Felipe la incorpore. El umbral de 420 px se midió con el logotipo en español y en inglés (ocupan lo mismo); si el logotipo cambia, se revisa.
- **Origen:** E30-I05, 29-10-2026. **Estado:** Aceptada (validada el 29-10-2026).

## ADR-052 · Pie: navegación, redes y volver arriba
- **Contexto:** E30-I06. `DESIGN.md` 7.9 deja a esta iteración cerrar la lista exacta de enlaces de navegación, y 7.11 define el botón de volver arriba.
- **Decisión:**
  - **Navegación:** los 11 enlaces del menú, en su orden y con las etiquetas de `nav-items.ts` (Inicio, Educación, Resumen, Desarrollador, Docente Universitario, Instructor REUF, Talento Digital, Eventos, Foro, Recursos, Contacto), en una sola lista. Incluye Recursos (AT-008).
  - **Redes (ADR-044):** LinkedIn, GitHub, REUF y correo. Las URL son las del sitio antiguo: LinkedIn, GitHub y correo, de su pie; REUF, de su riel social (`main:index.html:618`), porque el pie antiguo no la traía. Las tres externas abren en pestaña nueva con `rel="noopener noreferrer"` y aviso para lectores de pantalla. El correo muestra la dirección.
  - **Frase de la marca (decidida por Felipe):** es "Instructor de Desarrollo Fullstack e IA." (40 caracteres); en "Teaching AI and Fullstack Development." (38).
  - **Marca del pie:** el `Logo` con `animated={false}`: ícono y nombre, sin frases ni efecto.
  - **Barra inferior:** "© año Felipe Cuevas". El año se imprime en el build y un script lo actualiza al del visitante. Reserva un contenedor de la altura de una línea para el enlace a la política de privacidad, que llega con E155-I01 (ADR-035); por ahora no se enlaza.
  - **Volver arriba:** enlace `#top` con estilo de la flecha del carrusel y 44 × 44 px, fijo a 24 px del borde inferior derecho (más la zona segura). Aparece tras desplazarse una pantalla. Con movimiento reducido el desplazamiento es instantáneo; al terminar, el foco pasa al logotipo para no perderse cuando el botón se oculta. Sin JavaScript queda siempre visible.
  - **Pie al fondo:** `BaseLayout` hace que el `<main>` ocupe el alto sobrante, así que con contenido corto el pie queda al borde inferior de la ventana.
- **Consecuencias:** resuelve AT-008. El pie de escritorio mide unos 740 px por la lista de 11 enlaces (AT-062). E155-I01 agrega el enlace de privacidad en el contenedor reservado, sin tocar el resto.
- **Origen:** E30-I06, 29-10-2026. **Estado:** Aceptada (validada por Felipe el 29-10-2026).

---

## Propuestas pendientes (no vinculantes hasta ser aceptadas)

### P-01 · D-14: Cloudflare Pages o Workers con assets estáticos
- **Estado:** Sustituida por ADR-037 (28-10-2026).
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
- **Estado:** Aceptada el 29-10-2026. Ver ADR-049.
- **Propuesta:** el logotipo pasa a ser un enlace a la portada del idioma activo, sin cambiar su apariencia ni su animación. Requiere aprobación porque ADR-008 exige comportamiento idéntico.

### P-04 · Reglas derivadas de AGENTS.md
- **Estado:** Aceptada el 24-10-2026 con ajustes. Ver ADR-026.
- **Contenido:** las reglas marcadas como "derivada" en `AGENTS.md`: no reescribir historial ni eliminar ramas; no usar npm, yarn ni bun; no agregar dependencias sin ADR; no tocar la configuración de despliegue sin consultar; no borrar entradas de la auditoría ni revertir ADR sin una entrada nueva que lo sustituya.
- **Vigencia:** reemplazada por ADR-026.

### P-05 · Marca "fecudev"
- **Estado:** Pendiente (BL-05).
- **Contexto:** el término no aparece en el sitio actual.
- **Propuesta:** tratarlo como nombre de la comunidad (foro, eventos, recursos y Discord) en textos de contenido, sin cambiar la etiqueta "Comunidad" del menú (ADR-008).
