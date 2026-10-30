# Auditoría técnica del sitio actual (referencia)

- **Fecha:** 28-09-2026.
- **Fuente auditada:** repositorio `ffelipecuevasc/cv`, rama `main`, commit `b49a5bb` (26-09-2026), en solo lectura.
- **Mediciones:** el hero se midió con Chromium sin cabeza sobre un servidor local. Se usó la fuente de respaldo porque Google Fonts no era accesible desde el entorno de auditoría.
- **Archivos excluidos:** `README.md`, `DESIGN.md` y `AGENTS.md` antiguos no se auditaron.

**Reglas del archivo:**
- Es de **solo agregar**. Los hallazgos resueltos se marcan como resueltos, indicando la iteración o ADR que los cerró; nunca se borran.
- Los hallazgos nuevos continúan la numeración desde AT-064.
- Todas las rutas y líneas citadas se refieren a `main` y se consultan con `git show main:<ruta>`.

Severidades: Crítica · Alta · Media · Baja. Estados: Abierto · Resuelto (con referencia).

---

## A. Inventario

- **Páginas (13):** `index.html` (919 líneas), `educacion.html` (640), `experiencia.html` (583), `desarrollador.html` (1.194), `docente.html` (699), `instructor.html` (940), `talento-digital.html` (768), `eventos.html` (363), `foro.html` (479), `recursos.html` (487), `contacto.html` (539), `agradecimiento.html` (372) y `404.html` (362).
- **JavaScript (ES modules, sin bundler):**
  - `static/js/paginas/*` (puntos de entrada);
  - `static/js/servicios/*` (tema, navegación, animación, resiliencia, reactividad, renderizado, filtros, sitio);
  - `static/js/datos/*` (contenido) y `static/js/config/*` (presentación);
  - motores: `hero.js`, `maquina-escribir.js`, `testimonios.js`, `portafolio.js`, `certificaciones.js`, `formacion.js`, `eventos.js`, `rutas.js`, `relatoria.js`, `comunidad.js`, `contacto.js`;
  - AOS vendorizado en `static/js/aos.js`.
- **CSS:**
  - `static/css/index.css` (736 líneas, fuente);
  - `static/css/tailwind.css` (84 KB, compilado y versionado);
  - `static/css/aos.css` (26 KB).
- **Imágenes:**
  - 10 SVG propios en `static/img/`;
  - 32 íconos SVG en `static/img/iconos/`;
  - 44 imágenes raster (webp y png) en `static/img/`, `logos/`, `portafolio/`, `testimonios/` y `eventos/`.
- **Descargables:**
  - `static/CV_Felipe_Cuevas_2026.pdf`;
  - `static/Certificado_REUF_Aprobados_Felipe_Cuevas_2026.pdf`;
  - 17 archivos en `static/recursos/` (PDF, TXT, YML), el mayor de 12 MB.
- **`package.json`:**
  - scripts `dev`, `serve`, `build`, `clean` y `verify` (linkinator);
  - devDependencies: tailwindcss ^3.4.19, @tailwindcss/forms, @tailwindcss/container-queries, http-server, linkinator, rimraf;
  - dependencies: aos ^2.3.4;
  - `engines.node` 24.16.0.
- **Tailwind:** `tailwind.config.js` con `darkMode: "class"`, paleta `orient` (50 a 950), `primary` #007EA7, `primary-vibrant` #00B0E8, `accent-gold` #f8cd46 y fuente `display` Lexend.
- **Despliegue:**
  - Cloudflare Pages por integración Git;
  - `_redirects` (2 reglas);
  - `functions/api/contacto.js` (Pages Function);
  - sin `_headers`, sin configuración de Wrangler y sin workflows de GitHub.
- **SEO:** `robots.txt`, `sitemap.xml` con 11 URLs, favicon `static/img/favicon.svg`; sin manifest.
- **Otros:**
  - `.claude/settings.json`;
  - `linkinator.config.json`;
  - `docs/linea-base/2026-08-12/resumen-lighthouse.md`;
  - `.idea/.gitignore`.

## B. Duplicación

### AT-002 · Armazón duplicado a mano en 13 páginas
- **Severidad:** Alta · **Estado:** Resuelto en E30-I06 (`BaseLayout` incluye `<head>`, navbar, menú móvil, pie y volver arriba; las páginas solo pasan su contenido) · **Resuelve:** E30-I01, E30-I04, E30-I05, E30-I06
- **Evidencia:** `<head>`, `<header>`, menú móvil, `<footer>` y botón volver arriba repetidos en los 13 HTML. Comparación normalizada: los headers solo difieren en el estado activo (`aria-current`), y el pie es idéntico en las 13.
- **Impacto:** cada cambio global exige 13 ediciones, con riesgo de divergencia.
- **Recomendación:** layout y componentes compartidos de Astro.
- **Avance (E30-I01):** el `<head>` vive solo en `BaseLayout.astro` y `Seo.astro`. Sigue abierto: header, menú móvil, pie y volver arriba (E30-I04 a E30-I06).
- **Avance (E30-I04):** el `<header>` con la navbar de escritorio vive solo en `Navbar.astro`, incluido por `BaseLayout`. Sigue abierto: menú móvil (E30-I05), pie y volver arriba (E30-I06).
- **Avance (E30-I05):** el menú móvil (`MobileMenuButton.astro` y `MobileMenuPanel.astro`) también vive en el layout y comparte la estructura de `nav-items.ts` con escritorio. Sigue abierto: pie y volver arriba (E30-I06).
- **Avance (E30-I06):** el pie (`Footer.astro`) y el botón de volver arriba (`BackToTop.astro`) viven en `BaseLayout`. Cierra el hallazgo; las páginas que faltan (incluida la 404, E160-I01) usan el mismo layout.

### AT-040 · Script en línea del `<head>` duplicado
- **Severidad:** Media · **Estado:** Resuelto en E20-I04 (movimiento sin guardián, ADR-045) y E30-I01 (script de tema único en `BaseLayout.astro`) · **Resuelve:** E30-I01, E20-I04
- **Evidencia:** `index.html` `<head>`. Hay un guardián que revela todo a los 1.500 ms si AOS no arranca y un script de tema anti-parpadeo, repetidos en cada página.
- **Impacto:** mantenimiento duplicado; el guardián existe solo por AOS.
- **Recomendación:** un único script de tema en el layout y un sistema de movimiento que no necesite guardián.

## C. Logotipo (debe preservarse)

**Comportamiento documentado:**
- **Ícono:** `static/img/favicon.svg` (48×48, `viewBox="-2 -2 52 52"`). Es una ventana de terminal con barra superior, dos puntos y chevrons `< >`, definida como máscara. Se pinta con un `div` de 32×32 px (`w-8 h-8`) usando `mask-image` y color de fondo `orient-600` (#00678A) en claro y `orient-400` (#0096C7) en oscuro, con transición de color de 300 ms (`index.html:287-289`).
- **Texto:** `<span data-maquina="logotipo">` con "Felipe Cuevas", `text-xl`, `font-bold`, `tracking-tight`, fuente Lexend, color `orient-950` (#00131D) en claro y blanco en oscuro. La separación con el ícono es `gap-3` (12 px) (`index.html:290-292`).
- **Efecto máquina de escribir:** no usa tipografía monoespaciada; es un efecto de tecleo sobre Lexend. Está implementado en `static/js/maquina-escribir.js`, `static/js/config/maquina-escribir.config.js` y `static/js/datos/maquina-escribir.datos.js`, con estilos en `static/css/index.css` (sección 18, líneas 596–676).
  - **Frases, en orden circular:** "Felipe Cuevas", "Instructor Dev", "Dev Full Stack", "Instructor IA". La primera debe coincidir con el marcado.
  - **Ritmo del logotipo:** arranque 1.400 ms; escritura 84 ms más variación aleatoria de 0 a 34 ms por carácter; borrado 42 ms por carácter; espera con la frase completa 3.600 ms; espera vacía 500 ms.
  - **Estructura:**
    - un `span.sr-only` con el nombre fijo, que es el nombre accesible;
    - un `span` invisible con la frase más larga, que reserva el ancho para que el CLS sea 0;
    - un `span` visible con el texto tecleado (`aria-hidden`);
    - todo con `white-space: nowrap`.
  - **Cursor:** pseudo-elemento de 0,07 em × 0,95 em en `currentColor`. Parpadea con 1,05 s `steps(1, end)` y queda fijo mientras se teclea.
  - **Pausa:** se detiene con la pestaña oculta (`visibilitychange`) o fuera de pantalla (IntersectionObserver).
- **`prefers-reduced-motion`:** el motor no arranca (`movimientoReducido()` en `static/js/servicios/animacion.js:24`), y una regla CSS deja el cursor fijo como segunda red. Sin JavaScript, el texto se ve estático.
- **Dependencias:** ninguna externa, salvo la fuente Lexend desde Google Fonts.

### AT-003 · Logotipo sin animación en la 404
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E30-I03, E160-I01
- **Evidencia:** `404.html:87`, el `span` del logotipo no tiene `data-maquina="logotipo"`.
- **Impacto:** comportamiento inconsistente del logotipo.
- **Recomendación:** un único componente de logotipo para todas las páginas.
- **Avance (E30-I03):** un único componente `Logo.astro` en `BaseLayout`, con el mismo motor en todas las páginas que usan el layout. Sigue abierto hasta que la 404 por idioma use el layout (E160-I01).

### AT-009 · El logotipo no es un enlace
- **Severidad:** Baja · **Estado:** Resuelto en E30-I03 (enlace a la portada del idioma activo, P-03 aceptada en ADR-049) · **Resuelve:** E30-I03 (según P-03)
- **Evidencia:** el logotipo está envuelto en un `div` (`index.html:286`).
- **Impacto:** convención de usabilidad no cumplida.
- **Recomendación:** convertirlo en enlace a la portada del idioma activo si Felipe aprueba P-03.

## D. Barra de navegación actual

**Opciones exactas (idénticas en las 13 páginas):**
- **Escritorio:** Inicio (`index.html`) · Educación (`educacion.html`) · **Experiencia ▾** (botón con `aria-haspopup`, panel `#menu-experiencia`, `index.html:306`) con Resumen (`experiencia.html`), Desarrollador, Docente Universitario, Instructor REUF y Talento Digital · **Comunidad ▾** (panel `#menu-comunidad`) con Eventos, Foro y Recursos · Contacto. Además, el llamado a la acción "Descargar CV" (`index.html:345`).
- **Móvil:** botón hamburguesa `#mobile-menu-btn`. El menú `#mobile-menu` (`index.html:350`, con `inert` cuando está cerrado) contiene: Inicio, Educación, rótulo "Experiencia" (Resumen, Desarrollador, **Docente**, Instructor REUF, Talento Digital), rótulo "Comunidad" (Eventos, Foro, Recursos), Contacto y Descargar CV.
- **Estado activo:** `aria-current="page"` estático en el enlace hijo; el disparador padre recibe estilo de pastilla.

### AT-007 · El botón de apariencia está en el pie
- **Severidad:** Media · **Estado:** Resuelto en E30-I04 (botón de apariencia en la barra, `ThemeToggle.astro`) · **Resuelve:** E30-I04
- **Evidencia:** `#theme-toggle` en el pie (`index.html:898`).
- **Impacto:** no cumple D-08, que lo exige en la barra.
- **Recomendación:** ADR-021.

### AT-008 · Etiquetas inconsistentes entre menús
- **Severidad:** Media · **Estado:** Resuelto en E30-I06 (menú de escritorio, menú móvil y pie leen las mismas etiquetas de `nav-items.ts`; el pie incluye Recursos) · **Resuelve:** E30-I05, E30-I06
- **Evidencia:**
  - el menú móvil dice "Docente" (`index.html:360`) y escritorio "Docente Universitario";
  - la columna Explorar del pie usa "Certificaciones" para `educacion.html` (`404.html:261`) y "Experiencia" para `experiencia.html`, y no incluye Recursos.
- **Impacto:** confusión y traducción inconsistente.
- **Recomendación:** etiquetas únicas desde el diccionario de interfaz.
- **Avance (E30-I04):** las etiquetas del menú de escritorio salen del diccionario (`src/i18n/ui.ts`), con "Docente Universitario" como etiqueta única. Sigue abierto: menú móvil (E30-I05) y pie (E30-I06) deben usar las mismas claves.
- **Avance (E30-I05):** el menú móvil usa las mismas etiquetas que escritorio ("Docente Universitario") desde `nav-items.ts` y el diccionario. Sigue abierto: la columna de navegación del pie (E30-I06).
- **Avance (E30-I06):** el pie usa los 11 enlaces de `nav-items.ts`, incluido Recursos, con las mismas etiquetas que la navbar. Cierra el hallazgo.

### AT-010 · Desplegables sin cierre con Escape
- **Severidad:** Media · **Estado:** Resuelto en E30-I04 (patrón de divulgación con `aria-expanded`, Escape con retorno de foco, clic y foco fuera cierran; `src/scripts/navbar.ts`) · **Resuelve:** E30-I04
- **Evidencia:** apertura por `group-hover` y `group-focus-within` de CSS; `static/js/servicios/navegacion.js:55-73` solo sincroniza `aria-expanded`.
- **Impacto:** accesibilidad de teclado incompleta.
- **Recomendación:** patrón de botón de divulgación con Escape y retorno de foco.

### AT-011 · Menú móvil con altura máxima fija
- **Severidad:** Baja · **Estado:** Resuelto en E30-I05 (panel sin tope en px: crece con el contenido y se desplaza con `max-height: calc(100dvh - 76px)`) · **Resuelve:** E30-I05
- **Evidencia:** `static/js/servicios/navegacion.js:28` agrega `max-h-[800px]`.
- **Impacto:** riesgo de cortar ítems al crecer el menú o el texto en inglés.
- **Recomendación:** altura sin tope fijo.

## E. Hero de la portada

**Elementos (todos se conservan salvo ADR):**
- rótulo "Ingeniero Informático";
- conmutador de 3 perfiles (`#hero-conmutador`, `role="tablist"`, oculto sin JavaScript, perfil recordado en `localStorage` con la clave `perfil-hero`);
- `<h1>` con tres titulares superpuestos (Instructor, Docente, Desarrollador), cada uno con máquina de escribir en su parte destacada (frases en `maquina-escribir.datos.js`);
- párrafo por perfil;
- dos llamados a la acción por perfil ("Conoce mis programas" / "Conoce mi experiencia docente" / "Revisa mi portafolio", y "Revisa mi CV");
- 3 métricas por perfil;
- retrato `static/img/felipe_cuevas.webp` (420×560, `fetchpriority="high"` y `preload`);
- franja de 3 certificaciones (Oracle, AWS, Python Institute);
- 5 redes (LinkedIn, GitHub, REUF en chilefacilitadores.cl, correo, Discord).

**Interacciones:**
- cambio de perfil con fundido;
- máquina de escribir gobernada por el perfil visible;
- efectos hover en retrato, credenciales y redes.

### AT-001 · El hero no cabe en escritorio sin scroll
- **Severidad:** Crítica · **Estado:** Resuelto en E40-I01 (30-10-2026): el hero completo (barra + hero + 4 certificaciones + redes) cabe en las 4 áreas visibles de ADR-016, en ambos temas, idiomas y perfiles (48 casos); margen mínimo de 11 px en 1366×638 · **Resuelve:** E40-I01
- **Evidencia (medida):**
  - en todos los anchos de escritorio medidos, la barra mide 73 px;
  - el bloque barra + hero + certificaciones + redes termina en ~1.052 px en tema claro y ~1.101 px en oscuro;
  - la mayor área visible de la matriz de ADR-016 es de 950 px;
  - causas: retrato 3:4 de 555 px de alto (`max-w-[420px]`), `py-20` de `main` (80 px arriba y abajo, `index.html:380`), franja de certificaciones bajo el retrato con `mt-10`, y la columna de texto con métricas y redes apiladas.
- **Impacto:** no cumple D-09.
- **Recomendación:** rediseño estructural de la composición, no ajuste de espaciados.

### AT-012 · Contenido de la portada fuera de `<main>`
- **Severidad:** Alta · **Estado:** Resuelto en E40-I02 (30-10-2026): hero, franja de cifras y testimonios están dentro del único `<main>` de la portada; un solo `<h1>` y encabezados sin saltos (h1, h2, h2) · **Resuelve:** E40-I02
- **Evidencia:** `</main>` en `index.html:654`; la franja `#expertitud-metricas` (`:661`) y la sección de testimonios (`:732`) quedan fuera.
- **Impacto:** landmarks incorrectos para tecnologías asistivas.
- **Recomendación:** todo el contenido principal dentro de `<main>`.

### AT-013 · Insignias del hero con carga diferida y sobredimensionadas
- **Severidad:** Media · **Estado:** Resuelto en E40-I01 (30-10-2026): insignias con carga normal, WebP de 40 px y 80 px (1 a 3 KB) desde fuentes de 160 px en `src/assets/insignias/` (ADR-054); E170-I02 solo vuelve a medir · **Resuelve:** E40-I01, E170-I02
- **Evidencia:** `index.html:405-407`, imágenes con `loading="lazy"` sobre el pliegue; PNG de 400×400 (`insignia_oracle.png` 163 KB) mostrados a 40 px.
- **Impacto:** peso innecesario y retraso visual.
- **Recomendación:** carga normal, formato moderno y tamaño acorde.

### AT-014 · Cifras inconsistentes de certificaciones
- **Severidad:** Media · **Estado:** Resuelto en E40-I01 (30-10-2026) para el hero: cifra derivada de `src/data/certifications.ts` con la regla de ADR-053 (hoy 11 → `+10`). La banda de Inicio (E40-I02, 30-10-2026) también la deriva de esa fuente, y el JSON-LD Person (E40-I03, 30-10-2026) genera `hasCredential` de ella (11 credenciales; `pnpm verify:seo` la compara con la cifra impresa) · **Resuelve:** E40-I01 (validación de Felipe)
- **Evidencia:** "Nueve certificaciones" (`index.html:527`), métrica "+10" (`:566`), franja "8+" (`:680`) y 9 credenciales en el JSON-LD Person.
- **Impacto:** credibilidad del CV.
- **Recomendación:** una sola cifra validada, derivada de los datos.

## F. Archivos excluidos

`README.md`, `DESIGN.md` y `AGENTS.md` del sitio actual quedan fuera del alcance y no se auditaron.

## G. Plan de Core Web Vitals

**Estado:**
- El archivo del proyecto (`Plan_de_Trabajo_-_felipecuevas_dev_-_SEP_2026.md`) es el plan de refactorización de septiembre. Sus etapas 0 a 6 están cerradas según el historial: commits `151ff75` (Etapa 1) a `c8e6a7a` (Etapa 6).
- El plan de CWV de agosto (Fases 0 a 5, hallazgos `H-01`…) está completado según Felipe, y producción vive con su resultado.

**Línea base de laboratorio (12-08-2026):**
- Rendimiento móvil de 53 a 58.
- Rendimiento de escritorio de 72 a 98.
- Accesibilidad de 91 a 96.
- Buenas prácticas de 77 (contacto) a 100.
- SEO de 91 a 92.

**Reexpresión en la arquitectura nueva:**
- La salida estática de Astro, las fuentes autoalojadas, los íconos SVG, el movimiento sin AOS, el CSS por página y la optimización de imágenes atacan las causas típicas del puntaje móvil.
- Los umbrales y la revisión de informes de Cloudflare quedan en ADR-015 y BL-01.

### AT-015 · Rendimiento móvil bajo en la línea base
- **Severidad:** Alta · **Estado:** Abierto · **Resuelve:** E170-I02
- **Evidencia:** `docs/linea-base/2026-08-12/resumen-lighthouse.md`, móvil entre 53 y 57 en casi todas las páginas (máximo 58, en `recursos.html`).
- **Impacto:** experiencia móvil y posicionamiento.
- **Recomendación:** medir el sitio nuevo contra ADR-015 y los informes de Cloudflare (BL-01).

### AT-035 · El plan cargado en el proyecto no es un plan de CWV con umbrales
- **Severidad:** Baja · **Estado:** Resuelto por ADR-015 (punto de control, 28-09-2026)
- **Evidencia:** el título del archivo del proyecto es "Plan de Trabajo — Refactorización felipecuevas.dev", sin umbrales de CWV.
- **Impacto:** la Definition of Done no tenía umbral explícito.
- **Recomendación:** umbrales fijados en ADR-015.

## H. Rendimiento, accesibilidad y SEO

### AT-006 · Sin hreflang ni metadatos por idioma
- **Severidad:** Alta · **Estado:** Resuelto en E40-I03 (30-10-2026) para la portada: metadatos y JSON-LD por idioma, `hreflang` y `x-default` verificados sobre `dist/`. Sitemap bilingüe (E180-I02) y comportamiento de `/` (E180-I03) siguen en sus iteraciones · **Resuelve:** E30-I01, E40-I03, E180-I02, E180-I03
- **Evidencia:** `lang="es"` (`index.html:3`), `og:locale` `es_CL` (`:14`), `inLanguage` `es-CL` (`:270`); no hay `hreflang` en ninguna página.
- **Impacto:** los buscadores no relacionarán las versiones de idioma.
- **Recomendación:** `hreflang` recíprocos con `x-default` (ADR-019).
- **Avance:** E10-I07 deja `lang="es-CL"` y `lang="en-US"` por página. Sigue abierto: faltan `hreflang`, `x-default` y metadatos por idioma.
- **Avance (E30-I01):** `hreflang` recíprocos es-CL / en-US con `x-default` a `/es/`, `og:locale` y `og:locale:alternate` por idioma. Sigue abierto: `inLanguage` del JSON-LD (E40-I03) y sitemap bilingüe (E180-I02).
- **Avance (E40-I03):** JSON-LD Person y WebSite por idioma con `@id` compartidos e `inLanguage` `es-CL` / `en-US`; metadatos Open Graph por idioma con imagen de 1200 × 630 px y texto alternativo por idioma (ADR-055). `pnpm verify:seo` comprueba 90 puntos sobre `dist/` sin red. Resta lo propio de E180: sitemap bilingüe, `robots.txt` y la 301 de `/`.

### AT-016 · Fuente de íconos completa
- **Severidad:** Media · **Estado:** Resuelto en E20-I03 (componente `Icon.astro` con SVG en línea; sin Material Symbols, ADR-043) · **Resuelve:** E20-I03
- **Evidencia:** `index.html:36` carga Material Symbols Outlined con ejes `wght` 100–700 y `FILL` 0–1, para ~57 íconos distintos.
- **Impacto:** peso y bloqueo de render.
- **Recomendación:** íconos SVG en línea.

### AT-017 · Lexend con 7 pesos desde Google Fonts
- **Severidad:** Media · **Estado:** Resuelto en E20-I03 (Lexend solo en 700, autoalojada con la API de fuentes; sin Google Fonts, ADR-043) · **Resuelve:** E20-I03
- **Evidencia:** `index.html:34`.
- **Impacto:** solicitudes a terceros y peso.
- **Recomendación:** autoalojar los pesos necesarios.

### AT-032 · Imagen Open Graph única y pesada
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E30-I01, E170-I02
- **Evidencia:** `static/img/felipe_cuevas_cv.png` (350 KB, 1920×1080) en todas las páginas, solo en español.
- **Impacto:** vista previa lenta y no localizada.
- **Recomendación:** imagen por idioma optimizada.
- **Avance (E30-I01):** `Seo.astro` acepta `ogImage` por idioma (opcional; sin ella no se emite imagen y Twitter usa `summary`). Sigue abierto: imágenes por idioma optimizadas (E170-I02).

### AT-033 · Imagen sin referencia
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E170-I02
- **Evidencia:** `static/img/logos/python_institute.png` no se referencia en HTML, JS ni CSS.
- **Impacto:** peso muerto.
- **Recomendación:** no migrarla.

### AT-037 · Título y encabezado inconsistentes en recursos
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E130-I01
- **Evidencia:** `<title>` "Rutas de Aprendizaje" (`recursos.html:7`) frente a `<h1>` "Bóveda de Recursos" (`recursos.html:267`).
- **Impacto:** señal de SEO confusa.
- **Recomendación:** alinear con Felipe.

### AT-038 · Eventos sin datos estructurados
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** backlog BL-03
- **Evidencia:** `eventos.html` no tiene JSON-LD.
- **Impacto:** oportunidad de resultados enriquecidos perdida.
- **Recomendación:** JSON-LD Event cuando se agende.

### AT-051 · Pares de color de los prototipos bajo el contraste AA
- **Severidad:** Media · **Estado:** Resuelto en E20-I01 (29-10-2026: tabla 4.4 recalculada, diferencia máxima 0,04; ningún par bajo AA) · **Resuelve:** E20-I01 (tokens corregidos en `DESIGN.md` v1, ADR-040)
- **Evidencia (calculada el 29-10-2026 con la fórmula de WCAG 2.2, componiendo la transparencia):**
  - claro: `#00131D` al 55 % sobre blanco (4,20:1) y sobre `#E4F3FF` (4,06:1), y al 50 % (3,57:1 y 3,47:1), en texto de 11,5 a 14 px (`prototipos/felipe-cuevas-ia.html:121`, `:209`, `:327`, `:450`);
  - claro: contorno de foco `#00B0E8` sobre blanco (2,51:1, se exige 3:1) (`:101`);
  - claro: estrellas `#F8CD46` con trazo `#D9AE2C` sobre blanco (1,52:1 y 2,09:1) (`:318`);
  - oscuro: texto blanco sobre avatar `#0096C7` (3,39:1) en 14 px (`prototipos/felipe-cuevas-ia-oscuro.html:324`).
- **Impacto:** incumplimiento de WCAG 2.2 AA (1.4.3 y 1.4.11) si se copian tal cual.
- **Recomendación:** opacidad mínima del 60 % para texto, foco `primary` en claro, trazo `gold-deep` en las estrellas y avatares sin `orient-400` (ADR-040).

### AT-052 · Controles de los prototipos bajo la zona táctil mínima
- **Severidad:** Baja · **Estado:** Resuelto en E20-I05 (`Button` mide 46 px y 44 px en la barra, `IconButton` 44 × 44 y la flecha 54 × 54; verificado en Chrome en ambos temas e idiomas, ADR-046) · **Resuelve:** E20-I05 (especificado en `DESIGN.md` v1, 7.2 y 7.3)
- **Evidencia:** el botón de apariencia (`.icon-btn`), el selector de idioma (`.lang`) y "CV (PDF)" (`!h-10`) miden 40 px de alto (`prototipos/felipe-cuevas-ia.html:53`, `:55`, `:131`).
- **Impacto:** `DESIGN.md` 7 exige una zona táctil de al menos 44 px.
- **Recomendación:** 44 × 44 px como mínimo en todos los controles.

### AT-053 · Selector de idioma de los prototipos como botones
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E30-I04 (especificado en `DESIGN.md` v1, 7.2)
- **Evidencia:** el selector usa dos `<button>` con `aria-pressed` (`prototipos/felipe-cuevas-ia.html:135-138`).
- **Impacto:** ADR-001 exige que el cambio de idioma lleve a la página equivalente; un botón no es un enlace ni expone el destino.
- **Recomendación:** enlace a la ruta equivalente con `hreflang` y `lang`, e idioma actual marcado con `aria-current`.

## I. Dependencias externas

**Equivalentes en Astro:**
- AOS → movimiento propio (E20-I04).
- Google Fonts → fuente autoalojada (E20-I03).
- Material Symbols → SVG (E20-I03).
- Turnstile, Calendly y Giscus se mantienen (E140, E120).
- No se detectó analítica en el HTML. Si existe analítica de Cloudflare inyectada a nivel de zona, no fue verificada.

### AT-018 · AOS sin mantenimiento
- **Severidad:** Media · **Estado:** Resuelto en E20-I04 (utilidad propia `reveal.ts` con IntersectionObserver y CSS, sin dependencias; ADR-045) · **Resuelve:** E20-I04
- **Evidencia:** última publicación de `aos` en npm el 13-06-2022; vendorizado en `static/js/aos.js` y `static/css/aos.css` (26 KB), y además declarado en `package.json:28` sin usarse desde `node_modules`.
- **Impacto:** deuda y peso.
- **Recomendación:** reemplazo sin dependencias.

### AT-019 · Tailwind 3 con configuración JS y plugins
- **Severidad:** Media · **Estado:** Resuelto en E20-I02 (tokens de `DESIGN.md` en `@theme` de `src/styles/global.css`; antes, E10-I03 sin `tailwind.config.js`, ADR-029) · **Resuelve:** E10-I03, E20-I02
- **Evidencia:** `package.json:25` (tailwindcss ^3.4.19), `tailwind.config.js` (content `./*.html` y `./static/js/**/*.js`), plugins `forms` y `container-queries`; CSS compilado versionado.
- **Impacto:** no aplica al proyecto nuevo.
- **Recomendación:** Tailwind v4 con tokens en `@theme` (ADR-004).

### AT-020 · npm y versión de Node fija
- **Severidad:** Media · **Estado:** Resuelto en E10-I02 (ADR-028) · **Resuelve:** E10-I02
- **Evidencia:** `package-lock.json`; `package.json:6` fija `"node": "24.16.0"`.
- **Impacto:** contradice D-03.
- **Recomendación:** ADR-003.

### AT-041 · Node 26 pasará a LTS durante el proyecto
- **Severidad:** Media · **Estado:** Resuelto en E10-I02 por ADR-027 (migración a Node 26 agendada en BL-02) · **Resuelve:** backlog BL-02
- **Evidencia:** nodejs.org al 28-09-2026: v24 LTS (24.21.0); v26 en fase Current desde mayo de 2026.
- **Impacto:** la "Active LTS vigente" cambiará.
- **Recomendación:** reevaluar con ADR nuevo cuando ocurra.

### AT-050 · Dependencias externas y contenido ficticio en los prototipos
- **Severidad:** Media · **Estado:** Resuelto en E20-I01 y E20-I03 (`DESIGN.md` 12 documenta las exclusiones; los prototipos no llegan a `dist/` y Prettier, ESLint y Tailwind no los procesan); y E20-I03 verificó cero solicitudes externas en `dist/` (fuentes en `_astro/fonts`) · **Resuelve:** E20-I01 (documentado en `DESIGN.md` v1, 12) y E20-I03 (verificación de cero solicitudes externas)
- **Evidencia:** los prototipos cargan Cinzel y Josefin Sans desde Google Fonts (`prototipos/felipe-cuevas-ia.html:9-11`), Tailwind Play CDN 3.4.17 con configuración en línea (`:12-28`) y un retrato de Unsplash (`:174`). Sus textos, cifras, empresas, correo y testimonios son ficticios (por ejemplo `:153`, `:194`, `:390`).
- **Impacto:** copiarlos contradiría E20-I03, ADR-004 y ADR-029, y publicaría contenido falso.
- **Recomendación:** tomar de los prototipos solo el diseño; contenido desde `main`, Tailwind 4 local y fuentes autoalojadas (ADR-041).

## J. Internacionalización

### AT-026 · Texto incrustado en JavaScript y funciones
- **Severidad:** Alta · **Estado:** Abierto · **Resuelve:** E30-I02 y cada épica de página
- **Evidencia (estimación heurística):**
  - ~2.000 palabras en `static/js/datos/*` y `config/*`: testimonios 459, recursos 428, formación 272, rutas 217, certificaciones 196, portafolio 155, eventos 107, entre otros;
  - ~170 palabras en `functions/api/contacto.js`;
  - mensajes en `static/js/servicios/*` y `contacto.js`;
  - ~3.300 palabras en el HTML (el `<main>` más ~81 del armazón), más `aria-label`, `alt` y `placeholder`.
- **Impacto:** ~5.800 palabras por traducir; riesgo de dejar textos sin traducir.
- **Recomendación:** modelo de contenido bilingüe con validación de paridad (E30-I02).
- **Avance (E30-I02):** modelo bilingüe con `localized()` en `src/content.config.ts`: una entrada sin uno de los idiomas hace fallar `pnpm build`; diccionario tipado del armazón en `src/i18n/ui.ts`. Sigue abierto: migrar los textos de `static/js/datos/`, `config/` y de la función de contacto en cada épica de página.

### AT-027 · Giscus con idioma fijo
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E120-I01
- **Evidencia:** `static/js/config/comunidad.config.js:17` (`idioma: "es"`); término `foro-general` en `foro.html:289`.
- **Impacto:** interfaz en español dentro de `/en/`.
- **Recomendación:** idioma por página y término compartido (ADR-022).

### AT-028 · Claves de `localStorage` que deben conservarse
- **Severidad:** Media · **Estado:** Abierto (parcial: `theme` en E30-I01 y `perfil-hero` en E40-I01; falta `rutas-progreso`, E130-I01) · **Resuelve:** E30-I01, E40-I01, E130-I01
- **Evidencia:** `theme` (`static/js/servicios/tema.js`), `perfil-hero` (`static/js/config/perfiles.config.js:10`) y `rutas-progreso` (`static/js/config/rutas.config.js:10`).
- **Impacto:** los visitantes perderían sus preferencias y su progreso.
- **Recomendación:** ADR-023.
- **Avance (E30-I01):** la clave `theme` se conserva con los mismos valores (`dark`/`light`) en el script de tema. Siguen `perfil-hero` (E40-I01) y `rutas-progreso` (E130-I01).
- **Avance (E40-I01, 30-10-2026):** `perfil-hero` se conserva con los mismos valores (`instructor`, `docente`, `desarrollador`) y `?perfil=` se lee y se refleja con `replaceState`; `?perfil=` prevalece sobre la clave y un valor inválido se ignora. Falta `rutas-progreso` (E130-I01).

### AT-034 · Descargables pesados y solo en español
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E130-I02, BL-04
- **Evidencia:** `static/recursos/python/taller-despliegue-plataforma-google-cloud.pdf` (12 MB), `static/recursos/empleabilidad/manual-optimizar-perfil-linkedin.pdf` (6,1 MB); CV y certificado REUF solo en español.
- **Impacto:** experiencia en `/en/` y consumo de datos.
- **Recomendación:** aviso de idioma y peso visible (ADR-017).

## K. Tema claro/oscuro

**Existe hoy:**
- estrategia de clase `dark` en `<html>`;
- preferencia guardada en `localStorage` con la clave `theme`, con respaldo en `prefers-color-scheme`;
- script en línea en el `<head>` para evitar parpadeo, protegido ante almacenamiento bloqueado;
- servicio `static/js/servicios/tema.js`, que emite el evento `tema:cambiado` (lo usa Giscus);
- transición de 400 ms con la clase `theme-transitioning`;
- botón "Apariencia" en el pie.

**Cobertura:** AT-007 y AT-040.

## L. Migración de URLs y SEO

**Mapa de URLs (las URLs actuales son rutas limpias; también responden con `.html`):**

| URL actual | Nueva `es-CL` | Nueva `en-US` |
|---|---|---|
| `/` | `/es/` | `/en/` |
| `/educacion` | `/es/educacion` | `/en/education` |
| `/experiencia` | `/es/experiencia` | `/en/experience` |
| `/desarrollador` | `/es/desarrollador` | `/en/developer` |
| `/docente` | `/es/docente` | `/en/lecturer` |
| `/instructor` | `/es/instructor` | `/en/instructor` |
| `/talento-digital` | `/es/talento-digital` | `/en/talento-digital` |
| `/eventos` | `/es/eventos` | `/en/events` |
| `/foro` | `/es/foro` | `/en/forum` |
| `/recursos` | `/es/recursos` | `/en/resources` |
| `/contacto` | `/es/contacto` | `/en/contact` |
| `/agradecimiento` (noindex) | `/es/agradecimiento` | `/en/thank-you` |
| `/comunidad`, `/comunidad.html` | `/es/foro` (301 directo, sin cadena) | — |
| 404 | 404 por idioma | 404 por idioma |
| `/static/...` (PDF, TXT, YML, imágenes enlazables) | misma ruta | misma ruta |

**Reglas:**
- Cada URL actual y su variante `.html` responden 301 a su versión `/es/`, en un solo salto.
- `/` responde 301 a `/es/` (ADR-019).
- `hreflang` recíprocos con `x-default` a `/es/`.
- Canónica propia por idioma.
- Sitemap bilingüe generado en el build.

### AT-004 · La 404 usa rutas relativas
- **Severidad:** Alta · **Estado:** Abierto · **Resuelve:** E160-I01
- **Evidencia:** `404.html:37` (`static/css/tailwind.css`) y `:98` (`index.html`) son relativas.
- **Impacto:** en una ruta inexistente anidada (por ejemplo `/a/b`) los estilos y enlaces fallan; será más frecuente con `/es/` y `/en/`.
- **Recomendación:** rutas absolutas y 404 por idioma.

### AT-005 · Enlaces internos con `.html` frente a canónicas limpias
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E30-I02, E180-I01
- **Evidencia:** la navegación enlaza `index.html`, `educacion.html`… (`404.html:98`), mientras canónicas y sitemap usan rutas sin `.html`.
- **Impacto:** posible salto de redirección en cada navegación interna (no verificado en producción).
- **Recomendación:** enlaces internos siempre a la ruta canónica.
- **Avance (E30-I02):** el mapa de rutas (`src/i18n/routes.ts`) genera todas las rutas internas con barra final y sin `.html`, y el build falla si alguna lleva `.html`; en `dist/` no queda ningún `href` con `.html`. Sigue abierto: 301 de las URL antiguas con `.html` (E180-I01).

### AT-030 · Sitemap manual y desactualizado
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E180-I02, E150-I01
- **Evidencia:** `sitemap.xml:5` (`lastmod` 2026-08-13), sin alternativas de idioma; `robots.txt:5` bloquea `/agradecimiento`.
- **Impacto:** señales de SEO desactualizadas.
- **Recomendación:** sitemap generado con `hreflang`.

### AT-031 · Redirección existente que debe preservarse
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E180-I01
- **Evidencia:** `_redirects` contiene `/comunidad.html → /foro` y `/comunidad → /foro` (301).
- **Impacto:** enlaces compartidos antiguos.
- **Recomendación:** redirigir directo a `/es/foro`, sin cadena.

### AT-043 · Rutas públicas de descargables
- **Severidad:** Alta · **Estado:** Abierto · **Resuelve:** E90-I01, E130-I02, E180-I01
- **Evidencia:** `static/CV_Felipe_Cuevas_2026.pdf`, `static/Certificado_REUF_Aprobados_Felipe_Cuevas_2026.pdf` y `static/recursos/**`, enlazados desde el sitio y probablemente compartidos fuera de él (no verificado).
- **Impacto:** enlaces externos rotos tras el cutover.
- **Recomendación:** servirlos desde las mismas rutas en `public/static/`.

## M. Seguridad y privacidad básica

**Estado actual:**
- **Destino del formulario:** `POST` a `functions/api/contacto.js`. La función valida Turnstile en el servidor y envía con la API de correo de Cloudflare.
- **Secretos:** se leen de variables de entorno (`CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY`, `CONTACTO_DESTINO`). No hay claves privadas en el repositorio.
- **Clave pública:** la de Turnstile está en `contacto.html:327`, lo que es correcto.

### AT-021 · Permisos del agente contradicen las decisiones nuevas
- **Severidad:** Alta · **Estado:** Resuelto en E10-I06 (27-10-2026): `.claude/settings.json` nuevo con PNPM permitido y commit, push, merge, npm, yarn, bun y npx denegados (ADR-033) · **Resuelve:** E10-I06
- **Evidencia:** `.claude/settings.json` permite `Bash(npm run build)` y deja `git commit` en `ask`.
- **Impacto:** contradice D-03 y D-12.
- **Recomendación:** reemplazarlo (E10-I06).

### AT-022 · Política de `.idea/` incoherente
- **Severidad:** Baja · **Estado:** Resuelto en E10-I05 (ADR-031) · **Resuelve:** E10-I05
- **Evidencia:** `.gitignore:22` ignora `.idea/`, pero `.idea/.gitignore` está versionado.
- **Impacto:** configuración ambigua del IDE.
- **Recomendación:** ADR de versionado de `.idea/`.

### AT-023 · Sin cabeceras de seguridad propias
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E170-I03
- **Evidencia:** no existe `_headers`; configuración de zona no verificada.
- **Impacto:** sin CSP ni políticas de referer y permisos definidas por el proyecto.
- **Recomendación:** `_headers` con CSP compatible.

### AT-024 · Terceros y envío de nombres a un servicio externo
- **Severidad:** Media · **Estado:** Abierto (parcial: el respaldo de ui-avatars se retiró en E40-I02, 30-10-2026; faltan Calendly bajo demanda, E140-I01, y la CSP, E170-I03) · **Resuelve:** E140-I01, E40-I02, E170-I03
- **Evidencia:**
  - Calendly (`contacto.html:365`) carga su widget al abrir la página;
  - `static/js/servicios/resiliencia.js:39` envía el `alt` (nombre de la persona) a `ui-avatars.com` cuando falla una foto;
  - también se usan Turnstile, Giscus y Google Fonts.
- **Impacto:** privacidad y peso.
- **Recomendación:** Calendly bajo demanda y respaldo local sin terceros.

### AT-025 · Testimonios con datos personales
- **Severidad:** Media · **Estado:** Abierto (parcial: los 12 testimonios migraron al modelo bilingüe y `en-US` indica "Translated from Spanish", E40-I02, 30-10-2026; falta el consentimiento de uso de nombres y fotos, BL-06, pendiente de Felipe sin bloquear) · **Resuelve:** E40-I02, BL-06
- **Evidencia:** 12 fotos en `static/img/testimonios/` con nombres en `testimonios.datos.js`.
- **Impacto:** consentimiento por validar; la traducción altera citas de terceros.
- **Recomendación:** ADR-017 (indicación "traducido del español") y confirmación de consentimiento.

### AT-029 · Función de contacto ligada a Pages
- **Severidad:** Media · **Estado:** Abierto (plataforma resuelta en E10-I09 con ADR-037; la reescritura queda para E140-I02) · **Resuelve:** E10-I09, E140-I02
- **Evidencia:** `functions/api/contacto.js` usa el formato de Pages Functions; la guía oficial indica compilarla o reescribirla para Workers.
- **Impacto:** trabajo adicional según D-14; los secretos deben reconfigurarse.
- **Recomendación:** resolver D-14 antes de E140-I02.

### AT-047 · Sin política de privacidad ni consentimiento en el formulario de contacto
- **Severidad:** Alta · **Estado:** Abierto · **Resuelve:** E140-I01, E140-I02, E155-I01
- **Evidencia:**
  - el formulario `contacto.html:289-354` (`<form id="contacto-formulario" method="POST">`) pide datos personales (`nombre` en `:294`, `email` en `:300`, `asunto` en `:305` y `mensaje` en `:309`), con Turnstile en `:326` y el botón de envío en `:349`, pero no tiene checkbox de consentimiento ni enlace a una política;
  - el sitio actual no tiene página de privacidad: no hay archivo de privacidad en la raíz de `main` (`git ls-tree --name-only main`) y el pie (`contacto.html:376` en adelante) no la enlaza;
  - el sitio trata datos con terceros: Turnstile, Calendly, Giscus (GitHub) y almacenamiento local (AT-024, AT-028).
- **Impacto:** la Ley 21.719 entra en vigor el 1 de diciembre de 2026; sin política ni registro del consentimiento, el sitio no informa los tratamientos ni puede demostrar la aceptación.
- **Recomendación:** ADR-035 y épica E155 (política bilingüe con versión y fecha de vigencia), enlace en el pie, checkbox obligatorio en el formulario y registro del consentimiento en la función de envío. El texto lo valida un especialista externo antes del cutover.

## N. Riesgos de la migración

### AT-036 · El criterio antiguo para verificar AGENTS.md ya no sirve
- **Severidad:** Media · **Estado:** Resuelto en E10-I06 (27-10-2026): en Claude Code 2.1.311 la línea de arranque no es visible y la carga se confirmó preguntando al agente; en Antigravity ACP 1.3.0 la regla se observó activa, aunque su documentación oficial no confirma la lectura de `AGENTS.md` · **Resuelve:** E10-I06
- **Evidencia:** el plan de septiembre proponía verificar con `/memory`. Según el changelog de Claude Code 2.1.277 y la documentación del mod `agents-md`, `AGENTS.md` no aparece en `/memory` ni en `/context`.
- **Impacto:** falsa conclusión de que no se cargó.
- **Recomendación:** verificar con la línea de arranque o preguntando al agente (ADR-024).

### AT-039 · Estado de eventos dependiente de la fecha
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E110-I01
- **Evidencia:** `static/js/eventos.js` calcula "Próximo" o "Finalizado" comparando con la fecha actual.
- **Impacto:** con salida estática, calcularlo solo en el build dejaría estados obsoletos.
- **Recomendación:** estado base en el build y recálculo en el cliente.

### AT-042 · Previews de la sub-rama y configuración de producción
- **Severidad:** Media · **Estado:** Resuelto en E10-I09 (Worker separado, ADR-037) · **Resuelve:** E10-I09
- **Evidencia:** la configuración de compilación de Pages es por proyecto (no verificado en el panel de Felipe). El proyecto nuevo usa otro comando (`pnpm build`) y otro directorio de salida (`dist/`).
- **Impacto:** cambiar la configuración del proyecto Pages actual podría afectar las compilaciones de producción.
- **Recomendación:** proyecto de Cloudflare separado para la rama (propuesta P-01).

**Otros riesgos de convivencia de la rama con `main` hasta el cutover:**

| Riesgo | Mitigación |
|---|---|
| Contenido nuevo publicado en `main` durante la migración | Revisión con `git log main --not HEAD` en E190-I01 |
| Edición accidental de archivos antiguos | Regla de solo lectura en `AGENTS.md` |
| Escaneo de HTML antiguos por Tailwind | Fuentes restringidas a `src/` (E10-I03) |
| Pérdida de URLs | E180 |
| Regresión del logotipo | Especificación exacta en `DESIGN.md` y comparación lado a lado en E30-I03 |

### AT-044 · TypeScript 7 no es compatible con las herramientas de calidad
- **Severidad:** Baja · **Estado:** Abierto (mitigado en E10-I04) · **Resuelve:** se reevalúa en cada subida de versión
- **Evidencia:** al 27-10-2026, `typescript` 7.0.2 es la versión `latest`, pero `@astrojs/check` 0.9.12 declara peer `typescript ^5.0.0 || ^6.0.0` y `typescript-eslint` 8.72.x declara `typescript >=4.8.4 <6.1.0` (registry.npmjs.org).
- **Impacto:** instalar TypeScript 7 rompería `pnpm check` y `pnpm lint`.
- **Recomendación:** fijar `typescript` 6.0.3 (ADR-030) y subir a 7.x con un ADR nuevo cuando ambos paquetes lo admitan.

### AT-045 · Límites de las reglas `deny` de Claude Code
- **Severidad:** Media · **Estado:** Abierto (mitigado en E10-I06) · **Resuelve:** revisión continua; se reevalúa con cada cambio de `.claude/settings.json`
- **Evidencia:** las reglas `Bash(...)` y `PowerShell(...)` comparan el texto del comando por prefijo: variantes como `git -C . commit`, `cmd /c npm ...` o un script que invoque esos comandos no calzan con el patrón. `Edit(...)` no impide escribir el mismo archivo desde la shell. Las pruebas de E10-I06 corrieron con Claude Code en "auto mode on", donde un clasificador automático decide muchas aprobaciones que en el modo predeterminado pedirían confirmación. En la prueba de `npm --version`, el agente se negó por `AGENTS.md` y la regla `Bash(npm *)` no se ejercitó.
- **Impacto:** los permisos son una barrera de conveniencia, no de seguridad; en modo automático, acciones en `ask` (por ejemplo `pnpm add`, `git add` o `rm`) pueden ejecutarse sin que Felipe las confirme.
- **Recomendación:** trabajar en el modo de permisos predeterminado (no en modo automático) y mantener `AGENTS.md` como regla principal. Revisar `git status` antes de cada commit. No guardar secretos en la carpeta del proyecto.

### AT-046 · La redirección provisoria de `/` no es una 301
- **Severidad:** Media · **Estado:** Abierto (mitigado en E10-I07) · **Resuelve:** E180-I03
- **Evidencia:** `redirects: { '/': '/es/' }` en `astro.config.mjs` genera `dist/index.html` con `<meta http-equiv="refresh" content="0;url=/es/">`, `noindex` y canónica a `/es/`. Un sitio estático sin adaptador no emite códigos HTTP 301 desde Astro.
- **Impacto:** ADR-019 exige una 301. Si la rama se publica en producción sin E180-I03, `/` respondería 200 con meta refresh, lo que es más lento y menos claro para buscadores.
- **Recomendación:** en E180-I03, declarar la 301 de `/` en la plataforma que resuelva P-01 (por ejemplo `_redirects`), con consulta previa a Felipe, y decidir si se conserva el `dist/index.html` como respaldo.

### AT-048 · URL de workers.dev pública sin noindex verificado
- **Severidad:** Media · **Estado:** Abierto · **Resuelve:** E190-I01
- **Evidencia:** la documentación de Worker Previews (24-09-2026) indica que las URL son públicas por defecto y que las de *preview* envían `X-Robots-Tag: noindex`; no se verificó que la URL de producción del Worker en workers.dev (`felipecuevas-dev.<subdominio>.workers.dev`) envíe esa cabecera.
- **Impacto:** tras el cutover, el sitio quedaría duplicado en workers.dev y podría indexarse.
- **Verificación (28-10-2026):** `curl -I https://felipecuevas-dev.felipe-cuevas.workers.dev/es/` responde 200 **sin** `X-Robots-Tag`. `wrangler.jsonc` tiene `workers_dev: true` (URL activa a propósito hasta el cutover) y `preview_urls: false` (sin URL por versión, lo que reduce la superficie).
- **Recomendación:** en E190-I01, pasar `workers_dev` a `false` o asegurar `noindex` en esa URL, con consulta previa a Felipe.

### AT-049 · `public/.gitkeep` se publica en el sitio
- **Severidad:** Baja · **Estado:** Resuelto en E20-I03 (se eliminó `public/.gitkeep` y la carpeta vacía; las fuentes viven en `src/assets/fonts/`, y `dist/` ya no publica el archivo) · **Resuelve:** E20-I03 (primer archivo real en `public/`) o E170-I04
- **Evidencia:** `public/.gitkeep` (de E10-I02) se copia a `dist/.gitkeep`; `https://felipecuevas-dev.felipe-cuevas.workers.dev/.gitkeep` responde 200.
- **Impacto:** un archivo vacío e inútil queda público; sin riesgo de seguridad.
- **Recomendación:** borrar `public/.gitkeep` cuando `public/` tenga su primer archivo real (favicon o fuentes), o excluirlo de `assets` con un `.assetsignore` (consulta previa: es configuración de despliegue).

### AT-054 · Texto sobre las líneas de la retícula en la banda oscura bajo AA
- **Severidad:** Baja · **Estado:** Resuelto en E20-I03 (29-10-2026): retícula oscura al 5 % (`text-soft` 4,57) y `accent` sobre `band` solo en texto grande (4,42 ≥ 3), según `DESIGN.md` 4.3, 4.4 y 4.5; se agregó `--color-heading` (4.2 y 9) · **Resuelve:** por decidir con el asesor (corrección en `DESIGN.md` 4.4/4.5, ADR-033); se verifica en E20-I05 y E170-I01
- **Evidencia (E20-I02, 29-10-2026, fórmula de WCAG 2.2 componiendo la transparencia):** en oscuro, la banda es un degradado `orient-800` → `orient-925` con líneas `vibrant` al 8 % cada 48 px (`DESIGN.md` 4.5, `src/styles/global.css`, utilidad `texture-band`). Sobre una línea y en el punto más claro del degradado, `text-soft` da **4,41:1** y `accent` **4,20:1** (en liso, 4,86 y 4,80). El kicker dorado (6,93) y el blanco al 60 % (4,84) cumplen. En claro, `text-soft` sobre una línea de la retícula da 4,63 y cumple.
- **Impacto:** los píxeles de texto que caen sobre una línea de 1 px quedan bajo 4,5:1 (1.4.3). El efecto es local y pequeño, pero la tabla 4.4 no lo refleja.
- **Recomendación:** que el asesor elija una de estas opciones en `DESIGN.md`: bajar las líneas oscuras al 5 % (o menos), usar `orient-50` al 70 % como texto secundario dentro de la banda oscura, o limitar `accent` en la banda oscura a texto grande. El agente no cambia el token hasta que `DESIGN.md` lo indique.

### AT-055 · Tailwind v4 eliminaba variables de `@theme` sin uso en clases
- **Severidad:** Media · **Estado:** Resuelto en E20-I04 (`@theme static`, ADR-045) · **Resuelve:** E20-I04
- **Evidencia:** al probar la muestra en Chrome (E20-I04, 29-10-2026), la tabla de contrastes del tema claro mostraba 1,00 en `focus` y `gold-deep`. Tailwind v4 solo emite las variables de `@theme` que alguna clase usa, y esos tokens solo se leían desde estilos en línea y desde el script de la muestra. Las mediciones "en la muestra" de E20-I02 y E20-I03 quedaron incompletas por esto. Los valores calculados con script (E20-I01 a E20-I03) eran correctos.
- **Impacto:** un token usado solo en `style=""` o en JavaScript no existía en el CSS publicado.
- **Recomendación:** mantener `@theme static`. Tras la corrección, las 56 filas de la muestra cumplen en Chrome y coinciden con `DESIGN.md` 4.4 (diferencia máxima de 0,01).

### AT-056 · La muestra de tokens puede destellar en oscuro al cargar
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** por decidir (herramienta interna; candidata a E170-I01 o a su retiro antes de E190)
- **Evidencia (E30-I01, 29-10-2026):** `src/components/dev/DesignSample.astro` quita `.dark` de `<html>` en un script de módulo, que corre después del primer pintado. Con tema oscuro guardado o del sistema, el script de tema de `BaseLayout` pone `.dark` antes de pintar y la mitad "clara" de la muestra puede verse oscura un instante.
- **Impacto:** solo en la muestra interna (`noindex`); no afecta páginas del sitio.
- **Recomendación:** que la mitad clara declare sus tokens claros con una clase propia, o que la muestra indique al layout que no aplique el tema.

### AT-057 · DESIGN.md 3.2 nombra el token `text` con los valores de `heading`
- **Severidad:** Baja · **Estado:** Resuelto antes de E30-I04 (Felipe corrigió `DESIGN.md` 3.2 a `heading`) · **Resuelve:** edición de `DESIGN.md` por Felipe
- **Evidencia (E30-I03, 29-10-2026):** `DESIGN.md` 3.2 dice "Color `text` (`#00131D` en claro, `#FFFFFF` en oscuro)". En 4.2, `text` vale `orient-50` en oscuro; el semántico que da `#00131D` / `#FFFFFF` es `heading`.
- **Impacto:** ambigüedad en la fuente de verdad del diseño.
- **Recomendación:** cambiar `text` por `heading` en 3.2. Con la validación de Felipe, `Logo.astro` ya usa `heading` (ADR-049).

### AT-058 · DESIGN.md 5.1 y 9 aún nombran Lexend y `--font-logo`
- **Severidad:** Baja · **Estado:** Resuelto antes de E30-I04 (Felipe quitó Lexend y `--font-logo` de `DESIGN.md` 5.1 y 9) · **Resuelve:** edición de `DESIGN.md` por Felipe
- **Evidencia (E30-I03, 29-10-2026):** el logotipo pasó a Cinzel (3.2) y Lexend se retiró del proyecto (ADR-049), pero la tabla de 5.1 conserva la fila `font-logo` / Lexend, la frase "Las tres se autoalojan" y la sección 9 lista `--font-logo`.
- **Impacto:** `DESIGN.md` describe una familia que el sitio ya no carga.
- **Recomendación:** quitar la fila de 5.1, ajustar "Las tres" a "Las dos" y quitar `--font-logo` de 9.

### AT-059 · El CV no llega al build nuevo
- **Severidad:** Alta · **Estado:** Resuelto en E30-I05 (copia en `public/static/`, misma URL, ADR-050) · **Resuelve:** E30-I05
- **Evidencia (E30-I04, 29-10-2026):** "Descargar CV" enlaza a `/static/CV_Felipe_Cuevas_2026.pdf`, la ruta de producción, sin mover el archivo (encargo de E30-I04). El PDF sigue en `static/` del sitio antiguo y Astro no lo copia: `dist/static/` no existe. En las previews el enlace da 404.
- **Impacto:** tras el cutover, el CV no se descargaría si nadie lo incorpora al build.
- **Recomendación:** decidir dónde vive el PDF en el proyecto nuevo (por ejemplo `public/static/`, para conservar la URL y evitar una 301) y agendarlo antes de E190-I01.

### AT-060 · Botón de apariencia sin efecto sin JavaScript
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E170-I01
- **Evidencia (E30-I04, 29-10-2026):** el botón se muestra siempre para no causar CLS. Sin JavaScript no corre el script de tema: la página queda en claro y el clic en el botón no hace nada.
- **Impacto:** control visible que no responde para quien navega sin JavaScript.
- **Recomendación:** evaluar ocultarlo sin JS reservando su espacio (por ejemplo, con `<noscript>` y `visibility: hidden`), sin romper la CSP de E170-I03.

### AT-061 · DESIGN.md 7.2 no recoge dónde van tema e idioma bajo 420 px
- **Severidad:** Baja · **Estado:** Resuelto (edición de Felipe en `DESIGN.md` 7.2, 29-10-2026; recoge ADR-051) · **Resuelve:** edición de `DESIGN.md` por Felipe
- **Evidencia (E30-I05, 29-10-2026):** `DESIGN.md` 7.2 deja tema e idioma en la barra bajo 1.280 px. A 360 y 390 px no caben junto al logotipo y al botón de menú (la barra necesita unos 400 px). ADR-051 los pasa al final del panel bajo 420 px.
- **Impacto:** la fuente de verdad del diseño no describe el comportamiento real.
- **Recomendación:** agregar a 7.2 una frase: "Bajo 420 px, el botón de apariencia y el selector de idioma pasan al final del panel del menú". Si Felipe prefiere otra solución (por ejemplo, un logotipo más angosto), se sustituye ADR-051.

### AT-062 · El pie de escritorio es alto por la lista de 11 enlaces
- **Severidad:** Baja · **Estado:** Resuelto en E30-I07 (30-10-2026): el pie tiene 5 enlaces y mide 474 px (antes 738 px) de 768 a 1.920 px; ADR-057 · **Resuelve:** por decidir con Felipe (revisión en E170-I01)
- **Evidencia (E30-I06, 29-10-2026):** la columna de navegación apila los 11 enlaces con la zona táctil de 44 px y el pie mide unos 740 px a 1.280 px de ancho (la lista de enlaces mide unos 485 px). La marca y las redes ocupan menos de 300 px de alto, así que el resto de esas dos columnas queda vacío.
- **Impacto:** el pie ocupa casi toda una pantalla de 800 px de alto; es un asunto de proporción, no de funcionamiento.
- **Recomendación:** si Felipe lo prefiere más compacto, repartir la lista en dos columnas desde 1.024 px o agrupar por "Experiencia" y "Comunidad"; se registraría en `DESIGN.md` 7.9 y se ajustaría el componente.

### AT-063 · Estilos en línea en `<noscript>` para la futura CSP
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E170-I03
- **Evidencia (E30-I06, 29-10-2026):** `BaseLayout.astro` lleva un `<noscript><style>` con las reglas que dejan el menú móvil desplegado y el botón de volver arriba visible sin JavaScript (E30-I05 y E30-I06). Una política de seguridad que restrinja `style-src` puede bloquearlo.
- **Impacto:** si se bloquea, sin JavaScript el menú móvil no se podría abrir.
- **Recomendación:** al definir la CSP de E170-I03, incluir el hash de ese bloque, o mover las reglas a la hoja global con un selector que dependa de una clase puesta por un script en línea (que ya tiene hash por el tema).

### AT-064 · DESIGN.md: ajustes de 5.2 y 7.4 que dejó el hero
- **Severidad:** Baja · **Estado:** Resuelto (edición de Felipe en `DESIGN.md` 5.2 y 7.4, 30-10-2026) · **Resuelve:** edición de `DESIGN.md` por Felipe
- **Evidencia (E40-I01, 30-10-2026):**
  - 4.3 pone el signo "+" de las cifras en `gold` en oscuro y 7.4 dice "signo en `accent`" (en oscuro, `vibrant`). El hero sigue 4.3, que es la regla específica.
  - El h1 de 5.2 (tope 3,5 rem) no cabe en la matriz de ADR-016 en español: con la columna de texto de 680 px, "Docente Universitario en" pasa a dos líneas desde unos 46 px y el hero se pasa del área visible. El hero usa tope de 2,75 rem.
  - 7.4 no fija el tamaño de la cifra de las métricas ni su orden (rótulo arriba o abajo), ni su disposición bajo 640 px.
- **Impacto:** la fuente de verdad del diseño no coincide con lo implementado.
- **Recomendación:** incorporar el bloque que entrega la bitácora de E40-I01 a `DESIGN.md` 5.2 y 7.4.

### AT-065 · Cursor del titular del hero separado del texto si la frase se parte
- **Severidad:** Baja · **Estado:** Abierto (agendado en E170-I01 por decisión de Felipe, 30-10-2026) · **Resuelve:** E170-I01
- **Evidencia (E40-I01, 30-10-2026):** el cursor de la máquina de escribir se dibuja como fondo de la caja del texto (CLS 0). Si la frase destacada no cabe en una línea (a 360 px de ancho, por ejemplo "Programming Bootcamps"), la caja ocupa todo el ancho y el cursor queda al borde derecho, no al final de la última línea. En escritorio la frase cabe en una línea y el cursor queda pegado.
- **Impacto:** detalle visual en móvil; no afecta contenido ni CLS.
- **Recomendación:** revisar en un móvil real; si molesta, ocultar el cursor bajo 640 px o dibujarlo con un elemento en línea que no mueva nada.

### AT-066 · Script en línea del hero y la futura CSP
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E170-I03
- **Evidencia (E40-I01, 30-10-2026):** `Hero.astro` lleva un script en línea (`is:inline`) que elige el perfil (`?perfil=` y `perfil-hero`) y muestra el conmutador antes del primer pintado, para que no haya destello ni CLS. Una política de seguridad que restrinja `script-src` lo bloquearía.
- **Impacto:** con el script bloqueado, el módulo `src/scripts/hero.ts` hace la misma resolución, pero después del primer pintado: un visitante con otro perfil guardado vería un destello del Instructor y el conmutador aparecería desplazando el contenido.
- **Recomendación:** al definir la CSP de E170-I03, incluir el hash de este script, junto al del tema (AT-040) y al bloque `<noscript>` (AT-063).

### AT-067 · La cifra de certificaciones no filtra por vencimiento
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E50-I02
- **Evidencia (E40-I01, 30-10-2026):** `src/data/certifications.ts` guarda `expiresAt` en las 2 certificaciones nuevas (la primera vence el 30-10-2027), pero ADR-053 cuenta todas las entradas. El hero dice "vigentes".
- **Impacto:** desde el 30-10-2027 el sitio contaría una credencial vencida como vigente, salvo que se renueve o se quite.
- **Recomendación:** al ampliar los datos en E50-I02, decidir con Felipe si la cifra excluye las vencidas (el sitio es estático, así que la fecha se evaluaría al construir) o si basta actualizar los datos al renovar.

### AT-068 · DESIGN.md: ajustes de 7.6, 7.8 y 7.12 que dejó la franja de cifras y el carrusel
- **Severidad:** Baja · **Estado:** Resuelto (edición de Felipe en `DESIGN.md` 5.2, 7.6, 7.8, 7.12 y 9, 30-10-2026) · **Resuelve:** edición de `DESIGN.md` por Felipe
- **Evidencia (E40-I02, 30-10-2026):**
  - 5.2 fija la cifra en `clamp(2.2rem, 4.4vw, 3.4rem)`, pero con 5 columnas desde 1.024 px "+2.000" no cabe (a 1.024 px la cifra mediría 45 px). La banda usa `clamp(2.2rem, 3vw, 3rem)`.
  - 7.8 fija el rótulo `dt` en 12,5 px y 0,16 em; bajo 480 px, con 2 columnas de unos 140 px, "Certificaciones" desborda. Bajo 480 px usa 12 px y 0,1 em.
  - 7.12 pone el indicador de líneas siempre; con una tarjeta por página (bajo 768 px, 12 páginas) mide unos 340 px y no cabe junto a las flechas. Bajo 640 px queda solo el contador.
  - 7.12 no dice si las flechas dan la vuelta ni cuántas páginas hay según el ancho. Las flechas dan la vuelta (nunca se deshabilitan) y las páginas son 4 (3 tarjetas), 6 (2 tarjetas) o 12 (1 tarjeta).
  - 7.6 muestra el "programa" de cada testimonio, pero los datos de `main` no lo traen: la línea no se muestra.
  - 7.8 no fija los textos del encabezado de la banda ni de los testimonios: se usaron "Trayectoria profesional" / "Impacto medido" y "Testimonios" / "Lo que dicen mis alumnos" (y su equivalente en inglés), tomados del prototipo y del sitio actual.
- **Impacto:** la fuente de verdad del diseño no coincide con lo implementado.
- **Recomendación:** incorporar el bloque que entrega la bitácora de E40-I02 a `DESIGN.md` 5.2, 7.6, 7.8 y 7.12.

### AT-069 · Imagen Open Graph provisoria y común a los dos idiomas
- **Severidad:** Baja · **Estado:** Resuelto (30-10-2026): Felipe aportó la imagen `src/assets/og-portada.jpg` y reemplaza al recorte provisorio. Queda una nota de diseño (ver el cierre) · **Resuelve:** E170-I02 (con decisión de Felipe)
- **Evidencia (E40-I03, 30-10-2026):** el sitio antiguo usaba `static/img/felipe_cuevas_cv.png`, una captura de su propio hero con texto en español dentro de la imagen. No sirve para `en-US` y `DESIGN.md` 2.4 prohíbe texto dentro de imágenes. La portada usa `src/assets/og/og-home.jpg` (1200 × 630 px, 50 KB), un recorte del retrato sin texto, igual en `/es/` y `/en/`; solo cambia el `og:image:alt`. Es provisoria: el recorte deja el rostro a la izquierda y no lleva marca.
- **Impacto:** al compartir el enlace, ambos idiomas muestran la misma foto; se ve bien, pero no es una pieza de diseño.
- **Recomendación:** decidir con Felipe si basta el recorte o se diseña una imagen de marca (sin texto, o una por idioma). `DESIGN.md` no trata la imagen Open Graph: hay una sugerencia de bloque en la bitácora de E40-I03 (2.4).
- **Cierre (E40, 30-10-2026):** la imagen de Felipe (1424 × 752 px, 1,1 MB, JPEG) queda como fuente en `src/assets/og-portada.jpg`; `src/components/seo/home-og-image.ts` la optimiza en el build a 1200 × 630 px (unos 100 KB) con `astro:assets`, igual para `/es/` y `/en/`; el `og:image:alt` sigue por idioma. `pnpm verify:seo` comprueba ahora el tamaño real del archivo y que pese 300 KB o menos. Se eliminó `src/assets/og/og-home.jpg`.
  - **Nota de diseño:** la imagen lleva el nombre «Felipe Cuevas» y las insignias oficiales (AWS, Oracle, Python Institute, Claude), que son texto no traducible; no hay frases en español, así que sirve a los dos idiomas. Es una excepción razonable a «sin texto» de `DESIGN.md` 2.4: el bloque de la bitácora de revisión del inglés la recoge.
  - Las cuatro insignias de la imagen son una muestra, no los 11 certificados; si cambia el conjunto de emisores, la imagen es manual.

### AT-070 · `contactPoint.url` apunta a una página que aún no existe
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E140-I01
- **Evidencia (E40-I03, 30-10-2026):** el JSON-LD Person declara `contactPoint.url` como `https://felipecuevas.dev/es/contacto/` (y `/en/contact/`), tomada del mapa de rutas. La página llega con E140-I01; hasta entonces da 404 en las previews. El enlace de Contacto del menú tiene el mismo estado.
- **Impacto:** ninguno en producción mientras el cutover ocurra con todas las páginas; una preview analizada antes de E140-I01 verá una URL sin respuesta.
- **Recomendación:** ninguna acción; comprobarlo al cerrar E140-I01 y en E190-I01.

### AT-071 · Título y descripción de la portada heredados del sitio antiguo
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** decisión de Felipe (puede cerrarse al validar el inglés)
- **Evidencia (E40-I03, 30-10-2026):** el título en español mide 63 caracteres (Google suele cortar cerca de 60); el inglés mide 58. Ambas descripciones dicen "certificaciones de Oracle y AWS" / "certified by Oracle and AWS", pero el hero y la franja ya muestran 4 emisores (Python Institute y Anthropic, ADR-054). Se conservaron tal cual para no cambiar el posicionamiento sin que Felipe lo decida.
- **Impacto:** la descripción queda corta frente a lo que muestra la página; el título en español podría cortarse en los resultados.
- **Recomendación:** al validar el inglés, decidir si se mencionan los 4 emisores y si se acorta el título en español (`src/content/pages/home.json`, un solo archivo).
- **Opciones propuestas (E40, 30-10-2026; no aplicadas, Felipe elige).** Títulos de 60 caracteres o menos y descripciones de 160 o menos, con los 4 emisores. Detalle y largos en la sección 6 de `99_bitacora/2026-10-30_E40-revision-ingles.md`.
  - Título es: **A** «Felipe Cuevas | Instructor de Bootcamps y Docente TI» (52) · **B** «Felipe Cuevas | Instructor Senior y Docente Universitario» (57).
  - Título en: **A** «Felipe Cuevas | Bootcamp Instructor and Lecturer» (48) · **B** «Felipe Cuevas | Senior Instructor and University Lecturer» (57).
  - Descripción es: **A** «Instructor senior en bootcamps de Talento Digital SENCE y Alura Latam y docente universitario. Certificado por Oracle, AWS, Python Institute y Anthropic.» (153) · **B** «Ingeniero informático, instructor de bootcamps y docente universitario. Certificaciones vigentes de Oracle, AWS, Python Institute y Anthropic.» (142)
  - Descripción en: **A** «Senior bootcamp instructor for Talento Digital SENCE and Alura Latam, and university lecturer. Certified by Oracle, AWS, Python Institute and Anthropic.» (152) · **B** «Computer engineer, bootcamp instructor and university lecturer. Current certifications from Oracle, AWS, Python Institute and Anthropic.» (136)
  - Ninguna lleva la cifra de certificaciones, para que no se desfase (ADR-053).

### AT-072 · Reglas del cursor y de la barra que quedan redundantes o sin uso
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** E40-I04
- **Evidencia (E30-I07, 30-10-2026):**
  - `Hero.astro` declara `.accent :global(.typewriter-text) { justify-self: start }`. Desde E30-I07 la regla vive en `global.css` para todo el motor (así el cursor del logotipo acompaña al texto), así que la del hero es redundante. No se quitó para no tocar el hero fuera de alcance.
  - El botón del hero "Revisa mi CV" y `cv` de `nav-items.ts` siguen en uso hasta que E40-I04 quite los llamados a la acción (ADR-058); después `cv` solo lo usa el pie.
  - `Button.astro` conserva la variante `size="bar"` (44 px), que ya no usa la navbar; solo la muestra la página de pruebas del sistema de diseño. `DESIGN.md` 7.3 todavía dice "(44 px en la barra)" para el botón secundario.
- **Impacto:** código y texto de diseño redundantes; sin efecto visible.
- **Recomendación:** al cerrar E40-I04, borrar la regla del hero; decidir si se retira `size="bar"` y ajustar la frase de 7.3 (bloque en la bitácora de E30-I07).

### AT-073 · El sitio nuevo todavía no publica favicon
- **Severidad:** Baja · **Estado:** Abierto · **Resuelve:** por decidir con Felipe (E170-I02 o E190-I03)
- **Evidencia (E30-I07, 30-10-2026):** ADR-057 deja el favicon como está, `static/img/favicon.svg` del sitio antiguo, pero `public/` de la rama de migración solo trae el CV y el `<head>` no declara ningún `<link rel="icon">` (se comprobó en `dist/`). Ninguna iteración planificada porta el archivo. El favicon, de trazo grueso, ya no coincide con el ícono fino del logotipo (decisión de Felipe: a 16 px un trazo fino se pierde).
- **Impacto:** la preview y el sitio nuevo se ven sin ícono de pestaña; el cutover (E190) lo dejaría sin favicon.
- **Recomendación:** agregar una tarea a E170-I02 o a E190-I03: copiar `static/img/favicon.svg` desde `main` a `public/` y declararlo en `BaseLayout`. Requiere que Felipe decida qué iteración lo asume.
