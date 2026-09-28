# E170-I04 · Enlaces rotos y paridad es/en automatizada
- **Estado:** [ ] Pendiente
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-001

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Automatizar la verificación de enlaces y de paridad entre idiomas como scripts de PNPM.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El sitio actual usaba linkinator con lista manual de páginas (`linkinator.config.json`).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Script de verificación de enlaces sobre `dist/`.
- Script que falla si una ruta existe en un idioma y no en el otro.

## Fuera de alcance
- —

## Tareas
- [ ] Elegir herramienta con ADR si agrega dependencia.
- [ ] Agregar scripts `pnpm verify` y `pnpm check:i18n`.

## Archivos previstos (crear / modificar)
- Modificar: `package.json`; crear configuración de la herramienta.

## Criterios de aceptación (verificables)
- [ ] Ambos scripts pasan en limpio y fallan ante un caso de prueba roto.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm verify`
- `pnpm check:i18n`

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
