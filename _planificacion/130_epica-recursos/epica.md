# E130 · Página Recursos (recursos.html)
- **Prioridad de la épica:** P1 · **Estado:** [x] Terminada (03-11-2026)

> Reescrita el 03-11-2026 por ADR-079 (ADR-056: la épica no estaba cerrada). Antes: «Rutas de aprendizaje con progreso» (I01) y «Bóveda de recursos y JSON-LD Course» (I02).

## Objetivo
Reconstruir la página como **bóveda mixta**, en ambos idiomas: una ruta de aprendizaje con progreso local (`desarrollo-web-ia`) y los demás recursos agrupados por temática, sin progreso (ADR-079).

## Alcance
- Ruta «Desarrollo Web & IA» con los pasos 9 al 33 de `main`, progreso en `rutas-progreso` (ADR-023), `?ruta=` y su hilo de Giscus `ruta-desarrollo-web-ia`.
- Recursos 1 al 8 agrupados por temática: Empleabilidad (1, 3), Python (2, 4, 5, 6, 7) y Java (8).
- Descargables con la URL de `main` (AT-043), aviso de idioma y peso visible (AT-034); JSON-LD.
- Composición A (ADR-080): cabecera → banda de la ruta → línea de tiempo de pasos → hilo → temáticas en grilla por grupo (ADR-081).
- JSON-LD: un solo `Course` para la ruta (ADR-082).
- El modelo y el diseño prevén el tipo «artículo», sin páginas ni contenido (backlog BL-09, posterior al cutover).

## Fuera de alcance
- Las rutas `python`, `empleabilidad` y `java` de `main` y sus hilos de Giscus (ADR-079).
- Traducción de los PDF (BL-04).

## Páginas cubiertas
`recursos.html` → `/es/recursos/` y `/en/resources/`.

## Dependencias
E30 completa.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E130-I01](E130-I01-rutas-progreso.md) | Bóveda mixta: página, modelo y ruta Web & IA | P1 | M | E30-I06 | [x] Terminada |
| [E130-I02](E130-I02-boveda.md) | Bóveda mixta: temáticas, descargables y JSON-LD | P1 | M | E130-I01 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [x] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice (ADR-079 retira las rutas python, empleabilidad y java como rutas; sus recursos siguen en la bóveda).
- [x] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [x] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Los PDF son pesados y solo están en español (AT-034).
- El progreso guardado de los usuarios actuales no debe perderse (ADR-023): el de las rutas retiradas queda en la clave, sin mostrarse.
