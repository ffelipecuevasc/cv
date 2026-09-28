# E160 · Página 404 (404.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir la página de error 404 por idioma, con rutas absolutas y logotipo animado.

## Alcance
- 404 en ambos idiomas y comportamiento para rutas sin prefijo.

## Páginas cubiertas
`404.html` → `/es/404` y `/en/404`.

## Dependencias
E30 completa y E10-I09.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E160-I01](E160-I01-pagina-completa.md) | Página 404 por idioma | P1 | S | E30-I06, E10-I09 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- El manejo de 404 difiere entre Pages y Workers.
