# E90-I01 · Trayectoria como instructor REUF
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E90 · Página Instructor (instructor.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E60-I01 · **Hallazgos que cierra:** AT-043 (parte del certificado REUF) · **ADR relacionados:** ADR-007, ADR-017, ADR-025, ADR-033, ADR-036, ADR-043, ADR-045, ADR-048, ADR-053, ADR-056, ADR-057, ADR-063, ADR-065, ADR-066, ADR-068, ADR-069, ADR-070, ADR-071

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
- [x] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036).
- [x] Construir las secciones.
- [x] Redactar `en-US`.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/instructor.astro`, `src/pages/en/instructor.astro`.

## Criterios de aceptación (verificables)
- [x] La ruta pública del PDF se conserva (AT-043).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- Composición A elegida por Felipe el 01-11-2026 (ADR-072). PF1822 queda en cursos y en planes, como en main. La relatoría (`#relatoria-grid` de main) la agrega E90-I02.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
