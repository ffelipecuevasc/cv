# E30-I07 · Ajustes de navbar y pie tras la revisión en la preview
- **Estado:** [ ] Pendiente
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-062 · **ADR relacionados:** ADR-017, ADR-021, ADR-035, ADR-049, ADR-050, ADR-051, ADR-052, ADR-056, ADR-057

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Corregir la navbar y el pie según la revisión de Felipe en la preview, antes de que las épicas de página (E40-I04 y E50 en adelante) se construyan sobre ellos.

## Contexto y referencias
- Revisión de Felipe el 30-10-2026 en `https://felipecuevas-dev.felipe-cuevas.workers.dev/es/`, en ambos temas:
    1. **Ícono del logotipo:** su trazo grueso no calza con el estilo elegante y fino del sitio.
    2. **Cursor del logotipo:** no acompaña al texto que se escribe; queda fijo al final del ancho reservado, también con el renglón vacío. En el hero sí funciona bien.
    3. **"Descargar CV":** ocupa demasiado espacio y aprieta la barra.
    4. **Pie, navegación:** la columna de 11 enlaces deja el pie demasiado alto (AT-062, unos 740 px a 1.280 px).
    5. **Pie, redes:** la columna alineada a la derecha no le gusta; quiere todo a la izquierda y el ícono antes del texto.
- `DESIGN.md` 2.1, 3, 7.2, 7.3 y 7.9 (editados por Felipe antes de esta iteración, ADR-033).
- Componentes de E30: `Logo.astro`, `Navbar`, menú móvil, `Footer.astro`, `nav-items.ts`, `social-links.ts`, `src/scripts/typewriter.ts`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (30-10-2026)
- Ícono nuevo: «terminal» de Material Symbols Light, con los colores del logotipo. Solo en el logotipo; el favicon no cambia.
- "Descargar CV" sale de la barra **y** del panel móvil; vive solo en el pie, bajo la frase de la marca (Felipe eligió esta opción tras la advertencia de que el CV queda menos visible).
- Pie con 6 enlaces: Inicio, Educación, Experiencia (a Resumen), Recursos, Contacto y Política de privacidad. Etiquetas "Experiencia" y "Recursos".
- Redes del pie alineadas a la izquierda, con el ícono antes del texto.

## Alcance
- SVG del ícono nuevo, con el mismo render por máscara de 32 × 32 y los colores de `DESIGN.md` 3.1.
- Cursor del logotipo pegado al último carácter, sin CLS.
- "Descargar CV" fuera de la barra de escritorio y del panel móvil; botón secundario en la columna de marca del pie.
- Lista del pie de 5 enlaces hoy (privacidad llega con E155-I01) y columna de redes a la izquierda.

## Fuera de alcance
- Favicon (sigue `static/img/favicon.svg`).
- Cursor del titular del hero en móvil (AT-065, E170-I01).
- La página de privacidad y su enlace (E155-I01).
- Cambios de la portada (E40-I04).

## Tareas
- [ ] Registrar ADR-056 y ADR-057 en `decisiones.md` con el texto de la sección "ADR a registrar".
- [ ] Agregar E30-I07 a `epica.md` de E30 y E40-I04 a `epica.md` de E40; actualizar README (55 iteraciones; E30 vuelve a [~]) y `registro-log.md`.
- [ ] Ícono: SVG de Material Symbols Light (path entregado por Felipe), con un comentario que indique origen y licencia Apache 2.0, y crédito en el `README.md` de la raíz.
- [ ] Cursor: corregir la estructura del logotipo o del motor para que el cursor siga al texto, sin romper la reserva de ancho (CLS 0) ni el hero.
- [ ] CV: retirar el botón de la barra y del panel móvil; agregarlo al pie con atributo de descarga, ícono y nombre accesible por idioma (ADR-017, ADR-050).
- [ ] Pie: 5 enlaces desde una lista propia del pie (no `nav-items.ts` completo); dejar anotado en `E155-I01` que el enlace de privacidad va como sexto enlace de esta columna.
- [ ] Redes: columna a la izquierda en todos los anchos, ícono antes del texto.
- [ ] Medir la holgura de la barra a 1.280 px y el alto del pie antes y después.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/layout/Logo.astro`, el SVG del ícono, `src/scripts/typewriter.ts` (si hace falta), Navbar y menú móvil, `Footer.astro`, `src/i18n/ui.ts`, `README.md` (crédito).

## Criterios de aceptación (verificables)
- [ ] El logotipo usa el ícono nuevo en claro (`orient-600`) y oscuro (`orient-400`); el favicon no cambió.
- [ ] El cursor del logotipo va pegado al último carácter al escribir y al borrar, y queda al inicio con el renglón vacío; CLS 0.
- [ ] Ni la barra ni el panel móvil muestran "Descargar CV"; el pie sí, en es y en, y descarga el PDF.
- [ ] El pie tiene 5 enlaces que resuelven en ambos idiomas y es más bajo que antes (medida en la bitácora).
- [ ] Redes del pie a la izquierda con el ícono primero, de 360 a 1.920 px.
- [ ] Teclado, foco visible, sin JavaScript y movimiento reducido funcionan como antes.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.
- Chrome en 360, 768, 1.280, 1.366 y 1.920 px, ambos temas e idiomas.
- La matriz de ADR-016 del hero no cambia (la barra mantiene 76 px).

## ADR a registrar (texto para `decisiones.md`)

### ADR-056 · Iteraciones de ajuste tras la revisión en la preview
- **Contexto:** el 30-10-2026, con la portada publicada en la preview del Worker, Felipe revisó la navbar, el pie y la portada, y encontró defectos de implementación y cambios de diseño. Se evaluaron tres caminos: editar las iteraciones cerradas, crear iteraciones nuevas al final de cada épica o juntar todo en una épica de arreglos al final (E165).
- **Decisión:**
    - Los ajustes se agregan como iteraciones nuevas al final de su épica: **E30-I07** (navbar y pie) y **E40-I04** (portada). Se ejecutan en ese orden, antes de cerrar E40 y antes de E50.
    - Las iteraciones cerradas y sus bitácoras no se editan.
    - Los detalles que aparezcan en páginas futuras se corrigen en la épica de esa página mientras esté abierta; los transversales van a E170.
    - No se crea una épica de arreglos.
- **Consecuencias:** el plan pasa de 53 a 55 iteraciones y E30 vuelve a [~] hasta cerrar E30-I07. Se descarta E165 porque duplicaría a E170 y obligaría a revisar todas las páginas si la navbar o el pie cambiaran al final.
- **Origen:** decisión de Felipe, 30-10-2026. **Estado:** Aceptada.

### ADR-057 · Navbar y pie tras la revisión en la preview
- **Contexto:** E30-I07. En la preview, el ícono del logotipo se ve grueso frente al estilo fino del sitio, el cursor del logotipo no sigue al texto, "Descargar CV" aprieta la barra, el pie mide unos 740 px por sus 11 enlaces (AT-062) y la columna de redes alineada a la derecha no le gusta a Felipe.
- **Decisión:**
    - **Ícono del logotipo:** «terminal» de Material Symbols Light (Google, licencia Apache 2.0), `viewBox="0 0 24 24"`, con el mismo render por máscara de 32 × 32 y los mismos colores (`DESIGN.md` 3.1). Se conserva el aviso de licencia (comentario en el SVG y crédito en el `README.md` de la raíz). El favicon no cambia, porque un trazo fino se pierde a 16 px.
    - **Cursor del logotipo:** acompaña al último carácter escrito, como el del hero. Es una corrección de implementación de `DESIGN.md` 3.3; el ritmo no cambia.
    - **CV:** "Descargar CV" sale de la barra de escritorio y del panel móvil. Vive solo en el pie, como botón secundario bajo la frase de la marca, con atributo de descarga y nombre accesible "Descargar CV (PDF)" / "Download CV (PDF, Spanish)" (ADR-017). La URL no cambia (ADR-050).
    - **Pie, navegación:** 6 enlaces en vez de 11: Inicio, Educación, Experiencia (a Resumen), Recursos, Contacto y Política de privacidad. El último lo agrega E155-I01 cuando exista la página; hasta entonces son 5. El enlace de privacidad deja la barra inferior y pasa a esta columna.
    - **Pie, redes:** columna alineada a la izquierda en todos los anchos; el ícono va antes del texto.
- **Sustituye en parte:** ADR-021 (CV en la barra), ADR-049 (ícono del logotipo; el nombre, las frases y el ritmo siguen igual) y ADR-052 (lista de 11 enlaces, redes a la derecha y contenedor de privacidad en la barra inferior).
- **Consecuencias:** resuelve AT-062. El CV queda menos visible, solo al final de cada página: es una decisión de Felipe, tomada tras la advertencia del asesor. El quiebre de 1.280 px de la barra se mantiene y E30-I07 informa la nueva holgura. E155-I01 agrega el enlace de privacidad en la columna de navegación del pie. Felipe edita `DESIGN.md` 2.1, 3, 7.2 y 7.9 (ADR-033).
- **Origen:** E30-I07, decisión de Felipe, 30-10-2026. **Estado:** Aceptada.

## Riesgos y notas
- El motor de máquina de escribir es compartido con el hero: la corrección del cursor no debe cambiar el hero ni la reserva de ancho.
- Si el ícono nuevo cambia el ancho del logotipo, revisar el umbral de 420 px de ADR-051.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` (desde AT-072) y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)