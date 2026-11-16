# E160-I01 · Página 404 por idioma
- **Estado:** [x] Terminada
- **Épica:** E160 · Página 404 (404.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E30-I06, E10-I09 · **Hallazgos que cierra:** AT-003, AT-004 · **ADR relacionados:** ADR-007, ADR-001, ADR-036, ADR-037, ADR-084, ADR-085, ADR-086, ADR-088, ADR-089

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Servir una 404 en el idioma de la ruta solicitada, con estilos correctos en cualquier profundidad de ruta.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:404.html`.
- AT-004: la 404 actual usa rutas relativas (`404.html:37`, `:98`), que fallan en rutas anidadas.
- AT-003: su logotipo no anima.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- 404 para `/es/*` y `/en/*` y una 404 raíz para rutas sin prefijo (en español con enlace a inglés).
- `noindex, follow` y fuera del sitemap (ruta interna, ADR-088).

## Fuera de alcance
- —

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036). Felipe eligió la composición A «Confirmación centrada» el 11-11-2026 (ADR-088); el bloque de `DESIGN.md` está en la bitácora y lo aplica Felipe (ADR-033).
- [x] Construir las páginas: `src/pages/404.astro`, `src/pages/es/404.astro` y `src/pages/en/404.astro`.
- [x] Configurar el manejo de 404 según la plataforma de ADR D-14, que es ADR-037 (Cloudflare Workers con assets estáticos): `not_found_handling: "404-page"` ya está en `wrangler.jsonc` y no hay cambio que aplicar. Lo que faltaba era el nombre de archivo: el script `scripts/place-404.mjs` deja `dist/es/404.html` y `dist/en/404.html` (ADR-089).
- [x] Probar rutas inexistentes de uno, dos y tres niveles: probado con una emulación de la regla documentada de Cloudflare (`/x`, `/es/x`, `/es/x/y/z`, `/en/x/y`). **La prueba en la URL de workers.dev queda pendiente de Felipe** (no se pudo ejecutar `wrangler dev` en este entorno).

## Archivos previstos (crear / modificar)
- Crear: `src/pages/404.astro`, `src/pages/es/404.astro`, `src/pages/en/404.astro`, `src/components/not-found/NotFound.astro`, `src/components/ui/CenteredMessage.astro` (composición compartida con Agradecimiento) y `scripts/place-404.mjs`.
- Modificar: `package.json` (script `build`), `src/i18n/routes.ts` (`notFound` en `internalRoutes` y `/404/` como la de /es/), `src/i18n/ui.ts` (`notFound`), `src/components/thank-you/ThankYou.astro` (usa `CenteredMessage`) y `scripts/verify-seo.mjs` (61 controles).

## Criterios de aceptación (verificables)
- [x] `/es/x/y/z` muestra la 404 en español con estilos; `/en/x/y` en inglés. Verificado con la emulación (estado 404, estilos y fuente cargados, sin desbordes); en Cloudflare real, pendiente de Felipe.
- [x] El logotipo anima igual que en el resto del sitio (mismo componente `Logo`; el texto del renglón 2 cambia con el tiempo).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. Inglés por validar por Felipe (ADR-017).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba en la URL de preview con rutas anidadas.

## Riesgos y notas
- Con el `build.format` por defecto, Astro no genera `es/404.html` sino `es/404/index.html`; sin `scripts/place-404.mjs` Cloudflare caería siempre en la 404 de la raíz (ADR-089, AT-108).
- `/es/404/` y `/en/404/` responden 200 si se piden directo (decisión de Felipe del 09-11-2026; AT-107).
- E180-I02 debe excluir las 404 del sitemap (AT-106).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
