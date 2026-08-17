// =========================================
// SERVICIO DE REACTIVIDAD — Spotlight interactivo y volumetría 3D
// Expone: iniciarTarjetasReactivas()
//
// Puente entre el cursor y el CSS: no altera el diseño de ninguna tarjeta,
// solo inyecta cuatro variables personalizadas en su atributo style.
//   --mouse-x / --mouse-y   posición del cursor dentro de la tarjeta, en %
//   --rotate-x / --rotate-y grados de inclinación según la distancia al centro
//
// Exclusivo del modo claro: en oscuro manda el Neon Accent System y el motor
// se detiene para no gastar trabajo en variables que nadie lee.
// =========================================

import {movimientoReducido} from './animacion.js';

const SELECTOR = '.tarjeta-reactiva';
const CLASE_SEGUIMIENTO = 'siguiendo';
const GRADOS = 7;

const raiz = document.documentElement;
const esOscuro = () => raiz.classList.contains('dark');

function reposo(tarjeta) {
    tarjeta.classList.remove(CLASE_SEGUIMIENTO);
    tarjeta.style.setProperty('--mouse-x', '50%');
    tarjeta.style.setProperty('--mouse-y', '50%');
    tarjeta.style.setProperty('--rotate-x', '0deg');
    tarjeta.style.setProperty('--rotate-y', '0deg');
}

export function iniciarTarjetasReactivas() {
    // La volumetría es movimiento del puntero: bajo preferencia de movimiento
    // reducido el motor ni siquiera se instala.
    if (movimientoReducido()) return;

    let cuadroPendiente = null;
    let ultima = null;

    // Delegación en el documento: las tarjetas de portafolio y de tecnologías
    // se construyen después de cargar la página, y las rejillas se rehacen al
    // filtrar. Escuchar arriba evita reinstalar oyentes en cada redibujado.
    document.addEventListener('mousemove', (evento) => {
        if (esOscuro()) return;

        const tarjeta = evento.target.closest(SELECTOR);

        if (!tarjeta) {
            if (ultima) {
                reposo(ultima);
                ultima = null;
            }
            return;
        }

        if (tarjeta !== ultima) {
            if (ultima) reposo(ultima);
            ultima = tarjeta;
        }

        // El cálculo se agrupa por cuadro de animación: con decenas de tarjetas
        // en pantalla, atender cada evento por separado satura el hilo principal.
        if (cuadroPendiente) cancelAnimationFrame(cuadroPendiente);
        const {clientX, clientY} = evento;

        cuadroPendiente = requestAnimationFrame(() => {
            const caja = tarjeta.getBoundingClientRect();
            if (caja.width === 0 || caja.height === 0) return;

            const x = (clientX - caja.left) / caja.width;
            const y = (clientY - caja.top) / caja.height;

            tarjeta.classList.add(CLASE_SEGUIMIENTO);
            tarjeta.style.setProperty('--mouse-x', `${(x * 100).toFixed(1)}%`);
            tarjeta.style.setProperty('--mouse-y', `${(y * 100).toFixed(1)}%`);
            // El eje X se invierte: el cursor arriba inclina la tarjeta hacia atrás.
            tarjeta.style.setProperty('--rotate-x', `${((y - 0.5) * -GRADOS).toFixed(2)}deg`);
            tarjeta.style.setProperty('--rotate-y', `${((x - 0.5) * GRADOS).toFixed(2)}deg`);
        });
    }, {passive: true});

    // Reseteo elegante: la salida por el borde de la ventana no dispara
    // mousemove sobre otro elemento, así que se cubre aparte.
    document.addEventListener('mouseleave', () => {
        if (ultima) {
            reposo(ultima);
            ultima = null;
        }
    }, {passive: true});
}