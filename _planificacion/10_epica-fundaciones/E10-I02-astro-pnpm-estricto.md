# E10-I02 · Proyecto Astro desde cero con PNPM estricto
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E10-I01 · **Hallazgos que cierra:** AT-020, AT-041 · **ADR relacionados:** ADR-002, ADR-003, ADR-018

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Crear el proyecto Astro 7.x desde cero con salida estática, gestionado exclusivamente con PNPM y con mecanismos que impidan usar otros gestores.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Versiones verificadas el 28-09-2026: Astro 7.3.5 (requiere Node >= 22.12), PNPM 12.6.0, Node 24.21.0 Active LTS.
- Desde PNPM 11 la política de scripts de compilación se declara con `allowBuilds` en `pnpm-workspace.yaml`; PNPM ya no lee el campo `pnpm` de `package.json`.
- AT-020: el sitio antiguo usa npm con `package-lock.json` y `engines.node` fijo en 24.16.0.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Estructura base de Astro (`src/`, `public/`, `astro.config.*`, `tsconfig.json`).
- `package.json` nuevo con `packageManager` (pnpm con versión exacta), `engines` (node 24.x y pnpm 12.x) y script de bloqueo de otros gestores en la instalación.
- `pnpm-workspace.yaml` con `allowBuilds` explícito solo para dependencias que lo requieran (por ejemplo esbuild o sharp, a confirmar en la instalación) y `strictDepBuilds` vigente.
- `.npmrc` con `engine-strict` si aplica a la versión de PNPM, sin configuraciones no relacionadas con autenticación o registro.
- Archivo de versión de Node para el IDE y herramientas (`.nvmrc` o `.node-version`).
- `pnpm-lock.yaml` versionado; `package-lock.json` eliminado de la rama.
- `.gitignore` nuevo para Astro, PNPM y WebStorm.

## Fuera de alcance
- Tailwind (E10-I03).
- Linters (E10-I04).
- Contenido de páginas.

## Tareas
- [ ] Crear el proyecto con `pnpm create astro@latest` usando la plantilla mínima y sin instalar integraciones no aprobadas.
- [ ] Fijar la salida estática en la configuración de Astro.
- [ ] Definir `packageManager`, `engines` y el script `preinstall` de bloqueo (mecanismo a elegir y registrar en ADR-003, sin dependencias nuevas sin ADR).
- [ ] Crear `pnpm-workspace.yaml` y aprobar builds solo tras revisar cada paquete con `pnpm approve-builds`.
- [ ] Probar que `npm install`, `yarn` y `bun install` fallan con mensaje claro.
- [ ] Registrar en `decisiones.md` cualquier dependencia agregada.

## Archivos previstos (crear / modificar)
- Crear: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc` o `.node-version`, `src/pages/` mínimo, `public/`.
- Reemplazar: `.gitignore`.
- Eliminar de la rama: `package-lock.json` (el original sigue en `main`).

## Criterios de aceptación (verificables)
- [ ] `pnpm install` desde un clon limpio termina sin errores y sin builds no revisados.
- [ ] `npm install`, `yarn install` y `bun install` terminan con error y mensaje que indica usar PNPM.
- [ ] `pnpm build` genera `dist/` estático.
- [ ] `package.json` declara `packageManager` y `engines` coherentes con ADR-002 y ADR-003.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm install --frozen-lockfile`
- `pnpm build`
- `npm install` (debe fallar)
- `node -v` coincide con el archivo de versión

## Riesgos y notas
- La creación del proyecto puede sugerir integraciones o ejemplos: no aceptarlos.
- Si Node 26 ya es Active LTS al ejecutar esta iteración, detenerse y consultar (BL-02).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
