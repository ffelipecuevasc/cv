# E190-I04 · Verificación posterior al cutover
- **Estado:** [ ] Pendiente
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I03 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-015

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Guiar la verificación en producción después de que Felipe ejecute el cutover.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Procedimiento de E190-I02.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Lista de comprobaciones en producción y seguimiento de indexación.

## Fuera de alcance
- —

## Tareas
- [ ] Comprobar redirecciones, formulario, foro, descargas y sitemap en producción.
- [ ] Registrar la línea base nueva de rendimiento.

## Archivos previstos (crear / modificar)
- Modificar: documentos de `_planificacion/`.

## Criterios de aceptación (verificables)
- [ ] Todas las comprobaciones pasan o hay un AT nuevo con plan.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Comprobaciones en `https://felipecuevas.dev`.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
