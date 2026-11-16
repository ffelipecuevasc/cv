# E30-I06 · Pie de página rediseñado y volver arriba
- **Estado:** [x] Terminada (29-10-2026)
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E30-I04 · **Hallazgos que cierra:** AT-008 · **ADR relacionados:** ADR-021, ADR-035

> Nota de cierre: el pie sigue `DESIGN.md` 7.9 (no la lista de columnas del pie antiguo): marca, navegación y 4 redes, sin las columnas Tecnologías y Certificaciones. Los 11 enlaces, las redes, las frases y los detalles del volver arriba están en ADR-052. Los 11 enlaces salen de `nav-items.ts`, la misma fuente del menú.

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Rediseñar el pie de página conservando sus contenidos y corregir las inconsistencias de etiquetas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Pie actual: redes (LinkedIn, GitHub, correo), columna Explorar (Inicio, Certificaciones, Experiencia, Eventos, Foro, Contacto), columna Tecnologías, columna Certificaciones, año dinámico y botón volver arriba.
- AT-008: Explorar no incluye Recursos y usa etiquetas distintas a la navbar.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Pie según `DESIGN.md`, con etiquetas alineadas a la navbar e inclusión de Recursos.
- Botón volver arriba con desplazamiento instantáneo bajo movimiento reducido.

## Fuera de alcance
- Botón de apariencia (se mueve a la navbar, ADR-021).
- Enlace a la política de privacidad en el pie: se agrega en E155-I01, junto con la página (ADR-035). La navbar no lo incluye.

## Tareas
- [x] Implementar el pie y el botón.
- [x] Validar enlaces en ambos idiomas.

## Archivos previstos (crear / modificar)
- Crear: `src/components/layout/Footer.astro`.

## Criterios de aceptación (verificables)
- [x] Todas las rutas del pie resuelven en ambos idiomas.
- [x] Etiquetas coherentes con la navbar.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` y verificación de enlaces.

## Riesgos y notas
- Nota (ADR-035): el pie debe dejar espacio para el enlace a la política de privacidad que agrega E155-I01 en todas las páginas, incluidas 404 y agradecimiento.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
