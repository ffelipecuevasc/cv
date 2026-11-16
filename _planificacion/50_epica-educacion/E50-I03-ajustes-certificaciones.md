# E50-I03 · Ajustes de certificaciones tras la revisión en la preview
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E50 · Página Educación (educacion.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E50-I02 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-056, ADR-061, ADR-062

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar los ajustes que pidió Felipe el 31-10-2026 al revisar las franjas de certificaciones en la preview. Es una iteración de ajuste al final de la épica (ADR-056): E50-I02 y su bitácora no se editan.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `DESIGN.md` 7.8 (franja temática) y 11.4 (Educación); ADR-061 (clasificación y franjas).
- Archivos: `src/components/education/CertificationsSection.astro`, `src/data/certifications.ts`.

## Alcance
- **a)** En Inteligencia artificial, intercambian de posición AWS AI Practitioner y Claude Certified Developer – Foundations.
- **b)** El titular de la franja Cloud pasa a «Tecnología Cloud» (es) y «Cloud Technology» (en).
- **c)** En la franja Cloud, titular, rótulo y barra se alinean a la derecha (espejo de IA, barra a la derecha del rótulo) desde el ancho de escritorio; en móvil, a la izquierda.
- **d)** AWS Developer Associate pasa de Cloud a Desarrollo y datos (Cloud 2, Desarrollo y datos 4). Siguen 11 credenciales, ninguna duplicada.

## Fuera de alcance
- Cualquier otro cambio de contenido o de diseño de Educación. El JSON-LD y la cifra de certificaciones no cambian.

## Tareas
- [x] Ajustar orden, categoría y textos (a, b, d).
- [x] Alinear a la derecha el encabezado de la franja Cloud desde 1.024 px (c).
- [x] Verificar que `hasCredential` y la cifra no cambian.

## Archivos previstos (crear / modificar)
- Modificar: `src/data/certifications.ts`, `src/content/education/page.json`, `src/components/education/CertificationsSection.astro` y, solo con una propiedad opcional, `ThemeStripe.astro` y `SectionHeader.astro`.

## Criterios de aceptación (verificables)
- [x] IA: Claude Certified Developer – Foundations primero y AWS AI Practitioner en cuarto lugar.
- [x] Cloud con 2 credenciales (AWS Cloud Practitioner y Oracle OCI Associate); Desarrollo y datos con 4; 11 en total, sin duplicadas.
- [x] Titular «Tecnología Cloud» / «Cloud Technology».
- [x] Desde 1.024 px, titular, rótulo y barra de Cloud alineados a la derecha; bajo esa medida, a la izquierda.
- [x] `hasCredential` y la cifra idénticos a los de antes (mismo orden y mismo contenido).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Revisión a 375 y 1.280 px, claro y oscuro, es y en.

## Resultado (31-10-2026, ADR-062)
- Orden de IA: Claude Certified Developer – Foundations, Oracle AI Associate, Oracle AI Professional, AWS AI Practitioner y Agentic AI Certified Foundations Associate. Cloud: AWS Cloud Practitioner y Oracle OCI Associate. Desarrollo y datos: AWS Developer Associate, Python Institute PCEP, Oracle Data Science Professional y Oracle Developer Professional. Total 11, sin duplicadas.
- El orden sale del campo nuevo `position` de `certifications.ts`; el orden del arreglo no cambió, así que `hasCredential` y la cifra siguen idénticos (`pnpm verify:seo` 153 de 153, sin cambios en sus comprobaciones).
- Alineación a la derecha de Cloud: propiedades opcionales `mirror` (ThemeStripe) y `align="end-lg"` (SectionHeader), sin efecto en los demás usos.
- Verificación: build, check, lint, format:check y verify:seo ok; Chrome a 375 y 1.280 px, claro y oscuro, es y en: sin desborde; Cloud alineada a la derecha a 1.280 px (barra después del rótulo) y a la izquierda a 375 px.

## Riesgos y notas
- El orden de visualización no puede salir del orden del arreglo, porque el JSON-LD se deriva de él.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
