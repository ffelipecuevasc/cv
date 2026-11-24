# E200-I01 · Preparación estructural: preview por rama, workers.dev, navegador y documentos
- **Estado:** [x] Terminada (24-11-2026). Fase 1 y fase 2 (partes A, A2 y B) hechas; 5b y 5c (formulario y Turnstile) trasladadas a E200-I13 (ADR-123); `preview_urls: true` solo durante E200 (ADR-124).
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E200-I00 · **Hallazgos que cierra:** AT-100 y AT-147 (si la decisión sobre Turnstile se toma aquí). AT-048 y el paso 9b ya están resueltos (E190-I04) · **ADR relacionados:** ADR-012, ADR-026, ADR-033, ADR-037, ADR-056, ADR-097, ADR-101, ADR-102

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

> **Dos fases (instrucción de Felipe, 24-11-2026).**
> - **Fase 1 (documentos, rama corta `e200-i01-preparacion`):** bloques para Felipe de `wrangler.jsonc`, `AGENTS.md` y `.claude/settings.json`; ADR-107 a ADR-109 en `decisiones.md`; tareas 5b y 5c documentadas. **Terminada el 24-11-2026.** Los bloques están en la bitácora `99_bitacora/2026-11-24_E200-I01.md`. `pnpm format:check` falla por AT-153 hasta que Felipe aplique el bloque de `wrangler.jsonc`.
> - **Fase 2 (solo tras la confirmación de Felipe de que aplicó los bloques y mergeó a `main`):** repetir el gate, crear `ajustes-visuales` desde `main`, configurar Playwright MCP en `.mcp.json` con `pnpm dlx` (sin tocar `package.json`), releer la documentación de Cloudflare sobre previews y ejecutar las comprobaciones en vivo y las tareas 5b y 5c. Si Playwright no funciona (por ejemplo, por `cmd /c` en Windows), no se improvisa: se registra un AT y se detiene para que Felipe decida.

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
- Rama de trabajo `ajustes-visuales` desde `main`; el agente queda autorizado a crearla. **Reconfirmada por Felipe el 24-11-2026** (instrucción de esta ejecución: la rama larga se crea en la fase 2); la fase 2 vuelve a pedir la confirmación antes de crearla, porque `AGENTS.md` exige autorización explícita para cada rama.
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
- [x] **ADR (fase 1, 24-11-2026):** último ADR y AT verificados (ADR-106 y AT-153); ADR-107, ADR-108 y ADR-109 registrados en `decisiones.md:1151-1175`. El registro de E200 y la renumeración ya los hizo E200-I00.
- [x] **Rama (fase 2, 24-11-2026):** `ajustes-visuales` creada desde `main` (`08ec010`) con autorización explícita de Felipe; **el push lo hace Felipe**. Felipe reconfirmó la rama larga `ajustes-visuales` (excepción a `AGENTS.md:27` y `:39`; ver «Decisiones de Felipe»). En la fase 2, repetir el gate, pedir la confirmación de que los bloques se aplicaron y se mergearon, crearla desde `main` actualizado y confirmar con `git branch --show-current`. Debe nacer después del merge de la rama corta del bloque de `wrangler.jsonc`.
- [x] **Bloque de `wrangler.jsonc` (vigente: bloque 7, ADR-124, en `main` desde `67bf3c7`) (ADR-033, ADR-108) — entregado en la fase 1; lo aplica Felipe:** Felipe crea una rama corta desde `main` (por ejemplo `config-preview-urls`), lo aplica, la mergea a `main` y después actualiza `ajustes-visuales` desde `main`. El paso 9b ya está hecho: el bloque solo agrega `preview_urls`. El bloque se validó con Prettier (sin cambios) y con el esquema de Wrangler (`preview_urls` existe), y termina con salto de línea (cierra AT-153 al aplicarse).
- [x] **Panel (hecho por Felipe el 24-11-2026):** activó «Builds for Preview branches» (pestaña Previews > Base; comando de build `pnpm build`; comando de preview `npx wrangler preview`, sin cambios; sin filtro de ramas: aplica a todas las que no son `main`). Guía original: ver «Guía del panel». El agente confirma los pasos con la documentación del día en la fase 2 y Felipe confirma con capturas.
- [x] **Comprobación en vivo ((c) hecha el 24-11-2026 en la parte B final; fase 2; el agente, con `Invoke-WebRequest` o el navegador; (a) y (b) hechos, (c) espera el push):** (a) `https://felipecuevas.dev/es/` en 200; (b) `https://felipecuevas-dev.felipe-cuevas.workers.dev/` sigue sin servir el sitio (404, ya verificado en E190-I04; se repite como regresión); (c) la URL de rama `ajustes-visuales-felipecuevas-dev.felipe-cuevas.workers.dev` (nombre exacto según el panel) responde 200 en `/es/` y `/en/`.
- [x] **Tarea 5b · trasladada a E200-I13 (ADR-123, 24-11-2026):** las previews no heredan secretos; AT-100 sigue pospuesto. Texto original: Turnstile (pendiente de la decisión de Felipe sobre P-06 y del primer push) en la primera preview real (AT-100 y AT-147; fase 2, procedimiento en «Procedimiento de las tareas 5b y 5c»):** con el widget autorizando hoy `felipecuevas.dev`, `pages.dev` y `workers.dev`, cargar `/es/contacto/` en la URL de rama y comprobar si el widget carga y verifica. Anotar el resultado y proponer a Felipe una de tres salidas: mantener `workers.dev` en el widget, usar un widget aparte para las previews, o validar el `hostname` en el Worker (cambio de código, con ADR). Mientras no se decida, AT-100 sigue pospuesto. No enviar el formulario hasta resolver la tarea 5c.
- [x] **Tarea 5c · trasladada a E200-I13 en lo del formulario (ADR-123); el `noindex` y la no herencia de secretos se comprueban en la parte B. Texto original: Correos reales (pendiente de la decisión de Felipe sobre P-06 y del primer push; la documentación dice que una Worker Preview no hereda secretos) y `noindex` en la preview (fase 2, procedimiento en «Procedimiento de las tareas 5b y 5c»):** (i) verificar si la respuesta de la preview trae `X-Robots-Tag: noindex` (una preview anterior no lo traía, `_planificacion/README.md`, E190-I01 Fase 2); (ii) verificar, con autorización de Felipe y un solo envío de prueba, si el Worker de la preview manda el correo real (secretos y `CONTACTO_DESTINO` compartidos) y qué política de versión registra. Si no hay `noindex` o la preview manda correos reales, detenerse y proponer a Felipe Cloudflare Access, un destino de prueba para las previews o aceptar el riesgo (ADR nuevo).
- [x] **Navegador (ADR-109; fase 2, 24-11-2026):** hecho; resultados en «Fase 2: resultados». Original: crear `.mcp.json` en la raíz con Playwright MCP en versión exacta que cumpla `minimumReleaseAge` (ADR-097), ejecutado con `pnpm dlx` (sin agregarlo a `package.json`); el bloque de permisos para `.claude/settings.json` ya se entregó en la fase 1 (la fase 2 verifica los nombres reales de las herramientas y ajusta el bloque si difieren); probarlo en local y en la URL de rama: cambiar de tema e idioma, pasar el puntero sobre un enlace del pie, navegar con Tab y capturar 360 y 1.920 px. Si no funciona (por ejemplo, `cmd /c` en Windows), no improvisar: registrar un AT y detenerse para que Felipe decida.
- [x] **Documentos posteriores al cutover (`README.md` de la raíz actualizado en la parte B final):** bloques exactos de `.claude/settings.json` (permisos del servidor MCP y los `verify`, `check:i18n`, `verify:seo` y `check:redirects` que no estaban en `allow`, sin `pnpm test`, AT-149) y de `AGENTS.md` **entregados en la fase 1** (bitácora `2026-11-24_E200-I01.md`); el `README.md` de la raíz (producción en el dominio propio, rama `ajustes-visuales`, preview de rama, revisión con navegador) se actualiza en la fase 2, cuando la rama exista. El bloque de `AGENTS.md` cubre, como mínimo:
    - línea 27 (sección 2, rama): la rama larga `ajustes-visuales`, la preview de rama y el merge por lotes, como excepción a «ramas cortas»;
    - línea 34 (sección 3, scripts permitidos): quitar `test` (no existe en `package.json`, AT-149) y agregar lo que corresponda;
    - línea 44 (sección 4): «Toda la implementación vive en la rama de migración» pasa a la rama de trabajo vigente;
    - sección 3: uso de `.mcp.json` (Playwright MCP, ADR-109);
    - línea 36 (contadores): «AT-144 y ADR-104» pasa a los últimos AT y ADR vigentes al cerrar la iteración (hoy AT-153 y ADR-106; con ADR-107 a ADR-109 registrados, ADR-109).
- [x] **Verificación y cierre:** DoD, `git diff --stat` antes y después de editar documentos, bitácora y commit sugerido.

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

## Orden para Felipe entre la fase 1 y la fase 2
1. Revisar y pegar los tres bloques de la bitácora `2026-11-24_E200-I01.md` (`wrangler.jsonc`, `AGENTS.md` y `.claude/settings.json`), por ejemplo en una rama corta (`config-preview-urls`), y mergear a `main` junto con esta rama (`e200-i01-preparacion`: documentos y ADR). Los dos merges pueden ir en el orden que prefieras; ambos deben estar en `main` antes de la fase 2.
2. Esperar el despliegue de Workers Builds de `main` y comprobar producción: `https://felipecuevas.dev/es/` y `/en/` en 200 y `https://felipecuevas-dev.felipe-cuevas.workers.dev/es/` sin servir el sitio (404).
3. Activar en el panel los builds de ramas que no son producción (ver «Guía del panel»).
4. Decirle al agente que aplicaste los bloques y mergeaste; recién entonces empieza la fase 2.

## Guía del panel (la ejecuta Felipe; el agente la confirma con la documentación del día en la fase 2)
Pasos según lo previsto el 16-11-2026, **no verificados** contra la documentación vigente (se releen en la fase 2):
1. Panel de Cloudflare > Workers & Pages > Worker `felipecuevas-dev` > Settings > Build.
2. En «Branch control», dejar la rama de producción en `main` y activar los builds de ramas que no son producción (al menos `ajustes-visuales`).
3. Confirmar el comando de build y de despliegue de esas ramas (deben construir `dist/` igual que producción).
4. Tras el primer push de `ajustes-visuales`, anotar el nombre exacto de la URL de rama que muestra el panel (puede truncarse o normalizarse) y mandar una captura al agente.

## Procedimiento de las tareas 5b y 5c (fase 2, en la primera preview real)
Orden obligatorio: comprobación en vivo, luego 5c(i), luego 5b, y 5c(ii) solo con la autorización expresa de Felipe y un único envío.
1. **Comprobación en vivo.** `Invoke-WebRequest` con `-Method Head` a `/es/` y `/en/` de la URL de rama (200) y a `https://felipecuevas.dev/es/` (200); a la URL de `workers.dev` sin rama (404).
2. **5c(i), `noindex`.** Leer todas las cabeceras de `/es/` en la URL de rama y buscar `X-Robots-Tag`; compararlas con las de producción. Registrar el valor exacto o su ausencia (en una preview anterior no estaba, `_planificacion/README.md`, E190-I01 Fase 2).
3. **5b, Turnstile.** Con el navegador de ADR-109 abrir `/es/contacto/` en la URL de rama, dar foco al primer campo (Turnstile se carga al primer foco, ADR-083) y mirar: si el widget aparece, si queda un mensaje de error del widget o el texto «La verificación de seguridad no está disponible» (AT-100) y los mensajes de la consola. **No enviar.** Anotar el resultado y proponer a Felipe una de las tres salidas del texto de la tarea 5b. Esta prueba no confirma que el servidor valide el token: eso solo se ve con un envío (5c ii).
4. **5c(ii), correos reales.** Con la autorización de Felipe, un solo envío con asunto «PRUEBA E200-I01 (preview), ignorar». Felipe confirma si el correo llegó a `CONTACTO_DESTINO` y qué versión de política trae. Si llegó, la preview manda correos reales y se propone un destino de prueba para las previews, Cloudflare Access o aceptar el riesgo (ADR nuevo). Si no hay `noindex` o llegó el correo, la iteración se detiene hasta la decisión de Felipe.
5. **Registro.** Resultados en la bitácora y en AT-100 y AT-147 (resueltos o con su nuevo plan).

## Fase 2: resultados (24-11-2026)
**Gate.** `main` = `origin/main` = `08ec010` (con los tres bloques, `preview_urls: true` y los ADR-107 a ADR-109), árbol limpio, `ajustes-visuales` inexistente; creada con `git switch -c ajustes-visuales main`.

**Playwright MCP (ADR-109) — funciona, sin `cmd /c`.**
- `.mcp.json` en la raíz: `pnpm dlx @playwright/mcp@0.0.85 --browser chrome --isolated --headless --output-dir .playwright-mcp`. Versión publicada el 09-11-2026 (14,8 días); `--browser chrome` usa el Chrome instalado y evita descargar navegadores. `package.json` y el lockfile no cambiaron; `.gitignore` suma `.playwright-mcp/`.
- `claude mcp list` y `claude mcp get playwright`: `✔ Connected`, ámbito «Project config», tipo stdio, comando `pnpm` directo. Un `spawn("pnpm")` crudo de Node falla con `ENOENT` (`pnpm` es `pnpm.CMD`), pero Claude Code lo resuelve: no se requiere `cmd /c` y no se registra AT por eso. `enabledMcpjsonServers: ["playwright"]` funciona (el servidor no queda «Pending approval»).
- `tools/list`: 25 herramientas. Las que ejecutan código o leen archivos son `browser_evaluate`, `browser_run_code_unsafe`, `browser_file_upload` y `browser_drop`. **No existen** `browser_run_code` ni `browser_install`: el bloque de la fase 1 los suponía (AT-154, corregido en la bitácora).
- Recorrido de prueba en local (`pnpm preview`, servidor controlado por MCP desde un script, porque las herramientas `mcp__playwright__*` no están cargadas en esta sesión): tema alternado desde la barra (nombre accesible «Activar tema oscuro» → «Activar tema claro»); selector de idioma a `/en/`; hover sobre «Privacy policy» del pie (color de acento); tres Tab (queda activo el enlace «Home»); capturas a 360×800 y 1920×1080; `prefers-reduced-motion: reduce` emulado con `browser_emulate_media`; consola sin errores. Las capturas con `filename` se guardan en el directorio actual, no en `--output-dir`: usar sin `filename`.
- Pendiente: repetir el recorrido en la URL de rama (espera el push).

**Documentación de Cloudflare (leída el 24-11-2026).** Páginas y fechas de última actualización: Version URLs 19-11-2026; Worker Previews 24-09-2026; Previews > Configuration 22-09-2026; Previews > Custom domains 08-11-2026; Builds 28-10-2026; Builds > Configuration 21-11-2026; Builds > Build branches 08-11-2026; workers.dev 06-11-2026; Wrangler configuration 12-11-2026 (dato resumido, no leído en el texto literal). La ficha de Wrangler no se leyó completa.

**Premisas de ADR-108 frente a lo verificado.**
| Premisa de ADR-108 | Lo que dice la documentación o se verificó | Estado |
|---|---|---|
| La URL de rama es una Version URL (`wrangler versions upload`) | El panel de Felipe usa Worker Previews (`npx wrangler preview`). «Version URLs are not Previews» | **Falsa** |
| `"preview_urls": true` es lo que habilita la URL de rama con `workers_dev: false` | `preview_urls` «Enables Version URLs and workers.dev Preview URLs»; ninguna página dice que haga falta para las Worker Previews | **Sin confirmar** (experimento de P-06, opción 3) |
| La preview es una copia del Worker de producción | No hereda variables, secretos ni bindings; exige un bloque `previews` (puede ir vacío), que `wrangler.jsonc` no tiene; `assets` se sube desde la rama | **Falsa** (primer build sin verificar) |
| La preview podría no traer `noindex` | Las URL de preview de workers.dev llevan `X-Robots-Tag: noindex`; las de dominio propio no | Probablemente resuelta (falta verla en vivo) |
| (No contemplado) `workers_dev: false` deja workers.dev sin servir el sitio | **Verificado en vivo:** las versiones `53b3bdd2` y `820f4862` responden 200 en workers.dev, con `noindex` (AT-155) | **Falsa en la práctica** |

**Decisión pendiente.** Se propone P-06 en `decisiones.md` (opciones, costos y recomendación; número provisional ADR-123) y no se edita ADR-108. Hasta que Felipe decida, 5b y 5c quedan pendientes y esta iteración sigue `[~]`.

## Fase 2, parte A (24-11-2026): experimento de ADR-123
- Decisiones de Felipe: P-06 opción 3 (experimento) y traslado de 5b y 5c a E200-I13; registradas en ADR-123. Datos: versión activa de producción `b4a0ae27`; los bloques 4 y 5 ya están en `ajustes-visuales` (`02ff257`); los dos builds de preview fallaron por falta del bloque `previews` (AT-156).
- Bloque de `wrangler.jsonc` con `"preview_urls": false` y `"previews": {}`, validado contra `config-schema.json` y con Prettier, y pasos para Felipe: bitácora `2026-11-24_E200-I01.md`, sección «Fase 2, parte A».
- **Parte B (tras la confirmación de Felipe):** las URL de versión `53b3bdd2`, `820f4862` y `b4a0ae27` dan 404; la preview responde en `/es/` y `/en/`, lleva `noindex` y no hereda secretos (sin enviar el formulario); recorrido de Playwright en la URL de rama; cierre `[x]` si lo obligatorio está hecho.

## Fase 2, parte B (24-11-2026): resultado parcial, detenida
| Host (`/es/` y `/en/`) | Resultado (24-11-2026, `Invoke-WebRequest`) |
|---|---|
| `felipecuevas.dev` | 200 `text/html` (78.778 y 79.295 bytes) |
| `felipecuevas-dev.felipe-cuevas.workers.dev` | 404 `text/plain`, 17 bytes |
| `53b3bdd2-…`, `820f4862-…`, `b4a0ae27-…` (versiones de producción) | **404 `text/plain`, 17 bytes** (antes 200) |
| `deadbeef-…` (control) | 404 `text/plain`, 17 bytes (antes, 404 HTML genérico de 19.986 bytes) |
| `ajustes-visuales-…` y `config-previews-…` (previews esperadas) | **404 `text/plain`, 17 bytes** |

- Hecho: las URL de versión dejaron de responder (AT-155 resuelto); producción y workers.dev sin cambios.
- **No hecho:** la preview no responde, así que no se pudo comprobar su `noindex`, la no herencia de secretos ni repetir Playwright en la URL de rama. El mensaje de Felipe llegó con la plantilla sin completar (hash, versión, estado de los builds y URL de la preview). I01 sigue `[~]`.

## Fase 2, parte A2 (24-11-2026): `preview_urls: true` solo durante E200 (ADR-124)
- **Hechos (dichos por Felipe):** con `"preview_urls": false` el panel muestra «No URLs enabled» y los builds de preview de `ajustes-visuales` pasan («Ready») sin URL; las URL de versión de producción dan 404 (verificado por el agente en la parte B). Con `true` existen las dos en workers.dev, públicas y con `noindex`.
- **Decisión de Felipe (P-06):** `"preview_urls": true` con `"previews": {}`, solo durante E200 (ADR-124, sustituye a ADR-123 en esa clave). Riesgo aceptado; `/api/*` en las URL de versión sin verificar. Apagar `preview_urls` es tarea de cierre de la épica (`epica.md`). AT-155 aceptado hasta el cierre de E200; AT-156 resuelto.
- **Bloque de `wrangler.jsonc` y pasos para Felipe:** bitácora `2026-11-24_E200-I01.md`, sección «Fase 2, parte A2». Validado contra `config-schema.json` (ajv; la mutación `"preview_urls": "si"` falla) y con Prettier; termina con salto de línea.
- **Parte B (tras la confirmación de Felipe y la URL):** la preview responde en `/es/` y `/en/`, lleva `noindex` y no hereda secretos (sin enviar el formulario); GET y OPTIONS a `/api/contacto` en la preview y en una URL de versión de producción; recorrido de Playwright en la preview; cierre `[x]` si lo obligatorio está hecho.


## Fase 2, parte B final (24-11-2026): preview verificada
`main` = `origin/main` = `67bf3c7` (bloque 7). Preview de `ajustes-visuales`: versión `07cd21a5`, «Ready» (dato de Felipe). Mediciones con `curl` del agente:

| Host | Resultado |
|---|---|
| `felipecuevas.dev` `/es/` y `/en/` | 200 `text/html` (78.411 y 78.928 bytes), sin `X-Robots-Tag` |
| `ajustes-visuales-felipecuevas-dev.felipe-cuevas.workers.dev` `/es/` y `/en/` | 200 `text/html` (mismos tamaños), **`X-Robots-Tag: noindex`** |
| `felipecuevas-dev.felipe-cuevas.workers.dev/es/` | 404 `text/plain`, 17 bytes |
| `53b3bdd2-…`, `820f4862-…`, `b4a0ae27-…` `/es/` (y `b4a0ae27` `/en/`) | 200 `text/html` (volvieron con `preview_urls: true`) |
| `07cd21a5-…/es/` (versión de la preview) | 200: la versión de la preview también tiene URL de versión |

**`/api/contacto` (solo GET y OPTIONS):** en la preview, en `b4a0ae27-…` y en producción las seis respuestas son iguales: **405** `application/json; charset=utf-8`, `Allow: POST`, `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, cuerpo `{"ok":false,"error":"Método no permitido."}` (44 bytes); en workers.dev llevan además `X-Robots-Tag: noindex`, y en producción `Strict-Transport-Security`. OPTIONS no devuelve `Access-Control-*` (sin preflight CORS). El Worker corta en `src/worker/contact.ts:212` antes de leer secretos.

**Secretos:** **no verificable en solo lectura.** GET y OPTIONS responden 405 antes de `missingSecrets` (`contact.ts:200-203`), así que la respuesta no revela si la preview tiene secretos. Queda según la documentación de Cloudflare (las previews no heredan secretos) y se comprueba en E200-I13 con el formulario (ADR-123). La URL de versión `b4a0ae27` sí usa los secretos de producción (documentación): es la superficie que acepta ADR-124.

**Playwright (MCP, Chrome headless) en la preview:** `/es/` a 1920×1080: tema alternado («Activar tema oscuro» → «Activar tema claro», captura en oscuro); selector de idioma a `/en/` (título «Senior Instructor and University Lecturer»); tres Tab (el foco no quedó registrado en la instantánea tomada tras el cambio de tamaño; en local, fase 2, quedaba en «Home»); `prefers-reduced-motion: reduce` emulado; 360×800 con el botón «Open menu» y sin desborde visible; consola: 0 errores y 0 advertencias. Capturas en `.playwright-mcp/` (no versionadas).

## Archivos previstos (crear / modificar)
- Crear: `.mcp.json` (hecho). Modificar: `.gitignore` (`.playwright-mcp/`, hecho).
- Modificar: `README.md` (raíz, fase 2), `_planificacion/README.md` y `_planificacion/00_producto/registro-log.md` (solo estado de la iteración), `_planificacion/00_producto/decisiones.md` (ADR-107 a ADR-109, fase 1), `_planificacion/00_producto/auditoria-tecnica.md` (avances y hallazgos) y los archivos de E200.
- Felipe: `wrangler.jsonc` (rama corta), `AGENTS.md` y `.claude/settings.json` (bloques de la bitácora).

## Criterios de aceptación (verificables)
- [x] (Fase 1, 24-11-2026) ADR-107 a ADR-109 registrados en `decisiones.md`; bloques de `wrangler.jsonc`, `AGENTS.md` y `.claude/settings.json` entregados en la bitácora; tareas 5b y 5c documentadas.
- [x] (Fase 2) Felipe autorizó de forma explícita la creación de `ajustes-visuales` (rama larga ya reconfirmada el 24-11-2026); existe, parte de `main` posterior al merge de la rama corta y es la rama activa.
- [x] `main` contiene `"workers_dev": false` y `"preview_urls": true`; producción responde 200 en `/es/` y `/en/`; workers.dev de producción sigue sin servir el sitio.
- [x] Un push a `ajustes-visuales` genera su URL de preview y responde 200 en `/es/` y `/en/` (URL anotada en la bitácora).
- [x] (`noindex` verificado; correos reales y secretos trasladados a E200-I13, ADR-123) Queda registrado si la preview lleva `noindex` y si manda correos reales, y, si no hay `noindex` o los manda, la decisión de Felipe (tarea 5c).
- [x] (trasladado a E200-I13, ADR-123; AT-100 y AT-147 con su nuevo plan) Turnstile probado en la preview y decidido (mantener `workers.dev`, widget aparte o validar el `hostname`); AT-100 y AT-147 resueltos o con su nuevo plan (tarea 5b).
- [x] El agente usó el navegador en local y en la preview: tema, idioma, hover, Tab y dos anchos, con la evidencia en la bitácora.
- [x] `README.md` actualizado y bloques de `AGENTS.md` (líneas 27, 34, 36 y 44, y la sección 3) y `.claude/settings.json` entregados.
- [x] (`src/` sin cambios en I01; `/es/` y `/en/` con los mismos tamaños en producción y en la preview) `dist/` sin cambios visibles: mismos archivos `.html` que la línea base de E190-I04.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n`, `pnpm verify:seo` y `pnpm check:redirects` sin errores.
- `pnpm check:redirects --base https://felipecuevas.dev` sin fallos.
- Comprobaciones en vivo de las tareas 5, 5b y 5c, y prueba del navegador de la tarea 6.

## ADR registrados
ADR-123 (Worker Previews con `previews` vacío; experimento con `preview_urls: false`) y ADR-124 (`preview_urls: true` solo durante E200) se registraron en la fase 2.

ADR-107 (épica abierta, sustituye en parte a ADR-056), ADR-108 (URL de preview por rama y workers.dev apagado) y ADR-109 (navegador para los agentes: Playwright MCP) quedaron registrados en `_planificacion/00_producto/decisiones.md:1151-1175` el 24-11-2026 (fase 1). El texto vigente vive allí; no se duplica aquí.

## Riesgos y notas
- **Inferencia por verificar:** que un despliegue de producción sin `preview_urls` (valor `false`) apague la preview. El bloque llega a `main` antes de trabajar en la rama, así que el riesgo queda cubierto aunque la inferencia sea falsa.
- **Preview pública y Worker compartido:** la preview usa el mismo Worker y, probablemente, los mismos secretos que producción (no verificado). Un envío desde la preview podría mandar un correo real: por eso la tarea 5c va antes de cualquier envío de prueba, y I13 repite el formulario real solo después de resolverla.
- El nombre exacto de la URL de rama lo da el panel; puede truncarse o normalizarse.
- En Windows, `.mcp.json` podría necesitar `cmd /c` para ejecutar `pnpm`; se confirma en la prueba de la tarea 6.
- El paso 9b vivía en E190 y E190-I04 lo cerró el 24-11-2026 (AT-048 y AT-122 resueltos): esta iteración solo agrega `preview_urls`.

## Cierre obligatorio
Fase 1 (24-11-2026):
- [x] Actualizar estado (`[~]`) en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar hallazgos nuevos en `auditoria-tecnica.md` (avances de AT-149 y AT-153) y decisiones nuevas en `decisiones.md` (ADR-107 a ADR-109)
- [x] Escribir la bitácora en `99_bitacora/2026-11-24_E200-I01.md`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

Fase 2 (tras la confirmación de Felipe):
- [x] Actualizar estado (`[x]`) en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar hallazgos y resultados (AT-100, AT-147, AT-149, AT-153)
- [x] Completar la bitácora `99_bitacora/2026-11-24_E200-I01.md`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
