# E20 · Sistema de diseño
- **Prioridad de la épica:** P0 · **Estado:** [ ] Pendiente

## Objetivo
Definir el `DESIGN.md` nuevo, más elegante y tecnológico, y materializarlo en tokens de Tailwind v4, tipografía autoalojada, iconografía sin fuentes de íconos, movimiento sin AOS y primitivas de componentes.

## Alcance
- Definición del `DESIGN.md` v1 (E20-I01) antes de la navbar y el hero.
- Tokens en `@theme` con temas claro y oscuro.
- Tipografía e íconos sin dependencias de terceros en tiempo de carga.
- Sistema de movimiento con `prefers-reduced-motion`.
- Primitivas reutilizables.

## Páginas cubiertas
Ninguna de contenido. Una página interna de muestra de componentes (no indexable).

## Dependencias
E10 (en particular E10-I03).

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E20-I01](E20-I01-definir-design-md.md) | Definición del DESIGN.md v1 | P0 | M | E10-I03 | [ ] Pendiente |
| [E20-I02](E20-I02-tokens-tema.md) | Tokens en @theme y tema claro/oscuro | P0 | M | E20-I01 | [ ] Pendiente |
| [E20-I03](E20-I03-tipografia-iconos.md) | Tipografía autoalojada e iconografía SVG | P0 | M | E20-I02 | [ ] Pendiente |
| [E20-I04](E20-I04-movimiento-sin-aos.md) | Sistema de movimiento sin AOS | P0 | M | E20-I02 | [ ] Pendiente |
| [E20-I05](E20-I05-primitivas.md) | Primitivas de componentes | P0 | M | E20-I03, E20-I04 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] `DESIGN.md` no tiene secciones "por definir" que bloqueen E30 o E40.
- [ ] Todos los colores, tipografías y espaciados del proyecto provienen de tokens.
- [ ] El sitio no carga fuentes ni scripts desde Google Fonts ni AOS.
- [ ] Las primitivas funcionan en claro y oscuro, con teclado y con movimiento reducido.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Rediseñar demasiado y alterar el logotipo (D-08 lo protege).
- Reemplazar AOS introduciendo parpadeos o CLS.
