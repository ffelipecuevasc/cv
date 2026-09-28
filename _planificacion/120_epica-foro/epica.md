# E120 · Página Foro (foro.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir la página del foro con Giscus en ambos idiomas, compartiendo el mismo hilo.

## Alcance
- Página completa con hilo general.

## Páginas cubiertas
`foro.html` → `/es/foro` y `/en/forum`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E120-I01](E120-I01-pagina-completa.md) | Página del foro con Giscus bilingüe | P1 | M | E30-I06 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Cambiar el término del hilo dejaría huérfana la conversación actual.
