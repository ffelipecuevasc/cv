# E140-I01 · Página, formulario, Turnstile y Calendly
- **Estado:** [ ] Pendiente
- **Épica:** E140 · Página Contacto (contacto.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E30-I06 · **Hallazgos que cierra:** AT-024 · **ADR relacionados:** ADR-007, ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Migrar la página de contacto con el formulario accesible, Turnstile y el widget de Calendly cargado bajo demanda.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:contacto.html`, `static/js/contacto.js`; clave pública de Turnstile en `contacto.html:327`; Calendly en `:365`.
- AT-024: Calendly carga un widget de terceros al abrir la página.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Formulario con etiquetas, errores accesibles y mensajes por idioma.
- Calendly con carga diferida o por interacción.
- Enlaces de contacto directo.

## Fuera de alcance
- Función de envío (E140-I02).

## Tareas
- [ ] Construir la página y el formulario.
- [ ] Configurar Turnstile por idioma.
- [ ] Diferir Calendly.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/contacto.astro`, `src/pages/en/contact.astro`, componentes.

## Criterios de aceptación (verificables)
- [ ] El formulario es operable con teclado y anuncia errores.
- [ ] Calendly no se descarga hasta que se necesita.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Pestaña de red en `pnpm preview`.
- Recorrido con teclado.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
