# E100-I02 · Talento Digital, segunda mitad de secciones
- **Estado:** [ ] Pendiente
- **Épica:** E100 · Página Talento Digital (talento-digital.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E100-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar las secciones restantes y cerrar la paridad completa de la página.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Corte registrado en la bitácora de E100-I01.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Secciones restantes en ambos idiomas.

## Fuera de alcance
- —

## Tareas
- [ ] Construir y traducir.
- [ ] Comparar la página completa con la actual.

## Archivos previstos (crear / modificar)
- Modificar: páginas de Talento Digital.

## Criterios de aceptación (verificables)
- [ ] Ninguna sección del sitio actual queda sin migrar.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
