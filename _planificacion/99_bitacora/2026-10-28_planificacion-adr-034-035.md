# Bitácora · Planificación · Privacidad (Ley 21.719) y composición por página

> Actualización de planificación, **no es una iteración**. No se escribió código de `src/`, no se instalaron dependencias ni se ejecutaron comandos de git que modifiquen el repositorio.

- **Iteración:** ninguna (actualización de planificación)
- **Fecha:** 2026-10-28
- **Agente:** Claude Code · modelo: Claude Opus 5.5
- **Rama:** `migracion-astro` (no es `main`)
- **Estado final:** Terminada

## Resumen
Se registran las decisiones que Felipe aprobó el 28-10-2026: política de privacidad con consentimiento en el formulario (Ley 21.719) y sistema común con composición propia por página. La solicitud las numeraba ADR-034 y ADR-035, pero ADR-034 ya estaba ocupado (i18n, E10-I07), por lo que quedaron como **ADR-035** (privacidad) y **ADR-036** (composición). El nombre de este archivo conserva la numeración de la solicitud. Se agregan AT-047, la épica E155 con E155-I01, BL-07 y BL-08, y se ajusta el alcance de las épicas e iteraciones afectadas.

## Archivos cambiados
| Acción | Ruta | Nota |
|---|---|---|
| Modificar | `00_producto/decisiones.md` | ADR-035 y ADR-036 |
| Modificar | `00_producto/auditoria-tecnica.md` | AT-047 en la sección M; numeración desde AT-047 |
| Crear | `155_epica-privacidad/epica.md`, `155_epica-privacidad/E155-I01-pagina-completa.md` | Épica e iteración nuevas |
| Modificar | `README.md`, `00_producto/registro-log.md` | 20 épicas, 53 iteraciones; orden numérico; BL-07 y BL-08 |
| Modificar | `30_epica-layout-global/E30-I02-*`, `E30-I06-footer.md` | Ruta de privacidad y enlace en el pie |
| Modificar | `140_epica-contacto/epica.md`, `E140-I01`, `E140-I02` | Checkbox, error accesible, validación en servidor y registro del consentimiento |
| Modificar | `20_epica-sistema-diseno/epica.md`, `E20-I01`, `E20-I05` | Sección "Composición por página" y primitiva "franja temática" |
| Modificar | `50_epica-educacion/epica.md`, `E50-I02` | Franjas por categoría en zigzag, clasificación por validar |
| Modificar | `epica.md` y primera iteración de E40 a E160 (13 épicas de página) | Tarea de patrón de composición (ADR-036) |
| Modificar | `170_epica-calidad-transversal/epica.md`, `E170-I01` a `E170-I04` | 28 páginas (14 × 2); CSP de privacidad y formulario |
| Modificar | `180_epica-migracion-urls/E180-I02-sitemap-robots.md` | Privacidad en el sitemap con `hreflang` |
| Modificar | `190_epica-cutover/E190-I01-precondiciones.md` | Dos precondiciones de privacidad |

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| `pnpm build` | no aplica (solo documentos) |
| `pnpm check` | no aplica (solo documentos) |
| `pnpm lint` | no aplica (solo documentos) |
| Paridad `es-CL` / `en-US` | no aplica |
| Accesibilidad revisada | no aplica |
| Core Web Vitals frente a ADR-015 | no aplica |
| Totales | 20 carpetas de épica y 53 archivos de iteración contados en disco |

## Decisiones tomadas (ADR)
- ADR-035 · Política de privacidad y consentimiento en el formulario (Ley 21.719) · Aceptada
- ADR-036 · Sistema común con composición propia por página · Aceptada

## Hallazgos (AT)
- Nuevos: AT-047 · Sin política de privacidad ni consentimiento en el formulario de contacto
- Resueltos: Ninguno

## Pendientes
- BL-07: Felipe valida la clasificación de certificaciones por categoría (antes de E50-I02).
- BL-08: un especialista valida el texto de la política (antes de E190).
- Pregunta abierta en E155-I01: si la página de privacidad lleva `noindex`.
- Revisión posterior del mismo día: orden numérico, E155 depende de E140-I02 (constante de versión) y el enlace del pie se movió de E30-I06 a E155-I01.

## Mensaje de commit sugerido
```
Planificación: ADR-035 (privacidad, Ley 21.719) y ADR-036 (composición por página), AT-047, épica E155, BL-07 y BL-08; ajusta E20, E30, E50, E140, E170, E180, E190 y épicas de página.
```
