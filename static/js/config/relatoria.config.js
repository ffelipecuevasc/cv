// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Relatoría (instructor.html)
// Ritmo de animación, icono de periodo y estado vacío.
// No contiene contenido ni lógica.
// =========================================

export const relatoriaUI = {
    // Escalonado de entrada: se repite cada dos tarjetas, una por columna de la rejilla.
    retardoPorTarjeta: 100,
    tarjetasPorCiclo: 2,

    iconoPeriodo: "event",

    vacio: {
        icono: "school",
        mensaje: "No hay experiencias registradas todavía.",
        clases: "col-span-1 md:col-span-2 text-center py-10"
    }
};
