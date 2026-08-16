// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Riel de tecnologías (Fase 5.3)
// Modos por rango de dispositivo, ritmo de la cinta y textos del panel.
// No contiene contenido ni lógica.
// =========================================

export const tecnologiasUI = {
    // Estrategia de degradación obligatoria (5.3.4)
    //   riel      cinta en movimiento continuo, con pausa al posar el cursor
    //   deslizar  cinta desplazable a mano, sin movimiento automático
    //   rejilla   rejilla estática filtrable; sin movimiento
    consultaRiel: "(min-width: 1024px)",
    consultaDeslizar: "(min-width: 768px)",

    // Duración de una vuelta completa. A mayor número, más lento.
    duracionVuelta: "70s",

    textos: {
        ayuda: "Elige una tecnología para ver dónde la aplico y dónde la enseño.",
        pausar: "Pausar",
        reanudar: "Reanudar",
        cerrar: "Cerrar",
        proyectos: "Proyectos",
        cursos: "Dónde la enseño",
        certificaciones: "Certificaciones",
        sinProyectos: "Sin proyectos publicados: por ahora la aplico en docencia y certificación.",
        anios: (n) => (n === 1 ? "1 año de uso" : `${n} años de uso`)
    },

    iconos: {
        pausar: "pause",
        reanudar: "play_arrow",
        cerrar: "close",
        proyecto: "folder_open",
        curso: "school",
        certificacion: "verified"
    }
};