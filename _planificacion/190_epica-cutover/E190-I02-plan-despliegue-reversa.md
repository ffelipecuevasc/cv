# E190-I02 · Plan de cambio de despliegue y plan de reversa
- **Estado:** [x] Terminada (15-11-2026; lectura conjunta confirmada por Felipe)
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E190-I01 · **Hallazgos que cierra:** AT-042, AT-048, AT-121, AT-122 (decide además sobre Observability, AT-123) · **ADR relacionados:** ADR-037, ADR-099, ADR-101 · **Hallazgos nuevos:** AT-138, AT-139, AT-140

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
- [x] Puerta: rama `migracion-astro`, E190-I01 `[x]`; I02 marcada `[~]` (15-11-2026).
- [x] Verificar en la documentación oficial (fuente y fecha, ver el procedimiento, sección 1): Custom Domain y CNAME del apex, `www`, rollback, rama de producción de Workers Builds, HSTS y workers.dev; declarar como riesgo lo no verificado (merge y Pages, AT-138).
- [x] Una ronda de preguntas a Felipe (workers.dev, Analytics, Observability, HSTS y orden) y registrar lo decidido en ADR-101.
- [x] Redactar `E190-I02-procedimiento-cutover.md`: precondiciones, ventana, pasos con responsable, tiempo, comprobación y reversa, y reversa sin el agente.
- [x] Decidir qué se hace con workers.dev: se apaga tras verificar, `workers_dev: false`, con reversa (AT-048, ADR-101). Bloque de `wrangler.jsonc` entregado en la sección 7 del procedimiento.
- [x] Decidir Web Analytics: no se activa (AT-121, ADR-101).
- [x] Decidir Observability: no se activa (AT-123, ADR-101).
- [x] HSTS en la zona: 1 mes, sin `includeSubDomains` ni preload (AT-122, ADR-101).
- [x] Incluir los pasos de ADR-037 y la reversa que devuelve el dominio a Pages (con la pausa de Pages previa al merge).
- [x] **Ley 21.719 (traspasada de E190-I01):** incluida como precondición P2 del procedimiento; **sigue pendiente de Felipe** (reconfirmar en fuente oficial y anotar con fecha, ADR-099).
- [x] Lectura conjunta del procedimiento con Felipe y su confirmación (15-11-2026, con tres ajustes: ver sección 9 del procedimiento y el complemento de ADR-101).

## Archivos previstos (crear / modificar)
- Crear: `190_epica-cutover/E190-I02-procedimiento-cutover.md`. Modificar: `decisiones.md` (ADR-101), `auditoria-tecnica.md` (AT-048, AT-121, AT-122, AT-123 y AT-138 a AT-140), documentos de estado y bitácora.

## Criterios de aceptación (verificables)
- [x] La reversa devuelve producción al sitio anterior sin depender del agente.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Lectura conjunta con Felipe.

## Riesgos y notas
- —

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
