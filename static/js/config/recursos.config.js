// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Bóveda de recursos
// Diccionarios de iconos, colores por categoría y textos de acción.
// No contiene contenido ni lógica.
// =========================================

export const recursosUI = {
    formato: {
        "pdf": { icon: "picture_as_pdf", bgClass: "bg-red-100 dark:bg-red-900/30", textClass: "text-red-600 dark:text-red-400", btnText: "Descargar", btnIcon: "download" },
        "github": { icon: "folder_zip", bgClass: "bg-gray-100 dark:bg-gray-800", textClass: "text-gray-700 dark:text-gray-300", btnText: "Ver Repo", btnIcon: "open_in_new" },
        "video": { icon: "play_circle", bgClass: "bg-blue-100 dark:bg-blue-900/30", textClass: "text-blue-600 dark:text-blue-400", btnText: "Ver Clase", btnIcon: "play_arrow" }
    },
    dificultad: {
        "Básico": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/50",
        "Intermedio": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50",
        "Avanzado": "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50"
    }
};