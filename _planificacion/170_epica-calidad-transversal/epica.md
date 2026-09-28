# E170 · Calidad transversal
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Verificar el sitio completo en accesibilidad, rendimiento, seguridad y enlaces antes de preparar el cutover.

## Alcance
- Accesibilidad global.
- Core Web Vitals frente a los umbrales de ADR-015.
- Cabeceras de seguridad.
- Enlaces rotos y paridad automatizada es/en.

## Páginas cubiertas
Todas.

## Dependencias
E40–E160 (todas las épicas de página)

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E170-I01](E170-I01-accesibilidad.md) | Revisión de accesibilidad global | P1 | M | E40–E160 (todas las épicas de página) | [ ] Pendiente |
| [E170-I02](E170-I02-rendimiento-cwv.md) | Rendimiento y Core Web Vitals | P1 | M | E40–E160 (todas las épicas de página) | [ ] Pendiente |
| [E170-I03](E170-I03-cabeceras-seguridad.md) | Cabeceras de seguridad | P1 | M | E40–E160 (todas las épicas de página) | [ ] Pendiente |
| [E170-I04](E170-I04-enlaces-paridad.md) | Enlaces rotos y paridad es/en automatizada | P1 | S | E40–E160 (todas las épicas de página) | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] Sin errores críticos de accesibilidad en las 26 páginas (13 × 2 idiomas).
- [ ] Umbrales de ADR-015 cumplidos.
- [ ] CSP activa sin romper Turnstile, Calendly ni Giscus.
- [ ] Cero enlaces rotos internos.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Una CSP estricta puede romper integraciones de terceros.
