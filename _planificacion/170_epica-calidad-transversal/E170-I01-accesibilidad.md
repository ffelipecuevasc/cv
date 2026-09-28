# E170-I01 · Revisión de accesibilidad global
- **Estado:** [ ] Pendiente
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-005

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Auditar y corregir la accesibilidad de todas las páginas en ambos idiomas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Línea base Lighthouse de accesibilidad del sitio actual: 91–96 (`docs/linea-base/2026-08-12/resumen-lighthouse.md`).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Teclado, foco, landmarks, encabezados, contraste, textos alternativos, idioma de página.

## Fuera de alcance
- —

## Tareas
- [ ] Ejecutar Lighthouse y una herramienta de reglas de accesibilidad en las 26 páginas.
- [ ] Corregir hallazgos o registrarlos como AT nuevos.
- [ ] Recorrido manual con teclado y lector de pantalla en páginas clave.

## Archivos previstos (crear / modificar)
- Modificar: los componentes con hallazgos.

## Criterios de aceptación (verificables)
- [ ] Accesibilidad de Lighthouse ≥ 96 en todas las páginas.
- [ ] Sin errores críticos ni serios.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Lighthouse por página y resumen en la bitácora.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
