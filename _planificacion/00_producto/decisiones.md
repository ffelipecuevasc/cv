# Decisiones de arquitectura (ADR)

Reglas del registro:
- Una decisión **no se revierte ni se edita**: se sustituye con un ADR nuevo, y la original pasa a estado "Sustituida por ADR-###".
- Se lee al inicio de cada iteración.
- Las decisiones D-01 a D-13 fueron cerradas por Felipe Cuevas en el prompt maestro. Las ADR-014 en adelante derivan de la auditoría y del punto de control del 28-09-2026.
- Al final hay una sección aparte de **propuestas pendientes**, que no son vinculantes hasta ser aceptadas.

---

## ADR-001 · Idiomas y rutas (D-01)
- **Contexto:** el sitio actual existe solo en español (`lang="es"`, `og:locale` `es_CL`) y no tiene `hreflang`.
- **Decisión:** sitio completo en español de Chile (`es-CL`) bajo `/es/` y en inglés de EE. UU. (`en-US`) bajo `/en/`. Un botón visible en la barra superior cambia todo el sitio de idioma y lleva a la página equivalente. Toda página existe en ambos idiomas.
- **Consecuencias:** ninguna iteración se cierra sin paridad; se requiere mapa de rutas equivalentes (ADR-020), `hreflang` y sitemap bilingüe.
- **Origen:** D-01, prompt maestro. **Estado:** Aceptada.

## ADR-002 · Framework y runtime (D-02)
- **Contexto:** Astro no publica versiones LTS; su documentación indica que da mantenimiento extendido solo con correcciones de seguridad a la mayor anterior. Node.js sí tiene LTS.
- **Decisión:** "Última LTS" de Astro se interpreta como **última versión mayor estable**: Astro 7.x (7.3.5 al 28-09-2026, verificado en docs.astro.build/en/upgrade-astro). Node.js: **Active LTS vigente, v24** (24.21.0 al 28-09-2026, verificado en nodejs.org). Astro 7.3.5 exige Node >= 22.12.
- **Consecuencias:** actualizaciones menores y parches de Astro se aceptan dentro de 7.x; un cambio de mayor requiere ADR nuevo. Node 26 pasará a LTS durante el proyecto: se reevalúa en BL-02.
- **Origen:** D-02. **Estado:** Aceptada.

## ADR-003 · Gestor de paquetes PNPM estricto (D-03)
- **Contexto:** el sitio actual usa npm con `package-lock.json` (AT-020). PNPM vigente al 28-09-2026: 12.6.0. Desde PNPM 11, los scripts de compilación de dependencias se controlan con `allowBuilds` en `pnpm-workspace.yaml`, las opciones antiguas (`onlyBuiltDependencies` y similares) fueron eliminadas y PNPM ya no lee el campo `pnpm` de `package.json`.
- **Decisión:** PNPM obligatorio. Prohibidos npm, yarn y bun. Mecanismos: campo `packageManager` con versión exacta, `engines` para node y pnpm, bloqueo de otros gestores en la instalación, `pnpm-lock.yaml` versionado, `allowBuilds` explícito y revisado con `pnpm approve-builds`, `strictDepBuilds` activo.
- **Consecuencias:** cualquier dependencia que ejecute scripts de instalación necesita aprobación explícita. El mecanismo exacto de bloqueo se registra en E10-I02.
- **Origen:** D-03. **Estado:** Aceptada.

## ADR-004 · Tailwind CSS v4 con @tailwindcss/vite (D-04)
- **Contexto:** el sitio actual usa Tailwind 3.4.19 con `tailwind.config.js` (AT-019). Verificado el 28-09-2026: `tailwindcss` y `@tailwindcss/vite` 4.3.3; el plugin declara compatibilidad con Vite 5 a 8, y Astro 7.3.5 usa Vite `^8.0.13`.
- **Decisión:** Tailwind CSS v4 compilado localmente con Node.js y PNPM mediante `@tailwindcss/vite`. La integración `@astrojs/tailwind` está obsoleta y no se usa. Tokens en `@theme`. Fuentes de escaneo restringidas a `src/`.
- **Consecuencias:** la compatibilidad se prueba en E10-I03 antes de dar la decisión por cumplida; si falla, se registra un ADR nuevo.
- **Origen:** D-04. **Estado:** Aceptada (verificación de compatibilidad pendiente en E10-I03).

## ADR-005 · HTML5 semántico (D-05)
- **Decisión:** HTML5 semántico en todo el sitio: landmarks correctos, un único `<main>` con todo el contenido principal, jerarquía de encabezados sin saltos, controles nativos.
- **Consecuencias:** corrige AT-012 (contenido fuera de `<main>` en la portada).
- **Origen:** D-05. **Estado:** Aceptada.

## ADR-006 · IDE WebStorm (D-06)
- **Decisión:** WebStorm de JetBrains. Configuración inicial planificada en E10-I05: plugin oficial de Astro (Marketplace) y Astro Language Server, intérprete de Node, PNPM como gestor, soporte de Tailwind, Prettier y ESLint para Astro, configuraciones de ejecución y política de versionado de `.idea/`.
- **Origen:** D-06. **Estado:** Aceptada.

## ADR-007 · Una épica por página (D-07)
- **Decisión:** cada archivo HTML del sitio actual es una épica independiente con al menos una iteración. Son 13: `index`, `educacion`, `experiencia`, `desarrollador`, `docente`, `instructor`, `talento-digital`, `eventos`, `foro`, `recursos`, `contacto`, `agradecimiento` y `404` (E40 a E160).
- **Origen:** D-07. **Estado:** Aceptada.

## ADR-008 · Barra de navegación y logotipo (D-08)
- **Decisión:** rediseño total del diseño y estilo de la barra, manteniendo exactamente las mismas opciones de menú (ver auditoría, área D). El logotipo (ícono SVG + texto con efecto máquina de escribir) se conserva idéntico en apariencia y comportamiento. La barra incluye el botón de apariencia (claro/oscuro) y el botón de idioma.
- **Consecuencias:** cualquier cambio del logotipo exige un ADR que sustituya a este. La especificación exacta está en `DESIGN.md`.
- **Origen:** D-08. **Estado:** Aceptada.

## ADR-009 · Hero de la portada (D-09)
- **Decisión:** rediseño libre, incluso completo, del hero para que en escritorio se vea entero al cargar, sin scroll, incluidas las 3 certificaciones (Oracle, AWS, Python Institute) y las redes sociales.
- **Consecuencias:** se mide con la matriz de ADR-016. No se elimina ningún elemento de la lista de conservación (E40-I01) sin ADR.
- **Origen:** D-09. **Estado:** Aceptada.

## ADR-010 · DESIGN.md como única fuente de verdad (D-10)
- **Decisión:** `DESIGN.md`, en la raíz del proyecto, es la única fuente de verdad del diseño. Es un archivo nuevo, distinto del antiguo. Nace como esqueleto y se completa en E20-I01, antes de la navbar y del hero.
- **Origen:** D-10. **Estado:** Aceptada.

## ADR-011 · AGENTS.md como instrucciones para agentes (D-11)
- **Decisión:** se usa `AGENTS.md` en la raíz del proyecto (no `CLAUDE.md`). Es un archivo nuevo, distinto del antiguo.
- **Consecuencias:** ver ADR-024.
- **Origen:** D-11. **Estado:** Aceptada.

## ADR-012 · Git: el agente no hace commit, push ni merge (D-12)
- **Decisión:** el agente de IA nunca hace commit, push ni merge; los hace siempre el desarrollador. Puede crear ramas nuevas solo tras consultar. Nunca trabaja sobre `main`.
- **Consecuencias:** `.claude/settings.json` debe denegar esos comandos (E10-I06). El `.claude/settings.json` antiguo los dejaba en "preguntar" (AT-021).
- **Origen:** D-12. **Estado:** Aceptada.

## ADR-013 · Estrategia de ramas (D-13)
- **Decisión:** el proyecto nuevo se construye completo en una sub-rama, sin trabajar en `main`, hasta que esté terminado. Después el desarrollador realiza la migración completa a la rama principal.
- **Origen:** D-13. **Estado:** Aceptada.

## ADR-014 · La rama de migración parte desde main
- **Contexto:** pregunta abierta 1 del punto de control.
- **Decisión:** la rama de migración se crea desde `main`. Nombre propuesto: `migracion-astro` (se confirma en E10-I01). Los archivos del sitio antiguo permanecen en la rama como referencia de solo lectura y se retiran en E190-I03. Los archivos antiguos que el proyecto nuevo reemplaza (`package.json`, `package-lock.json`, `tailwind.config.js`, `.gitignore`, `.claude/settings.json`, `README.md`, `AGENTS.md`, `DESIGN.md`) se sustituyen en la rama; sus versiones originales siguen disponibles con `git show main:<ruta>`.
- **Consecuencias:** el cutover es un merge normal. `git log main --not HEAD` permite detectar contenido publicado en producción durante la migración (E190-I01). Tailwind debe restringir su escaneo a `src/` (ADR-004).
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-015 · Umbrales de rendimiento y plan de CWV
- **Contexto:** el archivo del proyecto es el plan de refactorización de septiembre (etapas 0 a 6, cerradas). El plan de Core Web Vitals de agosto ya se completó y el sitio en producción vive con su resultado; Cloudflare aún no emite informes suficientes.
- **Decisión:** no hay trabajo de CWV pendiente que absorber. Umbrales para la Definition of Done: valores "buenos" de Google en percentil 75 (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1) y, en laboratorio, ninguna página con puntaje de rendimiento inferior a su línea base (`docs/linea-base/2026-08-12/resumen-lighthouse.md` del sitio actual). Los informes de Cloudflare se revisan a fines de octubre de 2026 (BL-01) y, si mejoran la línea base, se registra un ADR que la actualice.
- **Consecuencias:** resuelve AT-035.
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-016 · Matriz de viewports de referencia del hero
- **Decisión:** 1366×768, 1440×900, 1536×864 y 1920×1080, descontando 130 px por la barra de tareas y la interfaz del navegador. Áreas visibles a verificar: 1366×638, 1440×770, 1536×734 y 1920×950 px, en ambos temas y ambos idiomas.
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-017 · Estrategia de contenido en inglés
- **Decisión:** el agente redacta la versión `en-US` y Felipe la valida en cada iteración. Los testimonios se muestran traducidos con la indicación "traducido del español". Los PDFs (CV, certificado REUF y recursos) quedan en español con un aviso en `/en/` hasta que Felipe entregue versiones en inglés (BL-04).
- **Origen:** respuesta de Felipe en el punto de control, 28-09-2026. **Estado:** Aceptada.

## ADR-018 · Salida estática
- **Decisión:** Astro con salida 100 % estática, sin adaptador de renderizado en servidor. La única lógica de servidor es la función de contacto, que vive fuera de Astro según la plataforma que resuelva D-14.
- **Consecuencias:** estados dependientes de la fecha (eventos) se calculan en el cliente con estado base del build (AT-039).
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-019 · Comportamiento de la raíz y x-default
- **Decisión:** `/` responde 301 hacia `/es/`. `x-default` apunta a la versión `/es/` de cada página. No se detecta el idioma del navegador.
- **Consecuencias:** comportamiento cacheable y predecible. Se implementa en E180-I03.
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-020 · Slugs traducidos en inglés
- **Decisión:** las rutas en `/en/` usan slugs en inglés según el mapa de la auditoría (área L); por ejemplo `/en/education`, `/en/experience`, `/en/developer`, `/en/lecturer`, `/en/contact`. "Talento Digital" e "Instructor" se mantienen. El mapa se cierra en E30-I02 con validación de Felipe.
- **Consecuencias:** cambiar un slug después del cutover exige 301.
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-021 · Ubicación de apariencia y CV en la barra
- **Decisión:** el botón "Apariencia" pasa del pie a la barra (hoy en `index.html:898`). "Descargar CV" se conserva en la barra como parte de sus opciones.
- **Origen:** supuesto declarado en el punto de control, sin objeción; deriva de ADR-008. **Estado:** Aceptada.

## ADR-022 · Foro compartido entre idiomas
- **Decisión:** Giscus usa el mismo término `foro-general` en `/es/foro` y `/en/forum`; solo cambia el idioma de su interfaz.
- **Consecuencias:** una sola comunidad y ninguna conversación huérfana.
- **Origen:** supuesto declarado en el punto de control, sin objeción. **Estado:** Aceptada.

## ADR-023 · Claves de almacenamiento local independientes del idioma
- **Decisión:** se conservan las claves actuales de `localStorage`: `theme`, `perfil-hero` y `rutas-progreso`, con el mismo formato de valor, y son compartidas por ambos idiomas.
- **Consecuencias:** los visitantes actuales conservan su tema, su perfil del hero y su progreso en las rutas de aprendizaje.
- **Origen:** hallazgo AT-028. **Estado:** Aceptada.

## ADR-024 · Sin CLAUDE.md ni GEMINI.md
- **Contexto:** Claude Code 2.1.277 lee `AGENTS.md` solo cuando no hay `CLAUDE.md` en el directorio de trabajo ni en los superiores. En Antigravity, `GEMINI.md` tiene precedencia sobre `AGENTS.md`.
- **Decisión:** no se crea `CLAUDE.md` ni `GEMINI.md` en ninguna ruta del proyecto. La carga de `AGENTS.md` se verifica en E10-I06 con la línea de arranque o preguntando al agente por sus instrucciones, no con `/memory` (AT-036).
- **Origen:** verificación web del 28-09-2026; deriva de ADR-011. **Estado:** Aceptada.

---

## Propuestas pendientes (no vinculantes hasta ser aceptadas)

### P-01 · D-14: Cloudflare Pages o Workers con assets estáticos
- **Estado:** Pendiente. Se resuelve en E10-I09 con un ADR nuevo.
- **Evidencia al 28-09-2026:** la guía oficial de migración (actualizada el 22-09-2026) indica que:
  - Workers ofrece más funciones que Pages y que la inversión nueva de Cloudflare se concentra en Workers;
  - `_headers` y `_redirects` funcionan de forma nativa en ambos;
  - una carpeta `functions/` de Pages debe compilarse en un único script de Worker o reescribirse;
  - los alias de rama personalizados en Workers figuran como "próximamente".
- **Propuesta:** Worker nuevo con assets estáticos, conectado solo a la rama de migración.
  - Producción sigue en el proyecto Pages actual hasta el cutover.
  - El cutover mueve el dominio al Worker.
  - La reversa lo devuelve a Pages.

### P-02 · Convención de idioma para código y comentarios
- **Estado:** Pendiente.
- **Propuesta:** comentarios y documentación en español de Chile. Identificadores de código en inglés, por coherencia con Astro y el ecosistema, salvo nombres de dominio propios (por ejemplo `talento-digital`). Alternativa: mantener identificadores en español como en el sitio actual.

### P-03 · Logotipo como enlace al inicio
- **Estado:** Pendiente (AT-009).
- **Propuesta:** el logotipo pasa a ser un enlace a la portada del idioma activo, sin cambiar su apariencia ni su animación. Requiere aprobación porque ADR-008 exige comportamiento idéntico.

### P-04 · Reglas derivadas de AGENTS.md
- **Estado:** Pendiente de aprobación o veto de Felipe.
- **Contenido:** las reglas marcadas como "derivada" en `AGENTS.md`: no reescribir historial ni eliminar ramas; no usar npm, yarn ni bun; no agregar dependencias sin ADR; no tocar la configuración de despliegue sin consultar; no borrar entradas de la auditoría ni revertir ADR sin una entrada nueva que lo sustituya.
- **Vigencia:** hasta que Felipe las apruebe o vete, los agentes las aplican de forma conservadora.

### P-05 · Marca "fecudev"
- **Estado:** Pendiente (BL-05).
- **Contexto:** el término no aparece en el sitio actual.
- **Propuesta:** tratarlo como nombre de la comunidad (foro, eventos, recursos y Discord) en textos de contenido, sin cambiar la etiqueta "Comunidad" del menú (ADR-008).
