// =========================================
// CAPA DE DATOS — Conjunto de tecnologías (Fase 5.3)
// Colección declarativa. Sin lógica, sin clases de presentación.
//
//   icono      nombre del archivo en static/img/tecnologias/, sin extensión
//   desde      año de inicio de uso; el panel calcula los años transcurridos
//   cursos     programas donde se imparte la tecnología
//
// "proyectos" no se declara acá: tecnologias.js lo calcula a partir de las
// etiquetas de portafolio.datos.js.
//
// Para agregar una tecnología: dejar su SVG en static/img/tecnologias/ y
// una entrada acá. No hay que tocar lógica.
// =========================================

export const tecnologiasData = [
    {id: "html5", nombre: "HTML5", rol: "Lenguaje de Marcado", icono: "html5", desde: 2015, cursos: [], certificaciones: []},
    {id: "css3", nombre: "CSS3", rol: "Lenguaje de Estilos", icono: "css3", desde: 2015, cursos: [], certificaciones: []},
    {id: "javascript", nombre: "JavaScript", rol: "Lenguaje Core", icono: "javascript", desde: 2015, cursos: [], certificaciones: []},
    {
        id: "java", nombre: "Java", rol: "Lenguaje Core", icono: "java", desde: 2011,
        cursos: ["Full Stack Java — Talento Digital SENCE", "Instructor certificado de Java — Alura Latam", "Programación en Java — IPLACEX"],
        certificaciones: ["Oracle Developer Professional"]
    },
    {id: "python", nombre: "Python", rol: "Lenguaje Core", icono: "python", desde: 2020,
        cursos: ["Full Stack Python — Talento Digital SENCE", "Ingeniería de Datos con IA — Talento Digital SENCE", "Programación en Python — IPLACEX"],
        certificaciones: ["Python Institute PCEP"]
    },
    {id: "spring", nombre: "Spring", rol: "Framework", icono: "spring", desde: 2018,
        cursos: ["Full Stack Java — Talento Digital SENCE", "APIs REST con Spring Security — Alura Latam"], certificaciones: []},
    {id: "django", nombre: "Django", rol: "Framework", icono: "django", desde: 2021,
        cursos: ["Full Stack Python — Talento Digital SENCE", "Programación web con Django — IPLACEX"], certificaciones: []},
    {id: "expressjs", nombre: "Express.js", rol: "Framework Backend", icono: "expressjs", desde: 2024, cursos: [], certificaciones: []},
    {id: "tailwindcss", nombre: "Tailwind CSS", rol: "Framework CSS", icono: "tailwindcss", desde: 2025, cursos: [], certificaciones: []},
    {id: "nodejs", nombre: "Node.js", rol: "Entorno de Ejecución", icono: "nodejs", desde: 2025, cursos: [], certificaciones: []},
    {id: "hibernate", nombre: "Hibernate", rol: "ORM", icono: "hibernate", desde: 2020, cursos: [], certificaciones: []},
    {id: "sequelize", nombre: "Sequelize", rol: "ORM", icono: "sequelize", desde: 2024, cursos: [], certificaciones: []},
    {id: "restful-apis", nombre: "RESTful APIs", rol: "Arquitectura de APIs", icono: "restful-apis", desde: 2024, cursos: [], certificaciones: []},
    {id: "jwt", nombre: "JWT", rol: "Autenticación", icono: "jwt", desde: 2024, cursos: [], certificaciones: []},
    {id: "oauth2", nombre: "OAuth2", rol: "Autenticación", icono: "oauth2", desde: 2024, cursos: [], certificaciones: []},
    {id: "google-authenticator", nombre: "Google Authenticator", rol: "Seguridad / 2FA", icono: "google-authenticator", desde: 2022, cursos: [], certificaciones: []},
    {id: "mysql", nombre: "MySQL", rol: "Base de Datos", icono: "mysql", desde: 2015, cursos: [], certificaciones: []},
    {id: "postgresql", nombre: "PostgreSQL", rol: "Base de Datos", icono: "postgresql", desde: 2015, cursos: [], certificaciones: []},
    {id: "oracle-database", nombre: "Oracle Database", rol: "Base de Datos", icono: "oracle-database", desde: 2010,
        cursos: ["Administración de Bases de Datos — IPLACEX", "Bases de datos SQL — Talento Digital SENCE"], certificaciones: []},
    {id: "redis", nombre: "Redis", rol: "Caché", icono: "redis", desde: 2025, cursos: [], certificaciones: []},
    {id: "rabbitmq", nombre: "RabbitMQ", rol: "Mensajería", icono: "rabbitmq", desde: 2025, cursos: [], certificaciones: []},
    {id: "maven", nombre: "Maven", rol: "Gestor de Dependencias", icono: "maven", desde: 2020, cursos: [], certificaciones: []},
    {id: "npm", nombre: "NPM", rol: "Gestor de Paquetes", icono: "npm", desde: 2025, cursos: [], certificaciones: []},
    {id: "pnpm", nombre: "PNPM", rol: "Gestor de Paquetes", icono: "pnpm", desde: 2025, cursos: [], certificaciones: []},
    {id: "docker", nombre: "Docker", rol: "Contenedores", icono: "docker", desde: 2024,
        cursos: ["Contenedorización y despliegue — Alura Latam"], certificaciones: []},
    {id: "git", nombre: "Git", rol: "Control de Versiones", icono: "git", desde: 2014,
        cursos: ["Módulo de GIT y GitHub — Plan Formativo PF1163", "Transversal a todos los bootcamps de Talento Digital"], certificaciones: []},
    {id: "github", nombre: "GitHub", rol: "Control de Versiones", icono: "github", desde: 2020,
        cursos: ["Módulo de GIT y GitHub — Plan Formativo PF1163", "Transversal a todos los bootcamps de Talento Digital"], certificaciones: []},
    {id: "aws", nombre: "AWS", rol: "Infraestructura", icono: "aws", desde: 2024,
        cursos: ["Ingeniería de Datos con IA — Talento Digital SENCE"],
        certificaciones: ["AWS Developer Associate", "AWS Cloud Practitioner", "AWS AI Practitioner"]},
    {id: "cloudflare", nombre: "Cloudflare", rol: "Infraestructura / Hosting", icono: "cloudflare", desde: 2025, cursos: [], certificaciones: []},
    {id: "cloudflare-workers", nombre: "Cloudflare Workers", rol: "Backend Serverless", icono: "cloudflare-workers", desde: 2025, cursos: [], certificaciones: []},
    {id: "alwaysdata", nombre: "AlwaysData", rol: "Hosting / PaaS", icono: "alwaysdata", desde: 2024,
        cursos: ["Taller de despliegue en AlwaysData — Bóveda de Recursos"], certificaciones: []},
    {id: "oracle-cloud", nombre: "Oracle Cloud", rol: "Infraestructura OCI", icono: "oracle-cloud-infrastructure", desde: 2025,
        cursos: ["Tecnología de la Nube — Talento Digital SENCE"], certificaciones: ["Oracle OCI Associate"]},
    {id: "claude", nombre: "Claude", rol: "Asistente de IA", icono: "claude", desde: 2025, cursos: [], certificaciones: []},
    {id: "claude-code", nombre: "Claude Code", rol: "Herramienta de Desarrollo IA", icono: "claude-code", desde: 2025, cursos: [], certificaciones: []},
    {id: "google-antigravity", nombre: "Google Antigravity", rol: "Herramienta de Desarrollo IA", icono: "google-antigravity", desde: 2025, cursos: [], certificaciones: []},
    {id: "google-gemini", nombre: "Google Gemini", rol: "Modelo de IA", icono: "google-gemini", desde: 2025, cursos: [], certificaciones: []}
];