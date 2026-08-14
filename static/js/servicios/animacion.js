// =========================================
// SERVICIO DE ANIMACIÓN
// Expone: iniciarAnimacion(), refrescarAnimacion(), hayAnimaciones(),
//         movimientoReducido(), revelarContenido(), iniciarLinterna()
//
// Capa delgada sobre la librería de animación al scroll: es el único punto del
// proyecto que la toca. Los motores de contenido piden un refresco a través de
// refrescarAnimacion() y nunca conocen a la librería.
//
// Fase 3.4: el contenido es legible siempre. Si la librería no está, si falla o
// si el sistema pide movimiento reducido, se revela todo y no se anima nada.
// =========================================

import {animacionUI, animacionGarantia} from '../config/animacion.config.js';

const raiz = document.documentElement;

/** ¿Está disponible la librería de animación? */
export function hayAnimaciones() {
    return typeof AOS !== 'undefined';
}

/** ¿El sistema operativo pide movimiento reducido? */
export function movimientoReducido() {
    return typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Revela todo el contenido animado y desactiva futuras animaciones de entrada.
 * Actúa sobre una clase del documento, así que también cubre el contenido que
 * los motores inyecten más adelante.
 */
export function revelarContenido() {
    raiz.classList.add(animacionGarantia.claseDesactivadas);
}

/** Marca que la librería quedó operativa, para que el guardián del <head> se desactive. */
function marcarIniciada() {
    raiz.classList.add(animacionGarantia.claseIniciada);
}

/**
 * Inicializa la librería con los parámetros del sistema de diseño.
 * Si no procede animar, revela el contenido y termina.
 */
export function iniciarAnimacion() {
    if (movimientoReducido()) {
        revelarContenido();
        marcarIniciada(); // decisión tomada: el guardián ya no debe intervenir
        return;
    }

    if (!hayAnimaciones()) {
        // La librería no cargó: el contenido no puede quedar invisible.
        revelarContenido();
        marcarIniciada();
        return;
    }

    try {
        AOS.init({
            duration: animacionUI.duracion,
            once: animacionUI.unaVez,
            easing: animacionUI.curva
        });
    } catch (error) {
        console.error('Servicio de animación: la librería falló al inicializarse.', error);
        revelarContenido();
        marcarIniciada();
        return;
    }

    marcarIniciada();
    verificarGarantia();
}

/**
 * Segunda red de seguridad: si pasado el margen la librería no marcó ningún
 * elemento, se revela todo igual. Cubre el caso de una librería presente que
 * no llega a procesar el documento.
 */
function verificarGarantia() {
    setTimeout(() => {
        const animables = document.querySelector('[data-aos]');
        if (!animables) return;
        if (document.querySelector('[data-aos].aos-init')) return;

        console.warn('Servicio de animación: la librería no procesó el contenido. Se revela por garantía.');
        revelarContenido();
    }, animacionGarantia.margenMs);
}

/** Recalcula posiciones tras inyectar contenido nuevo en el documento. */
export function refrescarAnimacion() {
    if (movimientoReducido() || !hayAnimaciones()) {
        // Sin animaciones, el contenido recién inyectado debe quedar visible igual.
        revelarContenido();
        return;
    }

    try {
        AOS.refreshHard();
    } catch (error) {
        console.error('Servicio de animación: falló el refresco. Se revela el contenido.', error);
        revelarContenido();
    }
}

/**
 * Efecto linterna del modo claro: sigue el puntero mediante variables CSS.
 * Vive en este servicio porque es movimiento, y como tal queda sujeto a la
 * preferencia de movimiento reducido.
 */
export function iniciarLinterna() {
    if (movimientoReducido()) return;

    const capa = document.getElementById('flashlight-layer');
    if (!capa) return;

    let cuadroPendiente = null;

    document.addEventListener('mousemove', (evento) => {
        // Se descarta el cuadro anterior si aún no se pintó, para no encolar trabajo.
        if (cuadroPendiente) cancelAnimationFrame(cuadroPendiente);

        cuadroPendiente = requestAnimationFrame(() => {
            capa.style.setProperty('--mouse-x', `${evento.clientX}px`);
            capa.style.setProperty('--mouse-y', `${evento.clientY}px`);
        });
    }, {passive: true});
}