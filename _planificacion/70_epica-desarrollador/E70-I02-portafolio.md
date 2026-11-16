# E70-I02 · Portafolio filtrable y JSON-LD
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E70 · Página Desarrollador (desarrollador.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E70-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017, ADR-036, ADR-048, ADR-056, ADR-063, ADR-067

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar el portafolio de 12 proyectos en WEBP con filtros por categoría y su JSON-LD.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `static/js/portafolio.js`, `static/js/servicios/filtros.js`, `static/js/datos/portafolio.datos.js`, `static/js/config/portafolio.config.js`, imágenes 1600×900 en `static/img/portafolio/`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Filtros accesibles con mejora progresiva (sin JavaScript se ven todos los proyectos).
- JSON-LD ItemList en ambos idiomas.

## Fuera de alcance
- —

## Tareas
- [x] Migrar datos y filtros.
- [x] Optimizar imágenes.
- [x] Traducir descripciones y textos alternativos.

## Archivos previstos (crear / modificar)
- Crear: componentes de portafolio y contenido.

## Criterios de aceptación (verificables)
- [x] Los 12 proyectos y todos los filtros funcionan en ambos idiomas; sin JavaScript se listan todos.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba de filtros con teclado.
- Validador de schema.org.

## Riesgos y notas
- Patrón, filtros y JSON-LD: ADR-068. Hallazgo nuevo: AT-084. Inglés por validar (ADR-017). Validador de schema.org: lo corre Felipe con la URL de preview.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
