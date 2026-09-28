# E40 · Página Inicio (index.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir la portada con un hero rediseñado que en escritorio se vea completo sin scroll (D-09), más la franja de trayectoria y los testimonios, en ambos idiomas.

## Alcance
- Hero rediseñado con todos sus elementos.
- Franja de trayectoria y testimonios dentro de `<main>`.
- JSON-LD Person y WebSite bilingües.

## Páginas cubiertas
`index.html` → `/es/` y `/en/`.

## Dependencias
E30 completa, E20-I05.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E40-I01](E40-I01-hero.md) | Hero rediseñado sin scroll en escritorio | P0 | M | E30-I06, E20-I05 | [ ] Pendiente |
| [E40-I02](E40-I02-trayectoria-testimonios.md) | Franja de trayectoria y testimonios | P1 | M | E40-I01 | [ ] Pendiente |
| [E40-I03](E40-I03-seo-jsonld.md) | SEO y datos estructurados de la portada | P1 | S | E40-I02 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] En los viewports de ADR-016, navbar + hero + 3 certificaciones + redes sociales se ven completos sin scroll.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- El texto en inglés del hero es más largo y puede romper el ajuste sin scroll.
- Cifras inconsistentes de certificaciones (AT-014).
