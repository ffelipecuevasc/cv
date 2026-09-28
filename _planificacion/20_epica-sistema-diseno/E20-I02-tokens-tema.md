# E20-I02 · Tokens en @theme y tema claro/oscuro
- **Estado:** [ ] Pendiente
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I01 · **Hallazgos que cierra:** AT-019 · **ADR relacionados:** ADR-004, ADR-010

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Traducir los tokens de `DESIGN.md` a `@theme` de Tailwind v4 y habilitar el tema oscuro controlado por clase o atributo en `<html>`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El sitio antiguo usa `darkMode: "class"` con clave `theme` en `localStorage` (ADR-023 conserva la clave).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Variables de tema, variante oscura personalizada y convenciones de nombres.

## Fuera de alcance
- Script anti-parpadeo en el `<head>` (E30-I01).

## Tareas
- [ ] Declarar tokens en la hoja global.
- [ ] Definir la variante oscura.
- [ ] Crear la página interna de muestra con la paleta completa.

## Archivos previstos (crear / modificar)
- Modificar: `src/styles/global.css`.
- Crear: página de muestra interna (excluida del sitemap).

## Criterios de aceptación (verificables)
- [ ] No hay colores hexadecimales fuera de los tokens.
- [ ] La muestra se ve correcta en ambos temas.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Revisión visual de la muestra.

## Riesgos y notas
- La página de muestra no debe publicarse indexable.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
