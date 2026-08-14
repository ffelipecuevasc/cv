// =========================================
// CAPA DE DATOS — Proyectos del portafolio
// Colección declarativa de contenido. Sin lógica, sin clases de presentación.
// Para agregar, quitar o editar contenido, este es el único archivo a tocar.
// =========================================

export const portafolioData = [
    {
        id: "pf-card-cv",
        category: "frontend",
        image: "static/img/felipe_cuevas_cv.png",
        ancho: 1920,
        alto: 1080,
        alt: "Sitio Web Presentacional Felipe Cuevas",
        link: "https://felipecuevas.dev/",
        title: "CV Online — Este Sitio Web",
        description: "Sitio web personal construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Tailwind CSS</strong>, HTML5 semántico y JavaScript vanilla. Diseño responsivo con dark mode, animaciones AOS, sistema de componentes reutilizables y despliegue continuo en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Cloudflare Pages</strong>.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "Cloudflare Pages"]
    },
    {
        id: "pf-card-manza",
        category: "backend",
        image: "static/img/manzagrafica.png",
        ancho: 1920,
        alto: 1080,
        alt: "Manza Gráfica App Django",
        link: "https://manzagrafica.pythonanywhere.com/",
        title: "Manza Gráfica App",
        description: "App web de gestión para servicios gráficos. Backend completo en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Python + Django</strong> con ORM, sistema de autenticación, panel de administración y base de datos relacional.",
        tags: ["Python", "Django", "MySQL", "AlwaysData"]
    },
    {
        id: "pf-card-ricardo",
        category: "backend",
        image: "static/img/ricardo_ortiz.png",
        ancho: 1920,
        alto: 1080,
        alt: "Ricardo Ortiz Orfebre",
        link: "https://ffelipecuevasc.github.io/ricardortiz/",
        title: "Ricardo Ortiz Orfebre",
        description: "Sitio con catálogo dinámico para orfebrería artesanal. Backend en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Django</strong> con gestión de inventario de productos y galería administrada desde el panel de Django Admin.",
        tags: ["Python", "Django", "SQLite"]
    },
    {
        id: "pf-card-abogados",
        category: "frontend",
        image: "static/img/abogados.png",
        ancho: 1900,
        alto: 1080,
        alt: "Sitio Web Estudio Abogados",
        link: "https://ffelipecuevasc.github.io/advogados/",
        title: "Sitio Web Estudio de Abogados",
        description: "Sitio corporativo para estudio jurídico. Front-End con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Bootstrap 5</strong>, landing page optimizada para conversión, formulario de contacto integrado y diseño adaptado al rubro legal con paleta de colores sobria y profesional.",
        tags: ["HTML5", "Bootstrap 5", "CSS3", "JavaScript"]
    },
    {
        id: "pf-card-benjamin",
        category: "frontend",
        image: "static/img/benjamin_berna.png",
        ancho: 1900,
        alto: 1080,
        alt: "CV Online Benjamín Berna - Contador General",
        link: "https://ffelipecuevasc.github.io/benjaminberna/",
        title: "CV Online — Benjamín Berna",
        description: "Portafolio web profesional diseñado a medida para un Contador General. Interfaz corporativa enfocada en la presentación de servicios financieros, trayectoria laboral y captación de clientes. Estructurado con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Tailwind CSS</strong> para garantizar una experiencia de usuario rápida y 100% adaptable a dispositivos móviles.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "Cloudflare Pages"]
    },
    {
        id: "pf-card-gestion",
        category: "backend",
        image: "static/img/gestion_escolar.png",
        ancho: 1902,
        alto: 1080,
        alt: "Sistema de Gestión Escolar - Backend Django",
        link: "https://github.com/ffelipecuevasc/GestionEscolar",
        title: "Sistema de Gestión Escolar",
        description: "Desarrollo backend para la administración integral de instituciones educativas. Arquitectura construida con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Django y MySQL</strong>, implementando paneles de control, roles de usuario (profesores/alumnos), gestión de asignaturas y registro de calificaciones, con despliegue profesional en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">AlwaysData</strong>.",
        tags: ["Python", "Django", "MySQL", "AlwaysData"]
    }
];