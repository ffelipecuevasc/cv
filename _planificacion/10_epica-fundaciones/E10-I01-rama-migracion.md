# E10-I01 · Preparación de la rama de migración
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** — · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-012, ADR-013, ADR-014

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Confirmar que el trabajo ocurre en la rama de migración creada desde `main`, con los archivos de planificación en su lugar y el sitio antiguo tratado como referencia de solo lectura.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- ADR-014: la rama parte desde `main`; nombre propuesto `migracion-astro`.
- ADR-012: el agente puede crear ramas solo tras consultar; nunca hace commit, push ni merge.
- El sitio antiguo sigue presente en la rama hasta E190-I03 y siempre está disponible con `git show main:<ruta>`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Verificar rama actual y su origen.
- Confirmar con Felipe el nombre definitivo de la rama.
- Verificar que `AGENTS.md`, `DESIGN.md` y `_planificacion/` están en la raíz de la rama.
- Inventariar archivos de la raíz que el proyecto nuevo reemplazará y cuáles quedan como referencia.

## Fuera de alcance
- Crear el proyecto Astro (E10-I02).
- Borrar archivos del sitio antiguo (E190-I03).

## Tareas
- [ ] Ejecutar `git branch --show-current` y `git log --oneline -1` y registrar el resultado.
- [ ] Si la rama no existe o el nombre no coincide: detenerse, consultar a Felipe y crearla solo con su autorización explícita (`git switch -c migracion-astro main`).
- [ ] Confirmar que no existe `CLAUDE.md` ni `GEMINI.md` en la raíz ni en directorios superiores.
- [ ] Listar los archivos antiguos de la raíz y clasificarlos: reemplazados en E10 (`package.json`, `package-lock.json`, `tailwind.config.js`, `.gitignore`, `.claude/settings.json`, `README.md`) o referencia hasta el cutover (`*.html`, `static/`, `functions/`, `sitemap.xml`, `robots.txt`, `_redirects`, `linkinator.config.json`, `docs/`).
- [ ] Registrar la clasificación en la bitácora.

## Archivos previstos (crear / modificar)
- Ninguno de código. Solo actualización de `_planificacion/`.

## Criterios de aceptación (verificables)
- [ ] La rama activa no es `main` y su nombre quedó confirmado por Felipe.
- [ ] La rama deriva de `main` (`git merge-base --is-ancestor main HEAD` devuelve éxito).
- [ ] No existen `CLAUDE.md` ni `GEMINI.md` en el proyecto.
- [ ] La clasificación de archivos antiguos quedó escrita en la bitácora.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `git branch --show-current`
- `git merge-base --is-ancestor main HEAD && echo ok`
- Búsqueda de `CLAUDE.md` y `GEMINI.md` en el árbol.

## Riesgos y notas
- Si Felipe ya creó la rama con otro nombre, se actualiza ADR-014 con una entrada nueva, no se edita la original.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
