# E20 · Sistema de diseño
- **Prioridad de la épica:** P0 · **Estado:** [x] Terminada (29-10-2026)

## Objetivo
Definir el `DESIGN.md` nuevo, más elegante y tecnológico, a partir de los prototipos aprobados por Felipe (ADR-039), y materializarlo en tokens de Tailwind v4, tipografía autoalojada, iconografía sin fuentes de íconos, movimiento sin AOS y primitivas de componentes.

## Alcance
- `DESIGN.md` v1 (E20-I01): lo redacta el asesor a partir de los prototipos, Felipe lo copia a la raíz y el agente lo verifica (ADR-039, ADR-033).
- Tokens en `@theme` con temas claro y oscuro, incluidos los tonos de apoyo de ADR-040.
- Tipografía autoalojada (Cinzel, Josefin Sans y Lexend 700 para el logotipo, ADR-041) e íconos SVG, sin dependencias de terceros en tiempo de carga.
- Sistema de movimiento con `prefers-reduced-motion`.
- Primitivas reutilizables.
- Sistema común (paletas clara y oscura actuales con los tonos de ADR-040, tipografía, espaciados, movimiento y primitivas) con composición propia por página, documentada en `DESIGN.md` (ADR-036).
- Prototipos de referencia en `prototipos/` (no se publican).

## Páginas cubiertas
Ninguna de contenido. Una página interna de muestra de componentes (no indexable).

## Dependencias
E10 (en particular E10-I03).

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E20-I01](E20-I01-definir-design-md.md) | Definición del DESIGN.md v1 | P0 | M | E10-I03 | [x] Terminada |
| [E20-I02](E20-I02-tokens-tema.md) | Tokens en @theme y tema claro/oscuro | P0 | M | E20-I01 | [x] Terminada |
| [E20-I03](E20-I03-tipografia-iconos.md) | Tipografía autoalojada e iconografía SVG | P0 | M | E20-I02 | [x] Terminada |
| [E20-I04](E20-I04-movimiento-sin-aos.md) | Sistema de movimiento sin AOS | P0 | M | E20-I02 | [x] Terminada |
| [E20-I05](E20-I05-primitivas.md) | Primitivas de componentes | P0 | M | E20-I03, E20-I04 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] `DESIGN.md` no tiene secciones "por definir" que bloqueen E30 o E40.
- [x] Todos los colores, tipografías y espaciados del proyecto provienen de tokens.
- [x] El sitio no carga fuentes ni scripts desde Google Fonts ni AOS (E20-I03 y E20-I04).
- [x] Las primitivas funcionan en claro y oscuro, con teclado y con movimiento reducido.
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.
- [x] `DESIGN.md` documenta la regla de composición por página y los patrones de Inicio y Educación (ADR-036).
- [x] Ningún contenido, logotipo ni dependencia externa de los prototipos llegó al proyecto (ADR-039, AT-050).

## Riesgos
- Rediseñar demasiado y alterar el logotipo (D-08 lo protege; los prototipos traen otro logotipo que no se usa).
- Reemplazar AOS introduciendo parpadeos o CLS.
- Copiar contenido ficticio o dependencias externas de los prototipos (AT-050).
- Peso de tres familias tipográficas sobre LCP (ADR-015, ADR-041).
