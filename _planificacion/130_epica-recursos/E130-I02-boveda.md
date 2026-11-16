# E130-I02 · Bóveda mixta: temáticas, descargables y JSON-LD
- **Estado:** [x] Terminada (03-11-2026)
- **Épica:** E130 · Página Recursos (recursos.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E130-I01 · **Hallazgos que cierra:** AT-034, AT-043 · **ADR relacionados:** ADR-017, ADR-036, ADR-079, ADR-080, ADR-081, ADR-082

> Reescrita el 03-11-2026 por ADR-079 (ADR-056). Antes: «Bóveda de recursos y JSON-LD Course». El nombre del archivo se conserva.

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Completar la bóveda con los recursos 1 al 8 agrupados por temática, sus descargables y el JSON-LD.

## Contexto y referencias
- `static/js/datos/recursos.datos.js` (ids 1 al 8) y `static/recursos/empleabilidad/` y `static/recursos/python/` (hasta 12 MB).
- Temáticas (Felipe, 03-11-2026): Empleabilidad (1, 3), Python (2, 4, 5, 6, 7) y Java (8).
- Composición A (ADR-080): sección «Temáticas» en grilla simétrica de tarjetas sobre `bg-alt`, después del hilo de la ruta.
- AT-043: las rutas públicas de los PDF pueden estar compartidas fuera del sitio.
- El modelo `resources` y los componentes de chips de E130-I01 se reutilizan (campo `theme`).

## Alcance
- Recursos 1 al 8 en `src/content/resources/items.json` con `theme` y textos es/en.
- Archivos en `public/static/recursos/` con la URL de `main`.
- Aviso en `en-US` de que los archivos están en español y peso de cada archivo visible junto al enlace (también en los pasos locales de la ruta).
- JSON-LD de la página (valorar `Course` / `ItemList`, ver AT-093).

## Fuera de alcance
- Traducción de los PDF (BL-04). Artículos (BL-09).

## Tareas
- [x] Copiar los 5 archivos de los recursos 1 al 8 a `public/static/` preservando rutas.
- [x] Migrar datos y traducir descripciones.
- [x] Sección de temáticas, aviso de idioma y peso visible.
- [x] JSON-LD y controles de `verify:seo`.

## Archivos previstos (crear / modificar)
- Crear: `public/static/recursos/empleabilidad/*`, `public/static/recursos/python/*`, componente de temáticas.

## Criterios de aceptación (verificables)
- [x] Todas las rutas públicas de PDF y plantillas de `main` responden igual en la preview.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación
- `pnpm build`, `check`, `lint`, `format:check` y `verify:seo`.
- Comparación de la lista de rutas de `static/recursos/` de `main` con `dist/`.

## Riesgos y notas
- El id 34 (grabación del taller del 3 de octubre) existe solo en la copia antigua de la rama, no en `main`: no se migra (Felipe, 03-11-2026).
- El recurso 8 va solo en Java (Felipe, 03-11-2026; ADR-081).
- `taller-despliegue-plataforma-google-cloud.pdf` pesa 12 MB (AT-034).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
