# E110 · Página Eventos (eventos.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir la página de eventos con su estado Próximo/Finalizado calculado por fecha, en ambos idiomas.

## Alcance
- Página completa con capa de datos de eventos.

## Páginas cubiertas
`eventos.html` → `/es/eventos` y `/en/events`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E110-I01](E110-I01-pagina-completa.md) | Página de eventos con estado por fecha | P1 | M | E30-I06 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- En un sitio estático, el estado del evento no puede depender solo del momento del build (AT-039).
