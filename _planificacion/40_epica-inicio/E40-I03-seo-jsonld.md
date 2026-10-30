# E40-I03 · SEO y datos estructurados de la portada
- **Estado:** [x] Terminada (30-10-2026)
- **Épica:** E40 · Página Inicio (index.html) · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E40-I02 · **Hallazgos que cierra:** AT-006 · **ADR relacionados:** ADR-001, ADR-017, ADR-019, ADR-047, ADR-053, ADR-055

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Publicar los datos estructurados Person y WebSite en ambos idiomas y validar metadatos de la portada.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- JSON-LD actual en `index.html` (Person con 9 credenciales y WebSite con `inLanguage` `es-CL`).
- `knowsLanguage`: Felipe decidió el 30-10-2026 que declare `es-CL` y `en-US`, y que no lleve `alternateName` (el nombre es «Felipe Cuevas»).
- `hasCredential` se genera desde `src/data/certifications.ts` (11 hoy), nunca a mano, y coincide con la cifra del hero (ADR-053). `sameAs` y el correo salen de `social-links.ts`.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- JSON-LD por idioma con `@id` estables compartidos.
- Metadatos OG por idioma.

## Fuera de alcance
- Sitemap bilingüe, `robots.txt` y la 301 de `/` (E180-I02 y E180-I03).
- Imágenes Open Graph de marca por idioma (E170-I02, AT-069).

## Tareas
- [x] Portar y traducir el JSON-LD (Person y WebSite, `src/components/seo/` y `src/content/seo/person.json`).
- [x] Metadatos Open Graph por idioma con imagen y texto alternativo; `canonical`, `hreflang` y `x-default` verificados.
- [x] Validar sintaxis y estructura sobre `dist/` sin red (`pnpm verify:seo`, 90 comprobaciones).
- [ ] Validar con la Prueba de resultados enriquecidos y el validador de schema.org: **lo corre Felipe** con las URL de preview (ver la bitácora).

## Archivos previstos (crear / modificar)
- Modificar: páginas de inicio (`src/pages/es/index.astro` y `src/pages/en/index.astro`).
- Crear: `src/components/seo/{structured-data.ts,JsonLd.astro,HomeJsonLd.astro}`, `src/content/seo/person.json`, `src/assets/og/og-home.jpg`, `scripts/verify-seo.mjs`.
- Modificar: `src/content.config.ts`, `src/content/pages/home.json`, `package.json` (script `verify:seo`).

## Criterios de aceptación (verificables)
- [x] JSON-LD válido en ambos idiomas y coherente con la cifra validada en E40-I01 (11 credenciales ↔ `+10`; `pnpm verify:seo`).
- [ ] Prueba de resultados enriquecidos y validador de schema.org sin errores con las URL de preview (Felipe).
- [x] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD): ok
- `pnpm check` y `pnpm lint` sin errores (DoD): ok
- `pnpm verify:seo` sobre `dist/`: 90 de 90.
- Validador de schema.org sobre `dist/`: lo hace Felipe en la preview (no hay red en el entorno del agente).

## Riesgos y notas
- La Prueba de resultados enriquecidos de Google solo lista los tipos con resultado enriquecido propio; Person y WebSite pueden aparecer sin elementos detectados sin que sea un error. El validador de schema.org (validator.schema.org) sí revisa cualquier tipo.
- El inglés de esta iteración está por validar por Felipe (ADR-017): la épica E40 queda en curso hasta entonces.

## Cierre obligatorio
- [x] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [x] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md (AT-069 a AT-071; ADR-055)
- [x] Escribir la bitácora en 99_bitacora/
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
