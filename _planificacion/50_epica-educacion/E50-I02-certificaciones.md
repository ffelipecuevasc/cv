# E50-I02 · Gabinete de certificaciones y JSON-LD
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E50 · Página Educación (educacion.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E50-I01 · **Hallazgos relacionados:** AT-013 y AT-014 ya resueltos en E40-I01 (no los cierra esta iteración); cierra AT-067 y AT-076; AT-075 sigue abierto; abre AT-077 · **ADR relacionados:** ADR-017, ADR-036, ADR-053, ADR-061

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reconstruir las certificaciones agrupadas por categoría en franjas temáticas de ancho completo en zigzag (ADR-036), en lugar de una línea de tiempo con igual protagonismo, con su interacción (modal o detalle) y los datos estructurados de credenciales.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `static/js/certificaciones.js`, `static/js/datos/certificaciones.datos.js`, `static/js/config/certificaciones.config.js`, imágenes en `static/img/logos/`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.
- ADR-036: cada franja muestra el título de la categoría y las insignias en tamaño pequeño; las franjas alternan la orientación (título a la izquierda e insignias a la derecha, luego al revés) y en móvil se apilan en una columna.
- Las credenciales son **11**, no nueve: el 30-10-2026 se sumaron «Claude Certified Developer – Foundations» (Anthropic) y «Agentic AI Certified Foundations Associate» (Oracle) en `src/data/certifications.ts` (ADR-053, ADR-054).
- Clasificación propuesta, **por validar por Felipe** (BL-07): Inteligencia artificial (AWS AI Practitioner, Oracle AI Associate, Oracle AI Professional); Cloud (AWS Cloud Practitioner, AWS Developer Associate, Oracle OCI Associate); Desarrollo y datos (Python Institute PCEP, Oracle Developer Professional, Oracle Data Science Professional). **Las dos credenciales nuevas no están clasificadas:** se proponen en Inteligencia artificial (Claude Certified Developer – Foundations y Agentic AI Certified Foundations Associate), también por validar.

## Alcance
- Interacción accesible (foco atrapado y Escape si es un diálogo).
- Imágenes optimizadas.
- JSON-LD de credenciales en ambos idiomas.
- Franjas por categoría con la primitiva "franja temática" de E20-I05 y el patrón de Educación de `DESIGN.md` (ADR-036).
- Campo de categoría en los datos de certificaciones; no se elimina ninguna credencial (ADR-036).
- Carga diferida de las insignias fuera de la primera pantalla, con dimensiones explícitas para controlar el CLS.

## Fuera de alcance
- —

## Tareas
- [x] Ampliar `src/data/certifications.ts` con categoría y descripción sobre el arreglo existente (ADR-053): sin crear un segundo arreglo ni duplicar nombres, fechas o URL. Los datos de `main:static/js/datos/certificaciones.datos.js` ya están ahí; solo falta lo que no existe.
- [x] Optimizar imágenes de insignias.
- [x] Validar enlaces de verificación (Credly, Oracle, OpenEDG). Incluye la URL de `oracle-agentic-ai-foundations` (`/pls/certview/…`) frente a las otras 5 de Oracle (`/ords/certview/…`), que Felipe debe probar y dejar con una sola ruta (AT-075). La URL de Credly de Anthropic ya termina en `/public_url` (cierre de E40).
- [x] Agregar el campo de categoría a los datos con la clasificación validada por Felipe (BL-07); sin esa validación, la iteración se detiene y pregunta (ADR-036).
- [x] Construir las franjas por categoría en zigzag con apilado en móvil (ADR-036).
- [x] Diferir la carga de insignias y declarar `width` y `height` para evitar CLS.

## Archivos previstos (crear / modificar)
- Crear: componentes de certificaciones.
- Modificar: `src/data/certifications.ts` (categoría y descripción), `src/pages/es/educacion.astro` y `src/pages/en/education.astro` (agregar las franjas tras la formación).

## Criterios de aceptación (verificables)
- [x] Las 11 credenciales de `src/data/certifications.ts` presentes con enlace de verificación.
- [x] El diálogo es operable con teclado.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.
- [x] Las certificaciones se muestran agrupadas por categoría en franjas que alternan su orientación y se apilan en móvil (ADR-036).
- [x] Las 11 credenciales tienen categoría y ninguna se eliminó.
- [x] CLS de la página dentro de los umbrales de ADR-015.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Recorrido con teclado.
- Validador de schema.org.

## Riesgos y notas
- **Pendiente heredado de E50-I01 (AT-076):** el `<main>` antiguo de Educación traía un bloque «Instructor REUF» (más de 150 módulos, 10+ años, 5+ bootcamps) y un cierre con «Descargar CV» y «Envíame un mensaje». No entraron en E50-I01; hay que decidir con Felipe si se migran, se reubican (Instructor REUF ya tiene su página) o se descartan con un ADR.
- La `description` de `src/content/pages/education.json` ya nombra los cuatro emisores y no lleva ninguna cifra de certificaciones (ADR-053).
- **Pendientes heredados del cierre de E40 (31-10-2026):**
  - **AT-067:** la cifra de certificaciones no filtra por vencimiento; al ampliar los datos hay que decidir con Felipe si excluye las vencidas (la primera vence el 30-10-2027).
  - **AT-075:** URL de Oracle `/pls/` frente a `/ords/`, pendiente de que Felipe la pruebe.
  - **BL-06:** consentimiento de uso de nombres y fotos de los 12 testimonios de Inicio, antes de E190 (AT-025).
  - **AT-074 (favicon en Safari e iOS)** sigue en E170-I02; se lista aquí solo para no perderlo.

## Resultado (31-10-2026, ADR-061)
- Clasificación validada por Felipe: IA (5), Cloud (3), Desarrollo y datos (3). Franjas en zigzag, fondo `band` / `bg`.
- Detalle en `<dialog>` nativo con foco atrapado, Escape y retorno del foco; sin JavaScript se ve en la franja.
- Sin vencimientos (cierra AT-067). Bloque «Instructor REUF» y cierre migrados (cierra AT-076).
- Insignias de `main:static/img/logos/` en `src/assets/badges/` (9); Anthropic y Oracle Agentic usan la del emisor como marcador (AT-077).
- URL de Oracle sin cambios (AT-075 abierto). Descripciones `en-US` y las 2 nuevas en español, por validar.
- Verificación: `pnpm build`, `check`, `lint`, `format:check` ok; `pnpm verify:seo` 153 de 153; Chrome a 375 y 1.280 px, claro y oscuro, es y en, teclado, diálogo y sin JavaScript.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
