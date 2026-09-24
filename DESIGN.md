# DESIGN.md — Sistema visual de felipecuevas.dev

Catálogo canónico del sistema de diseño. Fuente de verdad técnica: `tailwind.config.js` y `static/css/index.css`.
Regla general: **reutiliza lo que existe**. No inventes colores, tamaños, sombras ni componentes nuevos. Si algo no está aquí, copia el patrón de la página más parecida.

## 1. Principios

- Tecnológico, limpio y sobrio: mucho aire, jerarquía tipográfica fuerte, acentos de color puntuales.
- Dos modos con personalidad propia: **claro** (blanco, bordes suaves, efecto linterna de puntos) y **oscuro** (cristal esmerilado + resplandor neón).
- La animación es adorno, nunca condición: el contenido debe verse aunque JavaScript o AOS fallen.

## 2. Color

Usa siempre los tokens de Tailwind, nunca hexadecimales en línea.

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#007EA7` | Acento principal: botones, enlaces, estado activo, íconos |
| `primary-vibrant` | `#00B0E8` | Acento en modo oscuro y estados hover |
| `accent-gold` | `#f8cd46` | Destacados excepcionales (planes, sellos). Uso escaso |
| `accent-gold-deep` | `#7a5c00` | Texto sobre fondos dorados |
| `background-light` / `background-dark` | `#ffffff` / `#00131D` | Fondo de `<body>` |
| `orient-50` … `orient-950` | escala azul | Todo el resto: textos, bordes, superficies |

Combinaciones de texto establecidas:

| Rol | Claro | Oscuro |
|---|---|---|
| Títulos | `text-orient-950` | `dark:text-orient-50` |
| Cuerpo | `text-orient-700` | `dark:text-orient-200` o `dark:text-orient-300` |
| Secundario | `text-orient-500` | `dark:text-orient-400` |
| Bordes | `border-orient-100` / `border-orient-200` | `dark:border-white/10` o `dark:border-transparent` |

## 3. Tipografía e íconos

- Fuente única: **Lexend** (300–900), clase `font-display` o herencia desde `body`.
- `<h1>` de página: `text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]`, con una palabra clave en `<span class="text-primary">`.
- `<h2>` de sección: `text-2xl font-black tracking-tight`.
- `<h3>` de tarjeta: `text-lg font-bold leading-tight` (o `text-base` en tarjetas compactas).
- Íconos: **Material Symbols Outlined**, peso 300 por defecto. Siempre `<span aria-hidden="true" class="material-symbols-outlined">nombre</span>`.

## 4. Modo oscuro y superficies

Estrategia `darkMode: "class"` (clase `dark` en `<html>`). Tres niveles de cristal, solo en oscuro:

| Clase | Nivel | Uso |
|---|---|---|
| `glass-low` | Plataforma | Contenedores base, navegación, pie |
| `glass-mid` | Contenido | Tarjetas (la más usada: `dark:glass-mid`) |
| `glass-high` | Flotante | Desplegables, modales, tooltips |

Resplandores neón (solo aplican en oscuro):
- `neon-glow-sm`: íconos y badges.
- `neon-glow-md`: botones de llamado a la acción.
- `neon-glow-interactive`: tarjetas con hover.
- `neon-glow-gold` / `neon-glow-gold-interactive`: equivalentes dorados, solo para destacados.

## 5. Componentes de clase

| Clase | Qué es | Qué agregar en línea |
|---|---|---|
| `tarjeta-contenido` | Tarjeta base (blanca, borde, sombra, elevación al hover) | Relleno `p-5`/`p-6`, `dark:glass-mid`, `neon-glow-interactive` |
| `tarjeta-reactiva` | Foco de luz interno que sigue al cursor | Combinar con una tarjeta existente |
| `boton-primario` | Botón azul sólido | Relleno vertical (`py-2.5` / `py-3`) y efectos de elevación |
| `boton-secundario` | Botón blanco con borde | Nada, salvo `mt-0` cuando comparte una fila (`flex`) junto a `boton-primario` — su `mt-2` por defecto asume que va solo, como en el conmutador de tema del pie |
| `etiqueta-categoria` | Microtexto en mayúsculas (10 px, bold, tracking) | Color y relleno |
| `seccion-bajada` | Párrafo introductorio bajo el `<h1>` | Nada |
| `tecnologia-*` | Piezas de la tarjeta de tecnología | Exclusivo de `desarrollador.html` |

## 6. Patrones de composición

**Contenedor de página:** `max-w-[1200px]` centrado, con `px-6 md:px-10`.

**Encabezado de sección** (patrón obligatorio para cada `<section>`):

```html
<section aria-labelledby="sec-ejemplo" class="mb-14">
    <div class="inline-flex items-center gap-3 mb-3">
        <div class="h-px w-8 bg-primary"></div>
        <p class="etiqueta-categoria text-primary" data-aos="fade-right">Etiqueta</p>
    </div>
    <h2 class="text-orient-950 dark:text-orient-50 text-2xl font-black tracking-tight mb-8"
        id="sec-ejemplo" data-aos="fade-right" data-aos-delay="100">Título de sección</h2>
    <!-- contenido -->
</section>
```

**Ícono en círculo** (tarjetas de pasos o características):
`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg neon-glow-sm`

**Etiquetas de tecnología:**
`px-2 py-1 bg-orient-100 dark:bg-white/5 dark:border dark:border-white/10 text-orient-700 dark:text-orient-300 text-[10px] font-bold rounded uppercase tracking-wider`

**Rejillas:** `grid grid-cols-1 gap-4 md:grid-cols-2` para listas simples; rejilla bento de 12 columnas (`grid-cols-12`) con patrón de anchos repetido cada 6 tarjetas para portafolio y formación.

**Radios:** `rounded-lg` botones, `rounded-xl` tarjetas, `rounded-2xl` tarjetas grandes de portafolio, `rounded-full` íconos y pastillas.

## 7. Navegación

**Enlace simple (escritorio):** subrayado animado con `after:` desde `after:w-0` a `hover:after:w-full`, texto `text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary`.

**Desplegable (escritorio):** contenedor `relative group` con `data-dropdown`. El panel se revela solo por CSS con `group-hover` y `group-focus-within` (opacidad, visibilidad y `translate-y`, 300 ms). Panel interno: `w-52 bg-white/90 dark:bg-orient-900/90 backdrop-blur-xl border border-orient-100 dark:border-white/10 shadow-xl rounded-xl overflow-hidden`. Ítems: `block px-5 py-3 text-sm font-medium … hover:bg-orient-50 dark:hover:bg-white/5`. El ícono `expand_more` rota 180° al abrir.

**Estado activo:** pastilla `rounded-full bg-primary px-4 py-2 text-white shadow-md shadow-primary/20`. En un desplegable, la pastilla va en el disparador padre y `aria-current="page"` en el enlace hijo correspondiente.

**Menú móvil:** columna con `space-y-5`; subgrupos indentados con `pl-4 border-l-2 border-orient-100 dark:border-white/10 space-y-3` y enlaces `text-sm text-orient-500 dark:text-orient-400`.

## 8. Movimiento (AOS)

- Efectos permitidos: `fade-up` (tarjetas y bloques), `fade-right` (etiquetas y títulos de sección), `fade-left`, `fade-down`.
- Retardos escalonados en pasos de 50 o 100 ms (`data-aos-delay="0|100|200"`). Nunca más de 400 ms.
- Respeta `prefers-reduced-motion`: ya está resuelto en CSS y en `servicios/animacion.js`; no agregues animaciones que lo ignoren.
- Efectos existentes adicionales: `badge-float` (flotación suave) e `icon-animate` (aparición a escala).

## 9. Imágenes

- WEBP con `width` y `height` explícitos, `object-cover` dentro de contenedores con proporción fija.
- Portafolio: 16:9, 1600 × 900. Eventos: proporción original de la portada.
- Hover en imágenes de tarjeta: `transition-transform duration-700 group-hover:scale-105`.