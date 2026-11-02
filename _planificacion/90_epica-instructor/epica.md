# E90 · Página Instructor (instructor.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (01-11-2026)

## Objetivo
Reconstruir la página de instructor REUF/SENCE y la trayectoria como relator, en ambos idiomas.

## Alcance
- Secciones de instructor REUF.
- Relatoría con capa de datos.
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E90-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`instructor.html` → `/es/instructor` y `/en/instructor`.

## Dependencias
E60-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E90-I01](E90-I01-trayectoria-reuf.md) | Trayectoria como instructor REUF | P1 | M | E60-I01 | [x] Terminada |
| [E90-I02](E90-I02-relatoria.md) | Trayectoria como relator (capa de datos) | P2 | S | E90-I01 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Volumen (~610 palabras).

## Nota de cierre (01-11-2026)
E90 terminada con E90-I01 (cabecera, banda titular, mosaico de cursos y planes SENCE, ADR-072) y E90-I02 (relatoría en grilla de 2 columnas, ADR-073). `/es/instructor/` y `/en/instructor/` tienen paridad, un `<h1>`, metadatos propios y el certificado REUF en la URL de `main` (AT-043). No se eliminó contenido de `main`; el ícono `hub` del h2 de la relatoría no se usa (7.5). Quedan pendientes de Felipe: validar el inglés (ADR-017) y aplicar a `DESIGN.md` los bloques de las bitácoras de E80-I01, E90-I01 y E90-I02 (orden en `99_bitacora/2026-11-01_E90-I02.md`). Hallazgo abierto de la épica: AT-089.
