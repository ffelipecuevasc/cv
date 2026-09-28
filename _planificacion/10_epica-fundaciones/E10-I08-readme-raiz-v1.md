# E10-I08 · README.md de la raíz, versión 1
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E10-I04, E10-I07 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-003

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reemplazar el README antiguo por la documentación del proyecto nuevo: instalación con PNPM, scripts, estructura y enlace a la planificación.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El README antiguo no se usa como insumo (regla de AGENTS.md).
- El README de la raíz es distinto de `_planificacion/README.md`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Requisitos (Node 24 LTS, PNPM 12), instalación, scripts, estructura de carpetas, i18n, cómo ejecutar en WebStorm, enlace a `AGENTS.md`, `DESIGN.md` y `_planificacion/`.

## Fuera de alcance
- Despliegue definitivo (se completa en E190-I03).

## Tareas
- [ ] Redactar el README en español de Chile.
- [ ] Validar cada comando en un clon limpio.

## Archivos previstos (crear / modificar)
- Reemplazar: `README.md` (raíz).

## Criterios de aceptación (verificables)
- [ ] Siguiendo solo el README, un clon limpio queda funcionando.
- [ ] No menciona npm, yarn ni bun salvo para indicar que están bloqueados.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Ejecutar los comandos del README en un clon limpio.

## Riesgos y notas
- Mantenerlo breve: el detalle vive en `_planificacion/`.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
