# E90 · Página Instructor (instructor.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir la página de instructor REUF/SENCE y la trayectoria como relator, en ambos idiomas.

## Alcance
- Secciones de instructor REUF.
- Relatoría con capa de datos.

## Páginas cubiertas
`instructor.html` → `/es/instructor` y `/en/instructor`.

## Dependencias
E60-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E90-I01](E90-I01-trayectoria-reuf.md) | Trayectoria como instructor REUF | P1 | M | E60-I01 | [ ] Pendiente |
| [E90-I02](E90-I02-relatoria.md) | Trayectoria como relator (capa de datos) | P2 | S | E90-I01 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Volumen (~610 palabras).
