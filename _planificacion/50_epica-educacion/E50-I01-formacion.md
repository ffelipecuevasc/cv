# E50-I01 · Formación académica y diplomados
- **Estado:** [ ] Pendiente
- **Épica:** E50 · Página Educación (educacion.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-026 · **ADR relacionados:** ADR-007, ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar las secciones de formación académica y diplomados al modelo bilingüe.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:educacion.html`, `static/js/formacion.js`, `static/js/datos/formacion.datos.js`, `static/js/paginas/educacion.js`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Encabezado de página y secciones de formación en ambos idiomas.

## Fuera de alcance
- Certificaciones (E50-I02).

## Tareas
- [ ] Migrar datos.
- [ ] Redactar `en-US`.
- [ ] Construir la página.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/educacion.astro`, `src/pages/en/education.astro`, contenido.

## Criterios de aceptación (verificables)
- [ ] Paridad de contenido con el sitio actual en `es-CL` y traducción validada en `en-US`.
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
