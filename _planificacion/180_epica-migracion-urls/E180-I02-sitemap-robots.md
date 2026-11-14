# E180-I02 · Sitemap bilingüe, robots.txt y canónicas
- **Estado:** [x] Terminada (14-11-2026)
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
- [x] Registrar ADR de la integración. **Verificado:** ADR-094 (no hay integración: endpoint propio, sin dependencias).
- [x] Configurar y verificar la salida. **Verificado:** `src/pages/sitemap.xml.ts` y `public/robots.txt`; inspección de `dist/sitemap.xml` y 176 controles nuevos en `verify:seo` (1146 de 1146).
- [x] Incluir `/es/privacidad/` y `/en/privacy/` en el sitemap con `hreflang` recíprocos (ADR-035). **Verificado** en `dist/sitemap.xml` y en `verify:seo`.

## Archivos previstos (crear / modificar)
- Modificar: `astro.config.mjs`; crear `public/robots.txt`.

## Criterios de aceptación (verificables)
- [x] El sitemap lista 22 URLs indexables (11 × 2: 13 páginas menos agradecimiento y 404; sin Eventos, ADR-077) con alternativas recíprocas y excluye agradecimiento y 404 (ADR-035). **Verificado** (`verify:seo` compara el sitemap con las páginas del `dist/` sin `noindex`; 4 mutaciones lo hacen fallar).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. **Verificado:** build, check, lint, format:check, verify:seo, verify y check:i18n en verde. **No verificado:** el sitemap y `robots.txt` en la preview (aún no están commiteados) ni en producción.
- [x] El sitemap incluye `/es/privacidad` y `/en/privacy` con `hreflang` recíprocos. Si en E155-I01 Felipe decide `noindex`, se excluyen y el total baja a **20** (10 × 2) (ADR-035). *Corregido el 14-11-2026: decía 22.* **Verificado:** con la privacidad indexable (ADR-087) el sitemap lleva 22 URL.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/sitemap*.xml`.

## Riesgos y notas
- **Muestra de tokens (AT-056, ADR-091, 12-11-2026):** `/es/muestra-diseno/` y `/en/design-sample/` son rutas internas `noindex, nofollow` que se retiran en E190-I03. Mientras existan, el sitemap no las lista (ADR-042); si se usa una integración que lista las páginas generadas, hay que filtrarlas, igual que las 404 y agradecimiento (AT-106).

- **Corrección del tercer criterio (14-11-2026):** cuenta mal. Con la privacidad indexable (ADR-087, decisión vigente) el sitemap lleva **22 URL**; solo si Felipe decidiera `noindex` bajarían a **20** (10 × 2), no a 22. El primer criterio ya dice 22.

- **Resultado (14-11-2026):** sitemap generado por un endpoint propio (ADR-094), `robots.txt` sin `Disallow` (AT-103) y controles en `verify:seo`. Sin `x-default` ni `/` (E180-I03, AT-130). Las canónicas de las 11 páginas indexables se comprueban contra el sitemap; las de las 404 siguen en AT-109.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos (AT-130 y AT-131) en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/ (`2026-11-14_E180-I02.md`)
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
