# E200-I01 · Preparación estructural: preview por rama, workers.dev, navegador y documentos
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E190-I04 · **Hallazgos que cierra:** AT-048 (si el paso 9b sigue pendiente) · **ADR relacionados:** ADR-012, ADR-026, ADR-033, ADR-037, ADR-056, ADR-097, ADR-101, ADR-102

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Dejar listo todo lo estructural para que las iteraciones siguientes de E200 sean solo cambios visuales: preview por rama, workers.dev apagado sin perder la preview, un navegador para que el agente revise solo y los documentos al día tras el cutover. No cambia nada visible del sitio.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El cutover se hizo con el merge `d58393c` (15-11-2026). Producción la sirve el Worker `felipecuevas-dev` desde `main`; `migracion-astro` cumplió su función.
- `wrangler.jsonc` hoy: `"workers_dev": true` y `"preview_urls": false`. El comentario de cabecera aún dice «hasta el cutover».
- Documentación oficial de Cloudflare consultada el 16-11-2026 (se vuelve a leer al ejecutar la iteración, con su fecha):
    - página «Preview URLs»: si `preview_urls` no se declara, toma el valor de `workers_dev`; las preview URL solo existen en el subdominio workers.dev;
    - página «workers.dev»: al desplegar con `workers_dev: false` se apaga la ruta workers.dev, y las preview URL siguen ese valor salvo que se declaren de forma explícita.
    - **Conclusión (a confirmar en la preview):** `"workers_dev": false` y `"preview_urls": true` explícito pueden convivir; el paso 9b de E190 no apaga la preview si `preview_urls` se declara.
- **Inferencia no verificada:** `preview_urls` es un ajuste del Worker que se aplica en cada despliegue. Si `main` siguiera con `false`, cada despliegue de producción apagaría la preview de nuevo. Por eso el bloque llega a `main` por una rama corta y no al final de la épica.
- Procedimiento de cutover: `190_epica-cutover/E190-I02-procedimiento-cutover.md`, paso 9 y sección 7.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- Se crea E200 como épica abierta (ADR-104, sustituye en parte a ADR-056).
- Rama de trabajo `ajustes-visuales` desde `main`; el agente queda autorizado a crearla.
- `preview_urls` en `true` para revisar cada cambio en la rama antes del merge a `main`.
- El agente revisa con un navegador real (hover, foco, temas, anchos), no solo con capturas estáticas.
- E200-I01 solo prepara el terreno; los ajustes visuales empiezan en E200-I02.

## Alcance
- Registrar ADR-104, ADR-105 y ADR-106, y agregar E200 a `_planificacion/README.md` y a `registro-log.md`.
- Bloque de `wrangler.jsonc` para Felipe (ADR-033) y guía del panel de Cloudflare para los builds de ramas que no son `main`.
- Comprobar en vivo la convivencia de workers.dev apagado con la preview de rama (cierra el paso 9b si seguía pendiente).
- Navegador para el agente: Playwright MCP declarado en `.mcp.json` (ADR-106) y prueba de uso.
- `README.md` de la raíz al día tras el cutover; bloques para `AGENTS.md` y `.claude/settings.json`.

## Fuera de alcance
- Cualquier cambio visible del sitio (empieza en E200-I02).
- `DESIGN.md`: no cambia en esta iteración; sus bloques llegan con las iteraciones siguientes.
- Proteger la preview con Cloudflare Access, salvo que la tarea 4 lo exija (se decide ahí, con ADR propio).

## Tareas
- [ ] **ADR y registro:** verificar el último ADR y el último AT; registrar ADR-104, ADR-105 y ADR-106 con el texto de la sección «ADR a registrar»; agregar E200 a `_planificacion/README.md` y a `registro-log.md` (21 épicas, 78 iteraciones, E200 abierta).
- [ ] **Rama:** crear `ajustes-visuales` desde `main` actualizado (autorización del 16-11-2026) y confirmar con `git branch --show-current`.
- [ ] **Bloque de `wrangler.jsonc` (ADR-033, ADR-105):** entregar a Felipe el bloque de la sección «Bloque para Felipe». Felipe crea una rama corta desde `main` (por ejemplo `config-preview-urls`), lo aplica, la mergea a `main` y después actualiza `ajustes-visuales` desde `main`. Si el paso 9b ya se hizo, el bloque solo agrega `preview_urls`.
- [ ] **Panel (lo ejecuta Felipe):** Worker `felipecuevas-dev` > Settings > Build > Branch control: activar los builds de ramas que no son producción (al menos `ajustes-visuales`). El agente entrega los pasos según la documentación vigente y Felipe confirma con capturas.
- [ ] **Comprobación en vivo (el agente, con `Invoke-WebRequest` o el navegador):** (a) `https://felipecuevas.dev/es/` en 200; (b) `https://felipecuevas-dev.felipe-cuevas.workers.dev/` deja de responder el sitio; (c) la URL de rama `ajustes-visuales-felipecuevas-dev.felipe-cuevas.workers.dev` (nombre exacto según el panel) responde 200 en `/es/` y `/en/`; (d) registrar si la preview trae `X-Robots-Tag: noindex`. Si no lo trae, detenerse y proponer a Felipe Cloudflare Access o aceptar el riesgo.
- [ ] **Navegador (ADR-106):** crear `.mcp.json` en la raíz con Playwright MCP en versión exacta que cumpla `minimumReleaseAge` (ADR-097), ejecutado con `pnpm dlx` (sin agregarlo a `package.json`); entregar a Felipe el bloque de permisos para `.claude/settings.json`; probarlo en local y en la URL de rama: cambiar de tema e idioma, pasar el puntero sobre un enlace del pie, navegar con Tab y capturar 360 y 1.920 px.
- [ ] **Documentos posteriores al cutover:** actualizar el `README.md` de la raíz (producción en el dominio propio, rama `ajustes-visuales`, preview de rama, revisión con navegador); entregar en la bitácora los bloques exactos de `AGENTS.md` (sección 2: rama, producción y preview; sección 3: uso de `.mcp.json`; números de AT y ADR vigentes) y de `.claude/settings.json`.
- [ ] **Verificación y cierre:** DoD, `git diff --stat` antes y después de editar documentos, bitácora y commit sugerido.

## Bloque para Felipe (`wrangler.jsonc`, rama corta desde `main`)
Reemplaza el archivo completo por:

```jsonc
// Worker de felipecuevas.dev con assets estáticos (ADR-037) y función de contacto (ADR-084).
// "main" solo atiende /api/* (run_worker_first); el resto lo sirven los assets de dist/.
// El binding ASSETS permite al Worker devolver los assets fuera de /api/* (ADR-085).
// Producción en el dominio propio; workers.dev apagado (paso 9b de E190) y URL de preview
// por rama activas en workers.dev para revisar antes del merge a main (ADR-105).
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "felipecuevas-dev",
  "main": "./src/worker/index.ts",
  "compatibility_date": "2026-10-23",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "404-page",
    "run_worker_first": ["/api/*"],
  },
  "workers_dev": false,
  "preview_urls": true,
}
```

Reversa: `"workers_dev": true` y `"preview_urls": false`, por la misma vía (rama corta, merge y despliegue de Workers Builds).

## Archivos previstos (crear / modificar)
- Crear: `.mcp.json`.
- Modificar: `README.md` (raíz), `_planificacion/README.md`, `_planificacion/00_producto/registro-log.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md` (si hay hallazgos) y los archivos de E200.
- Felipe: `wrangler.jsonc` (rama corta), `AGENTS.md` y `.claude/settings.json` (bloques de la bitácora).

## Criterios de aceptación (verificables)
- [ ] `ajustes-visuales` existe, parte de `main` posterior al merge de la rama corta y es la rama activa.
- [ ] `main` contiene `"workers_dev": false` y `"preview_urls": true`; producción responde 200 en `/es/` y `/en/`; workers.dev de producción ya no sirve el sitio.
- [ ] Un push a `ajustes-visuales` genera su URL de preview y responde 200 en `/es/` y `/en/` (URL anotada en la bitácora).
- [ ] Queda registrado si la preview lleva `noindex` y, si no, la decisión de Felipe.
- [ ] El agente usó el navegador en local y en la preview: tema, idioma, hover, Tab y dos anchos, con la evidencia en la bitácora.
- [ ] `README.md` actualizado y bloques de `AGENTS.md` y `.claude/settings.json` entregados.
- [ ] `dist/` sin cambios visibles: mismos archivos `.html` que la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n`, `pnpm verify:seo` y `pnpm check:redirects` sin errores.
- `pnpm check:redirects --base https://felipecuevas.dev` sin fallos.
- Comprobaciones en vivo de la tarea 5 y prueba del navegador de la tarea 6.

## ADR a registrar (texto para `decisiones.md`)

### ADR-104 · Épica abierta de ajustes visuales posterior al cutover (sustituye en parte a ADR-056)
- **Contexto:** ADR-056 descartó una épica de arreglos (E165) porque duplicaba a E170 y las épicas de página seguían abiertas. Con el cutover hecho (merge `d58393c`, 15-11-2026), todas las épicas de página están cerradas, el sitio está en producción y Felipe encuentra ajustes visuales transversales y por página.
- **Decisión (de Felipe, 16-11-2026):**
    - Se crea **E200 · Ajustes visuales** (`200_epica-ajustes-visuales/`). E200-I01 es estructural; desde E200-I02, una iteración por tema transversal o por página, agregada al final cuando Felipe entrega los ajustes.
    - Las iteraciones cerradas y sus bitácoras no se editan (se mantiene de ADR-056).
    - La épica queda **abierta** hasta que Felipe la cierre de forma expresa.
    - Todo ajuste se aplica en `es-CL` y `en-US`.
    - Rama `ajustes-visuales` desde `main`; merge a `main` por lotes aprobados en la preview; tras cada merge, Felipe actualiza la rama desde `main`.
- **Sustituye en parte:** ADR-056 en «No se crea una épica de arreglos», solo para el trabajo posterior al cutover.
- **Consecuencias:** el plan pasa a 21 épicas y 78 iteraciones; el contador crece con cada iteración que se agregue a E200. `AGENTS.md` cambia la rama de trabajo (bloque en la bitácora).
- **Origen:** decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

### ADR-105 · URL de preview por rama y workers.dev apagado (complementa ADR-101)
- **Contexto:** sin preview, cada merge a `main` sale directo a producción. `wrangler.jsonc` tiene `"preview_urls": false` y el paso 9b de E190 apaga workers.dev. La documentación oficial (16-11-2026) indica que `preview_urls` toma el valor de `workers_dev` si no se declara y que las preview URL solo existen en workers.dev.
- **Decisión (de Felipe, 16-11-2026):** `"workers_dev": false` y `"preview_urls": true` explícito. Los builds de ramas que no son producción se activan en Workers Builds. El cambio llega a `main` por una rama corta (ADR-101), no al final de E200.
- **Consecuencias:** cada rama tiene su URL `<rama>-felipecuevas-dev.felipe-cuevas.workers.dev`, pública para quien tenga el enlace. Si no trae `noindex`, Felipe decide entre aceptar el riesgo o protegerla con Cloudflare Access (ADR nuevo). Cierra el paso 9b de E190 si seguía pendiente.
- **Origen:** E200-I01, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

### ADR-106 · Navegador para los agentes: Playwright MCP
- **Contexto:** la revisión visual de E200 exige estados que una captura estática no muestra (hover, foco, cambio de tema e idioma) en varios anchos. Felipe pidió que el agente revise solo con un navegador.
- **Decisión (de Felipe, 16-11-2026):** Playwright MCP declarado en `.mcp.json` de la raíz, en versión exacta que cumpla `minimumReleaseAge` (ADR-097), ejecutado con `pnpm dlx` (ADR-003). No se agrega a `package.json` ni al lockfile. Los permisos del servidor MCP los agrega Felipe en `.claude/settings.json`.
- **Consecuencias:** el agente revisa en local y en la URL de rama con la matriz de la épica; las capturas no se versionan. Antigravity usa su navegador propio con la misma matriz. Una herramienta distinta exige un ADR nuevo.
- **Origen:** E200-I01, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- **Inferencia por verificar:** que un despliegue de producción con `preview_urls: false` apague la preview. El bloque llega a `main` antes de trabajar en la rama, así que el riesgo queda cubierto aunque la inferencia sea falsa.
- El nombre exacto de la URL de rama lo da el panel; puede truncarse o normalizarse.
- En Windows, `.mcp.json` podría necesitar `cmd /c` para ejecutar `pnpm`; se confirma en la prueba de la tarea 6.
- El paso 9b vivía en E190. Si E190-I04 lo cerró antes, esta iteración solo agrega `preview_urls` y lo anota.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
