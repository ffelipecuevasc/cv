# E50-I01 · Formación académica y diplomados
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E50 · Página Educación (educacion.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-026 (parte de Educación; el resto de las páginas sigue en sus épicas) · **ADR relacionados:** ADR-007, ADR-017, ADR-036, ADR-060

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar las secciones de formación académica y diplomados al modelo bilingüe.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:educacion.html`, `static/js/formacion.js`, `static/js/datos/formacion.datos.js`, `static/js/config/formacion.config.js`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.
- **Decisiones de Felipe (31-10-2026), recogidas en ADR-060:**
  - mosaico («bento») sin conmutador ni filtros, con orden fijo por peso y sin JavaScript;
  - las distinciones son tarjetas chicas;
  - el diploma de la Universidad de Chile se titula «Diplomado en Estrategias Metodológicas y Evaluativas para la Formación Laboral».

## Alcance
- Encabezado de página y secciones de formación en ambos idiomas.

## Fuera de alcance
- Certificaciones (E50-I02).

## Tareas
- [x] Aplicar el patrón de composición de la página (ADR-036, ADR-060): encabezado alineado a la izquierda y mosaico de tarjetas por peso.
- [x] Migrar datos: las 9 entradas de `formacion.datos.js` a `src/content/education/entries/` con paridad es / en obligatoria (AT-026).
- [x] Redactar `en-US` (ADR-017): lo valida Felipe.
- [x] Construir la página: `src/pages/es/educacion.astro` y `src/pages/en/education.astro`, con metadatos, `hreflang` y un solo `<h1>`.
- [x] Ampliar `pnpm verify:seo` a las dos páginas de Educación.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/educacion.astro`, `src/pages/en/education.astro`, `src/components/education/` (`EducationHeader`, `FormationSection`, `FormationCard`), `src/content/education/page.json` y `entries/*.json` (9), `src/content/pages/education.json`.
- Modificar: `src/content.config.ts` (colecciones `educationEntries` y `educationPage`), `src/components/ui/icons.ts` (4 íconos), `src/components/ui/SectionHeader.astro` (acepta `level={1}`), `src/components/ui/Card.astro` (tamaño `compact`) y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] Paridad de contenido con el sitio actual en `es-CL` y traducción en `en-US`, pendiente de validación de Felipe (ADR-017): las 9 entradas, con el texto en español igual al de `main`, salvo el título del diploma.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD): ok, 6 páginas.
- `pnpm check`, `pnpm lint` y `pnpm format:check` sin errores (DoD): ok.
- `pnpm verify:seo`: 133 de 133.
- Chrome real a 375, 768, 1.024 y 1.280 px, claro y oscuro, es y en: sin desborde, un `<h1>` y un `<main>`; recorrido con teclado.

## Riesgos y notas
- Hasta E50-I02, el `<h1>` y la bajada hablan de certificaciones que la página aún no muestra (solo afecta a las previews).
- El bloque «Instructor REUF» y el cierre con «Descargar CV» del `<main>` antiguo no entraron: ver AT-076.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
