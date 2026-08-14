// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Animaciones
// Parámetros de la librería de animación al scroll y de la garantía de legibilidad.
// =========================================

export const animacionUI = {
    duracion: 600,            // milisegundos
    unaVez: true,             // la animación ocurre una sola vez al hacer scroll
    curva: 'ease-out-quad'
};

export const animacionGarantia = {
    // Margen que se le da a la librería para inicializarse antes de revelar
    // todo el contenido por la fuerza. Debe coincidir con el guardián en línea
    // del <head> de cada documento.
    margenMs: 1500,
    claseIniciada: 'aos-iniciado',
    claseDesactivadas: 'animaciones-desactivadas'
};