# E100 · Página Talento Digital (talento-digital.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada

## Objetivo
Reconstruir la página de bootcamps de Talento Digital para Chile en ambos idiomas.

## Alcance
- Página completa dividida en dos iteraciones por volumen (~660 palabras).
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E100-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`talento-digital.html` → `/es/talento-digital` y `/en/talento-digital`.

## Dependencias
E60-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E100-I01](E100-I01-bloque-1.md) | Talento Digital, primera mitad de secciones | P1 | M | E60-I01 | [x] Terminada |
| [E100-I02](E100-I02-bloque-2.md) | Talento Digital, segunda mitad de secciones | P1 | M | E100-I01 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- "Talento Digital para Chile" es nombre propio del programa: no se traduce.

## Cierre
Épica terminada el 02-11-2026 con E100-I02. `/es/talento-digital/` y `/en/talento-digital/` migran las 3 secciones de `main`: cabecera, 6 bootcamps en zigzag (ADR-074) y Logros (ADR-076). Las cifras salen de `stats.json` y las horas de los planes, de una sola fuente que comparte Instructor. Sin JSON-LD, como `main` (AT-093). Inglés por validar por Felipe (ADR-017). Bitácoras: `99_bitacora/2026-11-02_E100-I01.md` y `99_bitacora/2026-11-02_E100-I02.md`.
