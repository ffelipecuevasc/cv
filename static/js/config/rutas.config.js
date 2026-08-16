// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Rutas de aprendizaje (Fase 5.4)
// Textos, iconos y parámetros de persistencia. No contiene contenido ni lógica.
// =========================================

export const rutasUI = {
    // Decisión 5.4.3: cada ruta es direccionable con enlace propio y compartible,
    // con el mismo esquema de parámetro que el conmutador del hero.
    parametro: "ruta",
    clave: "rutas-progreso",

    textos: {
        selector: "Elige tu ruta de aprendizaje",
        objetivo: "Qué logras",
        previos: "Conocimientos previos",
        duracion: "Duración estimada",
        progreso: (hechos, total) => `${hechos} de ${total} pasos completados`,
        completada: "Ruta completada",
        reiniciar: "Reiniciar progreso",
        marcar: "Marcar como completado",
        desmarcar: "Marcar como pendiente",
        descargar: "Descargar",
        ver: "Ver",
        buscador: "Buscar dentro de la ruta",
        sinResultados: "Ningún paso de esta ruta coincide con la búsqueda.",
        avisoLocal: "Tu progreso se guarda solo en este navegador y en este dispositivo. Si limpias los datos de navegación, se pierde."
    },

    iconos: {
        objetivo: "flag",
        previos: "checklist",
        duracion: "schedule",
        reiniciar: "restart_alt",
        completado: "check_circle",
        pendiente: "radio_button_unchecked",
        proximamente: "more_horiz"
    }
};