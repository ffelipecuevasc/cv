// =========================================
// CAPA DE DATOS — Formación académica (Fase 5.2)
// Colección declarativa. Sin lógica, sin clases de presentación.
//
// Campos por entrada:
//   jerarquia  "mayor" | "intermedio" | "menor"   → peso visual del bloque
//   categoria  "universitaria" | "diplomado" | "tecnica" | "reconocimiento"
//   anioFin    usado por el orden cronológico secundario
//
// Para agregar, quitar o reordenar formaciones, este es el único archivo a tocar.
// =========================================

export const formacionData = [
    {
        id: "ingenieria-informatica",
        titulo: "Ingeniería en Informática",
        institucion: "Universidad Tecnológica de Chile INACAP",
        periodo: "2007 - 2011",
        anioFin: 2011,
        duracion: "",
        estado: "Titulado",
        jerarquia: "mayor",
        categoria: "universitaria",
        icono: "workspace_premium",
        descripcion: "Formación profesional en ingeniería informática con especialización en desarrollo de software, arquitectura de sistemas y administración de bases de datos.",
        logros: [
            "Titulado con Honores — Mejor Ingeniero",
            "Tesis: Sistema de Rastreo GPS de Flota",
            "Alumno Tutor Académico"
        ],
        etiquetas: ["Desarrollo de Software", "Bases de Datos", "Arquitectura de Sistemas"]
    },
    {
        id: "diploma-formacion-laboral",
        titulo: "Diplomado en Andragogía",
        institucion: "Universidad de Chile",
        periodo: "2025 - 2026",
        anioFin: 2026,
        duracion: "120 horas cronológicas",
        estado: "Titulado",
        jerarquia: "intermedio",
        categoria: "diplomado",
        icono: "psychology",
        descripcion: "Diplomado orientado a fortalecer las competencias teóricas, metodológicas y evaluativas de instructores enfocados en la formación para el trabajo.",
        logros: [
            "Liderazgo y comunicación en la formación para el trabajo",
            "Diseño de estrategias metodológicas por perfil y contexto",
            "Diseño de evaluaciones para medir el aprendizaje laboral"
        ],
        etiquetas: ["Formación Laboral", "Liderazgo", "Evaluación", "Empleabilidad"]
    },
    {
        id: "diplomado-diseno-instruccional",
        titulo: "Diplomado en Diseño Instruccional",
        institucion: "Instituto Profesional IPLACEX",
        periodo: "2024 - 2025",
        anioFin: 2025,
        duracion: "90 horas",
        estado: "Titulado",
        jerarquia: "intermedio",
        categoria: "diplomado",
        icono: "developer_board",
        descripcion: "Diseño de experiencias de aprendizaje: definición de objetivos, secuenciación de contenidos y construcción de material didáctico coherente con el perfil de egreso.",
        logros: [],
        etiquetas: ["Diseño Instruccional", "Material Didáctico"]
    },
    {
        id: "diplomado-diseno-curricular",
        titulo: "Diplomado en Diseño Curricular",
        institucion: "Instituto Profesional IPLACEX",
        periodo: "2024 - 2025",
        anioFin: 2025,
        duracion: "90 horas",
        estado: "Titulado",
        jerarquia: "intermedio",
        categoria: "diplomado",
        icono: "account_tree",
        descripcion: "Construcción y articulación de planes de estudio: perfiles de egreso, mapas curriculares y alineación entre competencias, contenidos y evaluación.",
        logros: [],
        etiquetas: ["Diseño Curricular", "Perfiles de Egreso"]
    },
    {
        id: "diplomado-docencia-virtual",
        titulo: "Diplomado en Docencia Virtual",
        institucion: "Instituto Profesional IPLACEX",
        periodo: "2025",
        anioFin: 2025,
        duracion: "90 horas",
        estado: "Titulado",
        jerarquia: "intermedio",
        categoria: "diplomado",
        icono: "cast_for_education",
        descripcion: "Enseñanza en entornos virtuales: mediación pedagógica a distancia, uso de plataformas de gestión del aprendizaje y estrategias de acompañamiento en línea.",
        logros: [],
        etiquetas: ["Docencia Virtual", "Entornos Digitales"]
    },
    {
        id: "tecnico-analista-programador",
        titulo: "Técnico Analista Programador",
        institucion: "Universidad Tecnológica de Chile INACAP",
        periodo: "2007 - 2011",
        anioFin: 2011,
        duracion: "",
        estado: "Titulado",
        jerarquia: "intermedio",
        categoria: "tecnica",
        icono: "terminal",
        descripcion: "Formación técnica de nivel superior en análisis y programación, base de toda mi trayectoria posterior en desarrollo e instrucción.",
        logros: [
            "Titulado con Honores — Mejor Técnico",
            "Mejor calificación en el Examen Final"
        ],
        etiquetas: ["Programación", "Análisis de Sistemas"]
    },
    {
        id: "mencion-mejor-ingeniero",
        titulo: "Mejor Ingeniero en Informática",
        institucion: "Universidad Tecnológica de Chile INACAP",
        periodo: "2011",
        anioFin: 2011,
        duracion: "",
        estado: "Distinción",
        jerarquia: "menor",
        categoria: "reconocimiento",
        icono: "military_tech",
        descripcion: "",
        logros: [],
        etiquetas: []
    },
    {
        id: "mencion-mejor-tecnico",
        titulo: "Mejor Técnico Analista Programador",
        institucion: "Universidad Tecnológica de Chile INACAP",
        periodo: "2011",
        anioFin: 2011,
        duracion: "",
        estado: "Distinción",
        jerarquia: "menor",
        categoria: "reconocimiento",
        icono: "military_tech",
        descripcion: "",
        logros: [],
        etiquetas: []
    },
    {
        id: "mencion-tutor-academico",
        titulo: "Alumno Tutor Académico",
        institucion: "Universidad Tecnológica de Chile INACAP",
        periodo: "2007 - 2011",
        anioFin: 2011,
        duracion: "",
        estado: "Distinción",
        jerarquia: "menor",
        categoria: "reconocimiento",
        icono: "groups",
        descripcion: "",
        logros: [],
        etiquetas: []
    }
];