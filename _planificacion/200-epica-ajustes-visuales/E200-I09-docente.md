# E200-I09 · Docente: campo de puntos y curvas de nivel por sección, y cargos especiales en dos columnas
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I08 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-036, ADR-070, ADR-104, ADR-106, ADR-110, ADR-111, ADR-113

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar en Docente (`/es/docente/` y `/en/lecturer/`) los fondos que ya usan las otras páginas y reordenar los cargos especiales, en `es-CL` y `en-US` y en claro y oscuro:
- campo de puntos en las secciones de fondo liso;
- curvas de nivel con composición propia en las de fondo con banda;
- los dos cargos especiales en una sola fila de dos columnas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción.
- Orden de la página (`src/pages/es/docente.astro` y `src/pages/en/lecturer.astro`): `LecturerHeader`, `CoursesGrid`, `InstitutionsZigzag`, `MentoringBand` y `SpecialRoles`.
- `InstitutionsZigzag.astro`: la sección «Experiencia por institución» abre con su encabezado y sigue con 3 franjas `ThemeStripe` que alternan tono:
    - IPLACEX, tono `bg`;
    - Instituto Profesional Duoc UC, tono `band`, en espejo;
    - Universidad Tecnológica de Chile INACAP, tono `bg`.
- `MentoringBand.astro` («Tutor de Alumnos») usa `Band.astro` con la cuadrícula.
- `SpecialRoles.astro` («Cargos especiales»): lista de 2 entradas, «Docente Responsable Examen Final de Competencias» y «Docente Guía Hackatón». Hoy están apiladas en una columna de 52 rem de ancho máximo, con 24 px de separación, cada una con ícono, cargo, detalle y «año · institución», sobre fondo `bg-alt`.
- Herramientas que ya existen en la épica:
    - `texture-dots` y `texture-halo`, con la variable de máscara y halo de E200-I06;
    - el componente de curvas de nivel de E200-I05, con la variante de `Band.astro`;
    - las variantes de fondo de `ThemeStripe.astro` de E200-I06: curvas de nivel y puntos.
- Composiciones de curvas ya usadas, que esta iteración **no** debe repetir:
    - Inicio: dos grupos en esquinas opuestas;
    - Educación «Inteligencia Artificial»: un relieve en el borde derecho;
    - Educación «Desarrollo y Datos»: una cordillera horizontal desde la esquina inferior izquierda;
    - Desarrollador: un relieve que cae desde el borde superior al centro.
- `DESIGN.md` 4.5, 7.8 y 11.7 (Docente).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Campo de puntos** (dos capas, máscara radial y halo solo en oscuro, 4.5) en:
    - la sección principal (`LecturerHeader`);
    - el encabezado «Experiencia por institución» junto con la franja de IPLACEX, como una sola zona;
    - la franja de Universidad Tecnológica de Chile INACAP.
- **Curvas de nivel**, cada una con su composición propia, en:
    - la franja del Instituto Profesional Duoc UC;
    - la banda «Tutor de Alumnos».
- **Cargos especiales:** las dos tarjetas en la misma fila, en dos columnas.

## Composiciones propuestas de las curvas (las valida Felipe en la URL de rama)
- **Duoc UC** (franja en espejo, con el título a la derecha): curvas que nacen en la esquina superior izquierda y bajan en diagonal, como una ladera, y se desvanecen antes del texto.
- **Tutor de Alumnos:** una loma que sube desde el borde inferior al centro, detrás del contenido de la banda: el reflejo opuesto de la de Desarrollador, que cae desde arriba.
- En ambas, cada quinta curva en dorado, con los mismos tokens de color de Inicio, Educación y Desarrollador.

## Alcance
- Campo de puntos en las tres zonas de fondo liso indicadas.
- Curvas de nivel en la franja de Duoc UC y en la banda «Tutor de Alumnos», con las composiciones nuevas.
- Cargos especiales en dos columnas.
- Bloque de `DESIGN.md` 4.5 y 11.7 para Felipe.

## Fuera de alcance
- `CoursesGrid` («Asignaturas»): no se pidió fondo para esta sección y se queda como está.
- Textos, fotos, íconos y orden de las instituciones, de la tutoría y de los cargos.
- Las bandas de otras páginas.

## Tareas
- [ ] **Sección principal:** montar `texture-dots` y `texture-halo` (`aria-hidden`) detrás de `LecturerHeader`, con la variable de E200-I06 ajustada a la alineación de su encabezado.
- [ ] **Experiencia por institución:** una sola capa de puntos detrás del encabezado de la sección y de la franja de IPLACEX, sin corte visible entre ambos. Variante de puntos de `ThemeStripe` (E200-I06) en la franja de INACAP. La foto de cada franja queda por encima de la capa.
- [ ] **Curvas:** variante de curvas de `ThemeStripe` en la franja de Duoc UC y de `Band` en «Tutor de Alumnos», sin la cuadrícula, con las dos composiciones nuevas dibujadas en el componente de E200-I05 (trazos suavizados, piezas ancladas, 10 KB o menos por composición).
- [ ] **Cargos especiales:** desde 1.024 px, una fila de dos columnas iguales con la misma altura (`grid-template-columns: repeat(2, minmax(0, 1fr))` o equivalente) y el ancho máximo ampliado al que haga falta para que el texto no quede apretado; bajo 1.024 px, una columna como hoy. La lista, los íconos y el contenido no cambian.
- [ ] **Ritmo visual:** recorrer la página completa y comprobar que la alternancia de fondos se lee ordenada: puntos en la cabecera, asignaturas lisa, puntos en IPLACEX, curvas en Duoc UC, puntos en INACAP, curvas en la tutoría y cargos sobre `bg-alt`. Comprobar también que ninguna textura pasa detrás de un texto pequeño sin cumplir el contraste de 4.4 (medir el peor punto).
- [ ] **Revisión visual:** protocolo de la épica en `/es/docente/` y `/en/lecturer/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px.
- [ ] **Registro y bloques:** ADR-114, bloque de `DESIGN.md` 4.5 y 11.7 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/lecturer/LecturerHeader.astro`, `InstitutionsZigzag.astro`, `MentoringBand.astro`, `SpecialRoles.astro` y el componente de curvas de nivel de E200-I05; si hace falta, `src/styles/global.css`.

## Criterios de aceptación (verificables)
- [ ] La cabecera, el encabezado de «Experiencia por institución» con la franja de IPLACEX, y la franja de INACAP muestran el campo de puntos (halo solo en oscuro), en es y en.
- [ ] La franja de Duoc UC y la banda «Tutor de Alumnos» muestran curvas de nivel suavizadas, sin cuadrícula, con composiciones distintas entre sí y de las de Inicio, Educación y Desarrollador.
- [ ] Desde 1.024 px, los dos cargos especiales están en una fila de dos columnas de igual altura; bajo esa medida, uno debajo del otro; sin desbordes a 360 px ni en inglés.
- [ ] «Asignaturas» y el contenido de todas las secciones no cambian.
- [ ] Las texturas no se anuncian en lectores de pantalla ni reciben foco o clics; el texto mantiene los contrastes de 4.4.
- [ ] Sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-106, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-114 · Docente: puntos en las secciones lisas, curvas de nivel en las bandas y cargos especiales en dos columnas
- **Contexto:** E200-I09. En Docente, las secciones de fondo liso no llevan textura, las de banda usan la cuadrícula y los dos cargos especiales están apilados en una columna angosta (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026):**
    - campo de puntos en la cabecera, en el encabezado de «Experiencia por institución» con la franja de IPLACEX, y en la franja de INACAP;
    - curvas de nivel con composición propia en la franja de Duoc UC (ladera desde la esquina superior izquierda) y en «Tutor de Alumnos» (loma desde el borde inferior);
    - los dos cargos especiales en una fila de dos columnas desde 1.024 px.
- **Consecuencias:** en Docente se repite la regla de Educación: franjas de fondo liso con puntos y franjas de banda con curvas de nivel. «Asignaturas» queda lisa. Felipe edita `DESIGN.md` 4.5 y 11.7 (ADR-033).
- **Origen:** E200-I09, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- Es la página con más texturas de la épica (3 zonas con puntos y 2 con curvas): si el recorrido completo se ve cargado en la URL de rama, se consulta a Felipe antes de cerrar (por ejemplo, para bajar la opacidad de los puntos en las franjas).
- Las composiciones de curvas son propuestas del agente; si Felipe prefiere otras en la URL de rama, se cambian en esta misma iteración.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
