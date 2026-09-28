# E20-I03 · Tipografía autoalojada e iconografía SVG
- **Estado:** [ ] Pendiente
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I02 · **Hallazgos que cierra:** AT-016, AT-017 · **ADR relacionados:** ADR nuevo (tipografía e íconos)

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Servir Lexend desde el propio sitio con los pesos mínimos necesarios y reemplazar Material Symbols por íconos SVG en línea.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-017: Lexend se carga desde Google Fonts con 7 pesos (`index.html:34`).
- AT-016: Material Symbols se carga como fuente variable completa (`index.html:36`) para ~57 íconos.
- Astro ofrece una API de fuentes; la opción concreta requiere ADR.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- ADR que elija el mecanismo de fuentes y el origen de los íconos.
- Subconjunto de pesos acordado en `DESIGN.md`.
- Componente de ícono accesible (decorativo por defecto).

## Fuera de alcance
- Íconos de marcas de terceros (se reutilizan los SVG existentes de `static/img/iconos/`).

## Tareas
- [ ] Registrar el ADR.
- [ ] Autoalojar Lexend con `font-display` adecuado y precarga del peso crítico.
- [ ] Inventariar los íconos usados en el sitio antiguo y proveer su equivalente SVG.
- [ ] Verificar que no hay solicitudes a `fonts.googleapis.com` ni `fonts.gstatic.com`.

## Archivos previstos (crear / modificar)
- Crear: archivos de fuente o configuración de la API de fuentes, componente de ícono.

## Criterios de aceptación (verificables)
- [ ] Cero solicitudes a Google Fonts en el build.
- [ ] Todos los íconos del inventario tienen equivalente.
- [ ] El logotipo mantiene Lexend en peso 700.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` y revisión de la pestaña de red en `pnpm preview`.

## Riesgos y notas
- Cambio de métricas de fuente puede afectar el ancho reservado del logotipo: validar en E30-I03.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
