# Bitácora · E190 · Cierre documental del cutover y E190-I04

- **Iteración:** E190 (registro de los pasos 1 a 8 del cutover) y E190-I04 · Verificación posterior al cutover
- **Fecha:** 2026-11-16
- **Agente:** Claude Code · modelo: Sonnet 5.5
- **Rama:** `cierre-cutover-e190` (no es `main`), desde `main` en `d58393c`
- **Estado final:** cierre documental terminado. **E190-I04 queda `[~] En curso`** a la espera de los pasos 9 y 10 de Felipe. Contador: 63 de 64.

## Resumen
Gate: árbol limpio, `pnpm build`, `pnpm lint` y `pnpm check` en verde (`check` falló al principio por un `node_modules` dañado; con autorización de Felipe se reinstaló limpio con `pnpm install --frozen-lockfile`, sin tocar archivos versionados). Se registró el cutover que Felipe ejecutó el domingo 15-11-2026 ~23:30 CLT (ADR-104), se midió la línea base de producción con PageSpeed Insights y se actualizaron los documentos. Todo lo de Cloudflare es «dicho por Felipe»; el agente solo verificó lo que se señala como tal.

## Verificado por el agente (16-11-2026)
| Comprobación | Resultado |
|---|---|
| `pnpm check:redirects --base https://felipecuevas.dev` | 483 de 483 |
| `/` | 301 a `/es/` |
| `/es/`, `/en/` | 200 (un `curl` aislado a `/es/` dio 000 y no se repitió: 3 de 3 en 200) |
| `/x` | 404 |
| `/sitemap.xml` | 301 a `/sitemap-index.xml` |
| `/robots.txt` | 200 |
| `https://www.felipecuevas.dev/es/` | 301 a `https://felipecuevas.dev/es/` |
| HSTS | sin cabecera todavía (esperado: paso 9) |
| Tag `sitio-antiguo-2026-11` | existe en local y apunta a `b49a5bb`; **en origin no se pudo verificar** (`git ls-remote` falló por un error de certificado de esta máquina) |

## Dicho por Felipe y no verificado por el agente
Reversa (Pages `5d4464c8-8994-4e6c-bd13-652fc5dcc220`, Worker `74f92e49`, DNS exportado aparte); merge `d58393c`; Workers Builds sin build automático y «Retry build» con la versión `5ae7e60e`; apex quitado de Pages, CNAME borrado y Custom Domain en el Worker con un hueco de minutos (no medido); purga de caché; `www` con A `192.0.2.0` proxied y la regla de redirección ya existente; `www` ya no figura en Pages (motivo no verificado); formulario con rechazo sin casilla y envío OK (correo 00:33 CLT, política `2026-11-07`); Pages pausado sin deployment para `d58393c`; caché DNS negativa en su router (~1 h).

## Línea base de producción (E190-I04, PageSpeed Insights, una corrida por página y estrategia)
| Página | Estrategia | Puntaje | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|
| `/es/` | móvil | 99 | 1,68 s | 0 | 0 ms | 211 KB |
| `/es/` | escritorio | 100 | 0,47 s | 0,0004 | 0 ms | 203 KB |
| `/en/` | móvil | 99 | 1,68 s | 0 | 0 ms | 211 KB |
| `/en/` | escritorio | 100 | 0,47 s | 0,0004 | 0 ms | 203 KB |

Frente a I03 (preview: `/es/` 100 y 100, `/en/` 98 y 100) y a ADR-015: sin regresión; las diferencias de ±1 punto caen en el ruido de una sola corrida. Las dos portadas dieron métricas idénticas: es plausible, pero no se repitió la corrida. No se midieron las 26 URL. La primera ejecución falló en `/es/` (HTTP 400) porque Git Bash convirtió `/es/` en una ruta de Windows; se repitió con `MSYS_NO_PATHCONV=1`. Los JSON quedaron solo en el directorio temporal de la sesión.

## Archivos cambiados
| Acción | Ruta | Nota |
|---|---|---|
| Modificar | `README.md` | Tag `sitio-antiguo-2026-11` real (`b49a5bb`) y datos de la reversa de Pages |
| Modificar | `_planificacion/README.md` | Estado actual, rama, E190-I04 `[~]` |
| Modificar | `_planificacion/00_producto/registro-log.md` | Iteración actual, resumen (63 terminadas) y fila de E190-I04 |
| Modificar | `_planificacion/00_producto/decisiones.md` | ADR-104; nota en ADR-101 |
| Modificar | `_planificacion/00_producto/auditoria-tecnica.md` | AT-143 y AT-144 nuevos; AT-138, AT-139, AT-140 y AT-142 resueltos; avances en AT-100 y AT-131 |
| Modificar | `_planificacion/190_epica-cutover/E190-I02-procedimiento-cutover.md` | Pasos 1-8 «ejecutado», 9-10 «pendiente», registro de ejecución |
| Modificar | `_planificacion/190_epica-cutover/E190-I04-verificacion-post-cutover.md` | Estado `[~]`, tareas y línea base |
| Modificar | `_planificacion/190_epica-cutover/epica.md` | Estado `[~]`, criterios 1 y 2 y enlace al procedimiento |
| Crear | `_planificacion/99_bitacora/2026-11-16_E190-cierre-cutover.md` | Esta bitácora |

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| `pnpm build` | ok (27 páginas) |
| `pnpm check` | ok: 0 errores, 0 advertencias, 0 sugerencias (tras reinstalar `node_modules`) |
| `pnpm lint` | ok |
| Core Web Vitals frente a ADR-015 | sin regresión (tabla de arriba) |
| Criterios de aceptación de E190-I04 | pendientes: foro y descargas sin comprobar, HSTS, `workers_dev: false`, Search Console y AT-100 son de Felipe |

## Decisiones tomadas (ADR)
- ADR-104 · Ventana del cutover adelantada al domingo 15-11-2026 · Aceptada (decisión de Felipe).

## Hallazgos (AT)
- Nuevos: AT-143 (regla `www` preexistente no documentada) y AT-144 (caché DNS negativa en el router de Felipe).
- Resueltos: AT-138, AT-139, AT-140 y AT-142. AT-131 y AT-100 siguen abiertos (pendientes de Felipe).

## Frases desactualizadas en archivos que no edito (propuesta para Felipe)
- `AGENTS.md:27`: «todo el trabajo ocurre en la rama de migración `migracion-astro`…». Propuesta: «El trabajo posterior al cutover se hace en ramas cortas desde `main`; `migracion-astro` ya fue mergeada (E190, 15-11-2026). Nunca se trabaja directo en `main`.» Esto choca con la sección 4 («No trabajar sobre `main`») solo si se lee mal; conviene aclararlo.
- `AGENTS.md:29`: «Producción sigue en el proyecto Pages `felipe-cuevas-cv`, desde `main`, hasta el cutover de la épica E190.» Propuesta: «Producción: Worker `felipecuevas-dev` con Custom Domain `felipecuevas.dev`, desde `main` (cutover del 15-11-2026, ADR-104). El proyecto Pages `felipe-cuevas-cv` queda pausado como reversa y no se borra.» Además, «sirve la rama de migración en workers.dev (preview)» ya no es cierto.
- `AGENTS.md:36`: «a la fecha de esta versión: AT-142 y ADR-103». Propuesta: «AT-144 y ADR-104».
- `DESIGN.md`: ninguna frase sobre producción, Pages ni el cutover.
- `README.md` de la raíz: ninguna frase decía «producción en Pages»; se corrigió solo el tag y los datos de la reversa.

## Pendientes (de Felipe)
- Desde ~18-11-2026: HSTS de 1 mes y `"workers_dev": false` en una rama corta desde `main` (bloque en la sección 7 del procedimiento); eso además probará el push a `main` como disparador de Workers Builds.
- AT-131: enviar `sitemap-index.xml` a Search Console. AT-100: quitar workers.dev de Turnstile tras `workers_dev: false`.
- Revisar el foro (Giscus) a ojo y las descargas en producción. No borrar el proyecto Pages.
- Verificar el tag en origin (`git ls-remote --tags origin sitio-antiguo-2026-11`); desde esta máquina falló por certificado.
- Decidir qué hacer con `docs/` (ADR-102).
- Próximos números: ADR-105 y AT-145.

## Mensaje de commit sugerido
```
E190: cutover registrado (pasos 1-8, ADR-104, AT-143/144), línea base de producción con PSI en E190-I04 [~]; AT-138/139/140/142 resueltos
```
