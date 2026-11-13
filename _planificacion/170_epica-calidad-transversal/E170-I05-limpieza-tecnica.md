# E170-I05 · Limpieza técnica
- **Estado:** [x] Terminada
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
- [x] AT-079: eliminar el código muerto de `CertificationsSection` y ajustar el tipo de `badge` si procede.
- [x] AT-080: resolver la especificidad de `IconButton` y verificar `ThemeToggle`, `BackToTop`, las flechas de `Testimonials` y el botón del menú móvil.
- [x] AT-081: una sola fuente para el periodo de cada perfil y control en `verify:seo`.
- [x] AT-089: una sola fuente para las horas y los módulos de PF1822 y control en `verify:seo`.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/education/CertificationsSection.astro`, `src/data/certifications.ts`, `src/components/ui/IconButton.astro`, `src/content/experience/page.json`, `src/content/instructor/page.json`, `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] El HTML publicado de las páginas afectadas no cambia (comparación del `dist/` antes y después, salvo ajustes justificados).
- [x] AT-079, AT-080, AT-081 y AT-089 marcados como resueltos con esta iteración.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm verify:seo` sin fallas
- Revisión visual de la navbar a 1.279 y 1.280 px (AT-080).

## Riesgos y notas
- Es una limpieza: si algo cambia lo que se ve, se detiene y se consulta.
- **Línea base de la comparación del `dist/`:** E170-I01 cambia HTML, CSS y JavaScript publicados (AT-060 en `BaseLayout.astro`, AT-065 en `Hero.astro`, AT-082 en `experience/page.json`, AT-110 en `CalendlyPanel.astro`, AT-112 en `testimonials.ts`, AT-114 en `InstitutionsZigzag.astro` y AT-115 en `Footer.astro`). La comparación «antes y después» de esta iteración debe partir de un `pnpm build` hecho **con los cambios de E170-I01 ya aplicados** (idealmente después de su commit), para que esos ajustes no se confundan con la limpieza.
- **Línea base definitiva (12-11-2026, E170-I01 cerrada):** el commit `3bd3e13` es el de la preview medida; su `dist/` es el de la huella de abajo (24 páginas HTML idénticas a las de la preview). Antes: línea base registrada y actualizada: `pnpm build` del árbol con **E170-I01 completa** (incluidas las correcciones de AT-114 en `InstitutionsZigzag.astro` y AT-115 en `Footer.astro`, que cambian el CSS publicado): 207 archivos, 30 `.html`, huella sha256 (rutas y contenido, orden alfabético) `bcae4302f5d8f3ae`. Sustituye a la de `89b637f` (`371c73d497d52c95`), que no incluía esas dos correcciones. Esa huella es la línea base: E170-I01 ya está en `[x]` y E170-I05 puede partir cuando Felipe lo pida. Para comparar, correr `pnpm build` antes de tocar nada y, al terminar, otra vez.
- E170-I01 también toca `src/content/experience/page.json` (solo el texto de la tarjeta Desarrollador, AT-082); AT-081 trabaja sobre los periodos del mismo archivo.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

## Resultado (13-11-2026)
- **AT-079:** `CertificationsSection.astro` pierde `issuerBadges`, `issuerFile`, la rama del `null` y el import del tipo `CertificationIssuer`; `badgeFor(badge: string)`. `badge: string` es obligatorio en `src/data/certifications.ts`. El `dist/` no cambia por este AT.
- **AT-080:** la regla base de `IconButton.astro` pasa a `:where(.icon-button)`; Astro la publica como `[data-astro-cid-…]:where(.icon-button)` (0,1,0). Los botones llevan los dos atributos `data-astro-cid-` (el de `IconButton` y el del componente que lo usa). No se tocaron `.icon`, `.arrow` ni los `:global(...)`.
- **AT-081:** cada hito de `timeline.items` lleva `profile` (`z.enum(['lecturer','developer','instructor'])`) en lugar de `period`; `ExperienceTimeline.astro` lee el periodo de `profiles` y falla al compilar si el perfil no existe. Control nuevo en `verify:seo` (por idioma).
- **AT-089:** control nuevo en `verify:seo` (por idioma): el texto del plan PF1822 contiene las horas y los módulos de la tarjeta (con el mapa 9 → nueve / nine). El contenido no se tocó.
- **Verificación:** `pnpm check` 0/0/0, `pnpm lint`, `pnpm format:check` y `pnpm build` sin errores; `pnpm verify:seo` **962/962** (958 + 4).
- **Comparación del `dist/`** con la línea base de `69b391b` (207 archivos, 30 `.html`, `628994afbec63292`): una hoja CSS renombrada (`_astro/SectionHeader.DFidEHxe.css` → `SectionHeader.qoGIH8PE.css`, con una sola regla distinta) y 29 `.html` que solo cambian la referencia a esa hoja (todos menos `dist/index.html`). Ninguna otra diferencia.
- **Estilos calculados** de `.icon-button` antes y después (Chromium sin cabeza, 5 páginas × 4 anchos × 2 temas, en reposo y con puntero encima): 330 comparaciones, 0 diferencias.
- **Nueva línea base del `dist/`:** 207 archivos, 30 `.html`, sha256 **`6d6e25a0e8865015`** (método en `99_bitacora/2026-11-13_E170-I05.md`). Sustituye a `628994afbec63292` como referencia para E170-I02, I03 e I04.