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
        // Banda a todo el ancho: al ser horizontal en pantallas amplias, no crece en alto.
        ancho: "col-span-12",
        plantilla: "destacada",
        muestraDescripcion: true,
        muestraLogros: true,
        muestraEtiquetas: true
    },
    intermedio: {
        orden: 2,
        ancho: "col-span-12 md:col-span-6 lg:col-span-4",
        plantilla: "estandar",
        relleno: "p-5 md:p-6",
        tamanoTitulo: "text-lg md:text-xl",
        tamanoAnio: "text-2xl",
        muestraDescripcion: true,
        muestraLogros: true,
        muestraEtiquetas: true
    },
    menor: {
        orden: 3,
        ancho: "col-span-12 md:col-span-6 lg:col-span-4",
        plantilla: "compacta",
        relleno: "p-4",
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
    reconocimiento: {
        etiqueta: "Reconocimiento",
        pastilla: "bg-orient-950/5 dark:bg-white/10 text-orient-700 dark:text-orient-200"
    }
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