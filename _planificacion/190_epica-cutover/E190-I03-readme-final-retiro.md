# E190-I03 · README final y retiro de archivos del sitio antiguo
- **Estado:** [ ] Pendiente
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I02 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-014

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Dejar la rama lista para el merge: README de la raíz final y eliminación de los archivos del sitio antiguo que quedaron como referencia.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Clasificación de archivos antiguos registrada en la bitácora de E10-I01.
- Tras el merge, el historial conserva el sitio antiguo.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Eliminar `*.html` antiguos, `static/` (salvo lo copiado a `public/`), `functions/` si fue reemplazada, `sitemap.xml`, `robots.txt`, `_redirects` y `linkinator.config.json` de la raíz, y `docs/` según decida Felipe.
- README con despliegue y operación.

## Fuera de alcance
- Merge (lo hace Felipe).

## Tareas
- [ ] Confirmar la lista con Felipe antes de borrar.
- [ ] Actualizar el README.

## Archivos previstos (crear / modificar)
- Eliminar: archivos antiguos listados.
- Modificar: `README.md`.

## Criterios de aceptación (verificables)
- [ ] `pnpm build` y todas las verificaciones pasan tras el retiro.
- [ ] Ninguna ruta pública depende de un archivo eliminado.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build`, `pnpm verify`, `pnpm check:i18n`.

## Riesgos y notas
- Borrado es irreversible en la rama: consultar antes.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
