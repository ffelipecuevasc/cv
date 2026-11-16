# Bitácora · E190-I04 · Retiro de docs/ y format:check

- **Iteración:** E190-I04 (continuación)
- **Fecha:** 2026-11-16
- **Agente:** Claude Code · modelo: Sonnet 5.5
- **Rama:** `cierre-cutover-e190` (no es `main`)
- **Estado final:** E190-I04 sigue `[~] En curso` (faltan paso 9, Search Console AT-131, AT-100 y la revisión del foro, de Felipe). Contador: 63 de 64.

## Resumen
Gate cumplido: `docs/` no existe, `_planificacion/00_producto/linea-base/2026-08-12/resumen-lighthouse.md` existe y el árbol estaba limpio. Se creó la línea base de noviembre, ADR-105, se corrigieron las referencias vivas a `docs/` y se agregó la plantilla YAML a `.prettierignore`.

## Archivos cambiados
| Acción | Ruta | Nota |
|---|---|---|
| Crear | `_planificacion/00_producto/linea-base/README.md` | Vigente (nov. 2026) e histórica (ago. 2026) |
| Crear | `_planificacion/00_producto/linea-base/2026-11-16/resumen-psi-produccion.md` | Tabla de PSI de `/es/` y `/en/` |
| Modificar | `.prettierignore` | `public/static/recursos/ia/desarrollo-web/esqueleto-workflow-publicar.yml` |
| Modificar | `README.md` | Quita `docs/` del árbol; enlaza la línea base vigente |
| Modificar | `_planificacion/00_producto/decisiones.md` | ADR-105 (ADR-015 y ADR-102 sin editar) |
| Modificar | `_planificacion/190_epica-cutover/E190-I04-verificacion-post-cutover.md` | `docs/` retirado; línea base vigente |
| Modificar | `_planificacion/190_epica-cutover/epica.md` | Nota de estado |
| Modificar | `_planificacion/README.md`, `_planificacion/00_producto/registro-log.md` | Estado actual |
| Crear | `_planificacion/99_bitacora/2026-11-16_E190-I04-docs-linea-base.md` | Esta bitácora |

## Referencias a `docs/` que no se tocaron (históricas, no se reescriben)
- `_planificacion/00_producto/decisiones.md`: ADR-015 (línea 84), ADR en la línea 209 y ADR-102. ADR-105 indica la ruta nueva.
- `_planificacion/00_producto/auditoria-tecnica.md`: líneas 53 y 211 (rutas de agosto). Sin AT nuevo.
- `E10-I01`, `E170-I01`, `E170-I02` y `E190-I03` (archivos de iteración) y las bitácoras 2026-10-27_E10-I01, 2026-11-13_E170-I02 y 2026-11-15_E190-I03.
- `AGENTS.md:28` cita `docs/` en el texto del sitio antiguo; lo edita Felipe y ya lo actualizó, no lo modifiqué. `src/content/resources/items.json` solo tiene la URL `docs.claude.com`. `package.json`, `scripts/` y configuraciones: sin referencias.

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| `pnpm build` | ok (27 páginas) |
| `pnpm check` | ok: 0 errores, 0 advertencias, 0 sugerencias |
| `pnpm lint` | ok |
| `pnpm format:check` | ok |

## Decisiones (ADR) y hallazgos (AT)
- ADR-105 · Se retira `docs/`; líneas base en `00_producto/linea-base/` · Aceptada.
- AT: ninguno nuevo ni resuelto. Próximos números: ADR-106 y AT-145.

## Mensaje de commit sugerido
```
E190-I04: docs/ retirado, línea base de producción en 00_producto/linea-base/2026-11-16 (ADR-105) y plantilla YAML en .prettierignore
```
