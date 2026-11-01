# E70-I01 · Aspectos técnicos y muro de tecnologías
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E70 · Página Desarrollador (desarrollador.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E60-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-007, ADR-017, ADR-036, ADR-048, ADR-056, ADR-063, ADR-064, ADR-065

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar los aspectos técnicos y el muro de 36 tecnologías agrupadas en 5 categorías.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:desarrollador.html`, íconos en `static/img/iconos/`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Secciones de aspectos técnicos y tecnologías en ambos idiomas.

## Fuera de alcance
- Portafolio (E70-I02).

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036).
- [x] Migrar íconos SVG y agrupaciones.
- [x] Redactar `en-US`.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/desarrollador.astro`, `src/pages/en/developer.astro`, componentes.

## Criterios de aceptación (verificables)
- [x] Las 36 tecnologías y sus categorías presentes en ambos idiomas.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- Composición, cabecera y muro: ADR-067. Hallazgos nuevos: AT-082 y AT-083. Inglés por validar (ADR-017).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
