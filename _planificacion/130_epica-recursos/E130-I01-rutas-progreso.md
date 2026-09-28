# E130-I01 · Rutas de aprendizaje con progreso
- **Estado:** [ ] Pendiente
- **Épica:** E130 · Página Recursos (recursos.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-028, AT-037 · **ADR relacionados:** ADR-007, ADR-017, ADR-023

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar el selector de rutas y los pasos con progreso marcable guardado en `localStorage`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:recursos.html`, `static/js/rutas.js`, `static/js/datos/rutas.datos.js`, `static/js/config/rutas.config.js` (clave `rutas-progreso`).
- AT-037: `<title>` "Rutas de Aprendizaje" (`recursos.html:7`) no coincide con el `<h1>` "Bóveda de Recursos" (`:267`).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Rutas en ambos idiomas con la misma clave de progreso para ambos.

## Fuera de alcance
- Bóveda (E130-I02).

## Tareas
- [ ] Migrar datos y lógica.
- [ ] Conservar el formato del progreso guardado.
- [ ] Alinear `<title>` y `<h1>` con Felipe.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/recursos.astro`, `src/pages/en/resources.astro`, componentes de rutas.

## Criterios de aceptación (verificables)
- [ ] Un progreso guardado en el sitio actual se ve igual en el sitio nuevo en ambos idiomas.
- [ ] `<title>` y `<h1>` coherentes.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba con un valor de `rutas-progreso` precargado.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
