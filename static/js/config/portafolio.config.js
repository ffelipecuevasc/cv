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

    // Botón que aparece sobre la imagen al pasar el cursor, por proyecto
    acciones: {
        "pf-card-cv": {icono: "open_in_new", texto: "Ver Proyecto"},
        "pf-card-manza": {icono: "terminal", texto: "Ver Proyecto"},
        "pf-card-ricardo": {icono: "terminal", texto: "Ver Proyecto"},
        "pf-card-abogados": {icono: "web", texto: "Ver Proyecto"},
        "pf-card-benjamin": {icono: "open_in_new", texto: "Ver Proyecto"},
        "pf-card-gestion": {icono: "open_in_new", texto: "Ver Repositorio"}
    },
    accionPorDefecto: {icono: "open_in_new", texto: "Ver Proyecto"},

    // Ancho de cada bloque en la rejilla bento y retardo de su animación de entrada
    maquetacion: {
        "pf-card-cv": {ancho: "col-span-12 md:col-span-7", retardo: 0},
        "pf-card-manza": {ancho: "col-span-12 md:col-span-5", retardo: 100},
        "pf-card-ricardo": {ancho: "col-span-12 md:col-span-5", retardo: 150},
        "pf-card-abogados": {ancho: "col-span-12 md:col-span-7", retardo: 200},
        "pf-card-benjamin": {ancho: "col-span-12 md:col-span-6", retardo: 250},
        "pf-card-gestion": {ancho: "col-span-12 md:col-span-6", retardo: 300}
    },
    maquetacionPorDefecto: {ancho: "col-span-12 md:col-span-6", retardo: 0},

    // Clases de las etiquetas de tecnología
    etiquetaClase: "px-2 py-1 bg-orient-100 dark:bg-white/5 dark:border dark:border-white/10 text-orient-700 dark:text-orient-300 text-[10px] font-bold rounded uppercase tracking-wider"
};