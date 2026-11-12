# E190-I03 · README final y retiro de archivos del sitio antiguo
- **Estado:** [ ] Pendiente
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I02 · **Hallazgos que cierra:** AT-056 (retiro de la muestra de tokens) · **ADR relacionados:** ADR-014, ADR-042, ADR-091

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
- **Retirar la muestra de tokens (AT-056, ADR-091; decisión de Felipe, 12-11-2026):** borrar `src/pages/es/muestra-diseno.astro`, `src/pages/en/design-sample.astro`, su componente de muestra (`src/components/dev/`) y la ruta interna de `src/i18n/routes.ts`; quitar de `verify:seo` y de la documentación cualquier control o mención que dependa de ellas. No se corrige el destello.

## Fuera de alcance
- Merge (lo hace Felipe).

## Tareas
- [ ] Confirmar la lista con Felipe antes de borrar.
- [ ] Actualizar el README.
- [ ] Retirar la muestra de tokens y comprobar que `dist/` ya no tiene `es/muestra-diseno/` ni `en/design-sample/` (AT-056, ADR-091).

## Archivos previstos (crear / modificar)
- Eliminar: archivos antiguos listados y la muestra de tokens (páginas, componente y ruta interna).
- Modificar: `README.md`.

## Criterios de aceptación (verificables)
- [ ] `pnpm build` y todas las verificaciones pasan tras el retiro.
- [ ] Ninguna ruta pública depende de un archivo eliminado.
- [ ] La muestra de tokens no existe en el código ni en `dist/` y AT-056 queda resuelto.
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
