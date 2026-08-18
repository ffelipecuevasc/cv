// =========================================
// CAPA DE DATOS — Frases rotativas de las máquinas de escribir (Fase 5.1)
// Sin lógica. Este es el único archivo que hay que tocar para cambiar,
// añadir o quitar un mensaje (ver Manual de mantenimiento, 7.2).
//
// REGLA: la PRIMERA frase de cada conjunto debe coincidir literalmente con la
// escrita en su <span data-maquina> del marcado. Es la que ve quien navega sin
// JavaScript y la que indexan los buscadores. El ciclo es circular, así que
// empezar por ella no altera el orden de la rotación.
// =========================================

export const frasesMaquina = {
    instructor: [
        "Bootcamps de Programación",
        "Bootcamps de Talento Digital",
        "Bootcamps de IA",
        "Bootcamps Full Stack"
    ],
    docente: [
        "Desarrollo Full Stack",
        "Bases de Datos",
        "Desarrollo & IA",
        "Ciencia de Datos"
    ],
    desarrollador: [
        "Java & Spring",
        "Python & Django",
        "Web asistido con IA"
    ],
    logotipo: [
        "Felipe Cuevas",
        "Instructor Dev",
        "Dev Full Stack",
        "Instructor IA"
    ]
};