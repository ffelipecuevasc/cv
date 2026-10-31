# E50-I02 · Gabinete de certificaciones y JSON-LD
- **Estado:** [ ] Pendiente
- **Épica:** E50 · Página Educación (educacion.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E50-I01 · **Hallazgos que cierra:** AT-013, AT-014 · **ADR relacionados:** ADR-017, ADR-036

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reconstruir las certificaciones agrupadas por categoría en franjas temáticas de ancho completo en zigzag (ADR-036), en lugar de una línea de tiempo con igual protagonismo, con su interacción (modal o detalle) y los datos estructurados de credenciales.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `static/js/certificaciones.js`, `static/js/datos/certificaciones.datos.js`, `static/js/config/certificaciones.config.js`, imágenes en `static/img/logos/`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.
- ADR-036: cada franja muestra el título de la categoría y las insignias en tamaño pequeño; las franjas alternan la orientación (título a la izquierda e insignias a la derecha, luego al revés) y en móvil se apilan en una columna.
- Clasificación propuesta, **por validar por Felipe** (BL-07): Inteligencia artificial (AWS AI Practitioner, Oracle AI Associate, Oracle AI Professional); Cloud (AWS Cloud Practitioner, AWS Developer Associate, Oracle OCI Associate); Desarrollo y datos (Python Institute PCEP, Oracle Developer Professional, Oracle Data Science Professional).

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
- [ ] Migrar datos y lógica.
- [ ] Optimizar imágenes de insignias.
- [ ] Validar enlaces de verificación (Credly, Oracle, OpenEDG). Incluye la URL de `oracle-agentic-ai-foundations` (`/pls/certview/…`) frente a las otras 5 de Oracle (`/ords/certview/…`), que Felipe debe probar y dejar con una sola ruta (AT-075). La URL de Credly de Anthropic ya termina en `/public_url` (cierre de E40).
- [ ] Agregar el campo de categoría a los datos con la clasificación validada por Felipe (BL-07); sin esa validación, la iteración se detiene y pregunta (ADR-036).
- [ ] Construir las franjas por categoría en zigzag con apilado en móvil (ADR-036).
- [ ] Diferir la carga de insignias y declarar `width` y `height` para evitar CLS.

## Archivos previstos (crear / modificar)
- Crear: componentes de certificaciones.

## Criterios de aceptación (verificables)
- [ ] Todas las credenciales del sitio actual presentes con enlace de verificación.
- [ ] El diálogo es operable con teclado.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.
- [ ] Las certificaciones se muestran agrupadas por categoría en franjas que alternan su orientación y se apilan en móvil (ADR-036).
- [ ] Las nueve credenciales del sitio actual tienen categoría y ninguna se eliminó.
- [ ] CLS de la página dentro de los umbrales de ADR-015.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Recorrido con teclado.
- Validador de schema.org.

## Riesgos y notas
- **Pendientes heredados del cierre de E40 (31-10-2026):**
  - **AT-067:** la cifra de certificaciones no filtra por vencimiento; al ampliar los datos hay que decidir con Felipe si excluye las vencidas (la primera vence el 30-10-2027).
  - **AT-075:** URL de Oracle `/pls/` frente a `/ords/`, pendiente de que Felipe la pruebe.
  - **BL-06:** consentimiento de uso de nombres y fotos de los 12 testimonios de Inicio, antes de E190 (AT-025).
  - **AT-074 (favicon en Safari e iOS)** sigue en E170-I02; se lista aquí solo para no perderlo.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
