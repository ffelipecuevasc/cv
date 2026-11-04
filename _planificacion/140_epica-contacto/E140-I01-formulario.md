# E140-I01 · Página, formulario, Turnstile y Calendly
- **Estado:** [x] Terminada (03-11-2026, ADR-083)
- **Épica:** E140 · Página Contacto (contacto.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-024 · **ADR relacionados:** ADR-007, ADR-017, ADR-035, ADR-036

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página de contacto con el formulario accesible, Turnstile y el widget de Calendly cargado bajo demanda.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:contacto.html`, `static/js/contacto.js`; clave pública de Turnstile en `contacto.html:327`; Calendly en `:365`.
- AT-024: Calendly carga un widget de terceros al abrir la página.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.
- AT-047 y ADR-035: el formulario actual (`contacto.html:289-354`) no pide aceptar una política de privacidad. La Ley 21.719 entra en vigor el 1 de diciembre de 2026.

## Alcance
- Formulario con etiquetas, errores accesibles y mensajes por idioma.
- Calendly con carga diferida o por interacción.
- Enlaces de contacto directo.
- Checkbox obligatorio de aceptación de la política de privacidad, con enlace a `/es/privacidad` o `/en/privacy` según el idioma (la página se publica en E155-I01), en ambos idiomas (ADR-035).
- Botón de envío siempre activo: si se intenta enviar sin marcar el checkbox, se muestra un error accesible asociado al checkbox (`aria-describedby`) y el foco va al primer campo con error (ADR-035).
- El formulario envía el identificador de versión de la política, definido en esta iteración en `src/data/privacy-policy.ts` (ADR-083, sustituye en ese punto a ADR-035).

## Fuera de alcance
- Función de envío (E140-I02).

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036).
- [x] Construir la página y el formulario.
- [x] Configurar Turnstile por idioma.
- [x] Diferir Calendly.
- [x] Agregar el checkbox obligatorio con enlace a la política, con textos desde el diccionario en `es-CL` y `en-US` (ADR-035).
- [x] Implementar la validación en el cliente con el botón siempre activo, error asociado por `aria-describedby` y foco en el primer error (ADR-035).
- [x] Incluir en el envío el identificador de versión de la política (ADR-035).

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/contacto.astro`, `src/pages/en/contact.astro`, componentes.

## Criterios de aceptación (verificables)
- [x] El formulario es operable con teclado y anuncia errores.
- [x] Calendly no se descarga hasta que se necesita.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.
- [x] Sin marcar el checkbox, el envío no ocurre, el error se anuncia, está asociado al checkbox y el foco va al primer error; el botón nunca queda deshabilitado (ADR-035).
- [x] El checkbox enlaza a `/es/privacidad` o `/en/privacy` según el idioma (ADR-035).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Pestaña de red en `pnpm preview`.
- Recorrido con teclado.

## Riesgos y notas
- Composición A elegida por Felipe (ADR-083). Discord no se incluye (ADR-044): 4 canales.
- Enlaces a `/es/privacidad/` y `/en/privacy/` aceptados por `verify:seo` como excepción temporal hasta E155-I01.
- Tras un envío correcto se redirige a la página de agradecimiento, que llega en E150-I01 (AT-099). Sin color de error en el sistema (AT-098).
- Inglés por validar por Felipe (ADR-017).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
