# E40-I03 · SEO y datos estructurados de la portada
- **Estado:** [ ] Pendiente
- **Épica:** E40 · Página Inicio (index.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E40-I02 · **Hallazgos que cierra:** AT-006 · **ADR relacionados:** ADR-001

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Publicar los datos estructurados Person y WebSite en ambos idiomas y validar metadatos de la portada.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- JSON-LD actual en `index.html` (Person con 9 credenciales y WebSite con `inLanguage` `es-CL`).
- `knowsLanguage` declara solo español: validar con Felipe si se agrega inglés (por validar).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- JSON-LD por idioma con `@id` estables compartidos.
- Metadatos OG por idioma.

## Fuera de alcance
- —

## Tareas
- [ ] Portar y traducir el JSON-LD.
- [ ] Validar con la prueba de resultados enriquecidos.

## Archivos previstos (crear / modificar)
- Modificar: páginas de inicio.

## Criterios de aceptación (verificables)
- [ ] JSON-LD válido en ambos idiomas y coherente con la cifra validada en E40-I01.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Validador de schema.org sobre `dist/`.

## Riesgos y notas
- —

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
