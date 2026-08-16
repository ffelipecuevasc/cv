// =========================================
// CAPA DE DATOS — Proyectos del portafolio
// Colección declarativa de contenido. Sin lógica, sin clases de presentación.
// Las portadas son SVG generados en static/img/portafolio/, con el degradado de
// marca y el logotipo de la tecnología principal de cada proyecto.
// Para agregar, quitar o editar proyectos, este es el único archivo a tocar.
// =========================================

export const portafolioData = [
    {
        id: "pf-card-monolito",
        category: "backend",
        image: "static/img/portafolio/monolito.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto API REST Monolítica con Spring",
        link: "https://github.com/ffelipecuevasc/api-rest-monolito-spring",
        title: "API REST Monolítica con Spring",
        description: "API REST construida con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Java y Spring Boot</strong>, desplegada como arquitectura de microservicios sobre <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">AWS</strong> y contenedorizada con Docker. Incluye capa de persistencia con Spring Data JPA y separación por capas de servicio y repositorio.",
        tags: ["Java", "Spring Boot", "Docker", "AWS", "PostgreSQL"]
    },
    {
        id: "pf-card-oauth2",
        category: "backend",
        image: "static/img/portafolio/oauth2.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto API REST con OAuth2 y Doble Factor",
        link: "https://github.com/ffelipecuevasc/api-rest-oaut2-spring",
        title: "API REST con OAuth2 y Doble Factor",
        description: "Servicio de autenticación con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Spring Security</strong>: inicio de sesión mediante OAuth2 con Google y GitHub, verificación en dos pasos y emisión de tokens JWT para proteger los extremos de la API.",
        tags: ["Java", "Spring Security", "OAuth2", "MySQL"]
    },
    {
        id: "pf-card-manza",
        category: "backend",
        image: "static/img/portafolio/manza.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Manza Gráfica App",
        link: "https://manzagrafica.pythonanywhere.com/",
        title: "Manza Gráfica App",
        description: "App web de gestión para servicios gráficos. Backend completo en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Python + Django</strong> con ORM, sistema de autenticación, panel de administración y base de datos relacional.",
        tags: ["Python", "Django", "MySQL", "Docker", "Tailwind CSS", "PythonAnywhere"]
    },
    {
        id: "pf-card-gestion",
        category: "backend",
        image: "static/img/portafolio/gestion.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Sistema de Gestión Escolar",
        link: "https://github.com/ffelipecuevasc/GestionEscolar",
        title: "Sistema de Gestión Escolar",
        description: "Desarrollo backend para la administración integral de instituciones educativas. Arquitectura construida con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Django y MySQL</strong>, implementando paneles de control, roles de usuario (profesores/alumnos), gestión de asignaturas y registro de calificaciones, con despliegue profesional en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">AlwaysData</strong>.",
        tags: ["Python", "Django", "MySQL", "Docker", "Tailwind CSS", "AlwaysData"]
    },
    {
        id: "pf-card-vet",
        category: "backend",
        image: "static/img/portafolio/vet.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Veterinaria Express",
        link: "https://github.com/ffelipecuevasc/vet_express",
        title: "Veterinaria Express",
        description: "Aplicación web de gestión veterinaria con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Node.js y Express</strong>. Capa de acceso a datos mediante el ORM Sequelize sobre PostgreSQL, e interfaz construida con Tailwind CSS.",
        tags: ["JavaScript", "Node.js", "Express", "Sequelize", "PostgreSQL", "Tailwind CSS"]
    },
    {
        id: "pf-card-vecinos",
        category: "backend",
        image: "static/img/portafolio/vecinos.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto API REST Junta de Vecinos",
        link: "https://github.com/ffelipecuevasc/api-rest-js-express-junta-vecinos",
        title: "API REST Junta de Vecinos",
        description: "API REST para la administración de una junta de vecinos, construida con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Express y Sequelize</strong> sobre PostgreSQL. Autenticación por tokens JWT y validación de datos en cada extremo.",
        tags: ["JavaScript", "Node.js", "Express", "Sequelize", "PostgreSQL", "JWT"]
    },
    {
        id: "pf-card-cv",
        category: "frontend",
        image: "static/img/portafolio/cv.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto CV Online — Este Sitio Web",
        link: "https://felipecuevas.dev/",
        title: "CV Online — Este Sitio Web",
        description: "Sitio web personal construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Tailwind CSS</strong>, HTML5 semántico y JavaScript vanilla. Diseño responsivo con dark mode, animaciones AOS, sistema de componentes reutilizables y despliegue continuo en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Cloudflare Pages</strong>.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "Cloudflare Pages"]
    },
    {
        id: "pf-card-benjamin",
        category: "frontend",
        image: "static/img/portafolio/benjamin.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto CV Online — Benjamín Berna",
        link: "https://ffelipecuevasc.github.io/benjaminberna/",
        title: "CV Online — Benjamín Berna",
        description: "Portafolio web profesional diseñado a medida para un Contador General. Interfaz corporativa enfocada en la presentación de servicios financieros, trayectoria laboral y captación de clientes. Estructurado con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Tailwind CSS</strong> para garantizar una experiencia de usuario rápida y 100% adaptable a dispositivos móviles.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    },
    {
        id: "pf-card-jardinera",
        category: "frontend",
        image: "static/img/portafolio/jardinera.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto La Jardinera Florería",
        link: "https://ffelipecuevasc.github.io/lajardinerafloreria/",
        title: "La Jardinera Florería",
        description: "Sitio presentacional para una florería, con catálogo de productos y secciones de contacto. Front-End estático construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, CSS3 y JavaScript</strong> y publicado en GitHub Pages.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    },
    {
        id: "pf-card-franjacob",
        category: "frontend",
        image: "static/img/portafolio/franjacob.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Fran Jacob",
        link: "https://ffelipecuevasc.github.io/franjacob/",
        title: "Fran Jacob",
        description: "Sitio web presentacional de página única, construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, CSS3 y JavaScript</strong> y publicado en GitHub Pages.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    },
    {
        id: "pf-card-bodas",
        category: "frontend",
        image: "static/img/portafolio/bodas.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Portafolio de Bodas",
        link: "https://ffelipecuevasc.github.io/portafoliobodas/",
        title: "Portafolio de Bodas",
        description: "Portafolio visual orientado a la presentación de trabajos fotográficos de bodas, con galería y navegación por secciones. Construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, CSS3 y JavaScript</strong>.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    },
    {
        id: "pf-card-valdivia",
        category: "frontend",
        image: "static/img/portafolio/valdivia.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Turismo Valdivia",
        link: "https://turismovaldivia.cl",
        title: "Turismo Valdivia",
        description: "Sitio de difusión turística de la ciudad de Valdivia, con dominio propio. Front-End estático construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5, CSS3 y JavaScript</strong>.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "Netlify"]
    },
    {
        id: "pf-card-ricardo",
        category: "frontend",
        image: "static/img/portafolio/ricardo.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Ricardo Ortiz Orfebre",
        link: "https://ffelipecuevasc.github.io/ricardortiz/",
        title: "Ricardo Ortiz Orfebre",
        description: "Sitio con catálogo de piezas para orfebrería artesanal. Front-End estático construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5 y Tailwind CSS</strong>, con navegación por categorías en JavaScript y publicación en GitHub Pages.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    },
    {
        id: "pf-card-abogados",
        category: "frontend",
        image: "static/img/portafolio/abogados.svg",
        ancho: 1600,
        alto: 900,
        alt: "Portada del proyecto Sitio Web Estudio de Abogados",
        link: "https://ffelipecuevasc.github.io/advogados/",
        title: "Sitio Web Estudio de Abogados",
        description: "Sitio corporativo para estudio jurídico: presentación de áreas de práctica, equipo y contacto. Front-End construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">HTML5 y Tailwind CSS</strong> y publicado en GitHub Pages.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    }
];