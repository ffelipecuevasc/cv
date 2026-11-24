# E190 · Despliegue y cutover
- **Prioridad de la épica:** P0 · **Estado:** [~] En curso, **pendiente de decisión de Felipe** (cutover ejecutado el 15-11-2026, ADR-104; `docs/` retirado y línea base nueva en `00_producto/linea-base/`, ADR-105; E190-I04 terminada el 24-11-2026 con 9a y 9b hechos, ADR-106). Las 4 iteraciones están terminadas, pero la épica **no se marca cerrada**: dos criterios de aceptación siguen sin marcar (ver más abajo) y quedan abiertos AT-131, AT-100 (pospuesto a E200-I01) y BL-10.

## Objetivo
Planificar y verificar el paso del sitio nuevo a producción. El merge a `main` y los cambios en Cloudflare los ejecuta Felipe.

## Alcance
- Checklist de precondiciones.
- Plan de cambio de despliegue y de reversa.
- README final y retiro de archivos antiguos.
- Verificación posterior.

## Páginas cubiertas
Todas.

## Dependencias
E170 y E180.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E190-I01](E190-I01-precondiciones.md) | Checklist de precondiciones y ensayo en preview | P0 | S | E170-I04, E180-I03 | [x] Terminada |
| [E190-I02](E190-I02-plan-despliegue-reversa.md) | Plan de cambio de despliegue y plan de reversa | P0 | M | E190-I01 | [x] Terminada |
| [E190-I03](E190-I03-readme-final-retiro.md) | README final y retiro de archivos del sitio antiguo | P0 | S | E190-I02 | [x] Terminada |
| [E190-I04](E190-I04-verificacion-post-cutover.md) | Verificación posterior al cutover | P0 | S | E190-I03 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] Felipe dispone de un procedimiento escrito, ensayado en preview, con reversa en minutos. (Ejecutado en producción sin ensayo con subdominio, por decisión de Felipe; la reversa no se usó.)
- [x] Tras el cutover, las URLs antiguas redirigen y el formulario funciona. (483/483 en `https://felipecuevas.dev`; envío real OK, 16-11-2026.)
- [ ] Privacidad: política publicada y consentimiento registrado por el formulario; la validación del especialista pasa a BL-08 (ADR-099). *(24-11-2026: política publicada y correo con consentimiento recibido, dicho por Felipe; BL-08 sigue abierto. Si basta con eso o falta la validación del especialista lo decide Felipe; el agente no lo asume.)*
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global. *(24-11-2026: 4 de 4 terminadas; E190-I04 con AT-131 abierto y el foro sin comprobar. Lo marca Felipe al cerrar la épica.)*

## Riesgos
- Contenido publicado en `main` durante la migración que no se portó.
- Secretos no configurados en la plataforma nueva.

> Nota (15-11-2026, preparación de la ventana): P2 (Ley 21.719) cerrada por decisión de Felipe (ADR-103); P4 hecha y paso 2 hecho por adelantado; P6 verificada. Detalle en `99_bitacora/2026-11-15_E190-preventana.md`. El procedimiento vigente es [`E190-I02-procedimiento-cutover.md`](E190-I02-procedimiento-cutover.md) (AT-142). Registro de ejecución al final de ese archivo; ventana adelantada por ADR-104.
