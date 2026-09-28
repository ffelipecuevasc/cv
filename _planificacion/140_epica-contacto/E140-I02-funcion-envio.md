# E140-I02 · Función de envío del formulario
- **Estado:** [ ] Pendiente
- **Épica:** E140 · Página Contacto (contacto.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E140-I01, E10-I09 · **Hallazgos que cierra:** AT-029 · **ADR relacionados:** ADR resultante de D-14

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

## Fuera de alcance
- Cambiar el proveedor de correo.

## Tareas
- [ ] Adaptar la función.
- [ ] Probar en la preview con claves de prueba de Turnstile.
- [ ] Documentar la configuración manual.

## Archivos previstos (crear / modificar)
- Crear o modificar: función de contacto según ADR.

## Criterios de aceptación (verificables)
- [ ] Un envío en la preview llega al destinatario y redirige a la página de agradecimiento del idioma.
- [ ] Ningún secreto aparece en el repositorio.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

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
