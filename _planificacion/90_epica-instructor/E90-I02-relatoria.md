# E90-I02 · Trayectoria como relator (capa de datos)
- **Estado:** [ ] Pendiente
- **Épica:** E90 · Página Instructor (instructor.html) · **Prioridad:** P2 · **Tamaño:** S
- **Depende de:** E90-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017

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
- —

## Tareas
- [ ] Migrar datos y renderizado.

## Archivos previstos (crear / modificar)
- Crear: componente y contenido de relatoría.

## Criterios de aceptación (verificables)
- [ ] Las 6 experiencias presentes en ambos idiomas.
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
