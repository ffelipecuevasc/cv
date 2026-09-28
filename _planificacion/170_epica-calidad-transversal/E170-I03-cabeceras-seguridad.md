# E170-I03 · Cabeceras de seguridad
- **Estado:** [ ] Pendiente
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** AT-023, AT-024 · **ADR relacionados:** ADR nuevo (CSP)

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
- [ ] Redactar `_headers` en `public/`.
- [ ] Probar en la preview con la consola del navegador sin violaciones de CSP.

## Archivos previstos (crear / modificar)
- Crear: `public/_headers`.

## Criterios de aceptación (verificables)
- [ ] Sin violaciones de CSP en ninguna página, incluidos formulario, agenda y foro.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Consola del navegador en la preview.
- Herramienta de revisión de cabeceras.

## Riesgos y notas
- Consultar antes de cambiar configuración de despliegue.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
