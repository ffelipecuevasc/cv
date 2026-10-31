# E40 · Página Inicio (index.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (31-10-2026; inglés validado por Felipe el 30-10-2026)

## Objetivo
Reconstruir la portada con un hero rediseñado que en escritorio se vea completo sin scroll (D-09), más la franja de trayectoria y los testimonios, en ambos idiomas.

## Alcance
- Hero rediseñado con todos sus elementos.
- Franja de trayectoria y testimonios dentro de `<main>`.
- JSON-LD Person y WebSite bilingües.
- Composición propia de la página según el patrón definido en E20-I01 y documentado en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`index.html` → `/es/` y `/en/`.

## Dependencias
E30 completa, E20-I05.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E40-I01](E40-I01-hero.md) | Hero rediseñado sin scroll en escritorio | P0 | M | E30-I06, E20-I05 | [x] Terminada |
| [E40-I02](E40-I02-trayectoria-testimonios.md) | Franja de trayectoria y testimonios | P1 | M | E40-I01 | [x] Terminada |
| [E40-I03](E40-I03-seo-jsonld.md) | SEO y datos estructurados de la portada | P1 | S | E40-I02 | [x] Terminada |
| [E40-I04](E40-I04-hero-banda-ajustes.md) | Hero simplificado y separadores de la banda | P0 | M | E30-I07 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente (paridad exigida por `localized()` al construir y comprobada con `pnpm verify:seo`; el botón de idioma, en E30-I04).
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice (ADR-054 amplió el hero a 4 emisores; ADR-058 retiró llamados a la acción y métricas).
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal (E40-I01 y E40-I02).
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas (E40-I03; verificados con `pnpm verify:seo`).
- [x] En los viewports de ADR-016 (E40-I01), navbar + hero + 4 certificaciones + redes sociales se ven completos sin scroll (vuelto a medir en E40-I04 con el hero simplificado: 48 casos).
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global. Felipe validó el inglés (ADR-017) y confirmó que el validador de schema.org y la Prueba de resultados enriquecidos no dan errores (30-10-2026).

## Riesgos
- El texto en inglés del hero es más largo y puede romper el ajuste sin scroll.
- Cifras inconsistentes de certificaciones (AT-014).

## Nota de cierre
Cierre del 31-10-2026 (`99_bitacora/2026-10-31_E40-cierre.md`): inglés validado por Felipe con 7 ajustes de texto, título y descripción de la portada elegidos (AT-071) y la URL de Anthropic de Credly con `/public_url`. Pasan a E50: AT-067, la URL de Oracle (AT-075) y BL-06; AT-074 va a E170-I02.
