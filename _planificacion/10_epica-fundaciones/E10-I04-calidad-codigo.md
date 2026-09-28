# E10-I04 · Calidad de código: astro check, ESLint y Prettier
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E10-I02 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-003

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Disponer de verificación de tipos, lint y formato para archivos `.astro`, `.ts` y `.css`, expuestos como scripts de PNPM que usa la Definition of Done.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Paquetes candidatos verificados el 28-09-2026: `@astrojs/check` 0.9.10, `eslint-plugin-astro` 3.2.1, `prettier-plugin-astro` 1.1.0.
- Cada dependencia nueva requiere ADR (regla de AGENTS.md).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Scripts `dev`, `build`, `preview`, `check`, `lint`, `format` y `format:check`.
- Configuración de ESLint y Prettier para Astro.
- ADR que registre las dependencias de calidad.

## Fuera de alcance
- Pruebas automatizadas de navegador (E170).

## Tareas
- [ ] Instalar dependencias de calidad con PNPM.
- [ ] Crear configuraciones de ESLint y Prettier.
- [ ] Definir scripts en `package.json`.
- [ ] Ejecutar todos los scripts en limpio.

## Archivos previstos (crear / modificar)
- Modificar: `package.json`.
- Crear: configuración de ESLint, `.prettierrc` o equivalente, `.prettierignore` (que excluya los archivos del sitio antiguo).

## Criterios de aceptación (verificables)
- [ ] `pnpm check`, `pnpm lint` y `pnpm format:check` terminan sin errores.
- [ ] Los archivos del sitio antiguo quedan excluidos de lint y formato.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm lint`
- `pnpm format:check`

## Riesgos y notas
- Evitar reglas que obliguen a reescribir los archivos antiguos.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
