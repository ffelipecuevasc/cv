# E200-I08 · Desarrollador: campo de puntos en la sección principal y curvas de nivel en «Conjunto de Tecnologías»
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I07 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-036, ADR-067, ADR-107, ADR-109, ADR-113, ADR-114, ADR-115

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar en Desarrollador (`/es/desarrollador/` y `/en/developer/`) los dos fondos que ya usan las otras páginas: el campo de puntos del hero en la sección principal y una composición propia de curvas de nivel en la banda «Conjunto de Tecnologías». Ambos en `es-CL` y `en-US`, en claro y oscuro. Son los únicos dos cambios de esta página.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción, con captura: la sección principal (cabecera «Perfil profesional · Desarrollador Full Stack» con institución y periodo, más «Enfoque técnico · Aspectos Técnicos de los Desarrollos» con sus 4 entradas) va sobre fondo `bg` liso. Debe llevar el mismo campo de puntos que las secciones principales de Inicio, Educación (E200-I06) y Experiencia (E200-I07).
- La banda «Conjunto de Tecnologías» (`TechnologyWall.astro`) usa hoy `Band.astro` con la cuadrícula `texture-band`. Debe llevar curvas de nivel con una composición propia, como la banda de cifras de Inicio (E200-I05) y las franjas de certificaciones de Educación (E200-I06).
- Archivos:
    - `src/pages/es/desarrollador.astro` y `src/pages/en/developer.astro`: `DeveloperHeader`, `TechnicalAspects`, `TechnologyWall` y `Portfolio`, en ese orden;
    - `src/components/developer/DeveloperHeader.astro` (encabezado alineado a la izquierda, ADR-067) y `TechnicalAspects.astro` (lista a dos columnas con regla superior);
    - `src/components/developer/TechnologyWall.astro`, sobre `Band.astro`. Sus tarjetas de tecnología tienen fondo `surface`;
    - `texture-dots` y `texture-halo` en `global.css`, la variable de posición de máscara y halo de E200-I06 y el componente de curvas de nivel de E200-I05 (con la variante de `Band.astro`).
- Composiciones de curvas ya usadas, que esta **no** debe repetir: Inicio, dos grupos en esquinas opuestas; Educación «Inteligencia Artificial», un relieve en el borde derecho; Educación «Desarrollo y Datos», una cordillera horizontal desde la esquina inferior izquierda.
- `DESIGN.md` 4.5, 7.8 y 11.6 (Desarrollador).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Sección principal:** el campo de puntos del hero (dos capas, máscara radial elíptica y halo solo en oscuro, 4.5) detrás de la cabecera y de «Aspectos técnicos» como una sola sección, igual que en Experiencia.
- **«Conjunto de Tecnologías»:** curvas de nivel en lugar de la cuadrícula, con una composición propia, distinta de las tres anteriores.
- No hay otros cambios en la página.

## Composición propuesta de las curvas (la valida Felipe en la URL de rama)
- Un relieve que **cae desde el borde superior, centrado detrás del encabezado de la banda** (rótulo, titular y bajada), como una cumbre vista desde arriba que se abre hacia los lados.
- Se desvanece antes de la grilla de tecnologías, para que las tarjetas queden sobre un fondo casi limpio.
- Cada quinta curva en dorado, con los mismos tokens de color que en Inicio y Educación.

## Alcance
- Campo de puntos detrás de `DeveloperHeader` y `TechnicalAspects`.
- Variante con curvas de nivel en la banda de `TechnologyWall`, con la composición nueva.
- Bloque de `DESIGN.md` 4.5 y 11.6 para Felipe.

## Fuera de alcance
- Textos, iconos, orden y maquetación de la cabecera, de «Aspectos técnicos», de la grilla de tecnologías y del portafolio.
- El portafolio y sus filtros.
- Las bandas de otras páginas.

## Tareas
- [ ] **Sección principal:** montar `texture-dots` y `texture-halo` como una sola capa absoluta (`aria-hidden`) detrás de `DeveloperHeader` y `TechnicalAspects`, por ejemplo envolviendo ambos componentes en las dos páginas. El encabezado está alineado a la izquierda: usar la variable de E200-I06 para llevar la máscara y el halo hacia el espacio libre de la derecha, sin copiar las utilidades.
- [ ] **Legibilidad de «Aspectos técnicos»:** la máscara se desvanece antes de las 4 entradas o, si los puntos llegan hasta ellas, se comprueba que no bajen el contraste del texto de 4.4. Medir el peor punto.
- [ ] **Curvas:** dibujar la composición nueva en el componente de E200-I05 (trazos suavizados, piezas ancladas al borde superior, 10 KB o menos) y aplicarla en `TechnologyWall.astro` con la variante de `Band.astro`, sin la cuadrícula.
- [ ] **Grilla de tecnologías:** comprobar que las curvas no se confunden con los logos de las tarjetas, en claro y oscuro, a 360, 768, 1.024 y 1.920 px.
- [ ] **Revisión visual:** protocolo de la épica en `/es/desarrollador/` y `/en/developer/`, incluidos los filtros del portafolio, para confirmar que no cambió nada fuera de las dos secciones.
- [ ] **Registro y bloques:** ADR-116, bloque de `DESIGN.md` 4.5 (campo de puntos y curvas de nivel también en Desarrollador) y 11.6 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/pages/es/desarrollador.astro`, `src/pages/en/developer.astro` (si la capa envuelve ambos componentes), `src/components/developer/TechnologyWall.astro`, el componente de curvas de nivel de E200-I05 y, si hace falta, `src/styles/global.css`.

## Criterios de aceptación (verificables)
- [ ] La cabecera y «Aspectos técnicos» muestran el campo de puntos (halo solo en oscuro) como una sola sección, en es y en, sin bajar el contraste del texto.
- [ ] «Conjunto de Tecnologías» muestra curvas de nivel suavizadas con la composición nueva, sin cuadrícula, distinta de Inicio y de las dos franjas de Educación.
- [ ] Las tarjetas de tecnología y sus logos se leen igual que antes.
- [ ] Ningún otro elemento de la página cambia (textos, maquetación, portafolio y filtros).
- [ ] Las texturas no se anuncian en lectores de pantalla ni reciben foco o clics.
- [ ] Sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-109, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-116 · Desarrollador: campo de puntos en la sección principal y curvas de nivel en la banda de tecnologías
- **Contexto:** E200-I08. La sección principal de Desarrollador va sobre fondo liso y la banda «Conjunto de Tecnologías» usa la cuadrícula, a diferencia de las páginas ya ajustadas en E200 (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026):**
    - la cabecera y «Aspectos técnicos» llevan el campo de puntos y el halo del hero, como una sola sección;
    - la banda «Conjunto de Tecnologías» cambia la cuadrícula por curvas de nivel con una composición propia: un relieve que cae desde el borde superior, centrado detrás del encabezado de la banda.
- **Consecuencias:** el campo de puntos queda como fondo común de las secciones principales (Inicio, Educación, Experiencia y Desarrollador), y las curvas de nivel suman un cuarto uso, siempre con composición propia. Felipe edita `DESIGN.md` 4.5 y 11.6 (ADR-033).
- **Origen:** E200-I08, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- «Aspectos técnicos» tiene texto pequeño y en peso ligero: es la zona más sensible a los puntos. Por eso la máscara se lleva hacia la derecha y arriba, donde está el espacio libre de la captura.
- La composición de las curvas es una propuesta del agente: si en la URL de rama Felipe prefiere otra, se cambia en esta misma iteración, antes de cerrarla.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
