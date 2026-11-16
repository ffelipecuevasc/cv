# E155-I01 · Página de política de privacidad
- **Estado:** [x] Terminada
- **Épica:** E155 · Página Política de privacidad · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E30-I06, E10-I09, E140-I02 · **Hallazgos que cierra:** AT-047 en lo técnico (en conjunto con E140-I01 y E140-I02) · **ADR relacionados:** ADR-007, ADR-017, ADR-020, ADR-023, ADR-035, ADR-036, ADR-083, ADR-086, ADR-087

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Construir la página de política de privacidad en ambos idiomas, con un texto breve que cubra todos los tratamientos del sitio que muestre la versión definida en E140-I02, y agregar su enlace en el pie de todas las páginas.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- AT-047: el sitio actual no tiene política de privacidad y el formulario (`contacto.html:289-354`) no pide consentimiento.
- ADR-035: tratamientos que cubre la política: formulario de contacto, Turnstile, Calendly, Giscus (GitHub), progreso guardado en el navegador (E130, ADR-023) y preferencia de tema. La plataforma de despliegue sale de E10-I09 (P-01).
- ADR-036: la composición de la página se define y valida con Felipe al inicio de esta iteración.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Página bilingüe `/es/privacidad` y `/en/privacy` con un texto breve que cubra todos los tratamientos de ADR-035.
- Fecha de vigencia y versión de la política visibles en la página.
- Uso de la constante única de versión de la política definida en E140-I02 (no se redefine).
- Enlace a la política en el pie de todas las páginas, incluidas 404 y agradecimiento (tarea movida desde E30-I06). Va como **sexto enlace** de la columna de navegación del pie, al final de la lista de `src/components/layout/footer-links.ts` (ADR-057); ya no existe el contenedor reservado en la barra inferior. La navbar no cambia.
- Supuesto: la página es indexable y va en el sitemap. Pregunta abierta para Felipe: si lleva `noindex`; si se decide, sale del sitemap (E180-I02).

## Fuera de alcance
- La redacción legal definitiva: la valida un especialista externo antes del cutover (BL-08). El texto de esta iteración no se presenta como asesoría legal.

## Tareas
- [x] Definir y validar con Felipe el patrón de composición de la página y documentarlo en DESIGN.md (ADR-036). Felipe eligió la composición A «Documento con índice» el 07-11-2026 (ADR-087); el bloque de `DESIGN.md` está en la bitácora y lo aplica Felipe (ADR-033).
- [x] Preguntar a Felipe si la página lleva `noindex` y registrar la respuesta: indexable y en el sitemap (ADR-087).
- [x] Redactar el texto breve en `es-CL` y la versión `en-US` (Felipe valida, ADR-017). Borrador solo con hechos del sitio, sin cláusulas legales (ADR-087); pendiente del especialista (BL-08, AT-105).
- [x] Mostrar la versión (constante de E140-I02) y la fecha de vigencia en la página. La constante pasa a `2026-11-07` (ADR-087).
- [x] Agregar el enlace a la política como sexto enlace de `footer-links.ts` (etiqueta `t.footer.privacy` del diccionario, ruta del mapa de rutas), en todas las páginas, incluidas 404 y agradecimiento (ADR-035, ADR-057). La 404 llega en E160 y hereda el pie.
- [x] Construir la página en ambos idiomas.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/privacidad.astro`, `src/pages/en/privacy.astro`, `src/components/privacy/` (`PrivacyHeader`, `PrivacyDocument`, `privacy-data.ts`), `src/content/privacy/page.json` y `src/content/pages/privacy.json`.
- Modificar: `src/components/layout/footer-links.ts` (el pie ya lo lee), `src/content.config.ts` (colección `privacyPage`), `src/data/privacy-policy.ts` (versión), `src/components/forum/GiscusSection.astro` y `Conversation.astro` (enlace en el aviso), `scripts/verify-seo.mjs` (`PENDING_ROUTES` vacía y controles de la política).

## Criterios de aceptación (verificables)
- [x] Ambas versiones existen con paridad de contenido y cubren todos los tratamientos de ADR-035.
- [x] La fecha de vigencia y la versión son visibles en la página.
- [x] La versión mostrada proviene de la constante de E140-I02 y no está duplicada.
- [x] El pie de todas las páginas, incluidas 404 y agradecimiento, enlaza a la política del idioma activo, y la navbar no cambia.
- [x] La página no se presenta como asesoría legal.
- [x] Cumple la Definition of Done global de `_planificacion/README.md`. Inglés por validar por Felipe (ADR-017).

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Inspección de `dist/es/privacidad/` y `dist/en/privacy/`.
- Revisión de Felipe del texto en ambos idiomas.

## Riesgos y notas
- Texto legal sin validar hasta que lo revise el especialista (BL-08). El borrador no tiene plazos de conservación, base legal, domicilio ni derechos (AT-105); la Ley 21.719 rige desde el 01-12-2026.
- Si se agrega un servicio de terceros nuevo, actualizar la política y su versión.
- El pie lo comparte todo el sitio; la 404 (E160) hereda el enlace sin cambios.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
