// =========================================
// CAPA DE DATOS — Proyectos del portafolio
// Colección declarativa de contenido. Sin lógica, sin clases de presentación.
// Las portadas son capturas de pantalla en WEBP, guardadas en static/img/portafolio/.
// Para agregar, quitar o editar proyectos, este es el único archivo a tocar.
// =========================================

export const portafolioData = [
    {
        id: "pf-card-cv",
        category: "frontend",
        image: "static/img/portafolio/felipe-cuevas-dev.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada de este sitio web, Felipe Cuevas — CV Online y Portafolio",
        link: "https://felipecuevas.dev/",
        title: "Felipe Cuevas · Sitio Web Profesional, CV Online y Portafolios",
        description: "Este mismo sitio: currículum interactivo y portafolio profesional con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5 semántico, Tailwind CSS y JavaScript Vanilla</strong>. Modo claro y oscuro, animaciones con AOS, formulario de contacto protegido con Cloudflare Turnstile y despliegue en Cloudflare Pages.",
        tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "AOS", "Cloudflare Pages", "Cloudflare Turnstile", "NPM"]
    },
    {
        id: "pf-card-monolito",
        category: "backend",
        image: "static/img/portafolio/api-rest-monolito-java.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto API REST Monolítica con Spring Boot",
        link: "https://github.com/ffelipecuevasc/api-rest-monolito-spring",
        title: "API REST Monolítica con Spring Boot",
        description: "API REST monolítica construida con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Java y Spring Boot</strong>, con persistencia mediante Spring Data JPA y Hibernate en una arquitectura de capas desacopladas. Integra microservicios de apoyo: AWS S3 para archivos, RabbitMQ para mensajería, Redis para caché y Zipkin para trazabilidad.",
        tags: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "RESTful APIs", "Maven", "AWS", "RabbitMQ", "Redis", "Zipkin"]
    },
    {
        id: "pf-card-oauth2",
        category: "backend",
        image: "static/img/portafolio/api-rest-oauth-google-github.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto API REST con OAuth2, JWT y 2FA",
        link: "https://github.com/ffelipecuevasc/api-rest-oaut2-spring",
        title: "API REST con OAuth2, JWT y 2FA en Spring Boot",
        description: "API REST educativa de seguridad con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Java 21, Spring Boot y Spring Security</strong>: autenticación con BCrypt, tokens JWT, inicio de sesión social OAuth2 (Google y GitHub) y verificación en dos pasos con Google Authenticator, sobre MySQL en Docker.",
        tags: ["Java 21", "Spring Boot", "Spring Security", "OAuth2", "JWT", "Spring Data JPA", "MySQL", "Docker", "Maven"]
    },
    {
        id: "pf-card-jardinera",
        category: "frontend",
        image: "static/img/portafolio/la-jardinera.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto La Jardinera Florería",
        link: "https://lajardinerafloreria.cl/",
        title: "La Jardinera Florería · Sitio Web y Catálogo Comercial",
        description: "Catálogo comercial multi-página para una florería de Valdivia, con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, Tailwind CSS y JavaScript Vanilla</strong>. Identidad visual botánica, tema claro/oscuro, carrusel de reseñas, calculadora de suscripciones florales y galería con filtrado dinámico.",
        tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "PNPM"]
    },
    {
        id: "pf-card-manza",
        category: "fullstack",
        image: "static/img/portafolio/manzagrafica.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Manza Gráfica ERP",
        link: "https://github.com/ffelipecuevasc/ManzagraficaPedidosApp",
        title: "Manza Gráfica ERP · Sistema de Gestión para Imprenta",
        description: "ERP a medida con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Python y Django</strong> para la gestión de clientes, cotizaciones y producción de una imprenta. Genera reportes y presupuestos en PDF con WeasyPrint, incluye panel de Business Intelligence y respaldos automatizados de MySQL.",
        tags: ["Python", "Django", "MySQL", "Docker", "HTML5", "Tailwind CSS", "JavaScript", "WeasyPrint"]
    },
    {
        id: "pf-card-gestion",
        category: "fullstack",
        image: "static/img/portafolio/gestion-escolar.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Sistema de Gestión Escolar",
        link: "https://github.com/ffelipecuevasc/GestionEscolar",
        title: "SGE · Sistema de Gestión Escolar",
        description: "Aplicación web para la administración académica de instituciones educativas, con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Python y Django</strong> (MVT). Gestiona el ciclo CRUD de estudiantes, docentes y asignaturas, con autenticación, señales y middlewares personalizados sobre SQLite.",
        tags: ["Python", "Django", "SQLite", "Django ORM", "HTML5", "CSS3", "JavaScript"]
    },
    {
        id: "pf-card-valdivia",
        category: "frontend",
        image: "static/img/portafolio/turismo-valdivia.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Valdivia — La Perla del Sur",
        link: "https://turismovaldivia.cl/",
        title: "Valdivia · La Perla del Sur",
        description: "Landing page editorial y turística de la ciudad de Valdivia, con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, Tailwind CSS y JavaScript Vanilla</strong>. Paleta <em>crimson</em> personalizada, navegación flotante reactiva al scroll con máscara SVG, animaciones de revelado y galería fotográfica.",
        tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "PostCSS", "Autoprefixer", "PNPM"]
    },
    {
        id: "pf-card-vet",
        category: "fullstack",
        image: "static/img/portafolio/veterinaria-express.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto VetCare Pro — Veterinaria Express",
        link: "https://github.com/ffelipecuevasc/vet_express",
        title: "VetCare Pro · Sistema de Gestión para Clínica Veterinaria",
        description: "Sistema de administración para clínica veterinaria con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Node.js y Express.js</strong> (MVC): CRUD de pacientes y tutores con Sequelize sobre PostgreSQL, autenticación con contraseñas encriptadas, sesiones persistentes y notificaciones por correo con Nodemailer.",
        tags: ["Node.js", "Express.js", "JavaScript ES6+", "PostgreSQL", "Sequelize", "EJS", "Tailwind CSS", "HTML5", "CSS3", "bcryptjs", "Nodemailer"]
    },
    {
        id: "pf-card-examen-td",
        category: "fullstack",
        image: "static/img/portafolio/examen-td.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Examen de Certificación JavaScript — Talento Digital",
        link: "https://examen-certificacion-td-js.pages.dev/",
        title: "Examen de Certificación JavaScript - Talento Digital",
        description: "Plataforma de simulacros y cuestionarios para el examen de certificación de <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Talento Digital</strong>, con HTML5, Tailwind CSS y JavaScript. Servicios de API con Cloudflare Workers y base de datos relacional en Cloudflare D1.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "Cloudflare Workers", "Cloudflare D1", "Cloudflare Pages", "Node.js", "Wrangler"]
    },
    {
        id: "pf-card-bodas",
        category: "frontend",
        image: "static/img/portafolio/catalogo-bodas.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Portafolio de Invitaciones Web para Bodas",
        link: "https://ffelipecuevasc.github.io/portafoliobodas/",
        title: "Portafolio · Invitaciones Web para Bodas",
        description: "Portafolio de invitaciones digitales para bodas, con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, Tailwind CSS y JavaScript Vanilla</strong>. Maquetación a dos columnas, paleta reactiva a temas claro/oscuro con Material Design 3, tipografías editoriales y etiquetas Open Graph para redes sociales.",
        tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Material Design 3", "Google Fonts"]
    },
    {
        id: "pf-card-franjacob",
        category: "frontend",
        image: "static/img/portafolio/francisca-jacob.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Francisca Jacob — Sitio Web Profesional",
        link: "https://ffelipecuevasc.github.io/franjacob/",
        title: "Francisca Jacob · Sitio Web Profesional y CV Online",
        description: "Sitio personal y portafolio de una periodista bilingüe, con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, Tailwind CSS y JavaScript Vanilla</strong>. Modo claro/oscuro persistente, efecto linterna, barra de progreso de lectura y carrusel <em>cover flow</em> para hitos profesionales.",
        tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "PostCSS", "Autoprefixer"]
    },
    {
        id: "pf-card-natalia",
        category: "frontend",
        image: "static/img/portafolio/natalia-martinez.webp",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Natalia Martínez — Orfebrería y Joyería",
        link: "https://nataliamartinez.cl/",
        title: "Natalia Martínez · Orfebrería y Joyería Sustentable",
        description: "Sitio de presentación para joyería y talleres de orfebrería sustentable, con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, Tailwind CSS y JavaScript Vanilla</strong>. Gestión de temas, animaciones de revelado por desplazamiento y transiciones de vista fluidas.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "PostCSS", "PNPM"]
    }
];