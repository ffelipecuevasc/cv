# E170-I04 · Enlaces rotos y paridad es/en automatizada
- **Estado:** [x] Terminada (13-11-2026)
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** — (registra AT-124 y AT-125) · **ADR relacionados:** ADR-001, ADR-035, ADR-037, ADR-047, ADR-077, ADR-090

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Automatizar la verificación de enlaces y de paridad entre idiomas como scripts de PNPM.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El sitio actual usaba linkinator con lista manual de páginas (`linkinator.config.json`).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Script de verificación de enlaces sobre `dist/`.
- Script que falla si una ruta existe en un idioma y no en el otro.

## Fuera de alcance
- —

## Tareas
- [x] Elegir herramienta con ADR si agrega dependencia. **Decisión de Felipe (13-11-2026, dicha por el desarrollador):** script propio sin dependencias y sin linkinator; al no agregar dependencia no hay ADR nuevo (complemento 12 de ADR-090).
- [x] Agregar scripts `pnpm verify` y `pnpm check:i18n`. (**Verificado:** `package.json`; `scripts/verify-links.mjs`, `scripts/check-i18n.mjs` y `scripts/lib/dist-html.mjs`.)
- [x] Incluir en la verificación de enlaces y paridad las 26 páginas (13 × 2, sin Eventos por ADR-077), con el par `/es/privacidad/` ↔ `/en/privacy/` (ADR-035). (**Verificado:** `check:i18n` cruza los 13 pares del mapa más la 404 con `dist/`; `verify` revisa los 30 `.html`, incluidas la 404 y la redirección de la raíz.)

## Archivos previstos (crear / modificar)
- Modificar: `package.json` (dos scripts). Crear: `scripts/verify-links.mjs`, `scripts/check-i18n.mjs` y `scripts/lib/dist-html.mjs` (lectura común del HTML). No hay archivo de configuración: no hay herramienta externa.

## Criterios de aceptación (verificables)
- [x] Ambos scripts pasan en limpio y fallan ante un caso de prueba roto. (**Verificado:** en limpio, 0 roturas y 354 comprobaciones de paridad; con `DIST_DIR` sobre copias alteradas de `dist/` fallan ancla inexistente, archivo inexistente, ruta sin barra final, imagen inexistente, par `en/privacy/` ausente, hreflang erróneo, `h2` de menos y página `es/solo-es/` sin par.)
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. (**Verificado:** `pnpm build`, `check`, `lint`, `format:check`, `verify`, `check:i18n` y `verify:seo` 970/970 sin errores; sin dependencias nuevas; `dist/` sin cambios.)

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm verify`
- `pnpm check:i18n`

## Riesgos y notas
- **Decisión de herramienta (Felipe, 13-11-2026, dicha por el desarrollador):** script propio sin dependencias y sin linkinator; sin ADR nuevo.
- **Alcance de los scripts (verificado):** `verify` revisa `href`, `src`, `srcset`, `action`, `poster`, `canonical`, `hreflang`, `og:image`, `og:url` y `meta refresh`; exige barra final y ausencia de `.html` (ADR-047, AT-005) y comprueba cada ancla `#id`. Trata como destinos válidos las URL virtuales de la 404 (`/404/`, `/es/404/`, `/en/404/`, que Cloudflare sirve con `404.html`, ADR-088) y `/api/*`, que atiende el Worker (ADR-084). Los enlaces externos no se consultan por red (AT-124). `check:i18n` lee el mapa de rutas como texto (AT-125).
- **Roturas reales encontradas en el sitio: ninguna.** Las 29 fallas de la primera corrida eran del script (la 404 virtual, `/api/contacto` y los anclas internos de las 404), y se corrigieron en `scripts/`; no se tocó código fuera de `scripts/`.
- Línea base del `dist/`, sin cambios: 208 archivos, 30 `.html`, `3c6a9b657f0d281e`; `verify:seo` 970.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
