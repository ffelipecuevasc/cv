# E110-I01 · Retiro de Eventos
- **Estado:** [x] Terminada (02-11-2026)
- **Épica:** E110 · Retiro de Eventos · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-039 (resuelto por ADR-077) · **ADR relacionados:** ADR-077, ADR-056, ADR-008, ADR-044, ADR-048

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

> **Reconversión (ADR-077, 02-11-2026):** esta iteración se planificó como «Página de eventos con estado por fecha». Al iniciarla, Felipe decidió que los eventos salen del sitio personal porque viven en el sitio de su comunidad, Pulso Devs. Como la iteración no estaba cerrada, se reescribe en lugar de agregar una nueva (ADR-056).

## Objetivo
Retirar del sitio nuevo toda referencia a la página Eventos y dejar el menú Comunidad con Foro y Recursos.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-077: `/eventos` y `/eventos.html` dan 404, sin redirección; sin enlace a Pulso Devs por ahora; sin JSON-LD `Event`.
- Sustituye en parte a ADR-008 / D-08 (opciones de la navbar), ADR-044 (la comunidad ya no conserva eventos) y ADR-048 (par de rutas de eventos).
- El sitio antiguo (`main:eventos.html`, `static/js/eventos.js` y sus datos) no se migra y no se edita.

## Alcance
- Opción «Eventos» / «Events» de la navbar de escritorio y del menú móvil.
- Clave `events` del mapa de rutas y del diccionario de interfaz.
- Pie, `verify:seo` y cualquier ruta, componente o dato de eventos, si existieran.
- Documentos pendientes (E170, E180, E190, visión y auditoría): 14 páginas pasan a 13.

## Fuera de alcance
- Enlace a Pulso Devs (ADR-077).
- El recurso «Glosario del taller» de Recursos (E130).
- Edición de `DESIGN.md`: el bloque va en la bitácora (ADR-033).

## Tareas
- [x] Redactar ADR-077.
- [x] Inventariar con grep lo de eventos en `src/`, `scripts/`, `public/` y documentos pendientes.
- [x] Retirar la opción del menú (`nav-items.ts`), la clave `events` de `routes.ts` y `nav.events` de `ui.ts`.
- [x] Ajustar E170, E180, E190, visión, auditoría y backlog.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/layout/nav-items.ts`, `src/i18n/routes.ts`, `src/i18n/ui.ts`.

## Criterios de aceptación (verificables)
- [x] `dist/` no tiene `/es/eventos/` ni `/en/events/`, y ninguna página enlaza a ellas.
- [x] El menú Comunidad muestra Foro y Recursos, en escritorio y en móvil, en es y en.
- [x] El selector de idioma sigue llevando a la página equivalente.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Búsqueda en `dist/` de rutas y enlaces de eventos.

## Riesgos y notas
- La URL `/eventos` de producción quedará en 404 tras el cutover: posible pérdida de enlaces entrantes, aceptada por Felipe (ADR-077). E180-I01 la documenta.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
