# E200-I05 · Inicio: curvas de nivel y cifras centradas en la banda de Resumen
- **Estado:** [x] Terminada (25-11-2026)
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I03 · **Hallazgos que cierra:** AT-161 (nuevo) · **ADR relacionados:** ADR-015, ADR-036, ADR-053, ADR-058, ADR-107, ADR-109, ADR-111

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
En la banda de cifras de Inicio («Trayectoria profesional · Resumen»), reemplazar la cuadrícula del fondo por curvas de nivel y centrar el contenido de las 5 cifras, en `es-CL` y `en-US`, en claro y oscuro. Son los únicos dos cambios de Inicio en esta iteración.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción, con captura de la banda en tema claro: la cuadrícula del fondo (líneas de 1 px cada 48 px), sumada a las 4 barras verticales y a la regla horizontal, deja la sección sobrecargada de figuras cuadradas. Las cifras están alineadas a la izquierda.
- Felipe comparó 6 texturas en el chat el 16-11-2026 (guilloché, curvas de nivel, ondas concéntricas, malla triangular, líneas de seda y seigaiha), con la tipografía de E200-I03 y las cifras ya centradas, y eligió **curvas de nivel**.
- La cuadrícula es la utilidad compartida `texture-band` de `src/styles/global.css` (`--grid-line`, `--grid-edge` y `--grid-fill`). La usan las bandas de unas 9 páginas: **no se modifica**.
- Archivos: `src/components/home/StatsBand.astro`, `src/components/ui/Band.astro` y `src/styles/global.css`.
- `DESIGN.md` 4.5 (fondos con textura), 7.8 (banda de cifras: «Texto alineado a la izquierda») y 11.3 (Inicio).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Textura:** curvas de nivel, solo en la banda de cifras de Inicio. Las demás bandas conservan la cuadrícula.
- **Composición de la textura (según la vista previa aprobada):**
    - dos grupos de curvas cerradas y concéntricas, deformadas como relieve: uno nace en la esquina inferior izquierda y el otro en la superior derecha;
    - de 11 a 13 curvas por grupo, separadas unos 23 px; cada quinta curva en dorado;
    - se desvanecen hacia el centro con una máscara radial, para que las cifras queden sobre un fondo casi limpio.
- **Cifras:** se mantiene la estructura de una fila de 5 celdas desde 1.024 px, con las barras degradadas entre ellas. Dentro de cada celda, el rótulo, la cifra y la línea de contexto van centrados.

## Alcance
- Variante de la banda solo para la de cifras de Inicio: el mismo fondo `band` y los mismos bordes, sin la cuadrícula, con las curvas de nivel como capa decorativa.
- Tokens de color de las curvas en `global.css`.
- Contenido centrado en las 5 celdas y cifras alineadas en una misma línea.
- Bloque de `DESIGN.md` 4.5, 7.8 y 11.3 para Felipe.

## Fuera de alcance
- La utilidad `texture-band` y las bandas de las demás páginas.
- El hero, los testimonios y cualquier otro cambio de Inicio.
- Los textos, el orden y los valores de las cifras (la de certificaciones sigue saliendo de `src/data/certifications.ts`, ADR-053).
- Animar las curvas.

## Tareas
- [x] **Curvas:** dibujar los dos grupos de curvas como SVG con trazos suavizados (curvas Bézier, no polígonos), en dos piezas ancladas a sus esquinas (inferior izquierda y superior derecha) con ancho fijo, para que no se deformen cuando la banda cambia de alto entre escritorio y móvil. Se versiona solo el SVG resultante (sin dependencias ni pasos de build); peso de las dos piezas juntas de 10 KB o menos. Las curvas quedan en un componente reutilizable que recibe la composición (qué grupos, en qué esquina o borde y con qué orientación), porque E200-I06 las usa en Educación con composiciones propias.
- [x] **Color:** tokens nuevos en `global.css` (por ejemplo `--contour-line` y `--contour-accent`) con `color-mix` sobre la paleta, sin colores sueltos. Punto de partida de la vista previa: claro, `primary` al 20 % y `gold` al 55 %; oscuro, `vibrant` al 14 % y `gold` al 40 %. Trazo de 0,8 a 0,9 px.
- [x] **Variante de la banda:** opción en `Band.astro` (o utilidad nueva en `global.css`) que conserve el fondo `band`, el degradado del tema oscuro y los bordes de 4.5, quite las líneas de la cuadrícula y monte las curvas como capa decorativa (`aria-hidden`, `focusable="false"`, sin eventos de puntero), detrás del contenido y con la máscara radial que despeja el centro. Solo `StatsBand.astro` la usa.
- [x] **Centrado:** `text-align: center` en el rótulo (`dt`), la cifra y la línea de contexto de cada celda. Mantener 5 columnas desde 1.024 px y 2 columnas bajo esa medida, con la quinta en la fila completa; las barras siguen en el mismo lugar.
- [x] **Alineación entre celdas:** el rótulo, la cifra y el contexto de las 5 celdas quedan en tres filas comunes (por ejemplo, `grid-template-rows: subgrid`), para que ninguna cifra baje cuando un rótulo o un contexto ocupa más líneas. Se comprueba sobre todo en inglés y a 1.024 px.
- [x] **Revisión visual:** protocolo de la épica en `/es/` y `/en/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px. Medir el contraste del texto en el peor punto donde una curva pasa detrás de una línea de contexto.
- [x] **Registro y bloques:** ADR-113, bloque de `DESIGN.md` 4.5, 7.8 y 11.3 en la bitácora, y PageSpeed Insights de `/es/` y `/en/` en la URL de rama.

## Archivos previstos (crear / modificar)
- Crear: un componente de curvas de nivel en `src/components/ui/` (por ejemplo `ContourLines.astro`) con las piezas SVG y la composición de Inicio.
- Modificar: `src/components/home/StatsBand.astro`, `src/components/ui/Band.astro` y `src/styles/global.css`.

## Criterios de aceptación (verificables)
- [x] La banda de cifras de Inicio muestra curvas de nivel suavizadas en dos esquinas opuestas, sin cuadrícula, en claro y oscuro, en es y en.
- [x] Las demás bandas del sitio no cambian: misma cuadrícula y mismos estilos calculados que antes.
- [x] El rótulo, la cifra y el contexto de cada celda están centrados; las 5 cifras quedan en la misma línea desde 1.024 px, también en inglés.
- [x] Bajo 1.024 px: 2 columnas con la quinta cifra en la fila completa, todo centrado y sin desbordes a 360 px.
- [x] Las curvas no se anuncian en lectores de pantalla ni reciben foco o clics.
- [x] El texto mantiene los contrastes de 4.4 donde lo cruza una curva (medición en la bitácora).
- [x] Peso de las curvas de 10 KB o menos; sin JavaScript nuevo; CLS 0 en la portada; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-109, en local y en la URL de rama, incluida una banda de otra página (por ejemplo Educación) para confirmar que la cuadrícula sigue igual.
- PageSpeed Insights de `/es/` y `/en/` en la URL de rama (móvil y escritorio).

## ADR a registrar (texto para `decisiones.md`)

### ADR-113 · Banda de cifras de Inicio: curvas de nivel y cifras centradas (complementa ADR-058)
- **Contexto:** E200-I05. En la banda de cifras de Inicio, la cuadrícula del fondo se suma a las barras verticales y a la regla del encabezado, y la sección queda sobrecargada de figuras cuadradas (revisión de Felipe en producción, 16-11-2026). Las cifras están alineadas a la izquierda.
- **Decisión (de Felipe, 16-11-2026, entre 6 texturas comparadas en el chat):**
    - la banda de cifras de Inicio cambia la cuadrícula por **curvas de nivel**: dos grupos de curvas suavizadas en las esquinas inferior izquierda y superior derecha, cada quinta curva en dorado, desvanecidas hacia el centro;
    - el contenido de las 5 celdas (rótulo, cifra y contexto) va **centrado**, con la misma estructura de 5 columnas y las mismas barras;
    - las demás bandas del sitio conservan la cuadrícula.
- **Consecuencias:** `DESIGN.md` 4.5 suma la textura «curvas de nivel» con su uso exclusivo en Inicio, y 7.8 cambia «Texto alineado a la izquierda» por «centrado». Las barras de ADR-058 no cambian. Felipe edita `DESIGN.md` (ADR-033). Llevar la textura a otras bandas exige una iteración propia (la primera es E200-I06, en Educación).
- **Origen:** E200-I05, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- En móvil la banda es mucho más alta (3 filas): por eso las curvas se anclan a las esquinas con ancho fijo, en vez de estirar una sola imagen a toda la banda.
- Las curvas de la vista previa se generaron con polígonos de 10° y se ven facetadas: el SVG final debe usar curvas suavizadas.
- En la vista previa del chat, la cifra de la segunda celda quedó más abajo que las demás. Las filas comunes de la tarea 5 evitan que se repita.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

## Avance
### Fase 1 (25-11-2026, local)
- `ContourLines.astro` nuevo (composición por props: `pieces` con esquina y forma, `mask`); 2 piezas SVG de 360 × 320 px, 12 curvas Bézier por grupo, 5.ª y 10.ª en dorado; 6,3 KB en la portada; sin JavaScript.
- `global.css`: tokens `--contour-line` y `--contour-accent` y utilidad `texture-band-contour`; `texture-band` sin cambios.
- `Band.astro`: opción `texture` (por defecto `grid`) y slot `decor`. `StatsBand.astro`: única que usa `contour`; celdas centradas con subgrid.
- Revisión local en `/es/` y `/en/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px: cifras en una misma línea por fila (también en inglés a 1.024), 5 columnas desde 1.024 y 2 con la quinta a todo el ancho bajo esa medida, sin scroll horizontal, CLS 0. Las 10 bandas con cuadrícula de 5 páginas, con estilos calculados idénticos a producción en ambos temas.
- Contraste: AT-161 (máscara reforzada); peor caso 4,51:1 en texto pequeño y 3,87:1 en el signo «+».
- `build`, `check`, `lint`, `format:check`, `verify`, `check:i18n` y `verify:seo` (1195/1195) en verde.
- Pendiente (fase 2): revisión en la preview de rama y PageSpeed Insights de `/es/` y `/en/` frente a la línea base.

### Fase 2 (25-11-2026, preview de rama `2976451`)
- Banda de cifras en `/es/` y `/en/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px: 2 piezas de curvas, cifras alineadas por fila, centradas, sin scroll horizontal. Felipe la revisó a ojo y la aprobó (sin subir el trazo).
- Hero sin scroll en 1366×638 y 1920×950 (es y en, claro y oscuro). CLS 0 en `/es/` y `/en/`.
- Las 10 bandas con cuadrícula de 5 páginas: estilos calculados idénticos a producción en ambos temas.
- SVG de 6.344 bytes por portada; mismos archivos JS (nombres con hash) y mismas peticiones que producción.
- PageSpeed Insights (`scripts/psi.mjs --category performance --only /es/,/en/`): `/es/` 98 móvil (LCP 0,99 s) y 100 escritorio; `/en/` 100 y 100 (una corrida previa de `/en/` móvil dio 98). Línea base 99 y 100; I03 de 98 a 100: sin regresión.
