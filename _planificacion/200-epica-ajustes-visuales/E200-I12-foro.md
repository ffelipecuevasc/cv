# E200-I12 · Foro: campo de puntos en la cabecera y en «Conversación», y curvas de nivel en «Participar en tres pasos»
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I11 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-078, ADR-104, ADR-106, ADR-110, ADR-111, ADR-116

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar en Foro (`/es/foro/` y `/en/forum/`) los mismos fondos que ya usan las otras páginas, en `es-CL` y `en-US` y en claro y oscuro:
- campo de puntos en la cabecera y en «Conversación»;
- curvas de nivel con composición propia en «Participar en tres pasos».

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción.
- Orden de la página (`src/pages/es/foro.astro` y `src/pages/en/forum.astro`), composición A de ADR-078:
    - `ForumHeader` (fondo `bg`);
    - `StepsBand` («Participar en tres pasos», `Band.astro` con la cuadrícula);
    - `CategoriesGrid` (categorías, fondo `bg-alt`);
    - `Conversation` (fondo `bg`).
- `Conversation.astro` usa `src/components/forum/GiscusSection.astro`, que también usa **Recursos** (`RouteThread.astro`). La sección tiene encabezado, el aviso de privacidad sobre `bg-alt` y el marco de Giscus, que se carga bajo demanda.
- Herramientas que ya existen en la épica:
    - `texture-dots` y `texture-halo`, con la variable de máscara y halo de E200-I06;
    - el componente de curvas de nivel de E200-I05, con composición por parámetros (E200-I11) y la variante de `Band`.
- Composiciones de curvas ya usadas, que esta iteración **no** debe repetir:
    - Inicio: esquinas inferior izquierda y superior derecha;
    - Educación: borde derecho, y cordillera desde la esquina inferior izquierda;
    - Desarrollador: caída desde el borde superior al centro;
    - Docente: ladera desde la esquina superior izquierda, y loma desde el borde inferior al centro;
    - Instructor: relieves enfrentados en los bordes laterales;
    - Talento Digital: diagonal desde la esquina superior derecha, dos cimas en la esquina inferior derecha, valle desde el borde izquierdo, y esquinas superior izquierda e inferior derecha.
- `DESIGN.md` 4.5 y 11.10 (Foro).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Campo de puntos** (dos capas, máscara radial y halo solo en oscuro, 4.5) en la sección principal (`ForumHeader`) y en «Conversación».
- **Curvas de nivel** con composición propia en «Participar en tres pasos».
- No hay otros cambios en la página.

## Propuestas del agente (las valida Felipe en la URL de rama)
- **Curvas de «Participar en tres pasos»:** un sendero que nace en la esquina inferior izquierda y sube en diagonal hacia la derecha, en el mismo sentido de lectura de los pasos 1, 2 y 3. Se desvanece antes de los números y textos de los pasos. Cada quinta curva en dorado, con los mismos tokens de color.
- **Puntos en «Conversación»:** solo detrás del encabezado y del aviso; la máscara se desvanece antes del marco de Giscus. Los comentarios son texto denso de terceros, y los puntos detrás de ellos bajarían la legibilidad si el marco tiene fondo transparente.

## Alcance
- Campo de puntos detrás de `ForumHeader` y de la parte superior de «Conversación», solo en Foro.
- Curvas de nivel en `StepsBand` con la composición nueva.
- Bloque de `DESIGN.md` 4.5 y 11.10 para Felipe.

## Fuera de alcance
- Las categorías (`CategoriesGrid`, fondo `bg-alt`): no se pidió cambio.
- El hilo de Giscus de **Recursos**: aunque comparte `GiscusSection`, no cambia en esta iteración.
- La configuración de Giscus (término, idioma, tema y carga diferida, ADR-078).

## Tareas
- [ ] **Sección principal:** montar `texture-dots` y `texture-halo` (`aria-hidden`) detrás de `ForumHeader`, con la variable de E200-I06 ajustada a la alineación de su encabezado.
- [ ] **Conversación:** agregar a `GiscusSection.astro` una opción de fondo con puntos, desactivada por defecto, y activarla solo en `Conversation.astro`, para que Recursos no cambie. La máscara cubre el encabezado y el aviso y se desvanece antes del marco de Giscus.
- [ ] **Marco de Giscus:** con el foro cargado, en claro y oscuro, comprobar si el marco deja ver el fondo. Si los puntos se ven detrás de los comentarios, darle al contenedor del marco fondo `bg` sólido, sin tocar la configuración de Giscus.
- [ ] **Curvas:** variante de curvas de `Band` en `StepsBand.astro`, sin la cuadrícula, con la composición nueva pasada como parámetros al componente de E200-I05 (trazos suavizados, piezas ancladas, 10 KB o menos).
- [ ] **Revisión visual:** protocolo de la épica en `/es/foro/` y `/en/forum/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px, con Giscus cargado y sin cargar. Revisar también la página de Recursos, para confirmar que su hilo no cambió.
- [ ] **Registro y bloques:** ADR-117, bloque de `DESIGN.md` 4.5 y 11.10 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/forum/ForumHeader.astro`, `StepsBand.astro`, `GiscusSection.astro`, `Conversation.astro`, el componente de curvas de nivel de E200-I05 y, si hace falta, `src/styles/global.css`.

## Criterios de aceptación (verificables)
- [ ] La cabecera y la parte superior de «Conversación» muestran el campo de puntos (halo solo en oscuro), en es y en.
- [ ] Los comentarios de Giscus se leen sobre fondo liso, en claro y oscuro.
- [ ] «Participar en tres pasos» muestra curvas de nivel suavizadas, sin cuadrícula, con una composición distinta de todas las anteriores.
- [ ] Las categorías y el hilo de Recursos no cambian.
- [ ] Las texturas no se anuncian en lectores de pantalla ni reciben foco o clics; el texto mantiene los contrastes de 4.4.
- [ ] Giscus sigue cargando bajo demanda, en el idioma y el tema correctos, sin violaciones de CSP en la consola.
- [ ] Sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-106, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-117 · Foro: campo de puntos en la cabecera y en «Conversación», y curvas de nivel en «Participar en tres pasos»
- **Contexto:** E200-I12. En Foro, la cabecera y «Conversación» van sobre fondo liso y «Participar en tres pasos» usa la cuadrícula, a diferencia de las páginas ya ajustadas en E200 (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026):**
    - campo de puntos en la cabecera y en la parte superior de «Conversación», con los comentarios de Giscus siempre sobre fondo liso;
    - curvas de nivel con composición propia en «Participar en tres pasos»: un sendero que sube en diagonal desde la esquina inferior izquierda.
- **Consecuencias:** `GiscusSection` gana una opción de fondo con puntos que solo usa Foro; el hilo de Recursos no cambia. Las categorías quedan lisas. Felipe edita `DESIGN.md` 4.5 y 11.10 (ADR-033).
- **Origen:** E200-I12, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- Giscus pinta su contenido dentro de un iframe de terceros: su fondo depende del tema de Giscus, no del sitio. La tarea 3 lo comprueba y lo resuelve desde el contenedor, sin tocar la configuración.
- La composición de curvas es una propuesta del agente; si Felipe prefiere otra, se cambia en esta misma iteración.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
