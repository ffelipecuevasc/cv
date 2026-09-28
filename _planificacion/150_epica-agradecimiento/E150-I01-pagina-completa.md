# E150-I01 · Página de agradecimiento
- **Estado:** [ ] Pendiente
- **Épica:** E150 · Página Agradecimiento (agradecimiento.html) · **Prioridad:** P2 · **Tamaño:** S
- **Depende de:** E140-I02 · **Hallazgos que cierra:** AT-030 · **ADR relacionados:** ADR-007, ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página de confirmación con `noindex, follow` en ambos idiomas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:agradecimiento.html`; hoy tiene `noindex, follow` y está en `Disallow` de `robots.txt`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Contenido y metadatos en ambos idiomas; excluida del sitemap.

## Fuera de alcance
- —

## Tareas
- [ ] Construir la página.
- [ ] Excluirla del sitemap.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/agradecimiento.astro`, `src/pages/en/thank-you.astro`.

## Criterios de aceptación (verificables)
- [ ] Ambas versiones tienen `noindex, follow` y no aparecen en el sitemap.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/`.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
