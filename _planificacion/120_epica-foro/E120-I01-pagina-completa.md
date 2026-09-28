# E120-I01 · Página del foro con Giscus bilingüe
- **Estado:** [ ] Pendiente
- **Épica:** E120 · Página Foro (foro.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-027 · **ADR relacionados:** ADR-007, ADR-022

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página del foro con Giscus cargado de forma diferida, tema sincronizado e idioma de interfaz según la página.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:foro.html`, `static/js/comunidad.js`, `static/js/config/comunidad.config.js` (repo `ffelipecuevasc/comunidad`, categoría "Dudas por ruta", idioma fijo `es` en la línea 17).
- ADR-022: ambos idiomas usan el término `foro-general` (`foro.html:289`).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Carga diferida, espacio reservado, alternativa `<noscript>` y aviso de transparencia.
- Sincronía con el cambio de tema.

## Fuera de alcance
- —

## Tareas
- [ ] Migrar la integración.
- [ ] Pasar el idioma de Giscus según la página.
- [ ] Verificar que `/es/foro` y `/en/forum` muestran los mismos mensajes existentes.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/foro.astro`, `src/pages/en/forum.astro`, componente de Giscus.

## Criterios de aceptación (verificables)
- [ ] Ambas rutas muestran el hilo existente con sus mensajes.
- [ ] El tema de Giscus cambia con el del sitio.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba en la URL de preview.

## Riesgos y notas
- La CSP de E170-I03 debe permitir `giscus.app`.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
