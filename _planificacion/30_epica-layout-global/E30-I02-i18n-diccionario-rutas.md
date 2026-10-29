# E30-I02 · Diccionario de interfaz, rutas equivalentes y contenido bilingüe
- **Estado:** [x] Terminada (29-10-2026)
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I01 · **Hallazgos que cierra:** AT-005, AT-026 · **ADR relacionados:** ADR-017, ADR-020, ADR-035

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Centralizar los textos de interfaz por idioma, el mapa de rutas equivalentes es↔en y el modelo de contenido bilingüe que reemplaza a `static/js/datos/`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-026: ~2.000 palabras viven en `static/js/datos/` y `config/`; hay mensajes en español dentro de servicios y de la función de contacto.
- ADR-020: slugs traducidos (mapa propuesto en la auditoría, área L).
- ADR-017: el agente redacta `en-US` y Felipe valida.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Diccionario de interfaz tipado.
- Mapa de rutas con función que devuelve la ruta equivalente en el otro idioma.
- Esquema de colecciones de contenido con campos por idioma y validación de paridad.
- Par `/es/privacidad` ↔ `/en/privacy` en el mapa de rutas equivalentes, para la página nueva de política de privacidad (ADR-035, E155).

## Fuera de alcance
- Migrar el contenido de cada página (se hace en su épica).

## Tareas
- [x] Definir el diccionario con los textos del armazón (navegación, pie, botones).
- [x] Implementar el mapa de rutas y validar que cubre las 14 páginas (las 13 del sitio actual más la política de privacidad, ADR-035).
- [x] Definir el esquema de contenido y una prueba de paridad que falle si falta un idioma.
- [x] Validar los slugs en inglés con Felipe.
- [x] Agregar el par `/es/privacidad` ↔ `/en/privacy` al mapa de rutas (ADR-035).

## Archivos previstos (crear / modificar)
- Crear: `src/i18n/*`, `src/content.config.*` o equivalente.

## Criterios de aceptación (verificables)
- [x] Todas las rutas del mapa tienen equivalente en ambos idiomas.
- [x] El build falla si una entrada de contenido no tiene ambos idiomas.
- [x] Los enlaces internos se generan sin `.html`.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.
- [x] El mapa de rutas incluye `/es/privacidad` ↔ `/en/privacy` (ADR-035).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` con una entrada incompleta de prueba (debe fallar).

## Riesgos y notas
- Cambiar un slug después de publicado exige 301: cerrar el mapa aquí.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
