# E190-I03 · README final y retiro de archivos del sitio antiguo
- **Estado:** [x] Terminada (15-11-2026)
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I02 · **Hallazgos que cierra:** AT-056 (retiro de la muestra de tokens), AT-127 (aceptado), AT-129 · **ADR relacionados:** ADR-014, ADR-042, ADR-091, ADR-102 · **Hallazgo nuevo:** AT-141 (resuelto)

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
- [x] Puerta: rama `migracion-astro`, E190-I02 `[x]`; I03 marcada `[~]` (15-11-2026).
- [x] Inventario con evidencia de que ninguna ruta ni script depende de los archivos antiguos (ADR-102).
- [x] Confirmar la lista con Felipe antes de borrar (15-11-2026): todo el sitio antiguo y la muestra; `docs/` se conserva; tag de retorno; AT-129 entra.
- [x] Retirar con `git rm`: 13 `*.html`, `sitemap.xml`, `robots.txt`, `_redirects` y `linkinator.config.json` de la raíz, `functions/`, `static/` y la muestra de tokens (páginas, componente y ruta interna).
- [x] Ajustar `check:i18n` (`EXPECTED_PAIRS` 13 → 12), `eslint.config.js`, `.prettierignore` y los comentarios de `astro.config.mjs`; `ADR-042` anota el retiro.
- [x] Actualizar el README (final).
- [x] AT-127 registrado como aceptado; AT-129 resuelto como precaución.
- [x] Medir `dist/` antes y después (ver la bitácora).
- [x] Felipe quitó de `public/_headers` el hash sobrante (AT-141, commit d853c8e): `pnpm verify:seo` 1192/1192.
- [x] Felipe aplicó los bloques de `AGENTS.md` y `.claude/settings.json` y creó el tag `sitio-antiguo-2026-11` (en origin, apunta a `b49a5bb` = `main`).
- [x] Rendimiento (ADR-015) tras el cambio de hoja CSS de los testimonios: PSI sobre la preview, `/es/` 100 y 100, `/en/` 98 y 100; ninguna página bajo su línea base (ver la bitácora).
- [x] OK de Felipe para marcar `[x]` (15-11-2026, en el pedido de cierre).

## Archivos previstos (crear / modificar)
- Eliminar: los archivos antiguos y la muestra de tokens (ver ADR-102).
- Modificar: `README.md`, `scripts/check-i18n.mjs`, `eslint.config.js`, `.prettierignore`, `astro.config.mjs` (comentarios) y `src/i18n/routes.ts`.

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
