// =========================================
// CAPA DE DATOS — Bóveda de recursos educativos
// Colección declarativa de contenido. Sin lógica, sin clases de presentación.
// Para agregar, quitar o editar contenido, este es el único archivo a tocar.
// =========================================

export const recursosData = [
    {
        id: 1,
        titulo: "Optimización de Perfil LinkedIn para Devs",
        descripcion: "Manual de estrategia y posicionamiento digital para destacar en LinkedIn.",
        categoriaPadre: "Empleabilidad",
        categoriaFiltro: "Empleabilidad",
        formato: "pdf",
        dificultad: "Básico",
        tecnologia: "LinkedIn",
        url: "static/recursos/empleabilidad/manual-optimizar-perfil-linkedin.pdf"
    },
    {
        id: 2,
        titulo: "Hackatón de Estudio para Django & Python",
        descripcion: "Actividad en modalidad Hackatón para profundizar en Django y Python.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Python",
        url: "static/recursos/python/actividad-hackaton-de-estudio.pdf"
    },
    {
        id: 3,
        titulo: "Taller: Despliega tu CV Online",
        descripcion: "Actividad guiada para crear tu CV web utilizando la IA Stitch y GitHub.",
        categoriaPadre: "Empleabilidad",
        categoriaFiltro: "Empleabilidad",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "CV Web & GitHub",
        url: "static/recursos/empleabilidad/taller-cv-online.pdf"
    },
    {
        id: 4,
        titulo: "Taller: Despliegue en AlwaysData",
        descripcion: "Procedimiento técnico para subir tu Proyecto Web Django en AlwaysData.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Django & MySQL",
        url: "static/recursos/python/taller-despliegue-plataforma-alwaysdata.pdf"
    },
    {
        id: 5,
        titulo: "Taller: Despliegue en Google Cloud Platform",
        descripcion: "Taller práctico para el despliegue profesional en Google Cloud.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "pdf",
        dificultad: "Avanzado",
        tecnologia: "Google Cloud",
        url: "static/recursos/python/taller-despliegue-plataforma-google-cloud.pdf"
    },
    {
        id: 6,
        titulo: "Entrevista a Guido van Rossum",
        descripcion: "El creador de Python profundiza sobre Python y su rol en la IA.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "video",
        dificultad: "Intermedio",
        tecnologia: "Python",
        url: "https://youtu.be/Qrad7LPoJjU"
    },
    {
        id: 7,
        titulo: "Clase Magistral - Cristián Maureira (Vicepresidente PSF)",
        descripcion: "Historia de Python y por qué es el lenguaje N° 1 para programar.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "video",
        dificultad: "Básico",
        tecnologia: "Python",
        url: "https://youtu.be/6R2Hly53Zh8"
    },
    {
        id: 8,
        titulo: "Diferencias entre JS, Java y Python",
        descripcion: "Análisis para entender las diferencias y propósitos de cada lenguaje.",
        categoriaPadre: "Fundamentos de Programación",
        categoriaFiltro: "Java",
        formato: "video",
        dificultad: "Básico",
        tecnologia: "Java, Python & JS",
        url: "https://youtu.be/zvegzW_RL9U"
    },
    {
        id: 9,
        titulo: "Glosario completo del taller",
        descripcion: "Todos los conceptos del taller, del Vibe Coding a la ingeniería con IA, en un solo documento.",
        categoriaPadre: "Etapa 0 · Introducción y materiales",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "pdf",
        dificultad: "Básico",
        tecnologia: "Glosario",
        url: "static/recursos/ia/desarrollo-web/glosario-vibe-coding-ingenieria-ia.pdf"
    },
    {
        id: 10,
        titulo: "Documentación oficial de Claude Code",
        descripcion: "Referencia oficial de Anthropic para instalar, configurar y trabajar con Claude Code.",
        categoriaPadre: "Etapa 0 · Introducción y materiales",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Intermedio",
        tecnologia: "Claude Code",
        url: "https://docs.claude.com/en/docs/claude-code/overview"
    },
    {
        id: 11,
        titulo: "Anthropic Academy: cursos gratuitos",
        descripcion: "Catálogo de cursos gratuitos de Anthropic para aprender a trabajar con Claude.",
        categoriaPadre: "Etapa 0 · Introducción y materiales",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Básico",
        tecnologia: "Anthropic Academy",
        url: "https://academy.claude.com"
    },
    {
        id: 12,
        titulo: "Planificación: del Vibe Coding a la Ingeniería con IA (PDF)",
        descripcion: "Material de la Etapa 1: cómo pasar de la intuición a un plan antes de pedirle código a la IA.",
        categoriaPadre: "Etapa 1 · Planificación: del Vibe Coding a la Ingeniería con IA",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "pdf",
        dificultad: "Básico",
        tecnologia: "Planificación",
        url: "static/recursos/ia/desarrollo-web/etapa-1-planificacion.pdf"
    },
    {
        id: 13,
        titulo: "Addy Osmani en LinkedIn",
        descripcion: "Perfil de Addy Osmani, referente en ingeniería web y en desarrollo asistido por IA.",
        categoriaPadre: "Etapa 1 · Planificación: del Vibe Coding a la Ingeniería con IA",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Básico",
        tecnologia: "LinkedIn",
        url: "https://www.linkedin.com/in/addyosmani"
    },
    {
        id: 14,
        titulo: "Andrej Karpathy en LinkedIn",
        descripcion: "Perfil de Andrej Karpathy, quien acuñó el término Vibe Coding.",
        categoriaPadre: "Etapa 1 · Planificación: del Vibe Coding a la Ingeniería con IA",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Básico",
        tecnologia: "LinkedIn",
        url: "https://www.linkedin.com/in/andrej-karpathy-9a650716/"
    },
    {
        id: 15,
        titulo: "Entrevista a Addy Osmani sobre Beyond Vibe Coding",
        descripcion: "Conversación sobre cómo ir más allá del Vibe Coding hacia una ingeniería asistida por IA.",
        categoriaPadre: "Etapa 1 · Planificación: del Vibe Coding a la Ingeniería con IA",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "video",
        dificultad: "Básico",
        tecnologia: "YouTube",
        url: "https://youtu.be/dHIppEqwi0g?si=_whEHzNwe6FgDBNu"
    },
    {
        id: 16,
        titulo: "Beyond Vibe Coding (O'Reilly)",
        descripcion: "Libro de Addy Osmani sobre desarrollo profesional de software con asistentes de IA.",
        categoriaPadre: "Etapa 1 · Planificación: del Vibe Coding a la Ingeniería con IA",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Básico",
        tecnologia: "O'Reilly",
        url: "https://www.oreilly.com/library/view/beyond-vibe-coding/9798341634749/"
    },
    {
        id: 17,
        titulo: "Diseño de interfaces con Google Stitch (PDF)",
        descripcion: "Material de la Etapa 2: diseña la interfaz de tu portafolio con Google Stitch.",
        categoriaPadre: "Etapa 2 · Diseño de interfaces con Google Stitch",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "pdf",
        dificultad: "Básico",
        tecnologia: "Google Stitch",
        url: "static/recursos/ia/desarrollo-web/etapa-2-diseno-google-stitch.pdf"
    },
    {
        id: 18,
        titulo: "Prompt maestro para Stitch (plantilla)",
        descripcion: "Plantilla de prompt lista para completar y generar el diseño de tu portafolio en Stitch.",
        categoriaPadre: "Etapa 2 · Diseño de interfaces con Google Stitch",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "plantilla",
        dificultad: "Intermedio",
        tecnologia: "Google Stitch",
        url: "static/recursos/ia/desarrollo-web/prompt-maestro-stitch.txt"
    },
    {
        id: 19,
        titulo: "Especificación abierta de DESIGN.md",
        descripcion: "Repositorio con la especificación abierta para describir un sistema visual a los agentes de IA.",
        categoriaPadre: "Etapa 2 · Diseño de interfaces con Google Stitch",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "github",
        dificultad: "Intermedio",
        tecnologia: "DESIGN.md",
        url: "https://github.com/google-labs-code/design.md"
    },
    {
        id: 20,
        titulo: "Arquitectura del proyecto (PDF)",
        descripcion: "Material de la Etapa 3: WebStorm, elección del stack y archivos de contexto para la IA.",
        categoriaPadre: "Etapa 3 · Arquitectura del proyecto: WebStorm, stack y archivos de contexto",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Arquitectura",
        url: "static/recursos/ia/desarrollo-web/etapa-3-arquitectura-proyecto.pdf"
    },
    {
        id: 21,
        titulo: "Plantilla de AGENTS.md",
        descripcion: "Punto de partida para escribir las instrucciones que los agentes de IA siguen en tu proyecto.",
        categoriaPadre: "Etapa 3 · Arquitectura del proyecto: WebStorm, stack y archivos de contexto",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "plantilla",
        dificultad: "Intermedio",
        tecnologia: "AGENTS.md",
        url: "static/recursos/ia/desarrollo-web/plantilla-agents-md.txt"
    },
    {
        id: 22,
        titulo: "agents.md: el estándar abierto",
        descripcion: "Sitio oficial del formato abierto AGENTS.md para dar contexto a los agentes de programación.",
        categoriaPadre: "Etapa 3 · Arquitectura del proyecto: WebStorm, stack y archivos de contexto",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Intermedio",
        tecnologia: "AGENTS.md",
        url: "https://agents.md/"
    },
    {
        id: 23,
        titulo: "Publicación: Git, GitHub y CI/CD (PDF)",
        descripcion: "Material de la Etapa 4: versiona tu portafolio y publícalo con un flujo automatizado.",
        categoriaPadre: "Etapa 4 · Publicación: Git, GitHub y CI/CD",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Git y GitHub",
        url: "static/recursos/ia/desarrollo-web/etapa-4-publicacion-git-github-cicd.pdf"
    },
    {
        id: 24,
        titulo: "Plantilla de .gitignore",
        descripcion: "Lista base de archivos y carpetas que no deben subirse a tu repositorio.",
        categoriaPadre: "Etapa 4 · Publicación: Git, GitHub y CI/CD",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "plantilla",
        dificultad: "Básico",
        tecnologia: "Git",
        url: "static/recursos/ia/desarrollo-web/plantilla-gitignore.txt"
    },
    {
        id: 25,
        titulo: "Esqueleto del workflow de publicación",
        descripcion: "Estructura base de un workflow de GitHub Actions para publicar tu sitio automáticamente.",
        categoriaPadre: "Etapa 4 · Publicación: Git, GitHub y CI/CD",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "plantilla",
        dificultad: "Intermedio",
        tecnologia: "GitHub Actions",
        url: "static/recursos/ia/desarrollo-web/esqueleto-workflow-publicar.yml"
    },
    {
        id: 26,
        titulo: "Documentación oficial de GitHub Pages",
        descripcion: "Guía oficial para alojar un sitio estático gratis directamente desde tu repositorio.",
        categoriaPadre: "Etapa 4 · Publicación: Git, GitHub y CI/CD",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Intermedio",
        tecnologia: "GitHub Pages",
        url: "https://docs.github.com/es/pages"
    },
    {
        id: 27,
        titulo: "Documentación oficial de GitHub Actions",
        descripcion: "Guía oficial para automatizar compilaciones, pruebas y despliegues desde GitHub.",
        categoriaPadre: "Etapa 4 · Publicación: Git, GitHub y CI/CD",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Intermedio",
        tecnologia: "GitHub Actions",
        url: "https://docs.github.com/es/actions"
    },
    {
        id: 28,
        titulo: "Delegar en Claude Code (PDF)",
        descripcion: "Material de la Etapa 5: cómo delegar tareas en Claude Code y revisar lo que entrega.",
        categoriaPadre: "Etapa 5 · Delegar en Claude Code",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Claude Code",
        url: "static/recursos/ia/desarrollo-web/etapa-5-delegar-claude-code.pdf"
    },
    {
        id: 29,
        titulo: "Curso: Claude Code 101",
        descripcion: "Curso introductorio de Anthropic Academy para dar tus primeros pasos con Claude Code.",
        categoriaPadre: "Etapa 5 · Delegar en Claude Code",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Básico",
        tecnologia: "Anthropic Academy",
        url: "https://academy.claude.com/es/courses/claude-code-101"
    },
    {
        id: 30,
        titulo: "Curso: Claude Code in Action",
        descripcion: "Curso práctico de Anthropic Academy para integrar Claude Code en tu flujo de desarrollo.",
        categoriaPadre: "Etapa 5 · Delegar en Claude Code",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Intermedio",
        tecnologia: "Anthropic Academy",
        url: "https://academy.claude.com/courses/claude-code-in-action"
    },
    {
        id: 31,
        titulo: "Curso: Introducción a los subagentes",
        descripcion: "Curso de Anthropic Academy sobre cómo repartir el trabajo entre subagentes de Claude Code.",
        categoriaPadre: "Etapa 5 · Delegar en Claude Code",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Intermedio",
        tecnologia: "Anthropic Academy",
        url: "https://academy.claude.com/es/courses/introduction-to-subagents"
    },
    {
        id: 32,
        titulo: "Curso: AI Fluency, marco y fundamentos",
        descripcion: "Curso de Anthropic Academy sobre el marco para colaborar con la IA de forma eficaz y responsable.",
        categoriaPadre: "Etapa 5 · Delegar en Claude Code",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "enlace",
        dificultad: "Básico",
        tecnologia: "Anthropic Academy",
        url: "https://academy.claude.com/es/courses/ai-fluency-framework-foundations"
    },
    {
        id: 33,
        titulo: "agent-skills, por Addy Osmani",
        descripcion: "Repositorio de habilidades reutilizables para ampliar lo que un agente como Claude Code sabe hacer.",
        categoriaPadre: "Etapa 5 · Delegar en Claude Code",
        categoriaFiltro: "Desarrollo Web & IA",
        formato: "github",
        dificultad: "Avanzado",
        tecnologia: "Claude Code",
        url: "https://github.com/addyosmani/agent-skills"
    }
];