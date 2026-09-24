# AGENTS.md — felipecuevas.dev

Instrucciones operativas para agentes de IA que trabajan en este repositorio.
Sistema visual completo: @DESIGN.md

## 1. Proyecto

- Sitio personal de Felipe Cuevas (CV, experiencia, portafolio, recursos, eventos y foro).
- Producción: `https://felipecuevas.dev` · Repositorio: `ffelipecuevasc/cv`.
- Sitio **100% estático** desplegado en **Cloudflare Pages** desde la rama `main`. La única lógica de servidor es la Pages Function `functions/api/contacto.js`.
- Idioma de todo el contenido, textos de interfaz y comentarios: **español de Chile**.

## 2. Stack

- HTML5 semántico, una página = un archivo `.html` en la raíz.
- Tailwind CSS 3 compilado por CLI: fuente `static/css/index.css` → salida `static/css/tailwind.css` (versionada).
- JavaScript Vanilla ES6+ con módulos nativos (`<script type="module">`), sin bundler.
- Única dependencia de ejecución: AOS (animaciones al desplazar). Node `24.16.0`.

## 3. Comandos

| Comando | Uso |
|---|---|
| `npm run build` | Compila y minifica Tailwind. **Obligatorio antes de dar una tarea por terminada.** |
| `npm run verify` | Linkinator: detecta enlaces y recursos rotos. **Obligatorio al cerrar cada tarea.** |
| `npm run dev` / `npm run serve` | Procesos de larga duración para uso humano. **No los ejecutes.** |

## 4. Arquitectura JavaScript (capas)

```
static/js/
├── datos/        Contenido declarativo. Sin lógica ni clases de presentación.
├── config/       Presentación: textos de interfaz, clases, parámetros. Sin contenido ni lógica.
├── *.js          Lógica y vista de cada motor (portafolio.js, comunidad.js, rutas.js…).
├── paginas/      Un punto de entrada por página. Solo compone: importa e inicia.
└── servicios/    Transversales: tema, navegación, animación, resiliencia, renderizado.
```

Reglas:
- El contenido nuevo se agrega en `datos/`, nunca escrito dentro de la lógica.
- Todo punto de entrada llama primero `iniciarSitio()` y envuelve cada motor en `ejecutarSeguro('nombre legible', fn)`.
- Reutiliza los servicios existentes (`renderizado.js`, `filtros.js`, `resiliencia.js`) antes de escribir utilidades nuevas.
- Cada archivo nuevo abre con el bloque de comentario de cabecera `// ===` que describe su capa, igual que los existentes.
- Nombres de funciones, variables y archivos en español, en camelCase (JS) y kebab-case (archivos).

## 5. Estructura de páginas

Cada página HTML repite el mismo armazón, en este orden: `<head>` (metadatos, SEO, Open Graph, fuentes, CSS y guardián de animaciones), cabecera con navegación de escritorio y menú móvil, `<main id="main-content">`, pie con columna "Explorar", botón de volver arriba y un único `<script type="module">` hacia `static/js/paginas/`.

**Navegación duplicada:** la navegación de escritorio, el menú móvil y la columna "Explorar" del pie están copiados a mano en **todas** las páginas. Cualquier cambio de navegación se replica de forma idéntica en todas ellas. Lo único que varía entre páginas es el estado activo (`aria-current="page"` y sus clases).

Para crear una página nueva, parte de una copia de una página existente y cambia solo: metadatos, `canonical`, estado activo de la navegación, contenido de `<main>` y punto de entrada.

## 6. Rutas y despliegue

- Rutas de assets y enlaces internos **relativas y sin barra inicial**: `static/img/x.webp`, `eventos.html`.
- URLs públicas limpias, sin `.html`: `canonical`, `og:url` y `sitemap.xml` usan `https://felipecuevas.dev/eventos`.
- Página nueva o renombrada ⇒ actualizar `sitemap.xml` y la lista de páginas del script `verify` en `package.json`.
- Página renombrada ⇒ agregar redirección 301 en `_redirects` (raíz).
- Imágenes de contenido en **WEBP**, siempre con `width`, `height` y `alt` descriptivo. `loading="lazy"` salvo imágenes sobre el pliegue.
- Enlaces externos con `target="_blank" rel="noopener noreferrer"`.
- Dominio externo nuevo que bloquee robots ⇒ agregarlo a `skip` en `linkinator.config.json`.

## 7. Accesibilidad obligatoria

- Un solo `<h1>` por página; jerarquía de encabezados sin saltos.
- Toda `<section>` con `aria-labelledby` apuntando a su `<h2>`.
- Íconos decorativos de Material Symbols con `aria-hidden="true"`.
- Controles que no navegan son `<button type="button">`, nunca `<a>` sin `href`.
- Desplegables: disparador con `aria-haspopup="true"`, `aria-controls` y `aria-expanded`.
- Todo debe funcionar en modo claro y oscuro, en móvil y con teclado.

## 8. Alcance y comportamiento

- Implementa **exactamente** lo que pide el prompt. No refactorices, renombres ni "mejores" nada fuera de alcance, aunque lo detectes. Si ves un problema fuera de alcance, menciónalo en tu respuesta final en una línea, sin corregirlo.
- Si una instrucción es ambigua o contradice este archivo, detente y pregunta antes de editar.
- No agregues dependencias NPM ni scripts o librerías externas.
- No edites `static/css/tailwind.css` a mano (se genera con `npm run build`), `package-lock.json` ni `functions/`.
- No modifiques `AGENTS.md`, `DESIGN.md` ni `.claude/`.

## 9. Archivos prohibidos

La documentación del proyecto se gestiona fuera del repositorio. **No crees**:
- Archivos `.md` de ningún tipo (planes, resúmenes, reportes, notas, changelogs).
- Archivos de log, registro o bitácora (`.log`, `.txt` de notas).
- `CLAUDE.md` o `CLAUDE.local.md` en ninguna ruta.
- Contenido en `docs/`.

Tu reporte de cierre va en la respuesta del chat, no en un archivo.

## 10. Definición de terminado

Una tarea está terminada solo cuando:
1. `npm run build` termina sin errores.
2. `npm run verify` no reporta enlaces rotos.
3. No hay cambios fuera de los archivos que el prompt autoriza (revisa con `git status` y `git diff --stat`).
4. Tu respuesta final lista los archivos modificados y qué se debe probar manualmente en el navegador.

## 11. Git

- Trabaja en la rama indicada por el prompt.
- `git add` y `git commit` solo cuando el prompt lo pida, con mensaje en español, en imperativo y con prefijo de tipo: `feat:`, `fix:`, `refactor:`, `chore:`, `content:`.
- Nunca ejecutes `git push`, `git reset --hard` ni `git clean`.