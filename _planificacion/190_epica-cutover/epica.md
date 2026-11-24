# E190 · Despliegue y cutover
- **Prioridad de la épica:** P0 · **Estado:** [x] Terminada (24-11-2026, por decisión de Felipe; solo documentos). Cutover ejecutado el 15-11-2026 (ADR-104); `docs/` retirado y línea base nueva en `00_producto/linea-base/` (ADR-105); E190-I04 terminada el 24-11-2026 con 9a y 9b hechos (ADR-106). **Quedan abiertos fuera del cierre:** AT-131 (Felipe, 25 y 26-11-2026), AT-100 (pospuesto hasta la decisión de Turnstile en E200-I01), BL-08 (validación del especialista) y BL-10 (HSTS a 6 meses desde el 08-12-2026). Ver «Cierre de la épica (24-11-2026)».

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
- [x] Privacidad: política publicada y consentimiento registrado por el formulario; la validación del especialista pasa a BL-08 (ADR-099). *(24-11-2026, decisión de Felipe: basta la política publicada (ADR-099, ADR-103); el correo con la versión de la política llegó en los envíos reales del 16 y del 24-11-2026, dicho por Felipe, no verificado por el agente. La validación del especialista queda en BL-08, fuera del cierre.)*
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global. *(24-11-2026: 4 de 4 terminadas. **Salvedades:** AT-131 sigue abierto con plan (Felipe revisa Search Console el 25 y 26-11-2026); E190-I04 y este cierre son solo de documentos y `pnpm build`, `pnpm check` y `pnpm lint` no se repitieron (no verificado); el foro y las descargas los revisó Felipe a ojo en el sitio nuevo y todo funciona (dicho por Felipe, no comprobado por el agente).)*

## Cierre de la épica (24-11-2026)
Decisión de Felipe del 24-11-2026. Pendientes abiertos que **no bloquean** el cierre:

| Pendiente | Responsable | Fecha | Condición |
|---|---|---|---|
| AT-131 · `sitemap-index.xml` en Search Console | Felipe | Revisión el 25 y 26-11-2026 | Se cierra cuando Search Console lo lea «Correcto»; sin reenviar. Si sigue en error con el servidor en 200, hallazgo nuevo |
| AT-100 · quitar `workers.dev` de Turnstile | Felipe | Sin fecha | Pospuesto hasta la decisión de Turnstile en E200-I01 (ADR-106, AT-147) |
| BL-08 · validación de la política de privacidad por un especialista | Felipe | Antes de la entrada en vigencia real de la Ley 21.719 (sin fecha) | ADR-099 y ADR-103 |
| BL-10 · HSTS de 1 mes a 6 meses | Felipe | Desde el 08-12-2026 | 2 semanas sin incidentes desde el 24-11-2026; decisión de Felipe ese día |

- No borrar el proyecto Pages `felipe-cuevas-cv` (queda pausado como reversa; paso 10 del procedimiento). Sin fecha de borrado.
- Siguiente trabajo: E200 (carpeta `200_epica-ajustes-visuales/`), **aún sin registrar** (AT-146); su registro y la renumeración de sus ADR (desde ADR-107, reservado) los hace E200-I00.

## Riesgos
- Contenido publicado en `main` durante la migración que no se portó.
- Secretos no configurados en la plataforma nueva.

> Nota (15-11-2026, preparación de la ventana): P2 (Ley 21.719) cerrada por decisión de Felipe (ADR-103); P4 hecha y paso 2 hecho por adelantado; P6 verificada. Detalle en `99_bitacora/2026-11-15_E190-preventana.md`. El procedimiento vigente es [`E190-I02-procedimiento-cutover.md`](E190-I02-procedimiento-cutover.md) (AT-142). Registro de ejecución al final de ese archivo; ventana adelantada por ADR-104.
