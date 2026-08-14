// =========================================
// SERVICIO DE NAVEGACIÓN
// Expone: iniciarNavegacion()
// Cubre el armazón del sitio: menú móvil, desplegables del encabezado,
// botón de retorno al inicio y detalles del pie.
//
// El marcado de página activa NO se resuelve acá: desde la Fase 2.1 se declara
// estáticamente en cada documento con aria-current="page" y sus clases,
// justamente para no depender de JavaScript.
// =========================================

import {movimientoReducido} from './animacion.js';

const RETARDO_CIERRE_MENU = 500; // debe coincidir con la transición de altura del menú
const UMBRAL_VOLVER_ARRIBA = 300;

function iniciarMenuMovil() {
    const boton = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icono = document.getElementById('menu-icon');
    if (!boton || !menu) return;

    boton.addEventListener('click', () => {
        const estaCerrado = menu.classList.contains('max-h-0');

        if (estaCerrado) {
            menu.classList.remove('max-h-0', 'border-b-0');
            menu.classList.add('max-h-[800px]', 'border-b');
            if (icono) {
                icono.textContent = 'close';
                icono.classList.add('rotate-90');
            }
            boton.setAttribute('aria-expanded', 'true');
            boton.setAttribute('aria-label', 'Cerrar menú');
            // Fase 2.3: el menú vuelve al orden de tabulación al abrirse.
            menu.removeAttribute('inert');
        } else {
            menu.classList.add('max-h-0', 'border-b-0');
            menu.classList.remove('max-h-[800px]', 'border-b');
            if (icono) {
                icono.textContent = 'menu';
                icono.classList.remove('rotate-90');
            }
            boton.setAttribute('aria-expanded', 'false');
            boton.setAttribute('aria-label', 'Abrir menú');
            // Fase 2.3: colapsado, sus enlaces salen del orden de tabulación.
            // Se difiere hasta el término de la transición para no cortar la animación.
            setTimeout(() => {
                if (menu.classList.contains('max-h-0')) menu.setAttribute('inert', '');
            }, RETARDO_CIERRE_MENU);
        }
    });
}

function iniciarDesplegables() {
    // El panel se revela por CSS con group-hover y group-focus-within.
    // Acá solo se sincroniza el estado declarado para tecnologías asistivas (Fase 2.3 / H-10).
    document.querySelectorAll('[data-dropdown]').forEach((desplegable) => {
        const disparador = desplegable.querySelector('[aria-haspopup="true"]');
        if (!disparador) return;

        const declararEstado = (abierto) => disparador.setAttribute('aria-expanded', String(abierto));

        desplegable.addEventListener('mouseenter', () => declararEstado(true));
        desplegable.addEventListener('mouseleave', () => {
            if (!desplegable.contains(document.activeElement)) declararEstado(false);
        });
        desplegable.addEventListener('focusin', () => declararEstado(true));
        desplegable.addEventListener('focusout', (evento) => {
            if (!desplegable.contains(evento.relatedTarget)) declararEstado(false);
        });
    });
}

function iniciarVolverArriba() {
    const boton = document.getElementById('back-to-top');
    if (!boton) return;

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > UMBRAL_VOLVER_ARRIBA;
        boton.classList.toggle('opacity-0', !visible);
        boton.classList.toggle('invisible', !visible);
        boton.classList.toggle('opacity-100', visible);
        boton.classList.toggle('visible', visible);
    });

    boton.addEventListener('click', () => {
        // Fase 3.4: el desplazamiento automático se vuelve instantáneo si el
        // sistema pide movimiento reducido.
        window.scrollTo({top: 0, behavior: movimientoReducido() ? 'auto' : 'smooth'});
    });
}

function iniciarAnioDinamico() {
    const anio = document.getElementById('current-year');
    if (anio) anio.textContent = new Date().getFullYear();
}

export function iniciarNavegacion() {
    iniciarMenuMovil();
    iniciarDesplegables();
    iniciarAnioDinamico();
    iniciarVolverArriba();
}