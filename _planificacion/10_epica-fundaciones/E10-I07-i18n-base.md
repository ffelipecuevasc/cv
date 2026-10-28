# E10-I07 · i18n base: enrutamiento /es/ y /en/
- **Estado:** [x] Terminada
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E10-I03 · **Hallazgos que cierra:** AT-006 · **ADR relacionados:** ADR-001, ADR-019, ADR-020

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Configurar el i18n nativo de Astro con dos idiomas, ambos con prefijo en la URL, y dejar el esqueleto de rutas de ambos idiomas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-001: `es-CL` en `/es/` y `en-US` en `/en/`; toda página existe en ambos.
- ADR-019: `/` redirige con 301 a `/es/`; `x-default` apunta a `/es/`.
- ADR-020: slugs traducidos en `/en/` con mapa de rutas equivalentes (se completa en E30-I02).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Configuración i18n de Astro con `es` y `en`, prefijo en ambos idiomas y sin fallback silencioso.
- Páginas índice mínimas `/es/` y `/en/`.
- Atributo `lang` correcto (`es-CL`, `en-US`) por página.
- Tratamiento provisorio de `/` en desarrollo (la redirección definitiva de producción es E180-I03).

## Fuera de alcance
- Diccionario de interfaz y mapa de slugs (E30-I02).
- Selector de idioma (E30-I04).

## Tareas
- [x] Configurar i18n en `astro.config.mjs`.
- [x] Crear la estructura `src/pages/es/` y `src/pages/en/`.
- [x] Verificar que no se generan rutas sin prefijo de idioma, salvo `/` y los archivos de `public/`.
- [x] Documentar la convención en la bitácora.

## Archivos previstos (crear / modificar)
- Modificar: `astro.config.mjs`.
- Crear: `src/pages/es/index.astro`, `src/pages/en/index.astro` (mínimas).

## Criterios de aceptación (verificables)
- [x] `pnpm build` genera `dist/es/index.html` y `dist/en/index.html` con `lang` correcto.
- [x] No existen páginas de contenido fuera de `/es/` y `/en/`.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` y revisión del árbol `dist/`

## Resultado (28-10-2026)
- Verificada la API i18n en los tipos de Astro 7.4.2 (`astro/dist/types/public/config.d.ts`) y en la guía oficial: `locales`, `defaultLocale`, `fallback` y `routing` (`prefixDefaultLocale`, `redirectToDefaultLocale`, `fallbackType`).
- `astro.config.mjs`: `locales` como objetos `{ path: 'es', codes: ['es-CL', 'es'] }` y `{ path: 'en', codes: ['en-US', 'en'] }`, `defaultLocale: 'es'`, `prefixDefaultLocale: true` y sin `fallback` (ADR-034).
- `redirectToDefaultLocale: true` se descartó: Astro 7 exige una `src/pages/index.astro` (error `MissingIndexForInternationalization`), que sería una página de contenido fuera de `/es/` y `/en/`. En su lugar, `redirects: { '/': '/es/' }` genera `dist/index.html` con meta refresh, `noindex` y canónica a `/es/` (provisorio hasta E180-I03, AT-046).
- Se eliminó `src/pages/index.astro` de E10-I03 junto con la clase temporal `text-[13.37px]`.
- `dist/`: `es/index.html` (`lang="es-CL"`), `en/index.html` (`lang="en-US"`), `index.html` (redirección) y `_astro/*.css`. No hay otras páginas.
- `pnpm build`, `pnpm check` (0 errores, 0 advertencias), `pnpm lint` y `pnpm format:check` sin errores.
- AT-006 queda abierto: esta iteración deja el `lang` por página; `hreflang` y `x-default` siguen en E30-I01, E180-I02 y E180-I03.

## Riesgos y notas
- Evitar que el middleware de i18n exija SSR: la salida es estática (ADR-018).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
