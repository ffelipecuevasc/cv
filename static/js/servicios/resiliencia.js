// =========================================
// SERVICIO DE RESILIENCIA (Fase 3.4 / H-06)
// Expone: ejecutarSeguro(), iniciarImagenesResilientes()
//
// Principio rector: ningún fallo parcial puede dejar una sección en blanco
// ni tumbar el resto de la página.
// =========================================

/**
 * Ejecuta una inicialización aislando sus fallos: si revienta, se informa en
 * consola y el resto del sitio sigue funcionando. Nunca falla en silencio.
 * @param {string} nombre  identificador legible para el diagnóstico
 * @param {Function} fn
 * @returns {boolean} si se ejecutó sin errores
 */
export function ejecutarSeguro(nombre, fn) {
    try {
        fn();
        return true;
    } catch (error) {
        console.error(`[${nombre}] falló al inicializarse. El resto del sitio continúa.`, error);
        return false;
    }
}

// Sustituto neutro para imágenes que no cargan: SVG en línea, sin red de por medio,
// para que la estrategia funcione incluso sin conexión.
const SUSTITUTO_GENERICO =
    'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-hidden="true">
            <rect width="200" height="200" fill="#E2E8F0"/>
            <g fill="none" stroke="#94A3B8" stroke-width="6" stroke-linecap="round">
                <rect x="52" y="62" width="96" height="76" rx="8"/>
                <path d="M62 122l24-24 20 20 14-14 18 18"/>
            </g>
            <circle cx="122" cy="86" r="8" fill="#94A3B8"/>
        </svg>`);

const AVATAR_BASE = 'https://ui-avatars.com/api/';

function urlSustituta(img) {
    if (img.dataset.sustituto !== 'avatar') return SUSTITUTO_GENERICO;

    const nombre = encodeURIComponent(img.getAttribute('alt') || 'Persona');
    const fondo = img.dataset.sustitutoFondo || '007EA7';
    const texto = img.dataset.sustitutoTexto || 'fff';
    return `${AVATAR_BASE}?name=${nombre}&background=${fondo}&color=${texto}`;
}

/**
 * Estrategia general de imágenes rotas. Un único escuchador en fase de captura
 * cubre todas las imágenes del documento, incluidas las que inyecten los motores
 * de contenido después. Los eventos de error de recursos no burbujean: por eso
 * se escucha en captura y no con delegación normal.
 */
export function iniciarImagenesResilientes() {
    document.addEventListener('error', (evento) => {
        const img = evento.target;
        if (!(img instanceof HTMLImageElement)) return;
        // Una sola sustitución por imagen: si el sustituto también falla, se detiene acá.
        if (img.dataset.sustituida === 'true') {
            img.src = SUSTITUTO_GENERICO;
            return;
        }

        img.dataset.sustituida = 'true';
        img.classList.add('imagen-sustituta');
        img.src = urlSustituta(img);
    }, true);
}