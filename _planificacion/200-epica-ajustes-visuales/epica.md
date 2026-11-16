# E200 · Ajustes visuales
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente (épica abierta: se cierra solo cuando Felipe lo decida, ADR-104)

## Objetivo
Corregir y mejorar el aspecto del sitio ya publicado en `https://felipecuevas.dev`, con cada ajuste en `es-CL` y `en-US`, revisado en una preview de rama antes de llegar a producción.

## Alcance
- Preparación estructural: preview por rama, apagado de workers.dev (paso 9b de E190), navegador para los agentes y documentos posteriores al cutover (E200-I01).
- Ajustes transversales: transición de tema (E200-I02), tipografía (E200-I03) y pie de página (E200-I04).
- Ajustes por página, una iteración por página (Inicio: E200-I05; Educación: E200-I06; Experiencia: E200-I07; Desarrollador: E200-I08; Docente: E200-I09; Instructor: E200-I10; Talento Digital: E200-I11; Foro: E200-I12; Contacto: E200-I13; Recursos: E200-I14), que se agregan al final de esta tabla cuando Felipe entrega la lista de cada una (ADR-104).

## Fuera de alcance
- Contenido nuevo (artículos de la bóveda, BL-09), cambios de URL, de SEO o de la API de contacto, salvo que un ajuste lo exija y quede registrado con un ADR.
- Cambios de la barra de navegación que contradigan `DESIGN.md` 2.1 sin un ADR nuevo.

## Páginas cubiertas
Todas (12 por idioma más la 404).

## Dependencias
E190 (E190-I04 terminada).

## Rama y despliegue
- **Rama de trabajo:** `ajustes-visuales`, creada desde `main` (autorizada por Felipe el 16-11-2026). Nunca se trabaja en `main`.
- **Revisión:** cada push a `ajustes-visuales` genera una URL de preview de rama en workers.dev (E200-I01, ADR-105). Felipe revisa ahí, también desde el celular.
- **Merge a `main`:** por lotes que Felipe aprueba en la preview, no por iteración ni al final. Tras cada merge, Felipe actualiza `ajustes-visuales` desde `main`.
- **Excepción:** el bloque de `wrangler.jsonc` de E200-I01 llega a `main` por una rama corta propia (ADR-101 y ADR-105), porque la configuración de preview se aplica en cada despliegue de producción.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E200-I01](E200-I01-preparacion-estructural.md) | Preparación estructural: preview por rama, workers.dev, navegador y documentos | P0 | M | E190-I04 | [ ] Pendiente |
| [E200-I02](E200-I02-transicion-tema.md) | Transición de tema con barrido diagonal | P1 | S | E200-I01 | [ ] Pendiente |
| [E200-I03](E200-I03-tipografia.md) | Tipografía: Sora, Work Sans e IBM Plex Mono | P1 | M | E200-I02 | [ ] Pendiente |
| [E200-I04](E200-I04-pie-de-pagina.md) | Ajustes del pie de página | P1 | S | E200-I03 | [ ] Pendiente |
| [E200-I05](E200-I05-inicio-banda-cifras.md) | Inicio: curvas de nivel y cifras centradas en la banda de Resumen | P1 | S | E200-I03 | [ ] Pendiente |
| [E200-I06](E200-I06-educacion.md) | Educación: puntos en la cabecera y en la franja Cloud, curvas de nivel en las franjas con banda y bloque REUF con panel de cifras | P1 | M | E200-I05 | [ ] Pendiente |
| [E200-I07](E200-I07-experiencia.md) | Experiencia: hitos con el año como protagonista, línea de tiempo horizontal y campo de puntos | P1 | M | E200-I06 | [ ] Pendiente |
| [E200-I08](E200-I08-desarrollador.md) | Desarrollador: campo de puntos en la sección principal y curvas de nivel en «Conjunto de Tecnologías» | P1 | S | E200-I07 | [ ] Pendiente |
| [E200-I09](E200-I09-docente.md) | Docente: campo de puntos y curvas de nivel por sección, y cargos especiales en dos columnas | P1 | M | E200-I08 | [ ] Pendiente |
| [E200-I10](E200-I10-instructor.md) | Instructor: campo de puntos por sección, curvas de nivel en «Instructor Titular» y planes SENCE a todo el ancho | P1 | M | E200-I09 | [ ] Pendiente |
| [E200-I11](E200-I11-talento-digital.md) | Talento Digital: puntos y curvas de nivel por franja, cifras centradas y OTEC en cada bootcamp | P1 | M | E200-I10 | [ ] Pendiente |
| [E200-I12](E200-I12-foro.md) | Foro: campo de puntos en la cabecera y en «Conversación», y curvas de nivel en «Participar en tres pasos» | P1 | S | E200-I11 | [ ] Pendiente |
| [E200-I13](E200-I13-contacto.md) | Contacto: campo de puntos en la cabecera, curvas de nivel en «Canales de contacto» y envío con contorno trazado | P1 | M | E200-I12 | [ ] Pendiente |
| [E200-I14](E200-I14-recursos.md) | Recursos: catálogo de rutas con página propia por ruta, «Más recursos» con logos y fondos de la épica | P1 | M | E200-I13 | [ ] Pendiente |

Orden de ejecución: el de la tabla (I01 a I14).

## ADR previstos
| ADR | Tema | Iteración |
|---|---|---|
| ADR-104 | Épica abierta de ajustes visuales (sustituye en parte a ADR-056) | E200-I01 |
| ADR-105 | URL de preview por rama y workers.dev apagado | E200-I01 |
| ADR-106 | Navegador para los agentes: Playwright MCP | E200-I01 |
| ADR-107 | Transición de tema con barrido diagonal | E200-I02 |
| ADR-108 | Tipografía Sora, Work Sans e IBM Plex Mono | E200-I03 |
| ADR-109 | Pie de página | E200-I04 |
| ADR-110 | Banda de cifras de Inicio | E200-I05 |
| ADR-111 | Educación | E200-I06 |
| ADR-112 | Experiencia | E200-I07 |
| ADR-113 | Desarrollador | E200-I08 |
| ADR-114 | Docente | E200-I09 |
| ADR-115 | Instructor | E200-I10 |
| ADR-116 | Talento Digital | E200-I11 |
| ADR-117 | Foro | E200-I12 |
| ADR-118 | Contacto | E200-I13 |
| ADR-119 | Recursos | E200-I14 |

Los números se vuelven a verificar contra `decisiones.md` al ejecutar cada iteración.

## Protocolo de revisión visual (toda iteración de E200 lo hereda)
- **Dónde:** primero en local (`pnpm build && pnpm preview`); al final, en la URL de preview de la rama.
- **Matriz:** 360, 768, 1.366 y 1.920 px × tema claro y oscuro × `/es/` y `/en/`, en cada página que toque la iteración.
- **Estados:** reposo, hover (puntero sobre el elemento), foco con teclado (`:focus-visible`) y `prefers-reduced-motion: reduce`.
- **Hero:** si la iteración afecta a la portada, se repite la matriz sin scroll de ADR-016 (1366×638, 1440×770, 1536×734 y 1920×950).
- **Herramienta:** el agente navega y captura con el navegador de E200-I01 (ADR-106). Las capturas no se versionan; la bitácora lista qué se revisó y qué se encontró.
- **Antes y después:** cada ajuste se describe en la bitácora con su estado anterior y el nuevo, en ambos temas.

## Criterios de aceptación de la épica
- [ ] Cada iteración cumple sus criterios, el protocolo de revisión visual y la Definition of Done global.
- [ ] Ningún ajuste queda en un solo idioma.
- [ ] Core Web Vitals sin regresión frente a la línea base de E190-I04 (ADR-015).
- [ ] La épica se cierra solo por decisión expresa de Felipe, registrada en `registro-log.md` (ADR-104).

## Riesgos
- Una rama de vida larga se aleja de `main`: se mitiga con merges por lote y la actualización de la rama tras cada uno.
- Las URL de preview son públicas para quien tenga el enlace (ADR-105).
- Los cambios transversales (transición de tema, tipografía y pie) obligan a revisar todas las páginas: por eso van antes que los ajustes por página.
- Las curvas de nivel se reutilizan en varias páginas: cada uso debe tener una composición propia para no volverse una plantilla repetida.
