# E190-I02 · Plan de cambio de despliegue y plan de reversa
- **Estado:** [ ] Pendiente
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E190-I01 · **Hallazgos que cierra:** AT-042, AT-048, AT-121, AT-122 (decide además sobre Observability, AT-123) · **ADR relacionados:** ADR resultante de D-14

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Escribir el procedimiento paso a paso para que Felipe haga el merge y cambie el despliegue de producción, y el procedimiento de reversa.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Depende del ADR que resolvió D-14 en E10-I09.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Orden de pasos, responsables, tiempos estimados, comprobaciones y reversa.

## Fuera de alcance
- Ejecutar cualquier paso (lo hace Felipe).

## Tareas
- [ ] Redactar el procedimiento.
- [ ] Decidir qué se hace con workers.dev tras el cutover (`workers_dev: false` o `noindex`), con su reversa; `wrangler.jsonc` lo edita solo Felipe (ADR-033) (AT-048).
- [ ] Decidir si se activa Web Analytics; si se activa, ADR y actualización de la política (AT-121).
- [ ] Decidir si se activa Observability del Worker (hoy desactivada; sin ella no hay registros para investigar excepciones, AT-123).
- [ ] HSTS en la zona con `max-age` corto al inicio y sin `preload` (AT-122).
- [ ] Incluir los pasos de ADR-037 (rama de producción a `main`, borrar el CNAME del apex, Custom Domain, `www` con 301) y la reversa que devuelve el dominio a Pages.
- [ ] Revisarlo con Felipe.

## Archivos previstos (crear / modificar)
- Crear: procedimiento en la carpeta de esta épica.

## Criterios de aceptación (verificables)
- [ ] La reversa devuelve producción al sitio anterior sin depender del agente.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Lectura conjunta con Felipe.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
