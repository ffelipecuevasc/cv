# E30-I02 · Diccionario de interfaz, rutas equivalentes y contenido bilingüe
- **Estado:** [ ] Pendiente
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I01 · **Hallazgos que cierra:** AT-005, AT-026 · **ADR relacionados:** ADR-017, ADR-020

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

## Fuera de alcance
- Migrar el contenido de cada página (se hace en su épica).

## Tareas
- [ ] Definir el diccionario con los textos del armazón (navegación, pie, botones).
- [ ] Implementar el mapa de rutas y validar que cubre las 13 páginas.
- [ ] Definir el esquema de contenido y una prueba de paridad que falle si falta un idioma.
- [ ] Validar los slugs en inglés con Felipe.

## Archivos previstos (crear / modificar)
- Crear: `src/i18n/*`, `src/content.config.*` o equivalente.

## Criterios de aceptación (verificables)
- [ ] Todas las rutas del mapa tienen equivalente en ambos idiomas.
- [ ] El build falla si una entrada de contenido no tiene ambos idiomas.
- [ ] Los enlaces internos se generan sin `.html`.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` con una entrada incompleta de prueba (debe fallar).

## Riesgos y notas
- Cambiar un slug después de publicado exige 301: cerrar el mapa aquí.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
