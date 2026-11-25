# E200-I04 · Ajustes del pie de página
- **Estado:** [x] Terminada (25-11-2026; revisión de Felipe en la preview, inglés validado)
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I03 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017, ADR-025, ADR-044, ADR-050, ADR-057, ADR-063, ADR-107, ADR-111

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar los ajustes del pie que pidió Felipe el 16-11-2026: una frase de marca que resuma mejor su perfil, un botón de CV llamativo en ambos temas, un efecto claro al pasar el puntero por los enlaces y la etiqueta «Correo electrónico» en vez de la dirección. Todo en `es-CL` y `en-US`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción, con captura del pie en tema claro:
    1. **Columna de marca:** la frase («Instructor de Desarrollo Fullstack e IA.») es pobre, de una sola línea. El botón «Descargar CV» es secundario (contorno), con el mismo fondo que el pie, y pasa inadvertido en ambos temas.
    2. **Columna de navegación:** al pasar el puntero solo cambia el color; el efecto es pobre. Pide una flecha junto al enlace, al pasar el puntero (no al hacer clic).
    3. **Columna de redes:** el mismo problema de la columna 2; además, el correo muestra la dirección completa.
- Vista previa en el chat del 16-11-2026, con tipografía 1, frase A, botón dorado y flechas, en es y en, claro y oscuro: Felipe la aprobó.
- Archivos: `src/components/layout/Footer.astro`, `social-links.ts`, `footer-links.ts`, `src/i18n/ui.ts` (`footer.tagline`), `src/components/ui/Button.astro` (variante `gold`), `src/components/ui/icons.ts` (existe `arrow-right`; falta la flecha diagonal).
- `DESIGN.md` 7.3 (variante Dorado: fondo `gold`, texto `orient-950`, al pasar brillo +5 %) y 7.9 (pie).
- Contrastes medidos el 16-11-2026: texto `orient-950` sobre `gold` 12,43:1; `gold` frente al fondo del pie `orient-50` 1,34:1 (claro) y frente a `orient-950` 12,43:1 (oscuro).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Frase (opción A):**
    - `es-CL`: «Ingeniero informático. Formo desarrolladores full stack en bootcamps y aulas universitarias, y construyo aplicaciones web con Java, Python e IA.»
    - `en-US`: «Computer engineer. I train full stack developers in bootcamps and university classrooms, and build web applications with Java, Python and AI.»
    - Ancho máximo de 44 caracteres (antes 40).
- **Botón «Descargar CV»:** variante Dorado en ambos temas; mismo texto, ícono, atributo de descarga y nombre accesible (ADR-050, ADR-057).
- **Enlaces de las columnas 2 y 3:** al pasar el puntero o con foco de teclado, el texto pasa a `text` y aparece una flecha a la derecha que se desliza 6 px. Flecha → en los enlaces internos y en el correo; flecha ↗ en los que abren pestaña nueva (LinkedIn, GitHub y REUF). Con movimiento reducido, la flecha aparece sin desplazarse.
- **Correo:** texto visible «Correo electrónico» (`es-CL`) y «Email» (`en-US`), desde el diccionario. El enlace `mailto:` no cambia.

## Alcance
- Frase de la marca, botón dorado, flecha en los enlaces de navegación y redes, y etiqueta del correo, en ambos idiomas y temas.
- Ícono de flecha diagonal de Material Symbols Light (ADR-063), si no existe en `icons.ts`.
- Ajuste de `verify:seo` si algún control depende del texto del correo o de la variante del botón.
- Bloque de `DESIGN.md` 7.3 y 7.9 para Felipe.

## Fuera de alcance
- Columnas, orden de los enlaces, barra inferior, botón de volver arriba y línea superior del pie.
- La barra de navegación (iteración propia cuando Felipe entregue sus ajustes).
- El enlace de correo del riel social del hero.

## Tareas
- [x] **Frase:** reemplazar `footer.tagline` en `ui.ts` por la opción A en es y en; ancho máximo de 44 caracteres; Work Sans 400 en `text-muted` (ADR-111).
- [x] **Botón:** pasar «Descargar CV» a la variante `gold` sin cambiar `href`, `download`, ícono ni nombre accesible; comprobar foco visible sobre `orient-50` y `orient-950`.
- [x] **Flecha:** agregar al enlace de las columnas 2 y 3 una flecha decorativa (`aria-hidden`) que aparece con `:hover` y `:focus-visible`, con opacidad y desplazamiento de 6 px en `--duration-base`; sin desplazamiento con `prefers-reduced-motion`. Agregar la flecha diagonal de Material Symbols Light a `icons.ts` con su comentario de origen.
- [x] **Correo:** sacar la etiqueta de `social-links.ts` hacia el diccionario (`footer.email`: «Correo electrónico» / «Email»), sin traducir los nombres propios de las otras redes (ADR-025).
- [x] **Controles:** revisar `scripts/verify-seo.mjs` y `check-i18n.mjs`; ajustar solo lo que dependa del texto del correo o de la clase del botón, y comprobar que el control ajustado falla ante un caso roto.
- [x] **Revisión visual:** protocolo de la épica en el pie de 3 páginas por idioma (Inicio, Contacto y 404), con hover y foco en cada enlace y en el botón, en claro y oscuro.
- [x] **Registro y bloques:** ADR-112 y bloque de `DESIGN.md` 7.3 (variante Dorado en dos usos) y 7.9 (frase, botón, flecha y etiqueta del correo) en la bitácora.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/layout/Footer.astro`, `src/components/layout/social-links.ts`, `src/i18n/ui.ts`, `src/components/ui/icons.ts` y, si hace falta, `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [x] La frase nueva se ve en es y en, en 3 líneas o menos desde 1.280 px (entre 768 y 1.279 px, hasta 6) y sin desbordes a 360 px (criterio ajustado por Felipe el 25-11-2026, AT-160).
- [x] «Descargar CV» es dorado en claro y oscuro, descarga el PDF y conserva su nombre accesible por idioma.
- [x] Los 6 enlaces de navegación y los 4 de redes muestran la flecha con el puntero y con Tab, y la ocultan al salir; ↗ solo en los 3 externos.
- [x] Con `prefers-reduced-motion: reduce`, la flecha aparece sin moverse.
- [x] El correo dice «Correo electrónico» / «Email» y abre `mailto:contacto@felipecuevas.dev`.
- [x] Lectores de pantalla: la flecha no se anuncia; los externos siguen anunciando que abren pestaña nueva.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-109: hover y Tab sobre cada enlace, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-112 · Pie: frase de marca, botón dorado, flecha en los enlaces y etiqueta del correo (sustituye en parte a ADR-057)
- **Contexto:** E200-I04. Revisión de Felipe en producción el 16-11-2026: frase de una línea, botón de CV inadvertido (contorno sobre el mismo fondo), hover pobre en las columnas de enlaces y la dirección de correo completa como texto.
- **Decisión (de Felipe, 16-11-2026, sobre la vista previa del chat):**
    - frase de la marca de dos oraciones (opción A), con ancho máximo de 44 caracteres;
    - «Descargar CV» en la variante Dorado en ambos temas (antes secundario);
    - flecha decorativa al pasar el puntero o con foco en los enlaces de navegación y redes: → interna, ↗ externa;
    - el correo se muestra como «Correo electrónico» / «Email».
- **Sustituye en parte:** ADR-057 en la variante del botón de CV. La ubicación, la URL y el nombre accesible del CV no cambian.
- **Consecuencias:** la variante Dorado pasa a tener dos usos (Instructor y pie). En claro, el dorado frente a `orient-50` mide 1,34:1; el botón se identifica por su texto (12,43:1). Felipe edita `DESIGN.md` 7.3 y 7.9 (ADR-033).
- **Origen:** E200-I04, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- En claro, el botón dorado se distingue del fondo sobre todo por su tono y su texto, no por el contraste de superficie (1,34:1). Si en la preview no destaca lo suficiente, se consulta a Felipe antes de agregar un borde `gold-deep` o cambiar a la variante primaria solo en claro.
- En pantallas táctiles no hay hover: la flecha aparece solo con foco de teclado; es el comportamiento esperado.
- La frase depende de datos ya publicados en el sitio; no agrega afirmaciones nuevas.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

## Avance
- **25-11-2026 (local):** frase A, botón dorado, flechas (→ interna y correo; ↗ en LinkedIn, GitHub y REUF; `aria-hidden`; 6 px; quieta con movimiento reducido), «Correo electrónico» / «Email» desde `footer.email` e ícono `arrow-outward` en `icons.ts`. `social-links.ts` deja sin etiqueta el correo (el riel del hero ya usaba la suya). `verify:seo` con 3 controles nuevos (1195/1195; la mutación del correo y del botón hace fallar 2). Revisión local en Inicio, Contacto y 404 (es y en; 320, 360, 768, 1.366 y 1.920 px; claro y oscuro): sin desbordes; el dorado destaca en ambos temas. **No se cumple** «frase en 3 líneas o menos desde 768 px»: 6 líneas a 768 y 3 desde 1.280 (AT-160, lo decide Felipe). ADR-112 registrado.
- **Cierre (25-11-2026):** Felipe elige la opción 1 de AT-160 (criterio a 1.280 px), sube los bloques de `DESIGN.md` (7.3, 7.9 y línea 227), revisa el pie en la preview en es y en y valida el inglés (ADR-017). E200-I04 terminada.
