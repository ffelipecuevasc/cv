// =========================================
// CAPA DE DATOS — Eventos (talleres, charlas y sesiones en vivo)
// Colección declarativa. Sin lógica, sin clases de presentación
// (salvo el énfasis <strong> inline, igual que en portafolio.datos.js).
//
// Campos por entrada:
//   fecha        "AAAA-MM-DD"
//   horaInicio   "HH:MM"  · horaTermino "HH:MM"  (hora de Chile continental, GMT-3)
//   descripcion  arreglo de párrafos
//   temario      arreglo de puntos del programa
//
// El estado (Próximo / Finalizado) no se guarda: se calcula en tiempo de
// ejecución a partir de fecha y horaTermino.
// Para agregar, quitar o editar eventos, este es el único archivo a tocar.
// =========================================

export const eventosData = [
    {
        id: "taller-vibe-coding-claude",
        titulo: "Del Vibe Coding a la Ingeniería Web",
        subtitulo: "Desarrolla tu web con Claude",
        fecha: "2026-10-03",
        horaInicio: "20:00",
        horaTermino: "21:00",
        zonaHoraria: "GMT-3",
        plataforma: "Google Meet",
        modalidad: "100% remoto",
        costo: "Gratuito",
        cupos: "Cupos limitados, inscripción sujeta a aprobación del organizador",
        plus: "Regalo: 20 cuentas PRO de WebStorm (JetBrains) al cierre de la charla",
        imagen: "static/img/eventos/2026-10-03-taller-claude.webp",
        ancho: 1000,
        alto: 1000,
        alt: "Portada del taller «Del Vibe Coding a la Ingeniería Web — Desarrolla tu web con Claude», dictado por Felipe Cuevas",
        enlaceInscripcion: "https://luma.com/uy7cr3yq",
        enlaceForo: "foro.html",
        descripcion: [
            "¿Alguna vez has sentido que la IA tira código a mil por hora, pero no tienes idea de lo que realmente pasa en tu proyecto? El <em>vibe coding</em> es entretenido para jugar un rato, para explorar... pero en el ámbito laboral necesitamos de criterio, arquitectura y buenas prácticas de ingeniería.",
            "La IA no viene a quitarte el volante: viene como tu copiloto técnico mientras tú tomas el rol de Líder Técnico. En este taller 100% online y gratuito aprenderás a configurar un flujo de trabajo profesional donde tú diriges la estrategia y dejas que <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Claude Code</strong> haga el trabajo pesado de programación, bajo tu supervisión.",
            "Está pensado especialmente para mi comunidad de egresados de bootcamps de Talento Digital para Chile, pero lo dejo abierto a cualquier dev junior que quiera subir el nivel de sus proyectos y empezar a usar la IA como un verdadero asistente. Usaremos el desarrollo en vivo de tu propia web de CV Online + Portafolio, dejándola lista y publicada en internet."
        ],
        temario: [
            "<strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">De la idea al requerimiento:</strong> fundamentos ágiles (SCRUM), definición de alcance, stack tecnológico y estructuración del plan de trabajo junto a la IA Claude.",
            "<strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Prototipo (MVP):</strong> creación del concepto visual de la landing page usando la IA Stitch (Google).",
            "<strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Setup de desarrollo:</strong> configuración en el IDE WebStorm (JetBrains), entorno con Node.js y compilación de Tailwind CSS.",
            "<strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Claude Code:</strong> instalación y uso de Claude Code (CLI), integración de plugins en el IDE y cómo preparar la carpeta de trabajo y contexto para que el agente ejecute con precisión quirúrgica.",
            "<strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">CI/CD y despliegue:</strong> repositorio en GitHub, automatización con GitHub Actions y despliegue final en GitHub Pages."
        ]
    }
];
