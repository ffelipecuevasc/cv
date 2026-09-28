# E10-I09 · Despliegue en Cloudflare: decisión D-14 y previews de la sub-rama
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E10-I07 · **Hallazgos que cierra:** AT-029, AT-042 · **ADR relacionados:** Propuesta D-14 → ADR nuevo

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Cerrar la decisión entre Cloudflare Pages y Workers con assets estáticos, y dejar una URL de preview de la rama de migración que no altere el despliegue de producción.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Documentación oficial (actualizada el 22-09-2026): Workers con assets estáticos soporta `_headers` y `_redirects` de forma nativa; una carpeta `functions/` de Pages debe compilarse en un único script de Worker o reescribirse; los alias de rama personalizados en Workers figuran como próximamente.
- Propuesta D-14: Worker nuevo con assets estáticos, conectado solo a la rama de migración; producción sigue en el proyecto Pages actual hasta el cutover.
- AT-042: la configuración de compilación de Pages es por proyecto (a verificar); usar el mismo proyecto para la rama podría afectar producción.
- AT-029: la función de contacto usa `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY` y `CONTACTO_DESTINO`; los secretos no se traspasan automáticamente.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Comparación final Pages vs Workers con evidencia vigente a la fecha de ejecución.
- ADR que acepte la decisión y reemplace la propuesta D-14.
- Configuración de despliegue de la rama (archivo de configuración de Wrangler si se elige Workers) y documentación de la configuración manual en el panel de Cloudflare.
- Manejo de 404 explícito (`not_found_handling`) si se elige Workers.

## Fuera de alcance
- Cambiar el dominio de producción (E190-I02).
- Migrar la función de contacto (E140-I02).

## Tareas
- [ ] Verificar en la documentación oficial el estado de Pages, Workers, previews y alias de rama.
- [ ] Presentar a Felipe la comparación y detenerse hasta que decida.
- [ ] Registrar el ADR aceptado y mover D-14 a estado Sustituida.
- [ ] Documentar los pasos manuales (Felipe los ejecuta en el panel).
- [ ] Obtener y registrar la URL de preview de la rama.

## Archivos previstos (crear / modificar)
- Crear (si Workers): configuración de Wrangler en la raíz.
- Modificar: `_planificacion/00_producto/decisiones.md`.

## Criterios de aceptación (verificables)
- [ ] Existe un ADR aceptado que resuelve D-14.
- [ ] La rama de migración tiene una URL de preview funcional con `/es/` y `/en/`.
- [ ] El despliegue de producción de `main` no cambió (verificado por Felipe).
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Visita a la URL de preview.
- Confirmación de Felipe de que producción sigue igual.

## Riesgos y notas
- No tocar la configuración de despliegue sin consultar (regla de AGENTS.md).
- Si se elige Workers, el dominio debe tener sus nameservers en Cloudflare (no verificado).

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
