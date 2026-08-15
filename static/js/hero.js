// =========================================
// CAPA DE LÓGICA Y VISTA — Hero de identidad triple (Fase 5.1)
// Expone: iniciarHero()
//
// El contenido de los tres perfiles vive en el marcado, no acá: sin JavaScript
// el perfil por defecto queda completo y el conmutador permanece oculto.
// Este módulo solo decide cuál de los tres se muestra.
// =========================================

import {perfilesUI} from './config/perfiles.config.js';

const OCULTO = ['invisible', 'opacity-0'];

/** Lee el perfil pedido por la dirección, luego el recordado, luego el de por omisión. */
function perfilInicial(disponibles) {
    const desdeUrl = new URLSearchParams(window.location.search).get(perfilesUI.parametro);
    if (disponibles.includes(desdeUrl)) return desdeUrl;

    try {
        const recordado = localStorage.getItem(perfilesUI.clave);
        if (disponibles.includes(recordado)) return recordado;
    } catch (error) {
        // Almacenamiento no disponible: se continúa con el perfil por omisión.
    }

    return disponibles.includes(perfilesUI.porDefecto) ? perfilesUI.porDefecto : disponibles[0];
}

function recordar(perfil) {
    try {
        localStorage.setItem(perfilesUI.clave, perfil);
    } catch (error) {
        // Modo privado: la elección vale solo para esta sesión.
    }
}

/**
 * Refleja el perfil en la dirección sin agregar entradas al historial,
 * para que el enlace de la barra siempre sea compartible.
 */
function reflejarEnUrl(perfil) {
    const url = new URL(window.location.href);
    url.searchParams.set(perfilesUI.parametro, perfil);
    window.history.replaceState({}, '', url);
}

function alternarVisibilidad(elemento, visible) {
    elemento.classList.toggle(OCULTO[0], !visible);
    elemento.classList.toggle(OCULTO[1], !visible);
}

export function iniciarHero() {
    const conmutador = document.getElementById(perfilesUI.idConmutador);
    if (!conmutador) return;

    const lista = conmutador.querySelector('[role="tablist"]');
    const pestanas = lista ? [...lista.querySelectorAll('[role="tab"]')] : [];
    if (pestanas.length === 0) return;

    const disponibles = pestanas.map((p) => p.dataset.perfil);
    const bloques = disponibles.map((perfil) => ({
        perfil,
        piezas: [...document.querySelectorAll(
            `[data-perfil-titulo="${perfil}"], [data-perfil-panel="${perfil}"], [data-perfil-metricas="${perfil}"]`
        )]
    }));

    // El conmutador solo existe si hay JavaScript: sin él quedaría un control inerte.
    conmutador.removeAttribute('hidden');

    const mostrar = (perfil, {persistir = true} = {}) => {
        pestanas.forEach((pestana) => {
            const activa = pestana.dataset.perfil === perfil;
            pestana.setAttribute('aria-selected', String(activa));
            pestana.tabIndex = activa ? 0 : -1;
            pestana.classList.toggle('bg-primary', activa);
            pestana.classList.toggle('text-white', activa);
            pestana.classList.toggle('shadow-sm', activa);
            pestana.classList.toggle('text-orient-600', !activa);
            pestana.classList.toggle('dark:text-orient-300', !activa);
            pestana.classList.toggle('hover:text-primary', !activa);
        });

        bloques.forEach((bloque) => {
            const visible = bloque.perfil === perfil;
            bloque.piezas.forEach((pieza) => alternarVisibilidad(pieza, visible));
        });

        if (persistir) {
            recordar(perfil);
            reflejarEnUrl(perfil);
        }
    };

    pestanas.forEach((pestana) => {
        pestana.addEventListener('click', () => mostrar(pestana.dataset.perfil));
    });

    // Navegación por teclado propia del patrón de pestañas.
    lista.addEventListener('keydown', (evento) => {
        const actual = pestanas.indexOf(document.activeElement);
        if (actual === -1) return;

        const saltos = {ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1};
        let destino = null;

        if (evento.key in saltos) {
            destino = (actual + saltos[evento.key] + pestanas.length) % pestanas.length;
        } else if (evento.key === 'Home') {
            destino = 0;
        } else if (evento.key === 'End') {
            destino = pestanas.length - 1;
        }

        if (destino === null) return;
        evento.preventDefault();
        pestanas[destino].focus();
        mostrar(pestanas[destino].dataset.perfil);
    });

    // Estado inicial: no se refleja en la dirección para no reescribir una URL limpia.
    mostrar(perfilInicial(disponibles), {persistir: false});
}