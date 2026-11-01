# E70 · Página Desarrollador (desarrollador.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (01-11-2026)

## Objetivo
Reconstruir el perfil de desarrollador con aspectos técnicos, muro de tecnologías y portafolio filtrable, en ambos idiomas.

## Alcance
- Aspectos técnicos y 36 tecnologías.
- Portafolio de 12 proyectos con filtros.
- JSON-LD ItemList.
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E70-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
`desarrollador.html` → `/es/desarrollador` y `/en/developer`.

## Dependencias
E60-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E70-I01](E70-I01-tecnologias.md) | Aspectos técnicos y muro de tecnologías | P1 | M | E60-I01 | [x] Terminada |
| [E70-I02](E70-I02-portafolio.md) | Portafolio filtrable y JSON-LD | P1 | M | E70-I01 | [x] Terminada |
| [E70-I03](E70-I03-ajustes-desarrollador.md) | Ajustes de Desarrollador tras la revisión en la preview | P1 | S | E70-I02 | [x] Terminada |

## Nota (01-11-2026)
Se agregó **E70-I03** de ajustes tras la revisión en la preview (ADR-056), que resolvió AT-083 (ADR-069). La épica se cerró el 01-11-2026.

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Página con 36 imágenes: cuidar peso y CLS.
