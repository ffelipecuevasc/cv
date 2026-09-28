# E80-I01 · Página de docencia universitaria
- **Estado:** [ ] Pendiente
- **Épica:** E80 · Página Docente (docente.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E60-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-007, ADR-017

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
- [ ] Construir la página.
- [ ] Redactar `en-US` y validarlo con Felipe.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/docente.astro`, `src/pages/en/lecturer.astro`.

## Criterios de aceptación (verificables)
- [ ] Paridad de contenido en ambos idiomas.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
