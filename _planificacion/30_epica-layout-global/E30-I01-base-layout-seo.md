# E30-I01 · BaseLayout, head/SEO y tema sin parpadeo
- **Estado:** [ ] Pendiente
- **Épica:** E30 · Layout global · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E20-I02, E10-I07 · **Hallazgos que cierra:** AT-002, AT-006, AT-028, AT-032, AT-040 · **ADR relacionados:** ADR-001, ADR-005, ADR-019, ADR-023

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Crear el layout base con el `<head>` completo por idioma y el script mínimo de tema que se ejecuta antes del primer pintado.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- El `<head>` antiguo repite en cada página: metadatos, OG, Twitter, preconnect, preload, AOS y el script de tema (`index.html:1-275`).
- AT-006: `lang="es"`, `og:locale` `es_CL` y `inLanguage` `es-CL` fijos; no hay `hreflang`.
- ADR-023: la clave `theme` en `localStorage` se conserva.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Layout con `<html lang>` por idioma, skip link, `<main>` único.
- Componente SEO: `title`, `description`, `canonical`, `hreflang` (es-CL, en-US, x-default), Open Graph y Twitter por idioma, `og:locale` y `og:locale:alternate`, espacio para JSON-LD.
- Script de tema en línea, protegido ante almacenamiento bloqueado.

## Fuera de alcance
- Navbar y pie (E30-I04 a I06).

## Tareas
- [ ] Implementar el layout y el componente SEO.
- [ ] Implementar el script de tema.
- [ ] Crear una página de prueba bilingüe que use el layout.

## Archivos previstos (crear / modificar)
- Crear: `src/layouts/BaseLayout.astro`, `src/components/seo/*`.

## Criterios de aceptación (verificables)
- [ ] Cada página generada tiene `canonical` propio y `hreflang` recíprocos con `x-default` a `/es/`.
- [ ] Recargar en tema oscuro no muestra un destello claro.
- [ ] Con `localStorage` bloqueado la página carga sin errores.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- `pnpm build` e inspección de `dist/`.
- Recarga con red lenta simulada en ambos temas.

## Riesgos y notas
- El script en línea debe ser mínimo y compatible con la CSP de E170-I03.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
