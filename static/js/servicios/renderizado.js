// =========================================
// SERVICIO DE RENDERIZADO
// Expone: soloValidos(), construirLista(), montar(), plantillaVacio(), plantillaCargando()
//
// Utilidades comunes a los cuatro motores de contenido. No conoce ningún dominio:
// recibe colecciones y plantillas, devuelve o inyecta marcado.
// =========================================

import {refrescarAnimacion} from './animacion.js';

/**
 * Descarta entradas inválidas de una colección para que un dato malformado
 * nunca deje una sección en blanco (los motores no fallan en silencio).
 * @param {Array} coleccion
 * @param {string} campoObligatorio
 */
export function soloValidos(coleccion, campoObligatorio) {
    if (!Array.isArray(coleccion)) return [];
    return coleccion.filter((entrada) => entrada && entrada[campoObligatorio]);
}

/**
 * Construye el marcado de una lista aplicando una plantilla a cada entrada.
 * @param {Array} coleccion
 * @param {(entrada: any, indice: number) => string} plantilla
 * @returns {string}
 */
export function construirLista(coleccion, plantilla) {
    return coleccion.map((entrada, indice) => plantilla(entrada, indice)).join('');
}

/**
 * Inyecta marcado en un contenedor.
 * @param {Element|null} contenedor
 * @param {string} marcado
 * @param {{refrescarAnimaciones?: boolean}} opciones
 * @returns {boolean} si se pudo montar
 */
export function montar(contenedor, marcado, {refrescarAnimaciones = false} = {}) {
    if (!contenedor) return false;

    contenedor.innerHTML = marcado;
    if (refrescarAnimaciones) refrescarAnimacion();
    return true;
}

/**
 * Estado vacío estándar: icono grande, mensaje y centrado.
 * @param {{icono: string, mensaje: string, clases?: string}} opciones
 */
export function plantillaVacio({icono, mensaje, clases = 'col-span-1 md:col-span-2 lg:col-span-3 text-center py-10'}) {
    return `
                <div class="${clases}">
                    <span aria-hidden="true" class="material-symbols-outlined text-5xl text-orient-300 dark:text-orient-700 mb-2">${icono}</span>
                    <p class="text-orient-600 dark:text-orient-400 font-medium">${mensaje}</p>
                </div>`;
}

/**
 * Estado de carga estándar. Anunciado a tecnologías asistivas mediante aria-live.
 * @param {{mensaje?: string, clases?: string}} opciones
 */
export function plantillaCargando({mensaje = 'Cargando contenido…', clases = 'col-span-1 md:col-span-2 lg:col-span-3 text-center py-10'} = {}) {
    return `
                <div class="${clases}" role="status" aria-live="polite">
                    <span aria-hidden="true" class="material-symbols-outlined text-5xl text-orient-300 dark:text-orient-700 mb-2 animate-spin">progress_activity</span>
                    <p class="text-orient-600 dark:text-orient-400 font-medium">${mensaje}</p>
                </div>`;
}