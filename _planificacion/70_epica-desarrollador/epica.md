# E70 · Página Desarrollador (desarrollador.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir el perfil de desarrollador con aspectos técnicos, muro de tecnologías y portafolio filtrable, en ambos idiomas.

## Alcance
- Aspectos técnicos y 36 tecnologías.
- Portafolio de 12 proyectos con filtros.
- JSON-LD ItemList.

## Páginas cubiertas
`desarrollador.html` → `/es/desarrollador` y `/en/developer`.

## Dependencias
E60-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E70-I01](E70-I01-tecnologias.md) | Aspectos técnicos y muro de tecnologías | P1 | M | E60-I01 | [ ] Pendiente |
| [E70-I02](E70-I02-portafolio.md) | Portafolio filtrable y JSON-LD | P1 | M | E70-I01 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Página con 36 imágenes: cuidar peso y CLS.
