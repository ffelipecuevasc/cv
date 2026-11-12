# E180-I02 · Sitemap bilingüe, robots.txt y canónicas
- **Estado:** [ ] Pendiente
- **Épica:** E180 · Migración de URLs y SEO · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E180-I01 · **Hallazgos que cierra:** AT-030 · **ADR relacionados:** ADR-001, ADR-035

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Generar un sitemap con alternativas por idioma y un `robots.txt` coherente.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Sitemap actual manual con `lastmod` desactualizado (`sitemap.xml:5`); `robots.txt` bloquea `/agradecimiento`.
- Integración candidata verificada el 28-09-2026: `@astrojs/sitemap` 3.7.4 (requiere ADR).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Sitemap generado en el build con `hreflang`.
- `robots.txt` que excluya páginas de agradecimiento y apunte al sitemap.

## Fuera de alcance
- —

## Tareas
- [ ] Registrar ADR de la integración.
- [ ] Configurar y verificar la salida.
- [ ] Incluir `/es/privacidad` y `/en/privacy` en el sitemap con `hreflang` recíprocos (ADR-035).

## Archivos previstos (crear / modificar)
- Modificar: `astro.config.mjs`; crear `public/robots.txt`.

## Criterios de aceptación (verificables)
- [ ] El sitemap lista 22 URLs indexables (11 × 2: 13 páginas menos agradecimiento y 404; sin Eventos, ADR-077) con alternativas recíprocas y excluye agradecimiento y 404 (ADR-035).
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.
- [ ] El sitemap incluye `/es/privacidad` y `/en/privacy` con `hreflang` recíprocos. Si en E155-I01 Felipe decide `noindex`, se excluyen y el total baja a 22 (ADR-035).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/sitemap*.xml`.

## Riesgos y notas
- **Muestra de tokens (AT-056, ADR-091, 12-11-2026):** `/es/muestra-diseno/` y `/en/design-sample/` son rutas internas `noindex, nofollow` que se retiran en E190-I03. Mientras existan, el sitemap no las lista (ADR-042); si se usa una integración que lista las páginas generadas, hay que filtrarlas, igual que las 404 y agradecimiento (AT-106).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
