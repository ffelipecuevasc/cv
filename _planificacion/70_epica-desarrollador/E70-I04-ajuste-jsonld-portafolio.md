# E70-I04 · Ajuste del JSON-LD del portafolio
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E70 · Página Desarrollador (desarrollador.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E70-I03 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-056, ADR-068, ADR-069

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Corregir la advertencia del validador de schema.org en el ItemList del portafolio y registrar dos hallazgos de la revisión. Es una iteración de ajuste al final de la épica (ADR-056): E70-I01 a E70-I03 y sus bitácoras no se editan.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Validador de schema.org (Felipe, 01-11-2026): 0 errores en la portada y en las dos páginas de Desarrollador; 1 advertencia en `/es/desarrollador/` y `/en/developer/`: «inLanguage no está reconocida como propiedad de ItemList».
- Archivos: `src/components/seo/DeveloperJsonLd.astro` y `scripts/verify-seo.mjs`.

## Alcance
- **a)** Quitar `inLanguage` de la raíz del ItemList; se mantiene en cada SoftwareSourceCode.
- **b)** Ajustar `verify:seo` y confirmar que ambos ItemList siguen con 12 elementos.
- **c)** Registrar AT-085 (texto del proyecto 1) y AT-086 (logo de Express.js), y anotarlos en E190-I01 y E170-I01.
- **d)** Anotar la validación de schema.org de Felipe.

## Fuera de alcance
- Cambiar el texto del proyecto 1 o los SVG de marca.

## Tareas
- [x] Quitar `inLanguage` de la raíz del ItemList.
- [x] Controles de `verify:seo`.
- [x] AT-085 y AT-086.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/seo/DeveloperJsonLd.astro` y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] El ItemList no lleva `inLanguage` en la raíz; cada elemento sí.
- [x] Ambos ItemList tienen 12 elementos.
- [x] El JSON-LD de Experiencia no cambia.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- `git diff` sin cambios en Experiencia.

## Riesgos y notas
- Sin ADR nuevo: es una corrección de implementación de ADR-068, sin decisión de Felipe. Hallazgos nuevos: AT-085 y AT-086.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
