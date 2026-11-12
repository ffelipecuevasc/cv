# E170-I01 · Revisión de accesibilidad global
- **Estado:** [~] En curso
- **Épica:** E170 · Calidad transversal · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40–E160 (todas las épicas de página) · **Hallazgos que cierra:** AT-060, AT-065, AT-082, AT-086, AT-098 (valorar), AT-056 (decisión: retiro en E190-I03) y la legibilidad de Josefin Sans 300 (ADR-041); verifica AT-054; registra AT-110 a AT-115 · **ADR relacionados:** ADR-005, ADR-041, ADR-056, ADR-090, ADR-091

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

> **Reescrita por ADR-090 (11-11-2026).** Esta iteración queda solo con accesibilidad. La limpieza técnica que tenía (AT-079, AT-080, AT-081 y AT-089) pasa a **E170-I05**. El orden de la épica es I01, I05, I02, I03, I04.

## Objetivo
Auditar y corregir la accesibilidad de las páginas del sitio en ambos idiomas, con medición automática, recorrido manual con teclado y NVDA, y los hallazgos de accesibilidad abiertos.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Línea base Lighthouse de accesibilidad del sitio actual: 91–96 (`docs/linea-base/2026-08-12/resumen-lighthouse.md`).
- **AT-060:** el botón de apariencia no responde sin JavaScript.
- **AT-065:** el cursor del titular del hero se separa del texto si la frase se parte (móvil).
- **AT-082:** redacción de la tarjeta Desarrollador de Experiencia (Felipe aprobó las alternativas el 11-11-2026).
- **AT-086:** contraste del logo gris claro de Express.js en ambos temas.
- **AT-098:** el sistema no tiene color de error; solo se propone un token si la prueba muestra un problema real.
- **AT-056:** la muestra de tokens puede destellar en oscuro al cargar (herramienta interna).
- **AT-054 (verificar):** texto sobre la retícula de la banda oscura; resuelto en E20-I03 con `text-soft` 4,57 y `accent` solo en texto grande. Se comprueba con herramienta, sin reabrir.
- **Legibilidad de Josefin Sans 300 (ADR-041, `DESIGN.md` 5.3):** el punto más débil del sistema es Josefin 300 de 16 px o menos con `text-soft`. Se mide y se propone; la decisión es de Felipe.
- Medición contra `https://felipecuevas-dev.felipe-cuevas.workers.dev` (preview del Worker, ADR-037), que refleja lo último que Felipe publicó con `git push`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Lighthouse (categoría accesibilidad) en móvil y escritorio sobre 26 URL: las 22 páginas indexables (11 rutas × 2 idiomas), Agradecimiento ×2 y las 404 de idioma (`/es/404` y `/en/404`, sin barra final por AT-109).
- Una herramienta de reglas de accesibilidad (por ejemplo axe-core o similar), propuesta con versión fija y verificada en la web, con aprobación de Felipe antes de usarla.
- Teclado, foco, landmarks, encabezados, contraste, textos alternativos e idioma de página.
- Correcciones de los hallazgos de accesibilidad listados arriba.
- Checklist manual de teclado y NVDA para Felipe (portada, Educación con su diálogo, Recursos con la ruta, Foro y Contacto).

## Fuera de alcance
- La limpieza técnica de AT-079, AT-080, AT-081 y AT-089 (E170-I05).
- Rendimiento y Core Web Vitals (E170-I02), cabeceras de seguridad (E170-I03), enlaces rotos y paridad automatizada (E170-I04).
- Editar `DESIGN.md` (lo hace Felipe, ADR-033): los cambios de diseño se entregan como bloque en la bitácora.

## Tareas
- [x] Reescribir esta iteración, crear E170-I05 y ajustar `epica.md`, el README de `_planificacion/` y `registro-log.md` (ADR-090).
- [x] AT-082: aplicar «mientras trabajo como docente universitario» y «alongside my work as a university lecturer» en `src/content/experience/page.json`.
- [x] Crear `scripts/psi.mjs` (sin dependencias; clave solo en `PSI_API_KEY`) y medir accesibilidad en las 26 URL, en móvil y escritorio (medición inicial: mínimo 96).
- [x] Proponer una herramienta de reglas (`pnpm dlx`, versión fija, verificada en la web); **aprobada por Felipe el 12-11-2026**: `pa11y@10.0.0 --runner axe` (ADR-090).
- [x] Ejecutar pa11y sobre las 22 URL indexables en claro y oscuro, Educación con el diálogo abierto y Contacto con errores (build local, 12-11-2026): 1 violación real (AT-112, corregida) y límite de la herramienta (AT-113).
- [x] Corregir lo que falle o registrarlo como AT desde AT-110: AT-110 (contraste de Calendly), AT-111 (logotipo, aceptado), AT-112 (carril de testimonios), AT-113 (límite de axe).
- [x] AT-060: botón de apariencia oculto sin JavaScript (verificado en el build local).
- [x] AT-065: cursor del titular del hero oculto bajo 640 px (decisión de Felipe, 12-11-2026); bloque de `DESIGN.md` 7.4 en la bitácora.
- [x] AT-056: decisión de Felipe (retiro en E190-I03, sin corregir el destello), ADR-091; anotado en E190-I03 y E180-I02.
- [x] AT-086: medir el contraste de Express.js en ambos temas (sin problema).
- [x] Preparar en la bitácora el checklist manual de teclado y NVDA para Felipe (sección 6).
- [x] AT-098: **cerrado el 12-11-2026.** Felipe distingue con claridad el campo con error del campo con foco (Contacto, punto 4: sí); sin token de error.
- [x] Legibilidad de Josefin Sans 300 (ADR-041): **opción A, decisión de Felipe (12-11-2026)**; `DESIGN.md` 5.3 ya aplicado. El barrido posterior halló un solo caso vivo de la regla, la frase del pie (AT-115), que queda para decidir.
- [x] Felipe hizo commit y push (`89b637f`, sobre `281a378`), hizo el recorrido manual y re-midió Contacto con PSI (100, versión `cb699d8e`).
- [x] Verificar los avisos de `DESIGN.md` 7.9, 11.7 y 7.14 (sección 9 de la bitácora): AT-114 (enlace de Docente, 4,09:1 sobre `band`) y AT-115 (frase del pie en 300 con `text-soft`) registrados; íconos sin hallazgo.
- [ ] Repetir pa11y + axe sobre la preview (22 URL en claro y oscuro, Educación con diálogo, Contacto con errores, sin la muestra de tokens) y anotar el hash de git medido: a la espera del ID de versión de Cloudflare que indique Felipe.
- [ ] Felipe decide AT-114 y AT-115 (corregir en esta iteración, pasarlos a E170-I05 o aceptarlos).

## Archivos previstos (crear / modificar)
- Crear: `scripts/psi.mjs`, `_planificacion/170_epica-calidad-transversal/E170-I05-limpieza-tecnica.md`, la bitácora de la iteración.
- Modificar: `src/content/experience/page.json` y los componentes con hallazgos de accesibilidad: `src/layouts/BaseLayout.astro` (AT-060), `src/components/contact/CalendlyPanel.astro` (AT-110), `src/components/home/Hero.astro` (AT-065) y `src/scripts/testimonials.ts` (AT-112).
- Modificar (documentos): `epica.md`, `_planificacion/README.md`, `registro-log.md`, `auditoria-tecnica.md`, `decisiones.md`.

## Criterios de aceptación (verificables)
- [x] Accesibilidad de Lighthouse ≥ 96 en las páginas medidas, o un AT que justifique cada excepción. (Medición inicial: mínimo 96 en las 52 mediciones; el 96 de Contacto era AT-110, ya corregido. Se confirma tras el push.)
- [x] Sin errores críticos ni serios en la herramienta de reglas, o un AT que justifique cada excepción. (pa11y sobre el build local: 0 violaciones tras corregir AT-112; los «incompletos» de contraste, AT-113. Se repite sobre la preview.)
- [ ] Hallazgos de accesibilidad de esta iteración resueltos o registrados. (AT-098 y Josefin 300 resueltos; AT-060, AT-065, AT-110 y AT-112 confirmados por Felipe en la preview. Quedan por decidir AT-114 y AT-115, y repetir pa11y sobre la preview.)
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD).
- `pnpm check` y `pnpm lint` sin errores (DoD).
- `pnpm verify:seo` sin fallas.
- `node scripts/psi.mjs` con `PSI_API_KEY` definida en la sesión de Felipe; resumen en la bitácora.
- Checklist manual de teclado y NVDA (lo ejecuta Felipe).

## Riesgos y notas
- La preview solo refleja lo que Felipe publicó con `git push`; las correcciones de esta iteración se miden otra vez después de su push. **Estado al 12-11-2026:** el push que hizo Felipe llevó hasta `b9d1e68` (E160); todo lo de E170-I01 sigue sin commit.
- Superficie excluida: la muestra de tokens (AT-056, ADR-091) no se audita.
- pa11y se ejecutó con el Chrome local y sin descargar Chromium, desde el scratchpad y sin tocar `package.json`.
- PageSpeed Insights y la herramienta de reglas no reemplazan el recorrido manual con lector de pantalla.
- La API de PageSpeed Insights necesita una clave (`PSI_API_KEY`); el agente nunca la pide, la lee ni la imprime.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
