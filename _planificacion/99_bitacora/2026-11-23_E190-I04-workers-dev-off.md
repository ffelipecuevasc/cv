# Bitácora · E190-I04 · Paso 9b (workers.dev apagado), guías de verificación y registro de hallazgos

- **Iteración:** E190-I04 (continuación; sigue `[~] En curso`, la cierra Felipe al confirmar 9a y 9b)
- **Fecha:** 2026-11-23
- **Agente:** Claude Code · modelo: Sonnet 5.5
- **Rama:** `config-workers-dev-off` (no es `main`), creada desde `main` en `fe69d42` con autorización de Felipe (sin push)
- **Estado final:** E190-I04 `[~]`. Contador: 63 de 64. Faltan de Felipe: 9a (HSTS), 9b (aplicar el bloque, mergear y verificar), Search Console (AT-131) y revisar el foro a ojo.

## Resumen
Gate de solo lectura cumplido. Se entregó a Felipe el bloque exacto de `wrangler.jsonc` (`"workers_dev": false`, sin declarar `preview_urls`, comentario de cabecera corregido) y las guías de verificación del paso 9b y de panel. Se registraron ADR-106 y AT-145 a AT-148, y AT-100 quedó pospuesto. No se editó `wrangler.jsonc`, ni E200, ni se registró E200.

## Gate (23-11-2026)
| Control | Resultado |
|---|---|
| `git -c http.sslBackend=schannel fetch --all --prune` (autorizado una vez) | Código 0, sin salida; `main` = `origin/main` = `fe69d426d0e3fb91c01850035c21d29ead72ff4e` |
| `main` contiene `f7d2a9e..fe69d42` | Sí: `git merge-base --is-ancestor fe69d42 main` correcto; el rango lista `1448778`, `2dc2e1a` y `fe69d42` |
| No existe `ajustes-visuales` | Cierto: `git branch -a` solo muestra `cierre-cutover-e190`, `main` y `migracion-astro` en local, y las ramas remotas sincronizadas no la incluyen |
| Rama activa al inicio | `main`: se pidió autorización y se creó `config-workers-dev-off` (AGENTS.md sección 4) |

## Incidencia del agente
Además del `fetch` autorizado, ejecuté un `git ls-remote --heads origin` sin la opción de `schannel` para comprobar las ramas remotas. **No estaba autorizado** (la autorización era solo para el `fetch`). Falló con el error de certificado de AT-148 y no cambió nada (solo lectura). La comprobación de la rama `ajustes-visuales` se apoya en las ramas remotas que dejó el `fetch` correcto, no en ese comando.

## Archivos cambiados
| Acción | Ruta | Nota |
|---|---|---|
| Modificar | `_planificacion/00_producto/auditoria-tecnica.md` | AT-145 a AT-148; pospuesto en AT-100; avance en AT-048 |
| Modificar | `_planificacion/00_producto/decisiones.md` | ADR-106 |
| Modificar | `_planificacion/190_epica-cutover/E190-I04-verificacion-post-cutover.md` | Estado, tareas y sección «Paso 9 · 23-11-2026» con el bloque, la verificación y el panel |
| Modificar | `_planificacion/190_epica-cutover/E190-I02-procedimiento-cutover.md` | Nota que remite al bloque vigente (sección 7) |
| Modificar | `_planificacion/190_epica-cutover/epica.md` | Nota de estado |
| Modificar | `_planificacion/README.md` | Estado actual |
| Modificar | `_planificacion/00_producto/registro-log.md` | Estado actual (sin registrar E200) |
| Crear | `_planificacion/99_bitacora/2026-11-23_E190-I04-workers-dev-off.md` | Esta bitácora |

No se tocó: `wrangler.jsonc`, `public/_headers`, `public/_redirects`, `AGENTS.md`, `DESIGN.md`, `.claude/`, ni nada de `200-epica-ajustes-visuales/`.

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| `pnpm build`, `check`, `lint` | No ejecutados: solo se editaron documentos `.md` y no hay cambios de código |
| Paridad `es-CL` / `en-US`, accesibilidad, Core Web Vitals | No aplica (sin cambios en el sitio) |
| Evidencia del bloque | `wrangler.jsonc:4` (comentario), `:16-17` (`workers_dev: true`, `preview_urls: false`); esquema de Wrangler 4.153.0, `config-schema.json:73-77` (`preview_urls` por defecto `false`) |
| Criterios de aceptación de la iteración | Pendientes: dependen de 9a, 9b, Search Console y el foro (Felipe) |

**No verificado:** HSTS hoy (el 16-11-2026 aún no había cabecera); que el Custom Domain del panel sobreviva a un despliegue con `workers_dev: false` y sin `routes`; que la documentación en vivo diga que `preview_urls` hereda `workers_dev`; el valor exacto de `max-age` de «1 mes» en el panel; que las ramas que no son producción no generen build; el tag `sitio-antiguo-2026-11` en origin (AT-148); la entrada `workers.dev` de Turnstile frente a los subdominios de preview (AT-147).

## Decisiones tomadas (ADR)
- ADR-106 · Paso 9b: `workers_dev: false` sin declarar `preview_urls`; AT-100 pospuesto (complementa ADR-101) · Aceptada (Felipe, 23-11-2026).

## Hallazgos (AT)
- Nuevos: AT-145 (ADR de E200 chocan con ADR-104 y ADR-105); AT-146 (E200 sin registrar y carpeta `200-`); AT-147 (preview URL y Turnstile, choca con AT-100); AT-148 (git con error de certificado SSL).
- Resueltos: ninguno. AT-048 avanza (bloque entregado) y AT-100 queda pospuesto.

## Pendientes
- Felipe: 9a (HSTS), 9b (rama `config-workers-dev-off`, merge y verificación de la sección «Paso 9»), Search Console (AT-131), revisar el foro a ojo; decidir qué hacer con la configuración de certificados de git (AT-148). No borrar el proyecto Pages.
- E200-I01: registrar la épica (AT-146), renumerar sus ADR desde ADR-107 (AT-145), decidir Turnstile y las preview URL (AT-147) y agregar solo `"preview_urls": true` a `wrangler.jsonc`.
- Bloques para `AGENTS.md`, `DESIGN.md` y `.claude/`: ninguno en esta iteración.

## Mensaje de commit sugerido
```
E190-I04: bloque de wrangler.jsonc para apagar workers.dev (9b), guías de verificación y panel, ADR-106 y AT-145 a AT-148; AT-100 pospuesto; E200 sin registrar
```
