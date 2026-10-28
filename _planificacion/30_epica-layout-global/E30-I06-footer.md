# E30-I06 · Pie de página rediseñado y volver arriba
- **Estado:** [ ] Pendiente
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E30-I04 · **Hallazgos que cierra:** AT-008 · **ADR relacionados:** ADR-021, ADR-035

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Rediseñar el pie de página conservando sus contenidos y corregir las inconsistencias de etiquetas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Pie actual: redes (LinkedIn, GitHub, correo, Discord), columna Explorar (Inicio, Certificaciones, Experiencia, Eventos, Foro, Contacto), columna Tecnologías, columna Certificaciones, año dinámico y botón volver arriba.
- AT-008: Explorar no incluye Recursos y usa etiquetas distintas a la navbar.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Pie según `DESIGN.md`, con etiquetas alineadas a la navbar e inclusión de Recursos.
- Botón volver arriba con desplazamiento instantáneo bajo movimiento reducido.
- Enlace a la política de privacidad (`/es/privacidad` y `/en/privacy`) en el pie de todas las páginas, incluidas la 404 y la de agradecimiento (ADR-035).

## Fuera de alcance
- Botón de apariencia (se mueve a la navbar, ADR-021).
- Enlace a la política de privacidad en la navbar: no se agrega, la navbar se mantiene sin cambios (ADR-035, D-08).

## Tareas
- [ ] Implementar el pie y el botón.
- [ ] Validar enlaces en ambos idiomas.
- [ ] Agregar el enlace a la política de privacidad en el pie, con la etiqueta desde el diccionario y la ruta desde el mapa de rutas (ADR-035).

## Archivos previstos (crear / modificar)
- Crear: `src/components/layout/Footer.astro`.

## Criterios de aceptación (verificables)
- [ ] Todas las rutas del pie resuelven en ambos idiomas.
- [ ] Etiquetas coherentes con la navbar.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.
- [ ] El pie de todas las páginas, incluidas 404 y agradecimiento, enlaza a la política de privacidad del idioma activo, y la navbar no cambia (ADR-035).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` y verificación de enlaces.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
