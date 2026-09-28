# DESIGN.md · felipecuevas.dev

> **Estado: Esqueleto v0. Los valores se definen en la iteración E20-I01** (épica E20 · Sistema de diseño).
> Este archivo es la **única fuente de verdad del diseño** (ADR-010). Lo marcado "por definir" no se inventa: se decide en E20-I01 con Felipe Cuevas.
> Las secciones "Restricciones cerradas" y "Logotipo que se conserva" son **vinculantes desde ya** y solo cambian con un ADR nuevo.

## 1. Principios de diseño
Por definir en E20-I01. Dirección declarada por Felipe: un rediseño **más elegante y tecnológico** que el sitio actual.

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
- En escritorio, navbar + hero + las **3 certificaciones** (Oracle, AWS, Python Institute) + las **redes sociales** deben verse completos al cargar, sin scroll.
- Matriz de verificación (ADR-016), en área visible: 1366×638, 1440×770, 1536×734 y 1920×950 px, en ambos temas y ambos idiomas.
- No se elimina ningún elemento de la lista de conservación de E40-I01 sin ADR.

### 2.3 Tema claro y oscuro
- Ambos temas son obligatorios y tienen el mismo nivel de terminación.
- Preferencia guardada en `localStorage` con la clave `theme`, con respaldo en `prefers-color-scheme` (ADR-023).
- Sin parpadeo al cargar y sin CLS al alternar.

### 2.4 Internacionalización
- Todo componente funciona con textos en `es-CL` y `en-US`. Los textos en inglés suelen ser más largos: diseñar con holgura.
- Ningún texto visible vive dentro de imágenes.

## 3. Logotipo que se conserva (vinculante)

Especificación extraída del sitio actual (auditoría, área C). Debe reproducirse **idéntica en apariencia y comportamiento** (ADR-008).

### 3.1 Ícono
- **Fuente:** `static/img/favicon.svg` del sitio actual. Es una ventana de terminal (barra superior con dos puntos y chevrons `< >`), definida como máscara, en un lienzo de 48×48 con `viewBox="-2 -2 52 52"`.
- **Render:**
    - contenedor de **32×32 px** pintado con el color de fondo y el SVG aplicado como máscara (`mask-image`, `mask-size: contain`, sin repetición);
    - no es decorativo en el sentido semántico, pero se oculta a tecnologías asistivas (`aria-hidden`), porque el nombre accesible lo aporta el texto.
- **Color:** `#00678A` en tema claro y `#0096C7` en tema oscuro (hoy `orient-600` y `orient-400`), con transición de color de 300 ms.
- **Separación con el texto:** 12 px.

### 3.2 Texto
- **Contenido base:** "Felipe Cuevas".
- **Tipografía:** Lexend, peso 700, tamaño 1,25 rem (20 px) con alto de línea de 1,75 rem, interletraje ajustado (−0,025 em).
- **Color:** `#00131D` en tema claro y `#FFFFFF` en tema oscuro.
- El efecto es de "máquina de escribir" por su **animación de tecleo**, no por usar tipografía monoespaciada.

### 3.3 Efecto máquina de escribir
- **Frases, en ciclo circular y por idioma:**
    - en `es-CL`: "Felipe Cuevas", "Instructor Dev", "Dev Full Stack", "Instructor IA";
    - en `en-US`: la traducción se valida con Felipe en E30-I03, y la primera frase es siempre "Felipe Cuevas".
- **Ritmo:**
  | Paso | Valor |
  |---|---|
  | Arranque antes del primer borrado | 1.400 ms |
  | Escritura por carácter | 84 ms + variación aleatoria de 0 a 34 ms |
  | Borrado por carácter | 42 ms |
  | Espera con la frase completa | 3.600 ms |
  | Espera con el texto vacío | 500 ms |
- **Estructura accesible:**
    - nombre accesible fijo "Felipe Cuevas" en texto solo para lectores de pantalla;
    - una copia invisible de la frase más larga reserva el ancho, para que el CLS sea 0;
    - el texto tecleado es decorativo (`aria-hidden`);
    - el texto nunca se parte en dos líneas.
- **Cursor:**
    - barra de 0,07 em × 0,95 em en el color del texto (`currentColor`), con separación de 0,06 em y radio de 1 px;
    - parpadea cada 1,05 s de forma escalonada y queda fijo mientras se teclea.
- **Pausa:** se detiene con la pestaña oculta o con el logotipo fuera de pantalla, y retoma sin perder su estado.
- **Presencia:** el logotipo anima en **todas** las páginas, incluida la 404 (AT-003).

### 3.4 Movimiento reducido y sin JavaScript
- Con `prefers-reduced-motion: reduce`, el efecto **no arranca**: se muestra "Felipe Cuevas" estático y el cursor no parpadea.
- Sin JavaScript se muestra "Felipe Cuevas" estático.

### 3.5 Pendiente
- ¿El logotipo será enlace a la portada del idioma activo? Es la propuesta P-03, pendiente de aprobación.
- Si la paleta nueva cambia los colores de la sección 3.1 o 3.2, se requiere un ADR que lo autorice de forma explícita.

## 4. Color
Por definir en E20-I01:
- tokens semánticos (fondo, superficie, texto, texto atenuado, borde, primario, acento, estados) en claro y oscuro;
- tabla de contrastes WCAG 2.2 AA para cada par texto/fondo.

Referencia no vinculante del sitio actual: escala `orient` (#E4F3FF a #00131D), `primary` #007EA7, `primary-vibrant` #00B0E8 y `accent-gold` #F8CD46.

## 5. Tipografía
- **Por definir en E20-I01:** familias, escala tipográfica, pesos, alturas de línea y reglas de balance de titulares.
- **Restricción:** Lexend peso 700 es obligatorio para el logotipo.
- **Carga:** fuentes autoalojadas, sin Google Fonts (E20-I03).

## 6. Espaciado y layout
Por definir en E20-I01:
- escala de espaciado;
- anchos máximos de contenedor;
- retícula;
- puntos de quiebre;
- alturas de la barra (escritorio y móvil);
- reglas de secciones.

## 7. Componentes
| Componente | Estado | Notas vinculantes |
|---|---|---|
| Navbar (escritorio y móvil) | Por definir | Sección 2.1 y logotipo de la sección 3 |
| Hero | Por definir | Sección 2.2 |
| Footer | Por definir | Etiquetas alineadas con la navbar e inclusión de Recursos (AT-008) |
| Botones (primario, secundario, ícono) | Por definir | Foco visible, zona táctil de al menos 44 px |
| Tarjetas | Por definir | — |
| Formularios | Por definir | Etiquetas visibles y errores anunciados |
| Encabezado de sección | Por definir | — |
| Selector de idioma | Por definir | Indica el idioma actual y el destino |
| Botón de apariencia | Por definir | Nombre accesible que describe la acción |

## 8. Movimiento y accesibilidad
- **Obligatorio:**
    - respetar `prefers-reduced-motion` (sin animaciones de entrada ni de tecleo);
    - el contenido es visible sin JavaScript;
    - sin CLS por animaciones;
    - foco siempre visible;
    - contraste AA.
- **Por definir en E20-I01:** duraciones, curvas y tipos de animación permitidos.
- No se usa AOS (E20-I04).

## 9. Reglas de Tailwind CSS v4
- Los tokens se declaran en `@theme`, en la hoja global. No hay `tailwind.config.js`.
- El escaneo de fuentes se restringe a `src/` (ADR-004).
- La variante oscura se controla por clase o atributo en `<html>` (se define en E20-I02).
- No se usan colores, tamaños ni sombras arbitrarias fuera de los tokens, salvo con una justificación escrita en la iteración.
- **Por definir en E20-I01:** convenciones de nombres de tokens y de componentes.

## 10. Criterios de calidad visual
Por definir en E20-I01. Mínimos ya vigentes:
- paridad visual entre temas;
- sin desbordes con textos en inglés;
- revisión en 360, 768, 1366 y 1920 px de ancho;
- matriz de la sección 2.2 para el hero.
