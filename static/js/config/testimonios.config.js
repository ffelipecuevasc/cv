// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Testimonios
// Iconografía, ritmo del carrusel y sustituto de imagen.
// No contiene contenido ni lógica.
// =========================================

export const testimoniosUI = {
    autoplayMs: 6000,
    transicionMs: 300,
    cantidadEstrellas: 5,
    iconos: {
        estrella: "star",
        cita: "format_quote"
    },
    // Colores del avatar sustituto cuando la fotografía no carga.
    // La construcción de la URL vive en el servicio de resiliencia.
    avatarSustituto: {
        estandar: {fondo: "007EA7", texto: "fff"},
        destacado: {fondo: "ffffff", texto: "007EA7"}
    }
};