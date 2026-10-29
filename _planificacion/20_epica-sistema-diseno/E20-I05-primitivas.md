# E20-I05 · Primitivas de componentes
- **Estado:** [x] Terminada (29-10-2026)
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I03, E20-I04 · **Hallazgos que cierra:** AT-052 · **ADR relacionados:** ADR-005, ADR-010, ADR-036, ADR-039

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Construir los componentes base de `DESIGN.md` 7 que usarán todas las páginas: botones (primario, secundario, dorado, ícono y flecha), encabezado de sección (alineado, centrado y de banda), regla dorada, etiqueta, tarjeta base, tarjeta de testimonio, banda, franja temática, contenedor y enlace externo.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El sitio antiguo tiene clases de componente repetidas (`tarjeta-contenido`, `boton-primario`, `etiqueta-categoria`, `seccion-bajada`) que sirven de referencia funcional.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Componentes Astro sin JavaScript de cliente, con HTML semántico, estados de foco visibles y zona táctil de 44 px (AT-052).
- Primitiva "franja temática": bloque de ancho completo con título y contenido, orientación alternable (título a la izquierda o a la derecha), fondo `band` o `bg`, y apilado en una columna en móvil (ADR-036, `DESIGN.md` 7.8).
- Riel social y selector de idioma quedan para E30 y E40, que los usan.

## Fuera de alcance
- Componentes de layout (E30).

## Tareas
- [x] Implementar cada primitiva según `DESIGN.md`.
- [x] Agregarlas a la página de muestra en ambos temas.
- [x] Revisar teclado y contraste.
- [x] Implementar la primitiva "franja temática" con orientación alternable y apilado en móvil, y agregarla a la página de muestra (ADR-036).

## Archivos previstos (crear / modificar)
- Crear: `src/components/ui/*`.

## Criterios de aceptación (verificables)
- [x] Cada primitiva tiene estado de foco visible y contraste AA.
- [x] Ninguna primitiva usa colores fuera de tokens.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.
- [x] La franja temática alterna su orientación sin alterar el orden de lectura del HTML y se apila en una columna en móvil (ADR-036).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm lint`
- Revisión con teclado.

## Riesgos y notas
- Evitar sobreabstraer: solo lo que usan al menos dos páginas.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
