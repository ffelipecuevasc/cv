# E20-I01 · Definición del DESIGN.md v1
- **Estado:** [x] Terminada (29-10-2026)
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E10-I03 · **Hallazgos que cierra:** AT-051 · **ADR relacionados:** ADR-008, ADR-010, ADR-033, ADR-036, ADR-039, ADR-040, ADR-041

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Incorporar `DESIGN.md` v1, que plasma los prototipos aprobados por Felipe, y verificar que cumple las restricciones cerradas y los ADR vigentes.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-039: los prototipos de `prototipos/` son la referencia visual; `DESIGN.md` v1 prevalece sobre ellos.
- ADR-040 (paleta) y ADR-041 (tipografía).
- `DESIGN.md` v1 lo redactó el asesor y **Felipe lo copió a la raíz**. El agente **no edita `DESIGN.md`** (ADR-033): si encuentra un error, se detiene y lo informa.
- Prototipos: `_planificacion/20_epica-sistema-diseno/prototipos/felipe-cuevas-ia.html` (claro) y `felipe-cuevas-ia-oscuro.html` (oscuro). Su contenido es ficticio (AT-050).
- Esqueleto v0: `git show HEAD:DESIGN.md` (último commit antes de esta iteración).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Verificación completa de `DESIGN.md` v1 frente al esqueleto, los ADR y los prototipos.
- Comprobación de que los prototipos no entran al build ni a las herramientas de calidad.
- Cierre documental.

## Fuera de alcance
- Editar `DESIGN.md` (ADR-033).
- Implementar tokens (E20-I02).
- Usar contenido de los prototipos.

## Tareas
- [x] Confirmar que `DESIGN.md` v1 está en la raíz y los dos prototipos en `prototipos/`.
- [x] Confirmar que las secciones 2 y 3 de `DESIGN.md` son idénticas a las del esqueleto v0.
- [x] Recalcular la tabla de contrastes de la sección 4.4 con un script temporal fuera del repositorio y sin dependencias, e informar cualquier diferencia mayor a 0,05.
- [x] Confirmar que no quedan valores "por definir" en color, tipografía, espaciado ni en los componentes navbar, hero y footer.
- [x] Confirmar que cada color de 4.1 está en la escala original o en ADR-040, y que las referencias internas (secciones 4, 7, 9 y 11) son coherentes.
- [x] Confirmar que el hero de 7.4 conserva todos los elementos de la lista de E40-I01.
- [x] Confirmar que `pnpm build` no copia los prototipos a `dist/` y que Prettier, ESLint y Tailwind no los procesan.
- [x] Marcar AT-051 como resuelto y anotar el avance de AT-050 y AT-052.

## Archivos previstos (crear / modificar)
- Ninguno de código ni `DESIGN.md`.
- Modificar: estado de la iteración y de la épica, `_planificacion/README.md`, `registro-log.md`, `auditoria-tecnica.md` y bitácora.

## Criterios de aceptación (verificables)
- [x] `DESIGN.md` v1 en la raíz y los dos prototipos en `prototipos/`.
- [x] No quedan valores "por definir" en color, tipografía, espaciado ni en los componentes navbar, hero y footer.
- [x] Cada par de color declarado cumple WCAG 2.2 AA y la tabla recalculada coincide con la de `DESIGN.md`.
- [x] Las secciones 2 y 3 son idénticas a las del esqueleto.
- [x] `DESIGN.md` tiene la sección "Composición por página" con la regla general, el catálogo y los patrones de Inicio y Educación (ADR-036).
- [x] Los prototipos no aparecen en `dist/`.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Comparación de las secciones 2 y 3 con `git show HEAD:DESIGN.md`.
- Búsqueda de "por definir" en `DESIGN.md`.
- Script temporal de contraste.
- Revisión de Felipe.

## Riesgos y notas
- Es una iteración de documento: no se escribe código de aplicación.
- Si `DESIGN.md` necesita una corrección, la redacta el asesor y la pega Felipe.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)