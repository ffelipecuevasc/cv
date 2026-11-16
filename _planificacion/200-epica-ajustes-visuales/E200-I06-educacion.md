# E200-I06 · Educación: puntos en la cabecera y en la franja Cloud, curvas de nivel en las franjas con banda y bloque REUF con panel de cifras
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I05 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017, ADR-036, ADR-053, ADR-058, ADR-061, ADR-072, ADR-104, ADR-106, ADR-108, ADR-110

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar los tres ajustes de Educación que pidió Felipe el 16-11-2026, en `es-CL` y `en-US`, en claro y oscuro: el campo de puntos del hero en la cabecera y en la franja «Tecnología Cloud», curvas de nivel con una composición distinta en cada franja de certificaciones con banda, y un bloque REUF que aproveche todo el ancho con un panel de cifras.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción:
    1. **Cabecera «Educación & Certificaciones»:** debe llevar el mismo fondo de puntos que el hero de Inicio.
    2. **Franjas de certificaciones:** las franjas «Inteligencia Artificial» y «Desarrollo y Datos» deben usar las curvas de nivel de Inicio (E200-I05), pero no como copia: cada una con su propia composición.
    3. **Franja «Tecnología Cloud»** (agregado por Felipe el mismo día): es la única franja de certificaciones sin fondo; debe llevar el campo de puntos de la cabecera.
    4. **Bloque «Instructor REUF»:** en escritorio, el contenido queda a la izquierda y cerca del 35 % derecho de la tarjeta está vacío.
- Vistas previas en el chat del 16-11-2026 para el bloque REUF (A: panel de cifras; B: sello decorativo; C: texto y áreas en etiquetas): Felipe eligió la **A**.
- Archivos:
    - `src/components/education/EducationHeader.astro`;
    - `src/components/education/CertificationsSection.astro` y `src/components/ui/ThemeStripe.astro`. Hay 3 franjas: `ai` (tono `band`), `cloud` (tono `bg`, en espejo) y `dev-data` (tono `band`). Las de tono `band` usan hoy la cuadrícula `texture-band`;
    - `src/components/education/ReufClosing.astro` y `src/content/education/page.json` (`reuf`). Los destacados usan `{teaching-years}` y `{bootcamps}` de `src/data/stats.ts` y los módulos salen de `reuf-modules` (ADR-053, ADR-072);
    - el campo de puntos y el halo son las utilidades `texture-dots` y `texture-halo` de `global.css`, que hoy usa solo `Hero.astro`;
    - las curvas de nivel son el componente reutilizable de E200-I05.
- `DESIGN.md` 4.5 (campo de puntos, halo y curvas de nivel), 7.8 (franja temática) y 11.4 (Educación).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Cabecera:** el mismo campo de puntos del hero (dos capas, la máscara radial elíptica y el halo solo en oscuro, 4.5), detrás del encabezado de la página.
- **Franjas con curvas de nivel**, una composición por franja y distinta de la de Inicio (que lleva dos grupos en esquinas opuestas):
    - **Inteligencia Artificial (`ai`):** un solo relieve grande que asoma por el borde derecho, centrado en vertical, como una colina detrás de las insignias;
    - **Desarrollo y Datos (`dev-data`):** curvas alargadas en horizontal, como una cordillera, que nacen en la esquina inferior izquierda y se desvanecen hacia la derecha;
    - en ambas, cada quinta curva en dorado, mismos tokens de color que Inicio y la cuadrícula se retira de esas dos franjas.
- **Franja «Tecnología Cloud» (`cloud`, tono `bg`):** el mismo campo de puntos de la cabecera (dos capas, máscara radial y halo solo en oscuro). Así las tres franjas alternan curvas de nivel, puntos y curvas de nivel.
- **Bloque REUF, alternativa A (panel de cifras):**
    - desde 1.024 px, dos columnas: a la izquierda el ícono, el título y el párrafo; a la derecha un panel con 3 cifras apiladas, separado del texto por una barra vertical con el degradado `gold` → `vibrant` (la misma de la banda de Inicio, ADR-058) y con divisores finos entre cifras;
    - cifras, con el «+» antepuesto como en la banda de Inicio: **+150 Módulos aprobados** (`reuf-modules`), **+10 Años de experiencia** (`teaching-years`) y **+5 Bootcamps de Talento Digital** (`bootcamps`), en `en-US` «Approved modules», «Years of experience» y «Talento Digital bootcamps»;
    - la fila actual de destacados con ✓ desaparece: su información pasa al panel. El párrafo no cambia.

## Alcance
- Campo de puntos y halo en la cabecera de Educación y en la franja `cloud`.
- Variante con curvas de nivel en las franjas `ai` y `dev-data`, con su composición propia.
- Bloque REUF en dos columnas con el panel de cifras, sus rótulos en el contenido bilingüe y su versión bajo 1.024 px.
- Bloque de `DESIGN.md` 4.5, 7.8 y 11.4 para Felipe.

## Fuera de alcance
- La formación académica, las insignias, el diálogo de certificaciones, el JSON-LD y el cierre con los botones de CV y Contacto.
- Las bandas de otras páginas, que conservan la cuadrícula.

## Tareas
- [ ] **Cabecera:** montar en `EducationHeader.astro` las capas `texture-dots` y `texture-halo` del hero (absolutas, `aria-hidden`, detrás del contenido). Si hace falta ajustar la posición de la máscara o del halo al encabezado centrado, hacerlo con una variable y no con una copia de las utilidades.
- [ ] **Franjas:** agregar a `ThemeStripe.astro` dos variantes de fondo: con curvas de nivel (conserva el fondo `band`, el degradado oscuro y los bordes, sin la cuadrícula), para `ai` y `dev-data`; y con campo de puntos (sobre el fondo `bg`, con la misma capa y la misma variable de máscara y halo que la cabecera), para `cloud`. Ambas quedan disponibles para otras páginas (Docente las usa en E200-I09).
- [ ] **Composiciones:** dibujar en el componente de E200-I05 las dos composiciones nuevas (relieve en el borde derecho para `ai`; cordillera horizontal desde la esquina inferior izquierda para `dev-data`), con trazos suavizados, piezas ancladas y 10 KB o menos por composición. Comprobar que, con la franja apilada bajo 1.024 px, las curvas no tapan las insignias ni sus nombres.
- [ ] **REUF, contenido:** reemplazar en `page.json` los destacados por los rótulos de las 3 cifras (es y en) y tomar los valores de `getStat('reuf-modules')`, `getStat('teaching-years')` y `getStat('bootcamps')`, sin números escritos a mano (ADR-053).
- [ ] **REUF, maquetación:** desde 1.024 px, dos columnas con el panel a la derecha (barra degradada, cifras en `font-display` con el «+» en `primary` en claro y `gold` en oscuro, rótulos en `font-mono`); entre 768 y 1.023 px, el panel pasa bajo el texto como una fila de 3 cifras; bajo 768 px, las 3 cifras apiladas. Las cifras van en una lista de definiciones (`dl`), como en la banda de Inicio.
- [ ] **Controles:** revisar `scripts/verify-seo.mjs` y `check-i18n.mjs` por dependencias de los destacados o de la cuadrícula de las franjas; ajustar solo lo necesario y comprobar que el control ajustado falla ante un caso roto.
- [ ] **Revisión visual:** protocolo de la épica en `/es/educacion/` y `/en/education/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px, con el diálogo de una certificación abierto. Medir el contraste donde una curva pasa detrás del nombre de una insignia.
- [ ] **Registro y bloques:** ADR-111, bloque de `DESIGN.md` 4.5, 7.8 y 11.4 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/education/EducationHeader.astro`, `CertificationsSection.astro`, `ReufClosing.astro`, `src/components/ui/ThemeStripe.astro`, el componente de curvas de E200-I05, `src/content/education/page.json`, `src/content.config.ts` (si cambia el esquema de `reuf`) y `src/styles/global.css` (si hace falta una variable para la cabecera).

## Criterios de aceptación (verificables)
- [ ] La cabecera muestra el campo de puntos del hero en claro y oscuro (halo solo en oscuro), en es y en, sin tapar el texto.
- [ ] Las franjas `ai` y `dev-data` muestran curvas de nivel suavizadas, cada una con su composición, distinta entre sí y distinta de la de Inicio.
- [ ] La franja `cloud` muestra el campo de puntos (halo solo en oscuro) sin tapar las insignias ni sus nombres.
- [ ] Las demás bandas del sitio conservan la cuadrícula.
- [ ] Desde 1.024 px, el bloque REUF ocupa todo el ancho de la tarjeta, con el panel de 3 cifras a la derecha; sin desbordes del inglés.
- [ ] Las cifras del panel salen de los datos compartidos y coinciden con las de Inicio.
- [ ] Bajo 1.024 px, el panel se reordena como se describe en la tarea 5, sin desbordes a 360 px.
- [ ] Las texturas no se anuncian en lectores de pantalla ni reciben foco o clics; el texto mantiene los contrastes de 4.4.
- [ ] Sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-106, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-111 · Educación: puntos en la cabecera, curvas de nivel por franja y panel de cifras en el bloque REUF
- **Contexto:** E200-I06. Revisión de Felipe en producción el 16-11-2026: la cabecera de Educación no comparte el fondo del hero, las franjas de certificaciones usan la cuadrícula y el bloque REUF deja vacío cerca del 35 % derecho de la tarjeta en escritorio.
- **Decisión (de Felipe, 16-11-2026):**
    - la cabecera de Educación usa el campo de puntos y el halo del hero (4.5);
    - las franjas `ai` y `dev-data` cambian la cuadrícula por curvas de nivel, con una composición propia cada una (relieve en el borde derecho y cordillera desde la esquina inferior izquierda); la franja `cloud`, de fondo liso, lleva el campo de puntos de la cabecera;
    - el bloque REUF pasa a dos columnas desde 1.024 px, con un panel de 3 cifras a la derecha (módulos aprobados, años de experiencia y bootcamps), elegido entre 3 vistas previas (alternativa A); la fila de destacados se retira.
- **Consecuencias:** el campo de puntos deja de ser exclusivo del hero y `ThemeStripe` gana dos variantes de fondo (curvas de nivel y puntos); las curvas de nivel se usan en Inicio y en dos franjas de Educación, siempre con una composición distinta. Las cifras del panel salen de los datos compartidos (ADR-053). Felipe edita `DESIGN.md` 4.5, 7.8 y 11.4 (ADR-033).
- **Origen:** E200-I06, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- El halo del hero está calculado para un hero asimétrico (78 % / 40 %). La cabecera de Educación es centrada: puede necesitar otra posición, que se ajusta con una variable.
- Las insignias de certificación son imágenes con fondo propio: las curvas no deben cruzarlas de forma que parezcan parte de la insignia.
- El párrafo REUF ya dice «más de 150 módulos»; el panel repite la cifra. Es intencional (lectura rápida frente a lectura completa) y lo aprobó Felipe en la vista previa.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
