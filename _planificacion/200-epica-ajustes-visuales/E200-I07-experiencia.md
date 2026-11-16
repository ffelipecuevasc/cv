# E200-I07 · Experiencia: hitos con el año como protagonista, línea de tiempo horizontal y campo de puntos
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I06 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017, ADR-063, ADR-065, ADR-066, ADR-104, ADR-106, ADR-108, ADR-111

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Rediseñar la presentación de los 3 perfiles en la sección principal de Experiencia (`/es/experiencia/` y `/en/experience/`), que hoy es una línea de tiempo vertical angosta que desperdicia casi todo el ancho. Pasa a ser una línea de tiempo horizontal con tres tarjetas de hito, sobre el campo de puntos del hero, en `es-CL` y `en-US` y en claro y oscuro.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción, con captura: bajo el encabezado, los 3 hitos (`ExperienceTimeline.astro`) forman una columna de unos 380 px dentro de un contenedor de 1.280 px, y el resto queda vacío.
- Felipe comparó 4 alternativas en el chat el 16-11-2026 (carriles cronológicos, tríptico, registro editorial e hitos con el año como protagonista) y eligió la **D**. Después aprobó una segunda vista previa con la línea de tiempo mejorada, con los cambios de la sección «Decisiones».
- **No cambian:** el rótulo «Resumen de experiencia» (con sus reglas y efectos), el `<h1>` «Experiencia Laboral» y el párrafo de introducción (`ExperienceHeader.astro`), ni las tarjetas de perfil que vienen después (`ProfilesGrid.astro` y `ProfileCard.astro`).
- Datos (`src/content/experience/page.json`):
    - `timeline.items`: ícono (`certificate`, `graduation-cap` y `terminal`, Material Symbols Light, ADR-063), título e instituciones de cada hito, en el orden instructor, docente y desarrollador;
    - `profiles`: periodo (`2011 - Actualidad` / `2011 - Present`…) y modalidad (`Modalidad presencial` / `On-site`…) de cada perfil. El hito toma el periodo de su perfil (AT-081).
- `scripts/verify-seo.mjs` controla hoy la línea de tiempo: 3 hitos con ícono decorativo, periodos en el orden 2023, 2013 y 2011, periodos iguales a los de las tarjetas, y «página sin controles ni scripts».
- El campo de puntos y el halo son `texture-dots` y `texture-halo` (`global.css`, `DESIGN.md` 4.5). E200-I06 los lleva a la cabecera de Educación y, si fue necesario, dejó una variable para ajustar la máscara y el halo a un encabezado centrado.
- `DESIGN.md` 4.5, 11.2 (patrón «Línea de tiempo»: hoy, versión compacta vertical para Experiencia) y 11.5 (Experiencia).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Orden cronológico**, de izquierda a derecha: Desarrollador Full Stack (2011), Docente Universitario (2013) e Instructor Certificado (2023). Hoy el orden es el inverso.
- **Tarjetas de hito** (tres columnas iguales, separación de 18 px), cada una con:
    - el ícono del perfil y el rótulo «Desde 2011» / «Since 2011» en `font-mono`, `gold-deep` en claro y `gold` en oscuro;
    - el título del hito en `font-display` y las instituciones;
    - la modalidad y el estado: «Modalidad presencial · Actualidad» / «On-site · Present»;
    - el año de inicio grande y translúcido como fondo tipográfico (`font-display` 300, `accent` al 12 % aprox.), decorativo y cortado por el borde inferior derecho.
- **Línea de tiempo sobre las tarjetas:**
    - un tramo punteado antes del primer hito y, desde él hasta el final, una línea de 2 px con el degradado `gold` → `vibrant`;
    - en cada hito, un nodo con anillo dorado y núcleo de color `accent`, alineado con el ícono de su tarjeta y unido a ella por un tallo fino con degradado;
    - **sobre cada nodo, solo el año de inicio** (2011, 2013 y 2023) en `font-mono`;
    - al final de la línea, la flecha `arrow-right`, un punto vivo con un pulso suave y el rótulo «Hoy» / «Today».
    - **Sin cifras de tiempo transcurrido** en los tramos: quedaban obsoletas. Se descartaron de raíz.
- **Fondo:** el mismo campo de puntos del hero (dos capas, máscara radial elíptica y halo solo en oscuro, 4.5), que cubre el encabezado y la línea de tiempo como una sola sección.

## Alcance
- Nuevo diseño de `ExperienceTimeline.astro` en escritorio y en móvil.
- Campo de puntos detrás del encabezado y de la línea de tiempo.
- Rótulos nuevos («Desde» / «Since», «Hoy» / «Today») en el contenido bilingüe.
- Ajuste de los controles de `verify:seo` al orden y a la estructura nuevos.
- Bloque de `DESIGN.md` 4.5, 11.2 y 11.5 para Felipe.

## Fuera de alcance
- El encabezado (rótulo, `<h1>` y párrafo) y las tarjetas de perfil de más abajo.
- Los textos de los hitos (títulos e instituciones), los periodos y las modalidades: se toman de los datos actuales.
- Agregar cifras de años transcurridos o cualquier dato calculado.

## Tareas
- [ ] **Datos:** construir los hitos desde `timeline.items` y su perfil (periodo y modalidad, AT-081), extraer el año de inicio del periodo y ordenarlos de forma ascendente. Si un periodo no trae un año de 4 dígitos al inicio, el build falla con un mensaje claro. Agregar «Desde» / «Since» y «Hoy» / «Today» al contenido bilingüe.
- [ ] **Escritorio (desde 1.024 px):** lista ordenada (`<ol data-timeline>`) de 3 columnas con las tarjetas de hito. Línea, tramo punteado, nodos, tallos, años sobre los nodos, flecha, punto vivo y «Hoy» como decoración (`aria-hidden`), sin JavaScript. El nodo y el tallo de cada hito quedan alineados con el ícono de su tarjeta en todos los anchos desde 1.024 px.
- [ ] **Móvil (bajo 1.024 px):** las tarjetas se apilan en una columna y la línea pasa a vertical a la izquierda, con el nodo y el año junto a cada tarjeta y el «Hoy» al final, abajo. Sin desbordes a 360 px.
- [ ] **Movimiento:** el pulso del punto vivo es una animación CSS suave e infinita que se detiene con `prefers-reduced-motion: reduce` (queda un halo quieto). Ninguna otra animación.
- [ ] **Fondo:** montar `texture-dots` y `texture-halo` detrás del encabezado y de la línea de tiempo como una sola capa (por ejemplo, envolviendo ambos componentes en una sección con la capa absoluta). Reutilizar la variable de E200-I06 para centrar la máscara y el halo; no copiar las utilidades. Las tarjetas de hito llevan fondo `bg`, para que los puntos no pasen por detrás del texto.
- [ ] **Controles:** actualizar `scripts/verify-seo.mjs` para que exija el orden 2011, 2013 y 2023, que el año de cada hito coincida con el periodo de su tarjeta (AT-081) y que se mantengan los 3 íconos decorativos y la «página sin controles ni scripts». Comprobar que el control falla ante un orden o un año roto.
- [ ] **Revisión visual:** protocolo de la épica en `/es/experiencia/` y `/en/experience/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px, con movimiento reducido. Medir el contraste del año translúcido frente al texto que tiene encima (debe quedar como decoración, sin tapar el título ni la modalidad).
- [ ] **Registro y bloques:** ADR-112, bloque de `DESIGN.md` 4.5 (campo de puntos también en Experiencia), 11.2 (variante horizontal de la línea de tiempo) y 11.5 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/experience/ExperienceTimeline.astro`, `src/pages/es/experiencia.astro` y `src/pages/en/experience.astro` (si la capa de puntos envuelve ambos componentes), `src/content/experience/page.json`, `src/content.config.ts` (si cambia el esquema de `timeline`) y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [ ] Desde 1.024 px, los 3 hitos ocupan todo el ancho del contenedor, en orden 2011, 2013 y 2023, con su ícono, «Desde {año}», título, instituciones, modalidad y estado, en es y en.
- [ ] Sobre cada nodo se ve solo su año de inicio; al final de la línea, «Hoy» / «Today» con el punto vivo; no hay cifras de tiempo transcurrido.
- [ ] Cada nodo queda alineado con el ícono de su tarjeta y unido a ella por el tallo.
- [ ] Bajo 1.024 px, la línea es vertical, las tarjetas se apilan y nada desborda a 360 px.
- [ ] Con movimiento reducido, el punto vivo no se anima.
- [ ] El campo de puntos y el halo (solo en oscuro) cubren el encabezado y la línea de tiempo, sin tapar el texto.
- [ ] La línea y sus adornos no se anuncian en lectores de pantalla; la lista mantiene sus 3 elementos legibles en orden.
- [ ] El encabezado y las tarjetas de perfil no cambian.
- [ ] `verify:seo` en verde con los controles actualizados; sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-106, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-112 · Experiencia: línea de tiempo horizontal con hitos y campo de puntos (sustituye en parte a ADR-066)
- **Contexto:** E200-I07. En Experiencia, la línea de tiempo vertical compacta de E60-I02 (ADR-066) ocupa unos 380 px de un contenedor de 1.280 px y deja la sección casi vacía (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026, entre 4 alternativas y una segunda vista previa en el chat):**
    - los 3 hitos pasan a una línea de tiempo horizontal con tarjetas en orden cronológico (2011, 2013 y 2023), cada una con el año de inicio como fondo tipográfico;
    - sobre la línea, un nodo por hito con su año de inicio, unido a su tarjeta, y al final «Hoy» con un punto vivo;
    - no se muestran cifras de tiempo transcurrido, porque quedan obsoletas;
    - la sección (encabezado y línea de tiempo) lleva el campo de puntos y el halo del hero;
    - bajo 1.024 px, la línea es vertical.
- **Sustituye en parte:** ADR-066 en la forma de la línea de tiempo (vertical y compacta) y en el orden de los hitos. Los hitos, sus íconos y la regla de tomar el periodo de la tarjeta (AT-081) se mantienen.
- **Consecuencias:** `DESIGN.md` 11.2 suma la variante horizontal del patrón «Línea de tiempo» para Experiencia, 11.5 describe la sección y 4.5 suma Experiencia como tercer uso del campo de puntos (hero, cabecera de Educación y Experiencia). `verify:seo` cambia el orden esperado. Felipe edita `DESIGN.md` (ADR-033).
- **Origen:** E200-I07, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- El año grande translúcido no debe competir con el título: si en algún ancho lo cruza, se reduce su tamaño o su opacidad, no se mueve el texto.
- Entre 1.024 y 1.100 px, las tres tarjetas quedan angostas: comprobar que «Docente Universitario» y las instituciones no se partan de forma rara, sobre todo en inglés.
- El pulso es la única animación infinita de la página: se mantiene suave y se detiene con movimiento reducido (`DESIGN.md` 8).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
