# E170-I02 · Rendimiento y Core Web Vitals
- **Estado:** [ ] Pendiente
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** AT-013, AT-015, AT-032, AT-033 · **ADR relacionados:** ADR-015

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Medir el sitio nuevo frente a la línea base y a los umbrales de ADR-015, y cerrar un presupuesto de peso de imágenes.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Línea base: rendimiento móvil 53–58 y escritorio 72–98 (12-08-2026).
- ADR-015: los informes de rendimiento de Cloudflare se revisan a fines de octubre de 2026 (BL-01); si ya existen, se incorporan como línea base de campo.
- AT-032: imagen OG PNG de 350 KB; AT-033: `python_institute.png` sin referencia.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Lighthouse en móvil y escritorio para las 26 páginas.
- Presupuesto de imágenes y fuentes.
- Imagen OG por idioma optimizada.

## Fuera de alcance
- —

## Tareas
- [ ] Medir y comparar con la línea base.
- [ ] Optimizar lo que no cumpla.
- [ ] No migrar recursos huérfanos.

## Archivos previstos (crear / modificar)
- Modificar: recursos e imágenes.

## Criterios de aceptación (verificables)
- [ ] LCP ≤ 2,5 s, CLS ≤ 0,1 y TBT razonable en laboratorio; ninguna página con rendimiento inferior a su línea base.
- [ ] Imagen OG ≤ 200 KB.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Lighthouse móvil y escritorio sobre `pnpm preview` y sobre la URL de preview.

## Riesgos y notas
- Los valores de laboratorio no reemplazan datos de campo.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
