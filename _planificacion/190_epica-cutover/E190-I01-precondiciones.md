# E190-I01 · Checklist de precondiciones y ensayo en preview
- **Estado:** [ ] Pendiente
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E170-I04, E180-I03 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-013, ADR-014

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Verificar que todo está listo para el cutover y que no hay contenido nuevo de `main` sin portar.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-014: con la rama derivada de `main`, `git log main --not HEAD` y `git diff` muestran lo publicado en producción durante la migración.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Checklist completo y ensayo del recorrido crítico en la preview.

## Fuera de alcance
- Ejecutar el cutover.

## Tareas
- [ ] Revisar cambios de `main` posteriores al inicio y portar su contenido.
- [ ] Confirmar todas las iteraciones previas terminadas.
- [ ] Confirmar secretos y variables configurados en la plataforma nueva (Felipe).
- [ ] Ensayar: navegación, idioma, tema, formulario, foro, descargas, redirecciones.

## Archivos previstos (crear / modificar)
- Crear: checklist en la carpeta de esta épica.

## Criterios de aceptación (verificables)
- [ ] Checklist completo firmado por Felipe en la bitácora.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Ensayo documentado.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
