# Bitácora · E200-I00 · Registro de E200 y renumeración de sus ADR

- **Iteración:** E200-I00
- **Fecha:** 2026-11-24
- **Agente:** Claude Code (versión no verificada) · modelo: Claude Sonnet 5.5
- **Rama:** `e200-i00-renumeracion` (creada desde `main` con autorización de Felipe; sin push; no es `main`)
- **Estado final:** Terminada

## Resumen
Iteración solo documental. Se registró E200 en `_planificacion/README.md` y `registro-log.md` (15 iteraciones, I00 a I14; 21 épicas y 79 iteraciones), se renombró su carpeta a `200_epica-ajustes-visuales` y se renumeraron +3 los ADR de E200 (ADR-104 a ADR-119 pasan a ADR-107 a ADR-122) para que no choquen con los ADR-104, ADR-105 y ADR-106 reales. Se actualizó E200-I01 con lo que cambió desde el 16-11-2026, se agregaron avisos de `DESIGN.md` §8 en E200-I02, I07 e I13 y se registraron AT-149 a AT-153. No se tocó código, `decisiones.md`, `wrangler.jsonc`, `public/`, `AGENTS.md`, `DESIGN.md` ni `.claude/`.

## Gate
- `git -c http.sslBackend=schannel fetch`: el primer intento falló con `getaddrinfo() thread failed to start` (error de red, distinto del de certificado de AT-148); el segundo terminó con código 0. Lo reintenté una vez, sin avanzar con el trabajo entre ambos.
- `main` = `origin/main` = `7eaae4c`, árbol limpio, E190 cerrada en `_planificacion/README.md` y `registro-log.md`, `ajustes-visuales` inexistente (local y remota).
- Rama `e200-i00-renumeracion` creada con `git switch -c`, autorizada por Felipe.

## Archivos cambiados
| Acción | Ruta | Nota |
|---|---|---|
| Mover | `_planificacion/200-epica-ajustes-visuales/` → `_planificacion/200_epica-ajustes-visuales/` | `git mv` (AT-146) |
| Crear | `_planificacion/200_epica-ajustes-visuales/E200-I00-renumeracion.md` | Objetivo, tareas y criterios |
| Modificar | `_planificacion/200_epica-ajustes-visuales/epica.md` | Renumeración, tabla «antiguo → nuevo», fila de I00, ruta de la línea base de ADR-015 |
| Modificar | `…/E200-I01-preparacion-estructural.md` | Renumeración y actualización (ver abajo) |
| Modificar | `…/E200-I02`, `I07` e `I13` | Renumeración y aviso de `DESIGN.md` §8 |
| Modificar | `…/E200-I03`, `I04`, `I05`, `I06`, `I08`, `I09`, `I10`, `I11`, `I12` e `I14` | Solo renumeración |
| Modificar | `_planificacion/README.md` | E200 registrada (estado, contador 65 de 79, lista, árbol de carpetas) |
| Modificar | `_planificacion/00_producto/registro-log.md` | E200 registrada (resumen, orden, tabla de 15 iteraciones) |
| Modificar | `_planificacion/00_producto/auditoria-tecnica.md` | AT-149 a AT-153 nuevos; AT-145 y AT-146 resueltos |
| Modificar | `_planificacion/190_epica-cutover/epica.md` | Solo la ruta de la carpeta de E200 (línea 44) |
| Crear | `_planificacion/99_bitacora/2026-11-24_E200-I00-renumeracion.md` | Esta bitácora |

`_planificacion/00_producto/decisiones.md` **no cambió** (confirmado con `git diff --stat`).

## Reemplazos de ADR aplicados (128 apariciones en 86 líneas)
Todas con +3. «Línea» es la del archivo ya renumerado; `I0x` = `E200-I0x-*.md`.

| Archivo | Líneas y cambio |
|---|---|
| `epica.md` | 2, 10, 51, 82: 104→107 · 24, 52, 86: 105→108 · 26: 105→108 (ADR-101 real, sin cambio) · 53, 75: 106→109 · 54: 107→110 · 55: 108→111 · 56: 109→112 · 57: 110→113 · 58: 111→114 · 59: 112→115 · 60: 113→116 · 61: 114→117 · 62: 115→118 · 63: 116→119 · 64: 117→120 · 65: 118→121 · 66: 119→122 |
| `I01` | 23, 30, 42, 100: 104→107 · 30, 42, 44, 59, 112: 105→108 · 30, 33, 42, 47, 118: 106→109 |
| `I02` | 4: 104→107, 106→109 · 103: 106→109 · 104, 125: 107→110 |
| `I03` | 4: 104→107, 106→109 · 53, 78: 108→111 · 73: 106→109 |
| `I04` | 4: 104→107, 108→111 · 43: 108→111 · 49, 69: 109→112 · 65: 106→109 |
| `I05` | 4: 104→107, 106→109, 108→111 · 46, 69: 110→113 · 64: 106→109 |
| `I06` | 4: 104→107, 106→109, 108→111, 110→113 · 57, 80: 111→114 · 76: 106→109 |
| `I07` | 4: 104→107, 106→109, 108→111, 111→114 · 58, 81: 112→115 · 77: 106→109 |
| `I08` | 4: 104→107, 106→109, 110→113, 111→114, 112→115 · 49, 69: 113→116 · 65: 106→109 |
| `I09` | 4: 104→107, 106→109, 110→113, 111→114, 113→116 · 68, 88: 114→117 · 84: 106→109 |
| `I10` | 4: 104→107, 106→109, 110→113, 111→114, 114→117 · 65, 86: 115→118 · 82: 106→109 |
| `I11` | 4: 104→107, 106→109, 110→113, 111→114, 114→117, 115→118 · 91, 112: 116→119 · 108: 106→109 |
| `I12` | 4: 104→107, 106→109, 110→113, 111→114, 116→119 · 59, 80: 117→120 · 76: 106→109 |
| `I13` | 4: 104→107, 106→109, 110→113, 111→114 · 73, 96: 118→121 · 92: 106→109 |
| `I14` | 4: 104→107, 106→109, 110→113, 111→114 · 86, 118: 119→122 · 114: 106→109 |

(Los números de línea son los del momento de renumerar, antes de las demás ediciones. Después se corrieron en `epica.md` (tabla nueva y fila de I00), `I01` (ediciones de contenido) e `I02`, `I07` e `I13` (aviso de §8): la ubicación actual se obtiene con `grep -n "ADR-1"`.)

Revisión a mano: `epica.md:26` quedó con ADR-101 (real) y ADR-108 (preview de E200), y `epica.md:86` con ADR-108.

## Cambios de contenido en E200-I01
- Cabecera: depende de E200-I00; ya no cierra AT-048 (resuelto en E190-I04); cierra AT-100 y AT-147 si decide Turnstile.
- Contexto: estado real de `wrangler.jsonc` (`workers_dev: false`, sin `preview_urls`).
- Alcance y tareas: sin el registro de E200 ni la renumeración (los hizo E200-I00); los textos de ADR-107 a ADR-109 se siguen registrando en `decisiones.md` desde esta iteración, porque E200-I00 no crea ADR.
- Rama: reconfirmar con Felipe la rama larga `ajustes-visuales` (excepción a `AGENTS.md:27` y `:39`) antes de crearla.
- Bloque de `wrangler.jsonc`: solo agrega `"preview_urls": true,` y ajusta la última frase del comentario de la línea 5; conserva las líneas 1 a 4. Reversa corregida.
- Bloque de `AGENTS.md`: líneas 27, 34, 36 y 44 y sección 3; bloque de `.claude/settings.json` (AT-149).
- Tarea 5b: probar Turnstile en la primera preview real y decidir (AT-100 y AT-147).
- Tarea 5c: verificar si la preview manda correos reales y si lleva `noindex`.

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| Recuento de iteraciones | 64 IDs únicos en archivos de épica y 64 en `registro-log.md`, sin diferencias (los 2 archivos de más son auxiliares de E190-I01 y E190-I02); más 15 de E200 = 79; épicas 20 + 1 = 21 |
| `grep` de `ADR-104` a `ADR-106` en la carpeta de E200 | Solo quedan menciones explícitas a los ADR reales, en `E200-I00`, `epica.md` (explicación y columna «antiguo» de la tabla) y `E200-I01` (último ADR real, texto vigente de `AGENTS.md` y comentario vigente de `wrangler.jsonc`); ninguna con el sentido de E200 |
| Ruta antigua `200-epica-ajustes-visuales` | Solo en evidencia histórica: `auditoria-tecnica.md` (AT-145, AT-146 y su cierre), bitácoras de E190 y `.idea/workspace.xml` (ignorado por git) |
| `pnpm format:check` | **Falla (código 1), por un archivo que esta iteración no tocó:** única advertencia `wrangler.jsonc` (sin salto de línea final; idéntico al de `main`). Ningún archivo de esta iteración aparece en la advertencia (`.prettierignore` excluye `*.md` y `_planificacion/`). Registrado como AT-153; no se editó `wrangler.jsonc` (ADR-033) |
| `pnpm build`, `pnpm check`, `pnpm lint` | No aplican: iteración solo documental, sin cambios en `src/` |
| Paridad `es-CL` / `en-US`, accesibilidad, Core Web Vitals | No aplican (sin cambios en el sitio) |
| Criterios de aceptación de la iteración | Todos cumplidos |

## Decisiones tomadas (ADR)
- Ninguna. ADR-107 a ADR-122 solo tienen número asignado; sus textos se registran en sus iteraciones.

## Hallazgos (AT)
- Nuevos: AT-149 (permisos de `settings.json` sin `verify`/`check:*` y `pnpm test` inexistente) · AT-150 (BL-07 cerrado y sin fila en el backlog) · AT-151 (E200-I06 debe repetir la matriz del hero, ADR-016) · AT-152 (riesgo de superar los 120 KB de fuentes en E200-I03) · AT-153 (`format:check` falla en `main` por `wrangler.jsonc` sin salto de línea final; hallazgo propio, fuera de los cuatro pedidos).
- Resueltos: AT-145 y AT-146.

## Pendientes
- **Felipe (antes de E200-I01):** reconfirmar la rama larga `ajustes-visuales` y autorizar su creación; aplicar el bloque de `wrangler.jsonc` en una rama corta; decidir sobre Turnstile y la preview (tareas 5b y 5c).
- **Felipe, `wrangler.jsonc`:** al aplicar el bloque de E200-I01, que termine con salto de línea (AT-153); así `format:check` vuelve a verde.
- **Felipe, `AGENTS.md` y `.claude/settings.json`:** los bloques los entrega E200-I01.
- **Corrección a un análisis previo del mismo día:** dije que no había verificado el estado de BL-07; está cerrado por ADR-061 (`decisiones.md:579`). Quedó como AT-150.
- **Posible ambigüedad:** si Felipe quería que E200-I00 registrara también el texto de ADR-107 a ADR-109 en `decisiones.md`, hay que pedirlo (esta iteración tenía los ADR nuevos prohibidos).
- **BL-07:** la fila tachada la agrega una iteración documental futura (AT-150).
- **`.idea/workspace.xml`** cita la ruta antigua; es un archivo local ignorado por git y no se tocó.

## Mensaje de commit sugerido
```
E200-I00: registra E200 (15 iteraciones), renombra carpeta a 200_epica, renumera ADR +3 (107 a 122), actualiza E200-I01, avisos de DESIGN §8 y AT-149 a AT-153.
```
