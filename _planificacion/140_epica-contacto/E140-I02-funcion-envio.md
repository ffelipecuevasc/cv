# E140-I02 · Función de envío del formulario
- **Estado:** [ ] Pendiente
- **Épica:** E140 · Página Contacto (contacto.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E140-I01, E10-I09 · **Hallazgos que cierra:** AT-029 · **ADR relacionados:** ADR resultante de D-14, ADR-035

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Adaptar la función de envío a la plataforma decidida en E10-I09, con mensajes por idioma y redirección a la página de agradecimiento del idioma correcto.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `git show main:functions/api/contacto.js`: valida Turnstile y envía con la API de correo de Cloudflare usando variables `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY` y `CONTACTO_DESTINO`.
- Con Workers, la carpeta `functions/` se compila en un Worker o se reescribe.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Función adaptada, mensajes y correo en el idioma del formulario.
- Documentación de secretos que Felipe configura en el panel (sin valores).
- Validación del consentimiento en el servidor: la función rechaza el envío si el checkbox de la política no viene marcado (ADR-035).
- Registro del consentimiento como evidencia en el correo que recibe Felipe: fecha, hora y versión de la política aceptada. Sin base de datos ni dependencias nuevas (ADR-035).
- Constante única de versión de la política de privacidad, definida en un solo lugar del código; la usan el formulario (E140-I01), la función de envío y la página de E155-I01 (ADR-035).

## Fuera de alcance
- Cambiar el proveedor de correo.

## Tareas
- [ ] Adaptar la función.
- [ ] Probar en la preview con claves de prueba de Turnstile.
- [ ] Documentar la configuración manual.
- [ ] Validar el consentimiento en el servidor y responder con un error por idioma si falta (ADR-035).
- [ ] Agregar al correo la fecha y hora del consentimiento y la versión de la política (ADR-035).
- [ ] Definir la constante única de versión de la política, importable por el formulario y por E155-I01 (ADR-035).

## Archivos previstos (crear / modificar)
- Crear o modificar: función de contacto según ADR.

## Criterios de aceptación (verificables)
- [ ] Un envío en la preview llega al destinatario y redirige a la página de agradecimiento del idioma.
- [ ] Ningún secreto aparece en el repositorio.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.
- [ ] Un envío sin consentimiento (por ejemplo, una petición manual sin el campo) es rechazado por la función (ADR-035).
- [ ] El correo recibido incluye la fecha, la hora y la versión de la política aceptada (ADR-035).
- [ ] No se agregó ninguna dependencia ni base de datos (ADR-035).
- [ ] La versión de la política existe en una sola constante y el formulario y la función la importan desde ahí (ADR-035).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Envío de prueba en la preview (Felipe confirma recepción).

## Riesgos y notas
- No tocar la configuración de producción.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
