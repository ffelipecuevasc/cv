# E180-I02 · Sitemap bilingüe, robots.txt y canónicas
- **Estado:** [ ] Pendiente
- **Épica:** E180 · Migración de URLs y SEO · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E180-I01 · **Hallazgos que cierra:** AT-030 · **ADR relacionados:** ADR-001

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

## Archivos previstos (crear / modificar)
- Modificar: `astro.config.mjs`; crear `public/robots.txt`.

## Criterios de aceptación (verificables)
- [ ] El sitemap lista 22 URLs indexables (11 × 2) con alternativas recíprocas y excluye agradecimiento y 404.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/sitemap*.xml`.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
