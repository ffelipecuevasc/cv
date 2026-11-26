# E200-I14b · Recursos: «Más recursos» con logos, campo de puntos en la cabecera y cierre de la épica
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I14 (parte A) · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-081, ADR-107, ADR-109, ADR-122

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Origen
Complemento de E200-I14, partido por decisión de Felipe del 26-11-2026 (como E180-I02b). E200-I14 (parte A) dejó listos el catálogo de rutas con curvas `saddle`, la página propia de cada ruta (índice y detalle), la compatibilidad (`?ruta=`, sitemap, `check:i18n`, JSON-LD `Course` en la página de la ruta), el retiro de la conversación de la ruta y la política de privacidad con su versión nueva. Esta iteración termina el resto de E200-I14 y la cierra.

## Alcance
- **«Más recursos» (opción 1 de Felipe):** encabezado de cada temática con su logo oficial a la izquierda (LinkedIn en Empleabilidad con el ícono `linkedin` de `icons.ts`, `src/assets/technologies/python.svg` y `java.svg`), decorativo (`aria-hidden`), el nombre y la cantidad como texto discreto («2 materiales» / «2 resources»). Sin la insignia con el número. Tarjetas con formato, nivel, título, descripción y acción.
- **Campo de puntos** (`texture-dots` y `texture-halo`, halo solo en oscuro) detrás de `ResourcesHeader`.
- Controles de `verify-seo` para ambos cambios, comprobando que fallan ante casos rotos.
- Revisión visual completa con el navegador de ADR-109 en Recursos y en las páginas de ruta (es y en, claro y oscuro, 360, 768, 1.024, 1.366 y 1.920 px, progreso vacío, parcial y completo, sin JavaScript), sin errores de CSP y con CLS 0; PageSpeed Insights de Recursos y de la página de ruta en la URL de rama.
- Cierre de E200-I14 y de E200-I14b, y de la última iteración de la épica (la épica sigue abierta, ADR-107): estados, ADR-122 completo, bitácora con los bloques de `DESIGN.md` 4.5, 11.2 y 11.11 y la lista consolidada de todo lo pendiente de `DESIGN.md` (I13 e I14, en orden de aplicación) y de los pendientes de cierre de épica (ADR-124, AT-162, 5b, 5c, AT-147 y AT-100).

## Fuera de alcance
- Lo que ya resolvió E200-I14 (parte A).
- Agregar o quitar materiales, cambiar rutas o pasos.

## Notas
- AT-165: la hoja de `ThemeGrid` ya es aparte (Recursos pide 2 hojas, igual que producción); la de `ContourLines` sigue incrustada. Al sumar logos y estilos, comprobar que Recursos y Foro no ganan hojas.
- Si cambia un hash de script en línea, entregar a Felipe la línea de `public/_headers`.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `E200-I14-recursos.md`, `epica.md`, `_planificacion/README.md` y `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y completar ADR-122 en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
