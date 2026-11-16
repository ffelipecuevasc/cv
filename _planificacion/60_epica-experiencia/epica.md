# E60 · Página Experiencia (experiencia.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (31-10-2026; reabierta ese día por E60-I02, ADR-056)

## Objetivo
Reconstruir la página de resumen de experiencia laboral, que da entrada a los cuatro destinos de sus tres perfiles, en ambos idiomas.

## Alcance
- Página completa con tres perfiles (Docente Universitario, Instructor de Bootcamps y Desarrollador Full Stack) y cuatro destinos: Desarrollador, Docente, Instructor REUF y Talento Digital.
- Composición propia de la página: el patrón («grilla simétrica de tarjetas») se definió con Felipe al inicio de E60-I01 (ADR-065) y se documenta en `DESIGN.md` 11.2 y 11.5 (ADR-036).

## Páginas cubiertas
`experiencia.html` → `/es/experiencia` y `/en/experience`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E60-I01](E60-I01-pagina-completa.md) | Página de resumen de experiencia | P1 | M | E30-I06 | [x] Terminada |
| [E60-I02](E60-I02-ajustes-experiencia.md) | Ajustes de Experiencia tras la revisión en la preview | P1 | S | E60-I01 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Bajo.

## Nota de cierre
E60-I01 terminada el 31-10-2026 (`99_bitacora/2026-10-31_E60-I01.md`). Los enlaces a Desarrollador, Docente, Instructor REUF y Talento Digital dan 404 hasta que E70 a E100 creen esas páginas (ADR-065); cada épica retira sus rutas de la lista cerrada de `verify:seo`.

E60-I02 (31-10-2026, ADR-066): restaura la línea de tiempo (3 hitos), deja la tarjeta Desarrollador vigente hasta hoy y anota que Felipe validó el inglés de la página el 31-10-2026 (`99_bitacora/2026-10-31_E60-I02.md`).
