# E60-I02 · Ajustes de Experiencia tras la revisión en la preview
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E60 · Página Experiencia (experiencia.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E60-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-056, ADR-063, ADR-065, ADR-066

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar los ajustes que pidió Felipe el 31-10-2026 al revisar Experiencia en la preview. Es una iteración de ajuste al final de la épica (ADR-056): E60-I01 y su bitácora no se editan.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `DESIGN.md` 11.2 (patrón «línea de tiempo», hoy sin asignar) y 11.5 (Experiencia, por incorporar); ADR-065 (que descartaba la línea de tiempo) y ADR-063 (íconos).
- Referencia de solo lectura: `git show main:experiencia.html` (mini línea de tiempo: 3 hitos con ícono).
- Archivos: `src/components/experience/`, `src/content/experience/page.json`, `src/content.config.ts`, `src/pages/es/experiencia.astro` y `src/pages/en/experience.astro`.

## Alcance
- **a)** Restaurar la mini línea de tiempo del sitio antiguo (3 hitos con ícono), en el orden de `main`, con el patrón «línea de tiempo» de 11.2 en versión compacta, en es y en, con íconos de ADR-063 y sin dependencias. Hitos, con los datos que confirmó Felipe: Instructor Certificado · Talento Digital para Chile · 2023 - Actualidad; Docente Universitario · INACAP | Duoc UC | IPLACEX · 2013 - Actualidad; Desarrollador Full Stack · INACAP · 2011 - Actualidad.
- **b)** Periodo y modalidad de las tarjetas se conservan. El subtítulo h2 «Resumen de Experiencia Laboral por Perfil» sigue fuera (repite el `<h1>`).
- **c)** Dejar anotado que Felipe validó el inglés de Experiencia el 31-10-2026 (ADR-017).
- **c2)** Tarjeta Desarrollador vigente: periodo «2011 - Actualidad» y verbos del texto en presente, sin agregar contenido.
- **d)** Registrar ADR-066.

## Fuera de alcance
- Cualquier otro cambio de contenido o de diseño de Experiencia. Las tarjetas de perfil no cambian.

## Tareas
- [x] Comparar los años de los hitos con los de las tarjetas y, si difieren, detenerse y consultar a Felipe: difirieron (Docente 2023 frente a 2013 y Desarrollador «Actualidad» frente a 2020) y Felipe respondió el 31-10-2026.
- [x] Construir la línea de tiempo (hitos, íconos, es/en) y actualizar la tarjeta Desarrollador.
- [x] Registrar ADR-066 y el inglés validado.

## Archivos previstos (crear / modificar)
- Crear: `src/components/experience/ExperienceTimeline.astro`.
- Modificar: `src/content/experience/page.json`, `src/content.config.ts`, `src/pages/es/experiencia.astro`, `src/pages/en/experience.astro` y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] La línea de tiempo muestra los 3 hitos de `main`, en su orden, con ícono, en es y en.
- [x] Los años mostrados coinciden con los que confirme Felipe y no contradicen a las tarjetas.
- [x] Periodo y modalidad siguen en las tarjetas; no hay h2 subtítulo.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Revisión a 375 y 1.280 px, claro y oscuro, es y en, con teclado y sin JavaScript.

## Riesgos y notas
- Los periodos viven en dos lugares de `page.json` (AT-081).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
