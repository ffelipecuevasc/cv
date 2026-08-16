// =========================================
// CAPA DE LÓGICA Y VISTA — Comunidad (Fase 5.5)
// Expone: montarDiscusion(), iniciarComunidad()
//
// Integra GitHub Discussions mediante Giscus: gratuito, de código abierto, sin
// publicidad y sin rastreo de terceros.
//
// Tres exigencias del plan resueltas acá:
//   · Carga diferida obligatoria: el marco embebido no se pide hasta que el
//     visitante se aproxima a la sección.
//   · Reserva de espacio: el contenedor mantiene su altura antes de la carga,
//     de modo que el contenido inferior no se desplace.
//   · Sincronización de tema en vivo, apoyada en el evento que emite el
//     servicio de tema desde la Fase 3.3.
// =========================================

import {comunidadUI} from './config/comunidad.config.js';
import {alCambiarTema} from './servicios/tema.js';

const {giscus} = comunidadUI;
const montados = new Set();

const temaDe = (tema) => (tema === 'dark' ? giscus.temaOscuro : giscus.temaClaro);

/** Propaga el cambio de tema a todos los marcos ya cargados. */
function sincronizarTema(tema) {
    document.querySelectorAll('iframe.giscus-frame').forEach((marco) => {
        if (!marco.contentWindow) return;
        marco.contentWindow.postMessage(
            {giscus: {setConfig: {theme: temaDe(tema)}}},
            giscus.origen
        );
    });
}

function inyectar(contenedor, termino) {
    const guion = document.createElement('script');
    guion.src = giscus.script;
    guion.async = true;
    guion.crossOrigin = 'anonymous';

    const atributos = {
        'data-repo': giscus.repo,
        'data-repo-id': giscus.repoId,
        'data-category': giscus.categoria,
        'data-category-id': giscus.categoriaId,
        'data-mapping': termino ? 'specific' : 'pathname',
        'data-strict': '0',
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-input-position': 'bottom',
        'data-lang': giscus.idioma,
        'data-loading': 'lazy',
        'data-theme': temaDe(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    };
    if (termino) atributos['data-term'] = termino;

    Object.entries(atributos).forEach(([clave, valor]) => guion.setAttribute(clave, valor));

    // El marcador de carga se retira recién cuando el marco existe, para que el
    // hueco reservado nunca quede vacío.
    const marcador = contenedor.querySelector('[data-comunidad-marcador]');
    const observador = new MutationObserver(() => {
        if (contenedor.querySelector('iframe.giscus-frame')) {
            if (marcador) marcador.remove();
            observador.disconnect();
        }
    });
    observador.observe(contenedor, {childList: true, subtree: true});

    contenedor.appendChild(guion);
}

/**
 * Monta una conversación dentro de un contenedor.
 * @param {Element|null} contenedor
 * @param {string} [termino] identificador del hilo; sin él se usa la ruta de la página
 */
export function montarDiscusion(contenedor, termino) {
    if (!contenedor || montados.has(contenedor)) return;
    montados.add(contenedor);

    const cargar = () => inyectar(contenedor, termino);

    if (typeof IntersectionObserver !== 'function') {
        cargar();
        return;
    }

    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            obs.disconnect();
            cargar();
        });
    }, {rootMargin: comunidadUI.margenCarga});

    observador.observe(contenedor);
}

/** Punto de entrada de la página de comunidad. */
export function iniciarComunidad() {
    // Suscripción única al servicio de tema: cubre esta página y los hilos por ruta.
    alCambiarTema(sincronizarTema);

    document.querySelectorAll('[data-comunidad]').forEach((contenedor) => {
        montarDiscusion(contenedor, contenedor.dataset.comunidad || undefined);
    });
}