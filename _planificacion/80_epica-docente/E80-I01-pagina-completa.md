# E80-I01 · Página de docencia universitaria
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E80 · Página Docente (docente.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E60-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-007, ADR-017, ADR-036, ADR-070

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página de docencia universitaria con todas sus secciones.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:docente.html`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Contenido completo en ambos idiomas.

## Fuera de alcance
- —

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página (opción B, ADR-070) y dejar el bloque para DESIGN.md en la bitácora (lo edita Felipe, ADR-033).
- [x] Construir la página.
- [x] Redactar `en-US` y validarlo con Felipe (redactado; validación de Felipe pendiente, ADR-017).

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/docente.astro`, `src/pages/en/lecturer.astro`.

## Criterios de aceptación (verificables)
- [x] Paridad de contenido en ambos idiomas.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- —

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
