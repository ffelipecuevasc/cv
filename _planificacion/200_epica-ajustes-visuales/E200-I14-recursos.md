# E200-I14 · Recursos: catálogo de rutas con página propia por ruta, «Más recursos» con logos y fondos de la épica
- **Estado:** [x] Terminada (26-11-2026; parte A aquí y parte B en [E200-I14b](E200-I14b-recursos-temas-cierre.md))
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M (la más grande de la épica; si no cabe en una sesión, se parte en complementos `E200-I14b`, como E180-I02b)
- **Depende de:** E200-I13 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017, ADR-020, ADR-023, ADR-025, ADR-078, ADR-079, ADR-080, ADR-081, ADR-082, ADR-087, ADR-107, ADR-109, ADR-113, ADR-114

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Rehacer Recursos (`/es/recursos/` y `/en/resources/`) para que escale a varias rutas de aprendizaje y deje de ser una página interminable:
- la página muestra un catálogo de rutas;
- cada ruta vive en su propia página;
- se elimina la conversación de la ruta;
- «Más recursos» gana logos y tarjetas más claras;
- se aplican los fondos de la épica.

Todo en `es-CL` y `en-US` y en claro y oscuro.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción.
- Orden actual de la página: `ResourcesHeader`, `RouteBand` (ficha de la ruta), `RouteSteps` (6 etapas y 25 pasos marcables, todos desplegados), `RouteThread` («Conversación de la ruta», Giscus) y `ThemeGrid` («Más recursos»).
- **Problemas:**
    - la ruta «Desarrollo Web & IA» se despliega completa y empuja «Más recursos» muy abajo;
    - el diseño está atado a una sola ruta;
    - la conversación de la ruta no se mantendrá por ruta;
    - en «Más recursos», el número de materiales de cada temática se muestra en una insignia poco atractiva.
- Datos y comportamiento que hoy existen y deben seguir funcionando:
    - contenido de la ruta en `src/content/resources/page.json` (`route`) e `items.json`;
    - progreso en `localStorage`, clave `rutas-progreso` (ADR-023);
    - enlace compartible `?ruta=desarrollo-web-ia` (`src/scripts/resources.ts`);
    - JSON-LD `Course` de la ruta (`ResourcesJsonLd.astro`, ADR-082).
- La política de privacidad (`src/content/privacy/page.json`) dice que «el Foro y la ruta de aprendizaje de Recursos usan Giscus».
- Logos oficiales que ya están en el proyecto: `src/assets/technologies/python.svg`, `src/assets/technologies/java.svg` y el ícono de marca `linkedin` de `src/components/ui/icons.ts`.
- `DESIGN.md` 4.5, 11.2 y 11.11 (Recursos).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Sección principal:** el campo de puntos del hero (dos capas, máscara radial y halo solo en oscuro, 4.5).
- **Rutas de aprendizaje en Recursos: alternativa A, «Catálogo de rutas»** (elegida en el lienzo de diseño del 16-11-2026):
    - en Recursos, la sección muestra una tarjeta por ruta: título, resumen, duración, conocimientos previos, número de etapas y pasos, barra de progreso y un botón para continuar;
    - un espacio indica dónde aparecerán las próximas rutas;
    - la sección lleva curvas de nivel con composición propia (4.5).
- **Página propia de cada ruta: diseño de la alternativa C, «Índice y detalle»:**
    - encabezado con la ruta y su progreso;
    - índice de etapas a la izquierda, con el avance de cada una;
    - a la derecha, solo los pasos de la etapa elegida, marcables;
    - botones de etapa anterior y siguiente;
    - un enlace para volver a todas las rutas.
- **Se elimina «Conversación de la ruta»**: ninguna ruta tendrá conversación propia.
- **«Más recursos»: opción 1, «Encabezado con logo y tarjetas»:**
    - se mantienen las temáticas Empleabilidad, Python y Java;
    - cada temática abre con su logo oficial a la izquierda (LinkedIn en Empleabilidad, Python en Python y Java en Java), su nombre y, a la derecha, la cantidad como texto discreto («2 materiales» / «2 resources»). La insignia con el número desaparece;
    - los materiales van en tarjetas con formato, nivel, título, descripción y acción.
- **Nivel de detalle:** esta iteración fija el diseño y el comportamiento esperados. La forma de implementarlos (rutas de Astro, componentes, scripts y datos) la decide el agente con el código a la vista, respetando los ADR vigentes.

## Alcance
- Campo de puntos en la sección principal.
- Catálogo de rutas con curvas de nivel, y una página propia por ruta, en es y en, con el diseño de índice y detalle.
- Retiro de la conversación de la ruta y de su mención en la política de privacidad.
- «Más recursos» con logos y tarjetas.
- Bloque de `DESIGN.md` 4.5, 11.2 y 11.11 para Felipe.

## Fuera de alcance
- Crear rutas nuevas o cambiar los pasos, etapas, textos y archivos de «Desarrollo Web & IA».
- Artículos de la bóveda (BL-09).
- El Foro y su Giscus (siguen igual, E200-I12).
- Agregar o quitar materiales de «Más recursos».

## Tareas
- [x] **Diseño de la solución:** (visto bueno de Felipe, 26-11-2026: ver ADR-122) antes de programar, proponer a Felipe en una lista corta la URL de las páginas de ruta en es y en (por ejemplo, `/es/recursos/rutas/desarrollo-web-ia/` y su par en `/en/`), cómo se generan desde los datos para que una ruta nueva no exija código nuevo, y qué pasa con `?ruta=` y el JSON-LD `Course`. Esperar su visto bueno.
- [x] **Catálogo en Recursos:** reemplazar la ficha y los pasos desplegados por el catálogo de tarjetas. El progreso de cada tarjeta se lee de `rutas-progreso`, y la sección lleva curvas de nivel con composición propia, distinta de las de las otras páginas. Sin JavaScript, la tarjeta y su enlace siguen funcionando.
- [x] **Página de ruta:** página por ruta y por idioma con el diseño de índice y detalle:
    - pasos marcables que guardan en la misma clave `rutas-progreso`, sin perder el progreso que ya tienen los visitantes;
    - etapa elegida en la URL (por ejemplo, con un ancla), para poder compartirla;
    - sin JavaScript, todas las etapas y sus pasos son legibles;
    - en móvil, el índice pasa arriba de los pasos.
- [x] **Compatibilidad y SEO:**
    - los enlaces antiguos con `?ruta=desarrollo-web-ia` llevan a la página de la ruta;
    - las páginas de ruta entran al mapa de rutas, al sitemap con sus alternativas es/en y a `check:i18n`;
    - el JSON-LD `Course` pasa a la página de su ruta.
- [x] **Conversación:** retirar `RouteThread` de Recursos. Actualizar en la política de privacidad la frase que nombra a Giscus en Recursos, con la regla de versión vigente de la política (ADR-087), y dejar el texto nuevo para que Felipe lo valide. El hilo `ruta-desarrollo-web-ia` en GitHub Discussions no se borra.
- [x] **«Más recursos»:** (E200-I14b) encabezado de temática con el logo oficial (los tres archivos del proyecto), el nombre y la cantidad en texto, y tarjetas con formato, nivel, título, descripción y acción. Los logos son decorativos (`aria-hidden`), porque el nombre de la temática ya es el texto.
- [x] **Fondos, controles y revisión:** (controles y revisión de la parte A hechos; campo de puntos y revisión final en E200-I14b)
    - campo de puntos en `ResourcesHeader`;
    - ajustar `verify:seo`, `verify` y `check:i18n` a la estructura nueva y comprobar que fallan ante casos rotos;
    - protocolo de revisión visual de la épica en Recursos y en las páginas de ruta, es y en, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px, con progreso vacío, parcial y completo.
- [x] **Registro y bloques:** (ADR-122 registrado; bloques y PageSpeed en E200-I14b) ADR-122, bloque de `DESIGN.md` 4.5, 11.2 y 11.11 en la bitácora, y PageSpeed Insights de Recursos y de la página de ruta en la URL de rama.

## Archivos previstos (crear / modificar)
- Los decide el agente en la tarea 1. Como mínimo cambian:
    - `src/pages/es/recursos.astro` y `src/pages/en/resources.astro`;
    - los componentes de `src/components/resources/`;
    - `src/scripts/resources.ts`;
    - `src/content/resources/page.json`;
    - `src/i18n/routes.ts`;
    - `src/components/seo/ResourcesJsonLd.astro`;
    - `src/content/privacy/page.json`;
    - los scripts de verificación.
- Se crean las páginas de ruta.

## Criterios de aceptación (verificables)
- [x] Recursos muestra el campo de puntos en la cabecera, el catálogo de rutas sobre curvas de nivel y «Más recursos» a poca distancia, sin la ruta desplegada; en es y en.
- [x] Cada ruta tiene su página en es y en con el diseño de índice y detalle; marcar un paso actualiza el avance de la etapa, el de la ruta y el de la tarjeta del catálogo.
- [x] El progreso guardado antes del cambio se conserva.
- [x] Los enlaces con `?ruta=desarrollo-web-ia` llegan a la página de la ruta.
- [x] No queda conversación de Giscus en Recursos ni en las páginas de ruta, y la política de privacidad ya no la menciona.
- [x] «Más recursos» muestra las 3 temáticas con su logo oficial, la cantidad en texto y las tarjetas, sin insignias de número.
- [x] Las páginas nuevas están en el sitemap con alternativas es/en; `verify`, `check:i18n` y `verify:seo` en verde.
- [x] Sin JavaScript, el contenido de Recursos y de las páginas de ruta se puede leer.
- [x] Sin dependencias nuevas; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n`, `pnpm verify:seo` y `pnpm check:redirects` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-109, en local y en la URL de rama, incluido un recorrido con progreso guardado previamente en `rutas-progreso`.

## ADR a registrar (texto para `decisiones.md`)

### ADR-122 · Recursos: catálogo de rutas, página propia por ruta y «Más recursos» con logos (sustituye en parte a ADR-079, ADR-080 y ADR-081)
- **Contexto:** E200-I14. La sección de la ruta despliega sus 25 pasos completos, empuja «Más recursos» muy abajo y está atada a una sola ruta. La conversación de la ruta no se mantendrá por ruta, y «Más recursos» muestra la cantidad de materiales en una insignia poco atractiva (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026, sobre un lienzo de diseño con 3 alternativas y 3 vistas previas en el chat):**
    - Recursos muestra un catálogo de rutas en tarjetas (alternativa A);
    - cada ruta tiene su propia página, con índice de etapas y detalle de la etapa elegida (diseño de la alternativa C);
    - se elimina la conversación de la ruta;
    - «Más recursos» lleva el logo oficial de cada temática y tarjetas (opción 1);
    - la cabecera usa el campo de puntos y el catálogo usa curvas de nivel.
- **Sustituye en parte:** ADR-079 y ADR-080 en la composición de la ruta dentro de Recursos y en su conversación; ADR-081 en la presentación de las temáticas. La clave `rutas-progreso`, el enlace `?ruta=` (ahora hacia la página de la ruta) y el JSON-LD `Course` (ahora en la página de la ruta, ADR-082) se mantienen.
- **Consecuencias:**
    - aparecen páginas nuevas por ruta, que entran al mapa de rutas, al sitemap y a los controles;
    - una ruta nueva se agrega con datos, sin código de página nuevo;
    - Giscus queda solo en Foro, y la política de privacidad se actualiza con su regla de versión (ADR-087);
    - Felipe edita `DESIGN.md` 4.5, 11.2 y 11.11 (ADR-033).
- **Origen:** E200-I14, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- Es la iteración más grande de la épica. Si la tarea 1 muestra que no cabe en una sesión, se parte en un complemento (`E200-I14b`) con la página de ruta y la compatibilidad, como se hizo en E180-I02b.
- El cambio en la política de privacidad lo valida Felipe antes del merge a `main`.
- El lienzo de diseño con las 3 alternativas de rutas queda como referencia visual: «Recursos · Ruta de aprendizaje: 3 alternativas».

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
