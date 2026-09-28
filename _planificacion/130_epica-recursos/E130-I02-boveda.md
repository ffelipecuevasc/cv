# E130-I02 · Bóveda de recursos y JSON-LD Course
- **Estado:** [ ] Pendiente
- **Épica:** E130 · Página Recursos (recursos.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E130-I01 · **Hallazgos que cierra:** AT-034, AT-043 · **ADR relacionados:** ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la bóveda de descargas conservando las rutas públicas de los archivos y el JSON-LD Course.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `static/js/datos/recursos.datos.js`, archivos en `static/recursos/` (hasta 12 MB).
- AT-043: las rutas públicas de PDFs pueden estar compartidas fuera del sitio.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Archivos servidos desde las mismas rutas públicas `/static/...`.
- Aviso en `en-US` de que los archivos están en español.
- Peso de cada archivo visible junto al enlace.

## Fuera de alcance
- Traducción de PDFs (backlog BL-04).

## Tareas
- [ ] Copiar archivos a `public/static/` preservando rutas.
- [ ] Migrar datos.
- [ ] Traducir descripciones.

## Archivos previstos (crear / modificar)
- Crear: `public/static/recursos/*`, componentes de bóveda.

## Criterios de aceptación (verificables)
- [ ] Todas las rutas públicas de PDFs y plantillas del sitio actual responden igual en la preview.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Comparación de la lista de rutas de `main` con `dist/`.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
