# E30-I04 · Navbar de escritorio rediseñada
- **Estado:** [x] Terminada (29-10-2026)
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I03 · **Hallazgos que cierra:** AT-002, AT-007, AT-008, AT-010 · **ADR relacionados:** ADR-008, ADR-021

> Nota de cierre: la prueba de idioma se hizo sobre las 26 rutas del mapa (13 páginas × 2 idiomas, ADR-048: la 404 no está en el mapa), no 28. Sin páginas creadas aún para la mayoría, se probó `getEquivalentPath` sobre las 26 y el enlace real en las páginas generadas. El lector de pantalla se cubrió con el árbol de accesibilidad de Chrome; queda una pasada con NVDA para E170-I01.

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Rediseñar la navbar de escritorio con las mismas opciones del sitio actual, desplegables accesibles, CTA de CV, botón de apariencia y botón de idioma.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Opciones exactas (auditoría D): Inicio · Educación · Experiencia ▾ (Resumen, Desarrollador, Docente Universitario, Instructor REUF, Talento Digital) · Comunidad ▾ (Eventos, Foro, Recursos) · Contacto · CTA Descargar CV.
- AT-007: el botón de apariencia hoy está en el pie (`index.html:898`); ADR-021 lo lleva a la barra.
- AT-010: los desplegables abren por hover/focus CSS y no se cierran con Escape.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Navbar sticky según `DESIGN.md`.
- Desplegables operables con ratón y teclado (Enter/Espacio, Escape, Tab) y `aria-expanded` sincronizado.
- `aria-current="page"` en el enlace hijo y estilo activo en el disparador padre.
- Botón de apariencia y botón de idioma que lleva a la ruta equivalente.

## Fuera de alcance
- Menú móvil (E30-I05).

## Tareas
- [x] Implementar la navbar con textos del diccionario.
- [x] Implementar el botón de idioma con el mapa de rutas.
- [x] Probar teclado y lector de pantalla.

## Archivos previstos (crear / modificar)
- Crear: `src/components/layout/Navbar*.astro` y su script.

## Criterios de aceptación (verificables)
- [x] Las opciones y su jerarquía coinciden exactamente con el sitio actual, en ambos idiomas.
- [x] El logotipo es idéntico en apariencia y comportamiento, con alternativa estática bajo movimiento reducido.
- [x] El toggle de tema no produce parpadeo ni CLS.
- [x] El toggle de idioma lleva a la ruta equivalente de la página actual.
- [x] Todo es operable con teclado; Escape cierra el desplegable y devuelve el foco al disparador.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Recorrido con teclado.
- Lighthouse (CLS y accesibilidad).
- Prueba del botón de idioma en las 28 rutas (14 páginas × 2 idiomas, ADR-035) (con páginas de prueba).

## Riesgos y notas
- El texto en inglés es más largo: validar que la barra no se desborde a 1366 px.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
