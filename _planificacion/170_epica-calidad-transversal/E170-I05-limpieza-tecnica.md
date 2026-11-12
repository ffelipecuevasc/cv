# E170-I05 · Limpieza técnica
- **Estado:** [ ] Pendiente
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E170-I01 · **Hallazgos que cierra:** AT-079, AT-080, AT-081, AT-089 · **ADR relacionados:** ADR-056, ADR-090

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

> **Creada por ADR-090 (11-11-2026).** Recoge la limpieza técnica que estaba en E170-I01 antes de reescribirla. Se ejecuta justo después de E170-I01 y antes de E170-I02.

## Objetivo
Quitar código muerto y duplicaciones de contenido que dejaron las épicas de página, sin cambiar lo que ve el visitante.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- **AT-079:** respaldo por emisor sin uso en `src/components/education/CertificationsSection.astro` (`issuerBadges`, `issuerFile` y la rama del `null` de `badge`).
- **AT-080:** un botón de ícono con clase propia puede perder por especificidad frente a `IconButton` (mismo origen que AT-078).
- **AT-081:** los periodos de la línea de tiempo y de las tarjetas de Experiencia se escriben dos veces en `src/content/experience/page.json`.
- **AT-089:** PF1822 se describe dos veces en `src/content/instructor/page.json`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- AT-079: borrar `issuerBadges`, `issuerFile` y la rama del `null`; valorar `badge: string` obligatorio.
- AT-080: decidir entre bajar la especificidad base de `IconButton` con `:where()` o aceptar una propiedad documentada; probarlo a los anchos de cambio de la navbar.
- AT-081: que el hito de la línea de tiempo tome el periodo del perfil y que `verify:seo` compare ambos.
- AT-089: que el plan tome horas y módulos de la tarjeta, o que `verify:seo` compare ambos.

## Fuera de alcance
- Accesibilidad (E170-I01), rendimiento (E170-I02), cabeceras de seguridad (E170-I03), enlaces y paridad (E170-I04).
- Cambios visibles de diseño o de contenido.

## Tareas
- [ ] AT-079: eliminar el código muerto de `CertificationsSection` y ajustar el tipo de `badge` si procede.
- [ ] AT-080: resolver la especificidad de `IconButton` y verificar `ThemeToggle`, `BackToTop`, las flechas de `Testimonials` y el botón del menú móvil.
- [ ] AT-081: una sola fuente para el periodo de cada perfil y control en `verify:seo`.
- [ ] AT-089: una sola fuente para las horas y los módulos de PF1822 y control en `verify:seo`.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/education/CertificationsSection.astro`, `src/data/certifications.ts`, `src/components/ui/IconButton.astro`, `src/content/experience/page.json`, `src/content/instructor/page.json`, `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [ ] El HTML publicado de las páginas afectadas no cambia (comparación del `dist/` antes y después, salvo ajustes justificados).
- [ ] AT-079, AT-080, AT-081 y AT-089 marcados como resueltos con esta iteración.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm verify:seo` sin fallas
- Revisión visual de la navbar a 1.279 y 1.280 px (AT-080).

## Riesgos y notas
- Es una limpieza: si algo cambia lo que se ve, se detiene y se consulta.
- **Línea base de la comparación del `dist/`:** E170-I01 cambia HTML, CSS y JavaScript publicados (AT-060 en `BaseLayout.astro`, AT-065 en `Hero.astro`, AT-082 en `experience/page.json`, AT-110 en `CalendlyPanel.astro` y AT-112 en `testimonials.ts`). La comparación «antes y después» de esta iteración debe partir de un `pnpm build` hecho **con los cambios de E170-I01 ya aplicados** (idealmente después de su commit), para que esos ajustes no se confundan con la limpieza.
- E170-I01 también toca `src/content/experience/page.json` (solo el texto de la tarjeta Desarrollador, AT-082); AT-081 trabaja sobre los periodos del mismo archivo.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
