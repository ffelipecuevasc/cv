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
        id: "diplomado-andragogia",
        titulo: "Diplomado en Andragogía y Formación Profesional",
        institucion: "Universidad de Chile",
        periodo: "2025 - 2026",
        anioFin: 2026,
        estado: "Titulado",
        jerarquia: "intermedio",
        categoria: "diplomado",
        icono: "psychology",
        descripcion: "Diplomado centrado en la educación de jóvenes adultos. Formación que me capacitó como líder de grupos de estudiantes y tutor en el ámbito de la empleabilidad.",
        logros: [],
        etiquetas: ["Liderazgo", "Aprendizaje Basado en Proyectos", "Empleabilidad"]
    },
    {
        id: "tecnico-analista-programador",
        titulo: "Técnico Analista Programador",
        institucion: "Universidad Tecnológica de Chile INACAP",
        periodo: "2007 - 2011",
        anioFin: 2011,
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
        estado: "Distinción",
        jerarquia: "menor",
        categoria: "reconocimiento",
        icono: "groups",
        descripcion: "",
        logros: [],
        etiquetas: []
    }
];