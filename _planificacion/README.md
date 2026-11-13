# Planificación · Migración de felipecuevas.dev a Astro

Este README describe **el trabajo de migración**. No es el `README.md` de la raíz del proyecto, que documenta el proyecto en sí.

> Si este archivo y `00_producto/registro-log.md` discrepan, **prevalece `registro-log.md`**.

## Estado actual
- **Rama de trabajo:** `migracion-astro` (confirmada en E10-I01). Parte desde `main`. Nunca se trabaja en `main`.
- **Épica actual:** E170 · Calidad transversal
- **Iteración actual:** E170-I03 · Cabeceras de seguridad (P1, M), **en curso desde el 13-11-2026** (orden de E170: I01, I05, I02, I03, I04, ADR-090): ADR-092 aceptado (CSP estricta con hashes, sin `Report-Only`, `style-src` con `unsafe-inline`); el contenido de `public/_headers` está en la bitácora `2026-11-13_E170-I03.md` y lo pega Felipe (ADR-033); `verify:seo` con control de hashes (966 sin `_headers`; 970 con el bloque); probado en Chromium con las 26 URL, Turnstile, Calendly y Giscus: 0 violaciones; `dist/` sin cambios (`6d6e25a0e8865015`); registra AT-119, AT-120 y AT-121; AT-023 y AT-024 siguen abiertos; faltan las pruebas de Felipe en la preview y E170-I04 no arranca hasta que lo pida. **E170-I02 terminada el 13-11-2026:** Lighthouse local (52 corridas, mínimo 99, LCP ≤ 1,69 s, CLS ≤ 0,0002, TBT 0) y PageSpeed Insights sobre la preview (mínimo 98, salvo una corrida aislada de `/en/` en escritorio con CLS 0,158 que no se repite, AT-117; LCP ≤ 1,35 s): ninguna página bajo la línea base de agosto, imagen OG de 100,7 KB (AT-032), `python_institute.png` sin migrar (AT-033), AT-013 y AT-015 resueltos en laboratorio; presupuesto de peso (imágenes ≤ 150 KB, fuentes ≤ 120 KB, OG ≤ 200 KB) en `verify:seo`, 966/966; `scripts/psi.mjs` suma `--category performance`; `dist/` sin cambios (`6d6e25a0e8865015`); registra AT-117 y AT-118; BL-01 sigue abierto, sin ADR. Antes, **E170-I05 terminada el 13-11-2026:** limpieza técnica sin cambios visibles. AT-079 (`CertificationsSection` sin respaldo por emisor y `badge: string` obligatorio), AT-080 (`IconButton` con `:where(.icon-button)`, 0,1,0), AT-081 (hitos con `profile` y periodo tomado de la tarjeta) y AT-089 (control del plan PF1822 contra la tarjeta) resueltos; `verify:seo` 958 → 962; `dist/` idéntico a la línea base salvo una hoja CSS renombrada y la referencia a ella en 29 `.html`; 330 comparaciones de estilos calculados de los botones de ícono sin diferencias; las pruebas de mutación de los dos controles fallan como debían; nueva línea base del `dist/`: 207 archivos, 30 `.html`, `6d6e25a0e8865015`; registra AT-116 (método de la huella, resuelto por documentación); sin ADR nuevos. Antes, **E170-I01 terminada el 12-11-2026:** `pa11y@10.0.0` con axe sobre el build local y después sobre la preview (versión de Cloudflare `d0539e7d`, commit `3bd3e13`): 56 corridas (22 URL en claro y oscuro, Educación con diálogo, Contacto con errores, Agradecimiento y 404) con **0 violaciones**; una sola violación real en toda la medición, el carril de testimonios (AT-112), corregida. Corregidos y confirmados en la preview: AT-060, AT-065, AT-082, AT-110, AT-112, AT-114 (enlace de Docente en `text`) y AT-115 (frase del pie en `text-muted`); AT-098 cerrado sin token de error; Josefin 300 con la opción A (nota de 5.3 reescrita con una medición corregida de todo el `body`); AT-086 sin problema; AT-056 se retira en E190-I03 (ADR-091); AT-111 y AT-113 aceptados; AT-110 a AT-115 registrados; ADR-090 y ADR-091 completos; recorrido manual de Felipe con teclado y NVDA sin incidencias. La línea base del `dist/` para E170-I05 está anotada en su archivo (E160 terminada el 11-11-2026 con E160-I01: 404 por idioma con la composición A «Confirmación centrada», ADR-088, sobre el componente compartido `CenteredMessage`; tres archivos `404.html` (raíz, /es/ y /en/) con `noindex, follow`, rutas absolutas y logotipo animado; el selector de idioma lleva a la 404 del otro idioma; `scripts/place-404.mjs` en el script `build` deja las de idioma con el nombre que busca Cloudflare, ADR-089; `verify:seo` 958/958; cierra AT-003 y AT-004; registra AT-106 a AT-108; pendiente de Felipe: probar en workers.dev, validar el inglés y aplicar el bloque de `DESIGN.md`. E155 terminada el 07-11-2026 con E155-I01: política de privacidad es/en con la composición A «Documento con índice», ADR-087; indexable y en el sitemap, versión y vigencia visibles desde la constante única (ahora `2026-11-07`), enlace como sexto del pie de todas las páginas y en el aviso de Giscus del Foro y de Recursos, `PENDING_ROUTES` vacía; texto solo con hechos del sitio, sin validar (BL-08); cierra AT-047 en lo técnico; registra AT-104 y AT-105; inglés por validar por Felipe y bloque de `DESIGN.md` en su bitácora. E150 terminada el 07-11-2026 con E150-I01: página de agradecimiento es/en con la composición B «Confirmación centrada», ADR-086; `noindex, follow`, ruta interna fuera del sitemap y redirección del formulario verificada; cierra AT-099 y AT-030 en su parte de agradecimiento; registra AT-103 para E180; inglés por validar por Felipe y bloque de `DESIGN.md` en su bitácora. E140 terminada otra vez el 06-11-2026 con E140-I03, reabierta ese día por la 404 del Worker (ADR-056): fuera de `/api/*` el Worker devuelve los assets con el binding `ASSETS`, ADR-085; cierra AT-100, AT-101 y AT-102; falta que Felipe aplique el bloque de `wrangler.jsonc` de su bitácora. Antes, E140 terminada el 06-11-2026 con E140-I02: Worker propio solo para `/api/*` en `src/worker/`, POST `/api/contacto` con validación en el servidor, consentimiento y versión de la política, Turnstile verificado y correo con la evidencia; ADR-084; cierra AT-029; AT-099 aceptado hasta E150 y AT-100; falta que Felipe aplique el bloque de `wrangler.jsonc`, cargue los secretos y pruebe el envío en la preview. E140-I01 terminada el 03-11-2026: página de contacto es/en con la composición A, 4 canales, formulario con checkbox de privacidad, Turnstile al primer foco y Calendly al hacer clic; constante `PRIVACY_POLICY_VERSION`; ADR-083; AT-098 y AT-099; inglés por validar por Felipe. E130 terminada el 03-11-2026 con E130-I02: temáticas Empleabilidad, Python y Java en grilla por grupo, ADR-081; 5 archivos de main con peso visible y aviso «In Spanish» en /en/; JSON-LD Course solo para la ruta, ADR-082; cierra AT-034 y la parte de recursos de AT-043; AT-096 y AT-097; inglés por validar por Felipe. E130-I01 terminada el 03-11-2026: bóveda mixta con la ruta Web & IA y progreso, ADR-079 y ADR-080; cierra AT-028 y AT-037; inglés por validar por Felipe. E120 terminada el 02-11-2026 con E120-I01: Página del foro con Giscus bilingüe, ADR-078; cierra AT-027, registra AT-094; inglés del foro por validar por Felipe. E110 terminada el 02-11-2026 con E110-I01: Retiro de Eventos, ADR-077; Eventos sale del sitio y `/eventos` da 404. E100 terminada el 02-11-2026 con E100-I02: Logros de Talento Digital, ADR-076; antes E100-I01, ADR-074 y ADR-075; inglés de Talento Digital por validar por Felipe).
- **Orden de ejecución de épicas:** numérico, E10 → E20 → … → E140 → E150 → E155 → E160 → E170 → E180 → E190 (detalle en `registro-log.md`).
- **Terminadas:** 55 de 64 (E10-I01, E10-I02, E10-I03, E10-I04, E10-I05, E10-I06, E10-I07, E10-I08, E10-I09, E20-I01, E20-I02, E20-I03, E20-I04, E20-I05, E20-I06, E20-I07, E30-I01, E30-I02, E30-I03, E30-I04, E30-I05, E30-I06, E30-I07, E30-I08, E40-I01, E40-I02, E40-I03, E40-I04, E50-I01, E50-I02, E50-I03, E60-I01, E60-I02, E70-I01, E70-I02, E70-I03, E70-I04, E80-I01, E90-I01, E90-I02, E100-I01, E100-I02, E110-I01, E120-I01, E130-I01, E130-I02, E140-I01, E140-I02, E140-I03, E150-I01, E155-I01, E160-I01, E170-I01, E170-I05, E170-I02). Épicas E10, E20, E30, E40, E50, E60, E70, E80, E90, E100, E110, E120, E130, E140, E150, E155 y E160 terminadas.

## Iteraciones terminadas y pendientes
**E10 · Fundaciones técnicas** (`10_epica-fundaciones/`)
- [x] E10-I01 · Preparación de la rama de migración (P0, S)
- [x] E10-I02 · Proyecto Astro desde cero con PNPM estricto (P0, M)
- [x] E10-I03 · Tailwind CSS v4 con @tailwindcss/vite y prueba de compatibilidad (P0, S)
- [x] E10-I04 · Calidad de código: astro check, ESLint y Prettier (P0, S)
- [x] E10-I05 · Configuración de WebStorm (P1, S)
- [x] E10-I06 · Entorno agéntico: AGENTS.md en Claude Code y Antigravity (P0, S)
- [x] E10-I07 · i18n base: enrutamiento /es/ y /en/ (P0, M)
- [x] E10-I08 · README.md de la raíz, versión 1 (P1, S)
- [x] E10-I09 · Despliegue en Cloudflare: decisión D-14 y previews de la sub-rama (P0, M)

**E20 · Sistema de diseño** (`20_epica-sistema-diseno/`)
- [x] E20-I01 · Definición del DESIGN.md v1 (P0, M)
- [x] E20-I02 · Tokens en @theme y tema claro/oscuro (P0, M)
- [x] E20-I03 · Tipografía autoalojada e iconografía SVG (P0, M)
- [x] E20-I04 · Sistema de movimiento sin AOS (P0, M)
- [x] E20-I05 · Primitivas de componentes (P0, M)
- [x] E20-I06 · Íconos Material Symbols Light (P1, M)
- [x] E20-I07 · Estrellas rellenas en testimonios (P1, S)

**E30 · Layout global** (`30_epica-layout-global/`)
- [x] E30-I01 · BaseLayout, head/SEO y tema sin parpadeo (P0, M)
- [x] E30-I02 · Diccionario de interfaz, rutas equivalentes y contenido bilingüe (P0, M)
- [x] E30-I03 · Logotipo: ícono SVG y máquina de escribir con paridad exacta (P0, M)
- [x] E30-I04 · Navbar de escritorio rediseñada (P0, M)
- [x] E30-I05 · Navbar móvil (P0, M)
- [x] E30-I06 · Pie de página rediseñado y volver arriba (P0, S)
- [x] E30-I07 · Ajustes de navbar y pie tras la revisión en la preview (P0, M)
- [x] E30-I08 · Botón de menú móvil oculto desde 1.280 px (P1, S)

**E40 · Página Inicio (index.html)** (`40_epica-inicio/`)
- [x] E40-I01 · Hero rediseñado sin scroll en escritorio (P0, M)
- [x] E40-I02 · Franja de trayectoria y testimonios (P1, M)
- [x] E40-I03 · SEO y datos estructurados de la portada (P1, S)
- [x] E40-I04 · Hero simplificado y separadores de la banda (P0, M)

**E50 · Página Educación (educacion.html)** (`50_epica-educacion/`)
- [x] E50-I01 · Formación académica y diplomados (P1, M)
- [x] E50-I02 · Gabinete de certificaciones y JSON-LD (P1, M)
- [x] E50-I03 · Ajustes de certificaciones tras la revisión en la preview (P1, S)

**E60 · Página Experiencia (experiencia.html)** (`60_epica-experiencia/`)
- [x] E60-I01 · Página de resumen de experiencia (P1, M)
- [x] E60-I02 · Ajustes de Experiencia tras la revisión en la preview (P1, S)

**E70 · Página Desarrollador (desarrollador.html)** (`70_epica-desarrollador/`)
- [x] E70-I01 · Aspectos técnicos y muro de tecnologías (P1, M)
- [x] E70-I02 · Portafolio filtrable y JSON-LD (P1, M)
- [x] E70-I03 · Ajustes de Desarrollador tras la revisión en la preview (P1, S)
- [x] E70-I04 · Ajuste del JSON-LD del portafolio (P1, S)

**E80 · Página Docente (docente.html)** (`80_epica-docente/`)
- [x] E80-I01 · Página de docencia universitaria (P1, M)

**E90 · Página Instructor (instructor.html)** (`90_epica-instructor/`)
- [x] E90-I01 · Trayectoria como instructor REUF (P1, M)
- [x] E90-I02 · Trayectoria como relator (capa de datos) (P2, S)

**E100 · Página Talento Digital (talento-digital.html)** (`100_epica-talento-digital/`)
- [x] E100-I01 · Talento Digital, primera mitad de secciones (P1, M)
- [x] E100-I02 · Talento Digital, segunda mitad de secciones (P1, M)

**E110 · Retiro de Eventos** (`110_epica-eventos/`, ADR-077)
- [x] E110-I01 · Retiro de Eventos (P1, S)

**E120 · Página Foro (foro.html)** (`120_epica-foro/`)
- [x] E120-I01 · Página del foro con Giscus bilingüe (P1, M)

**E130 · Página Recursos (recursos.html)** (`130_epica-recursos/`)
- [x] E130-I01 · Bóveda mixta: página, modelo y ruta Web & IA (P1, M)
- [x] E130-I02 · Bóveda mixta: temáticas, descargables y JSON-LD (P1, M)

**E140 · Página Contacto (contacto.html)** (`140_epica-contacto/`)
- [x] E140-I01 · Página, formulario, Turnstile y Calendly (P1, M)
- [x] E140-I02 · Función de envío del formulario (P1, M)
- [x] E140-I03 · Corrección: el Worker no atiende los 404 del sitio (P1, S)

**E150 · Página Agradecimiento (agradecimiento.html)** (`150_epica-agradecimiento/`)
- [x] E150-I01 · Página de agradecimiento (P2, S)

**E155 · Página Política de privacidad** (`155_epica-privacidad/`)
- [x] E155-I01 · Página de política de privacidad (P0, S)

**E160 · Página 404 (404.html)** (`160_epica-404/`)
- [x] E160-I01 · Página 404 por idioma (P1, S)

**E170 · Calidad transversal** (`170_epica-calidad-transversal/`, orden de ejecución I01, I05, I02, I03, I04, ADR-090)
- [x] E170-I01 · Revisión de accesibilidad global (P1, M)
- [x] E170-I05 · Limpieza técnica (P1, S)
- [x] E170-I02 · Rendimiento y Core Web Vitals (P1, M)
- [~] E170-I03 · Cabeceras de seguridad (P1, M)
- [ ] E170-I04 · Enlaces rotos y paridad es/en automatizada (P1, S)

**E180 · Migración de URLs y SEO** (`180_epica-migracion-urls/`)
- [ ] E180-I01 · Mapa de URLs y redirecciones 301 (P0, S)
- [ ] E180-I02 · Sitemap bilingüe, robots.txt y canónicas (P0, S)
- [ ] E180-I03 · Comportamiento de / y x-default (P0, S)

**E190 · Despliegue y cutover** (`190_epica-cutover/`)
- [ ] E190-I01 · Checklist de precondiciones y ensayo en preview (P0, S)
- [ ] E190-I02 · Plan de cambio de despliegue y plan de reversa (P0, M)
- [ ] E190-I03 · README final y retiro de archivos del sitio antiguo (P0, S)
- [ ] E190-I04 · Verificación posterior al cutover (P0, S)

## Organización de carpetas
`AGENTS.md` y `DESIGN.md` viven en la **raíz del proyecto**, fuera de `_planificacion/`.

```
<raíz del proyecto>/
├── AGENTS.md            ← instrucciones para agentes (obligatorio)
├── DESIGN.md            ← única fuente de verdad del diseño
├── README.md            ← documentación del proyecto (versión 1 en E10-I08; final en E190-I03)
└── _planificacion/
    ├── README.md        ← este archivo
    ├── 00_producto/
    │   ├── registro-log.md      ← fuente única de verdad de lo que falta
    │   ├── auditoria-tecnica.md ← hallazgos AT-### (solo agregar)
    │   ├── decisiones.md        ← ADR y propuestas pendientes
    │   └── vision-producto.md
│   ├── 10_epica-fundaciones/
│   ├── 20_epica-sistema-diseno/
│   ├── 30_epica-layout-global/
│   ├── 40_epica-inicio/
│   ├── 50_epica-educacion/
│   ├── 60_epica-experiencia/
│   ├── 70_epica-desarrollador/
│   ├── 80_epica-docente/
│   ├── 90_epica-instructor/
│   ├── 100_epica-talento-digital/
│   ├── 110_epica-eventos/
│   ├── 120_epica-foro/
│   ├── 130_epica-recursos/
│   ├── 140_epica-contacto/
│   ├── 150_epica-agradecimiento/
│   ├── 155_epica-privacidad/
│   ├── 160_epica-404/
│   ├── 170_epica-calidad-transversal/
│   ├── 180_epica-migracion-urls/
│   ├── 190_epica-cutover/
    └── 99_bitacora/     ← AAAA-MM-DD_E10-I01.md
```

Cada carpeta de épica contiene `epica.md` y un archivo por iteración (`E10-I01-<slug>.md`). Los IDs son estables y nunca se renumeran.

## Forma de trabajo
1. **Revisión de los archivos markdown antes de comenzar cada iteración:** `AGENTS.md`, `DESIGN.md`, este README, `decisiones.md`, `registro-log.md`, el `epica.md` correspondiente y el archivo de la iteración.
2. **El agente de IA (Claude Code y/o Antigravity) implementa la iteración mediante código**, solo dentro del alcance de la iteración.
3. **Actualización de los markdown** para dejar registrado el avance (estado de la iteración, este README, `registro-log.md`, auditoría y decisiones si corresponde).
4. **Sugerencia de mensaje de commit** (máximo 200 caracteres) para que Felipe Cuevas haga el commit.
5. **El agente escribe una bitácora** en `99_bitacora/AAAA-MM-DD_<ID>.md` usando la plantilla, para cerrar el trabajo.

### Mini prompt de arranque de iteración
```
Lee AGENTS.md y ejecuta la iteración E10-I01.
```
Para las siguientes, cambia el ID por el de la iteración actual indicada arriba.

### Antes del primer prompt (lo hace Felipe)
1. Crear la rama desde `main` con el nombre acordado, o autorizar explícitamente al agente para crearla.
2. Copiar el contenido del paquete de planificación en la raíz de la rama (`AGENTS.md`, `DESIGN.md` y `_planificacion/`), reemplazando los `AGENTS.md` y `DESIGN.md` antiguos.
3. Confirmar que no existe `CLAUDE.md` ni `GEMINI.md` en el proyecto ni en carpetas superiores.

## Definition of Done global (toda iteración la hereda)
- `pnpm build` y `astro check` (`pnpm check`) sin errores. Excepción: E10-I01 no tiene proyecto aún, y `pnpm check` existe desde E10-I04.
- HTML semántico.
- Accesibilidad revisada (teclado, foco, contraste, landmarks, textos alternativos).
- Paridad `es-CL` / `en-US`: ninguna página queda en un solo idioma.
- Core Web Vitals sin empeorar respecto de los umbrales de ADR-015.
- Sin dependencias nuevas sin ADR.
- Trabajo realizado solo en la rama de migración.
- Mensaje de commit sugerido de 200 caracteres o menos.
- Bitácora escrita.
- Documentos actualizados.
