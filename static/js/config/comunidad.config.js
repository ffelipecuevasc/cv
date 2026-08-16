// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Comunidad (Fase 5.5)
// Parámetros del componente de discusiones y textos de la sección.
// No contiene contenido ni lógica.
// =========================================

export const comunidadUI = {
    // Identificadores públicos del repositorio de comunidad. No son claves secretas:
    // están pensados para ir escritos en el código de una página web.
    giscus: {
        origen: "https://giscus.app",
        script: "https://giscus.app/client.js",
        repo: "ffelipecuevasc/comunidad",
        repoId: "R_kgDOT6gwGg",
        categoria: "Dudas por ruta",
        categoriaId: "DIC_kwDOT6gwGs4DDiHV",
        idioma: "es",
        // El tema oscuro es transparente para que el componente se apoye sobre
        // la superficie de cristal del sitio en vez de pintar su propio fondo.
        temaClaro: "light",
        temaOscuro: "transparent_dark"
    },

    // El componente no se carga hasta que el visitante se aproxima a la sección.
    margenCarga: "400px",

    enlaces: {
        discusiones: "https://github.com/ffelipecuevasc/comunidad/discussions",
        normas: "https://github.com/ffelipecuevasc/comunidad/blob/main/README.md",
        cuenta: "https://github.com/signup"
    },

    textos: {
        cargando: "Cargando la conversación…",
        aviso: "La conversación se aloja en GitHub Discussions. Para participar necesitas una cuenta de GitHub; leer no requiere ninguna.",
        alternativa: "Abrir la conversación en GitHub"
    }
};