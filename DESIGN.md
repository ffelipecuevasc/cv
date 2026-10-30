# DESIGN.md · felipecuevas.dev

> **Estado: v1 (E20-I01, 29-10-2026).** Plasma los prototipos aprobados por Felipe Cuevas (ADR-039), que están en `_planificacion/20_epica-sistema-diseno/prototipos/`.
> Este archivo es la **única fuente de verdad del diseño** (ADR-010). Si un prototipo y este archivo difieren, **prevalece este archivo**.
> Las secciones "Restricciones cerradas" y "Logotipo que se conserva" son **vinculantes** y solo cambian con un ADR nuevo.
> Nombres de tokens en inglés (ADR-025); textos en español de Chile.

## 1. Principios de diseño
1. **Elegante y tecnológico.** Titulares de inspiración clásica (Cinzel) sobre una base técnica: retículas, campos de puntos, reglas finas y números tabulares.
2. **Paleta original.** Escala `orient`, `primary`, `vibrant` y dorado del sitio actual, con dos tonos de apoyo (ADR-040). El dorado es un acento escaso: reglas, comillas, estrellas, cifras y un botón; nunca texto pequeño sobre fondo claro.
3. **Geometría recta.** Sin esquinas redondeadas, salvo puntos, avatares e indicadores circulares. Contornos de 1 px y sombras largas y difusas.
4. **Jerarquía por rótulo.** Toda sección abre con regla dorada + rótulo en mayúsculas + titular.
5. **Movimiento discreto.** Solo respuestas a la interacción (color, subrayado, elevación leve). Sin animaciones de entrada en Inicio.
6. **Dos temas al mismo nivel.** Cada componente se especifica en claro y oscuro.
7. **Holgura para el inglés.** Ningún componente depende del largo del texto en español.

## 2. Restricciones cerradas

### 2.1 Barra de navegación (ADR-008 · D-08)
- Rediseño total de diseño y estilo, con **exactamente las mismas opciones de menú** del sitio actual:
  - Inicio;
  - Educación;
  - **Experiencia ▾**: Resumen, Desarrollador, Docente Universitario, Instructor REUF, Talento Digital;
  - **Comunidad ▾**: Eventos, Foro, Recursos;
  - Contacto;
  - llamado a la acción "Descargar CV" (ADR-021).
- En móvil, "Experiencia" y "Comunidad" son rótulos de grupo no navegables.
- Incluye el **botón de apariencia** (claro/oscuro), que se mueve desde el pie (ADR-021), y el **botón de idioma**, que lleva a la página equivalente (ADR-001).
- El **logotipo se conserva sí o sí** (sección 3).
- Criterios de aceptación:
  - el toggle de tema no produce parpadeo ni CLS;
  - el toggle de idioma lleva a la ruta equivalente;
  - funciona en móvil y con teclado (Escape cierra los desplegables).

### 2.2 Hero de la portada (ADR-009 · D-09)
- Rediseño libre, incluso completo.
- En escritorio, navbar + hero + las **4 certificaciones** (Oracle, AWS, Python Institute y Anthropic) + las **redes sociales** deben verse completos al cargar, sin scroll.
- Matriz de verificación (ADR-016), en área visible: 1366×638, 1440×770, 1536×734 y 1920×950 px, en ambos temas y ambos idiomas.
- No se elimina ningún elemento de la lista de conservación de E40-I01 sin ADR.

### 2.3 Tema claro y oscuro
- Ambos temas son obligatorios y tienen el mismo nivel de terminación.
- Preferencia guardada en `localStorage` con la clave `theme`, con respaldo en `prefers-color-scheme` (ADR-023).
- Sin parpadeo al cargar y sin CLS al alternar.

### 2.4 Internacionalización
- Todo componente funciona con textos en `es-CL` y `en-US`. Los textos en inglés suelen ser más largos: diseñar con holgura.
- Ningún texto visible vive dentro de imágenes.

## 3. Logotipo (vinculante)

El ícono, los colores y el ritmo del efecto se conservan del sitio actual (auditoría, área C). La composición y la tipografía del nombre cambian según ADR-049, que sustituye en parte a ADR-008.

### 3.1 Ícono
- **Fuente:** `static/img/favicon.svg` del sitio actual. Es una ventana de terminal (barra superior con dos puntos y chevrons `< >`), definida como máscara, en un lienzo de 48×48 con `viewBox="-2 -2 52 52"`.
- **Render:**
  - contenedor de **32×32 px** pintado con el color de fondo y el SVG aplicado como máscara (`mask-image`, `mask-size: contain`, sin repetición);
  - se oculta a tecnologías asistivas (`aria-hidden`).
- **Color:** `#00678A` en tema claro y `#0096C7` en tema oscuro (`orient-600` y `orient-400`), con transición de color de 300 ms.
- **Separación con el texto:** 12 px.

### 3.2 Texto en dos renglones
- **Renglón 1, nombre fijo:** "Felipe Cuevas", en Cinzel (`font-display`), mayúsculas, 14 px con interletraje de 0,06 em; desde 640 px, 18 px con 0,12 em. Color `heading` (`#00131D` en claro, `#FFFFFF` en oscuro). No se anima y nunca se parte en dos líneas.
- **Renglón 2, frases:** Josefin Sans, mayúsculas, 11,5 px, interletraje de 0,2 em, color `text-soft` y 4 px de separación con el nombre. Aquí corre el efecto máquina de escribir. Bajo 640 px este renglón se oculta (`display: none`).
- El efecto es de "máquina de escribir" por su animación de tecleo, no por usar tipografía monoespaciada.

### 3.3 Efecto máquina de escribir (renglón 2)
- **Frases, en ciclo circular y por idioma:**
  - en `es-CL`: "Instructor Dev", "Dev Full Stack", "Instructor IA";
  - en `en-US`: las propone el agente en E30-I03 y las valida Felipe (ADR-017).
- **Ritmo:**
  | Paso | Valor |
  |---|---|
  | Arranque antes del primer borrado | 1.400 ms |
  | Escritura por carácter | 84 ms + variación aleatoria de 0 a 34 ms |
  | Borrado por carácter | 42 ms |
  | Espera con la frase completa | 3.600 ms |
  | Espera con el texto vacío | 500 ms |
- **Estructura accesible:**
  - el logotipo es un enlace a la portada del idioma activo (P-03, ADR-049), con nombre accesible fijo "Felipe Cuevas, inicio" / "Felipe Cuevas, home";
  - las frases tecleadas son decorativas (`aria-hidden`);
  - una copia invisible de la frase más larga reserva el ancho del renglón 2, para que el CLS sea 0.
- **Cursor:**
  - barra de 0,07 em × 0,95 em en `currentColor`, con separación de 0,06 em y radio de 1 px;
  - parpadea cada 1,05 s de forma escalonada y queda fijo mientras se teclea.
- **Pausa:** se detiene con la pestaña oculta o con el logotipo fuera de pantalla, y retoma sin perder su estado.
- **Presencia:** el logotipo anima en **todas** las páginas, incluida la 404 (AT-003).

### 3.4 Movimiento reducido y sin JavaScript
- Con `prefers-reduced-motion: reduce` o sin JavaScript, el renglón 2 muestra la primera frase fija y el cursor no parpadea. El nombre siempre está visible.

### 3.5 Cambios
- Cualquier cambio del ícono, de sus colores o del ritmo requiere un ADR nuevo que sustituya a ADR-049.

## 4. Color

### 4.1 Paleta base (ADR-040)
| Token | Valor | Origen |
|---|---|---|
| `orient-50` | `#E4F3FF` | Escala original |
| `orient-100` | `#B9E2FF` | Escala original |
| `orient-200` | `#5DC9FF` | Escala original |
| `orient-300` | `#00B0E8` | Escala original (= `vibrant`) |
| `orient-400` | `#0096C7` | Escala original (ícono del logotipo en oscuro) |
| `orient-500` | `#007EA7` | Escala original (= `primary`) |
| `orient-600` | `#00678A` | Escala original (ícono del logotipo en claro) |
| `orient-700` | `#005471` | Escala original |
| `orient-800` | `#003B51` | Escala original (en el prototipo, `deep` `#00384F`) |
| `orient-900` | `#00212F` | Escala original (en el prototipo, `abyss`/`panel` `#00222F`) |
| `orient-925` | `#001A26` | **Nuevo** (en el prototipo, `surface`) |
| `orient-950` | `#00131D` | Escala original |
| `stone` | `#F5F9FC` | **Nuevo** |
| `primary` | `#007EA7` | Original |
| `vibrant` | `#00B0E8` | Original (`primary-vibrant`) |
| `gold` | `#F8CD46` | Original (`accent-gold`) |
| `gold-deep` | `#7A5C00` | Original (`accent-gold-deep`) |
| `white` | `#FFFFFF` | — |

No se usan otros colores. Los degradados del prototipo (`#8CC8E8`, `#3E95BF`) y el trazo `#D9AE2C` se reemplazan por tonos de esta tabla.
`black` solo se usa dentro de las sombras (7.13), siempre con transparencia. La máscara del campo de puntos del hero se desvanece del 30 % al 75 % (4.5).

### 4.2 Tokens semánticos
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | `white` | `orient-950` | Fondo de página, hero, pie oscuro |
| `bg-alt` | `stone` | `orient-925` | Secciones alternas (testimonios) |
| `surface` | `white` | `orient-900` | Tarjetas, riel social, menús desplegables |
| `band` | `orient-50` + retícula | degradado + retícula (4.5) | Franjas de ancho completo |
| `footer` | `orient-50` | `orient-950` | Pie |
| `text` | `orient-950` | `orient-50` | Texto principal |
| `heading` | `orient-950` | `white` | Titulares (h1 a h3) |
| `text-muted` | `orient-950` al 70 % | `orient-50` al 75 % | Párrafos |
| `text-soft` | `orient-950` al 60 % | `orient-50` al 60 % | Descripciones, cargos, rótulos `dt`, barra inferior del pie. **Es la opacidad mínima para texto.** |
| `accent` | `primary` | `vibrant` | Parte destacada del titular, enlaces destacados |
| `kicker` | `orient-600` | `orient-400` (en `band`: `gold`) | Rótulos en mayúsculas |
| `icon` | `orient-600` | `orient-400` | Íconos de línea |
| `icon-rail` | `orient-600` | `vibrant` | Íconos del riel social |
| `border` | `orient-950` al 10 % | `orient-50` al 10 % | Reglas y divisores |
| `border-strong` | `orient-950` al 20–25 % | `orient-50` al 20–25 % | Contorno de botones secundarios y de íconos |
| `focus` | `primary` | `vibrant` | Contorno de foco |
| `gold` | `gold` | `gold` | Reglas, comillas, estrellas, signos de cifras, botón dorado |

### 4.3 Reglas de uso
- El texto nunca baja de la opacidad de `text-soft`.
- `vibrant` nunca es texto ni foco sobre fondo claro (2,51:1).
- `gold` nunca es texto sobre fondo claro; en claro, las estrellas llevan trazo `gold-deep`.
- Signos "+", "%" y "/ 5" de las cifras: `primary` en claro y `gold` en oscuro, siempre a tamaño de display.
- Avatares de iniciales: fondo `orient-800`, `primary` u `orient-600`, con texto blanco. No se usa `orient-400` de fondo con texto blanco (3,39:1).
- `accent` sobre `band`, en claro y en oscuro, se usa solo en texto grande (24 px o más, o 18,66 px en negrita). En texto pequeño dentro de la banda se usa `text` o `text-soft`.

### 4.4 Contrastes WCAG 2.2 (verificados el 29-10-2026)
Fórmula de luminancia relativa de WCAG 2.2, con la transparencia compuesta sobre el fondo real. Umbral: 4,5:1 texto normal; 3:1 texto grande (≥ 24 px, o ≥ 18,66 px en negrita) y elementos no textuales.

**Tema claro**
| Texto o elemento | Fondo | Contraste | Umbral | Resultado |
|---|---|---|---|---|
| `text` | `bg` / `bg-alt` / `band` | 18,90 / 17,86 / 16,71 | 4,5 | Cumple |
| `text-muted` | `bg` / `bg-alt` | 7,15 / 6,96 | 4,5 | Cumple |
| `text-soft` | `bg` / `bg-alt` / `band` | 4,98 / 4,89 / 4,78 | 4,5 | Cumple |
| `accent` | `bg` | 4,62 | 4,5 | Cumple |
| `accent` | `bg-alt` / `band` | 4,37 / 4,09 | 3 (solo texto grande) | Cumple |
| `kicker` e `icon` | `bg` / `bg-alt` / `band` | 6,35 / 6,00 / 5,61 | 4,5 | Cumple |
| Etiqueta (`orient-800`) | `bg` | 12,04 | 4,5 | Cumple |
| Blanco | botón primario `orient-950` / al pasar `primary` | 18,90 / 4,62 | 4,5 | Cumple |
| `orient-950` | botón dorado | 12,43 | 4,5 | Cumple |
| Blanco | avatar `orient-800` / `primary` / `orient-600` | 12,04 / 4,62 / 6,35 | 4,5 | Cumple |
| `focus` | `bg` / `bg-alt` / `band` | 4,62 / 4,37 / 4,09 | 3 | Cumple |
| Trazo de estrella `gold-deep` | `surface` | 6,25 | 3 | Cumple |

**Tema oscuro**
| Texto o elemento | Fondo | Contraste | Umbral | Resultado |
|---|---|---|---|---|
| `text` | `bg` / `bg-alt` / `surface` | 16,71 / 15,79 / 14,75 | 4,5 | Cumple |
| Titulares blancos | `bg` | 18,90 | 4,5 | Cumple |
| `text-muted` | `bg` / `surface` | 9,60 / 8,74 | 4,5 | Cumple |
| `text-soft` | `bg` / `bg-alt` / `surface` / `band` (`orient-800`, sobre una línea de la retícula al 5 %) | 6,47 / 6,29 / 6,05 / 4,57 | 4,5 | Cumple |
| `accent` | `bg` / `bg-alt` / `surface` | 7,54 / 7,12 / 6,65 | 4,5 | Cumple |
| `accent` | `band` (sobre una línea de la retícula al 5 %) | 4,42 | 3 (solo texto grande) | Cumple |
| `kicker` e `icon` | `bg` / `bg-alt` / `surface` | 5,57 / 5,26 / 4,92 | 4,5 | Cumple |
| `kicker` dorado | `band` en su punto más claro | 7,92 | 4,5 | Cumple |
| Etiqueta (`orient-50` al 85 %) | blanco al 4 % sobre `bg` / `bg-alt` / `surface` | 11,30 / 10,65 / 9,95 | 4,5 | Cumple |
| Blanco al 60 % | `band` | 5,34 | 4,5 | Cumple |
| `orient-950` | botón primario `orient-50` / al pasar `vibrant` / dorado | 16,71 / 7,54 / 12,43 | 4,5 | Cumple |
| Blanco | avatar `primary` / `orient-600` / `orient-800` | 4,62 / 6,35 / 12,04 | 4,5 | Cumple |
| `focus` | `bg` / `surface` | 7,54 / 6,65 | 3 | Cumple |
| Estrella `gold` | `surface` | 10,97 | 3 | Cumple |

Los bordes de 1 px (`border`, `border-strong`) son decorativos: los controles se identifican por su texto o su nombre accesible. El campo de puntos, la retícula, la regla dorada y el halo son decorativos (`aria-hidden`).

### 4.5 Fondos con textura
- **Campo de puntos (hero):** dos capas. Puntos de 1,1 px cada 22 px en `primary` al 30 % (oscuro: `vibrant` al 26 %) y puntos dorados de 1,2 px cada 132 px al 55 % (oscuro: 50 %), desplazados 11 px. Máscara radial elíptica centrada en 60 % / 45 %, que se desvanece hacia los bordes.
- **Halo (solo oscuro, hero):** degradado radial de 44 × 30 rem en 78 % / 40 %, `primary` al 22 %.
- **Retícula (band):** líneas de 1 px cada 48 px. Claro: `primary` al 7 % sobre `orient-50`, con bordes superior e inferior `primary` al 14 %. Oscuro: `vibrant` al 5 % sobre un degradado de 160° `orient-800` → `orient-900` (60 %) → `orient-925`.
- **Marco del retrato:** panel `orient-800` con puntos de 1 px cada 18 px en `vibrant` al 35 % (oscuro: 40 %).
- **Fondo del retrato (mientras carga la imagen):** claro, degradado `orient-50` → `orient-200`; oscuro, `orient-800` → `primary` → `orient-400`.

## 5. Tipografía

### 5.1 Familias (ADR-041)
| Token | Familia | Pesos que se cargan | Uso | Respaldo |
|---|---|---|---|---|
| `font-display` | **Cinzel** (OFL 1.1) | 400, 500 y 600 | Titulares, cifras, nombres en tarjetas, número de página | Georgia, serif |
| `font-sans` | **Josefin Sans** (OFL 1.1) | 300, 400 y 600; cursiva 300 y 400 | Texto, navegación, botones, rótulos | system-ui, sans-serif |

- Las dos se autoalojan con la API de fuentes de Astro y el proveedor local; nada se carga desde Google Fonts (ADR-043).
- Cinzel tiene diseño de mayúsculas romanas; se usa en titulares cortos y nunca en párrafos.

### 5.2 Escala
| Rol | Familia y peso | Tamaño | Alto de línea | Interletraje | Otros |
|---|---|---|---|---|---|
| Cuerpo base | Josefin 400 | 17 px | 1,6 | 0 | — |
| Párrafo | Josefin 300 | 1,08–1,12 rem | 1,75–1,8 | 0 | Ancho máximo 56–62 caracteres |
| Descripción breve | Josefin 300 | 16 px | 1,6 | 0 | — |
| Rótulo (kicker) | Josefin 600 | 12,5 px | 1,4 | 0,22 em | Mayúsculas |
| Rótulo `dt` de cifras | Josefin 400 | 12,5 px | 1,4 | 0,16 em | Mayúsculas |
| Navegación | Josefin 400 | 15 px | 1 | 0 | — |
| Botón | Josefin 600 | 13 px | 1 | 0,14 em | Mayúsculas |
| Etiqueta (chip) | Josefin 400 | 13 px | 1,3 | 0,08 em | Mayúsculas |
| Metadato (cargo) | Josefin 400 | 13–14 px | 1,4 | 0 | — |
| h1 del hero | Cinzel 500 | `clamp(2.25rem, 3.4vw, 2.75rem)` | 1,08 | 0,02 em | Máximo 2 líneas en la matriz de ADR-016. Con la columna de texto de 680 px, 2,75 rem es lo máximo con que "Docente Universitario en" cabe en una línea |
| h2 de sección | Cinzel 400 | `clamp(2rem, 4.2vw, 3.1rem)` | 1,2 | 0,02 em | — |
| h2 de banda | Cinzel 400 | 1,9 rem; 2,3 rem desde 768 px | 1,2 | 0,03 em | — |
| h3 de tarjeta | Cinzel 400 | 1–1,15 rem | 1,3 | 0,02–0,03 em | — |
| Cifra | Cinzel 400 | `clamp(2.2rem, 3vw, 3rem)` | 1 | 0 | Números tabulares. Tope de 3 rem: con 3,4 rem, "+2.000" no cabe en una de las 5 columnas de la banda. Las métricas del hero van a 2 rem (7.4) |
| Cita de testimonio | Josefin 300 | 1,08 rem | 1,75 | 0 | — |
| Comilla decorativa | Cinzel | 3,4 rem | 0,6 | — | `gold`, `aria-hidden` |

### 5.3 Reglas
- h1, h2 y h3 con `text-wrap: balance`.
- Cifras, años y contadores con números tabulares y de altura de línea (`tabular-nums lining-nums`).
- Ningún texto en mayúsculas se escribe en mayúsculas en el contenido: se transforma por estilo, para que los lectores de pantalla y la traducción no se vean afectados.
- **Nota de legibilidad:** Josefin Sans 300 en tamaños de 16 px o menos y con `text-soft` es el punto más débil del sistema. Se mantiene por decisión de Felipe (fidelidad al prototipo) y se revisa en E170-I01.

## 6. Espaciado y layout
- **Escala de espaciado:** múltiplos de 4 px (escala por defecto de Tailwind). Valores frecuentes: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80 y 96 px.
- **Contenedor:** ancho máximo de 1.280 px, centrado.
- **Márgenes laterales (gutter):** 16 px bajo 768 px y 40 px desde 768 px, respetando `env(safe-area-inset-*)`.
- **Retícula:** 12 columnas desde 1.024 px; separación de 48 px (hero) y 40 px (pie). Una columna bajo 1.024 px.
- **Puntos de quiebre:** `sm` 640, `md` 768, `lg` 1.024, `xl` 1.280 y uno propio, `cards`, en 1.100 px (testimonios).
- **Barra:** 76 px de alto en todos los anchos; pegajosa arriba.
- **Secciones:** relleno vertical de 80 px bajo 768 px y 96 px desde 768 px. Bandas: 56 px y 64 px.
- **Hero:** relleno vertical de 32 px desde 1.024 px y de 40 px arriba / 56 px abajo bajo 1.024 px (detalle en 7.4).
- **Anclas:** `scroll-margin-top` de 84 px (barra + 8 px).
- **Separación interna típica:** rótulo → titular 20 px; titular → bajada 20 px; bajada → contenido 48–56 px.

## 7. Componentes

### 7.1 Resumen
| Componente | Estado | Notas vinculantes |
|---|---|---|
| Navbar (escritorio y móvil) | Definido (7.2) | Sección 2.1 y logotipo de la sección 3 |
| Hero | Definido (7.4) | Sección 2.2 |
| Footer | Definido (7.9) | Etiquetas alineadas con la navbar e inclusión de Recursos (AT-008); enlace a privacidad (ADR-035) |
| Botones (primario, secundario, dorado, ícono, flecha) | Definido (7.3) | Foco visible, zona táctil de al menos 44 px |
| Tarjetas | Definido (7.6) | — |
| Formularios | Definido (7.10) | Etiquetas visibles y errores anunciados |
| Encabezado de sección | Definido (7.5) | — |
| Selector de idioma | Definido (7.2) | Indica el idioma actual y el destino |
| Botón de apariencia | Definido (7.2) | Nombre accesible que describe la acción |
| Banda / franja temática | Definido (7.8) | ADR-036 |
| Riel social | Definido (7.4) | 4 redes |
| Aviso (toast) y volver arriba | Definido (7.11) | — |

### 7.2 Navbar
- **Contenedor:** `<header>` pegajoso de 76 px. Fondo `bg` al 95 % en claro y `orient-950` al 88 % en oscuro, con desenfoque de 10–12 px y borde inferior `border`.
- **Distribución:** logotipo a la izquierda (sección 3, sin cambios); menú al centro; acciones a la derecha.
- **Escritorio (desde `xl`, 1.280 px):** Inicio, Educación, Experiencia ▾, Comunidad ▾ y Contacto (sección 2.1), en Josefin 15 px, separados por 28–36 px, color `text-muted`. Al pasar el cursor o con foco: color `text` y un subrayado de 2 px con degradado `vibrant` → `gold` que crece desde el centro en 350 ms. Página activa: subrayado fijo y `aria-current="page"`; el disparador del grupo de la página activa también lleva subrayado. El punto de quiebre se estima por el ancho de las opciones en ambos idiomas y E30-I04 lo confirma midiendo.
- **Desplegables:** panel `surface` sin radio, borde `border`, sombra `float` y línea superior de 2 px `gold` → `vibrant`. Opciones de 44 px de alto. Se abren con clic, Enter o Espacio y con el cursor; se cierran con Escape (devuelve el foco al disparador) y al salir. Chevron que gira 180° en 200 ms.
- **Acciones:** "Descargar CV" como botón secundario de 44 px; botón de apariencia de 44 × 44; selector de idioma.
- **Botón de apariencia:** ícono de luna en claro y de sol en oscuro, en `icon` (en oscuro, `gold`). El nombre accesible dice la acción: "Activar tema oscuro" / "Activar tema claro" (y su equivalente en `en-US`).
- **Selector de idioma:** control segmentado de 44 px de alto con "ES" y "EN" (Josefin 600, 12,5 px, interletraje 0,12 em) y divisor `border-strong`. El idioma actual va relleno (`orient-950` con texto blanco en claro; `orient-50` con texto `orient-950` en oscuro) y marcado con `aria-current="true"`. El otro idioma es un **enlace** a la página equivalente con `hreflang` y `lang`, y un nombre accesible del tipo "English version of this page" / "Versión en español de esta página". No se usan botones con `aria-pressed`.
- **Móvil y tableta (bajo 1.280 px):** se ocultan el menú y "Descargar CV"; aparece un botón de menú de 44 × 44 con el estilo del botón de ícono. El panel se despliega bajo la barra a todo el ancho, con fondo `bg` al 98 %, borde inferior `border` y relleno de 24 px. Contiene, en este orden: Inicio, Educación, rótulo de grupo "Experiencia" (no navegable) con sus 5 opciones, rótulo "Comunidad" con sus 3 opciones, Contacto y "Descargar CV" como botón primario a todo el ancho. Los rótulos de grupo usan el estilo kicker y las opciones hijas llevan una regla vertical `border` a la izquierda. Altura sin límite fijo (AT-011): el panel se desplaza si no cabe. Cerrado lleva `inert`. Escape lo cierra. Desde 420 px, el botón de apariencia y el selector de idioma quedan en la barra, junto al botón de menú; bajo 420 px pasan al final del panel del menú, después de "Descargar CV" y separados por una línea `border` (ADR-051). El logotipo no se achica.

### 7.3 Botones
| Variante | Claro | Oscuro | Medidas |
|---|---|---|---|
| Primario | Fondo `orient-950`, texto blanco; al pasar, fondo `primary` | Fondo `orient-50`, texto `orient-950`; al pasar, `vibrant` | Alto 46 px, relleno lateral 24 px |
| Secundario | Contorno `border-strong`, texto `text`; al pasar, contorno `vibrant` | Contorno `border-strong`, texto `orient-50`; al pasar, contorno `vibrant` y texto blanco | Alto 46 px (44 px en la barra) |
| Dorado | Fondo `gold`, texto `orient-950`; al pasar, brillo +5 % | Igual | Alto 46 px |
| Ícono | 44 × 44, contorno `border-strong`, ícono `icon`; al pasar, contorno `vibrant` y fondo `stone` | Ícono según contexto; al pasar, fondo `orient-50` al 5 % | 44 × 44 |
| Flecha (carrusel) | 54 × 54, contorno `border-strong`, fondo `surface`; al pasar, fondo `orient-950` e ícono `gold` | Al pasar, fondo `gold` e ícono `orient-950` | 54 × 54 |

- Texto: Josefin 600, 13 px, mayúsculas, interletraje 0,14 em. Ícono opcional de 16 px con 10 px de separación.
- Sin radio. Transición de color y borde en 250 ms.
- **Foco (todos los controles):** contorno de 2 px `focus` con separación de 2 px, solo con `:focus-visible`.
- Un enlace que descarga (CV) lleva el atributo de descarga y su peso o formato en el nombre accesible si se muestra.

### 7.4 Hero de Inicio
Lenguaje visual del prototipo, recompuesto para la lista de conservación de E40-I01 y la matriz de ADR-016.

- **Composición (desde 1.024 px):** retícula de 12 columnas; texto en 7 columnas y retrato en 5, centrados en vertical, con 48 px de separación. Fondo `bg` con campo de puntos (y halo en oscuro).
- **Columna de texto, en orden:**
  1. Rótulo "Ingeniero Informático" (kicker con regla dorada).
  2. Conmutador de 3 perfiles: control segmentado con el estilo del selector de idioma (44 px), `tablist` con flechas, Inicio y Fin; oculto sin JavaScript; recuerda el perfil en `perfil-hero` (ADR-023).
  3. `<h1>` con el titular del perfil (Cinzel). La parte destacada va en su propia línea, en Josefin 300 cursiva, color `accent`, con máquina de escribir (motor de E30-I03); con movimiento reducido o sin JavaScript queda estática. Deja 16 px de separación con el rótulo y el conmutador.
  4. Párrafo del perfil (`text-muted`): Josefin 300, 1,0625 rem, interlineado 1,7, ancho máximo de 62 caracteres, a 16 px bajo el `<h1>`.
  5. Dos llamados a la acción, a 24 px bajo el párrafo: primario (programas / experiencia docente / portafolio) y secundario "Revisa mi CV" con ícono de descarga en `icon`.
  6. Tres métricas del perfil en un `dl`, a 24 px bajo los botones. Rótulo `dt` encima de la cifra (`text-soft`, como en la banda, 7.8); cifra en Cinzel 400 a 2 rem; el signo "+" va en `primary` en claro y `gold` en oscuro (4.3); divisores verticales `border` cuando van en horizontal. Bajo 640 px las 3 métricas van en filas (rótulo a la izquierda, cifra a la derecha).
- **Columna del retrato:**
  - Retrato `felipe_cuevas.webp` en proporción 4:5, **alto máximo de 440 px** desde 1.024 px, con carga prioritaria y dimensiones declaradas.
  - Marco desplazado (4.5) corrido 24 px a la derecha y abajo, desde 640 px.
  - **Riel social** sobre el borde derecho, centrado en vertical: 4 botones de 46 × 46 (LinkedIn, GitHub, REUF y correo) separados por 8 px, fondo `surface`, ícono de marca en `icon-rail`, contorno 1 px y sombra `rail`. Al pasar o con foco: fondo `orient-950` e ícono `gold` en claro; fondo `orient-400` e ícono blanco en oscuro; se corre 2 px a la izquierda. Globo de ayuda a la izquierda con el nombre (fondo `orient-950` en claro y `orient-50` en oscuro, 12 px, mayúsculas). Es una lista dentro de un `<nav>` con nombre accesible.
  - **Tarjeta de certificaciones** sobre la esquina inferior izquierda del retrato (desde 640 px; corrida 32 px hacia fuera): fondo `surface`, línea superior de 2 px `vibrant`, sombra `float`, relleno de 20 × 24 px. Contiene el rótulo "Certificaciones" y las 4 insignias (Oracle, AWS, Python Institute y Anthropic, ADR-054) de 40 px con su nombre. Desde 640 px las insignias van en 2 × 2, porque en una fila la tarjeta taparía el riel social; bajo 640 px la tarjeta va estática debajo del retrato y las 4 insignias en una fila. El nombre visible del emisor de AWS es "AWS".
- **Medidas:** relleno vertical de 32 px desde 1.024 px. Presupuesto en la matriz de ADR-016: el hero completo debe caber en el área visible menos 76 px de barra (mínimo, 638 − 76 = 562 px en 1366×638). E40-I01 mide y, si no cabe, ajusta primero el alto del retrato y el tamaño del h1, nunca quita elementos. Resultado de E40-I01: el hero completo, con su relleno, termina dentro del área visible en los 48 casos de la matriz (4 áreas × 2 idiomas × 2 temas × 3 perfiles); el margen mínimo es de 11 px en 1366×638. Se ajustaron el h1, el párrafo, el interlineado y las separaciones; el retrato se mantuvo en 440 px.
- **Móvil:** una columna en este orden: texto y luego retrato; riel social dentro del retrato, a 12 px del borde.

### 7.5 Encabezado de sección
- **Alineado a la izquierda:** regla dorada (48 × 2 px, degradado `gold` → `vibrant`) + rótulo kicker en una fila con 16 px de separación; titular h2 a 20 px; bajada opcional (`text-soft`, 300) a 20 px con ancho máximo de 52 caracteres.
- **Centrado:** rótulo entre dos reglas doradas simétricas (la derecha en espejo); titular y bajada centrados.
- **De banda:** rótulo centrado, h2 de banda y regla dorada bajo el titular, **en ambos temas**.

### 7.6 Tarjetas
- **Base:** fondo `surface`, sin radio, relleno de 40 × 34 px (arriba, lados) y 32 px abajo; línea superior de 2 px con degradado `gold` → `vibrant` inserta 34 px desde los lados; sombra `card`. Al pasar el cursor sube 4 px y pasa a sombra `card-hover` en 400 ms. En oscuro suma un contorno de 1 px `orient-50` al 6 % (al pasar, `vibrant` al 25 %).
- **Tarjeta de testimonio:** comilla decorativa, 5 estrellas de 15 px (`gold` con trazo `gold-deep` en claro) con la nota también en texto para lectores de pantalla, cita en `<blockquote>`, y pie con regla `border` a 32 px: foto circular de 48 px con anillo de 2 px del color de la tarjeta y 1 px `gold`; nombre en Cinzel 1 rem; cargo en `text-soft` 14 px. No se muestra el programa (los datos del sitio actual no lo traen). Si la foto no carga o no existe, se muestran las iniciales sobre `orient-800`, `primary` u `orient-600` (4.3); nunca se consulta un servicio externo (AT-024). En `en-US` lleva la marca "Translated from Spanish" (ADR-017).

### 7.7 Etiqueta (chip)
Contorno de 1 px `primary` al 25 % (oscuro: `vibrant` al 30 %), fondo `bg` al 80 % (oscuro: blanco al 4 %), texto `orient-800` (oscuro: `orient-50` al 85 %), relleno de 6 × 12 px, sin radio.

### 7.8 Banda y franja temática
- **Banda:** sección de ancho completo con fondo `band` (4.5), contenido en el contenedor y encabezado de banda (7.5).
- **Banda de cifras (Inicio):** `dl` con borde superior `primary` al 20 % (oscuro: blanco al 15 %) y divisores verticales iguales (variable `--stats-rule`); **5 columnas desde 1.024 px** y 2 columnas bajo esa medida (la quinta ocupa la fila completa).
  - Encabezado de banda: rótulo "Trayectoria profesional" y titular "Impacto medido" (`en-US`: "Professional track record" y "Measured impact").
  - Las 5 cifras: certificaciones (derivada de `src/data/certifications.ts`, ADR-053), años como relator REUF, módulos REUF, años como docente y alumnos.
  - Cada cifra: `dt` arriba (12,5 px, mayúsculas, `text-soft`), cifra a 12 px bajo él y línea de contexto de 14 px en `text-soft` a 10 px de la cifra. Texto alineado a la izquierda. El signo "+" va antepuesto, en `primary` en claro y `gold` en oscuro (4.3).
  - Bajo 480 px el `dt` usa 12 px y 0,1 em de interletraje.
- **Franja temática (Educación, ADR-036 y E20-I05):** variante de la banda con dos zonas: título de la categoría (encabezado alineado a la izquierda) y contenido (insignias pequeñas). Alterna la orientación en zigzag sin cambiar el orden del HTML. Las franjas alternan fondo `band` y fondo `bg` para que el zigzag se lea. Bajo 1.024 px se apila en una columna, título primero.

### 7.9 Pie
- **Fondo:** `footer` (`orient-50` en claro, `orient-950` en oscuro), con una línea superior de 2 px con degradado transparente → `gold` (20 %) → `vibrant` (80 %) → transparente.
- **Relleno:** 64 px arriba y 40 px abajo.
- **Columnas (3 desde 768 px; una bajo esa medida):**
  1. **Marca:** ícono del logotipo y "Felipe Cuevas" en el estilo de la sección 3, sin animación, más una frase breve (`text-soft`, Josefin 300, 15,5 px, máximo 40 caracteres de ancho).
  2. **Navegación** (centrada): rótulo kicker con regla dorada corta (32 × 2 px) y lista de enlaces a las páginas, con las mismas etiquetas de la navbar e incluyendo Recursos (AT-008). La lista exacta la cierra E30-I06.
  3. **Redes** (alineada a la derecha desde 768 px): rótulo y lista de las 4 redes con ícono de marca de 18 px en `icon`, texto `text-muted`; al pasar, `accent`.
- **Barra inferior:** borde superior `primary` al 20 % (oscuro: `border`), 24 px de relleno; © con año, "Felipe Cuevas" y el enlace a la política de privacidad (ADR-035), en `text-soft` 14 px.
- El botón de apariencia ya no está en el pie (ADR-021). Las columnas "Tecnologías" y "Certificaciones" del pie actual no forman parte del diseño nuevo.

### 7.10 Formularios (lenguaje base para E140)
Etiqueta visible sobre el campo (Josefin 600, 12,5 px, mayúsculas, `text-soft`); campo de 48 px de alto, fondo `surface`, contorno 1 px `border-strong`, sin radio; foco con contorno `focus`; error en texto bajo el campo, asociado con `aria-describedby` y anunciado, con ícono además del color. El botón de envío es el primario y nunca se deshabilita (ADR-035).

### 7.11 Aviso y volver arriba
- **Aviso (toast):** fijo abajo al centro, 24 px sobre la zona segura; fondo `orient-950` y texto blanco en claro, fondo `orient-50` y texto `orient-950` en oscuro; línea superior de 2 px (`vibrant` en claro, `gold` en oscuro); `role="status"`; desaparece a los 2,8 s.
- **Volver arriba:** botón de ícono de 44 × 44 fijo abajo a la derecha, con el estilo de la flecha del carrusel, visible tras desplazarse una pantalla.

### 7.12 Carrusel de testimonios
- Encabezado de la sección: rótulo "Testimonios" y titular "Lo que dicen mis alumnos" (`en-US`: "Testimonials" y "What my students say").
- Es un carril con ajuste por tarjeta (`scroll-snap`) en todos los anchos; barra de desplazamiento oculta. Desde 1.100 px muestra 3 tarjetas por página, desde 768 px 2, y bajo esa medida 1 (86 % de ancho). Las páginas son 4, 6 o 12 según el ancho. Separación de 24 px entre tarjetas (32 px desde 1.100 px).
- Controles centrados a 48 px: flecha anterior, indicador de líneas (activa de 32 × 2 px en `text`; resto de 16 × 2 px al 20 %), contador "01 / 04" en Cinzel 14 px tabular y flecha siguiente. Las flechas son de 54 × 54 px, dan la vuelta y nunca se deshabilitan.
- Bajo 640 px se oculta el indicador de líneas y quedan las flechas y el contador.
- **Sin avance automático.**
- Cada página nueva se anuncia de forma discreta (región `aria-live="polite"` con el contador) y el foco no salta.
- Sin JavaScript no hay carril ni controles: las 12 tarjetas se ven en una grilla de 1, 2 o 3 columnas.

### 7.13 Sombras (tokens)
| Token | Claro | Oscuro |
|---|---|---|
| `card` | `0 1px 0 orient-950/6 %, 0 24px 50px -36px orient-800/50 %` | `0 0 0 1px orient-50/6 %, 0 28px 50px -34px black/85 %` |
| `card-hover` | `0 1px 0 orient-950/6 %, 0 30px 60px -34px orient-800/60 %` | `0 0 0 1px vibrant/25 %, 0 34px 60px -32px black/90 %` |
| `float` | `0 20px 40px -20px orient-950/35 %` | `0 0 0 1px orient-50/8 %, 0 24px 44px -20px black/80 %` |
| `rail` | `0 0 0 1px orient-950/8 %, 0 10px 22px -12px orient-800/45 %` | `0 0 0 1px orient-50/10 %, 0 12px 24px -12px black/70 %` |

### 7.14 Iconografía
Íconos de línea propios en SVG en línea, trazo de 1,4–1,8 px, puntas y uniones redondeadas, color `currentColor`, decorativos (`aria-hidden`) salvo que sean el único contenido de un control (entonces el control lleva nombre accesible). Las redes usan los SVG de marca del sitio actual. Sin fuentes de íconos (AT-016).

## 8. Movimiento y accesibilidad
- **Obligatorio:**
  - respetar `prefers-reduced-motion` (sin animaciones de entrada ni de tecleo);
  - el contenido es visible sin JavaScript;
  - sin CLS por animaciones;
  - foco siempre visible;
  - contraste AA.
- **Duraciones (tokens):** `fast` 200 ms (globos, chevron), `base` 250 ms (color y borde), `medium` 350 ms (subrayado de la navbar), `slow` 400 ms (elevación de tarjetas).
- **Curvas:** `ease` estándar para color; `cubic-bezier(.2, .7, .2, 1)` para desplazamientos y elevación.
- **Permitido:** cambios de color, borde y opacidad; desplazamientos de 2 a 4 px; escalado del subrayado; giro del chevron; desplazamiento suave entre anclas; las máquinas de escribir del logotipo y del hero.
- **No permitido:** animaciones de entrada al hacer scroll en Inicio; parallax; animaciones en bucle salvo el cursor de la máquina de escribir; animar el fondo de la página al cambiar de tema.
- **Con `prefers-reduced-motion: reduce`:** se anulan transiciones y desplazamiento suave, y las máquinas de escribir no arrancan.
- Zona táctil mínima de 44 × 44 px en todo control.
- No se usa AOS (E20-I04). Si otra página necesita aparición al hacer scroll, usa la utilidad de E20-I04, que nunca deja contenido invisible.

## 9. Reglas de Tailwind CSS v4
- Los tokens se declaran en `@theme`, en la hoja global. No hay `tailwind.config.js`.
- El escaneo de fuentes se restringe a `src/` (ADR-004).
- La variante oscura se controla con la clase `.dark` en `<html>` (ADR-042), con la clave `theme` (ADR-023).
- No se usan colores, tamaños ni sombras arbitrarias fuera de los tokens, salvo con una justificación escrita en la iteración.
- **Convenciones de nombres (en inglés, ADR-025):**
  - paleta base: `--color-orient-50` … `--color-orient-950`, `--color-orient-925`, `--color-stone`, `--color-primary`, `--color-vibrant`, `--color-gold`, `--color-gold-deep`;
  - semánticos: `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-band`, `--color-footer`, `--color-text`, `--color-heading`, `--color-text-muted`, `--color-text-soft`, `--color-accent`, `--color-kicker`, `--color-icon`, `--color-icon-rail`, `--color-border`, `--color-border-strong`, `--color-focus`; cambian de valor según el tema y los componentes usan solo estos;  Los colores por tema que la sección 7 fija para un componente y que no son semánticos (hover del botón de ícono y de la flecha, contorno de tarjeta en oscuro, etiqueta, trazo de estrella) se declaran como variables de componente en la hoja global, con los valores exactos de la sección 7 (ADR-046). No se agrega ninguna otra sin que esté escrita en la sección 7.
  - variables de componente declaradas en la hoja global con los valores de la sección 7 (ADR-046): `--profile-current-bg` y `--profile-current-fg` (perfil activo del conmutador, mismos valores que el selector de idioma, 7.2), `--rail-hover-bg` y `--rail-hover-fg` (riel social al pasar, 7.4), `--metric-sign` (signo de toda cifra de display, 4.3) y `--stats-rule` (borde y divisores de la banda de cifras, 7.8).
  - familias: `--font-display`, `--font-sans`;
  - sombras: `--shadow-card`, `--shadow-card-hover`, `--shadow-float`, `--shadow-rail`;
  - duraciones y curvas: `--duration-fast|base|medium|slow`, `--ease-out-soft`;
  - punto de quiebre propio: `--breakpoint-cards` (1.100 px); contenedor: 1.280 px.
- Las esquinas redondeadas solo se usan como `rounded-full` (puntos, avatares).
- Los componentes de Astro van en inglés (`SectionHeader`, `Button`, `IconButton`, `Card`, `TestimonialCard`, `Band`, `ThemeStripe`, `SocialRail`, `LanguageSwitch`, `ThemeToggle`).

## 10. Criterios de calidad visual
- Paridad visual entre temas: todo elemento de un tema tiene su equivalente en el otro.
- Sin desbordes con textos en inglés.
- Revisión en 360, 768, 1366 y 1920 px de ancho.
- Matriz de la sección 2.2 para el hero.
- Fidelidad: cada componente se compara con el prototipo en ambos temas; las diferencias deben estar escritas en este archivo.
- Ningún valor de color, tamaño o sombra fuera de los tokens.
- Contraste de la sección 4.4 comprobado con herramienta en la implementación (E20-I02 y E170-I01).

## 11. Composición por página (ADR-036)

### 11.1 Regla general
Todas las páginas comparten el sistema común (paleta, tipografía, espaciado, movimiento y primitivas). Cada página arma esas piezas con una composición propia. Todo patrón nuevo se documenta aquí antes de implementarse, en la primera iteración de su épica y con validación de Felipe.

### 11.2 Catálogo de patrones
| Patrón | Descripción | Disponible para |
|---|---|---|
| Hero asimétrico 7 + 5 | Texto y retrato con marco desplazado, riel social y tarjeta flotante sobre fondo de puntos | Inicio |
| Banda de ancho completo | Franja con retícula, encabezado de banda y contenido en fila | Inicio (cifras), Educación (franjas) |
| Zigzag | Franjas que alternan la orientación título / contenido | Educación |
| Grilla simétrica de tarjetas | Encabezado centrado, tarjetas iguales y controles centrados | Sin asignar (los testimonios de Inicio usan el carril) |
| Carril con ajuste | Fila desplazable con `scroll-snap`, 1, 2 o 3 tarjetas por página según el ancho | Inicio (testimonios, todos los anchos) |
| Mosaico | Retícula de piezas de tamaños distintos | Sin asignar |
| Línea de tiempo | Hitos en secuencia vertical | Sin asignar |
| **Reservados** (prototipo): pestañas verticales de trayectoria, lista de servicios a dos columnas con regla superior, cita destacada entre reglas, tarjeta de contacto | Patrones del prototipo que no están en el index | **Solo con aprobación de Felipe** para cada página |

### 11.3 Inicio
1. **Hero asimétrico** (7.4), fondo `bg`.
2. **Banda de cifras** (7.8), fondo `band`, dentro de `<main>` (AT-012).
3. **Testimonios** en carrusel con encabezado centrado (7.5, 7.6 y 7.12), fondo `bg-alt`, dentro de `<main>`.
4. **Pie** (7.9).

Ritmo de fondos: claro `white` → `orient-50` → `stone` → `orient-50`; oscuro `orient-950` → banda → `orient-925` → `orient-950`.

### 11.4 Educación
- Formación académica y diplomados con encabezado alineado a la izquierda; el patrón detallado se valida al iniciar E50-I01.
- **Certificaciones:** una **franja temática** (7.8) por categoría, de ancho completo y llamativa, con el título de la categoría y las insignias en tamaño pequeño. Alternan zigzag (título a la izquierda e insignias a la derecha; luego al revés) y fondo `band` / `bg`. En móvil, una columna. La clasificación por categoría está por validar (BL-07).

## 12. Prototipos de referencia
- **Ubicación:** `_planificacion/20_epica-sistema-diseno/prototipos/felipe-cuevas-ia.html` (claro) y `felipe-cuevas-ia-oscuro.html` (oscuro). No se publican ni se compilan.
- **Son referencia de:** paleta, tipografía, espaciado, bordes, sombras, texturas, botones, navbar (estilo), hero (lenguaje visual), banda de cifras, tarjetas de testimonio y pie.
- **No son referencia de:**
  - el **contenido** (textos, cifras, empresas, correos y personas son ficticios: el contenido viene de `main`);
  - el **logotipo** (rige la sección 3);
  - las **opciones de la navbar** (rige la sección 2.1);
  - las secciones **Trayectoria, Especialización y Contacto** (patrones reservados, 11.2);
  - sus **dependencias**: Google Fonts, Tailwind por CDN v3 y la foto de Unsplash no se usan.