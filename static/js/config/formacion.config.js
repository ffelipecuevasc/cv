// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Bento académico (Fase 5.2)
// Traduce la jerarquía y la categoría de cada formación a tokens del sistema
// de diseño. No contiene contenido ni lógica.
// =========================================

// Peso visual por rango de dispositivo (5.2.5):
//   Móvil    → columna única para los tres pesos; la jerarquía la dan el orden y la densidad.
//   Tableta  → dos anchos posibles (8 y 4 de doce); la jerarquía la refuerza la altura del contenido.
//   Laptop   → los mismos dos anchos más una segunda fila para el bloque mayor: rejilla asimétrica.
export const jerarquiaUI = {
    mayor: {
        orden: 1,
        ancho: "col-span-12 md:col-span-8 lg:row-span-2",
        relleno: "p-6 md:p-8",
        tamanoTitulo: "text-2xl md:text-3xl",
        tamanoAnio: "text-3xl md:text-4xl",
        muestraDescripcion: true,
        muestraLogros: true,
        muestraEtiquetas: true
    },
    intermedio: {
        orden: 2,
        ancho: "col-span-12 md:col-span-4",
        relleno: "p-5 md:p-6",
        tamanoTitulo: "text-lg md:text-xl",
        tamanoAnio: "text-2xl",
        muestraDescripcion: true,
        muestraLogros: true,
        muestraEtiquetas: true
    },
    menor: {
        orden: 3,
        ancho: "col-span-12 md:col-span-4",
        relleno: "p-4 md:p-5",
        tamanoTitulo: "text-sm md:text-base",
        tamanoAnio: "text-lg",
        muestraDescripcion: false,
        muestraLogros: false,
        muestraEtiquetas: false
    }
};

// Naturaleza de la formación: filtro y pastilla de estado.
export const categoriaUI = {
    universitaria: {etiqueta: "Universitaria", pastilla: "bg-primary/10 text-primary"},
    diplomado: {etiqueta: "Diplomado", pastilla: "bg-primary/10 text-primary"},
    tecnica: {etiqueta: "Técnica", pastilla: "bg-orient-100 dark:bg-white/5 text-orient-600 dark:text-orient-300"},
    reconocimiento: {etiqueta: "Reconocimiento", pastilla: "bg-accent-gold/15 text-orient-700 dark:text-accent-gold"}
};

export const formacionTextos = {
    ordenes: {
        jerarquia: "Jerarquía",
        cronologia: "Cronología"
    },
    filtroTodos: "Todas",
    vacio: {
        icono: "school",
        mensaje: "No hay formaciones en esta categoría."
    }
};

export const formacionAnimacion = {
    retardoPorTarjeta: 60,
    tarjetasPorCiclo: 6
};