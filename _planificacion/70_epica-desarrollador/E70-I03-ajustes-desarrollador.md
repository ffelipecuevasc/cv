# E70-I03 · Ajustes de Desarrollador tras la revisión en la preview
- **Estado:** [x] Terminada (01-11-2026)
- **Épica:** E70 · Página Desarrollador (desarrollador.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E70-I02 · **Hallazgos que cierra:** AT-083 · **ADR relacionados:** ADR-017, ADR-046, ADR-056, ADR-063, ADR-067, ADR-068

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar los ajustes que pidió Felipe el 01-11-2026 al revisar Desarrollador en la preview. Es una iteración de ajuste al final de la épica (ADR-056): E70-I01, E70-I02 y sus bitácoras no se editan.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `DESIGN.md` 4.4 (contrastes), 7.14 (los SVG de marca no cambian) y 9 (variables de componente, ADR-046); AT-083.
- Archivos: `src/components/developer/TechnologyWall.astro`, `src/styles/global.css` y `scripts/verify-seo.mjs`.

## Alcance
- **a)** Dejar anotado que Felipe validó el inglés de los 12 proyectos y de los filtros el 01-11-2026 (ADR-017).
- **b)** AT-083: solo en tema oscuro, cada logo del muro de tecnologías va sobre una placa clara pequeña, con una variable de componente (ADR-046). Los 36 SVG no se tocan y el tema claro no cambia. Medir el contraste de la placa contra el fondo.
- **c)** OCI conserva el mismo SVG que Oracle Database, como en `main`; el nombre de la ficha los distingue.
- **d)** Registrar ADR-069.

## Fuera de alcance
- Cualquier otro cambio de contenido o diseño de Desarrollador.

## Tareas
- [x] Variable `--tech-plate-bg` y placa en `TechnologyWall`.
- [x] Medir contraste y revisar los 36 logos en oscuro.
- [x] Control de la placa en `verify:seo`.
- [x] ADR-069 y AT-083 resuelto.

## Archivos previstos (crear / modificar)
- Modificar: `src/styles/global.css`, `src/components/developer/TechnologyWall.astro` y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] En oscuro, los 36 logos se distinguen sobre la placa; en claro nada cambia.
- [x] Los 36 SVG son idénticos a los de `main`.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Chrome por CDP a 375 y 1.280 px, claro y oscuro, es y en, y sin JavaScript.
- `git diff` sin cambios en las páginas de Experiencia.

## Riesgos y notas
- Express.js sigue tenue en ambos temas: su SVG de marca es gris claro y no se toca (7.14).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
