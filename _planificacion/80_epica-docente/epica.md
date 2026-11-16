# E80 · Página Docente (docente.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (01-11-2026)

## Objetivo
Reconstruir la página de docencia universitaria en ambos idiomas.

## Alcance
- Página completa (~500 palabras).
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E80-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`docente.html` → `/es/docente` y `/en/lecturer`.

## Dependencias
E60-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E80-I01](E80-I01-pagina-completa.md) | Página de docencia universitaria | P1 | M | E60-I01 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Volumen de traducción medio.

## Nota de cierre
Épica terminada el 01-11-2026 con E80-I01: `/es/docente/` y `/en/lecturer/` con la composición B (grilla 2 × 2, zigzag por institución, banda de tutoría y cargos especiales), ADR-070 y AT-087. Queda pendiente que Felipe valide el inglés (ADR-017) y edite `DESIGN.md` 11.2 y 11.7 con el bloque de `99_bitacora/2026-11-01_E80-I01.md` (ADR-033).
