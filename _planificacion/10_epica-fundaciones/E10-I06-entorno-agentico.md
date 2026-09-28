# E10-I06 · Entorno agéntico: AGENTS.md en Claude Code y Antigravity
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E10-I02 · **Hallazgos que cierra:** AT-021, AT-036 · **ADR relacionados:** ADR-011, ADR-012, ADR-024

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Garantizar que Claude Code y Antigravity cargan el `AGENTS.md` de la raíz y que los permisos del agente reflejan PNPM y la prohibición de commits, push y merges.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Claude Code 2.1.277 (18-09-2026) lee `AGENTS.md` solo si no existe `CLAUDE.md` en el directorio de trabajo ni en los superiores; el comportamiento se ajusta en `/config` (opción de instrucciones del proyecto).
- `AGENTS.md` no aparece en `/memory` ni en `/context`: se verifica con la línea de arranque que indica que se cargó, o preguntando al agente por sus instrucciones (AT-036).
- Antigravity lee `AGENTS.md` de la raíz como regla del workspace; `GEMINI.md` tiene precedencia si existe.
- AT-021: el `.claude/settings.json` antiguo está orientado a npm y deja `git commit` en `ask`, lo que contradice D-12.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Nuevo `.claude/settings.json` con permisos para scripts de PNPM, denegación de commit, push, merge, rebase, reset y cualquier comando de npm, yarn o bun.
- Verificación documentada en Claude Code y en Antigravity.
- Regla de no crear `CLAUDE.md` ni `GEMINI.md` (ADR-024).

## Fuera de alcance
- Cambiar el contenido normativo de `AGENTS.md` sin ADR.

## Tareas
- [ ] Redactar `.claude/settings.json` nuevo (permitir `pnpm dev|build|check|lint|test|format`; denegar `git commit`, `git push`, `git merge`, `git rebase`, `git reset --hard`, `npm`, `yarn`, `bun`, `npx`).
- [ ] Revisar `/config` en Claude Code y confirmar el modo que carga `AGENTS.md`.
- [ ] Iniciar sesión y confirmar la línea de carga de `AGENTS.md`; preguntar al agente qué dice la sección de lectura obligatoria.
- [ ] En Antigravity, abrir el workspace y confirmar que la regla de `AGENTS.md` está activa.
- [ ] Registrar versiones de Claude Code y Antigravity en la bitácora.

## Archivos previstos (crear / modificar)
- Reemplazar: `.claude/settings.json`.
- Verificar: `.gitignore` incluye `.claude/settings.local.json`.

## Criterios de aceptación (verificables)
- [ ] En Claude Code, el agente cita correctamente la sección de lectura obligatoria sin que se le entregue el archivo.
- [ ] En Antigravity, la regla de `AGENTS.md` aparece activa.
- [ ] Un intento de `git commit` o `npm install` desde el agente queda denegado.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Prueba manual en ambas herramientas (Felipe confirma).
- Revisión del JSON con `pnpm format:check`.

## Riesgos y notas
- Un `CLAUDE.md` en un directorio superior del equipo de Felipe bloquearía `AGENTS.md`: revisarlo.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
