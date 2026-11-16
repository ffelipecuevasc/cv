# E20-I04 · Sistema de movimiento sin AOS
- **Estado:** [x] Terminada (29-10-2026)
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I02 · **Hallazgos que cierra:** AT-018, AT-040 · **ADR relacionados:** ADR nuevo (movimiento)

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reemplazar AOS por un mecanismo propio mínimo de aparición al hacer scroll, que nunca deje contenido invisible y respete `prefers-reduced-motion`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-018: AOS 2.3.4 no se publica desde junio de 2022, está vendorizado y además declarado en `dependencies`.
- AT-040: el sitio antiguo usa un guardián en línea de 1.500 ms que revela todo si la animación no arranca, y un `<noscript>` que desactiva AOS.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.
- `DESIGN.md` 8: Inicio no tiene animaciones de entrada; la utilidad queda para las páginas que la necesiten. Duraciones y curvas como tokens (`fast`, `base`, `medium`, `slow` y `ease-out-soft`).

## Alcance
- Utilidad basada en IntersectionObserver y CSS, sin dependencias.
- Garantías: sin JavaScript todo visible; con movimiento reducido no hay animaciones de entrada; sin CLS.

## Fuera de alcance
- Efecto linterna y efectos decorativos (se deciden en `DESIGN.md`).

## Tareas
- [x] Registrar ADR.
- [x] Implementar la utilidad y su estilo.
- [x] Probar con JavaScript desactivado y con movimiento reducido.
- [x] Usar los tokens de duración y curva de `DESIGN.md` 8.

## Archivos previstos (crear / modificar)
- Crear: script y estilos de movimiento en `src/`.

## Criterios de aceptación (verificables)
- [x] Con JavaScript desactivado todo el contenido es visible.
- [x] Con `prefers-reduced-motion: reduce` no hay animaciones de entrada.
- [x] CLS igual a 0 atribuible al movimiento: solo opacidad y `translate`, que no desplazan el layout (Lighthouse queda para E170-I02).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Emulación de movimiento reducido en DevTools.
- Lighthouse en la página de muestra.

## Riesgos y notas
- No reintroducir retardos largos que empeoren LCP.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
