# E180-I03 · Comportamiento de / y x-default
- **Estado:** [x] Terminada (15-11-2026)
- **Épica:** E180 · Migración de URLs y SEO · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E180-I01 · **Hallazgos que cierra:** AT-006 (parte de `/`), AT-130, AT-132 y AT-135 · **ADR relacionados:** ADR-019, ADR-098, ADR-097

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Implementar la redirección 301 de `/` a `/es/` y verificar `x-default`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-019 (`/` 301 a `/es/`; `x-default` hacia `/es/`), ADR-093, ADR-095, ADR-097 y ADR-098.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Regla de redirección de `/` y verificación de `x-default` en todas las páginas.
- Ampliado el 15-11-2026 por Felipe: regla de `/sitemap.xml` (AT-132), `x-default` en el sitemap (AT-130, opción B) y `minimumReleaseAge` declarado (AT-135).

## Fuera de alcance
- Enviar el sitemap a Search Console y verificar en producción (AT-131, E190).

## Tareas
- [x] Agregar la regla. **Dicho por el desarrollador:** Felipe pegó `/ /es/ 301` y `/sitemap.xml /sitemap-index.xml 301` en `public/_redirects` (commit `c0b2743`, ADR-033); el agente no edita ese archivo.
- [x] Verificar en la preview. **Verificado** el 15-11-2026 (ver bitácora).
- [x] `scripts/check-redirects.mjs` al conjunto exacto de 25 reglas, probado con 9 casos rotos. **Verificado.**
- [x] `x-default` en el sitemap hacia `/es/` (opción B, decidida por Felipe) y control en `verify:seo`. **Verificado.**
- [x] AT-135: `minimumReleaseAge: 1440` declarado (ADR-097). **Verificado.**

## Archivos previstos (crear / modificar)
- Modificar: `public/_redirects` (Felipe); `scripts/check-redirects.mjs`, `scripts/verify-seo.mjs`, `astro.config.mjs` y `pnpm-workspace.yaml` (agente).

## Criterios de aceptación (verificables)
- [x] `/` responde 301 a `/es/`. **Verificado** en la preview: 301 con `Location: /es/`, y `/es/` responde 200 en un solo salto, aunque exista `index.html`.
- [x] Todas las páginas declaran `x-default` hacia su versión `/es/`. **Verificado** con `verify:seo` (26 páginas) y, además, el sitemap lo declara para las 22 URL (66 enlaces).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. **Verificado:** build, check, lint, format:check, verify:seo, verify, check:i18n y check:redirects en verde.
- [x] `/sitemap.xml` responde 301 a `/sitemap-index.xml` (200), sin cadenas. **Verificado** en la preview.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Comprobación de estado HTTP en la preview: `pnpm check:redirects --base https://felipecuevas-dev.felipe-cuevas.workers.dev` (480 de 480).

## Riesgos y notas
- **Pendiente tras el despliegue (no verificado):** el sitemap con `x-default` (66 enlaces) existe en el `dist/` local; la preview lo refleja al desplegar este cambio.
- AT-131 sigue abierto solo por el envío a Search Console. AT-136 (charset de `robots.txt`) pasa a E190-I01.
- E180 termina en esta iteración: **no existe E180-I04**. Lo que sigue es E190-I01; el traspaso lo hace Felipe en el chat.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md (AT-136) y decisiones nuevas en decisiones.md (ADR-097 y ADR-098)
- [x] Escribir la bitácora en 99_bitacora/ (`2026-11-15_E180-I03.md`)
- [x] Sugerir mensaje de commit (máx. 200 caracteres)