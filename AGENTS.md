# AGENTS.md · felipecuevas.dev (migración a Astro)

Instrucciones obligatorias para cualquier agente de IA que trabaje en este proyecto, en particular Claude Code y Antigravity. Idioma de trabajo: **español de Chile** (tuteo, sin voseo), tanto en las respuestas como en los archivos que generes.

## 1. Lectura obligatoria antes de empezar CUALQUIER trabajo

Antes de escribir código, ejecutar comandos o responder sobre el proyecto, **lee completos** estos dos archivos:

1. **`DESIGN.md`** (raíz del proyecto): única fuente de verdad del diseño.
2. **`_planificacion/README.md`**: estado del trabajo, forma de trabajo y Definition of Done.

> El `README.md` obligatorio es el de **`_planificacion/`**, no el `README.md` de la raíz del proyecto.

Luego, **al inicio de cada iteración**, lee en este orden:

3. `_planificacion/00_producto/decisiones.md` (ADR vigentes y propuestas pendientes).
4. `_planificacion/00_producto/registro-log.md` (fuente única de verdad de lo que falta; prevalece sobre `_planificacion/README.md` si discrepan).
5. El `epica.md` de la épica y el archivo de la iteración (`_planificacion/<NN>_epica-<slug>/<ID>-<slug>.md`).
6. Los hallazgos `AT-###` que la iteración cierra, en `_planificacion/00_producto/auditoria-tecnica.md`.

No uses como insumo el `README.md`, `DESIGN.md` ni `AGENTS.md` antiguos del sitio (los de `main`).

## 2. Contexto del proyecto

- **Producto:** sitio personal de Felipe Cuevas (CV online, portafolio y comunidad). Producción: https://felipecuevas.dev. Repositorio: https://github.com/ffelipecuevasc/cv.
- **Objetivo:** proyecto nuevo en Astro 7.x, bilingüe (`/es/` en `es-CL` y `/en/` en `en-US`), con Tailwind CSS v4, PNPM, HTML5 semántico y salida estática.
- **Rama:** todo el trabajo ocurre en la rama de migración (propuesta `migracion-astro`, ADR-014), creada desde `main`.
- **Sitio antiguo:** es **referencia de solo lectura**. Sus archivos siguen en la raíz de la rama hasta E190-I03 (`*.html`, `static/`, `functions/`, `sitemap.xml`, `robots.txt`, `_redirects`, `linkinator.config.json`, `docs/`).
    - Nunca los edites.
    - Para consultar el original, usa siempre `git show main:<ruta>`.
- **Despliegue:** la plataforma de Cloudflare (Pages o Workers) está pendiente: propuesta P-01, que se resuelve en E10-I09.

## 3. Lo que el agente PUEDE hacer

- Leer, crear y editar archivos **dentro del alcance de la iteración en curso**.
- Ejecutar scripts de `pnpm`: `dev`, `build`, `preview`, `check`, `lint`, `format`, `test` y los de verificación que se agreguen.
- Actualizar los documentos de `_planificacion/`.
- Agregar entradas nuevas a `auditoria-tecnica.md` (desde AT-044) y a `decisiones.md` (ADR nuevos).
- Escribir la bitácora de la iteración en `_planificacion/99_bitacora/`.
- Sugerir el mensaje de commit (máximo 200 caracteres).
- Crear ramas nuevas **solo después de consultar a Felipe y recibir su autorización explícita**.

## 4. Lo que el agente NO PUEDE hacer

- **No hacer commits, push ni merges.** Los hace siempre el desarrollador (ADR-012).
- **No trabajar sobre `main`.** Toda la implementación vive en la rama de migración. Si la rama activa es `main`, detente y avisa.

### Reglas derivadas (pendientes de aprobación o veto de Felipe, propuesta P-04)
Mientras no se vete, cada regla se aplica de forma conservadora.
- *Derivada:* no reescribir el historial (`rebase`, `reset --hard`, `push --force`) ni eliminar ramas.
- *Derivada:* no usar npm, yarn, bun ni `npx`; usar solo `pnpm` y `pnpm dlx` (ADR-003).
- *Derivada:* no agregar dependencias sin un ADR aceptado en `decisiones.md`.
- *Derivada:* no tocar la configuración de despliegue (Cloudflare, Wrangler, `_headers`, `_redirects`, variables o secretos) sin consultar.
- *Derivada:* no borrar entradas de la auditoría ni revertir ADR sin una entrada nueva que lo sustituya.

### Otras restricciones vinculantes
- No crear `CLAUDE.md` ni `GEMINI.md` en ninguna ruta del proyecto (ADR-024).
- No editar los archivos del sitio antiguo (sección 2).
- No escribir secretos ni valores de variables de entorno en archivos versionados.
- No trabajar fuera del alcance de la iteración: lo que encuentres fuera de él se registra como hallazgo o como backlog.

## 5. Protocolo de trabajo por iteración

1. **Revisión:** lee los documentos de la sección 1 y confirma que las dependencias de la iteración están terminadas en `registro-log.md`.
2. **Estado inicial:** marca la iteración como `[~] En curso` en su archivo, en `_planificacion/README.md` y en `registro-log.md`.
3. **Implementación:** ejecuta las tareas de la iteración mediante código, sin salir de su alcance.
4. **Verificación:** ejecuta los comandos de la sección "Verificación" y comprueba cada criterio de aceptación y la Definition of Done global.
5. **Documentación:**
    - marca la iteración `[x] Terminada` (o `[!] Bloqueada` con el motivo);
    - actualiza `_planificacion/README.md` (épica actual, iteración actual, lista) y `registro-log.md`;
    - marca como resueltos los `AT-###` cerrados, indicando la iteración;
    - registra los ADR nuevos.
6. **Commit sugerido:** propone un mensaje de 200 caracteres o menos, en español de Chile.
7. **Bitácora:** escribe `_planificacion/99_bitacora/AAAA-MM-DD_<ID>.md` con la plantilla `_plantilla-bitacora.md`.
8. **Entrega:** resume a Felipe lo hecho y el mensaje de commit, y **espera**: no avances a la iteración siguiente sin que te lo pidan.

## 6. Detenerse y preguntar

Detente y pregunta a Felipe, sin suponer, cuando:
- dos documentos se contradigan (por ejemplo `DESIGN.md` y un ADR, o una iteración y `decisiones.md`);
- una tarea exija una decisión que no esté en `decisiones.md`;
- una tarea requiera una dependencia nueva, un cambio de despliegue o crear una rama;
- una verificación de la Definition of Done no se pueda cumplir;
- falte un insumo marcado "por validar" que bloquee la iteración.

Agrupa las preguntas en una sola ronda y propón una recomendación para cada una.

## 7. Estándares técnicos

- **HTML5 semántico:** un `<main>`, landmarks correctos y encabezados sin saltos (ADR-005).
- **i18n:** toda página existe en `es-CL` y `en-US` con paridad; textos de interfaz desde el diccionario; rutas desde el mapa de rutas equivalentes (ADR-001, ADR-020). El agente redacta `en-US` y Felipe lo valida (ADR-017).
- **Estilos:** Tailwind CSS v4 con tokens de `DESIGN.md` declarados en `@theme`. Sin colores sueltos y sin `@astrojs/tailwind` (ADR-004).
- **JavaScript:** mínimo, modular, sin dependencias innecesarias y con mejora progresiva. El contenido debe ser legible sin JavaScript.
- **Movimiento:** respetar siempre `prefers-reduced-motion`.
- **Logotipo:** idéntico al actual en apariencia y comportamiento (ADR-008 y `DESIGN.md`).
- **Almacenamiento local:** conservar las claves `theme`, `perfil-hero` y `rutas-progreso` (ADR-023).
- **Rendimiento:** no empeorar los umbrales de ADR-015.

## 8. Herramientas de agente

- **Claude Code:**
    - lee este archivo solo si no existe `CLAUDE.md` en el proyecto ni en carpetas superiores;
    - la opción de instrucciones del proyecto está en `/config`;
    - la carga se confirma con la línea de arranque o preguntándole por sus instrucciones, porque `AGENTS.md` no aparece en `/memory` (AT-036).
- **Antigravity:** lee este archivo como regla del workspace. Si existiera `GEMINI.md`, tendría precedencia, por eso no se crea.
- Los permisos de Claude Code viven en `.claude/settings.json` (se redefine en E10-I06).

## 9. Arranque

Prompt de inicio de iteración:

```
Lee AGENTS.md y ejecuta la iteración <ID>.
```

La iteración actual está en `_planificacion/README.md`, y `registro-log.md` prevalece si discrepan.
