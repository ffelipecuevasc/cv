# E200-I11 · Talento Digital: puntos y curvas de nivel por franja, cifras centradas y OTEC en cada bootcamp
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I10 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-017, ADR-074, ADR-076, ADR-104, ADR-106, ADR-110, ADR-111, ADR-114, ADR-115

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar en Talento Digital (`/es/talento-digital/` y `/en/talento-digital/`) la misma regla de fondos de Educación y Docente, centrar las 3 cifras de la banda final y estandarizar la línea de contexto de cada bootcamp con su OTEC. Todo en `es-CL` y `en-US` y en claro y oscuro.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción.
- Orden de la página: `TalentoDigitalHeader`, `BootcampsZigzag` y `Achievements`.
- `BootcampsZigzag.astro`: encabezado «Bootcamps Realizados» y 6 franjas `ThemeStripe` que alternan tono:

    | # | Bootcamp (`id`) | Tono actual |
    |---|---|---|
    | 1 | Desarrollo Full Stack Java (`pf1162`) | `bg` |
    | 2 | Fundamentos de Ingeniería de Datos (`pf1487`) | `band` |
    | 3 | Desarrollo Full Stack Python (`pf1164-1`) | `bg` |
    | 4 | Desarrollo Full Stack Python (`pf1164-2`) | `band` |
    | 5 | Desarrollo Full Stack JavaScript (`pf1479`) | `bg` |
    | 6 | Desarrollo Full Stack JavaScript (`pf1163`) | `band` |

- La línea bajo el título de cada bootcamp es el campo `context` de `src/content/talento-digital/page.json`. Hoy solo `pf1479` y `pf1163` nombran su OTEC; `pf1164-1` y `pf1164-2` dicen «Primera ejecución» y «Segunda ejecución».
- `Achievements.astro`: la sección «Logros» (encabezado, bajada y lista de alianzas sobre fondo liso), seguida de una `Band` con las 3 cifras (horas de clase, bootcamps y módulos aprobados del Registro REUF), alineadas a la izquierda.
- Herramientas que ya existen en la épica:
    - `texture-dots` y `texture-halo`, con la variable de máscara y halo de E200-I06;
    - el componente de curvas de nivel de E200-I05, con las variantes de `Band` y de `ThemeStripe` (E200-I06);
    - el centrado y las filas comunes de la banda de cifras de Inicio (E200-I05).
- Composiciones de curvas ya usadas, que esta iteración **no** debe repetir:
    - Inicio: esquinas inferior izquierda y superior derecha;
    - Educación: borde derecho, y cordillera desde la esquina inferior izquierda;
    - Desarrollador: caída desde el borde superior al centro;
    - Docente: ladera desde la esquina superior izquierda, y loma desde el borde inferior al centro;
    - Instructor: relieves enfrentados en los bordes laterales.
- `DESIGN.md` 4.5, 7.8 y 11.9 (Talento Digital).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Campo de puntos** (dos capas, máscara radial y halo solo en oscuro, 4.5) en:
    - la sección principal (`TalentoDigitalHeader`);
    - el encabezado «Bootcamps Realizados» junto con la franja de Desarrollo Full Stack Java, como una sola zona;
    - la franja de Desarrollo Full Stack Python (`pf1164-1`);
    - la franja de Desarrollo Full Stack JavaScript (`pf1479`);
    - la parte lisa de «Logros» (encabezado, bajada y alianzas).
- **Curvas de nivel**, cada una con su composición propia, en:
    - las franjas de Fundamentos de Ingeniería de Datos (`pf1487`), Desarrollo Full Stack Python (`pf1164-2`) y Desarrollo Full Stack JavaScript (`pf1163`);
    - la banda final de las 3 cifras.
- **Banda final:** las 3 cifras centradas, como la banda de Inicio.
- **Línea de contexto de cada bootcamp**, con el formato «Plan formativo {plan} · {OTEC}» de `pf1479`:

    | Bootcamp | `es-CL` | `en-US` |
    |---|---|---|
    | `pf1162` | Plan formativo PF1162 · Edutecno | Training plan PF1162 · Edutecno |
    | `pf1487` | Plan formativo PF1487 · OTEC ECAS | Training plan PF1487 · OTEC ECAS |
    | `pf1164-1` | Plan formativo PF1164 · Skillnest | Training plan PF1164 · Skillnest |
    | `pf1164-2` | Plan formativo PF1164 · OTEC ECAS | Training plan PF1164 · OTEC ECAS |
    | `pf1479` | Sin cambio (Plan formativo PF1479 · ISEG Chile) | Sin cambio |
    | `pf1163` | Sin cambio (Plan formativo PF1163 · Posiciona Capacitación) | Sin cambio |

  Los nombres de las OTEC son nombres propios y no se traducen (ADR-025).

## Composiciones propuestas de las curvas (las valida Felipe en la URL de rama)
- **Ingeniería de Datos (`pf1487`):** líneas alargadas en diagonal que bajan desde la esquina superior derecha.
- **Python (`pf1164-2`):** un relieve de dos cimas pequeñas en la esquina inferior derecha.
- **JavaScript (`pf1163`):** curvas abiertas que entran por el borde izquierdo en la mitad inferior, como un valle que sube.
- **Banda de cifras:** dos grupos en las esquinas superior izquierda e inferior derecha, la diagonal opuesta a la de Inicio. Se desvanecen hacia el centro, donde van las cifras.
- En todas, cada quinta curva en dorado, con los mismos tokens de color. Con tantas composiciones, el componente de E200-I05 debe recibirlas como parámetros (origen, orientación y escala) y no como un SVG distinto por página.

## Alcance
- Campo de puntos en las cinco zonas de fondo liso indicadas.
- Curvas de nivel en las tres franjas con banda y en la banda de cifras, con las composiciones nuevas.
- Cifras centradas en la banda final.
- Línea de contexto de cuatro bootcamps, en es y en.
- Bloque de `DESIGN.md` 4.5, 7.8 y 11.9 para Felipe.

## Fuera de alcance
- Portadas, píldoras, títulos, años, horas, párrafos y módulos de cada bootcamp. El párrafo de `pf1164-2` sigue diciendo «Segunda ejecución del plan PF1164», que es un hecho y no se pidió cambiar.
- Los valores y rótulos de las 3 cifras.
- El orden de las franjas y su alternancia de lados.

## Tareas
- [ ] **Contenido:** actualizar `context` de `pf1162`, `pf1487`, `pf1164-1` y `pf1164-2` en `page.json` con la tabla de decisiones, en es y en.
- [ ] **Puntos:** campo de puntos detrás de `TalentoDigitalHeader`; una sola capa detrás del encabezado de «Bootcamps Realizados» y la franja de Java; variante de puntos de `ThemeStripe` en `pf1164-1` y `pf1479`; capa detrás de la parte lisa de «Logros». Las portadas de los bootcamps quedan por encima de la capa.
- [ ] **Curvas en franjas:** variante de curvas de `ThemeStripe` en `pf1487`, `pf1164-2` y `pf1163`, sin la cuadrícula, con las tres composiciones nuevas pasadas como parámetros al componente de E200-I05 (trazos suavizados, piezas ancladas, 10 KB o menos por composición).
- [ ] **Banda de cifras:** variante de curvas de `Band` con su composición, y las 3 cifras centradas (rótulo, cifra y contexto), con filas comunes para que ninguna cifra baje cuando un texto ocupa más líneas, como en E200-I05. Bajo la medida en que hoy se apilan, siguen centradas.
- [ ] **Controles:** revisar `scripts/verify-seo.mjs` y `check-i18n.mjs` por dependencias de la línea de contexto, de la banda de cifras o de la cuadrícula de las franjas; ajustar solo lo necesario y comprobar que el control ajustado falla ante un caso roto.
- [ ] **Ritmo visual:** recorrer la página completa y comprobar que la alternancia de puntos y curvas en las 6 franjas se lee ordenada y no cargada. Medir el contraste en el peor punto donde una textura pasa detrás de texto pequeño.
- [ ] **Revisión visual:** protocolo de la épica en `/es/talento-digital/` y `/en/talento-digital/`, claro y oscuro, a 360, 768, 1.024, 1.366 y 1.920 px.
- [ ] **Registro y bloques:** ADR-116, bloque de `DESIGN.md` 4.5, 7.8 y 11.9 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/content/talento-digital/page.json`, `src/components/talento-digital/TalentoDigitalHeader.astro`, `BootcampsZigzag.astro`, `Achievements.astro`, el componente de curvas de nivel de E200-I05 y, si hace falta, `src/styles/global.css` y `scripts/verify-seo.mjs`.

## Criterios de aceptación (verificables)
- [ ] La cabecera, «Bootcamps Realizados» con la franja de Java, las franjas `pf1164-1` y `pf1479`, y la parte lisa de «Logros» muestran el campo de puntos (halo solo en oscuro), en es y en.
- [ ] Las franjas `pf1487`, `pf1164-2` y `pf1163` y la banda de cifras muestran curvas de nivel suavizadas, sin cuadrícula, con composiciones distintas entre sí y de las de las otras páginas.
- [ ] Las 3 cifras de la banda final están centradas y alineadas en una misma línea, también en inglés.
- [ ] Las 6 líneas de contexto siguen el formato «Plan formativo {plan} · {OTEC}», con los textos de la tabla, en es y en.
- [ ] Ningún otro contenido de la página cambia.
- [ ] Las texturas no se anuncian en lectores de pantalla ni reciben foco o clics; el texto mantiene los contrastes de 4.4.
- [ ] Sin JavaScript nuevo; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica con el navegador de ADR-106, en local y en la URL de rama.

## ADR a registrar (texto para `decisiones.md`)

### ADR-116 · Talento Digital: puntos y curvas de nivel por franja, cifras centradas y OTEC en cada bootcamp
- **Contexto:** E200-I11. En Talento Digital, las franjas de fondo liso no llevan textura, las de banda y la banda final usan la cuadrícula, las 3 cifras finales están alineadas a la izquierda y solo dos bootcamps nombran su OTEC en la línea de contexto (revisión de Felipe en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026):**
    - campo de puntos en la cabecera, en «Bootcamps Realizados» con la franja de Java, en las franjas `pf1164-1` y `pf1479`, y en la parte lisa de «Logros»;
    - curvas de nivel con composición propia en las franjas `pf1487`, `pf1164-2` y `pf1163` y en la banda de cifras;
    - las 3 cifras finales centradas;
    - cada bootcamp nombra su OTEC: Edutecno (`pf1162`), OTEC ECAS (`pf1487` y `pf1164-2`), Skillnest (`pf1164-1`), ISEG Chile (`pf1479`) y Posiciona Capacitación (`pf1163`).
- **Consecuencias:** Talento Digital sigue la regla de Educación y Docente: fondo liso con puntos y banda con curvas de nivel. Las líneas «Primera ejecución» y «Segunda ejecución» desaparecen de la línea de contexto (el párrafo de `pf1164-2` conserva la mención). Felipe edita `DESIGN.md` 4.5, 7.8 y 11.9 (ADR-033).
- **Origen:** E200-I11, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- Es la página más larga de la épica, con 6 franjas alternadas: si el recorrido completo se ve cargado en la URL de rama, se consulta a Felipe antes de cerrar (por ejemplo, para bajar la opacidad de las texturas en las franjas).
- Los dos bootcamps de PF1164 pasan a distinguirse por la OTEC y los años (2025 y 2025-2026), ya no por «Primera» y «Segunda ejecución».
- Las composiciones de curvas son propuestas del agente; si Felipe prefiere otras, se cambian en esta misma iteración.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
