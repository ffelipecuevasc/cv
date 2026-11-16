# E90-I02 · Trayectoria como relator (capa de datos)
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E90 · Página Instructor (instructor.html) · **Prioridad:** P2 · **Tamaño:** S
- **Depende de:** E90-I01 · **Hallazgos que cierra:** AT-090 · **ADR relacionados:** ADR-017, ADR-025, ADR-036, ADR-063, ADR-068, ADR-072

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar las 6 experiencias de relatoría al modelo de contenido bilingüe.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `static/js/relatoria.js`, `static/js/datos/relatoria.datos.js`, `static/js/config/relatoria.config.js`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Listado en orden cronológico descendente.

## Fuera de alcance
- Composición A elegida por Felipe el 01-11-2026 (ADR-073). Datos en `src/content/instructor/page.json` (`teaching`), renderizados al construir.

## Tareas
- [x] Migrar datos y renderizado.

## Archivos previstos (crear / modificar)
- Crear: componente y contenido de relatoría.

## Criterios de aceptación (verificables)
- [x] Las 6 experiencias presentes en ambos idiomas.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- Composición A elegida por Felipe el 01-11-2026 (ADR-073). Datos en `src/content/instructor/page.json` (`teaching`), renderizados al construir.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
