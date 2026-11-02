# E110 · Retiro de Eventos
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (02-11-2026)

> **Reconversión (ADR-077, 02-11-2026):** la épica se planificó como «Página Eventos (eventos.html)». Felipe decidió que los eventos salen del sitio personal porque viven en el sitio de su comunidad, Pulso Devs. La épica se reescribe como retiro (ADR-056: su única iteración no estaba cerrada). El nombre de la carpeta `110_epica-eventos/` se conserva porque los IDs y rutas son estables.

## Objetivo
Retirar Eventos del sitio nuevo: sin página, sin opción de menú, sin ruta en el mapa y con `/eventos` en 404.

## Alcance
- Navbar de escritorio y móvil, diccionario, mapa de rutas, pie y `verify:seo`.
- Documentos pendientes que contaban 14 páginas.

## Páginas cubiertas
Ninguna. `eventos.html` no se migra: `/eventos`, `/eventos.html`, `/es/eventos/` y `/en/events/` dan 404 (ADR-077).

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E110-I01](E110-I01-pagina-completa.md) | Retiro de Eventos | P1 | S | E30-I06 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] Ninguna página del sitio nuevo enlaza a eventos, en `es-CL` ni en `en-US`.
- [x] El menú Comunidad queda con Foro y Recursos.
- [x] El contenido del sitio actual se retira por un ADR que lo autoriza (ADR-077).
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Enlaces entrantes a `/eventos` darán 404 tras el cutover (aceptado, ADR-077).
