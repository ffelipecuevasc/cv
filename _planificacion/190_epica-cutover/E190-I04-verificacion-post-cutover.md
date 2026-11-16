# E190-I04 · Verificación posterior al cutover
- **Estado:** [~] En curso (16-11-2026). Hecho: comprobaciones del cutover y línea base de rendimiento. Pendiente de Felipe: HSTS, `workers_dev: false`, Search Console (AT-131), AT-100 y foro a ojo.
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I03 · **Hallazgos que cierra:** AT-131, AT-100 · **ADR relacionados:** ADR-015

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Guiar la verificación en producción después de que Felipe ejecute el cutover.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Procedimiento de E190-I02.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Lista de comprobaciones en producción y seguimiento de indexación.

## Fuera de alcance
- —

## Tareas
- [~] Comprobar redirecciones, formulario, foro, descargas y sitemap en producción. Hecho: redirecciones 483/483, formulario real, sitemap y robots, `www` (agente y Felipe). **Sin comprobar:** foro (Giscus) y descargas en producción: el foro lo revisa Felipe a ojo; de las descargas, `check:redirects` solo cubre `/static/img/felipe_cuevas_cv.png` (200).
- [x] Registrar la línea base nueva de rendimiento (ADR-015). Ver «Línea base de producción (16-11-2026)» más abajo.
- [ ] (Felipe) Enviar `sitemap-index.xml` a Search Console y repetir las comprobaciones del sitemap en producción (AT-131).
- [ ] (Felipe, tras `workers_dev: false`) Quitar el hostname de workers.dev de Turnstile (AT-100).

## Archivos previstos (crear / modificar)
- Modificar: documentos de `_planificacion/`.

## Criterios de aceptación (verificables)
- [ ] Todas las comprobaciones pasan o hay un AT nuevo con plan.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Comprobaciones en `https://felipecuevas.dev`.

## Riesgos y notas
- Pendientes de Felipe (pasos 9 y 10 del procedimiento): desde ~18-11-2026 HSTS de 1 mes y `workers_dev: false` en una rama corta desde `main` (bloque de la sección 7); no borrar el proyecto Pages.
- `docs/` se retiró el 16-11-2026 (ADR-105): las líneas base viven en `_planificacion/00_producto/linea-base/`; la de noviembre (`2026-11-16/`) es la vigente y sustituye a la de agosto como referencia de ADR-015.

## Línea base de producción (16-11-2026)
Medida por el agente con `node scripts/psi.mjs --base https://felipecuevas.dev --category performance --only /es/,/en/` (PageSpeed Insights, laboratorio; una corrida por página y estrategia).

| Página | Estrategia | Puntaje | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|
| `/es/` | móvil | 99 | 1,68 s | 0 | 0 ms | 211 KB |
| `/es/` | escritorio | 100 | 0,47 s | 0,0004 | 0 ms | 203 KB |
| `/en/` | móvil | 99 | 1,68 s | 0 | 0 ms | 211 KB |
| `/en/` | escritorio | 100 | 0,47 s | 0,0004 | 0 ms | 203 KB |

- **Comparación con I03 (preview, 15-11-2026):** `/es/` 100 y 100, `/en/` 98 y 100. En producción `/es/` baja 1 punto en móvil y `/en/` sube 1; escritorio sin cambio. Diferencia dentro del ruido de una corrida de PSI: sin regresión real.
- **Frente a ADR-015:** LCP 1,68 s ≤ 2,5 s y CLS ≤ 0,0004 ≤ 0,1; puntaje sobre la línea base de agosto (portada 57 móvil y 97 escritorio). INP no se mide en laboratorio. Sin datos de campo (BL-01 sigue abierto).
- **Salvedad:** `/es/` y `/en/` dieron exactamente las mismas métricas; es plausible por su estructura idéntica, pero no se repitió la corrida para descartar un resultado repetido. Solo se midieron las dos portadas, no las 26 URL.
- **Qué es la línea base:** vigente desde el 16-11-2026, copiada a `_planificacion/00_producto/linea-base/2026-11-16/resumen-psi-produccion.md`; sustituye a la de agosto como referencia de ADR-015 (ADR-105). BL-01 (datos de campo de Cloudflare) sigue abierto.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
