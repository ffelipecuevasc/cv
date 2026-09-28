# E190 · Despliegue y cutover
- **Prioridad de la épica:** P0 · **Estado:** [ ] Pendiente

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
| [E190-I01](E190-I01-precondiciones.md) | Checklist de precondiciones y ensayo en preview | P0 | S | E170-I04, E180-I03 | [ ] Pendiente |
| [E190-I02](E190-I02-plan-despliegue-reversa.md) | Plan de cambio de despliegue y plan de reversa | P0 | M | E190-I01 | [ ] Pendiente |
| [E190-I03](E190-I03-readme-final-retiro.md) | README final y retiro de archivos del sitio antiguo | P0 | S | E190-I02 | [ ] Pendiente |
| [E190-I04](E190-I04-verificacion-post-cutover.md) | Verificación posterior al cutover | P0 | S | E190-I03 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] Felipe dispone de un procedimiento escrito, ensayado en preview, con reversa en minutos.
- [ ] Tras el cutover, las URLs antiguas redirigen y el formulario funciona.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Contenido publicado en `main` durante la migración que no se portó.
- Secretos no configurados en la plataforma nueva.
