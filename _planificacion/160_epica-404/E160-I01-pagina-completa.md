# E160-I01 · Página 404 por idioma
- **Estado:** [ ] Pendiente
- **Épica:** E160 · Página 404 (404.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E30-I06, E10-I09 · **Hallazgos que cierra:** AT-003, AT-004 · **ADR relacionados:** ADR-007, ADR-001

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Servir una 404 en el idioma de la ruta solicitada, con estilos correctos en cualquier profundidad de ruta.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:404.html`.
- AT-004: la 404 actual usa rutas relativas (`404.html:37`, `:98`), que fallan en rutas anidadas.
- AT-003: su logotipo no anima.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- 404 para `/es/*` y `/en/*` y una 404 raíz para rutas sin prefijo (en español con enlace a inglés).
- `noindex`.

## Fuera de alcance
- —

## Tareas
- [ ] Construir las páginas.
- [ ] Configurar el manejo de 404 según la plataforma de ADR D-14.
- [ ] Probar rutas inexistentes de uno, dos y tres niveles.

## Archivos previstos (crear / modificar)
- Crear: páginas 404.

## Criterios de aceptación (verificables)
- [ ] `/es/x/y/z` muestra la 404 en español con estilos; `/en/x/y` en inglés.
- [ ] El logotipo anima igual que en el resto del sitio.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba en la URL de preview con rutas anidadas.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
