// =========================================
// SERVICIO DE TEMA
// Expone: iniciarTema(), temaActual(), aplicarTema(), alternarTema(), alCambiarTema()
//
// La prevención del parpadeo inicial NO vive acá: es un script en línea dentro del
// <head> de cada documento, porque debe ejecutarse antes del primer pintado y los
// módulos son diferidos por definición. Este servicio es la única fuente de verdad
// para todo lo demás.
// =========================================

const CLAVE = 'theme';
const CLASE_OSCURO = 'dark';
const CLASE_TRANSICION = 'theme-transitioning';
const DURACION_TRANSICION = 400;

const raiz = document.documentElement;
const oyentes = new Set();

/** Devuelve 'dark' o 'light' según el estado real del documento. */
export function temaActual() {
    return raiz.classList.contains(CLASE_OSCURO) ? 'dark' : 'light';
}

function invocar(oyente, tema) {
    try {
        oyente(tema);
    } catch (error) {
        console.error('Servicio de tema: un suscriptor falló y fue ignorado.', error);
    }
}

function notificar(tema) {
    oyentes.forEach((oyente) => invocar(oyente, tema));
    // Evento del DOM para consumidores externos al grafo de módulos
    // (requisito de la Fase 5.5: el widget de comunidad debe seguir al tema del sitio).
    document.dispatchEvent(new CustomEvent('tema:cambiado', {detail: {tema}}));
}

/**
 * Aplica un tema.
 * @param {'dark'|'light'} tema
 * @param {{persistir?: boolean, animar?: boolean}} opciones
 */
export function aplicarTema(tema, {persistir = true, animar = true} = {}) {
    const oscuro = tema === 'dark';

    if (animar) {
        raiz.classList.add(CLASE_TRANSICION);
        setTimeout(() => raiz.classList.remove(CLASE_TRANSICION), DURACION_TRANSICION);
    }

    raiz.classList.toggle(CLASE_OSCURO, oscuro);

    if (persistir) {
        try {
            localStorage.setItem(CLAVE, oscuro ? 'dark' : 'light');
        } catch (error) {
            // Modo privado o almacenamiento bloqueado: el tema igual se aplica en esta sesión.
        }
    }

    notificar(temaActual());
}

/** Conmuta entre claro y oscuro. */
export function alternarTema() {
    aplicarTema(temaActual() === 'dark' ? 'light' : 'dark');
}

/**
 * Suscribe una función a los cambios de tema. Se invoca de inmediato con el tema vigente.
 * @returns {Function} función para cancelar la suscripción
 */
export function alCambiarTema(oyente) {
    oyentes.add(oyente);
    invocar(oyente, temaActual());
    return () => oyentes.delete(oyente);
}

/** Activa el botón de conmutación del encabezado. */
export function iniciarTema() {
    const boton = document.getElementById('theme-toggle');
    if (!boton) return;

    boton.addEventListener('click', () => alternarTema());
}