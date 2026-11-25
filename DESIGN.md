# DESIGN.md · felipecuevas.dev

> **Estado: v1 (E20-I01, 29-10-2026); actualizado el 12-11-2026 con los bloques de E100, E110, E120, E130, E140-I01, E150-I01, E155-I01, E160-I01 y E170-I01.** Plasma los prototipos aprobados por Felipe Cuevas (ADR-039), que están en `_planificacion/20_epica-sistema-diseno/prototipos/`.
> Este archivo es la **única fuente de verdad del diseño** (ADR-010). Si un prototipo y este archivo difieren, **prevalece este archivo**.
> Las secciones "Restricciones cerradas" y "Logotipo que se conserva" son **vinculantes** y solo cambian con un ADR nuevo.
> Nombres de tokens en inglés (ADR-025); textos en español de Chile.

## 1. Principios de diseño
1. **Elegante y tecnológico.** Titulares geométricos (Sora) sobre una base técnica: retículas, campos de puntos, reglas finas y números tabulares.
2. **Paleta original.** Escala `orient`, `primary`, `vibrant` y dorado del sitio actual, con dos tonos de apoyo (ADR-040). El dorado es un acento escaso: reglas, comillas, estrellas, cifras y un botón; nunca texto pequeño sobre fondo claro.
3. **Geometría recta.** Sin esquinas redondeadas, salvo puntos, avatares e indicadores circulares. Contornos de 1 px y sombras largas y difusas.
4. **Jerarquía por rótulo.** Toda sección abre con regla dorada + rótulo en mayúsculas + titular.
5. **Movimiento discreto.** Solo respuestas a la interacción (color, subrayado, elevación leve), incluido el barrido diagonal al cambiar de tema (ADR-110). Sin animaciones de entrada en Inicio. Única excepción en bucle: el pulso del punto vivo de la línea de tiempo de Experiencia (ADR-115, 8).
6. **Dos temas al mismo nivel.** Cada componente se especifica en claro y oscuro.
7. **Holgura para el inglés.** Ningún componente depende del largo del texto en español.

## 2. Restricciones cerradas

### 2.1 Barra de navegación (ADR-008 · D-08)
- Rediseño total de diseño y estilo, con las opciones de menú del sitio actual, salvo Eventos (ADR-077):
  - Inicio;
  - Educación;
  - **Experiencia ▾**: Resumen, Desarrollador, Docente Universitario, Instructor REUF, Talento Digital;
  - **Comunidad ▾**: Foro, Recursos (Eventos salió del sitio, ADR-077);
  - Contacto;
  - el llamado a la acción "Descargar CV" (ADR-021) no va en la barra: vive en el pie (7.9, ADR-057).
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
- El h1 del hero usa `clamp(2rem, 3vw, 2.75rem)` en Sora 600 (5.2, ADR-111); la matriz se verificó completa el 24-11-2026.

### 2.3 Tema claro y oscuro
- Ambos temas son obligatorios y tienen el mismo nivel de terminación.
- Preferencia guardada en `localStorage` con la clave `theme`, con respaldo en `prefers-color-scheme` (ADR-023).
- Sin parpadeo al cargar y sin CLS al alternar.
- Al alternar, el tema nuevo entra con un barrido diagonal (View Transitions, ADR-110): hacia oscuro desde la esquina superior izquierda y hacia claro desde la inferior derecha, en `--duration-theme` con `--ease-expo-out`; la vista anterior queda quieta debajo. Con movimiento reducido o sin soporte de la API, el cambio es instantáneo.

### 2.4 Internacionalización
- Todo componente funciona con textos en `es-CL` y `en-US`. Los textos en inglés suelen ser más largos: diseñar con holgura.
- Ningún texto visible vive dentro de imágenes.
- La imagen Open Graph (1.200 × 630 px) solo lleva el nombre propio «Felipe Cuevas» y las insignias de certificación, que no se traducen, así que sirve a los dos idiomas; el título y la descripción viajan en las metaetiquetas de cada idioma y el texto alternativo se declara por idioma.

## 3. Logotipo (vinculante)

Los colores y el ritmo del efecto se conservan del sitio actual (auditoría, área C). La composición cambia según ADR-049 y la tipografía según ADR-111, que sustituye en parte a ADR-008, y el ícono cambia según ADR-057.

### 3.1 Ícono
- **Fuente:** ícono «terminal» de Material Symbols Light (Google, licencia Apache 2.0; se conserva el aviso de licencia, ADR-057): ventana con barra superior, chevron `>` y guion, de trazo fino, en `viewBox="0 0 24 24"`. Reemplaza en el logotipo al ícono de `static/img/favicon.svg`, que sigue siendo el favicon del sitio.
- **Render:**
  - contenedor de **32×32 px** pintado con el color de fondo y el SVG aplicado como máscara (`mask-image`, `mask-size: contain`, sin repetición);
  - se oculta a tecnologías asistivas (`aria-hidden`).
- **Color:** `#00678A` en tema claro y `#0096C7` en tema oscuro (`orient-600` y `orient-400`), con transición de color de 300 ms.
- **Separación con el texto:** 12 px.

### 3.2 Texto en dos renglones
- **Renglón 1, nombre fijo:** "Felipe Cuevas", en Sora 600 (`font-display`), mayúsculas, 14 px con interletraje de 0,04 em; desde 640 px, 18 px con 0,08 em. Color `heading` (`#00131D` en claro, `#FFFFFF` en oscuro). No se anima y nunca se parte en dos líneas.
- **Renglón 2, frases:** IBM Plex Mono 400 (`font-mono`), mayúsculas, 11 px, interletraje de 0,12 em, color `text-soft` y 4 px de separación con el nombre. Aquí corre el efecto máquina de escribir. Bajo 640 px este renglón se oculta (`display: none`).
- El renglón 2 usa una monoespaciada por identidad visual (ADR-111); el efecto se reconoce por su animación de tecleo.

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
  - va pegado al último carácter escrito y se mueve con él al escribir y al borrar; con el renglón vacío queda al inicio. La copia invisible solo reserva el ancho del renglón, no fija la posición del cursor.
- **Pausa:** se detiene con la pestaña oculta o con el logotipo fuera de pantalla, y retoma sin perder su estado.
- **Presencia:** el logotipo anima en **todas** las páginas, incluida la 404 (AT-003).

### 3.4 Movimiento reducido y sin JavaScript
- Con `prefers-reduced-motion: reduce` o sin JavaScript, el renglón 2 muestra la primera frase fija y el cursor no parpadea. El nombre siempre está visible.

### 3.5 Cambios
- Cualquier cambio del ícono, de sus colores o del ritmo requiere un ADR nuevo que sustituya a ADR-049 o a ADR-057.

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
| `text-muted` | `orient-950` al 70 % | `orient-50` al 75 % | Párrafos y descripciones (incluido el texto de 300 de 16 px o menos y la frase del pie) |
| `text-soft` | `orient-950` al 60 % | `orient-50` al 60 % | Bajadas (400, 17 px), cargos, metadatos y notas de 12 a 15 px (peso 400 o más), rótulos `dt` y etiquetas, barra inferior del pie. **Es la opacidad mínima para texto.** El texto de cuerpo va en peso 400 o más (5.3). |
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
- `gold` nunca es texto sobre fondo claro; en claro, las estrellas encendidas llevan relleno `gold-deep` (token `--star-fill`).
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
| Relleno de estrella `gold-deep` | `surface` | 6,25 | 3 | Cumple |

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
| Relleno de estrella `gold` | `surface` | 10,97 | 3 | Cumple |

Los bordes de 1 px (`border`, `border-strong`) son decorativos: los controles se identifican por su texto o su nombre accesible. El campo de puntos, la retícula, las curvas de nivel, la regla dorada y el halo son decorativos (`aria-hidden`).
Donde el texto pasa sobre el campo de puntos (hero, cabecera de Educación y franjas con `texture="dots"`), el contraste se mide sobre el fondo promedio, igual que en el hero: un punto aislado de 1,1 o 1,2 px bajo una letra no cuenta como fondo del texto (AT-162, decisión de Felipe del 25-11-2026). Las curvas de nivel sí se miden en el peor píxel.

### 4.5 Fondos con textura
- **Campo de puntos (hero, cabecera de Educación, apertura de Experiencia y franjas de tono `bg` con `texture="dots"`, ADR-114 y ADR-115):** dos capas. Puntos de 1,1 px cada 22 px en `primary` al 30 % (oscuro: `vibrant` al 26 %) y puntos dorados de 1,2 px cada 132 px al 55 % (oscuro: 50 %), desplazados 11 px. Máscara radial elíptica centrada en 60 % / 45 %, que se desvanece hacia los bordes. Mismas utilidades (`texture-dots` y `texture-halo`) en capas absolutas, `aria-hidden`, detrás del contenido. En Experiencia, una sola capa cubre el encabezado y la línea de tiempo (`ExperienceIntro`), con la misma máscara y el mismo halo, sin variable propia.
- **Halo (solo oscuro, junto al campo de puntos):** degradado radial de 44 × 30 rem en 78 % / 40 %, `primary` al 22 %.
- **Retícula (band):** líneas de 1 px cada 48 px. Claro: `primary` al 7 % sobre `orient-50`, con bordes superior e inferior `primary` al 14 %. Oscuro: `vibrant` al 5 % sobre un degradado de 160° `orient-800` → `orient-900` (60 %) → `orient-925`.
- **Curvas de nivel (banda de cifras de Inicio, ADR-113; franjas `ai` y `dev-data` de Educación, ADR-114):** sustituyen a la retícula en esas bandas; el fondo `band`, el degradado del tema oscuro y los bordes no cambian. Dos grupos de 12 curvas cerradas y suavizadas (Bézier), separadas unos 23 px y deformadas como relieve, que nacen en las esquinas inferior izquierda y superior derecha; la 5.ª y la 10.ª, en dorado. Cada grupo es una pieza SVG de 360 × 320 px de ancho fijo, anclada a su esquina y desvanecida desde ella. Trazo de 0,85 px: claro, `primary` al 20 % y `gold` al 55 %; oscuro, `vibrant` al 14 % y `gold` al 40 % (`--contour-line` y `--contour-accent`). Máscara radial elíptica que despeja el centro (transparente hasta el 45 % y opaca al 95 %; bajo 640 px, de 55 % a 100 %), para que `text-soft` mantenga 4,5:1 donde lo cruza una curva (peor caso medido: 4,51:1). Componente `ContourLines` (decorativo: `aria-hidden`, sin foco ni eventos de puntero); las demás bandas conservan la retícula. En Educación, cada franja lleva un solo grupo con composición propia: **relieve** (`hill`, franja `ai`), 14 curvas en un lienzo de 440 × 560 px con el centro fuera del borde derecho y centrado en vertical, que solo asoma en una franja junto al borde (elipse de 150 × 300 px; 90 px bajo 768 px y 56 px bajo 480 px) y se abre a 440 × 330 px desde 1.792 px; y **cordillera** (`range`, franja `dev-data`), 13 curvas estiradas 3,1 veces en horizontal en un lienzo de 960 × 300 px, ancladas a la esquina inferior izquierda y desvanecidas hacia la derecha (elipse de 820 × 300 px; 560 × 120 px bajo 1.024 px). Sin la máscara central de Inicio: el texto se protege con la máscara de cada pieza (peor caso medido de `text-soft`: 4,50:1).
- **Marco del retrato:** panel `orient-800` con puntos de 1 px cada 18 px en `vibrant` al 35 % (oscuro: 40 %).
- **Fondo del retrato (mientras carga la imagen):** claro, degradado `orient-50` → `orient-200`; oscuro, `orient-800` → `primary` → `orient-400`.

## 5. Tipografía

### 5.1 Familias (ADR-111)
| Token | Familia | Pesos que se cargan | Uso | Respaldo |
|---|---|---|---|---|
| `font-display` | **Sora** (OFL 1.1), variable | 300 a 600 | Titulares, cifras, nombres en tarjetas, nombre del logotipo, frase destacada del hero | system-ui, sans-serif |
| `font-sans` | **Work Sans** (OFL 1.1), variable | 400 a 600 | Texto, navegación, botones, citas, selector de idioma | system-ui, sans-serif |
| `font-mono` | **IBM Plex Mono** (OFL 1.1), estáticas | 400 y 500 | Rótulos (kicker), `dt` de cifras, etiquetas (chips), pestañas del hero, renglón 2 del logotipo | ui-monospace, monospace |

- Las tres se autoalojan con la API de fuentes de Astro y el proveedor local, con subconjunto latino; nada se carga desde Google Fonts (ADR-043). Suman 110,9 KiB, bajo el tope de 120 KB de `verify:seo`.
- Se precargan Sora y Work Sans; IBM Plex Mono no. No se cargan cursivas.

### 5.2 Escala
| Rol | Familia y peso | Tamaño | Alto de línea | Interletraje | Otros |
|---|---|---|---|---|---|
| Cuerpo base | Work Sans 400 | 17 px | 1,6 | 0 | — |
| Párrafo y lead | Work Sans 400 | 1,0625 rem | 1,7 | 0 | Ancho máximo 56–62 caracteres |
| Descripción breve | Work Sans 400 | 16 px | 1,6 | 0 | — |
| Rótulo (kicker) | Plex Mono 500 | 12 px | 1,4 | 0,14 em | Mayúsculas |
| Rótulo `dt` de cifras | Plex Mono 400 | 12 px | 1,4 | 0,1 em | Mayúsculas |
| Navegación | Work Sans 400 | 15 px | 1 | 0 | — |
| Botón | Work Sans 600 | 13 px | 1 | 0,1 em | Mayúsculas |
| Etiqueta (chip) | Plex Mono 400 | 12 px | 1,3 | 0,06 em | Mayúsculas |
| Pestañas del hero | Plex Mono 500 | 12 px | 1 | 0,08 em | Mayúsculas |
| Selector de idioma | Work Sans 600 | 12,5 px | 1 | 0,12 em | — |
| Metadato (cargo) | Work Sans 400 | 13–14 px | 1,4 | 0 | — |
| h1 del hero | Sora 600 | `clamp(2rem, 3vw, 2.75rem)` | 1,1 | −0,02 em | Máximo 2 líneas en la matriz de ADR-016. Con la columna de 680 px, «Docente Universitario en» cabe hasta 3,46 rem y la frase destacada más larga hasta 2,98 rem (medido el 25-11-2026) |
| Frase destacada del hero | Sora 300, recta | La del h1 | 1,1 | −0,01 em | `accent` |
| h2 de sección | Sora 600 | `clamp(1.875rem, 3.6vw, 2.75rem)` | 1,15 | −0,02 em | — |
| h2 de banda | Sora 600 | 1,75 rem; 2,125 rem desde 768 px | 1,2 | −0,01 em | — |
| h3 de tarjeta | Sora 600 | 1–1,2 rem | 1,3 | −0,01 em | — |
| Cifra | Sora 400 | `clamp(2rem, 2.8vw, 2.75rem)` | 1 | −0,01 em | Números tabulares. Tope de 2,75 rem para que "+2.000" quepa en una de las 5 columnas de la banda |
| Cifra de banda de página | Sora 400 | `clamp(1.625rem, 3vw, 2.6rem)` (Docente y Talento Digital); `clamp(1.9rem, 3vw, 2.6rem)` (Instructor) | 1 | −0,01 em | Números tabulares. A 360 px «+2.000» deja 16 px con la cifra vecina; a 320 px cabe en su columna con ~3 px (AT-158) |
| Cita de testimonio | Work Sans 400 | 1,0625 rem | 1,7 | 0 | — |
| Nota «traducido» | Work Sans 400 | 13 px | 1,4 | 0 | `text-muted`, sin cursiva |
| Comilla decorativa | Sora 600 | 3,4 rem | 0,6 | — | `gold`, `aria-hidden` |

### 5.3 Reglas
- h1, h2 y h3 con `text-wrap: balance`.
- Cifras, años y contadores con números tabulares y de altura de línea (`tabular-nums lining-nums`).
- Ningún texto en mayúsculas se escribe en mayúsculas en el contenido: se transforma por estilo, para que los lectores de pantalla y la traducción no se vean afectados.
- En los mosaicos de tecnologías de Desarrollador, el nombre y el rol pueden partirse dentro de la palabra (`overflow-wrap: anywhere`) para no desbordar en 320 px (AT-159).
- **Peso mínimo:** el texto de cuerpo va en peso 400 o más. Sora 300 se usa solo en 28 px o más (frase destacada del hero). No se cargan cursivas: lo que antes iba en cursiva se distingue por color o tamaño (ADR-111, que retira la regla de Josefin 300 de ADR-041 y AT-115).

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
- **Escritorio (desde `xl`, 1.280 px):** Inicio, Educación, Experiencia ▾, Comunidad ▾ y Contacto (sección 2.1), en Work Sans 15 px, separados por 28–36 px, color `text-muted`. Al pasar el cursor o con foco: color `text` y un subrayado de 2 px con degradado `vibrant` → `gold` que crece desde el centro en 350 ms. Página activa: subrayado fijo y `aria-current="page"`; el disparador del grupo de la página activa también lleva subrayado. El punto de quiebre se estima por el ancho de las opciones en ambos idiomas y E30-I04 lo confirma midiendo.
- **Desplegables:** panel `surface` sin radio, borde `border`, sombra `float` y línea superior de 2 px `gold` → `vibrant`. Opciones de 44 px de alto. Se abren con clic, Enter o Espacio y con el cursor; se cierran con Escape (devuelve el foco al disparador) y al salir. Chevron que gira 180° en 200 ms.
- **Acciones:** botón de apariencia de 44 × 44 y selector de idioma. "Descargar CV" no va en la barra (ADR-057, 7.9).
- **Botón de apariencia:** ícono de luna en claro y de sol en oscuro, en `icon` (en oscuro, `gold`). El nombre accesible dice la acción: "Activar tema oscuro" / "Activar tema claro" (y su equivalente en `en-US`).
- **Selector de idioma:** control segmentado de 44 px de alto con "ES" y "EN" (Work Sans 600, 12,5 px, interletraje 0,12 em) y divisor `border-strong`. El idioma actual va relleno (`orient-950` con texto blanco en claro; `orient-50` con texto `orient-950` en oscuro) y marcado con `aria-current="true"`. El otro idioma es un **enlace** a la página equivalente con `hreflang` y `lang`, y un nombre accesible del tipo "English version of this page" / "Versión en español de esta página". No se usan botones con `aria-pressed`.
- **Móvil y tableta (bajo 1.280 px):** se oculta el menú; aparece un botón de menú de 44 × 44 con el estilo del botón de ícono. El panel se despliega bajo la barra a todo el ancho, con fondo `bg` al 98 %, borde inferior `border` y relleno de 24 px. Contiene, en este orden: Inicio, Educación, rótulo de grupo "Experiencia" (no navegable) con sus 5 opciones, rótulo "Comunidad" con sus 2 opciones y Contacto. No lleva "Descargar CV" (ADR-057). Los rótulos de grupo usan el estilo kicker y las opciones hijas llevan una regla vertical `border` a la izquierda. Altura sin límite fijo (AT-011): el panel se desplaza si no cabe. Cerrado lleva `inert`. Escape lo cierra. Desde 420 px, el botón de apariencia y el selector de idioma quedan en la barra, junto al botón de menú; bajo 420 px pasan al final del panel del menú, después de Contacto y separados por una línea `border` (ADR-051). El logotipo no se achica.

### 7.3 Botones
| Variante | Claro | Oscuro | Medidas |
|---|---|---|---|
| Primario | Fondo `orient-950`, texto blanco; al pasar, fondo `primary` | Fondo `orient-50`, texto `orient-950`; al pasar, `vibrant` | Alto 46 px, relleno lateral 24 px |
| Secundario | Contorno `border-strong`, texto `text`; al pasar, contorno `vibrant` | Contorno `border-strong`, texto `orient-50`; al pasar, contorno `vibrant` y texto blanco | Alto 46 px (44 px en la barra) |
| Dorado | Fondo `gold`, texto `orient-950`; al pasar, brillo +5 % | Igual | Alto 46 px. Dos usos: Instructor y «Descargar CV» del pie (ADR-112) |
| Ícono | 44 × 44, contorno `border-strong`, ícono `icon`; al pasar, contorno `vibrant` y fondo `stone` | Ícono según contexto; al pasar, fondo `orient-50` al 5 % | 44 × 44 |
| Flecha (carrusel) | 54 × 54, contorno `border-strong`, fondo `surface`; al pasar, fondo `orient-950` e ícono `gold` | Al pasar, fondo `gold` e ícono `orient-950` | 54 × 54 |

- Texto: Work Sans 600, 13 px, mayúsculas, interletraje 0,1 em. Ícono opcional de 16 px con 10 px de separación.
- Sin radio. Transición de color y borde en 250 ms.
- **Foco (todos los controles):** contorno de 2 px `focus` con separación de 2 px, solo con `:focus-visible`.
- Un enlace que descarga (CV) lleva el atributo de descarga y su peso o formato en el nombre accesible si se muestra.

### 7.4 Hero de Inicio
Lenguaje visual del prototipo, recompuesto para la lista de conservación de E40-I01 y la matriz de ADR-016.

- **Composición (desde 1.024 px):** retícula de 12 columnas; texto en 7 columnas y retrato en 5, centrados en vertical, con 48 px de separación. El hero ocupa el alto visible menos la barra (76 px) y el contenido va centrado en vertical (ADR-058). Fondo `bg` con campo de puntos (y halo en oscuro).
- **Columna de texto, en orden:**
  1. Rótulo "Ingeniero Informático" (kicker con regla dorada).
  2. Conmutador de 3 perfiles: control segmentado con el estilo del selector de idioma (44 px), `tablist` con flechas, Inicio y Fin; oculto sin JavaScript; recuerda el perfil en `perfil-hero` (ADR-023).
  3. `<h1>` con el titular del perfil (Sora 600). La parte destacada va en su propia línea, en Sora 300 recta, color `accent`, con máquina de escribir (motor de E30-I03); con movimiento reducido o sin JavaScript queda estática. Deja 16 px de separación con el rótulo y el conmutador. Bajo 640 px el cursor de la máquina de escribir de la parte destacada no se dibuja: la frase puede partirse en varias líneas y el cursor, que es el fondo de la caja del texto, quedaría al borde derecho y no al final de la última línea (AT-065). Desde 640 px y en escritorio no cambia, y quitarlo no mueve ninguna caja (CLS 0).
  4. Párrafo del perfil (`text-muted`): Work Sans 400, 1,0625 rem, interlineado 1,7, ancho máximo de 62 caracteres, a 16 px bajo el `<h1>`.
  5. Certificaciones, sin contenedor: rótulo "Profesional certificado" (`en-US`: "Certified professional") en estilo kicker y las 4 insignias de 40 px con su nombre al lado: Oracle, AWS, Python y Anthropic (ADR-054 y ADR-058). "Python" abrevia "Python Institute"; el nombre completo va en Educación y en el JSON-LD. Van en una fila; si bajo 640 px no caben, en 2 × 2. Las separaciones con el párrafo las mide y fija E40-I04. El hero no lleva llamados a la acción ni métricas por perfil (ADR-058).
- **Columna del retrato:**
  - Retrato `felipe_cuevas.webp` en proporción 4:5, **alto máximo de 440 px** desde 1.024 px, con carga prioritaria y dimensiones declaradas.
  - Marco desplazado (4.5) corrido 24 px a la derecha y abajo, desde 640 px.
  - **Riel social** sobre el borde derecho, centrado en vertical: 4 botones de 46 × 46 (LinkedIn, GitHub, REUF y correo) separados por 8 px, fondo `surface`, ícono de marca en `icon-rail`, contorno 1 px y sombra `rail`. Al pasar o con foco: fondo `orient-950` e ícono `gold` en claro; fondo `orient-400` e ícono blanco en oscuro; se corre 2 px a la izquierda. Globo de ayuda a la izquierda con el nombre (fondo `orient-950` en claro y `orient-50` en oscuro, 12 px, mayúsculas). Es una lista dentro de un `<nav>` con nombre accesible.
- **Medidas:** relleno vertical de 32 px desde 1.024 px y alto mínimo igual al área visible menos la barra. Presupuesto en la matriz de ADR-016: el contenido del hero debe caber en el área visible menos 76 px de barra (mínimo, 638 − 76 = 562 px en 1366×638). Si no cabe, se ajustan las separaciones y el tamaño del h1; nunca se quita un elemento sin ADR. E40-I04 vuelve a medir los 48 casos (4 áreas × 2 idiomas × 2 temas × 3 perfiles).
- **Móvil:** una columna en este orden: texto y luego retrato; riel social dentro del retrato, a 12 px del borde.

### 7.5 Encabezado de sección
- **Alineado a la izquierda:** regla dorada (48 × 2 px, degradado `gold` → `vibrant`) + rótulo kicker en una fila con 16 px de separación; titular h2 a 20 px; bajada opcional (`text-soft`, 300) a 20 px con ancho máximo de 52 caracteres.
- **Centrado:** rótulo entre dos reglas doradas simétricas (la derecha en espejo); titular y bajada centrados.
- **De banda:** rótulo centrado, h2 de banda y regla dorada bajo el titular, **en ambos temas**.
- **Con elemento decorativo:** `SectionHeader` admite un slot opcional entre el rótulo y el titular para un elemento decorativo (por ejemplo, el ícono de Agradecimiento, 11.13).

### 7.6 Tarjetas
- **Base:** fondo `surface`, sin radio, relleno de 40 × 34 px (arriba, lados) y 32 px abajo; línea superior de 2 px con degradado `gold` → `vibrant` inserta 34 px desde los lados; sombra `card`. Al pasar el cursor sube 4 px y pasa a sombra `card-hover` en 400 ms. En oscuro suma un contorno de 1 px `orient-50` al 6 % (al pasar, `vibrant` al 25 %).
- **Tarjeta de testimonio:** comilla decorativa, 5 estrellas de 15 px (las encendidas, rellenas con `gold-deep` en claro y `gold` en oscuro, token `--star-fill`; las apagadas, de contorno con opacidad 0,35) con la nota también en texto para lectores de pantalla, cita en `<blockquote>`, y pie con regla `border` a 32 px: foto circular de 48 px con anillo de 2 px del color de la tarjeta y 1 px `gold`; nombre en Sora 1 rem; cargo en `text-soft` 14 px. No se muestra el programa (los datos del sitio actual no lo traen). Si la foto no carga o no existe, se muestran las iniciales sobre `orient-800`, `primary` u `orient-600` (4.3); nunca se consulta un servicio externo (AT-024). En `en-US` lleva la marca "Translated from Spanish" (ADR-017).

### 7.7 Etiqueta (chip)
Contorno de 1 px `primary` al 25 % (oscuro: `vibrant` al 30 %), fondo `bg` al 80 % (oscuro: blanco al 4 %), texto `orient-800` (oscuro: `orient-50` al 85 %), relleno de 6 × 12 px, sin radio.

### 7.8 Banda y franja temática
- **Banda:** sección de ancho completo con fondo `band` (4.5), contenido en el contenedor y encabezado de banda (7.5).
- **Banda de cifras (Inicio):** fondo `band` con curvas de nivel en lugar de la retícula (4.5, ADR-113); `dl` de 5 cifras, **5 columnas desde 1.024 px** y 2 columnas bajo esa medida (la quinta ocupa la fila completa). Sin borde superior ni divisores finos: las cifras se separan con barras verticales con el degradado `gold` → `vibrant` de la regla dorada (7.5), de 2 px de ancho y decorativas (`aria-hidden`); su alto lo fija E40-I04 (ADR-058).
  - Encabezado de banda: rótulo "Trayectoria profesional" y titular "Resumen" (`en-US`: "Professional track record" y "Overview").
  - Las 5 cifras: certificaciones (derivada de `src/data/certifications.ts`, ADR-053), años como relator REUF, módulos REUF, años como docente y alumnos.
  - Cada cifra: `dt` arriba (12,5 px, mayúsculas, `text-soft`), cifra a 12 px bajo él y línea de contexto de 14 px en `text-soft` a 10 px de la cifra. Texto centrado en cada celda (ADR-113). El rótulo, la cifra y el contexto de las 5 celdas ocupan tres filas comunes (`subgrid`): las cifras quedan en una misma línea aunque un rótulo o un contexto ocupe más líneas, como «Years as REUF instructor» en inglés. El signo "+" va antepuesto, en `primary` en claro y `gold` en oscuro (4.3).
  - Bajo 480 px el `dt` usa 12 px y 0,1 em de interletraje.
- **Franja temática (Educación, ADR-036 y E20-I05):** variante de la banda con dos zonas: título de la categoría (encabezado alineado a la izquierda) y contenido (insignias pequeñas). Alterna la orientación en zigzag sin cambiar el orden del HTML. La franja espejo (`mirror` en `ThemeStripe`, `align="end-lg"` en `SectionHeader`) pone la zona del título a la derecha y alinea a la derecha el rótulo, el titular y la barra, con la barra después del rótulo. Las franjas alternan fondo `band` y fondo `bg` para que el zigzag se lea. Bajo 1.024 px se apila en una columna, título primero, y todo se alinea a la izquierda con la barra antes del rótulo.
  - Fondo (`texture` en `ThemeStripe`, ADR-114): `grid` (retícula, por defecto); `contour` (solo con fondo `band`: curvas de nivel en lugar de la retícula, con la composición por el slot `decor`); `dots` (solo con fondo `bg`: campo de puntos y halo, 4.5). En Educación: `ai` con relieve, `cloud` con puntos y `dev-data` con cordillera, así que las tres franjas alternan curvas, puntos y curvas.

### 7.9 Pie
- **Fondo:** `footer` (`orient-50` en claro, `orient-950` en oscuro), con una línea superior de 2 px con degradado transparente → `gold` (20 %) → `vibrant` (80 %) → transparente.
- **Relleno:** 64 px arriba y 40 px abajo.
- **Columnas (3 desde 768 px; una bajo esa medida):**
  1. **Marca:** ícono del logotipo y "Felipe Cuevas" en el estilo de la sección 3, sin animación, más una frase de dos oraciones (`text-muted`, Work Sans 400, 15,5 px, interlineado 1,75, máximo 44 caracteres de ancho; 6,73:1 en claro y 9,60:1 en oscuro): «Ingeniero informático. Formo desarrolladores full stack en bootcamps y aulas universitarias, y construyo aplicaciones web con Java, Python e IA.» (`en-US`: «Computer engineer. I train full stack developers in bootcamps and university classrooms, and build web applications with Java, Python and AI.»). Bajo la frase, el botón dorado "Descargar CV" de 46 px (7.3, ADR-112) con ícono de descarga, atributo de descarga y nombre accesible "Descargar CV (PDF)" / "Download CV (PDF, Spanish)" (ADR-017 y ADR-057). Es el acceso al CV de todo el sitio.
     - La frase ocupa 3 líneas o menos desde 1.280 px; entre 768 y 1.279 px puede ocupar hasta 6 (AT-160).
  2. **Navegación** (centrada): rótulo kicker con regla dorada corta (32 × 2 px) y 6 enlaces: Inicio, Educación, Experiencia (a la página Resumen), Recursos, Contacto y Política de privacidad (`en-US`: Home, Education, Experience, Resources, Contact y Privacy policy). El enlace de privacidad es el sexto y está en el pie de todas las páginas (E155-I01, ADR-087). No lleva Eventos (ADR-077).
  3. **Redes** (alineada a la izquierda en todos los anchos): rótulo y lista de las 4 redes; en cada una, el ícono de marca de 18 px en `icon` va antes del texto `text-muted`. El correo se muestra como «Correo electrónico» / «Email» (diccionario, `footer.email`) y abre `mailto:contacto@felipecuevas.dev`.
- **Enlaces de navegación y redes:** al pasar el puntero o con foco de teclado, el texto pasa a `text` y aparece a la derecha una flecha decorativa de 16 px (`aria-hidden`) que se desliza 6 px en `--duration-base`: → en los enlaces internos y el correo, ↗ en los que abren pestaña nueva (LinkedIn, GitHub y REUF). Con movimiento reducido, la flecha aparece sin moverse. En pantallas táctiles solo aparece con foco (ADR-112).
- **Barra inferior:** borde superior `primary` al 20 % (oscuro: `border`), 24 px de relleno; © con año y "Felipe Cuevas", en `text-soft` 14 px. El enlace de privacidad va en la columna de navegación (ADR-057).
- El botón de apariencia ya no está en el pie (ADR-021). Las columnas "Tecnologías" y "Certificaciones" del pie actual no forman parte del diseño nuevo.

### 7.10 Formularios (lenguaje base para E140)
Etiqueta visible sobre el campo (Work Sans 600, 12,5 px, mayúsculas, `text-soft`); campo de 48 px de alto, fondo `surface`, contorno 1 px `border-strong`, sin radio; foco con contorno `focus`; error en texto bajo el campo, asociado con `aria-describedby` y anunciado, con ícono además del color. El botón de envío es el primario y nunca se deshabilita (ADR-035). En Contacto (E140-I01), el error marca el campo con `aria-invalid`, contorno de 2 px en `focus` y, bajo el campo, ícono `alert` de 18 px en `accent` con texto 600 de 14 px en `text`. El sistema no tiene color de error (AT-098).

### 7.11 Aviso y volver arriba
- **Aviso (toast):** fijo abajo al centro, 24 px sobre la zona segura; fondo `orient-950` y texto blanco en claro, fondo `orient-50` y texto `orient-950` en oscuro; línea superior de 2 px (`vibrant` en claro, `gold` en oscuro); `role="status"`; desaparece a los 2,8 s.
- **Volver arriba:** botón de ícono de 44 × 44 fijo abajo a la derecha, con el estilo de la flecha del carrusel, visible tras desplazarse una pantalla.

### 7.12 Carrusel de testimonios
- Encabezado de la sección: rótulo "Testimonios" y titular "Lo que dicen mis alumnos" (`en-US`: "Testimonials" y "What my students say").
- Es un carril con ajuste por tarjeta (`scroll-snap`) en todos los anchos; barra de desplazamiento oculta. Desde 1.100 px muestra 3 tarjetas por página, desde 768 px 2, y bajo esa medida 1 (86 % de ancho). Las páginas son 4, 6 o 12 según el ancho. Separación de 24 px entre tarjetas (32 px desde 1.100 px).
- Controles centrados a 48 px: flecha anterior, indicador de líneas (activa de 32 × 2 px en `text`; resto de 16 × 2 px al 20 %), contador "01 / 04" en Sora 14 px tabular y flecha siguiente. Las flechas son de 54 × 54 px, dan la vuelta y nunca se deshabilitan.
- Bajo 640 px se oculta el indicador de líneas y quedan las flechas y el contador.
- **Sin avance automático.**
- Cada página nueva se anuncia de forma discreta (región `aria-live="polite"` con el contador) y el foco no salta.
- Sin JavaScript no hay carril ni controles: las 12 tarjetas se ven en una grilla de 1, 2 o 3 columnas.
- Con JavaScript, el carril es una parada de tabulación (`tabindex="0"`, con el nombre accesible «Testimonios de alumnos») y se desplaza con las flechas del teclado, con el contorno de foco de 2 px de 7.3 (AT-112). Sin JavaScript no hay carril y no hay parada extra.

### 7.13 Sombras (tokens)
| Token | Claro | Oscuro |
|---|---|---|
| `card` | `0 1px 0 orient-950/6 %, 0 24px 50px -36px orient-800/50 %` | `0 0 0 1px orient-50/6 %, 0 28px 50px -34px black/85 %` |
| `card-hover` | `0 1px 0 orient-950/6 %, 0 30px 60px -34px orient-800/60 %` | `0 0 0 1px vibrant/25 %, 0 34px 60px -32px black/90 %` |
| `float` | `0 20px 40px -20px orient-950/35 %` | `0 0 0 1px orient-50/8 %, 0 24px 44px -20px black/80 %` |
| `rail` | `0 0 0 1px orient-950/8 %, 0 10px 22px -12px orient-800/45 %` | `0 0 0 1px orient-50/10 %, 0 12px 24px -12px black/70 %` |

### 7.14 Iconografía
Íconos de contorno de **Material Symbols Light** (Google, licencia Apache 2.0; ADR-063), de la colección `material-symbols-light` de Iconify: peso 200, tamaño óptico 24, grado 0, variantes «-outline», con el mismo nombre que tenían en el sitio antiguo. Las rutas SVG se copian a `icons.ts` y se pintan rellenas en SVG en línea, con `viewBox="0 0 24 24"` y color `currentColor`. No hay paquetes ni fuentes de íconos (AT-016). Son decorativos (`aria-hidden`) salvo que sean el único contenido de un control (entonces el control lleva nombre accesible). Las redes y los SVG de tecnologías conservan sus SVG de marca propios, sin cambios. El trazo de 1 px se validó a simple vista en Educación; el contraste de los íconos se midió en E170-I01 (12-11-2026): todos cumplen 3:1 sobre fondo plano; los controles que son solo ícono tienen 6,35:1 como mínimo en claro y 12,43:1 en oscuro; los íconos sobre degradados (hero y logotipo) no se midieron.

## 8. Movimiento y accesibilidad
- **Obligatorio:**
  - respetar `prefers-reduced-motion` (sin animaciones de entrada ni de tecleo);
  - el contenido es visible sin JavaScript;
  - sin CLS por animaciones;
  - foco siempre visible;
  - contraste AA.
- **Duraciones (tokens):** `fast` 200 ms (globos, chevron), `base` 250 ms (color y borde), `medium` 350 ms (subrayado de la navbar), `slow` 400 ms (elevación de tarjetas), `theme` 700 ms (barrido del cambio de tema, ADR-110).
- **Curvas:** `ease` estándar para color; `cubic-bezier(.2, .7, .2, 1)` para desplazamientos y elevación; `cubic-bezier(.16, 1, .3, 1)` (*expo out*) para el barrido del cambio de tema.
- **Permitido:** cambios de color, borde y opacidad; desplazamientos de 2 a 4 px; escalado del subrayado; giro del chevron; desplazamiento suave entre anclas; las máquinas de escribir del logotipo y del hero; el barrido diagonal al cambiar de tema (ADR-110), durante el cual se apagan las transiciones propias de los componentes; el pulso del punto vivo de Experiencia (ADR-115).
- **No permitido:** animaciones de entrada al hacer scroll en Inicio; parallax; animaciones en bucle salvo el cursor de la máquina de escribir y el pulso del punto vivo de Experiencia; animar el fondo de la página al cambiar de tema, salvo el barrido diagonal de ADR-110.
- **Excepción acotada (ADR-115):** el punto vivo del final de la línea de tiempo de Experiencia pulsa en bucle (pseudoelemento de 10 px que crece hasta 2,6 veces y se desvanece, 2,4 s, `--ease-out-soft`). Es la única animación infinita de la página, solo CSS, decorativa (`aria-hidden`) y sin CLS. No sienta precedente: otra animación en bucle necesita su propio ADR. Riesgo aceptado: no tiene control de pausa propio (WCAG 2.2.2, AT-164).
- **Con `prefers-reduced-motion: reduce`:** se anulan transiciones, desplazamiento suave y el barrido del cambio de tema (el tema cambia al instante), las máquinas de escribir no arrancan y el punto vivo de Experiencia queda quieto con un halo fijo.
- Zona táctil mínima de 44 × 44 px en todo control.
- No se usa AOS (E20-I04). Si otra página necesita aparición al hacer scroll, usa la utilidad de E20-I04, que nunca deja contenido invisible.

## 9. Reglas de Tailwind CSS v4
- Los tokens se declaran en `@theme`, en la hoja global. No hay `tailwind.config.js`.
- El escaneo de fuentes se restringe a `src/` (ADR-004).
- La variante oscura se controla con la clase `.dark` en `<html>` (ADR-042), con la clave `theme` (ADR-023).
- No se usan colores, tamaños ni sombras arbitrarias fuera de los tokens, salvo con una justificación escrita en la iteración.
- **Convenciones de nombres (en inglés, ADR-025):**
  - paleta base: `--color-orient-50` … `--color-orient-950`, `--color-orient-925`, `--color-stone`, `--color-primary`, `--color-vibrant`, `--color-gold`, `--color-gold-deep`;
  - semánticos: `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-band`, `--color-footer`, `--color-text`, `--color-heading`, `--color-text-muted`, `--color-text-soft`, `--color-accent`, `--color-kicker`, `--color-icon`, `--color-icon-rail`, `--color-border`, `--color-border-strong`, `--color-focus`; cambian de valor según el tema y los componentes usan solo estos;  Los colores por tema que la sección 7 fija para un componente y que no son semánticos (hover del botón de ícono y de la flecha, contorno de tarjeta en oscuro, etiqueta, relleno de estrella) se declaran como variables de componente en la hoja global, con los valores exactos de la sección 7 (ADR-046). No se agrega ninguna otra sin que esté escrita en la sección 7.
  - variables de componente declaradas en la hoja global con los valores de la sección 7 (ADR-046): `--profile-current-bg` y `--profile-current-fg` (perfil activo del conmutador, mismos valores que el selector de idioma, 7.2), `--rail-hover-bg` y `--rail-hover-fg` (riel social al pasar, 7.4), `--metric-sign` (signo de toda cifra de display, 4.3) y `--tech-plate-bg` (placa del logo de tecnología en Desarrollador: `bg` en claro y `orient-50` en oscuro, ADR-069). Los separadores de la banda usan los tokens `gold` y `vibrant`, sin variable propia (ADR-058).
  - familias: `--font-display` (Sora), `--font-sans` (Work Sans) y `--font-mono` (IBM Plex Mono); sus variables de origen (`--font-sora`, `--font-work-sans` y `--font-ibm-plex-mono`) las genera la API de fuentes de Astro (ADR-111);
  - sombras: `--shadow-card`, `--shadow-card-hover`, `--shadow-float`, `--shadow-rail`;
  - duraciones y curvas: `--duration-fast|base|medium|slow|theme`, `--ease-out-soft`, `--ease-expo-out`;
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
- axe deja sin veredicto el contraste del texto sobre degradados, texturas y pseudoelementos (AT-113): para esas superficies, la prueba es la tabla 4.4 y la revisión visual, no la ausencia de violaciones de la herramienta.

## 11. Composición por página (ADR-036)

### 11.1 Regla general
Todas las páginas comparten el sistema común (paleta, tipografía, espaciado, movimiento y primitivas). Cada página arma esas piezas con una composición propia. Todo patrón nuevo se documenta aquí antes de implementarse, en la primera iteración de su épica y con validación de Felipe.

### 11.2 Catálogo de patrones
| Patrón | Descripción | Disponible para |
|---|---|---|
| Hero asimétrico 7 + 5 | Texto y retrato con marco desplazado y riel social sobre fondo de puntos; certificaciones bajo el texto, sin contenedor | Inicio |
| Banda de ancho completo | Franja con retícula (en Inicio, con curvas de nivel, ADR-113), encabezado de banda y contenido en fila | Inicio (cifras), Educación (franjas), Desarrollador (tecnologías), Docente (tutoría), Instructor (titular), Talento Digital (cifras de Logros), Foro (pasos), Recursos (ficha de la ruta), Contacto (canales) |
| Zigzag | Franjas que alternan la orientación título / contenido, con variante espejo | Educación (certificaciones), Docente (una franja por institución), Talento Digital (una franja por bootcamp, con portada) |
| Grilla simétrica de tarjetas | Encabezado centrado y tarjetas iguales en 3 columnas desde 1.024 px (una bajo esa medida), sin JavaScript. Cada tarjeta lleva foto, rótulo, título, instituciones, periodo y modalidad, texto, etiquetas y enlaces al pie | Experiencia (resumen), Docente (asignaturas, variante 2 × 2 sin foto: 2 columnas desde 1.024 px), Instructor (relatoría, variante sin foto: tarjetas compactas en 2 columnas desde 1.024 px), Foro (categorías, variante 2 × 2 sin foto, como Docente), Recursos (temáticas, una grilla por grupo) |
| Carril con ajuste | Fila desplazable con `scroll-snap`, 1, 2 o 3 tarjetas por página según el ancho | Inicio (testimonios, todos los anchos) |
| Mosaico por peso | Retícula de piezas de tamaños distintos según su peso (mayor, intermedio, menor), sin JavaScript | Educación (formación), Desarrollador (portafolio, ritmo 7/5), Instructor (cursos: destacada a todo el ancho y ritmo 7/5, 5/7, 6/6, 12) |
| Línea de tiempo | Hitos en secuencia. Versión compacta: lista ordenada vertical con riel de 1 px y marcadores circulares con ícono. Versión horizontal (ADR-115): tarjetas de hito en 3 columnas desde 1.024 px bajo una línea con nodos, años y un final «Hoy»; vertical bajo esa medida | Experiencia (resumen, versión horizontal), Instructor (planes SENCE agrupados por fecha), Recursos (etapas de la ruta, con pasos marcables) |
| Lista a dos columnas con regla superior | Entradas con regla de 1 px `border-strong` y tramo dorado de 48 px, ícono de 32 px, h3 en Sora y texto con énfasis; una columna bajo 768 px | Desarrollador (aspectos técnicos), Talento Digital (alianzas de Logros, sin h3: frase en Sora) |
| Confirmación centrada | Encabezado centrado (7.5) con un ícono entre el rótulo y el `<h1>`, texto y dos botones, todo sobre `bg`, sin tarjeta ni animación | Agradecimiento, 404 |
| Documento con índice | Cabecera alineada a la izquierda con ficha de versión y vigencia, índice de anclas (lateral y pegajoso desde 1.024 px, arriba bajo esa medida) y secciones de texto con h2 | Privacidad |
| **Reservados** (prototipo): pestañas verticales de trayectoria, cita destacada entre reglas, tarjeta de contacto | Patrones del prototipo que no están en el index | **Solo con aprobación de Felipe** para cada página |

### 11.3 Inicio
1. **Hero asimétrico** (7.4), fondo `bg`.
2. **Banda de cifras** (7.8), fondo `band` con curvas de nivel (4.5, ADR-113), dentro de `<main>` (AT-012).
3. **Testimonios** en carrusel con encabezado centrado (7.5, 7.6 y 7.12), fondo `bg-alt`, dentro de `<main>`.
4. **Pie** (7.9).

Ritmo de fondos: claro `white` → `orient-50` → `stone` → `orient-50`; oscuro `orient-950` → banda → `orient-925` → `orient-950`.

### 11.4 Educación
La página abre con el `<h1>` y su bajada, alineados a la izquierda, sobre el campo de puntos y el halo del hero (4.5, ADR-114); sigue con la formación y las certificaciones, y cierra con el bloque «Instructor REUF» y un llamado final con «Descargar CV» y «Envíame un mensaje» (ADR-061).

**Formación académica y diplomados** (encabezado alineado a la izquierda, ADR-060):
- Patrón **mosaico por peso** (11.2), sin conmutador, filtros ni JavaScript. Orden fijo: el título universitario a todo el ancho; los diplomados y el técnico en tarjetas estándar; las 3 distinciones en tarjetas compactas aparte.
- Un ícono por categoría (universitaria, diplomado, técnica y reconocimiento), no uno por entrada.
- El diploma de la Universidad de Chile se publica como «Diplomado en Estrategias Metodológicas y Evaluativas para la Formación Laboral».

**Certificaciones** (ADR-036, ADR-061 y ADR-062): la sección lleva su propio encabezado, con «Validación Oficial» y «Certificaciones Profesionales» (`es-CL`), y debajo van tres franjas temáticas (7.8), cada una con el rótulo «Certificaciones», en este orden:
1. **Inteligencia artificial** (5): Claude Certified Developer – Foundations, Oracle AI Associate, Oracle AI Professional, AWS AI Practitioner y Agentic AI Certified Foundations Associate.
2. **Tecnología Cloud** (`en-US`: Cloud Technology) (2): AWS Cloud Practitioner y Oracle OCI Associate. Es la franja espejo (7.8).
3. **Desarrollo y datos** (4): AWS Developer Associate, Python Institute PCEP, Oracle Data Science Professional y Oracle Developer Professional.

- El orden dentro de cada franja lo fija el campo `position` de `src/data/certifications.ts`, que es la única lista de credenciales (11). La cifra del hero y el JSON-LD salen de esa lista (ADR-053) y no dependen de la franja.
- Fondos alternos `band` / `bg` y zigzag; en móvil, una columna. Cada franja lleva su textura (7.8, ADR-114): `ai`, curvas de nivel en relieve; `cloud`, campo de puntos; `dev-data`, curvas de nivel en cordillera.
- Cada insignia abre su detalle en un `<dialog>` nativo, con foco atrapado, Escape que lo cierra y retorno del foco al botón. Sin JavaScript, los 11 detalles se ven en la propia franja y los botones no aparecen.
- Las insignias van en tamaño pequeño, con carga diferida y ancho y alto declarados.
- No se muestran vencimientos.
- **Instructor REUF** (ADR-114): tarjeta con el ícono, el título y el párrafo, y un panel de 3 cifras en una lista de definiciones (`dl`): «+150 Módulos aprobados» (`reuf-modules`), «+10 Años de experiencia» (`teaching-years`) y «+5 Bootcamps de Talento Digital» (`bootcamps`); en `en-US`, «Approved modules», «Years of experience» y «Talento Digital bootcamps». Los valores y el «+» salen de `src/content/home/stats.json` por id (ADR-053), así que coinciden con Inicio. Cada cifra: rótulo arriba en IBM Plex Mono de 12 px, mayúsculas y `text-soft`; cifra en Sora de 2,5 rem con el «+» antepuesto en `primary` en claro y `gold` en oscuro (4.3).
- Desde 1.024 px, dos columnas: el texto a la izquierda y el panel a la derecha (15 a 18 rem), separado por una barra vertical de 2 px con el degradado `gold` → `vibrant` (ADR-058), con las cifras apiladas y divisores `border` entre ellas.
- Entre 768 y 1.023 px, el panel pasa bajo el texto como una fila de 3 cifras, con la barra en horizontal arriba, divisores verticales y rótulo y cifra en filas comunes (`subgrid`).
- Bajo 768 px, las 3 cifras apiladas bajo el texto, con la barra arriba y divisores horizontales.
- El párrafo no cambia y repite la cifra de módulos a propósito (lectura completa frente a lectura rápida).

### 11.5 Experiencia
La página abre con el `<h1>` «Experiencia Laboral» (`en-US`: «Work Experience»), centrado, con rótulo «Resumen de experiencia» y bajada, sobre fondo `bg` con el campo de puntos y el halo del hero (4.5), que cubren el encabezado y la línea de tiempo como una sola capa (ADR-115). Sigue la **línea de tiempo horizontal** y luego los tres perfiles en el patrón **grilla simétrica de tarjetas** (11.2, ADR-065 y ADR-066). Sin JavaScript, sin animación de entrada y sin «Descargar CV» (ADR-057). No lleva subtítulo h2: el `<h1>` y la bajada ya presentan la página.

**Línea de tiempo** (ADR-115, que sustituye en parte a ADR-066; continuación del encabezado, sobre el campo de puntos): lista ordenada sin título visible y con nombre accesible «Hitos de mi trayectoria» (`en-US`: «Career milestones»). Tres hitos en orden cronológico, de izquierda a derecha: Desarrollador Full Stack · INACAP (2011), Docente Universitario · INACAP | Duoc UC | IPLACEX (2013) e Instructor Certificado · Talento Digital para Chile (2023). El año, la modalidad y el estado salen del periodo y la modalidad de la tarjeta de su perfil (AT-081); un periodo sin año de 4 dígitos al inicio corta el build. Sin cifras de tiempo transcurrido.
- **Tarjeta de hito:** fondo `bg` con contorno `border` y relleno de 24 px (20 px bajo 768 px; 44 px extra abajo). Arriba, el ícono (`terminal`, `graduation-cap` o `certificate`, ADR-063) de 22 px en una caja circular de 40 px (`bg`, contorno `border-strong`, `icon`) y el rótulo «Desde {año}» / «Since {año}» (IBM Plex Mono 500, 12 px, 0,14 em, mayúsculas; `gold-deep` en claro y `gold` en oscuro, `--timeline-since`). Debajo, título (Sora 600, 1,15 rem), instituciones (`text-muted`, 15 px) y «modalidad · estado» (13 px, mayúsculas, `text-soft`). El año de inicio va grande y translúcido como fondo tipográfico (Sora 300, 5,25 rem, `accent` al 12 %, decorativo), cortado por el borde inferior derecho y sin cruzar el texto.
- **Desde 1.024 px:** 3 columnas iguales que ocupan el contenedor (separación de 18 px). Sobre ellas, la línea: tramo punteado `border-strong` antes del primer hito; desde él, línea de 2 px con el degradado `gold` → `vibrant`; en cada hito, un nodo de 16 px (núcleo `accent`, anillo `gold`) alineado con el centro del ícono de su tarjeta y unido a ella por un tallo de 1 px con degradado; sobre cada nodo, solo su año (IBM Plex Mono 12 px, `text-soft`); al final, la flecha `arrow-right`, el punto vivo (10 px, `accent`) con su pulso (8) y el rótulo «Hoy» / «Today» (IBM Plex Mono 12 px, mayúsculas, `text-soft`).
- **Bajo 1.024 px:** tarjetas apiladas (28 px de separación) con la línea vertical a la izquierda, el nodo y el año sobre cada tarjeta y, al final, abajo, la flecha, el punto vivo y «Hoy».
- La línea y todos sus adornos son decorativos (`aria-hidden`): la lista mantiene sus 3 elementos legibles en orden. Los hitos no son enlaces.

**Grilla de perfiles** (fondo `bg-alt`): tarjetas `surface` de 7.6, de igual alto, en 3 columnas desde 1.024 px (separación de 32 px; 24 px bajo esa medida) y en una columna bajo ella. Cada tarjeta, de arriba abajo: foto en proporción 3:2 con contorno `border`, rótulo (kicker), título (Sora, 1,15 rem, `<h2>`), instituciones (`text-muted`, 15 px), línea de periodo y modalidad (13 px, mayúsculas, `text-soft`), texto (Work Sans 400, 16 px, con énfasis en `text`), etiquetas (7.7) y enlaces al pie, alineados abajo aunque el texto de cada tarjeta mida distinto. Los perfiles son Docente Universitario (2013 - Actualidad), Desarrollador Full Stack (2011 - Actualidad) e Instructor de Bootcamps (2023 - Actualidad), en ese orden.

**Enlaces de las tarjetas:** botones de ancho completo y 46 px (7.3), apilados con 12 px de separación. **Variante de un enlace** (Docente y Desarrollador): un botón primario «Más detalles» (`en-US`: «More details»), con nombre accesible «Más detalles: <perfil>». **Variante de dos enlaces** (Instructor): un botón primario «Instructor REUF» y debajo uno secundario «Talento Digital»; el texto visible de cada uno nombra su destino. Los destinos salen del mapa de rutas y pueden apuntar a páginas aún no publicadas.

### 11.6 Desarrollador
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Perfil profesional», `<h1>` «Desarrollador Full Stack», institución «INACAP» (Sora) y «2011 - Actualidad · Modalidad presencial» en mayúsculas, iguales a Experiencia (ADR-067).
2. **Aspectos técnicos:** encabezado alineado a la izquierda y lista a dos columnas con regla superior (4 entradas), fondo `bg`.
3. **Tecnologías:** banda (7.8) con encabezado de banda y las 5 categorías apiladas; cada una con h3 en estilo kicker y regla dorada de 32 px, y retícula de fichas de 2, 3, 4 y 6 columnas (bajo 640, desde 640, 1.024 y 1.280 px). Ficha: fondo `surface`, contorno 1 px `border`, caja de logo de 44 px (`--tech-plate-bg`: `bg` en claro y placa `orient-50` en oscuro, para que los logos de marca oscuros se distingan; los SVG no cambian, ADR-069) con el SVG de marca a 28 px, nombre (600, 15 px) y rol (`text-soft`, 13 px). OCI usa el mismo SVG que Oracle Database, como en el sitio antiguo; el nombre de la ficha los distingue.
4. **Portafolio:** fondo `bg-alt`; encabezado alineado a la izquierda («Proyectos Reales», «Mi Portafolio Web») con bajada y, bajo ella, el grupo de filtros (Todos, Front-End, Full-Stack, Back-End): botones de 44 px con contorno `border-strong`, Work Sans 600 12,5 px en mayúsculas e ícono de 18 px; el activo usa los colores del idioma actual (7.2) y `aria-pressed`. Sin JavaScript el grupo no se muestra y se ven los 12 proyectos. Mosaico de 12 columnas desde 1.024 px con el ritmo 7/5, 5/7, 6/6 (se recalcula sobre las tarjetas visibles al filtrar); una columna bajo esa medida. Tarjeta base (7.6) con portada 16:9 y la pastilla de categoría arriba a la izquierda (colores del idioma actual), h3 en Sora, descripción con énfasis, etiquetas (7.7 reducida: 11,5 px, relleno 4 × 8) con logo de 10 px y enlace «Ver repositorio» / «Ver proyecto» en `accent`, siempre visible.

### 11.7 Docente
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Perfil profesional», `<h1>` «Docente Universitario», instituciones «INACAP | Duoc UC | IPLACEX» (Sora) y «2013 - Actualidad · Modalidad semipresencial» en mayúsculas, leídos del perfil de Experiencia (ADR-070). Debajo, «Docente con +10 años de experiencia» (cifra en Sora, signo en `--metric-sign`, derivada de `stats.json`) y un índice `<nav>` «Instituciones» con 3 enlaces de 44 px (`surface`, contorno 1 px `border`, ícono `graduation-cap`, nombre en Sora y resumen en 13 px `text-soft`) hacia las franjas; 3 columnas desde 768 px.
2. **Asignaturas impartidas:** fondo `bg-alt`, encabezado centrado y 4 tarjetas base (7.6) en 2 columnas desde 1.024 px (una bajo esa medida), con h3 en Sora, texto con énfasis y 2 etiquetas (7.7) alineadas abajo.
3. **Experiencia por institución:** encabezado alineado a la izquierda sobre `bg` y 3 franjas (7.8) en zigzag, de la más reciente a la más antigua: IPLACEX (`bg`), Duoc UC (`band`, espejo) e INACAP (`bg`). Rótulo: periodo; titular h3: nombre de la institución; contenido: foto 3:2 con pie (solo INACAP), texto con énfasis y «Ver más información» a LinkedIn en `text`, 600 y subrayado (no `accent`: sobre `band` da 4,09:1 en claro, AT-114), externo y avisado.
4. **Tutor de alumnos:** banda (7.8) con encabezado de banda; texto «Docente Tutor» (h3) y 3 cifras en `dl` (+10 años, +2.000 alumnos y 1 hackatón), separadas por barras de 2 px con degradado `gold` → `vibrant`; 5/7 desde 1.024 px.
5. **Cargos especiales:** fondo `bg-alt`, encabezado centrado y 2 entradas de 52 rem como máximo (`surface`, contorno `border`, ícono de 32 px, h3 en Sora, detalle y «año · INACAP» en mayúsculas).

Sin JavaScript ni animaciones de entrada.

### 11.8 Instructor
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Perfil profesional», `<h1>` «Instructor REUF» (`en-US`: «REUF Instructor») y bajada con énfasis (ADR-072).
2. **Instructor titular:** banda (7.8) con encabezado de banda «REUF - SENCE» / «Instructor Titular». Tres zonas desde 1.024 px (5fr 4fr 3fr; apiladas bajo esa medida): texto; `dl` de 2 cifras («+3» años y «+150» módulos, de `stats.json`, separadas por la barra degradada de la banda de cifras); botón dorado «Descargar Certificado REUF» con ícono de descarga y nota de 14 px. En `en-US` el nombre accesible dice «(PDF, Spanish)» y la nota avisa que el certificado está en español (ADR-017).
3. **Principales cursos:** encabezado alineado a la izquierda, fondo `bg`. Mosaico de 12 columnas desde 1.024 px (separación de 32 px; 24 px y una columna bajo esa medida). Tarjeta base (7.6) destacada a todo el ancho: rótulo con ícono `new-releases` en `accent` y el código del plan, h3 en Sora, texto con énfasis, `dl` de 4 datos (2 columnas bajo 640 px, 4 desde ahí) y chips (7.7) bajo una regla `border`. Siete tarjetas compactas con ritmo 7/5, 5/7, 6/6 y la última a todo el ancho; cada una con caja de ícono de 44 px (contorno `border-strong`), h3 en Sora 1,15 rem y texto con énfasis.
4. **Relatoría:** encabezado alineado a la izquierda («Relatorías», «Otros Cursos, Capacitaciones y Bootcamps impartidos»), fondo `bg-alt`. Grilla simétrica de 6 tarjetas compactas (7.6) en una lista, 2 columnas desde 1.024 px (separación de 32 px; 24 px y una columna bajo esa medida), de la más reciente a la más antigua. Cada tarjeta: caja de ícono de 44 px, institución en h3 (Sora 1,15 rem), cargo en chip (7.7), periodo · modalidad (13 px, mayúsculas, `text-soft`) con ícono `event` de 16 px y texto con énfasis (ADR-073).
5. **Planes SENCE:** encabezado alineado a la izquierda, fondo `bg`. Línea de tiempo compacta (riel de 1 px y marcadores de 44 px con `medal`), un hito por fecha (h3 de 13 px en mayúsculas) y, bajo él, cada plan en un bloque `surface` con contorno `border` y borde izquierdo de 2 px (`border-strong`; `gold` en el destacado), h4 en Sora con ícono `task-alt` (`new-releases` en el destacado) y texto de 15 px.

Ritmo de fondos: `bg` → `band` → `bg` → `bg-alt` → `bg`. Sin JavaScript ni animaciones de entrada.

### 11.9 Talento Digital
1. **Cabecera** alineada a la izquierda, fondo `bg`, sin foto: rótulo «Instructor Senior» (`en-US`: «Senior Instructor»), `<h1>` «Talento Digital para Chile» (no se traduce), bajada con énfasis cuyo «2.000 horas» sale de `stats.json` (`class-hours`), y 3 insignias como chips (7.7) con ícono de 18 px: «Certificaciones Profesionales» y «Relator REUF» (`verified`) y el nombre largo del diplomado de Educación (`graduation-cap`), que ocupa dos renglones a 375 px (aceptado, ADR-076).
2. **Bootcamps realizados:** encabezado alineado a la izquierda sobre `bg` con bajada con énfasis, y 6 franjas (7.8) en zigzag, en el orden de `main`, con fondos `bg` / `band` y espejo en las pares (como Docente). Rótulo: pastilla de tecnologías; titular h3: bootcamp; bajada: plan y ejecución u OTEC, que se suma al nombre accesible. Contenido: portada SVG 5:2 con contorno `border`, texto con énfasis, etiquetas (7.7), «Logros» (h4 en Sora 1,1 rem) con su texto y una línea `timer` · «horas | años» (13 px, mayúsculas, `text-soft`, números tabulares) bajo una regla `border`. Las horas salen de `src/data/training-plans.ts` (ADR-074).
3. **Logros:** encabezado alineado a la izquierda sobre `bg` («Alianzas Estratégicas», h2 «Logros») con bajada con énfasis; 3 alianzas en lista a dos columnas con regla superior (ícono de 32 px y frase en Sora 1,15 rem; una columna bajo 768 px). Al cierre, una banda (7.8) sin encabezado con un `dl` de 3 cifras de `stats.json` («+2.000» horas de clase, «+5» bootcamps y «+150» módulos REUF), signo en `--metric-sign` y barras degradadas `gold` → `vibrant` entre cifras (ADR-076).

Ritmo de fondos: `bg` → `bg` / `band` alternos en las 6 franjas → `bg` → `band`. Sin JavaScript ni animaciones de entrada. Sin JSON-LD (AT-093).

### 11.10 Foro
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Comunidad» (`en-US`: «Community»), `<h1>` «Foro de Aprendizaje» («Learning Forum») y bajada (ADR-078).
2. **Participar en tres pasos:** banda (7.8) con encabezado de banda («Cómo funciona» / «Participar en tres pasos»). Lista de 3 pasos, 3 columnas desde 1.024 px (separación de 40 px; una columna bajo esa medida). Cada paso: regla superior de 1 px `border-strong`, ícono de 32 px en `icon` (`account-circle`, `rule` y `forum`), h3 en Sora 1,15 rem y texto de 16 px en `text`. Los enlaces externos del texto van en `text`, 600 y subrayados (no `accent`, 4.3).
3. **Dónde publicar cada cosa:** fondo `bg-alt`, encabezado centrado y 4 tarjetas base (7.6) en 2 columnas desde 1.024 px, sin foto, con h3 en Sora y texto.
4. **Conversación:** fondo `bg`, encabezado alineado a la izquierda («Hilo general» / «Conversación»). Aviso de transparencia (fondo `bg-alt`, contorno `border`, ícono `info` de 20 px, 15 px, ancho máximo de 62 caracteres), con enlace a la política de privacidad (E155-I01). Panel `surface` con contorno `border` y sombra `card`, alto mínimo de 520 px, con un marcador estático (ícono `forum` y «Cargando la conversación…», `role="status"`), sin spinner. Giscus se carga a 400 px de la pantalla, con tema `light` / `transparent_dark` sincronizado en vivo. Debajo, «Abrir la conversación completa en GitHub», centrado. Sin JavaScript, el panel se oculta y un bloque `surface` enlaza a las discusiones.

Ritmo de fondos: `bg` → `band` → `bg-alt` → `bg`. Sin AOS ni animaciones de entrada.

### 11.11 Recursos
Bóveda mixta (ADR-079, composición A de ADR-080): una ruta con progreso y recursos por temática.
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Comunidad», `<h1>` «Bóveda de recursos» (`en-US`: «Resource vault») y bajada.
2. **Ficha de la ruta:** banda (7.8) con encabezado de banda («Ruta de aprendizaje» / «Desarrollo Web & IA»), resumen centrado (Work Sans 400, 1,08 rem), `dl` de 3 datos (Qué logras, Conocimientos previos y Duración estimada; `dt` de 12,5 px en mayúsculas con ícono de 20 px en `icon`, regla superior `border-strong`; 3 columnas desde 1.024 px) y bloque de progreso: texto «N de 25 pasos completados» (600, 15 px, números tabulares), botón «Reiniciar progreso» (contorno `border-strong`, 44 px, ícono `restart`), barra de 6 px (fondo `border-strong`, relleno con el degradado `gold` → `vibrant`) y aviso de almacenamiento local (`text-soft`, 14 px). El progreso solo aparece con JavaScript.
3. **Pasos de la ruta:** fondo `bg`, encabezado alineado a la izquierda y buscador (etiqueta visible, campo de 48 px `surface` con ícono `search`; solo con JavaScript). **Línea de tiempo compacta:** un hito por etapa (marcador de 44 px con el número de la etapa en Sora, riel de 1 px, h3 con «Etapa N» en estilo kicker y el título en Sora 1,15 rem, contador «n / total» de 13 px). Bajo cada hito, sus pasos en lista ordenada de numeración continua: bloque `surface` con contorno `border` y borde izquierdo de 2 px (`border-strong`; `gold` si está completado); casilla circular de 22 px en zona de 44 px (marcada: ícono `check` en `accent`); chips 7.7 reducidos (11,5 px, relleno 4 × 8) de formato (ícono en `icon`), dificultad (3 marcas de 6 × 10 px en `accent` / `border-strong` más el nombre) y tecnología; h4 en Sora 1,1 rem con el número de paso en `text-soft`; descripción de 15 px y enlace en `accent` (descarga para archivos locales con su tipo y peso al lado en `text-soft` de 14 px, «PDF · 6,0 MB», y en `en-US` «· In Spanish»; externo avisado para el resto). Bajo 640 px se reducen rellenos y los bloques ocupan el ancho bajo el marcador. Al final, la nota «Próximamente» con contorno discontinuo `border-strong` e ícono `more-horiz`.
4. **Conversación de la ruta:** la sección común de Giscus del Foro (11.10) con el hilo `ruta-desarrollo-web-ia`, fondo `bg`.
5. **Temáticas:** sección «Más recursos» sobre `bg-alt`, encabezado 7.5 a la izquierda («Por temática» / «More resources»). Un bloque por grupo (Empleabilidad, Python y Java): h3 en Sora 1,3 rem con el número de recursos en 13 px `text-soft` (oculto a lectores de pantalla) y debajo una grilla simétrica de tarjetas (1 columna, 2 desde 768 px y 3 desde 1.024 px; separación de 24 y 32 px). Tarjeta `surface` con contorno `border` y relleno de 24 px: chips de la ruta, h4 en Sora 1,1 rem, descripción de 15 px y enlace con su tipo y peso. Sin progreso ni JavaScript.

Sin AOS ni animaciones de entrada; solo cambian el color del borde y el ancho de la barra.

### 11.12 Contacto
Composición A (ADR-083).
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Contacto» (`en-US`: «Contact»), `<h1>` «Contáctame» («Get in touch») y bajada.
2. **Canales de contacto:** banda (7.8) con encabezado de banda («Canales directos» / «Canales de contacto»). Lista de 4 canales de `main`, sin Discord (ADR-044): correo, LinkedIn, GitHub y REUF. 4 columnas desde 1.024 px, 2 desde 640 px y una bajo esa medida (separación de 16 px). Cada canal es un enlace `surface` con contorno `border`, alto mínimo de 76 px: caja de ícono de 44 px (contorno `border-strong`, ícono de marca de 22 px en `icon`), nombre en Sora 1 rem (`heading`) y detalle de 14 px en `text-soft`; los externos llevan el ícono `external-link` de 16 px y aviso para lectores de pantalla. Desde 1.024 px el contenido se apila y el ícono externo va arriba a la derecha. Al pasar: contorno `vibrant` y subida de 2 px.
3. **Formulario y agenda:** fondo `bg-alt`. Retícula de 12 columnas desde 1.024 px (48 px de separación): formulario en 7 y Calendly en 5; una columna bajo esa medida (64 px de separación), formulario primero. Cada columna es una sección con encabezado alineado a la izquierda.
   - **Formulario** («Formulario» / «Envíame un mensaje»): ficha con ubicación (`location-on`) y tiempo de respuesta (`schedule`), íconos de 20 px en `icon` y texto de 15 px en `text-muted`; debajo, panel `surface` con contorno `border` y sombra `card` (relleno de 40 × 34 px desde 768 px; 32 × 20 px bajo esa medida). Campos de 7.10: nombre y correo en dos columnas desde 640 px; asunto y mensaje (160 px de alto mínimo) a todo el ancho. Checkbox de 22 px con el texto «Leí y acepto la política de privacidad» (15 px, `text`) y el enlace en `accent`, 600 y subrayado. Turnstile, aviso sin JavaScript (`bg-alt`, contorno `border`), región de estado y botón primario «Enviar mensaje» con ícono `send`, nunca deshabilitado (ADR-035).
   - **Agenda** («Videollamada» / «Agenda una reunión (15 min)»): panel `surface` con contorno `border` y sombra `card` que reserva 700 px de alto. Antes de cargar muestra el ícono `event` de 32 px, el aviso de servicio externo y el botón secundario «Cargar el calendario»; al pulsarlo carga Calendly. Debajo, enlace externo «Abrir el calendario en Calendly», siempre visible, en `text`, 600 y subrayado (no `accent`: sobre `bg-alt` da 4,37:1 y 4.4 lo limita a texto grande, AT-110). Sin JavaScript se oculta el botón.

Ritmo de fondos: `bg` → `band` → `bg-alt`. Sin AOS ni animaciones de entrada. Sin JSON-LD.

### 11.13 Agradecimiento
Composición B «Confirmación centrada» (ADR-086). Página `noindex, follow` y fuera del sitemap, a la que redirige el formulario de Contacto tras un envío correcto.
1. **Contenido único**, fondo `bg`, sin tarjeta, centrado en horizontal y en vertical entre la barra y el pie, con relleno vertical de 80 px (96 px desde 768 px) y ancho máximo de 40 rem:
   - encabezado centrado (7.5): rótulo «Contacto» (`en-US`: «Contact») entre dos reglas doradas;
   - ícono `mail` (sobre de contorno, 7.14) de 56 px en `icon`, decorativo, a 24 px del rótulo;
   - `<h1>` «¡Mensaje enviado!» («Message sent!») a 20 px del ícono;
   - texto (bajada de 7.5, `text-soft`, 300, máximo de 52 caracteres): «Gracias por contactarme. Recibí tu mensaje correctamente y me comprometo a responderte a la brevedad posible (usualmente dentro de 24-48 horas).» («Thank you for reaching out. I received your message and I will get back to you as soon as possible (usually within 24-48 hours).»).
2. **Botones**, a 40 px bajo el texto, de 46 px (7.3): primario «Volver al inicio» («Back to home»), a la portada del idioma, y secundario «Enviar otro mensaje» («Send another message»), a Contacto. Apilados y a todo el ancho bajo 640 px (12 px de separación); en fila centrada desde 640 px (16 px).

Sin color de éxito (el sistema no tiene), sin tarjeta, sin animación de entrada ni del ícono, sin AOS, sin JavaScript y sin JSON-LD.

### 11.14 Privacidad
Composición A «Documento con índice» (ADR-087). Página indexable y en el sitemap, a la que enlazan el formulario de Contacto, el pie y el aviso de Giscus.
1. **Cabecera** alineada a la izquierda, fondo `bg`: rótulo «Privacidad» (`en-US`: «Privacy»), `<h1>` «Política de privacidad» («Privacy policy») y bajada. Debajo, un `dl` con «Versión» y «Vigente desde» (`dt` de 12,5 px en mayúsculas, `text-soft`; `dd` en Sora 1,15 rem, números tabulares): la versión sale de la constante única `PRIVACY_POLICY_VERSION` y la fecha va en `<time datetime>`, en formato largo del idioma. Debajo, el aviso «Este texto es informativo y no constituye asesoría legal.» (14 px, `text-soft`).
2. **Documento**, fondo `bg`: retícula de 12 columnas desde 1.024 px (48 px de separación), con el índice en 4 y el texto en 8; una columna bajo esa medida, con el índice arriba (2 columnas desde 640 px).
   - **Índice** (`<nav>` «Contenido de la política» con lista ordenada): rótulo kicker «En esta página» y enlaces de 44 px de alto (15 px, `text-muted`) con regla vertical de 1 px `border` a la izquierda; al pasar, la regla pasa a `vibrant` y el texto a `text`. Desde 1.024 px es pegajoso a 100 px del borde superior. Sin JavaScript.
   - **Secciones** (8, con `id` para el índice y `scroll-margin-top` de 8 px sobre el `scroll-padding` de la barra): regla superior de 1 px `border-strong` con tramo dorado de 48 px (`gold` → `vibrant`, patrón de 11.2), `<h2>` en Sora 1,5 rem, párrafos de Work Sans 400, 1,08 rem, interlineado 1,75 y 62 caracteres de ancho en `text-muted`, y separación de 40 px entre secciones. Las claves de almacenamiento local (`theme`, `perfil-hero`, `rutas-progreso`) van en una lista con la clave en un recuadro de 1 px `border-strong` (600, `text`). Los enlaces a las políticas de terceros (Cloudflare, Calendly y GitHub) son enlaces externos en `accent`, 600 y subrayados, de 44 px de alto, con ícono y aviso de pestaña nueva; el del responsable es un `mailto:`.
   - Las 8 secciones, en orden: responsable, datos que recibe el sitio, formulario de contacto, Turnstile, Calendly, Giscus y GitHub, lo que se guarda en el navegador, y versión y cambios.

Ritmo de fondos: `bg` → `bg`. Sin AOS ni animaciones de entrada, sin JavaScript y sin JSON-LD. El texto es un borrador informativo sin validar por un especialista (BL-08, AT-105).

### 11.15 404
Composición A «Confirmación centrada» (ADR-088), la misma de Agradecimiento (11.13) sobre el componente `CenteredMessage`. Página `noindex, follow` y fuera del sitemap; hay tres archivos: `404.html` (raíz, en español), `es/404.html` y `en/404.html`, que Cloudflare sirve con estado 404 para las rutas inexistentes. El selector de idioma lleva a `/es/404/` ↔ `/en/404/`; en la 404 de la raíz lleva a `/en/404/`.
1. **Contenido único**, fondo `bg`, sin tarjeta, centrado en horizontal y en vertical entre la barra y el pie, con relleno vertical de 80 px (96 px desde 768 px) y ancho máximo de 40 rem:
   - encabezado centrado (7.5): rótulo «Error 404» (`en-US`: «Error 404») entre dos reglas doradas;
   - ícono `search` (lupa de contorno, 7.14) de 56 px en `icon`, decorativo, a 24 px del rótulo;
   - `<h1>` «Página no encontrada» («Page not found») a 20 px del ícono;
   - texto (bajada de 7.5, `text-soft`, 300, máximo de 52 caracteres): «La página que buscas no existe o fue movida. Revisa que la dirección esté bien escrita, o vuelve al inicio.» («The page you are looking for does not exist or has been moved. Check that the address is spelled correctly, or go back to the home page.»).
2. **Botones**, a 40 px bajo el texto, de 46 px (7.3): primario «Volver al inicio» («Back to home»), a la portada del idioma, y secundario «Contactar» («Contact»), a Contacto. Apilados y a todo el ancho bajo 640 px (12 px de separación); en fila centrada desde 640 px (16 px).

Todas las URL de la página son absolutas, para que funcione a cualquier profundidad de ruta (AT-004). El logotipo anima como en el resto del sitio (3.3, AT-003). Sin color de éxito ni de error, sin animación de entrada ni del ícono, sin AOS, sin JavaScript propio y sin JSON-LD.

## 12. Prototipos de referencia
- **Ubicación:** `_planificacion/20_epica-sistema-diseno/prototipos/felipe-cuevas-ia.html` (claro) y `felipe-cuevas-ia-oscuro.html` (oscuro). No se publican ni se compilan.
- **Son referencia de:** paleta, tipografía, espaciado, bordes, sombras, texturas, botones, navbar (estilo), hero (lenguaje visual), banda de cifras, tarjetas de testimonio y pie.
- **No son referencia de:**
  - el **contenido** (textos, cifras, empresas, correos y personas son ficticios: el contenido viene de `main`);
  - el **logotipo** (rige la sección 3);
  - las **opciones de la navbar** (rige la sección 2.1);
  - las secciones **Trayectoria, Especialización y Contacto** (patrones reservados, 11.2);
  - sus **dependencias**: Google Fonts, Tailwind por CDN v3 y la foto de Unsplash no se usan.