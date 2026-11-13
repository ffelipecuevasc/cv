# E170-I03 · Cabeceras de seguridad
- **Estado:** [~] En curso (13-11-2026): el agente redactó y probó la CSP; faltan las pruebas de Felipe en la preview
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** AT-023, AT-024 · **ADR relacionados:** ADR nuevo (CSP), ADR-035

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Publicar un archivo `_headers` con CSP y cabeceras de seguridad compatibles con las integraciones del sitio.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-023: el sitio actual no tiene `_headers`.
- Terceros a permitir: Turnstile (`challenges.cloudflare.com`), Calendly, Giscus (`giscus.app`), enlaces externos.
- `_headers` funciona de forma nativa tanto en Pages como en Workers con assets estáticos.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- CSP, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`, cabeceras de caché para assets con hash.

## Fuera de alcance
- Configuración de zona en el panel (HSTS), que Felipe revisa.

## Tareas
- [ ] Redactar `_headers` en `public/`. (Redactado y probado en la bitácora `2026-11-13_E170-I03.md`; lo pega Felipe, ADR-033.)
- [ ] Probar en la preview con la consola del navegador sin violaciones de CSP.
- [ ] Verificar que la CSP no bloquee la página de privacidad ni el formulario de contacto (checkbox de consentimiento, Turnstile y envío) (ADR-035).

## Archivos previstos (crear / modificar)
- Crear: `public/_headers`.

## Criterios de aceptación (verificables)
- [ ] Sin violaciones de CSP en ninguna página, incluidos formulario, agenda y foro.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.
- [ ] La página de privacidad y el formulario con su checkbox de consentimiento funcionan sin violaciones de CSP (ADR-035).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Consola del navegador en la preview.
- Herramienta de revisión de cabeceras.

## Riesgos y notas
- Consultar antes de cambiar configuración de despliegue.
- Nota de E120-I01 (ADR-078): el foro inyecta `https://giscus.app/client.js` (`script-src`), que crea un iframe de `https://giscus.app` (`frame-src`) y recibe `postMessage` del sitio. El `<noscript>` del foro lleva un `<style>` en línea: considerar `style-src` o reemplazarlo.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

## Avance (13-11-2026)
- **ADR-092** (CSP estricta con hashes, sin `Report-Only`) aceptado por Felipe. El contenido completo de `public/_headers` está en la bitácora y lo pega Felipe.
- **`verify:seo`:** control de hashes (si existe `public/_headers`, o el archivo de `HEADERS_FILE`): cada hash coincide con un script en línea del `dist/` y no sobra ni falta ninguno, y `script-src` no lleva `unsafe-inline`. Sin `public/_headers` informa «pendiente» y no falla (966). Con el bloque de la bitácora: 970/970. Prueba de mutación: un byte de un script del `dist/` lo hace fallar.
- **Prueba local con Chromium** (el `dist/` servido con esas cabeceras, 26 URL, con Turnstile, Calendly y Giscus cargados): 0 violaciones y 0 errores de consola. La primera versión del bloque tenía dos fallas que la prueba detectó (`img-src data:` y `style-src https://giscus.app`) y quedaron corregidas.
- **Falta (de Felipe):** pegar `public/_headers`, desplegar la preview, revisar la consola de cada página (formulario con Turnstile y envío, Calendly, foro, privacidad y 404), pasar un revisor de cabeceras y mirar la zona de Cloudflare (AT-121). Hasta entonces las tareas de prueba y los criterios de aceptación siguen en `[ ]`.