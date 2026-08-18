// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Máquinas de escribir
// Ritmo, enganches y clases. El motor no fija ningún número por su cuenta.
// =========================================

export const maquinaUI = {
    // El valor del atributo nombra el conjunto de frases: explícito y greppable.
    atributo: "data-maquina",

    // Una ranura dentro de este contenedor la gobierna el conmutador del hero;
    // cualquier otra (el logotipo) arranca por su cuenta.
    selectorGobernado: "[data-perfil-titulo]",

    // Ritmo por omisión (ms). Calibrado para lectura cómoda, no para lucimiento.
    ritmo: {
        arranqueMs: 0,          // demora antes del primer borrado
        escrituraMs: 68,        // base entre carácter y carácter al escribir
        variacionMs: 34,        // jitter aleatorio: evita el sonsonete mecánico
        borradoMs: 32,          // borrar siempre más rápido que escribir
        esperaCompletaMs: 2000, // frase completa en pantalla antes de borrarla
        esperaVaciaMs: 420      // respiro entre el borrado y la frase siguiente
    },

    // Ajustes por ranura. El logotipo va deliberadamente más lento y entra más
    // tarde: dos máquinas tecleando al unísono en la misma pantalla compiten
    // entre sí y ninguna se lee bien.
    ritmos: {
        logotipo: {
            arranqueMs: 1400,
            escrituraMs: 84,
            borradoMs: 42,
            esperaCompletaMs: 3600,
            esperaVaciaMs: 500
        }
    },

    clases: {
        contenedor: "maquina",
        medida: "maquina-medida",
        texto: "maquina-texto",
        tecleando: "maquina--tecleando"
    }
};