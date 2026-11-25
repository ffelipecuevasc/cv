# E200-I10 · Instructor: campo de puntos por sección, curvas de nivel en «Instructor Titular» y planes SENCE a todo el ancho
- **Estado:** [x] Terminada (25-11-2026)
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I09 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-036, ADR-072, ADR-073, ADR-107, ADR-109, ADR-113, ADR-114, ADR-117

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar en Instructor (`/es/instructor/` y `/en/instructor/`) los fondos que ya usan las otras páginas y llevar los planes formativos SENCE a todo el ancho del contenedor, en `es-CL` y `en-US` y en claro y oscuro.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción.
- Orden de la página (`src/pages/es/instructor.astro` y `src/pages/en/instructor.astro`):
    - `InstructorHeader` (fondo `bg`);
    - `TitularBand` («Instructor Titular», `Band.astro` con la cuadrícula);
    - `CoursesMosaic` («Principales cursos», fondo `bg`);
    - `TeachingGrid` (relatoría, fondo `bg-alt`);
    - `PlansTimeline` («Últimos planes formativos SENCE aprobados», fondo `bg`).
- `PlansTimeline.astro`: línea de tiempo compacta agrupada por fecha (ADR-072).
    - Cada grupo tiene un marcador de 44 px, su fecha y una lista de planes en tarjetas de una columna.
    - La lista tiene `max-width: 52rem`, así que queda angosta frente al contenedor de 1.280 px.
    - Los datos actuales tienen 2 grupos: agosto de 2026 con 2 planes y octubre de 2025 con 4. Los textos tienen entre 200 y 326 caracteres.
    - Se conservan el plan destacado PF1822 (ícono `new-releases` y tramo dorado) y las horas de PF1163, que salen de `src/data/training-plans.ts`.
- Herramientas que ya existen en la épica:
    - `texture-dots` y `texture-halo`, con la variable de máscara y halo de E200-I06;
    - el componente de curvas de nivel de E200-I05, con la variante de `Band.astro`.
- Composiciones de curvas ya usadas, que esta iteración **no** debe repetir:
    - Inicio: dos grupos en esquinas opuestas;
    - Educación: un relieve en el borde derecho y una cordillera horizontal desde la esquina inferior izquierda;
    - Desarrollador: un relieve que cae desde el borde superior al centro;
    - Docente: una ladera desde la esquina superior izquierda y una loma desde el borde inferior al centro.
- `DESIGN.md` 4.5, 11.2 (línea de tiempo de Instructor) y 11.8 (Instructor).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Campo de puntos** (dos capas, máscara radial y halo solo en oscuro, 4.5) en:
    - la sección principal (`InstructorHeader`);
    - «Principales cursos»;
    - «Últimos planes formativos SENCE aprobados».
- **Curvas de nivel** con composición propia en «Instructor Titular».
- **Planes SENCE:** las tarjetas de los planes ocupan todo el ancho máximo disponible del contenedor.

## Propuestas del agente (las valida Felipe en la URL de rama)
- **Planes a todo el ancho:** se quita el límite de 52 rem y, desde 1.024 px, los planes de cada fecha se ordenan en **dos columnas** junto al marcador. Con los datos actuales, agosto de 2026 queda en una fila (2 planes) y octubre de 2025 en dos filas (4 planes). Así las tarjetas llenan el ancho sin líneas de texto de más de 75 caracteres, que serían difíciles de leer en una sola columna de 1.280 px. Bajo 1.024 px, una columna como hoy.
- **Curvas de «Instructor Titular»:** dos relieves enfrentados que asoman por los bordes izquierdo y derecho a media altura, como un valle, con el contenido de la banda al centro. Cada quinta curva en dorado, con los mismos tokens de color de las otras páginas.

## Alcance
- Campo de puntos en las tres secciones indicadas.
- Curvas de nivel en «Instructor Titular», con la composición nueva.
- Planes SENCE a todo el ancho del contenedor, en dos columnas por fecha desde 1.024 px.
- Bloque de `DESIGN.md` 4.5, 11.2 y 11.8 para Felipe.

## Fuera de alcance
- La relatoría (`TeachingGrid`, fondo `bg-alt`): no se pidió cambio.
- Textos, íconos, fechas, horas y orden de los planes; el plan destacado sigue igual.
- El mosaico de cursos y la banda titular más allá de su fondo.

## Tareas
- [x] **Sección principal:** montar `texture-dots` y `texture-halo` (`aria-hidden`) detrás de `InstructorHeader`, con la variable de E200-I06 ajustada a la alineación de su encabezado.
- [x] **Cursos y planes:** la misma capa de puntos detrás de `CoursesMosaic` y de `PlansTimeline`, cada una con su propia capa (no son contiguas). Las imágenes del mosaico y las tarjetas de los planes quedan por encima de la capa, con su fondo `surface`.
- [x] **Curvas:** variante de curvas de `Band` en `TitularBand`, sin la cuadrícula, con la composición nueva dibujada en el componente de E200-I05 (trazos suavizados, piezas ancladas a los bordes izquierdo y derecho, 10 KB o menos). Comprobar que no chocan con la barra degradada propia de la banda.
- [x] **Planes a todo el ancho:** quitar `max-width: 52rem` de la lista; desde 1.024 px, la lista de planes de cada fecha en una grilla de dos columnas iguales (`repeat(2, minmax(0, 1fr))`), con tarjetas de igual altura por fila; bajo 1.024 px, una columna. El marcador, el riel y la fecha no cambian. Si una fecha tiene un número impar de planes, el último ocupa una columna y no se estira.
- [x] **Controles:** revisar `scripts/verify-seo.mjs` por dependencias de la estructura de los planes (orden, cantidad, plan destacado, horas de PF1163); ajustar solo lo necesario y comprobar que el control ajustado falla ante un caso roto.
- [x] **Revisión visual:** protocolo de la épica en `/es/instructor/` y `/en/instructor/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px. Recorrer la página completa para comprobar que la sucesión de puntos, curvas, puntos, `bg-alt` y puntos no se ve cargada, y medir el contraste en el peor punto donde una textura pasa detrás de texto pequeño.
- [x] **Registro y bloques:** ADR-118, bloque de `DESIGN.md` 4.5, 11.2 y 11.8 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/instructor/InstructorHeader.astro`, `TitularBand.astro`, `CoursesMosaic.astro`, `PlansTimeline.astro`, el componente de curvas de nivel de E200-I05 y, si hace falta, `src/styles/global.css` y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [ ] La cabecera, «Principales cursos» y los planes SENCE muestran el campo de puntos (halo solo en oscuro), en es y en.
- [ ] «Instructor Titular» muestra curvas de nivel suavizadas, sin cuadrícula, con una composición distinta de todas las anteriores.
- [ ] Desde 1.024 px, los planes llenan el ancho del contenedor en dos columnas por fecha, sin líneas de más de 75 caracteres; bajo esa medida, una columna; sin desbordes a 360 px ni en inglés.
- [ ] El plan destacado PF1822 y las horas de PF1163 se ven igual que antes.
- [ ] La relatoría y el contenido de todas las secciones no cambian.
- [ ] Las texturas no se anuncian en lectores de pantalla ni reciben foco o clics; el texto mantiene los contrastes de 4.4.
- [ ] Sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-109, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-118 · Instructor: puntos por sección, curvas de nivel en «Instructor Titular» y planes SENCE a todo el ancho
- **Contexto:** E200-I10. En Instructor, las secciones de fondo `bg` no llevan textura, «Instructor Titular» usa la cuadrícula y la lista de planes SENCE queda limitada a 52 rem dentro de un contenedor de 1.280 px (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026):**
    - campo de puntos en la cabecera, en «Principales cursos» y en los planes SENCE;
    - curvas de nivel con composición propia en «Instructor Titular»: dos relieves enfrentados en los bordes laterales;
    - los planes SENCE ocupan todo el ancho del contenedor, en dos columnas por fecha desde 1.024 px, para no alargar las líneas de texto.
- **Sustituye en parte:** ADR-072 en el ancho y la disposición de los planes dentro de cada fecha. La agrupación por fecha, el marcador, el riel y el plan destacado se mantienen.
- **Consecuencias:** la relatoría queda como la única sección sin textura de la página. Felipe edita `DESIGN.md` 4.5, 11.2 y 11.8 (ADR-033).
- **Origen:** E200-I10, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Avance
- **Parte A (25-11-2026):** implementación y verificación local terminadas; ADR-118 registrado; los 7 comandos en verde. Interpretación (incluida la justificación de `valley`), mediciones y bloques de `DESIGN.md` en `99_bitacora/2026-11-25_E200-I10.md`.
- **Parte B (25-11-2026):** Felipe aprobó la preview y las dos columnas de los planes; Playwright en 20 combinaciones: puntos en las tres secciones, `valley` sin cruces, planes en dos columnas de igual alto desde 1.024 px con líneas de 74 caracteres o menos, PF1822 y PF1163 intactos, sin scroll horizontal y CLS 0; relatoría y demás páginas idénticas a producción; mismas peticiones; PageSpeed sin regresión. Iteración terminada.

## Riesgos y notas
- Con dos columnas por fecha, el orden de lectura de los planes pasa a ser por filas (izquierda a derecha, luego abajo). En el HTML se mantiene el orden actual.
- Si Felipe prefiere una sola columna a todo el ancho, se cambia en la URL de rama, sabiendo que las líneas quedan sobre los 100 caracteres en 1.280 px.
- La composición de curvas es una propuesta del agente; si Felipe prefiere otra, se cambia en esta misma iteración.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
