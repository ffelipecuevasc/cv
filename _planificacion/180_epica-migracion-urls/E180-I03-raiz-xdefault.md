# E180-I03 · Comportamiento de / y x-default
- **Estado:** [ ] Pendiente
- **Épica:** E180 · Migración de URLs y SEO · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E180-I01 · **Hallazgos que cierra:** AT-006 · **ADR relacionados:** ADR-019

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Implementar la redirección 301 de `/` a `/es/` y verificar `x-default`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-019.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Regla de redirección de `/` y verificación de `x-default` en todas las páginas.

## Fuera de alcance
- —

## Tareas
- [ ] Agregar la regla.
- [ ] Verificar en la preview.

## Archivos previstos (crear / modificar)
- Modificar: `public/_redirects`.

## Criterios de aceptación (verificables)
- [ ] `/` responde 301 a `/es/`.
- [ ] Todas las páginas declaran `x-default` hacia su versión `/es/`.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Comprobación de estado HTTP en la preview.

## Riesgos y notas
- **Debe incluir AT-132 (nota del 15-11-2026, dicho por el desarrollador):** Felipe agrega `/sitemap.xml /sitemap-index.xml 301` a `public/_redirects` en esta iteración (junto con la regla de `/`); `scripts/check-redirects.mjs` pasa de 23 a 24 reglas esperadas (25 con `/`, si se suma aquí) y su informe se ajusta. El agente no edita `_redirects`.
- **AT-130:** decidir aquí si el sitemap suma `x-default` y `/` (hoy no los tiene; con `@astrojs/sitemap` exigiría un enlace en el `serialize` de `astro.config.mjs`, ADR-095).
- El sitemap es `sitemap-index.xml` + `sitemap-0.xml` con `@astrojs/sitemap` 3.7.5 (ADR-095 y ADR-096).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
