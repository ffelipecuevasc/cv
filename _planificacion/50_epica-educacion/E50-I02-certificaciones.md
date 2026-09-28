# E50-I02 · Gabinete de certificaciones y JSON-LD
- **Estado:** [ ] Pendiente
- **Épica:** E50 · Página Educación (educacion.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E50-I01 · **Hallazgos que cierra:** AT-013, AT-014 · **ADR relacionados:** ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reconstruir el gabinete de certificaciones con su interacción (modal o detalle) y los datos estructurados de credenciales.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `static/js/certificaciones.js`, `static/js/datos/certificaciones.datos.js`, `static/js/config/certificaciones.config.js`, imágenes en `static/img/logos/`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Interacción accesible (foco atrapado y Escape si es un diálogo).
- Imágenes optimizadas.
- JSON-LD de credenciales en ambos idiomas.

## Fuera de alcance
- —

## Tareas
- [ ] Migrar datos y lógica.
- [ ] Optimizar imágenes de insignias.
- [ ] Validar enlaces de verificación (Credly, Oracle, OpenEDG).

## Archivos previstos (crear / modificar)
- Crear: componentes de certificaciones.

## Criterios de aceptación (verificables)
- [ ] Todas las credenciales del sitio actual presentes con enlace de verificación.
- [ ] El diálogo es operable con teclado.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Recorrido con teclado.
- Validador de schema.org.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
