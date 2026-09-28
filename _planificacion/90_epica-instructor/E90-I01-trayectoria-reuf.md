# E90-I01 · Trayectoria como instructor REUF
- **Estado:** [ ] Pendiente
- **Épica:** E90 · Página Instructor (instructor.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E60-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-007, ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar las secciones de instructor REUF, incluido el enlace de descarga del certificado REUF.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:instructor.html`, `static/Certificado_REUF_Aprobados_Felipe_Cuevas_2026.pdf`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Contenido en ambos idiomas; el PDF queda en español con aviso en `en-US` (ADR-017).

## Fuera de alcance
- Relatoría (E90-I02).

## Tareas
- [ ] Construir las secciones.
- [ ] Redactar `en-US`.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/instructor.astro`, `src/pages/en/instructor.astro`.

## Criterios de aceptación (verificables)
- [ ] La ruta pública del PDF se conserva (AT-043).
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
