# E140-I02 · Función de envío del formulario
- **Estado:** [x] Terminada (06-11-2026, ADR-084; envío real en la preview pendiente de Felipe)
- **Épica:** E140 · Página Contacto (contacto.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E140-I01, E10-I09 · **Hallazgos que cierra:** AT-029 · **ADR relacionados:** ADR-037, ADR-035, ADR-083, ADR-084

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
- Importar la constante única de versión de la política, `PRIVACY_POLICY_VERSION`, desde `src/data/privacy-policy.ts` (la definió E140-I01, ADR-083); la función no la redefine y rechaza un `versionPolitica` distinto o ausente. El formulario ya envía `consentimiento`, `versionPolitica` e `idioma` (ADR-083).

## Fuera de alcance
- Cambiar el proveedor de correo.

## Tareas
- [x] Adaptar la función.
- [ ] Probar en la preview con claves de prueba de Turnstile. **Pendiente de Felipe** (bloque de `wrangler.jsonc`, secretos y hostname de Turnstile, AT-100); se probó en local con `fetch` simulado (20 casos).
- [x] Documentar la configuración manual.
- [x] Validar el consentimiento en el servidor y responder con un error por idioma si falta (ADR-035).
- [x] Agregar al correo la fecha y hora del consentimiento y la versión de la política (ADR-035).
- [x] Importar `PRIVACY_POLICY_VERSION` de `src/data/privacy-policy.ts` (definida en E140-I01, ADR-083); no definir otra.

## Archivos previstos (crear / modificar)
- Crear: `src/worker/index.ts` y `src/worker/contact.ts` (ADR-084). Modificar: `scripts/verify-seo.mjs` y `.gitignore`. `wrangler.jsonc` lo edita Felipe con el bloque de la bitácora.

## Criterios de aceptación (verificables)
- [ ] Un envío en la preview llega al destinatario y redirige a la página de agradecimiento del idioma. **Pendiente de Felipe**; la redirección da 404 hasta E150-I01 (AT-099, aceptado en ADR-084).
- [x] Ningún secreto aparece en el repositorio.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.
- [x] Un envío sin consentimiento (por ejemplo, una petición manual sin el campo) es rechazado por la función (ADR-035).
- [x] El correo recibido incluye la fecha, la hora y la versión de la política aceptada (ADR-035).
- [x] No se agregó ninguna dependencia ni base de datos (ADR-035).
- [x] La función importa `PRIVACY_POLICY_VERSION` de `src/data/privacy-policy.ts`; no hay otra definición en el código (ADR-083).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Envío de prueba en la preview (Felipe confirma recepción).

## Riesgos y notas
- No tocar la configuración de producción.
- La redirección a la página de agradecimiento da 404 hasta E150-I01 (AT-099).
- Campos que envía el formulario (JSON): `nombre`, `correo`, `asunto`, `mensaje`, `consentimiento` (booleano), `versionPolitica`, `idioma` y `turnstileToken`. Respuesta esperada: `{ ok: true }` o `{ ok: false, error: "<mensaje en el idioma>" }`; el formulario muestra `error` si viene.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
