# E20-I01 · Definición del DESIGN.md v1
- **Estado:** [ ] Pendiente
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E10-I03 · **Hallazgos que cierra:** AT-016, AT-017 · **ADR relacionados:** ADR-010

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Completar el esqueleto de `DESIGN.md` con un sistema visual más elegante y tecnológico, respetando las restricciones cerradas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-010: `DESIGN.md` en la raíz es la única fuente de verdad del diseño.
- Restricciones cerradas: D-08 (navbar y logotipo), D-09 (hero), tema claro/oscuro, i18n.
- El sitio antiguo sirve como referencia de tono visual (paleta `orient`, `primary` #007EA7, Lexend), no como norma.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Principios, paleta con tokens claro/oscuro y contrastes verificados, tipografía, escala de espaciado y layout, componentes, movimiento, reglas de Tailwind v4 y criterios de calidad visual.

## Fuera de alcance
- Implementar tokens (E20-I02).

## Tareas
- [ ] Proponer a Felipe dos o tres direcciones visuales breves (texto y referencias) y detenerse hasta que elija.
- [ ] Completar cada sección de `DESIGN.md` con valores concretos.
- [ ] Verificar contraste AA de cada par texto/fondo en ambos temas.
- [ ] Confirmar que la sección del logotipo quedó intacta.
- [ ] Registrar en `decisiones.md` la dirección visual elegida.

## Archivos previstos (crear / modificar)
- Modificar: `DESIGN.md` (raíz).
- Modificar: `_planificacion/00_producto/decisiones.md`.

## Criterios de aceptación (verificables)
- [ ] No quedan valores "por definir" en color, tipografía, espaciado ni en los componentes navbar, hero y footer.
- [ ] Cada par de color declarado cumple WCAG 2.2 AA.
- [ ] La especificación del logotipo es idéntica a la del esqueleto.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Revisión de Felipe.
- Tabla de contrastes incluida en `DESIGN.md`.

## Riesgos y notas
- Es una iteración de documento: no se escribe código de aplicación.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
