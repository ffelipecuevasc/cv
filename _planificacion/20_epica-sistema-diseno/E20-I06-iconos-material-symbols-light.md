# E20-I06 · Íconos Material Symbols Light
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E20-I03, E20-I05 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-043, ADR-056, ADR-063

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reemplazar los íconos de línea propios (trazo de 1,6 px, ADR-043) por Material Symbols Light, como pidió Felipe el 31-10-2026. Es una iteración nueva al final de E20 (ADR-056): E20-I03 y su bitácora no se editan.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `DESIGN.md` 7.14 (iconografía); ADR-043 (íconos propios; este cambio lo sustituye en parte); ADR-057 (el ícono del logotipo ya es de Material Symbols Light).
- Fuente: colección `material-symbols-light` de Iconify (Google, Apache 2.0): peso 200, tamaño óptico 24, grado 0.
- Sitio antiguo (solo lectura): `git show main:<ruta>`; los nombres de los íconos salen de `main:*.html` y `main:static/js/datos/formacion.datos.js`.
- Archivos: `src/components/ui/icons.ts`, `Icon.astro`, `TestimonialCard.astro`, `src/components/dev/DesignSample.astro`.

## Alcance
- Variantes de contorno (`-outline`); sin sufijo el ícono es relleno y no se usa. Mismo nombre que en `main` cuando existe.
- Copiar solo los trazados SVG a `icons.ts`, sin dependencias ni fuente de íconos. Sin red o sin el ícono: detenerse, sin inventar trazados.
- Licencia Apache 2.0 anotada, como en `terminal-icon.svg`.
- Íconos del sistema y de las páginas hechas (Inicio y Educación).
- `Icon.astro` pasa a íconos rellenos con `currentColor`, sin cambiar `name`, `size` ni `label`.

## Fuera de alcance
- SVG de tecnologías (`static/img/iconos/`), LinkedIn, GitHub, Gmail (correo) y el de REUF.
- El ícono del logotipo (`terminal-icon.svg`) y el favicon.

## Tareas
- [x] Obtener los trazados y comprobar que son de contorno.
- [x] Reemplazar los íconos de línea en `icons.ts` y registrar la licencia.
- [x] Extender `Icon.astro` y ajustar los usos que dependían del trazo.
- [x] Medir el trazo de 1 px en los tamaños reales, claro y oscuro, e informar los que queden tenues.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/ui/icons.ts`, `Icon.astro`, `TestimonialCard.astro`, `src/components/dev/DesignSample.astro`, `README.md` (aviso de licencia).

## Criterios de aceptación (verificables)
- [x] Todos los íconos del sistema son de contorno de Material Symbols Light y ninguno se dibujó a mano.
- [x] `Icon` conserva `name`, `size` y `label`.
- [x] No se tocaron los SVG de tecnologías, LinkedIn, GitHub, Gmail ni REUF.
- [x] Licencia Apache 2.0 anotada.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Revisión de navbar, pie y Educación a 375 y 1.280 px, claro y oscuro.

## Resultado (31-10-2026, ADR-063)
- 19 íconos del sistema reemplazados por trazados de contorno de `material-symbols-light` (Iconify), copiados a `icons.ts` con el ícono de origen en un comentario y el aviso de Apache 2.0. Sin dependencias ni red en ejecución. Los nombres del sitio no cambian.
- Correspondencia con `main`: `menu`, `expand_more` (chevron-down), `arrow_back/forward/upward`, `download`, `open_in_new`, `check_circle` (check), `info`, `star`, `school` (graduation-cap), `workspace_premium` (certificate), `terminal` y `military_tech` (medal). Sin equivalente en `main`: `close`, `sun` (`light-mode`), `moon` (`dark-mode`), `alert` (`error`) y `mail`.
- `Icon.astro` renderiza todo relleno con `currentColor` (sin rama de trazo); `name`, `size` y `label` no cambian. `lineIcons` pasa a `symbolIcons`.
- Estrellas de testimonios: de relleno con borde a la variante de contorno dorada; las apagadas, con opacidad 0,35. Se retira el token `--star-stroke`, que quedó sin uso.
- Sin tocar: SVG de tecnologías, LinkedIn, GitHub, Gmail (correo), REUF, logotipo y favicon.
- Verificación: build (6 páginas), check (0/0/0), lint, format:check y `verify:seo` (153 de 153) ok. Chrome a 375 y 1.280 px, claro y oscuro, es y en: sin desborde horizontal y ningún ícono con trazo ni relleno distinto de `currentColor`.

## Riesgos y notas
- Con trazo de 1 px, los íconos pequeños pueden verse tenues sobre algunos fondos.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
