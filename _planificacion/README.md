# Planificación · Migración de felipecuevas.dev a Astro

Este README describe **el trabajo de migración**. No es el `README.md` de la raíz del proyecto, que documenta el proyecto en sí.

> Si este archivo y `00_producto/registro-log.md` discrepan, **prevalece `registro-log.md`**.

## Estado actual
- **Rama de trabajo:** `migracion-astro` (nombre propuesto en ADR-014; se confirma en E10-I01). Parte desde `main`. Nunca se trabaja en `main`.
- **Épica actual:** E10 · Fundaciones técnicas
- **Iteración actual:** E10-I01 · Preparación de la rama de migración
- **Terminadas:** ninguna (0 de 52)

## Iteraciones terminadas y pendientes
**E10 · Fundaciones técnicas** (`10_epica-fundaciones/`)
- [ ] E10-I01 · Preparación de la rama de migración (P0, S)
- [ ] E10-I02 · Proyecto Astro desde cero con PNPM estricto (P0, M)
- [ ] E10-I03 · Tailwind CSS v4 con @tailwindcss/vite y prueba de compatibilidad (P0, S)
- [ ] E10-I04 · Calidad de código: astro check, ESLint y Prettier (P0, S)
- [ ] E10-I05 · Configuración de WebStorm (P1, S)
- [ ] E10-I06 · Entorno agéntico: AGENTS.md en Claude Code y Antigravity (P0, S)
- [ ] E10-I07 · i18n base: enrutamiento /es/ y /en/ (P0, M)
- [ ] E10-I08 · README.md de la raíz, versión 1 (P1, S)
- [ ] E10-I09 · Despliegue en Cloudflare: decisión D-14 y previews de la sub-rama (P0, M)

**E20 · Sistema de diseño** (`20_epica-sistema-diseno/`)
- [ ] E20-I01 · Definición del DESIGN.md v1 (P0, M)
- [ ] E20-I02 · Tokens en @theme y tema claro/oscuro (P0, M)
- [ ] E20-I03 · Tipografía autoalojada e iconografía SVG (P0, M)
- [ ] E20-I04 · Sistema de movimiento sin AOS (P0, M)
- [ ] E20-I05 · Primitivas de componentes (P0, M)

**E30 · Layout global** (`30_epica-layout-global/`)
- [ ] E30-I01 · BaseLayout, head/SEO y tema sin parpadeo (P0, M)
- [ ] E30-I02 · Diccionario de interfaz, rutas equivalentes y contenido bilingüe (P0, M)
- [ ] E30-I03 · Logotipo: ícono SVG y máquina de escribir con paridad exacta (P0, M)
- [ ] E30-I04 · Navbar de escritorio rediseñada (P0, M)
- [ ] E30-I05 · Navbar móvil (P0, M)
- [ ] E30-I06 · Pie de página rediseñado y volver arriba (P0, S)

**E40 · Página Inicio (index.html)** (`40_epica-inicio/`)
- [ ] E40-I01 · Hero rediseñado sin scroll en escritorio (P0, M)
- [ ] E40-I02 · Franja de trayectoria y testimonios (P1, M)
- [ ] E40-I03 · SEO y datos estructurados de la portada (P1, S)

**E50 · Página Educación (educacion.html)** (`50_epica-educacion/`)
- [ ] E50-I01 · Formación académica y diplomados (P1, M)
- [ ] E50-I02 · Gabinete de certificaciones y JSON-LD (P1, M)

**E60 · Página Experiencia (experiencia.html)** (`60_epica-experiencia/`)
- [ ] E60-I01 · Página de resumen de experiencia (P1, M)

**E70 · Página Desarrollador (desarrollador.html)** (`70_epica-desarrollador/`)
- [ ] E70-I01 · Aspectos técnicos y muro de tecnologías (P1, M)
- [ ] E70-I02 · Portafolio filtrable y JSON-LD (P1, M)

**E80 · Página Docente (docente.html)** (`80_epica-docente/`)
- [ ] E80-I01 · Página de docencia universitaria (P1, M)

**E90 · Página Instructor (instructor.html)** (`90_epica-instructor/`)
- [ ] E90-I01 · Trayectoria como instructor REUF (P1, M)
- [ ] E90-I02 · Trayectoria como relator (capa de datos) (P2, S)

**E100 · Página Talento Digital (talento-digital.html)** (`100_epica-talento-digital/`)
- [ ] E100-I01 · Talento Digital, primera mitad de secciones (P1, M)
- [ ] E100-I02 · Talento Digital, segunda mitad de secciones (P1, M)

**E110 · Página Eventos (eventos.html)** (`110_epica-eventos/`)
- [ ] E110-I01 · Página de eventos con estado por fecha (P1, M)

**E120 · Página Foro (foro.html)** (`120_epica-foro/`)
- [ ] E120-I01 · Página del foro con Giscus bilingüe (P1, M)

**E130 · Página Recursos (recursos.html)** (`130_epica-recursos/`)
- [ ] E130-I01 · Rutas de aprendizaje con progreso (P1, M)
- [ ] E130-I02 · Bóveda de recursos y JSON-LD Course (P1, M)

**E140 · Página Contacto (contacto.html)** (`140_epica-contacto/`)
- [ ] E140-I01 · Página, formulario, Turnstile y Calendly (P1, M)
- [ ] E140-I02 · Función de envío del formulario (P1, M)

**E150 · Página Agradecimiento (agradecimiento.html)** (`150_epica-agradecimiento/`)
- [ ] E150-I01 · Página de agradecimiento (P2, S)

**E160 · Página 404 (404.html)** (`160_epica-404/`)
- [ ] E160-I01 · Página 404 por idioma (P1, S)

**E170 · Calidad transversal** (`170_epica-calidad-transversal/`)
- [ ] E170-I01 · Revisión de accesibilidad global (P1, M)
- [ ] E170-I02 · Rendimiento y Core Web Vitals (P1, M)
- [ ] E170-I03 · Cabeceras de seguridad (P1, M)
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
├── README.md            ← documentación del proyecto (se reescribe en E10-I08)
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
