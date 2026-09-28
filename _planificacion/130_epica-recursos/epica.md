# E130 · Página Recursos (recursos.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir las rutas de aprendizaje con progreso local y la bóveda de recursos descargables, en ambos idiomas.

## Alcance
- Rutas con progreso.
- Bóveda de recursos y JSON-LD Course.

## Páginas cubiertas
`recursos.html` → `/es/recursos` y `/en/resources`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E130-I01](E130-I01-rutas-progreso.md) | Rutas de aprendizaje con progreso | P1 | M | E30-I06 | [ ] Pendiente |
| [E130-I02](E130-I02-boveda.md) | Bóveda de recursos y JSON-LD Course | P1 | M | E130-I01 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Los PDFs son pesados y solo están en español (AT-034).
- El progreso guardado de los usuarios actuales no debe perderse (ADR-023).
