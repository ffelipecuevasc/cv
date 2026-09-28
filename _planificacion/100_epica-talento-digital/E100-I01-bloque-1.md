# E100-I01 · Talento Digital, primera mitad de secciones
- **Estado:** [ ] Pendiente
- **Épica:** E100 · Página Talento Digital (talento-digital.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E60-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-007, ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la primera mitad de las secciones de la página (hasta la mitad del contenido del `<main>`), con estructura completa de la página.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:talento-digital.html`; se divide por volumen: es la página con más texto propio del sitio.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Estructura de la página y primera mitad de secciones en ambos idiomas.

## Fuera de alcance
- Segunda mitad (E100-I02).

## Tareas
- [ ] Definir el corte exacto de secciones y registrarlo en la bitácora.
- [ ] Construir y traducir.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/talento-digital.astro`, `src/pages/en/talento-digital.astro`.

## Criterios de aceptación (verificables)
- [ ] Las secciones del bloque tienen paridad en ambos idiomas y la página compila completa.
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
