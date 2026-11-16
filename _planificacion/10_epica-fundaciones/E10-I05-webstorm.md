# E10-I05 · Configuración de WebStorm
- **Estado:** [x] Terminada
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E10-I04 · **Hallazgos que cierra:** AT-022 · **ADR relacionados:** ADR-006, ADR-031, ADR-032

> Estados posibles: [ ] Pendiente · [x] Terminada · [x] Terminada · [!] Bloqueada

## Objetivo
Dejar WebStorm listo para el proyecto: plugin de Astro, intérprete de Node, PNPM como gestor, soporte de Tailwind, Prettier y ESLint, configuraciones de ejecución y política de versionado de `.idea/`.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- WebStorm requiere instalar el plugin de Astro desde Marketplace y permite configurar el Astro Language Server en Languages & Frameworks > TypeScript > Astro.
- AT-022: `.gitignore` antiguo ignora `.idea/` pero `.idea/.gitignore` está versionado.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Guía paso a paso en el README de la raíz (sección IDE) o en `_planificacion/` según corresponda.
- Decisión (ADR) sobre qué parte de `.idea/` se versiona (propuesta: solo `runConfigurations/` y ajustes de código compartibles).
- Configuraciones de ejecución para `pnpm dev`, `pnpm build` y `pnpm check`.

## Fuera de alcance
- Ajustes personales del IDE.

## Tareas
- [x] Verificar la versión de WebStorm instalada y registrar la versión del plugin de Astro.
- [x] Configurar Node (archivo de versión), PNPM como gestor, ESLint y Prettier automáticos.
- [x] Crear configuraciones de ejecución compartidas.
- [x] Actualizar `.gitignore` según el ADR.

## Archivos previstos (crear / modificar)
- Crear: `.run/pnpm dev.run.xml`, `.run/pnpm build.run.xml`, `.run/pnpm check.run.xml` (ADR-031 reemplaza `.idea/runConfigurations/`), `.gitattributes` (ADR-032), `_planificacion/00_producto/guia-webstorm.md`.
- Modificar: `.gitignore`, `.prettierrc.json` (`endOfLine: "lf"`). Quitar del índice: `.idea/.gitignore`.

## Criterios de aceptación (verificables)
- [x] Abrir un `.astro` muestra resaltado, autocompletado y errores del language server.
- [x] Las configuraciones de ejecución funcionan en un clon limpio.
- [x] `.gitignore` y `.idea/` son coherentes con el ADR.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Revisión manual en WebStorm (Felipe).
- `git status` sin archivos de IDE no deseados.

## Riesgos y notas
- Algunos pasos son manuales en el IDE: el agente documenta y Felipe confirma.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)

## Resultado
- WebStorm 2026.2.3 y plugin de Astro 262.10968.63; pasos 1 a 11 de `guia-webstorm.md` confirmados por Felipe el 27-10-2026.
