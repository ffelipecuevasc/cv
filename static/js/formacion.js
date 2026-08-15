// =========================================
// CAPA DE LÓGICA Y VISTA — Bento académico (Fase 5.2)
// Expone: iniciarFormacion()
//
// Rejilla asimétrica donde el tamaño del bloque comunica peso académico,
// con filtros por naturaleza de la formación y orden secundario cronológico
// (mitigación obligatoria de 5.2.3).
// =========================================

import {formacionData} from './datos/formacion.datos.js';
import {jerarquiaUI, categoriaUI, formacionTextos, formacionAnimacion} from './config/formacion.config.js';
import {construirLista, montar, plantillaVacio, soloValidos} from './servicios/renderizado.js';
import {iniciarGrupoFiltros} from './servicios/filtros.js';

const ORDEN_JERARQUIA = 'jerarquia';
const ORDEN_CRONOLOGIA = 'cronologia';

const escapar = (texto) => String(texto).replace(/[&<>"]/g, (c) =>
    ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

function plantillaTarjeta(item, indice) {
    const peso = jerarquiaUI[item.jerarquia] || jerarquiaUI.intermedio;
    const categoria = categoriaUI[item.categoria] || categoriaUI.universitaria;
    const retardo = (indice % formacionAnimacion.tarjetasPorCiclo) * formacionAnimacion.retardoPorTarjeta;

    const descripcion = peso.muestraDescripcion && item.descripcion
        ? `<p class="mt-3 text-sm leading-relaxed text-orient-700 dark:text-orient-200">${item.descripcion}</p>`
        : '';

    const logros = peso.muestraLogros && item.logros.length
        ? `<ul class="mt-4 space-y-2">${item.logros.map((logro) => `
                <li class="flex items-start gap-2 text-sm text-orient-700 dark:text-orient-200">
                    <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">check_small</span>
                    <span>${logro}</span>
                </li>`).join('')}</ul>`
        : '';

    const etiquetas = peso.muestraEtiquetas && item.etiquetas.length
        ? `<div class="mt-4 flex flex-wrap gap-2">${item.etiquetas.map((etiqueta) => `
                <span class="etiqueta-categoria px-2.5 py-1 rounded-md bg-orient-100 dark:bg-white/5 text-orient-600 dark:text-orient-200">${etiqueta}</span>`).join('')}</div>`
        : '';

    return `
            <li class="${peso.ancho}" data-formacion-categoria="${item.categoria}">
                <article class="group tarjeta-contenido dark:glass-mid ${peso.relleno} h-full flex flex-col neon-glow-interactive"
                         data-aos="fade-up" data-aos-delay="${retardo}">
                    <div class="flex items-start justify-between gap-3">
                        <span aria-hidden="true"
                              class="material-symbols-outlined flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg transition-transform duration-500 group-hover:scale-110 neon-glow-sm">${item.icono}</span>
                        <p class="${peso.tamanoAnio} font-black leading-none text-primary/90 dark:text-primary-vibrant/90 tabular-nums">${item.anioFin}</p>
                    </div>
                    <h3 class="${peso.tamanoTitulo} mt-4 font-bold leading-tight text-orient-950 dark:text-orient-50 transition-colors duration-300 group-hover:text-primary">${item.titulo}</h3>
                    <p class="mt-1 text-sm text-orient-600 dark:text-orient-300">
                        ${item.institucion}
                        <span class="block text-orient-500 dark:text-orient-400 text-xs uppercase tracking-wide mt-0.5">${item.periodo}</span>
                    </p>
                    ${descripcion}
                    ${logros}
                    ${etiquetas}
                    <p class="mt-auto pt-4">
                        <span class="etiqueta-categoria px-3 py-1 rounded-full ${categoria.pastilla}">${item.estado}</span>
                    </p>
                </article>
            </li>`;
}

export function iniciarFormacion() {
    const rejilla = document.getElementById('formacion-bento');
    const controles = document.getElementById('formacion-controles');
    if (!rejilla) return;

    const validos = soloValidos(formacionData, 'titulo');
    if (validos.length === 0) return;

    let filtro = 'todas';
    let orden = ORDEN_JERARQUIA;

    const ordenar = (coleccion) => [...coleccion].sort((a, b) => {
        if (orden === ORDEN_CRONOLOGIA) return b.anioFin - a.anioFin;
        const pesoA = (jerarquiaUI[a.jerarquia] || {}).orden || 99;
        const pesoB = (jerarquiaUI[b.jerarquia] || {}).orden || 99;
        return pesoA - pesoB || b.anioFin - a.anioFin;
    });

    const dibujar = () => {
        const visibles = ordenar(
            filtro === 'todas' ? validos : validos.filter((item) => item.categoria === filtro)
        );

        if (visibles.length === 0) {
            montar(rejilla, `<li class="col-span-12">${plantillaVacio(formacionTextos.vacio)}</li>`);
            return;
        }

        montar(rejilla, construirLista(visibles, plantillaTarjeta), {refrescarAnimaciones: true});
    };

    if (controles) {
        // Los controles solo existen si hay JavaScript: sin él la lista queda completa y estática.
        controles.removeAttribute('hidden');

        const ACTIVAS = ['bg-primary', 'text-white', 'shadow-sm'];
        const INACTIVAS = ['text-orient-600', 'dark:text-orient-300', 'hover:text-primary'];

        // Mismo motor conceptual que la bóveda de recursos (5.2.4).
        iniciarGrupoFiltros({
            contenedor: controles,
            selector: '[data-formacion-filtro]',
            atributo: 'data-formacion-filtro',
            clasesActivas: ACTIVAS,
            clasesInactivas: INACTIVAS,
            alElegir: (valor) => {
                filtro = valor;
                dibujar();
            }
        });

        iniciarGrupoFiltros({
            contenedor: controles,
            selector: '[data-formacion-orden]',
            atributo: 'data-formacion-orden',
            clasesActivas: ACTIVAS,
            clasesInactivas: INACTIVAS,
            alElegir: (valor) => {
                orden = valor;
                dibujar();
            }
        });
    }

    dibujar();
}