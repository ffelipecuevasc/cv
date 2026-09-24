// =========================================
// CAPA DE DATOS — Otros cursos, capacitaciones y bootcamps impartidos
// Colección declarativa. Sin lógica, sin clases de presentación
// (salvo el énfasis <strong> inline, igual que en portafolio.datos.js).
//
// Campos por entrada:
//   rol        insignia junto a la institución
//   periodo    texto libre, tal como se muestra
//   modalidad  texto libre, se muestra junto al periodo
//   icono      nombre de Material Symbols
//
// El orden del arreglo es el orden de la página: del más reciente al más antiguo.
// Para agregar, quitar o reordenar experiencias, este es el único archivo a tocar.
// =========================================

export const relatoriaData = [
    {
        id: "skillnest",
        institucion: "Skillnest",
        rol: "Instructor Senior",
        periodo: "Junio 2026 – Agosto 2026",
        modalidad: "Remoto",
        icono: "smart_toy",
        descripcion: "Como Instructor Senior, dicté el programa <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">IA Lab — Google (Gemini)</strong> para la empresa Mine-Class: 32 horas teórico-prácticas de ingeniería de prompts con Gemini, NotebookLM y Google AI Studio, automatización de procesos y análisis de datos aplicados al trabajo. Profesionales sin experiencia previa en desarrollo terminaron aplicando IA generativa a sus propias áreas."
    },
    {
        id: "alura-latam",
        institucion: "Alura Latam",
        rol: "Instructor Certificado",
        periodo: "Enero 2026 – Julio 2026",
        modalidad: "Remoto",
        icono: "code_blocks",
        descripcion: "Como <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Instructor Certificado</strong>, lidero el diseño pedagógico y la creación de contenidos técnicos avanzados para la comunidad hispanohablante de desarrolladores. Desarrollé el curso <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Inicio de Sesión con GitHub y Google con Java 21 — Spring Boot y Spring Security</strong>, sobre APIs REST con autenticación OAuth2 y verificación en dos pasos, y el curso <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Docker con Java 21 — Spring Boot</strong>, sobre contenedorización y despliegue de aplicaciones en producción."
    },
    {
        id: "otec-transversal",
        institucion: "OTEC Transversal",
        rol: "Relator y Diseñador Instruccional",
        periodo: "Septiembre 2025",
        modalidad: "Remoto",
        icono: "cast_for_education",
        descripcion: "Relator y diseñador instruccional del curso <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Moodle Intermedio</strong>, de 8 horas, para funcionarios del Servicio de Salud de Iquique, incluyendo la preparación de material pedagógico e instrumentos evaluativos."
    },
    {
        id: "otec-planacap",
        institucion: "OTEC Planacap",
        rol: "Relator y Diseñador Instruccional",
        periodo: "Junio 2025 – Julio 2025",
        modalidad: "Remoto",
        icono: "table_chart",
        descripcion: "Relator y diseñador instruccional del curso <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Excel 365 (Básico a Intermedio)</strong>, de 20 horas, para 30 funcionarios de la Municipalidad de Lo Barnechea, incluyendo la preparación de material pedagógico e instrumentos evaluativos."
    },
    {
        id: "otec-los-andes",
        institucion: "OTEC Los Andes",
        rol: "Relator",
        periodo: "Junio 2024",
        modalidad: "Remoto (sincrónico)",
        icono: "apps",
        descripcion: "Relator del curso de <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">herramientas ofimáticas</strong> —Excel, OneDrive y Canvas—, de 8 horas, dictado en modalidad remota sincrónica."
    },
    {
        id: "otec-degasa",
        institucion: "OTEC DEGASA",
        rol: "Relator y Diseñador Instruccional",
        periodo: "Noviembre 2023",
        modalidad: "Presencial",
        icono: "table_chart",
        descripcion: "Relator y diseñador instruccional para los cursos <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Excel Básico</strong> (8 horas) y <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Excel Intermedio</strong> (16 horas), dictados en modalidad presencial, incluyendo el desarrollo del material pedagógico de ambos programas."
    }
];
