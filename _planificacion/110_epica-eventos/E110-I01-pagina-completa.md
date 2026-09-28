# E110-I01 · Página de eventos con estado por fecha
- **Estado:** [ ] Pendiente
- **Épica:** E110 · Página Eventos (eventos.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-039 · **ADR relacionados:** ADR-007, ADR-017, ADR-018

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página y el evento publicado, con estado Próximo/Finalizado calculado en el cliente y un estado base correcto sin JavaScript.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:eventos.html`, `static/js/eventos.js`, `static/js/datos/eventos.datos.js`, `static/js/config/eventos.config.js`, imagen `static/img/eventos/2026-10-03-taller-claude.webp`.
- AT-039: el estado se calcula comparando la fecha del evento con la fecha actual.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Tarjetas de evento con `<time datetime>` y zona horaria de Chile continental.
- Estado vacío.
- Enlaces externos con `rel="noopener noreferrer"`.

## Fuera de alcance
- Datos estructurados Event (backlog BL-03).

## Tareas
- [ ] Migrar datos al modelo bilingüe.
- [ ] Calcular el estado en el cliente con estado base generado en el build.
- [ ] Redactar `en-US`.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/eventos.astro`, `src/pages/en/events.astro`, componentes.

## Criterios de aceptación (verificables)
- [ ] Un evento pasado se muestra como Finalizado sin necesidad de un build nuevo.
- [ ] Fechas formateadas según el idioma.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba cambiando la fecha del sistema.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
