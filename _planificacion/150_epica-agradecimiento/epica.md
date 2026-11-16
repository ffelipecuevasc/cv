# E150 · Página Agradecimiento (agradecimiento.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada

## Objetivo
Reconstruir la página de confirmación de envío en ambos idiomas, no indexable.

## Alcance
- Página completa.
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E150-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`agradecimiento.html` → `/es/agradecimiento` y `/en/thank-you`.

## Dependencias
E140-I02.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E150-I01](E150-I01-pagina-completa.md) | Página de agradecimiento | P2 | S | E140-I02 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Bajo.
