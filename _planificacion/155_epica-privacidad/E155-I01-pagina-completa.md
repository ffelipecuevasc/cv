# E155-I01 · Página de política de privacidad
- **Estado:** [ ] Pendiente
- **Épica:** E155 · Página Política de privacidad · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E30-I06, E10-I09 · **Hallazgos que cierra:** AT-047 (en conjunto con E30-I06, E140-I01 y E140-I02) · **ADR relacionados:** ADR-017, ADR-020, ADR-023, ADR-035, ADR-036

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Construir la página de política de privacidad en ambos idiomas, con un texto breve que cubra todos los tratamientos del sitio y un identificador de versión que el formulario de contacto pueda reutilizar.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-047: el sitio actual no tiene política de privacidad y el formulario (`contacto.html:289-354`) no pide consentimiento.
- ADR-035: tratamientos que cubre la política: formulario de contacto, Turnstile, Calendly, Giscus (GitHub), progreso guardado en el navegador (E130, ADR-023) y preferencia de tema. La plataforma de despliegue sale de E10-I09 (P-01).
- ADR-036: la composición de la página se define y valida con Felipe al inicio de esta iteración.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Página bilingüe `/es/privacidad` y `/en/privacy` con un texto breve que cubra todos los tratamientos de ADR-035.
- Fecha de vigencia y versión de la política visibles en la página.
- Identificador de versión de la política en un solo lugar del código, reutilizable por el formulario (E140-I01) y la función de envío (E140-I02).
- Pregunta abierta para Felipe: si la página lleva la marca `noindex`. No se decide en esta planificación; si se marca, E180-I02 la excluye del sitemap.

## Fuera de alcance
- La redacción legal definitiva: la valida un especialista externo antes del cutover (BL-08). El texto de esta iteración no se presenta como asesoría legal.

## Tareas
- [ ] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036).
- [ ] Preguntar a Felipe si la página lleva `noindex` y registrar la respuesta.
- [ ] Redactar el texto breve en `es-CL` y la versión `en-US` (Felipe valida, ADR-017).
- [ ] Definir el identificador de versión y la fecha de vigencia, y exponerlos para E140.
- [ ] Construir la página en ambos idiomas.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/privacidad.astro`, `src/pages/en/privacy.astro`, contenido y constante de versión de la política.

## Criterios de aceptación (verificables)
- [ ] Ambas versiones existen con paridad de contenido y cubren todos los tratamientos de ADR-035.
- [ ] La fecha de vigencia y la versión son visibles en la página.
- [ ] El identificador de versión está definido en un solo lugar y se puede importar desde el formulario.
- [ ] El pie de todas las páginas enlaza a la política del idioma activo.
- [ ] La página no se presenta como asesoría legal.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/es/privacidad/` y `dist/en/privacy/`.
- Revisión de Felipe del texto en ambos idiomas.

## Riesgos y notas
- Texto legal sin validar hasta que lo revise el especialista (BL-08).
- Si se agrega un servicio de terceros nuevo, actualizar la política y su versión.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
