# E40-I04 · Hero simplificado y separadores de la banda
- **Estado:** [ ] Pendiente
- **Épica:** E40 · Página Inicio (index.html) · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I07 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-009, ADR-016, ADR-017, ADR-023, ADR-053, ADR-054, ADR-056, ADR-058

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Darle aire al hero y separar mejor las cifras de la banda, según la revisión de Felipe en la preview.

## Contexto y referencias
- Revisión de Felipe el 30-10-2026, en ambos temas:
    1. **Hero recargado:** demasiado contenido junto, y la tarjeta de certificaciones tapa cerca del 50 % del retrato.
    2. **Banda de cifras:** los divisores finos se confunden con la retícula del fondo.
- `DESIGN.md` 5.2, 7.4, 7.8, 9 y 11.2 (editados por Felipe antes de esta iteración, ADR-033).
- Componentes de E40: `Hero.astro`, `CredentialsCard.astro`, `StatsBand.astro`, `src/content/hero/`, `src/content/home/stats.json`, `src/scripts/hero.ts`.
- `_planificacion/99_bitacora/2026-10-30_E40-revision-ingles.md` (revisión del inglés en curso).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (30-10-2026)
- Se quitan los dos llamados a la acción de cada perfil ("Conoce mis programas" / experiencia docente / portafolio y "Revisa mi CV") y las 3 métricas por perfil. Felipe sabe que el hero deja de enlazar a esas páginas y al CV: quedan en el menú y en el pie.
- Se conservan el rótulo, el conmutador de 3 perfiles (`perfil-hero` y `?perfil=`), el `<h1>` con máquina de escribir, el párrafo, el retrato y el riel social.
- En el lugar de los botones y las métricas: rótulo "Profesional certificado" y las 4 insignias de 40 px con su nombre (Oracle, AWS, Python y Anthropic), **sin contenedor**. "Python" en vez de "Python Institute".
- La tarjeta sobre el retrato desaparece.
- Hero de pantalla completa desde 1.024 px, con el contenido centrado en vertical.
- Banda: barras verticales con el degradado de la regla dorada en vez de divisores finos; titular "Resumen" en vez de "Impacto medido".

## Alcance
- Contenido del hero en es y en, sin llamados a la acción ni métricas (esquema de la colección incluido).
- Fila de certificaciones bajo el párrafo; retiro de la tarjeta flotante.
- Alto mínimo del hero y nuevas separaciones internas.
- Separadores de la banda y titular nuevo.

## Fuera de alcance
- Navbar y pie (E30-I07).
- Testimonios (sin cambios).
- Revisión del inglés y AT-071 (cierre de E40).

## Tareas
- [ ] Registrar ADR-058 en `decisiones.md` con el texto de la sección "ADR a registrar" (si E30-I07 no lo hizo).
- [ ] Quitar llamados a la acción y métricas del contenido y del componente; borrar lo que quede sin uso.
- [ ] Fila "Profesional certificado" / "Certified professional" con las 4 insignias sin contenedor; retirar `CredentialsCard` de encima del retrato.
- [ ] Hero con alto mínimo del área visible menos la barra desde 1.024 px; repartir el espacio con la escala de `DESIGN.md` 6 y registrar las medidas en la bitácora.
- [ ] Banda: barras verticales `gold` → `vibrant` (decorativas, `aria-hidden`), sin borde superior ni divisores finos; titular "Resumen" / "Overview".
- [ ] Actualizar `2026-10-30_E40-revision-ingles.md`: quitar los textos retirados y agregar los nuevos.
- [ ] Medir de nuevo los 48 casos de la matriz de ADR-016.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/home/Hero.astro`, `StatsBand.astro`, contenido del hero y de la banda, `src/content.config.ts`, `src/i18n/ui.ts`, `src/styles/global.css`.
- Eliminar si queda sin uso: `src/components/home/CredentialsCard.astro`, variables de componente de las métricas.

## Criterios de aceptación (verificables)
- [ ] El hero no tiene llamados a la acción ni métricas, en es y en; el conmutador, `perfil-hero` y `?perfil=` funcionan igual.
- [ ] Las 4 insignias se ven bajo el párrafo, sin contenedor, a 40 px y con su nombre (Python sin "Institute"); nada tapa el retrato.
- [ ] En los 48 casos de la matriz de ADR-016 el hero completo se ve sin scroll y ocupa el alto visible menos la barra.
- [ ] La banda separa las cifras con barras degradadas, sin borde superior ni divisores finos, y el titular dice "Resumen" / "Overview".
- [ ] CLS 0; sin JavaScript se ve completo el perfil Instructor; movimiento reducido sin máquina de escribir.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Matriz de ADR-016 en Chrome real, ambos temas e idiomas, 3 perfiles.
- Desborde horizontal de 320 a 1.920 px con el ancho visual real.

## ADR a registrar (texto para `decisiones.md`)

### ADR-058 · Hero simplificado y separadores de la banda de cifras
- **Contexto:** E40-I04. En la preview, Felipe ve el hero recargado y la tarjeta de certificaciones tapa cerca del 50 % del retrato. En la banda, los divisores finos se confunden con la retícula del fondo.
- **Decisión:**
    - **Hero:** se quitan los dos llamados a la acción de cada perfil y las 3 métricas por perfil. Se conservan el rótulo, el conmutador de 3 perfiles (`perfil-hero` y `?perfil=`), el `<h1>` con máquina de escribir, el párrafo, el retrato y el riel social.
    - **Certificaciones:** en el lugar de los botones y las métricas va el rótulo "Profesional certificado" ("Certified professional") con las 4 insignias de 40 px y su nombre (Oracle, AWS, Python y Anthropic), sin contenedor. "Python" abrevia "Python Institute"; el nombre completo sigue en el JSON-LD y en Educación. La tarjeta sobre el retrato desaparece.
    - **Alto:** desde 1.024 px, el hero ocupa el alto visible menos la barra (76 px) y el contenido va centrado en vertical. Sigue cumpliendo la matriz de ADR-016.
    - **Banda de cifras:** el borde superior y los divisores finos del `dl` se reemplazan por barras verticales con el degradado `gold` → `vibrant` de la regla dorada (`DESIGN.md` 7.5). El titular pasa de "Impacto medido" a "Resumen" ("Overview").
- **Sustituye en parte:** ADR-009 y la lista de conservación de E40-I01 (llamados a la acción y métricas por perfil) y ADR-054 (las insignias dejan la tarjeta sobre el retrato).
- **Consecuencias:** el hero ya no enlaza a Instructor, Docente ni Desarrollador, ni al CV; esas páginas se alcanzan desde el menú y el CV desde el pie (ADR-057). La cifra de certificaciones (ADR-053) sigue en la banda y en el JSON-LD. Hay que volver a medir los 48 casos de la matriz. Los textos en inglés retirados salen de la revisión de E40. Felipe edita `DESIGN.md` 5.2, 7.4, 7.8, 9 y 11.2 (ADR-033).
- **Origen:** E40-I04, decisión de Felipe, 30-10-2026. **Estado:** Aceptada.

## Riesgos y notas
- Un hero de pantalla completa en 1366×638 no deja margen: el contenido debe seguir cabiendo en 562 px.
- Sin contenedor, las insignias deben leerse bien sobre el campo de puntos en ambos temas.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)