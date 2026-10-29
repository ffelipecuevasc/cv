# E20-I03 · Tipografía autoalojada e iconografía SVG
- **Estado:** [ ] Pendiente
- **Épica:** E20 · Sistema de diseño · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I02 · **Hallazgos que cierra:** AT-016, AT-017, AT-049 · **ADR relacionados:** ADR-041, ADR nuevo (mecanismo de fuentes e íconos)

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Servir Cinzel, Josefin Sans y Lexend 700 desde el propio sitio con los pesos de `DESIGN.md` 5.1 (ADR-041) y reemplazar Material Symbols por íconos SVG en línea.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-017: Lexend se carga desde Google Fonts con 7 pesos (`index.html:34`).
- AT-016: Material Symbols se carga como fuente variable completa (`index.html:36`) para ~57 íconos.
- Astro ofrece una API de fuentes; la opción concreta requiere ADR.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- ADR que elija el mecanismo de fuentes (por ejemplo, la API de fuentes de Astro con proveedor local) y el origen de los íconos, verificado en la documentación vigente de Astro 7.4.x.
- Pesos y estilos exactos de `DESIGN.md` 5.1: Cinzel 400, 500 y 600; Josefin Sans 300, 400 y 600, y cursiva 300 y 400; Lexend 700. Subconjunto latino que cubra español e inglés.
- Respaldos métricos para evitar CLS y precarga solo de lo crítico.
- Componente de ícono accesible (decorativo por defecto) y SVG de marca para las 5 redes.

## Fuera de alcance
- Íconos de marcas de terceros (se reutilizan los SVG existentes de `static/img/iconos/`).

## Tareas
- [ ] Registrar el ADR del mecanismo.
- [ ] Obtener los archivos de fuente con licencia OFL y verificar que incluyen los caracteres del español (á, é, í, ó, ú, ü, ñ, ¿, ¡).
- [ ] Autoalojar las tres familias con `font-display` adecuado y precarga del peso crítico.
- [ ] Inventariar los íconos usados en el sitio antiguo y en `DESIGN.md` 7, y proveer su equivalente SVG.
- [ ] Verificar que no hay solicitudes a `fonts.googleapis.com` ni `fonts.gstatic.com`.
- [ ] Medir el peso total de las fuentes y su efecto en LCP frente a ADR-015.
- [ ] Borrar `public/.gitkeep` si `public/` recibe su primer archivo real (AT-049).

## Archivos previstos (crear / modificar)
- Crear: archivos de fuente o configuración de la API de fuentes, componente de ícono.

## Criterios de aceptación (verificables)
- [ ] Cero solicitudes a Google Fonts en el build.
- [ ] Solo se cargan los pesos y estilos de `DESIGN.md` 5.1.
- [ ] Todos los íconos del inventario tienen equivalente.
- [ ] El logotipo mantiene Lexend en peso 700.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` y revisión de la pestaña de red en `pnpm preview`.

## Riesgos y notas
- Cambio de métricas de fuente puede afectar el ancho reservado del logotipo: validar en E30-I03.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
