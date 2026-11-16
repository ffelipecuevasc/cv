# E190-I01 · Checklist de precondiciones y ensayo en preview
- **Estado:** [x] Terminada (15-11-2026; checklist firmado por Felipe)
- **Épica:** E190 · Despliegue y cutover · **Prioridad:** P0 · **Tamaño:** S (con carga manual de Felipe)
- **Depende de:** E170-I04, E180-I03 · **Hallazgos que cierra:** AT-085, AT-109, AT-123 (si el registro lo permite), AT-126, AT-136; avanza AT-048 (la acción pasa a E190-I02), BL-02, BL-06 y BL-08 · **ADR relacionados:** ADR-013, ADR-014, ADR-027, ADR-035, ADR-037, ADR-088, ADR-089 · **ADR nuevos:** ADR-099 y, solo si corresponde, ADR-100

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

> Versión reescrita el 15-11-2026 (tras cerrar E180) para incorporar las decisiones de Felipe y los hallazgos que la versión anterior no listaba. Reemplaza al archivo original.

## Objetivo
Verificar que todo está listo para el cutover, que no hay contenido nuevo de `main` sin portar y que el recorrido crítico funciona en la preview. La iteración tiene dos fases porque la preview solo refleja lo que Felipe commitea y empuja a `migracion-astro`:
- **Fase 1 (agente):** cambios y documentos, con verificación local. Termina con la entrega y la espera.
- **Fase 2 (Felipe y agente):** ensayo en la preview ya desplegada, checklist firmado y cierre documental.

## Decisiones de Felipe (15-11-2026, dichas por el desarrollador)
1. **BL-02 · Node 26:** se verifica solo en la documentación oficial de Cloudflare (Workers Builds, build image y changelog) si hay Node 26. Al 15-11-2026 la documentación consultada por el Tech Lead (changelog del 30-07-2026) preinstala 22.23.2 y 24.18.0; no hallé Node 26 (no verificado por el agente). Si no está disponible: **ADR-100** mantiene Node 24 hasta después del cutover, sin editar ADR-027. Si está disponible: el agente se detiene y pregunta; no se migra en esta iteración. No se toca el despliegue.
2. **AT-048 · workers.dev sin `noindex`:** la URL sigue activa durante el ensayo. Apagarla (`workers_dev: false`) o darle `noindex` es un paso del cutover y se planifica en E190-I02, con su reversa. `wrangler.jsonc` lo edita solo Felipe (ADR-033).
3. **BL-08 / AT-105 · política sin validar por un especialista:** el cutover se hace con la política vigente (E155-I01, `PRIVACY_POLICY_VERSION`). **ADR-099** sustituye la precondición de ADR-035 «el texto lo valida un especialista antes del cutover» en E190-I01; ADR-035 no se edita. BL-08 pasa a «antes de la entrada en vigencia real de la Ley 21.719». Estado de la ley al 15-11-2026 según la web (el agente lo reverifica en fuentes oficiales): el Senado aprobó el 28-10-2026 postergar la vigencia al 15-10-2027; la Comisión de Constitución de la Cámara lo aprobó en general el 05-11-2026 y lo remitió a Hacienda (segundo trámite). Mientras no se publique como ley, rige el 01-12-2026. Antes del cutover, Felipe confirma de nuevo ese estado.
4. **AT-109 · 404 de idioma sin barra final:** se acepta tal cual y se cierra aquí, sin tocar ADR-088 ni ADR-089. Se registra en la propia AT (no requiere ADR: no sustituye ninguna decisión).
5. **AT-085 · proyecto 1 del portafolio:** Felipe entrega el texto y las etiquetas (bloque más abajo). El agente no inventa contenido.

## Contexto y referencias
- ADR-014: con la rama derivada de `main`, `git log main --not HEAD` y `git diff` muestran lo publicado en producción durante la migración.
- La política vigente es el borrador de E155-I01: describe solo hechos del sitio, sin conservación, base legal, domicilio ni derechos (AT-105). El formulario ya exige el checkbox y envía fecha, hora y versión (ADR-035, ADR-084).
- Secretos del Worker (solo nombres; los valores los configura Felipe): `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY`, `CONTACTO_DESTINO` (`src/worker/contact.ts`).
- Preview: `https://felipecuevas-dev.felipe-cuevas.workers.dev`. Producción (Pages `felipe-cuevas-cv`, desde `main`) no se toca.
- Documentos obligatorios: `AGENTS.md`, `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Fase 1: ADR-099 (y ADR-100 si corresponde), AT-126, AT-136, AT-085, actualización de AT-109, AT-048 y AT-123, revisión de `main`, checklist y propagación a E190-I02 a I04.
- Fase 2: ensayo en la preview, registro de los resultados manuales de Felipe y cierre.

## Fuera de alcance
- Ejecutar el cutover, y cualquier cambio en Cloudflare, `public/_redirects`, `public/_headers`, `wrangler.jsonc`, `AGENTS.md`, `DESIGN.md` o `.claude/`.
- AT-127 y AT-129 (siguen abiertos sin iteración; se deciden aparte).
- Migrar a Node 26.

## Texto aprobado para el proyecto «cv» (AT-085)
Archivo: `src/content/portfolio/page.json`, proyecto con `id: "cv"`. Texto elegido por Felipe el 15-11-2026 (opción A de las propuestas del Tech Lead; etiquetas y lenguaje según la recomendación, por confirmar por Felipe). Si el agente ve algún `[PEGAR]`, no aplica este punto, lo reporta y sigue con el resto.
- `description.es`: «Este mismo sitio: currículum interactivo y portafolio profesional bilingüe con **Astro, Tailwind CSS y TypeScript**. Modo claro y oscuro, movimiento propio sin librerías, formulario de contacto con validación en el servidor y Turnstile, y despliegue estático en Cloudflare Workers.»
- `description.en`: «This very site: a bilingual interactive résumé and professional portfolio built with **Astro, Tailwind CSS and TypeScript**. Light and dark mode, in-house motion without libraries, a contact form with server-side validation and Turnstile, and static deployment on Cloudflare Workers.»
- `tags` (orden final): `Astro`, `TypeScript`, `HTML5`, `CSS3`, `Tailwind CSS`, `Cloudflare Workers`, `Cloudflare Turnstile`, `PNPM`
- `programmingLanguage`: `TypeScript` (38 archivos `.ts` y ningún `.js` en `src/`, verificado el 15-11-2026)
- `title`, `imageAlt`, `image`, `url`, `category`: sin cambio.

Texto actual, solo como referencia: «Este mismo sitio: currículum interactivo y portafolio profesional con **HTML5 semántico, Tailwind CSS y JavaScript Vanilla**. Modo claro y oscuro, animaciones con AOS, formulario de contacto protegido con Cloudflare Turnstile y despliegue en Cloudflare Pages.» Etiquetas actuales: HTML5, CSS3, Tailwind CSS, JavaScript, AOS, Cloudflare Pages, Cloudflare Turnstile, NPM. La descripción admite `**negrita**`. Los íconos de las etiquetas vienen del mapa `TAG_ICONS` de `src/components/developer/Portfolio.astro`: una etiqueta sin entrada se muestra solo como texto, sin error. `Astro` y `TypeScript` quedan sin ícono (aceptado); no se agregan SVG ni entradas al mapa en esta iteración (los SVG de marca no se tocan, `DESIGN.md` 7.14). Los íconos de Astro y TypeScript, si Felipe los quiere, van al backlog.

## Tareas del agente (Fase 1)
- [x] Puerta: rama `migracion-astro` (no `main`), árbol limpio, E170-I04 y E180-I03 terminadas en `registro-log.md`.
- [x] Marcar la iteración `[~]` en este archivo, en `_planificacion/README.md` y en `registro-log.md`.
- [x] **ADR-099** (verificar el último número antes): decisión 3, con contexto, consecuencias y origen. Ajustar la tarea y el criterio de privacidad de esta iteración y de E190 en sus archivos (queda «política publicada y consentimiento registrado»; la validación pasa a BL-08).
- [x] **BL-02:** consultar la documentación oficial de Workers Builds (build image y changelog); registrar fuente, fecha y versiones. Aplicar la decisión 1 (ADR-100 o detenerse y preguntar).
- [x] **Ley 21.719:** contrastar el estado en fuentes oficiales (Diario Oficial, BCN, camara.cl, senado.cl) y registrarlo con su fecha y fuente en la bitácora.
- [x] **AT-126:** copiar `static/img/felipe_cuevas_cv.png` a `public/static/img/felipe_cuevas_cv.png`, idéntico (comparar hash). Comprobar que `check:redirects` no tenga un conteo fijo de archivos de `public/static/` que ahora cambie; si lo tiene, ajustar solo ese conteo y su informe.
- [x] **AT-136:** dejar los comentarios de `public/robots.txt` en ASCII (sin tildes ni «ñ»), con las reglas intactas (`User-agent`, `Allow`, `Sitemap`); comprobar 0 bytes fuera de ASCII.
- [x] **AT-085:** aplicar el bloque aprobado a `src/content/portfolio/page.json` (es y en) y comprobar que la página y el JSON-LD de `/es/desarrollador/` y `/en/developer/` lo reflejan en `dist/` y que ya no dicen AOS ni Cloudflare Pages para este proyecto.
- [x] **AT-109:** registrar en la AT «Aceptado» con fecha, decisión 4 y sin cambios a ADR-088 y ADR-089.
- [x] **AT-048:** registrar la decisión 2 (la acción pasa a E190-I02).
- [x] **AT-123:** dejarla como ítem manual de Felipe en el checklist (el agente no accede al panel de Cloudflare); resolver solo con la evidencia que Felipe entregue.
- [x] **`main`:** ejecutar `git log main --not HEAD --oneline` y `git diff --stat HEAD...main`; listar cada commit y qué contenido tocó. No portar sin preguntar: proponer qué portar y qué registrar como hallazgo (AGENTS.md, sección 6).
- [x] Crear `E190-I01-checklist.md` en esta carpeta (tabla: ítem, responsable, evidencia, estado; sección de firma de Felipe). Debe incluir los ítems manuales de Felipe de la lista siguiente.
- [x] Propagar a los archivos de E190-I02 a I04 lo de la tabla «Propagación» (solo sus encabezados «Hallazgos que cierra» y sus tareas; sin tocar nada más).
- [x] Verificación local y entrega (ver más abajo). Esperar el aviso de despliegue.

## Tareas manuales de Felipe (van al checklist)
- [x] Bloque de AT-085 completado el 15-11-2026 (opción A). Falta solo que Felipe confirme las etiquetas y el lenguaje.
- [x] Confirmar los secretos del Worker en Cloudflare (solo nombres, sin valores): `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY`, `CONTACTO_DESTINO`.
- [x] AT-123: revisar Observability del Worker (excepciones y 4xx de la versión `2f39c966` y de la actual), reproducir con el formulario y anotar el origen. Si no se puede resolver, decidir si bloquea el cutover. **Resultado (15-11-2026): no reproducible, origen no determinado; activar Observability se decide en E190-I02.**
- [x] BL-06: confirmar el consentimiento de uso de nombres y fotos de los 12 testimonios, o decidir qué se retira.
- [x] Ensayo manual en la preview: navegación, selector de idioma, tema claro y oscuro, Foro (Giscus), 15 descargas de Recursos, redirecciones antiguas, 404 por idioma.
- [x] Formulario real: rechazo sin checkbox con error accesible; envío con checkbox y correo con fecha, hora y versión de la política (ADR-035).
- [x] Confirmar que `AGENTS.md` quedó corregido (sin «P-01 pendiente» ni «desde AT-044»; verificado por el Tech Lead el 15-11-2026).
- [x] Reconfirmar el estado de la Ley 21.719 antes del cutover (decisión 3). **Traspasado a E190-I02 por decisión de Felipe (15-11-2026): paso obligatorio previo al cutover; no bloquea I01.**
- [x] Hacer commit y push, esperar el despliegue de la preview y avisar al agente (Fase 2). Firmar el checklist.

## Tareas de Fase 2 (agente, con la preview desplegada)
- [x] `pnpm check:redirects --base https://felipecuevas-dev.felipe-cuevas.workers.dev` sin fallos.
- [x] Con `curl -I` en la preview: `/robots.txt` (sin tildes rotas), `/static/img/felipe_cuevas_cv.png` (200, `image/png`), `/es/`, `/en/`, `/x` (404 por idioma) y la cabecera `X-Robots-Tag` de workers.dev (registrar el estado actual en AT-048).
- [x] Contrastar en la preview el texto nuevo de AT-085.
- [x] Anotar en el checklist los resultados manuales que Felipe informe (con su fecha, marcados «dicho por el desarrollador») y cerrar solo si Felipe firma.

## Propagación a las demás iteraciones
| Archivo | Agregar |
|---|---|
| E190-I02 | Hallazgos que cierra: AT-048, AT-121, AT-122. Tareas: decidir workers.dev (`workers_dev: false` o `noindex`) con su reversa; decidir si se activa Web Analytics (si se activa, ADR y política); HSTS en la zona con `max-age` corto al inicio y sin `preload`; pasos de ADR-037 (rama de producción a `main`, borrar el CNAME del apex, Custom Domain, `www` con 301) y reversa devolviendo el dominio a Pages. |
| E190-I03 | Sin tareas nuevas; confirmar la lista con Felipe antes de borrar (ya está). |
| E190-I04 | Hallazgos que cierra: AT-131 (enviar `sitemap-index.xml` a Search Console y repetir las comprobaciones en producción) y AT-100 (quitar el hostname de workers.dev de Turnstile). Tarea: nueva línea base de rendimiento (ADR-015). |

## Archivos previstos (crear / modificar)
- Crear: `190_epica-cutover/E190-I01-checklist.md`, ADR-099 (y ADR-100 si corresponde) en `decisiones.md`, bitácora de la iteración.
- Crear: `public/static/img/felipe_cuevas_cv.png` (copia idéntica de `static/img/`).
- Modificar: `public/robots.txt` (solo comentarios), `src/content/portfolio/page.json` (proyecto `cv`), `scripts/check-redirects.mjs` (solo si tiene un conteo fijo), `auditoria-tecnica.md`, `decisiones.md`, `registro-log.md`, `_planificacion/README.md`, `epica.md`, E190-I02 a I04.

## Criterios de aceptación (verificables)
- [x] Checklist completo y firmado por Felipe (sección D del checklist y bitácora).
- [x] ADR-099 registrado; ADR-100 registrado o Node 26 reportado a Felipe, según el resultado.
- [x] `/static/img/felipe_cuevas_cv.png` responde 200 en la preview; `/robots.txt` sin bytes fuera de ASCII; el proyecto `cv` ya no menciona AOS ni Cloudflare Pages.
- [x] Ningún commit de `main` queda sin clasificar (portado, hallazgo o descartado).
- [x] Precondiciones de privacidad: política publicada y consentimiento registrado por el formulario (ADR-035, ADR-084); validación del especialista pasa a BL-08 por ADR-099.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check` y `pnpm lint` sin errores (DoD).
- `pnpm verify`, `pnpm check:i18n`, `pnpm verify:seo` y `pnpm check:redirects` sin fallos.
- Fase 2: `pnpm check:redirects --base <preview>` y las comprobaciones con `curl` listadas arriba.
- Ensayo manual de Felipe documentado en el checklist.

## Riesgos y notas
- La preview refleja lo que Felipe empuja a `migracion-astro`: sin su commit y push, la Fase 2 no puede comprobar los cambios de la Fase 1.
- Los scripts `pnpm verify`, `verify:seo`, `check:i18n` y `check:redirects` no están en la lista de permisos de `.claude/settings.json` (solo `pnpm check *` y similares): Claude Code pedirá confirmación al ejecutarlos. Es esperable.
- Con la política sin validar y la ley rigiendo desde el 01-12-2026 si no se publica la postergación, el riesgo legal de publicar ese texto lo asume Felipe (ADR-099).
- Borrar o retirar archivos no ocurre aquí (E190-I03).

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md, en 00_producto/registro-log.md y en epica.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md (AT-137 registrado) y decisiones nuevas en decisiones.md (siguiente: ADR-099)
- [x] Escribir la bitácora en 99_bitacora/
- [x] Ejecutar git diff --stat antes y después de editar documentos; listar todos los archivos cambiados
- [x] Sugerir mensaje de commit (máx. 200 caracteres)