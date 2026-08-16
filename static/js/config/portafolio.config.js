// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Portafolio
// Pastillas por categoría, botones de acción y maquetación de la rejilla bento.
// No contiene contenido ni lógica.
// =========================================

export const portafolioUI = {
    // Identidad visual de cada categoría: pastilla superior y color del botón de acción
    categorias: {
        frontend: {
            pastilla: {icono: "web", texto: "Front-End", clase: "bg-primary"},
            accionClase: "bg-primary"
        },
        backend: {
            pastilla: {icono: "api", texto: "Back-End", clase: "bg-orient-800 dark:bg-orient-700"},
            accionClase: "bg-orient-700"
        }
    },

    // Botón sobre la imagen: se deriva del destino, no se declara proyecto a proyecto.
    acciones: {
        repositorio: {icono: "code", texto: "Ver Repositorio"},
        sitio: {icono: "open_in_new", texto: "Ver Proyecto"}
    },

    // Ritmo de la rejilla bento: se repite cada seis tarjetas, de modo que agregar
    // un proyecto no obliga a declarar su ancho.
    patronAncho: [
        "col-span-12 md:col-span-7",
        "col-span-12 md:col-span-5",
        "col-span-12 md:col-span-5",
        "col-span-12 md:col-span-7",
        "col-span-12 md:col-span-6",
        "col-span-12 md:col-span-6"
    ],
    retardoPorTarjeta: 50,
    tarjetasPorCiclo: 6,

    // Clases de las etiquetas de tecnología
    etiquetaClase: "px-2 py-1 bg-orient-100 dark:bg-white/5 dark:border dark:border-white/10 text-orient-700 dark:text-orient-300 text-[10px] font-bold rounded uppercase tracking-wider"
};