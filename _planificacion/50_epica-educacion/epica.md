# E50 · Página Educación (educacion.html)
- **Prioridad de la épica:** P1 · **Estado:** [~] En curso

## Objetivo
Reconstruir la página de formación académica, diplomados y certificaciones en ambos idiomas. Las certificaciones se agrupan por categoría en franjas temáticas en zigzag (ADR-036).

## Alcance
- Formación y diplomados.
- Gabinete de certificaciones con su interacción.
- JSON-LD de credenciales.
- Certificaciones agrupadas por categoría en franjas de ancho completo que alternan su orientación (zigzag), apiladas en móvil, con la composición definida en E20-I01 (ADR-036). No se elimina contenido: solo se reorganiza.
- Composición propia de la página según el patrón definido en E20-I01 y documentado en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`educacion.html` → `/es/educacion` y `/en/education`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E50-I01](E50-I01-formacion.md) | Formación académica y diplomados | P1 | M | E30-I06 | [x] Terminada |
| [E50-I02](E50-I02-certificaciones.md) | Gabinete de certificaciones y JSON-LD | P1 | M | E50-I01 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Volumen de datos (~468 palabras en `certificaciones.datos.js` y `formacion.datos.js`).
