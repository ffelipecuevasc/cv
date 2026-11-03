# E120 · Página Foro (foro.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (02-11-2026)

## Objetivo
Reconstruir la página del foro con Giscus en ambos idiomas, compartiendo el mismo hilo.

## Alcance
- Página completa con hilo general.
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E120-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`foro.html` → `/es/foro` y `/en/forum`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E120-I01](E120-I01-pagina-completa.md) | Página del foro con Giscus bilingüe | P1 | M | E30-I06 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Cambiar el término del hilo dejaría huérfana la conversación actual.
