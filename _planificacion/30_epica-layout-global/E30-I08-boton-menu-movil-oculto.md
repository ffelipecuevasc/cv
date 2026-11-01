# E30-I08 · Botón de menú móvil oculto desde 1.280 px
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E30 · Layout global · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E30-I05, E30-I07 · **Hallazgos que cierra:** AT-078 · **ADR relacionados:** ADR-056

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Corregir el defecto de AT-078: desde 1.280 px el botón de menú móvil sigue visible junto al menú de escritorio. Es una iteración nueva al final de E30 (ADR-056): E30-I05 y E30-I07 y sus bitácoras no se editan.

## Contexto y referencias
- `DESIGN.md` 2.1 y 7.2 (el botón de menú existe solo bajo 1.280 px); AT-078.
- Causa (AT-078): `MobileMenuButton.astro` oculta el botón con `.mobile-menu-toggle { display: none }` desde 80 rem, pero `IconButton.astro` fija `display: inline-flex` con `.icon-button[data-astro-cid-…]`, de mayor especificidad.
- Archivos: `src/components/layout/MobileMenuButton.astro`, `src/components/ui/IconButton.astro`.

## Alcance
- Corregir la causa de la especificidad, sin `!important`.
- Verificar la navbar a 375, 768, 1.279, 1.280, 1.366 y 1.920 px, en claro y oscuro, en es y en.

## Fuera de alcance
- Cambiar el diseño o el quiebre de 1.280 px (`DESIGN.md` 7.2).
- Cualquier cambio bajo 1.280 px.

## Tareas
- [x] Corregir la regla que oculta el botón: `:global(.icon-button.icon.mobile-menu-toggle)` (0,3,0) en `MobileMenuButton.astro`, sin `!important`.
- [x] Medir y revisar los 6 anchos, 2 temas y 2 idiomas, incluido el teclado (Tab no llega al botón oculto): 24 casos correctos y el defecto reproducido en la versión anterior (bitácora).
- [x] Cierre documental (AT-078, bitácora, README, registro-log).

## Criterios de aceptación (verificables)
- [x] Desde 1.280 px el botón de menú no se ve ni recibe foco; el menú de escritorio, el botón de apariencia y el idioma siguen intactos.
- [x] Bajo 1.280 px (375, 768, 1.279) el botón se ve y funciona igual que antes.
- [x] Sin `!important`.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Marcar AT-078 como resuelto
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
