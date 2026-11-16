# E20-I07 · Estrellas rellenas en testimonios
- **Estado:** [x] Terminada (31-10-2026)
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E20-I06 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-056, ADR-063, ADR-064

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Que las estrellas encendidas de los testimonios usen la variante rellena de Material Symbols Light, porque la de contorno se veía tenue a 15 px (bitácora de E20-I06). Es una iteración nueva al final de E20 (ADR-056): E20-I06 y su bitácora no se editan.

## Contexto y referencias
- Decisión de Felipe (31-10-2026): estrellas encendidas rellenas (`material-symbols-light:star`); las apagadas siguen de contorno, con opacidad. Los demás íconos tenues se aceptan tal cual.
- `DESIGN.md` 4.3 (en claro, las estrellas llevan `gold-deep`), 4.4 (contrastes), 7.6 (tarjeta de testimonio) y 7.14; ADR-063; bitácora de E20-I06.
- Archivos: `src/components/ui/icons.ts`, `src/components/ui/TestimonialCard.astro`, `src/styles/global.css`.

## Alcance
- Trazado de la estrella rellena copiado a `icons.ts` (aviso de Apache 2.0 ya presente en el archivo).
- Color de relleno: `gold-deep` en claro y `gold` en oscuro.
- Medir el contraste en ambos temas.

## Fuera de alcance
- Los demás íconos tenues (Felipe los acepta tal cual).
- Tamaño (15 px), cantidad (5) y nota «5 de 5» para lectores de pantalla: no cambian.

## Tareas
- [x] Obtener el trazado de `material-symbols-light:star` (sin red, detenerse).
- [x] Usarlo en las estrellas encendidas; las apagadas siguen de contorno con opacidad.
- [x] Color por tema con un token de componente (`--star-fill`: `gold-deep` en claro y `gold` en oscuro).
- [x] Medir el contraste en claro y oscuro: 6,25:1 y 10,97:1 (bitácora).
- [x] Revisar Inicio a 375 y 1.280 px, claro y oscuro, es y en.
- [x] Cierre documental (ADR-064, bitácora, README, registro-log).

## Criterios de aceptación (verificables)
- [x] Las estrellas encendidas son rellenas y las apagadas de contorno con opacidad.
- [x] Relleno `gold-deep` en claro y `gold` en oscuro, con el contraste medido.
- [x] 15 px, 5 estrellas y «Calificación: N de 5» / «Rating: N out of 5» sin cambios.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check` y `pnpm verify:seo` sin errores.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [x] Registrar ADR-064 en `decisiones.md`
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
