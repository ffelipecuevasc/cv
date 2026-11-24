# E200-I01 · Preparación estructural: preview por rama, workers.dev, navegador y documentos
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E200-I00 · **Hallazgos que cierra:** AT-100 y AT-147 (si la decisión sobre Turnstile se toma aquí). AT-048 y el paso 9b ya están resueltos (E190-I04) · **ADR relacionados:** ADR-012, ADR-026, ADR-033, ADR-037, ADR-056, ADR-097, ADR-101, ADR-102

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Dejar listo todo lo estructural para que las iteraciones siguientes de E200 sean solo cambios visuales: preview por rama, workers.dev apagado sin perder la preview, un navegador para que el agente revise solo y los documentos al día tras el cutover. No cambia nada visible del sitio.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El cutover se hizo con el merge `d58393c` (15-11-2026). Producción la sirve el Worker `felipecuevas-dev` desde `main`; `migracion-astro` cumplió su función.
- `wrangler.jsonc` hoy (`wrangler.jsonc:17`, verificado el 24-11-2026): `"workers_dev": false` y **sin** `preview_urls` declarado. El paso 9b se cerró en E190-I04 (workers.dev responde 404 `text/plain`, AT-048 resuelto) y el comentario de cabecera ya se corrigió.
- Con `workers_dev: false` y sin declararla, `preview_urls` queda en `false` (esquema de Wrangler 4.153.0, `node_modules/wrangler/config-schema.json:73-77`, según el ADR del paso 9b, `decisiones.md:1144`).
- Documentación oficial de Cloudflare consultada el 16-11-2026 (se vuelve a leer al ejecutar la iteración, con su fecha):
    - página «Preview URLs»: si `preview_urls` no se declara, toma el valor de `workers_dev`; las preview URL solo existen en el subdominio workers.dev;
    - página «workers.dev»: al desplegar con `workers_dev: false` se apaga la ruta workers.dev, y las preview URL siguen ese valor salvo que se declaren de forma explícita.
    - **Conclusión (a confirmar en la preview):** `"workers_dev": false` y `"preview_urls": true` explícito pueden convivir; el paso 9b de E190 no apaga la preview si `preview_urls` se declara.
- **Inferencia no verificada:** `preview_urls` es un ajuste del Worker que se aplica en cada despliegue. Si `main` siguiera sin declararla (valor `false`), cada despliegue de producción apagaría la preview de nuevo. Por eso el bloque llega a `main` por una rama corta y no al final de la épica.
- **Hallazgos abiertos que esta iteración decide:** AT-100 y AT-147 (Turnstile y preview URL: el widget autoriza `felipecuevas.dev`, `pages.dev` y `workers.dev`, y no está verificado que cubra los subdominios de preview) y AT-149 (permisos de `.claude/settings.json`).
- **Regla de rama vigente:** `AGENTS.md:27` dice que el trabajo posterior al cutover va en ramas cortas, y `AGENTS.md:39` exige autorización explícita de Felipe para crear una rama. La rama larga `ajustes-visuales` es una excepción que Felipe reconfirma en la tarea 2.
- Procedimiento de cutover: `190_epica-cutover/E190-I02-procedimiento-cutover.md`, paso 9 y sección 7.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- Se crea E200 como épica abierta (ADR-107, sustituye en parte a ADR-056).
- Rama de trabajo `ajustes-visuales` desde `main`; el agente queda autorizado a crearla. **Pendiente de reconfirmar (24-11-2026):** la autorización es del 16-11-2026, la rama aún no existe y `AGENTS.md` pide autorización explícita (tarea 2).
- `preview_urls` en `true` para revisar cada cambio en la rama antes del merge a `main`.
- El agente revisa con un navegador real (hover, foco, temas, anchos), no solo con capturas estáticas.
- E200-I01 solo prepara el terreno; los ajustes visuales empiezan en E200-I02.

## Alcance
- Registrar en `decisiones.md` el texto de ADR-107, ADR-108 y ADR-109. E200 ya está registrada en `_planificacion/README.md` y `registro-log.md`, y la numeración está fijada (E200-I00).
- Bloque de `wrangler.jsonc` para Felipe (ADR-033), que solo agrega `"preview_urls": true`, y guía del panel de Cloudflare para los builds de ramas que no son `main`.
- Comprobar en vivo la convivencia de workers.dev apagado con la preview de rama.
- Probar Turnstile en la primera preview real y decidir (AT-100 y AT-147); verificar si la preview manda correos reales y si lleva `noindex`.
- Reconfirmar con Felipe la rama larga `ajustes-visuales` y entregarle el bloque de `AGENTS.md`.
- Navegador para el agente: Playwright MCP declarado en `.mcp.json` (ADR-109) y prueba de uso.
- `README.md` de la raíz al día tras el cutover; bloques para `AGENTS.md` y `.claude/settings.json`.

## Fuera de alcance
- Cualquier cambio visible del sitio (empieza en E200-I02).
- `DESIGN.md`: no cambia en esta iteración; sus bloques llegan con las iteraciones siguientes.
- Proteger la preview con Cloudflare Access, salvo que la tarea 5b o 5c lo exija (se decide ahí, con ADR propio).
- Registrar E200 en `_planificacion/README.md` y `registro-log.md` y renumerar sus ADR: lo hizo E200-I00 (AT-145 y AT-146).

## Tareas
- [ ] **ADR:** verificar el último ADR y el último AT (hoy ADR-106 y AT-153); registrar en `decisiones.md` ADR-107, ADR-108 y ADR-109 con el texto de la sección «ADR a registrar». El registro de E200 y la renumeración ya los hizo E200-I00: no repetirlos.
- [ ] **Rama:** **reconfirmar con Felipe** que `ajustes-visuales` es una rama larga (excepción a `AGENTS.md:27` y `:39`) y recibir su autorización explícita; recién entonces crearla desde `main` actualizado y confirmar con `git branch --show-current`. La rama debe nacer después del merge de la rama corta del bloque de `wrangler.jsonc`.
- [ ] **Bloque de `wrangler.jsonc` (ADR-033, ADR-108):** entregar a Felipe el bloque de la sección «Bloque para Felipe». Felipe crea una rama corta desde `main` (por ejemplo `config-preview-urls`), lo aplica, la mergea a `main` y después actualiza `ajustes-visuales` desde `main`. El paso 9b ya está hecho: el bloque solo agrega `preview_urls`.
- [ ] **Panel (lo ejecuta Felipe):** Worker `felipecuevas-dev` > Settings > Build > Branch control: activar los builds de ramas que no son producción (al menos `ajustes-visuales`). El agente entrega los pasos según la documentación vigente y Felipe confirma con capturas.
- [ ] **Comprobación en vivo (el agente, con `Invoke-WebRequest` o el navegador):** (a) `https://felipecuevas.dev/es/` en 200; (b) `https://felipecuevas-dev.felipe-cuevas.workers.dev/` sigue sin servir el sitio (404, ya verificado en E190-I04; se repite como regresión); (c) la URL de rama `ajustes-visuales-felipecuevas-dev.felipe-cuevas.workers.dev` (nombre exacto según el panel) responde 200 en `/es/` y `/en/`.
- [ ] **Tarea 5b · Turnstile en la primera preview real (AT-100 y AT-147):** con el widget autorizando hoy `felipecuevas.dev`, `pages.dev` y `workers.dev`, cargar `/es/contacto/` en la URL de rama y comprobar si el widget carga y verifica. Anotar el resultado y proponer a Felipe una de tres salidas: mantener `workers.dev` en el widget, usar un widget aparte para las previews, o validar el `hostname` en el Worker (cambio de código, con ADR). Mientras no se decida, AT-100 sigue pospuesto. No enviar el formulario hasta resolver la tarea 5c.
- [ ] **Tarea 5c · Correos reales y `noindex` en la preview:** (i) verificar si la respuesta de la preview trae `X-Robots-Tag: noindex` (una preview anterior no lo traía, `_planificacion/README.md`, E190-I01 Fase 2); (ii) verificar, con autorización de Felipe y un solo envío de prueba, si el Worker de la preview manda el correo real (secretos y `CONTACTO_DESTINO` compartidos) y qué política de versión registra. Si no hay `noindex` o la preview manda correos reales, detenerse y proponer a Felipe Cloudflare Access, un destino de prueba para las previews o aceptar el riesgo (ADR nuevo).
- [ ] **Navegador (ADR-109):** crear `.mcp.json` en la raíz con Playwright MCP en versión exacta que cumpla `minimumReleaseAge` (ADR-097), ejecutado con `pnpm dlx` (sin agregarlo a `package.json`); entregar a Felipe el bloque de permisos para `.claude/settings.json`; probarlo en local y en la URL de rama: cambiar de tema e idioma, pasar el puntero sobre un enlace del pie, navegar con Tab y capturar 360 y 1.920 px.
- [ ] **Documentos posteriores al cutover:** actualizar el `README.md` de la raíz (producción en el dominio propio, rama `ajustes-visuales`, preview de rama, revisión con navegador); entregar en la bitácora los bloques exactos de `.claude/settings.json` (permisos del servidor MCP y los `verify`, `check:i18n`, `verify:seo` y `check:redirects` que hoy no están en `allow`, AT-149) y de `AGENTS.md`. El de `AGENTS.md` cubre, como mínimo:
    - línea 27 (sección 2, rama): la rama larga `ajustes-visuales`, la preview de rama y el merge por lotes, como excepción a «ramas cortas»;
    - línea 34 (sección 3, scripts permitidos): quitar `test` (no existe en `package.json`, AT-149) y agregar lo que corresponda;
    - línea 44 (sección 4): «Toda la implementación vive en la rama de migración» pasa a la rama de trabajo vigente;
    - sección 3: uso de `.mcp.json` (Playwright MCP, ADR-109);
    - línea 36 (contadores): «AT-144 y ADR-104» pasa a los últimos AT y ADR vigentes al cerrar la iteración (hoy AT-153 y ADR-106; con ADR-107 a ADR-109 registrados, ADR-109).
- [ ] **Verificación y cierre:** DoD, `git diff --stat` antes y después de editar documentos, bitácora y commit sugerido.

## Bloque para Felipe (`wrangler.jsonc`, rama corta desde `main`)
Cambios respecto del archivo vigente (`wrangler.jsonc:1-18`, verificado el 24-11-2026): se agrega `"preview_urls": true,` después de `"workers_dev": false,` y se ajusta la última frase del comentario de la línea 5 (que decía «preview_urls sin declarar (hereda false)»). Las líneas 1 a 4 y el resto del archivo no cambian. **El archivo debe terminar con un salto de línea después de la `}` final**: hoy no lo tiene y por eso `pnpm format:check` falla en `main` (AT-153). Reemplaza el archivo completo por:

```jsonc
// Worker de felipecuevas.dev con assets estáticos (ADR-037) y función de contacto (ADR-084).
// "main" solo atiende /api/* (run_worker_first); el resto lo sirven los assets de dist/.
// El binding ASSETS permite al Worker devolver los assets fuera de /api/* (ADR-085).
// Sin rutas en este archivo: felipecuevas.dev es un Custom Domain del panel de Cloudflare (cutover
// del 15-11-2026, ADR-104). workers.dev apagado (ADR-101); URL de preview por rama activas (preview_urls).
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

Reversa: quitar la línea `"preview_urls": true,` (vuelve al valor por defecto, `false`) por la misma vía (rama corta, merge y despliegue de Workers Builds). `"workers_dev"` no se toca.

## Archivos previstos (crear / modificar)
- Crear: `.mcp.json`.
- Modificar: `README.md` (raíz), `_planificacion/README.md` y `_planificacion/00_producto/registro-log.md` (solo estado de la iteración), `_planificacion/00_producto/decisiones.md` (ADR-107 a ADR-109), `_planificacion/00_producto/auditoria-tecnica.md` (si hay hallazgos) y los archivos de E200.
- Felipe: `wrangler.jsonc` (rama corta), `AGENTS.md` y `.claude/settings.json` (bloques de la bitácora).

## Criterios de aceptación (verificables)
- [ ] Felipe reconfirmó la rama larga `ajustes-visuales` y la autorizó de forma explícita; existe, parte de `main` posterior al merge de la rama corta y es la rama activa.
- [ ] `main` contiene `"workers_dev": false` y `"preview_urls": true`; producción responde 200 en `/es/` y `/en/`; workers.dev de producción sigue sin servir el sitio.
- [ ] Un push a `ajustes-visuales` genera su URL de preview y responde 200 en `/es/` y `/en/` (URL anotada en la bitácora).
- [ ] Queda registrado si la preview lleva `noindex` y si manda correos reales, y, si no hay `noindex` o los manda, la decisión de Felipe (tarea 5c).
- [ ] Turnstile probado en la preview y decidido (mantener `workers.dev`, widget aparte o validar el `hostname`); AT-100 y AT-147 resueltos o con su nuevo plan (tarea 5b).
- [ ] El agente usó el navegador en local y en la preview: tema, idioma, hover, Tab y dos anchos, con la evidencia en la bitácora.
- [ ] `README.md` actualizado y bloques de `AGENTS.md` (líneas 27, 34, 36 y 44, y la sección 3) y `.claude/settings.json` entregados.
- [ ] `dist/` sin cambios visibles: mismos archivos `.html` que la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n`, `pnpm verify:seo` y `pnpm check:redirects` sin errores.
- `pnpm check:redirects --base https://felipecuevas.dev` sin fallos.
- Comprobaciones en vivo de las tareas 5, 5b y 5c, y prueba del navegador de la tarea 6.

## ADR a registrar (texto para `decisiones.md`)

### ADR-107 · Épica abierta de ajustes visuales posterior al cutover (sustituye en parte a ADR-056)
- **Contexto:** ADR-056 descartó una épica de arreglos (E165) porque duplicaba a E170 y las épicas de página seguían abiertas. Con el cutover hecho (merge `d58393c`, 15-11-2026), todas las épicas de página están cerradas, el sitio está en producción y Felipe encuentra ajustes visuales transversales y por página.
- **Decisión (de Felipe, 16-11-2026):**
    - Se crea **E200 · Ajustes visuales** (`200_epica-ajustes-visuales/`). E200-I01 es estructural; desde E200-I02, una iteración por tema transversal o por página, agregada al final cuando Felipe entrega los ajustes.
    - Las iteraciones cerradas y sus bitácoras no se editan (se mantiene de ADR-056).
    - La épica queda **abierta** hasta que Felipe la cierre de forma expresa.
    - Todo ajuste se aplica en `es-CL` y `en-US`.
    - Rama `ajustes-visuales` desde `main`; merge a `main` por lotes aprobados en la preview; tras cada merge, Felipe actualiza la rama desde `main`.
- **Sustituye en parte:** ADR-056 en «No se crea una épica de arreglos», solo para el trabajo posterior al cutover.
- **Consecuencias:** el plan pasa a 21 épicas y 79 iteraciones (E200-I00 a E200-I14, registradas en E200-I00); el contador crece con cada iteración que se agregue a E200. `AGENTS.md` cambia la rama de trabajo (bloque en la bitácora).
- **Origen:** decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

### ADR-108 · URL de preview por rama y workers.dev apagado (complementa ADR-101)
- **Contexto:** sin preview, cada merge a `main` sale directo a producción. `wrangler.jsonc` tiene `"workers_dev": false` (paso 9b de E190, hecho en E190-I04) y no declara `preview_urls`, que por eso queda en `false`. La documentación oficial (16-11-2026) indica que `preview_urls` toma el valor de `workers_dev` si no se declara y que las preview URL solo existen en workers.dev.
- **Decisión (de Felipe, 16-11-2026):** `"workers_dev": false` y `"preview_urls": true` explícito. Los builds de ramas que no son producción se activan en Workers Builds. El cambio llega a `main` por una rama corta (ADR-101), no al final de E200.
- **Consecuencias:** cada rama tiene su URL `<rama>-felipecuevas-dev.felipe-cuevas.workers.dev`, pública para quien tenga el enlace. Si no trae `noindex`, o si la preview manda correos reales, Felipe decide entre aceptar el riesgo o protegerla con Cloudflare Access (ADR nuevo). El paso 9b de E190 ya estaba cerrado.
- **Origen:** E200-I01, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

### ADR-109 · Navegador para los agentes: Playwright MCP
- **Contexto:** la revisión visual de E200 exige estados que una captura estática no muestra (hover, foco, cambio de tema e idioma) en varios anchos. Felipe pidió que el agente revise solo con un navegador.
- **Decisión (de Felipe, 16-11-2026):** Playwright MCP declarado en `.mcp.json` de la raíz, en versión exacta que cumpla `minimumReleaseAge` (ADR-097), ejecutado con `pnpm dlx` (ADR-003). No se agrega a `package.json` ni al lockfile. Los permisos del servidor MCP los agrega Felipe en `.claude/settings.json`.
- **Consecuencias:** el agente revisa en local y en la URL de rama con la matriz de la épica; las capturas no se versionan. Antigravity usa su navegador propio con la misma matriz. Una herramienta distinta exige un ADR nuevo.
- **Origen:** E200-I01, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- **Inferencia por verificar:** que un despliegue de producción sin `preview_urls` (valor `false`) apague la preview. El bloque llega a `main` antes de trabajar en la rama, así que el riesgo queda cubierto aunque la inferencia sea falsa.
- **Preview pública y Worker compartido:** la preview usa el mismo Worker y, probablemente, los mismos secretos que producción (no verificado). Un envío desde la preview podría mandar un correo real: por eso la tarea 5c va antes de cualquier envío de prueba, y I13 repite el formulario real solo después de resolverla.
- El nombre exacto de la URL de rama lo da el panel; puede truncarse o normalizarse.
- En Windows, `.mcp.json` podría necesitar `cmd /c` para ejecutar `pnpm`; se confirma en la prueba de la tarea 6.
- El paso 9b vivía en E190 y E190-I04 lo cerró el 24-11-2026 (AT-048 y AT-122 resueltos): esta iteración solo agrega `preview_urls`.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
