# E180-I01 · Mapa de URLs y redirecciones 301
- **Estado:** [x] Terminada (14-11-2026)
- **Épica:** E180 · Migración de URLs y SEO · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E160-I01 · **Hallazgos que cierra:** AT-005, AT-031, AT-043 · **ADR relacionados:** ADR-019, ADR-020, ADR-077

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Escribir las redirecciones 301 de todas las URLs actuales hacia `/es/` según el mapa de la auditoría (área L).

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Mapa en `auditoria-tecnica.md`, área L.
- `_redirects` actual: `/comunidad.html` y `/comunidad` → `/foro` (AT-031).
- `/eventos` y `/eventos.html` **no** llevan 301: responden 404 (ADR-077, la página Eventos salió del sitio). Se documenta en el mapa y se comprueba en la preview.
- AT-043: los archivos públicos (`/static/...`) conservan su ruta.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- `public/_redirects` con reglas para rutas limpias, variantes `.html` y rutas antiguas, sin cadenas.

## Fuera de alcance
- `/` (E180-I03).

## Tareas
- [x] Generar la lista completa de URLs de `main` (páginas y archivos públicos). **Verificado** con `git ls-tree` sobre `main` (ver la bitácora).
- [x] Escribir las reglas. **Verificado:** `public/_redirects` con 23 reglas (commit `19b4030`).
- [x] Probar cada URL en la preview. **Verificado:** `pnpm check:redirects --base https://felipecuevas-dev.felipe-cuevas.workers.dev` dio 448 de 448 (14-11-2026).

## Archivos previstos (crear / modificar)
- Crear: `public/_redirects`.

## Criterios de aceptación (verificables)
- [x] Cada URL antigua termina en su destino con un solo salto 301. **Verificado** en la preview (23 URL, un 301 cada una).
- [x] `/comunidad` va directo a `/es/foro/`. **Verificado** en la preview (un solo salto; con barra final por ADR-047).
- [x] `/eventos` y `/eventos.html` responden 404, sin redirección (ADR-077). **Verificado** en la preview (404 directo, sin `Location`).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. **Verificado** con build, check, lint, format:check y verify:seo (ver la bitácora). Pendientes de Felipe, **no verificados**: HSTS y el cutover real (E190).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Script de comprobación de estados HTTP sobre la preview.

## Riesgos y notas
- Límites de Cloudflare (dicho por el desarrollador e impreso por `check:redirects`): 2.000 reglas estáticas, 100 dinámicas, 1.000 caracteres por regla; código por defecto 302. Quedan 23 estáticas y todas con 301 explícito (ADR-093).
- Hallazgos nuevos: AT-126 (`og:image` y portafolio dan 404; Felipe decidió copiar `felipe_cuevas_cv.png` en E190-I01), AT-127 (`/educacion/` con barra da 404; no se redirige), AT-128 y AT-129.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md (ADR-093, AT-126 a AT-129)
- [x] Escribir la bitácora en 99_bitacora/ (`2026-11-13_E180-I01.md`)
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
