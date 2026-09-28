# E180 · Migración de URLs y SEO
- **Prioridad de la épica:** P0 · **Estado:** [ ] Pendiente

## Objetivo
Garantizar que ninguna URL pública actual se pierda y que los buscadores entiendan la nueva estructura bilingüe.

## Alcance
- Mapa URL antigua → nueva y redirecciones 301.
- Sitemap bilingüe, `robots.txt` y canónicas.
- Comportamiento de `/` y `x-default`.

## Páginas cubiertas
Todas.

## Dependencias
E160 y el resto de épicas de página.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E180-I01](E180-I01-mapa-redirecciones.md) | Mapa de URLs y redirecciones 301 | P0 | S | E160-I01 | [ ] Pendiente |
| [E180-I02](E180-I02-sitemap-robots.md) | Sitemap bilingüe, robots.txt y canónicas | P0 | S | E180-I01 | [ ] Pendiente |
| [E180-I03](E180-I03-raiz-xdefault.md) | Comportamiento de / y x-default | P0 | S | E180-I01 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] Cada URL del sitio actual (incluidas variantes `.html`, `/comunidad` y archivos públicos) responde 301 a su destino o 200 en la misma ruta.
- [ ] Sitemap con `hreflang` recíprocos.
- [ ] Sin cadenas de redirección.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Perder posicionamiento por redirecciones incorrectas.
