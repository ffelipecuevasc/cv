# E20-I02 · Tokens en @theme y tema claro/oscuro
- **Estado:** [ ] Pendiente
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I01 · **Hallazgos que cierra:** AT-019 · **ADR relacionados:** ADR-004, ADR-010, ADR-023, ADR-040

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Traducir los tokens de `DESIGN.md` a `@theme` de Tailwind v4 y habilitar el tema oscuro controlado por clase o atributo en `<html>`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El sitio antiguo usa `darkMode: "class"` con clave `theme` en `localStorage` (ADR-023 conserva la clave).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Paleta base de `DESIGN.md` 4.1 y tokens semánticos de 4.2 por tema, con la convención de nombres de la sección 9.
- Variante oscura controlada por clase o atributo en `<html>`, compatible con la clave `theme` (ADR-023).
- Tokens de sombras (7.13), duraciones y curvas (8), contenedor y punto de quiebre `cards` (6).
- Utilidades de textura: campo de puntos, halo, retícula de banda y marco del retrato (4.5).

## Fuera de alcance
- Script anti-parpadeo en el `<head>` (E30-I01).

## Tareas
- [ ] Declarar la paleta base y los semánticos en la hoja global.
- [ ] Definir la variante oscura: los semánticos cambian de valor y los componentes no necesitan clases `dark:` para el color.
- [ ] Declarar sombras, duraciones, curvas, contenedor y punto de quiebre.
- [ ] Crear las utilidades de textura.
- [ ] Crear la página interna de muestra con la paleta, los semánticos y las texturas en ambos temas.
- [ ] Comprobar en la muestra los pares de la tabla 4.4 con una herramienta de contraste.

## Archivos previstos (crear / modificar)
- Modificar: `src/styles/global.css`.
- Crear: página de muestra interna (excluida del sitemap).

## Criterios de aceptación (verificables)
- [ ] No hay colores hexadecimales fuera de los tokens.
- [ ] La muestra se ve correcta en ambos temas.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.
- [ ] Los semánticos cambian con el tema sin modificar el marcado.
- [ ] Los pares de la tabla 4.4 se comprobaron en la muestra.

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
