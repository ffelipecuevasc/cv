// =========================================
// CAPA DE LÓGICA Y VISTA — Relatoría (instructor.html)
// Expone: iniciarRelatoria()
//
// Otros cursos, capacitaciones y bootcamps impartidos. Una sola categoría:
// la lista se renderiza completa, en el orden del arreglo de datos, con la
// misma tarjeta que antes estaba escrita a mano en la página.
// =========================================

import {relatoriaData} from './datos/relatoria.datos.js';
import {relatoriaUI} from './config/relatoria.config.js';
import {construirLista, montar, plantillaVacio, soloValidos} from './servicios/renderizado.js';

const periodo = (item) => [item.periodo, item.modalidad].filter(Boolean).join(' · ');

function plantillaTarjeta(item, indice) {
    const retardo = (indice % relatoriaUI.tarjetasPorCiclo) * relatoriaUI.retardoPorTarjeta;

    return `
                            <div id="${item.id}" class="group tarjeta-contenido dark:glass-mid p-5 hover:border-primary/30 neon-glow-interactive"
                                 data-aos="fade-up" data-aos-delay="${retardo}">
                                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                                    <div class="flex items-center gap-3">
                                        <span aria-hidden="true"
                                              class="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 cursor-default">${item.icono}</span>
                                        <p class="font-bold text-orient-950 dark:text-orient-50 group-hover:text-primary transition-colors duration-300 cursor-default">
                                            ${item.institucion}</p>
                                    </div>
                                    <span class="etiqueta-categoria px-3 py-1 bg-orient-100 dark:bg-white/5 text-orient-600 dark:text-orient-300 rounded-full whitespace-nowrap shadow-inner cursor-default">${item.rol}</span>
                                </div>
                                ${periodo(item) ? `<p class="mb-3 flex items-center gap-1 text-[10px] uppercase tracking-wider text-orient-500 dark:text-orient-300 font-bold cursor-default">
                                    <span aria-hidden="true" class="material-symbols-outlined text-sm">${relatoriaUI.iconoPeriodo}</span> ${periodo(item)}
                                </p>` : ''}
                                <p class="text-sm leading-relaxed text-orient-700 dark:text-orient-300 transition-colors duration-300 cursor-default">
                                    ${item.descripcion}
                                </p>
                            </div>`;
}

export function iniciarRelatoria() {
    const rejilla = document.getElementById('relatoria-grid');
    if (!rejilla) return;

    const validos = soloValidos(relatoriaData, 'institucion');

    if (validos.length === 0) {
        montar(rejilla, plantillaVacio(relatoriaUI.vacio));
        return;
    }

    montar(rejilla, construirLista(validos, plantillaTarjeta), {refrescarAnimaciones: true});
}
