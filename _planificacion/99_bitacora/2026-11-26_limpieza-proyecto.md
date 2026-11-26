# Bitácora · Limpieza del proyecto · Auditoría y retiro de restos

- **Iteración:** limpieza-proyecto (trabajo fuera de épica, pedido por Felipe)
- **Fecha:** 2026-11-26
- **Agente:** Claude Code · modelo: Sonnet 5.5
- **Rama:** `limpieza-proyecto`, creada desde `main` (`51e57d1`) con autorización explícita de Felipe (no es `main`)
- **Estado final:** Terminada (a falta de lo que solo puede hacer Felipe, en «Pendientes»)

## Resumen
Auditoría de limpieza en cuatro frentes (dependencias, MCP y herramientas de agentes, archivos obsoletos y ramas remotas) y retiro de lo que Felipe aprobó. **Ninguna de las 14 dependencias de `package.json` está sin uso**: no se ejecutó `pnpm remove`. El único código muerto era la utilidad `reveal.ts` (ADR-045), retirada con ADR-127. El único MCP del proyecto, `@playwright/mcp@0.0.85`, es de Microsoft y se conserva. El agente no hizo commit, push ni borró ramas.

## Archivos cambiados
| Acción | Ruta | Nota |
|---|---|---|
| Eliminar | `src/scripts/reveal.ts` | `git rm`; ningún módulo lo importaba y ningún marcado usaba `data-reveal` |
| Modificar | `src/styles/global.css` | se quitan `.reveal-ready [data-reveal]` y la regla de impresión `[data-reveal]` (tokens de movimiento intactos) |
| Modificar | `scripts/psi.mjs` | `DEFAULT_BASE` y su comentario pasan de workers.dev (apagado, ADR-106) a `https://felipecuevas.dev` |
| Modificar | `README.md` | «Preview por rama» refleja que `preview_urls` quedó apagado (ADR-124) |
| Modificar | `_planificacion/00_producto/decisiones.md` | ADR-127 |
| Crear | `_planificacion/99_bitacora/2026-11-26_limpieza-proyecto.md` | esta bitácora |
| Borrado local (ignorado por git) | `.playwright-mcp/*` (270 archivos, 33 MB) y `.wrangler/` (vacía) | regenerables; no entran al commit |

## Inventario de la auditoría
- **Dependencias:** las 14 se usan. `astro` y `@astrojs/sitemap` en `astro.config.mjs`; `tailwindcss` (`@import` en `global.css`) y `@tailwindcss/vite` (plugin); `wrangler` (esquema de `wrangler.jsonc` y Workers Builds, ADR-038); `@astrojs/check` y `typescript` (`pnpm check`, `tsconfig.json`); `eslint`, `@eslint/js`, `eslint-plugin-astro`, `typescript-eslint` y `globals` (`eslint.config.js`); `prettier` y `prettier-plugin-astro` (`.prettierrc.json`).
- **MCP y agentes:** solo `playwright` en `.mcp.json` (Microsoft, `microsoft/playwright-mcp`, Apache-2.0, depende de `playwright 1.66.0-alpha`; las herramientas que ejecutan código están en `ask`). Sin hooks, comandos, `.agent/`, `.gemini/` ni paquetes globales. Los conectores de claude.ai (Claude Docs, Google Drive) son de la cuenta, no del repo.
- **Se conservan con motivo:** `public/static/img/felipe_cuevas_cv.png` (AT-096, `og:image` del sitio antiguo), `src/assets/fonts/OFL-*.txt` (licencias), `_planificacion/20_epica-sistema-diseno/prototipos/*.html` (citados por `DESIGN.md` y ADR-039), los 3 pares de imágenes idénticas (todos referenciados; Astro los une por hash en `dist/`) y las entradas de `.gitignore` y `.prettierignore`.
- **Ramas remotas:** 21 además de `main`; 20 mergeadas y `api-rest-email` no (2 commits sobre `functions/api/contacto.js`, superados por `src/worker/contact.ts:184`, que ya envía `reply_to`). El `git fetch` falló con `SSL certificate problem` en esta máquina: los datos salen de las referencias locales (`origin/main` = `51e57d1`).

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| `pnpm build` | ok (29 páginas) |
| `pnpm check` | ok (0 errores, 0 advertencias, 0 sugerencias) |
| `pnpm lint` | ok |
| `pnpm format:check` | ok |
| `pnpm verify` | ok (enlaces internos sin roturas) |
| `pnpm verify:seo` | ok (1276 de 1276) |
| `pnpm check:i18n` | ok (355 comprobaciones; es 14 · en 14) |
| `pnpm check:redirects` | ok (331 de 331, sin red) |
| Paridad `es-CL` / `en-US` | ok; no se tocó contenido |
| Accesibilidad | sin cambios de marcado ni de estilos visibles |
| Core Web Vitals frente a ADR-015 | sin cambios: solo se quitó CSS sin uso |
| Criterios de aceptación | cumplidos |

## Decisiones tomadas (ADR)
- ADR-127 · Se retira la utilidad de aparición al hacer scroll `reveal.ts` (sustituye en parte a ADR-045) · Aceptada.

## Hallazgos (AT)
- Nuevos: ninguno.
- Resueltos: ninguno.

## Pendientes
Lo siguiente solo lo puede hacer Felipe (ADR-026, ADR-033).

1. **`DESIGN.md` línea 399** (sección 8). Cambiar
   `No se usa AOS (E20-I04). Si otra página necesita aparición al hacer scroll, usa la utilidad de E20-I04, que nunca deja contenido invisible.`
   por
   `No se usa AOS (E20-I04). La utilidad de aparición al hacer scroll se retiró (ADR-127): si una página la necesita, se define con un ADR nuevo.`
2. **`.claude/settings.local.json`** (ignorado por git). Dejarlo así: quita una ruta del sitio antiguo, `python -c` abierto y un `allow` de `browser_run_code_unsafe` que contradice el `ask` de ADR-109.
   ```json
   { "permissions": { "allow": [] } }
   ```
3. **Ramas remotas.** Antes: `git fetch --prune`. En el panel de Cloudflare, confirmar que la rama de producción del Worker es `main` (por `migracion-astro`).
   - 19 ramas seguras (mergeadas):
     ```
     git push origin --delete ajuste-nav-recursos cierre-cutover-e190 config-preview-urls-e200 config-previews config-workers-dev-off e190-i04-cierre e200-i00-renumeracion e200-i01-preparacion etapa-1-foro etapa-2-eventos etapa-3-navegacion etapa-4-hilo-taller etapa-5-relatoria etapa-6-portafolio fase0/0.2-doble-carga-css formulario-contacto foro-discord migracion-astro tecnologias-completo
     ```
   - `ajustes-visuales` (mergeada; rama larga de E200): `git push origin --delete ajustes-visuales` y, en local, `git branch -d ajustes-visuales`.
   - `api-rest-email` (no mergeada, superada por el Worker). Opcional, archivarla antes: `git tag archivo/api-rest-email origin/api-rest-email && git push origin archivo/api-rest-email`. Luego: `git push origin --delete api-rest-email`.
4. **Fuera del alcance de esta limpieza, y no se toca:** `public/static/CV_Felipe_Cuevas_2026.pdf` y `public/static/Certificado_REUF_Aprobados_Felipe_Cuevas_2026.pdf` aparecen modificados en el árbol de trabajo (los dejó ahí algo ajeno a esta rama). Revísalos y déjalos fuera del commit de limpieza si no son intencionales.
5. **Seguimiento sugerido (no urgente):** `@playwright/mcp` 0.0.86 está disponible; subir exige revisar `minimumReleaseAge` y actualizar `.mcp.json`, `AGENTS.md` y ADR-109.

## Mensaje de commit sugerido
```
Limpieza: retira reveal.ts y sus reglas CSS (ADR-127), corrige psi.mjs y README tras apagar preview_urls; auditoría sin dependencias sobrantes, 8 comandos ok.
```
