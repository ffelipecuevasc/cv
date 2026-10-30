# E40-I02 · Franja de trayectoria y testimonios
- **Estado:** [x] Terminada (30-10-2026)
- **Épica:** E40 · Página Inicio (index.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40-I01 · **Hallazgos que cierra:** AT-012, AT-025 · **ADR relacionados:** ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reconstruir la franja de métricas de trayectoria y la sección de testimonios dentro de `<main>`, en ambos idiomas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:index.html` (líneas 655–760), `static/js/testimonios.js`, `static/js/datos/testimonios.datos.js` (~459 palabras), fotos en `static/img/testimonios/`.
- AT-012: ambas secciones están fuera de `<main>` (`index.html:654`, `:661`, `:732`).
- AT-025: 12 testimonios con nombre y foto de personas reales; ADR-017: se muestran traducidos con la indicación "traducido del español".
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Franja de 5 métricas y testimonios según `DESIGN.md`.
- Imágenes optimizadas.
- Etiqueta de traducción en `en-US`.

## Fuera de alcance
- —

## Tareas
- [x] Migrar los datos de testimonios al modelo de contenido bilingüe (12 archivos en `src/content/testimonials/`, con el español idéntico al de `main`).
- [x] Redactar la traducción y marcarla como traducida ("Translated from Spanish" en cada tarjeta `en-US`).
- [x] Franja de 5 cifras con la cifra de certificaciones derivada de los datos (ADR-053), no el "8+" fijo.
- [x] Carrusel según `DESIGN.md` 7.12, sin avance automático y con región `aria-live`.
- [x] Consentimiento de uso de nombres y fotos (por validar): sigue pendiente en BL-06, sin bloquear (decisión de Felipe, 30-10-2026).

## Archivos previstos (crear / modificar)
- Crear: componentes de trayectoria y testimonios, contenido bilingüe.

## Criterios de aceptación (verificables)
- [x] Ambas secciones están dentro de `<main>`.
- [x] Los 12 testimonios están en ambos idiomas y en `en-US` indican que son traducciones.
- [x] No se envían nombres de personas a servicios de terceros (reemplaza el respaldo de ui-avatars, AT-024): ninguna solicitud externa y, si una foto no carga, se muestran las iniciales locales.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Revisión de landmarks con herramientas de accesibilidad.

## Riesgos y notas
- Consentimiento no confirmado: registrar como pendiente sin bloquear.

## Resultado y pendientes (30-10-2026)
- Franja y testimonios en `/es/` y `/en/`: `src/components/home/` (`StatsBand`, `Testimonials`), `src/scripts/testimonials.ts`, contenido en `src/content/home/` y `src/content/testimonials/`, fotos en `src/assets/testimonials/`. Detalle y mediciones en `99_bitacora/2026-10-30_E40-I02.md`.
- Cierra AT-012. AT-024 y AT-025 quedan abiertos con avance (parte de esta iteración resuelta).
- **Pendientes:**
  - Felipe valida la traducción al inglés de los 12 testimonios y de las 5 cifras (ADR-017), y los textos nuevos de los encabezados.
  - Consentimiento de nombres y fotos: BL-06, antes de E190.
  - Felipe incorpora a `DESIGN.md` el bloque de AT-068.
  - Los datos antiguos no traen el "programa" de cada testimonio (`DESIGN.md` 7.6): no se muestra.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
