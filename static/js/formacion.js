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

const listaLogros = (logros, claseTexto, claseIcono) => logros.length
    ? `<ul class="mt-4 space-y-2">${logros.map((logro) => `
                <li class="flex items-start gap-2 text-sm ${claseTexto}">
                    <span aria-hidden="true" class="material-symbols-outlined text-base ${claseIcono}">check_small</span>
                    <span>${logro}</span>
                </li>`).join('')}</ul>`
    : '';

const listaEtiquetas = (etiquetas, clase) => etiquetas.length
    ? `<div class="mt-4 flex flex-wrap gap-2">${etiquetas.map((etiqueta) => `
                <span class="etiqueta-categoria px-2.5 py-1 rounded-md ${clase}">${etiqueta}</span>`).join('')}</div>`
    : '';

const periodo = (item) => `${item.periodo}${item.duracion ? ` · ${item.duracion}` : ''}`;

/**
 * Peso mayor: banda a todo el ancho con disposición horizontal, para que ganar
 * ancho no signifique ganar alto. Toma el lenguaje de la tarjeta destacada de
 * instructor.html: degradado de marca, icono gigante translúcido y texto en blanco.
 */
function plantillaDestacada(item, categoria) {
    return `
            <article class="group relative h-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-primary-vibrant to-primary p-6 shadow-2xl transition-transform duration-500 hover:scale-[1.01] dark:border-primary-vibrant/30 dark:bg-none dark:bg-primary/20 dark:glass-mid md:p-8"
                     data-aos="fade-up">
                <span aria-hidden="true"
                      class="material-symbols-outlined pointer-events-none absolute -right-10 -top-10 text-[180px] leading-none text-white/10 transition-transform duration-700 group-hover:scale-110">${item.icono}</span>
                <div class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                    <div class="lg:w-1/2">
                        <div class="flex flex-wrap items-center gap-3">
                            <span class="etiqueta-categoria inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-white backdrop-blur-sm">
                                <span aria-hidden="true" class="material-symbols-outlined text-xs">star</span>${categoria.etiqueta}
                            </span>
                            <p class="text-3xl font-black leading-none tabular-nums text-white md:text-4xl">${item.anioFin}</p>
                        </div>
                        <h3 class="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">${item.titulo}</h3>
                        <p class="mt-2 text-sm text-white/80">
                            ${item.institucion}
                            <span class="mt-0.5 block text-xs uppercase tracking-wide text-white/60">${periodo(item)}</span>
                        </p>
                        <p class="mt-3 text-sm leading-relaxed text-white/90">${item.descripcion}</p>
                    </div>
                    <div class="lg:w-1/2">
                        ${listaLogros(item.logros, 'text-white/90', 'text-white')}
                        ${listaEtiquetas(item.etiquetas, 'bg-white/15 text-white backdrop-blur-sm')}
                    </div>
                </div>
            </article>`;
}

/** Peso intermedio: tarjeta vertical con filo de luz superior y halo de esquina. */
function plantillaEstandar(item, categoria, peso, retardo) {
    return `
            <article class="group tarjeta-contenido dark:glass-mid ${peso.relleno} relative h-full overflow-hidden flex flex-col neon-glow-interactive"
                     data-aos="fade-up" data-aos-delay="${retardo}">
                <span aria-hidden="true"
                      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></span>
                <span aria-hidden="true"
                      class="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"></span>
                <div class="relative flex items-start justify-between gap-3">
                    <span aria-hidden="true"
                          class="material-symbols-outlined flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg transition-transform duration-500 group-hover:scale-110 neon-glow-sm">${item.icono}</span>
                    <p class="${peso.tamanoAnio} font-black leading-none tabular-nums text-primary/90 dark:text-primary-vibrant/90">${item.anioFin}</p>
                </div>
                <h3 class="${peso.tamanoTitulo} relative mt-4 font-bold leading-tight text-orient-950 transition-colors duration-300 group-hover:text-primary dark:text-orient-50">${item.titulo}</h3>
                <p class="relative mt-1 text-sm text-orient-600 dark:text-orient-300">
                    ${item.institucion}
                    <span class="mt-0.5 block text-xs uppercase tracking-wide text-orient-500 dark:text-orient-400">${periodo(item)}</span>
                </p>
                <div class="relative">
                    ${item.descripcion ? `<p class="mt-3 text-sm leading-relaxed text-orient-700 dark:text-orient-200">${item.descripcion}</p>` : ''}
                    ${listaLogros(item.logros, 'text-orient-700 dark:text-orient-200', 'text-primary')}
                    ${listaEtiquetas(item.etiquetas, 'bg-orient-100 dark:bg-white/5 text-orient-600 dark:text-orient-200')}
                </div>
                <p class="relative mt-auto pt-4">
                    <span class="etiqueta-categoria px-3 py-1 rounded-full ${categoria.pastilla}">${item.estado}</span>
                </p>
            </article>`;
}

/** Peso menor: fila compacta, icono en línea y superficie secundaria. */
function plantillaCompacta(item, categoria, peso, retardo) {
    return `
            <article class="group flex h-full items-center gap-4 rounded-xl border border-orient-100 bg-orient-50 ${peso.relleno} transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-md dark:border-transparent dark:bg-white/5 dark:hover:bg-white/10"
                     data-aos="fade-up" data-aos-delay="${retardo}">
                <span aria-hidden="true"
                      class="material-symbols-outlined flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">${item.icono}</span>
                <div class="min-w-0 flex-1">
                    <h3 class="${peso.tamanoTitulo} font-bold leading-tight text-orient-950 transition-colors duration-300 group-hover:text-primary dark:text-orient-50">${item.titulo}</h3>
                    <p class="mt-0.5 truncate text-xs uppercase tracking-wide text-orient-500 dark:text-orient-400">${categoria.etiqueta} · ${item.periodo}</p>
                </div>
                <p class="${peso.tamanoAnio} shrink-0 font-black leading-none tabular-nums text-primary/70 dark:text-primary-vibrant/70">${item.anioFin}</p>
            </article>`;
}

function plantillaTarjeta(item, indice) {
    const peso = jerarquiaUI[item.jerarquia] || jerarquiaUI.intermedio;
    const categoria = categoriaUI[item.categoria] || categoriaUI.universitaria;
    const retardo = (indice % formacionAnimacion.tarjetasPorCiclo) * formacionAnimacion.retardoPorTarjeta;

    const cuerpo = peso.plantilla === 'destacada' ? plantillaDestacada(item, categoria)
        : peso.plantilla === 'compacta' ? plantillaCompacta(item, categoria, peso, retardo)
            : plantillaEstandar(item, categoria, peso, retardo);

    return `
            <li class="${peso.ancho}" data-formacion-categoria="${item.categoria}">${cuerpo}
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