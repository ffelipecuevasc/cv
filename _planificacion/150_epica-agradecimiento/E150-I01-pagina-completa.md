# E150-I01 · Página de agradecimiento
- **Estado:** [x] Terminada
- **Épica:** E150 · Página Agradecimiento (agradecimiento.html) · **Prioridad:** P2 · **Tamaño:** S
- **Depende de:** E140-I02 · **Hallazgos que cierra:** AT-030 (parte de agradecimiento) y AT-099 · **ADR relacionados:** ADR-007, ADR-017, ADR-036, ADR-086

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página de confirmación con `noindex, follow` en ambos idiomas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:agradecimiento.html`; hoy tiene `noindex, follow` y está en `Disallow` de `robots.txt`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Contenido y metadatos en ambos idiomas; excluida del sitemap.

## Fuera de alcance
- —

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036). Felipe eligió la composición B «Confirmación centrada» el 06-11-2026 (ADR-086); el bloque de `DESIGN.md` está en la bitácora y lo aplica Felipe (ADR-033).
- [x] Construir la página.
- [x] Excluirla del sitemap: `thankYou` pasa a `internalRoutes` (ADR-086); el sitemap llega en E180-I02.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/agradecimiento.astro`, `src/pages/en/thank-you.astro`, `src/components/thank-you/ThankYou.astro`.
- Modificar: `src/i18n/ui.ts` (`thankYou`), `src/i18n/routes.ts` (`thankYou` a `internalRoutes`), `src/components/seo/Seo.astro` y `src/layouts/BaseLayout.astro` (`follow`), `src/components/ui/SectionHeader.astro` (slot `after-kicker`).

## Criterios de aceptación (verificables)
- [x] Ambas versiones tienen `noindex, follow` y no aparecen en el sitemap (no hay sitemap aún; la ruta es interna y queda fuera del que genere E180-I02).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. Inglés por validar por Felipe (ADR-017).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/`.

## Riesgos y notas
- `robots.txt` de `main` tiene `Disallow: /agradecimiento`: un rastreador que lo obedece no lee el `noindex` (AT-103, para E180-I02).
- `scripts/verify-seo.mjs` no listaba estas rutas en `PENDING_ROUTES` (solo las de privacidad), así que no se tocó.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
