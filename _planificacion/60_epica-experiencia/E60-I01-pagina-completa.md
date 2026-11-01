# E60-I01 · Página de resumen de experiencia
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E60 · Página Experiencia (experiencia.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-007, ADR-017, ADR-036, ADR-065

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página de resumen de experiencia (~250 palabras) con sus tres perfiles, cuatro destinos e imágenes.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:experiencia.html`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Contenido completo en ambos idiomas.
- Imágenes con dimensiones declaradas.

## Fuera de alcance
- —

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página (grilla simétrica de tarjetas, ADR-065); el bloque para DESIGN.md va en la bitácora (ADR-033).
- [x] Construir la página y sus secciones.
- [x] Redactar `en-US` (Felipe lo valida, ADR-017).

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/experiencia.astro`, `src/pages/en/experience.astro`, `src/components/experience/` (3), `src/content/experience/page.json`, `src/content/pages/experience.json` y `src/assets/experience/` (3 fotos).
- Modificar: `src/content.config.ts` y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] Los enlaces a los cuatro destinos salen del mapa de rutas y apuntan a las páginas reales en ambos idiomas; hasta E70 a E100 dan 404 y `verify:seo` los admite con una lista cerrada (ADR-065, sin páginas de prueba).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- —

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
