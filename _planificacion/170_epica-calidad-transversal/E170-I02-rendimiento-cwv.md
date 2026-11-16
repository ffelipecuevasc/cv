# E170-I02 · Rendimiento y Core Web Vitals
- **Estado:** [x] Terminada
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** AT-013, AT-015, AT-032, AT-033 · **ADR relacionados:** ADR-015

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Medir el sitio nuevo frente a la línea base y a los umbrales de ADR-015, y cerrar un presupuesto de peso de imágenes.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Línea base: rendimiento móvil 53–58 y escritorio 72–98 (12-08-2026).
- ADR-015: los informes de rendimiento de Cloudflare se revisan a fines de octubre de 2026 (BL-01); si ya existen, se incorporan como línea base de campo.
- AT-032: imagen OG PNG de 350 KB; AT-033: `python_institute.png` sin referencia.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Lighthouse en móvil y escritorio para las 26 páginas (13 × 2, sin Eventos por ADR-077, incluida la política de privacidad).
- Presupuesto de imágenes y fuentes.
- Imagen OG por idioma optimizada.

## Fuera de alcance
- —

## Tareas
- [x] Medir y comparar con la línea base.
- [x] Optimizar lo que no cumpla.
- [x] No migrar recursos huérfanos.

## Archivos previstos (crear / modificar)
- Modificar: recursos e imágenes.

## Criterios de aceptación (verificables)
- [x] LCP ≤ 2,5 s, CLS ≤ 0,1 y TBT razonable en laboratorio; ninguna página con rendimiento inferior a su línea base.
- [x] Imagen OG ≤ 200 KB.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Lighthouse móvil y escritorio sobre `pnpm preview` y sobre la URL de preview.

## Riesgos y notas
- Los valores de laboratorio no reemplazan datos de campo.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

## Resultado (13-11-2026)
- **Mediciones (26 URL × móvil y escritorio = 52 corridas, dos veces):** Lighthouse 13.6 sobre el `dist/` servido en local con brotli, y PageSpeed Insights sobre la preview de Cloudflare con `scripts/psi.mjs --category performance`. La preview sirve el mismo HTML que el build local (`/es/` con el mismo sha256 que `dist/es/index.html`).
- **Local:** rendimiento mínimo **99**; LCP máximo **1,69 s**; CLS máximo **0,0002**; TBT **0 ms**.
- **Preview (PSI):** rendimiento mínimo **98** en móvil y **100** en escritorio, con una sola excepción (`/en/` escritorio: 93 y CLS 0,158 en una corrida; cuatro repeticiones dieron 100 y CLS ≤ 0,0004, AT-117); LCP máximo **1,35 s**; TBT máximo **10 ms**.
- **Frente a la línea base de agosto** (`main:docs/linea-base/2026-08-12/resumen-lighthouse.md`: móvil 53–58, escritorio 72–98): ninguna página queda por debajo. Las que no tenían línea base (Foro, Privacidad, 404 y las de `/en/`) se comparan con su par en español o con el mínimo de la tabla.
- **Presupuesto de peso:** imágenes de `_astro/` de hasta 150 KB (la mayor mide 100,7 KB, la imagen OG), fuentes de hasta 120 KB en total (3 archivos `woff2`, 83,6 KB) e imagen OG de hasta 200 KB por idioma, comprobados por `verify:seo` (+4 controles, 966).
- **AT-032:** la imagen OG ya era un solo JPG de 100,7 KB sin texto dependiente del idioma (nombre y credenciales), con el texto alternativo por idioma; no hay nada que localizar. **AT-033:** `python_institute.png` no existe en `src/` ni en `dist/`; solo sigue en `static/` del sitio antiguo, que se retira en E190-I03.
- **Sin cambios en el `dist/`:** 207 archivos, 30 `.html`, `6d6e25a0e8865015`, igual que la línea base de E170-I05. Se cambiaron solo `scripts/verify-seo.mjs` y `scripts/psi.mjs`.