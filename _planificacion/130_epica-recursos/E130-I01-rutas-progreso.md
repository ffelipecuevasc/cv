# E130-I01 · Bóveda mixta: página, modelo y ruta Web & IA
- **Estado:** [x] Terminada (03-11-2026)
- **Épica:** E130 · Página Recursos (recursos.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-028, AT-037 · **ADR relacionados:** ADR-017, ADR-022, ADR-023, ADR-036, ADR-079, ADR-080

> Reescrita el 03-11-2026 por ADR-079 (ADR-056). Antes: «Rutas de aprendizaje con progreso». El nombre del archivo se conserva para no romper enlaces.

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Crear la página de Recursos como bóveda mixta, con el modelo de datos de todos los recursos y la ruta «Desarrollo Web & IA» con progreso local.

## Contexto y referencias
- Referencia de solo lectura: `git show main:recursos.html`, `static/js/rutas.js`, `static/js/datos/rutas.datos.js`, `static/js/datos/recursos.datos.js`, `static/js/config/rutas.config.js` y `recursos.config.js`.
- AT-037: título y `<h1>` pasan a «Bóveda de recursos» / «Resource vault».
- ADR-023: clave `rutas-progreso` con formato `{"ruta": [ids]}` y `?ruta=`.

## Alcance
- Páginas `/es/recursos/` y `/en/resources/`, cabecera, ficha de la ruta en banda, pasos 9 al 33 por etapa con casillas, buscador, progreso y reinicio.
- Modelo `resources` (todos los tipos, incluido «artículo» sin contenido) y `resourcesPage`.
- Los 10 archivos locales de la ruta en `public/static/recursos/ia/desarrollo-web/` con la URL de `main` (AT-095).
- Hilo de Giscus `ruta-desarrollo-web-ia`, igual en ambos idiomas.

## Fuera de alcance
- Recursos 1 al 8, sus archivos, aviso de idioma, peso visible y JSON-LD (E130-I02).

## Tareas
- [x] Proponer 3 composiciones y validar una con Felipe (ADR-036): elegida la A (ADR-080).
- [x] Migrar datos y lógica de la ruta.
- [x] Conservar el formato del progreso guardado sin borrar otras claves.
- [x] Alinear `<title>` y `<h1>` (AT-037).

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/recursos.astro`, `src/pages/en/resources.astro`, `src/components/resources/*`, `src/scripts/resources.ts`, `src/content/resources/*`.

## Criterios de aceptación (verificables)
- [x] Un progreso guardado en el sitio actual se ve igual en el sitio nuevo en ambos idiomas.
- [x] `<title>` y `<h1>` coherentes.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo`.
- Prueba con un valor de `rutas-progreso` precargado a 375 y 1.280 px, claro/oscuro, es/en.

## Riesgos y notas
- Los hilos `ruta-python`, `ruta-empleabilidad` y `ruta-java` dejan de mostrarse en el sitio (siguen en GitHub).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
