# E30-I03 · Logotipo: ícono SVG y máquina de escribir con paridad exacta
- **Estado:** [ ] Pendiente
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I02, E20-I03 · **Hallazgos que cierra:** AT-003, AT-009 · **ADR relacionados:** ADR-008, ADR-023

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reimplementar el logotipo con apariencia y comportamiento idénticos al sitio actual, en todas las páginas incluida la 404, con frases por idioma.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Especificación completa en `DESIGN.md`, sección Logotipo, y en la auditoría, área C.
- Referencia: `git show main:static/js/maquina-escribir.js`, `static/js/config/maquina-escribir.config.js`, `static/js/datos/maquina-escribir.datos.js`, `static/css/index.css` (sección 18) y `static/img/favicon.svg`.
- AT-003: en `404.html:87` el logotipo no tiene `data-maquina` y no anima.
- AT-009: hoy el logotipo es un `div`; convertirlo en enlace es la propuesta P-03, pendiente de aprobación.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Componente de logotipo con ícono por máscara del SVG, texto en Lexend 700, efecto con ritmo del logotipo, cursor, reserva de ancho, nombre accesible fijo, pausa en pestaña oculta y fuera de pantalla.
- Frases por idioma (primera frase "Felipe Cuevas" en ambos).

## Fuera de alcance
- Titulares del hero (E40-I01), aunque el motor debe poder reutilizarse.

## Tareas
- [ ] Portar el motor sin dependencias.
- [ ] Traducir las frases rotativas con validación de Felipe.
- [ ] Resolver P-03 con Felipe antes de decidir si el logotipo es enlace.
- [ ] Comparar lado a lado con producción en ambos temas.

## Archivos previstos (crear / modificar)
- Crear: `src/components/layout/Logotipo.astro` y su script.

## Criterios de aceptación (verificables)
- [ ] Tamaño, color, tipografía y espaciado coinciden con el sitio actual (comparación visual lado a lado).
- [ ] Tiempos: arranque 1.400 ms, escritura 84 ms + variación 0–34 ms, borrado 42 ms, espera completa 3.600 ms, espera vacía 500 ms.
- [ ] Con movimiento reducido o sin JavaScript se muestra "Felipe Cuevas" estático y el cursor no parpadea.
- [ ] CLS 0 durante el ciclo; el texto no se parte en dos líneas.
- [ ] El nombre accesible es siempre "Felipe Cuevas".
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Grabación comparativa de un ciclo completo.
- Emulación de movimiento reducido.
- Lighthouse (CLS).

## Riesgos y notas
- Cambios de métricas de la fuente autoalojada alteran el ancho reservado.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
