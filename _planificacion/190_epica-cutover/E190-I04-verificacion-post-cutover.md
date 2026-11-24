# E190-I04 · Verificación posterior al cutover
- **Estado:** [~] En curso (23-11-2026). Hecho: comprobaciones del cutover, línea base de rendimiento y, el 23-11-2026, el bloque de `wrangler.jsonc` y las guías de verificación y de panel (ADR-106). Pendiente de Felipe: paso 9a y 9b (HSTS y rama `config-workers-dev-off`), Search Console (AT-131) y foro a ojo. **AT-100 pospuesto** hasta la decisión de Turnstile en E200-I01 (AT-147). Lo cierra Felipe al confirmar 9a y 9b.
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E190-I03 · **Hallazgos que cierra:** AT-131 y AT-048 (con el paso 9b); AT-100 pospuesto a E200-I01 (ADR-106) · **ADR relacionados:** ADR-015, ADR-101, ADR-106

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
- [ ] (Felipe) Paso 9b: aplicar el bloque de `wrangler.jsonc` de más abajo en la rama corta `config-workers-dev-off`, mergear y verificar (sección «Paso 9 · 23-11-2026»).
- [ ] (Felipe) Paso 9a: HSTS de 1 mes en el panel (sección «Paso 9 · 23-11-2026»).
- [ ] **POSPUESTO** (Felipe, 23-11-2026, ADR-106): quitar el hostname de workers.dev de Turnstile (AT-100). Se decide en E200-I01 junto con las preview URL por rama (AT-147); hasta entonces el widget conserva `workers.dev`.

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

## Paso 9 · 23-11-2026 (guía para Felipe; el agente no toca Cloudflare ni `wrangler.jsonc`, ADR-033)
**Gate del 23-11-2026 (solo lectura):** `git -c http.sslBackend=schannel fetch --all --prune` salió con código 0 y `main` = `origin/main` = `fe69d42`; `fe69d42` es ancestro de `main` y `git log f7d2a9e..fe69d42` lista los 3 commits de cierre (`1448778`, `2dc2e1a` y `fe69d42`); no existe la rama `ajustes-visuales` ni local ni en las ramas remotas sincronizadas (existe `cierre-cutover-e190`, ya contenida en `main`). Rama de trabajo del agente: `config-workers-dev-off`, creada desde `main` con autorización de Felipe (sin push).

### a) Rama
`config-workers-dev-off`, corta, desde `main` actualizado. Hoy contiene solo los documentos de esta iteración; Felipe agrega el cambio de `wrangler.jsonc` y hace commit, push y merge.

### b) Bloque de `wrangler.jsonc` (reemplaza el archivo completo)
Cambios respecto del archivo actual: la línea 4 (el comentario de cabecera decía «hasta el cutover (E190-I02) solo responde en workers.dev», que ya no es cierto) pasa a dos líneas; `"workers_dev": true` pasa a `false`; y se **elimina** `"preview_urls": false` sin sustituirlo (queda sin declarar y hereda `false`; ver ADR-106). No se agrega `observability` (ADR-101).

```jsonc
// Worker de felipecuevas.dev con assets estáticos (ADR-037) y función de contacto (ADR-084).
// "main" solo atiende /api/* (run_worker_first); el resto lo sirven los assets de dist/.
// El binding ASSETS permite al Worker devolver los assets fuera de /api/* (ADR-085).
// Sin rutas en este archivo: felipecuevas.dev es un Custom Domain del panel de Cloudflare (cutover
// del 15-11-2026, ADR-104). workers.dev apagado (ADR-101); preview_urls sin declarar (hereda false).
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "felipecuevas-dev",
  "main": "./src/worker/index.ts",
  "compatibility_date": "2026-10-23",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "404-page",
    "run_worker_first": ["/api/*"],
  },
  "workers_dev": false,
}
```
- **Herencia de `preview_urls`:** el esquema de Wrangler 4.153.0 da `false` por defecto (`node_modules/wrangler/config-schema.json:73-77`) y E200-I01 cita la documentación oficial, según la cual toma el valor de `workers_dev` (no contrastado hoy en vivo). Con `workers_dev: false` ambas lecturas dan `false`.
- **Reversa:** `"workers_dev": true` (y, si se quiere, volver a declarar `"preview_urls": false`) por la misma vía: rama corta, merge y despliegue.
- **E200-I01** solo deberá agregar `"preview_urls": true` a este archivo (AT-147).
- **Riesgo no verificado:** que un despliegue con `workers_dev: false` y sin `routes` en el archivo respete el Custom Domain creado en el panel (el procedimiento solo documenta que workers.dev depende del archivo, no qué hace Wrangler con los dominios del panel). La comprobación 4 de abajo lo cubre.

### c) Verificación tras el merge (Felipe ejecuta; el agente puede repetir las comprobaciones de línea de comandos)
1. **Primer push a `main` como disparador (nunca probado, ADR-104):** Worker `felipecuevas-dev` > Builds: debe aparecer un build iniciado por el push, con el hash del commit de merge. Si no aparece, «Retry build» como en el cutover y anotar que el disparador no funciona (hallazgo nuevo). Las ramas que no son producción no generan build (previews desactivados en el paso 4 del procedimiento; no verificado hoy).
2. **Versión nueva activa:** Deployments muestra una versión distinta de `5ae7e60e`. Anotar su ID (sirve de reversa).
3. **Producción:** `curl -I https://felipecuevas.dev/es/` y `/en/` en 200; `/` en 301 a `/es/`; `/x` en 404.
4. **Custom Domain intacto:** Domains & Routes sigue listando `felipecuevas.dev`; si desapareció, volver a agregarlo y registrar el hallazgo.
5. **workers.dev apagado:** `curl -I https://felipecuevas-dev.felipe-cuevas.workers.dev/es/` ya no devuelve el sitio en 200 (anotar el código real; no se asume cuál). Repetir pasados unos minutos por si hay propagación. Domains & Routes debería mostrar workers.dev deshabilitado (no verificado).
6. **Redirecciones:** `pnpm check:redirects --base https://felipecuevas.dev` sin fallos (483/483 el 16-11-2026).
7. **Formulario:** probar `/es/contacto/` en `felipecuevas.dev`: el widget de Turnstile carga y el envío real llega (el hostname `workers.dev` sigue en el widget; AT-100 pospuesto).
8. **Cierra AT-048** (workers.dev ya no sirve el sitio) cuando 5 se cumpla.

### d) Pasos de panel (Felipe)
- **HSTS (9a):** zona `felipecuevas.dev` > SSL/TLS > Edge Certificates > «HTTP Strict Transport Security (HSTS)» > Enable HSTS: Max-Age 1 mes, **Include subdomains: desactivado, Preload: desactivado, No-Sniff: desactivado** (ADR-101, AT-122). Comprobación: `curl -I https://felipecuevas.dev/es/` incluye `strict-transport-security: max-age=2592000` (valor exacto no verificado). El 16-11-2026 todavía no había cabecera; el estado de hoy no se verificó. HTTPS debe seguir activo mientras dure el `max-age`. La subida a 6 meses queda para después de 2 semanas sin incidentes (paso 10).
- **Search Console (AT-131):** en la propiedad de `felipecuevas.dev` > Sitemaps > «Agregar un sitemap nuevo» > `sitemap-index.xml` > Enviar. Se espera estado «Correcto» con 22 URL descubiertas (`sitemap-0.xml`). Si ya había un `sitemap.xml` enviado, puede mostrar error por la 301 de AT-132: se reemplaza por `sitemap-index.xml` (no verificado). AT-131 se cierra cuando Search Console confirme.

### e) AT-100
Pospuesto (ADR-106): no quitar `workers.dev` de Turnstile hasta la decisión de E200-I01 (AT-147).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
