# E20-I04 · Sistema de movimiento sin AOS
- **Estado:** [ ] Pendiente
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

## Alcance
- Utilidad basada en IntersectionObserver y CSS, sin dependencias.
- Garantías: sin JavaScript todo visible; con movimiento reducido no hay animaciones de entrada; sin CLS.

## Fuera de alcance
- Efecto linterna y efectos decorativos (se deciden en `DESIGN.md`).

## Tareas
- [ ] Registrar ADR.
- [ ] Implementar la utilidad y su estilo.
- [ ] Probar con JavaScript desactivado y con movimiento reducido.

## Archivos previstos (crear / modificar)
- Crear: script y estilos de movimiento en `src/`.

## Criterios de aceptación (verificables)
- [ ] Con JavaScript desactivado todo el contenido es visible.
- [ ] Con `prefers-reduced-motion: reduce` no hay animaciones de entrada.
- [ ] CLS medido igual a 0 atribuible al movimiento.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Emulación de movimiento reducido en DevTools.
- Lighthouse en la página de muestra.

## Riesgos y notas
- No reintroducir retardos largos que empeoren LCP.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
