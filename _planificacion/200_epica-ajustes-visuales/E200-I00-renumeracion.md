# E200-I00 · Registro de E200 y renumeración de sus ADR
- **Estado:** [x] Terminada (24-11-2026)
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I04 · **Hallazgos que cierra:** AT-145 y AT-146 · **ADR relacionados:** ADR-033, ADR-104, ADR-105, ADR-106 (los tres reales, que no cambian)

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Dejar la planificación de E200 consistente antes de ejecutar su primera iteración con cambios: registrar la épica en `_planificacion/README.md` y `registro-log.md`, renumerar sus ADR para que no choquen con los ADR reales y corregir las referencias obsoletas de E200-I01. Solo documentos: no cambia código, configuración ni el sitio.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- E200 se redactó el 16-11-2026 con ADR del 104 al 119. El 15 y el 16-11-2026 `decisiones.md` ya había registrado ADR-104 (ventana del cutover) y ADR-105 (retiro de `docs/`), y el 23-11-2026, ADR-106 (paso 9b). AT-145 documenta el choque.
- La carpeta de la épica se llamaba `200-epica-ajustes-visuales` (guion medio) y no seguía el patrón `NNN_epica-<slug>` de las demás. AT-146 lo documenta.
- Decisión de Felipe (24-11-2026): el registro de E200 y la renumeración los hace E200-I00; ADR-107 es el primer número libre.
- Análisis previo de solo lectura (24-11-2026) con la tabla de apariciones por archivo y línea.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Alcance
- Renombrar la carpeta a `200_epica-ajustes-visuales` con `git mv` y corregir las rutas vigentes que la citan.
- Renumerar +3 los ADR de `epica.md` y de E200-I01 a E200-I14 (104→107 … 119→122) y agregar la tabla «antiguo → nuevo» en `epica.md`.
- Registrar E200 en `_planificacion/README.md` y `registro-log.md`: 15 iteraciones (I00 a I14), 21 épicas y 79 iteraciones en total.
- Actualizar E200-I01 (registro que ya no le corresponde, AT-048 y 9b resueltos, bloque de `wrangler.jsonc` solo con `preview_urls`, reconfirmar la rama larga, tareas de Turnstile y de correos y `noindex` de la preview).
- Avisos de DESIGN.md §8 en E200-I02, E200-I07 y E200-I13, y ruta de la línea base de ADR-015 en `epica.md`.
- Registrar los hallazgos AT-149 a AT-153.

## Fuera de alcance
- Registrar ADR en `decisiones.md`: los textos de ADR-107 a ADR-122 siguen en sus iteraciones y se registran al ejecutarlas. `decisiones.md` no cambia.
- Editar `wrangler.jsonc`, `public/_headers`, `public/_redirects`, `AGENTS.md`, `DESIGN.md`, `.claude/` y `src/`.
- Crear la rama `ajustes-visuales` (la crea E200-I01 con la autorización de Felipe).
- Los ADR-104, ADR-105 y ADR-106 reales y las referencias históricas (bitácoras, AT-145 y AT-146, `190_epica-cutover/`).

## Tareas
- [x] **Gate:** `main` = `origin/main`, árbol limpio, E190 cerrada, sin `ajustes-visuales`; rama corta `e200-i00-renumeracion` creada con autorización de Felipe, sin push.
- [x] **Carpeta:** `git mv` a `200_epica-ajustes-visuales` y corrección de la ruta en `190_epica-cutover/epica.md`.
- [x] **Renumeración:** una sola pasada +3 en `epica.md` y los 14 archivos de iteración; revisión a mano de `epica.md:26` y `:86` (mezclan ADR-101 real con el ADR de preview de E200) y tabla «antiguo → nuevo».
- [x] **Registro:** E200 en `_planificacion/README.md` y `registro-log.md`, con recuento verificado (64 + 15 = 79).
- [x] **E200-I01 y avisos:** cambios descritos en el alcance.
- [x] **Hallazgos:** AT-149 a AT-153; AT-145 y AT-146 marcados como resueltos.
- [x] **Cierre:** `git diff --stat`, `pnpm format:check`, bitácora y commit sugerido.

## Archivos previstos (crear / modificar)
- Crear: este archivo y `99_bitacora/2026-11-24_E200-I00-renumeracion.md`.
- Mover: la carpeta de E200.
- Modificar: `epica.md` e iteraciones I01 a I14 de E200, `_planificacion/README.md`, `_planificacion/00_producto/registro-log.md`, `_planificacion/00_producto/auditoria-tecnica.md` y `_planificacion/190_epica-cutover/epica.md` (solo la ruta).

## Criterios de aceptación (verificables)
- [x] La carpeta se llama `200_epica-ajustes-visuales` y ninguna ruta vigente cita `200-epica-ajustes-visuales`.
- [x] En `epica.md` y E200-I01 a I14, ningún `ADR-104`, `ADR-105` ni `ADR-106` tiene el sentido de E200.
- [x] Los ADR reales 104 a 106 y `decisiones.md` no cambiaron.
- [x] `registro-log.md` y `_planificacion/README.md` registran 21 épicas, 79 iteraciones, 65 terminadas (E200-I00) y E200 en curso.
- [x] `git diff --stat` no muestra `src/`, `wrangler.jsonc`, `public/`, `AGENTS.md`, `DESIGN.md` ni `.claude/`.
- [x] Cumple la Definition of Done global de `_planificacion/README.md` en lo que aplica a una iteración solo documental (sin `build` ni `check`).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm format:check`.
- `grep` de `ADR-10[4-6]` en la carpeta de E200: solo quedan menciones explícitas a los ADR reales.
- `git diff --stat` antes y después de editar, y `git status` sin archivos fuera de la lista.

## ADR a registrar
Ninguno. ADR-107 a ADR-122 se registran en sus iteraciones, con la numeración de `epica.md`.

## Riesgos y notas
- Si otra iteración registra un ADR antes de E200-I01, el número libre cambia: cada iteración vuelve a verificar el último ADR de `decisiones.md` (nota de `epica.md`).
- Las bitácoras, AT-145, AT-146 y `190_epica-cutover/` conservan la ruta y los números antiguos como evidencia histórica.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md` (sin decisiones nuevas)
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
