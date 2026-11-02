# E180-I01 · Mapa de URLs y redirecciones 301
- **Estado:** [ ] Pendiente
- **Épica:** E180 · Migración de URLs y SEO · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E160-I01 · **Hallazgos que cierra:** AT-005, AT-031, AT-043 · **ADR relacionados:** ADR-019, ADR-020, ADR-077

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Escribir las redirecciones 301 de todas las URLs actuales hacia `/es/` según el mapa de la auditoría (área L).

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Mapa en `auditoria-tecnica.md`, área L.
- `_redirects` actual: `/comunidad.html` y `/comunidad` → `/foro` (AT-031).
- `/eventos` y `/eventos.html` **no** llevan 301: responden 404 (ADR-077, la página Eventos salió del sitio). Se documenta en el mapa y se comprueba en la preview.
- AT-043: los archivos públicos (`/static/...`) conservan su ruta.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- `public/_redirects` con reglas para rutas limpias, variantes `.html` y rutas antiguas, sin cadenas.

## Fuera de alcance
- `/` (E180-I03).

## Tareas
- [ ] Generar la lista completa de URLs de `main` (páginas y archivos públicos).
- [ ] Escribir las reglas.
- [ ] Probar cada URL en la preview.

## Archivos previstos (crear / modificar)
- Crear: `public/_redirects`.

## Criterios de aceptación (verificables)
- [ ] Cada URL antigua termina en su destino con un solo salto 301.
- [ ] `/comunidad` va directo a `/es/foro`.
- [ ] `/eventos` y `/eventos.html` responden 404, sin redirección (ADR-077).
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Script de comprobación de estados HTTP sobre la preview.

## Riesgos y notas
- Límites de cantidad de reglas de la plataforma (verificar).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
