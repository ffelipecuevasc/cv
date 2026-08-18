// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Muro de tecnologías (Fase 5.3)
// Textos e iconos del panel de contexto. No contiene contenido ni lógica.
// =========================================

export const tecnologiasUI = {
    textos: {
        ayuda: "Elige una tecnología para ver dónde la aplico y dónde la enseño.",
        cerrar: "Cerrar",
        proyectos: "Proyectos",
        cursos: "Dónde la enseño",
        certificaciones: "Certificaciones",
        sinProyectos: "Sin proyectos publicados: por ahora la aplico en docencia y certificación.",
        anios: (n) => (n === 1 ? "1 año de uso" : `${n} años de uso`)
    },

    iconos: {
        indicador: "expand_more",
        cerrar: "close",
        proyecto: "folder_open",
        curso: "school",
        certificacion: "verified"
    }
};