// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Eventos
// Insignias de estado, textos de interfaz, botones y formato de fecha.
// No contiene contenido ni lógica.
// =========================================

export const eventosUI = {
    // Insignia superpuesta en la portada. El estado se calcula en tiempo de ejecución.
    estados: {
        proximo: {texto: "Próximo", icono: "event_upcoming", clase: "bg-primary"},
        finalizado: {texto: "Finalizado", icono: "event_available", clase: "bg-orient-800 dark:bg-orient-700"}
    },

    // Insignias cortas sobre el título
    insignias: {
        modalidad: {icono: "computer"},
        costo: {icono: "money_off"},
        clase: "etiqueta-categoria inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary dark:text-primary-vibrant"
    },

    // Datos de agenda
    iconos: {
        fecha: "calendar_month",
        plataforma: "videocam",
        temario: "check_small",
        plus: "card_giftcard",
        cupos: "group"
    },

    acciones: {
        inscripcion: {texto: "Inscribirme en Luma", icono: "open_in_new"},
        foro: {texto: "Ver conversación en el foro", icono: "forum"}
    },

    temarioTitulo: "¿Qué veremos en la sesión?",

    vacio: {
        icono: "event_busy",
        mensaje: "No hay eventos programados por el momento. Vuelve pronto.",
        clases: "text-center py-10"
    },

    // Fecha visible: "sábado, 3 de octubre de 2026"
    fecha: {
        idioma: "es-CL",
        formato: {weekday: "long", day: "numeric", month: "long", year: "numeric"}
    },

    // Desfase fijo con que se interpreta la hora de término al calcular el estado
    desfaseHorario: "-03:00",

    retardoPorTarjeta: 100,
    retardoMaximo: 300
};
