# E30-I05 · Navbar móvil
- **Estado:** [ ] Pendiente
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I04 · **Hallazgos que cierra:** AT-011 · **ADR relacionados:** ADR-008

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Implementar el menú móvil con las mismas opciones, grupos Experiencia y Comunidad como rótulos no navegables, botones de tema e idioma y CTA de CV.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Menú móvil actual (auditoría D): Inicio, Educación, grupo Experiencia (Resumen, Desarrollador, Docente, Instructor REUF, Talento Digital), grupo Comunidad (Eventos, Foro, Recursos), Contacto, Descargar CV.
- AT-011: altura máxima fija `max-h-[800px]` (`navegacion.js:28`); con el menú cerrado se usa `inert`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Menú accesible con gestión de foco, cierre con Escape y sin altura máxima fija que corte ítems.
- Etiqueta coherente con escritorio ("Docente Universitario" en ambos, resuelve parte de AT-008).

## Fuera de alcance
- —

## Tareas
- [ ] Implementar el menú.
- [ ] Probar en 360, 390 y 768 px de ancho, ambos temas e idiomas.

## Archivos previstos (crear / modificar)
- Crear o modificar: componentes de navbar.

## Criterios de aceptación (verificables)
- [ ] Todos los ítems visibles y operables en 360 px de ancho.
- [ ] Cerrado, sus enlaces no reciben foco.
- [ ] Zonas táctiles de al menos 44 px.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Emulación de dispositivos en DevTools.
- Recorrido con teclado.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
