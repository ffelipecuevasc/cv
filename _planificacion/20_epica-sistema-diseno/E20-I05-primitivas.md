# E20-I05 · Primitivas de componentes
- **Estado:** [ ] Pendiente
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I03, E20-I04 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-005, ADR-010

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Construir los componentes base que usarán todas las páginas: botones, tarjetas, etiquetas, encabezado de sección, contenedor y enlaces externos.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El sitio antiguo tiene clases de componente repetidas (`tarjeta-contenido`, `boton-primario`, `etiqueta-categoria`, `seccion-bajada`) que sirven de referencia funcional.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Componentes Astro sin JavaScript de cliente, con HTML semántico y estados de foco visibles.

## Fuera de alcance
- Componentes de layout (E30).

## Tareas
- [ ] Implementar cada primitiva según `DESIGN.md`.
- [ ] Agregarlas a la página de muestra en ambos temas.
- [ ] Revisar teclado y contraste.

## Archivos previstos (crear / modificar)
- Crear: `src/components/ui/*`.

## Criterios de aceptación (verificables)
- [ ] Cada primitiva tiene estado de foco visible y contraste AA.
- [ ] Ninguna primitiva usa colores fuera de tokens.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm lint`
- Revisión con teclado.

## Riesgos y notas
- Evitar sobreabstraer: solo lo que usan al menos dos páginas.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
