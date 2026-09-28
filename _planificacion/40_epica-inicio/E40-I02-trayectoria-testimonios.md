# E40-I02 · Franja de trayectoria y testimonios
- **Estado:** [ ] Pendiente
- **Épica:** E40 · Página Inicio (index.html) · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E40-I01 · **Hallazgos que cierra:** AT-012, AT-025 · **ADR relacionados:** ADR-017

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reconstruir la franja de métricas de trayectoria y la sección de testimonios dentro de `<main>`, en ambos idiomas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:index.html` (líneas 655–760), `static/js/testimonios.js`, `static/js/datos/testimonios.datos.js` (~459 palabras), fotos en `static/img/testimonios/`.
- AT-012: ambas secciones están fuera de `<main>` (`index.html:654`, `:661`, `:732`).
- AT-025: 12 testimonios con nombre y foto de personas reales; ADR-017: se muestran traducidos con la indicación "traducido del español".
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Franja de 5 métricas y testimonios según `DESIGN.md`.
- Imágenes optimizadas.
- Etiqueta de traducción en `en-US`.

## Fuera de alcance
- —

## Tareas
- [ ] Migrar los datos de testimonios al modelo de contenido bilingüe.
- [ ] Redactar la traducción y marcarla como traducida.
- [ ] Confirmar con Felipe el consentimiento de uso de nombres y fotos (por validar).

## Archivos previstos (crear / modificar)
- Crear: componentes de trayectoria y testimonios, contenido bilingüe.

## Criterios de aceptación (verificables)
- [ ] Ambas secciones están dentro de `<main>`.
- [ ] Los 12 testimonios están en ambos idiomas y en `en-US` indican que son traducciones.
- [ ] No se envían nombres de personas a servicios de terceros (reemplaza el respaldo de ui-avatars, AT-024).
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Revisión de landmarks con herramientas de accesibilidad.

## Riesgos y notas
- Consentimiento no confirmado: registrar como pendiente sin bloquear.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
