// =========================================
// CAPA DE LÓGICA Y VISTA — Eventos
// Expone: iniciarEventos()
//
// Una sola categoría de contenido: la lista se renderiza completa, sin filtros.
// Cada evento es una tarjeta ancha de dos columnas en escritorio (portada a la
// izquierda, detalle a la derecha) y apilada en móvil. El estado Próximo /
// Finalizado se calcula al renderizar, nunca se guarda en los datos.
// =========================================

import {eventosData} from './datos/eventos.datos.js';
import {eventosUI} from './config/eventos.config.js';
import {construirLista, montar, plantillaVacio, soloValidos} from './servicios/renderizado.js';

const formatoFecha = new Intl.DateTimeFormat(eventosUI.fecha.idioma, eventosUI.fecha.formato);

/** Próximo mientras no haya pasado la hora de término del evento. */
const estadoDe = (item) => {
    const termino = new Date(`${item.fecha}T${item.horaTermino}:00${eventosUI.desfaseHorario}`);
    return new Date() < termino ? eventosUI.estados.proximo : eventosUI.estados.finalizado;
};

/** "sábado, 3 de octubre de 2026 · 20:00–21:00 (GMT-3)" */
const fechaLegible = (item) =>
    `${formatoFecha.format(new Date(`${item.fecha}T00:00:00`))} · ${item.horaInicio}–${item.horaTermino} (${item.zonaHoraria})`;

const insignia = (icono, texto) => texto
    ? `<span class="${eventosUI.insignias.clase}">
                            <span aria-hidden="true" class="material-symbols-outlined text-xs">${icono}</span>${texto}
                        </span>`
    : '';

const listaTemario = (temario) => temario.length
    ? `<h4 class="mt-6 text-base font-bold leading-tight text-orient-950 dark:text-orient-50">${eventosUI.temarioTitulo}</h4>
                    <ul class="mt-3 space-y-2">${temario.map((punto) => `
                        <li class="flex items-start gap-2 text-sm leading-relaxed text-orient-700 dark:text-orient-200">
                            <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${eventosUI.iconos.temario}</span>
                            <span>${punto}</span>
                        </li>`).join('')}
                    </ul>`
    : '';

function plantillaEvento(item, indice) {
    const estado = estadoDe(item);
    const retardo = Math.min(indice * eventosUI.retardoPorTarjeta, eventosUI.retardoMaximo);
    const {inscripcion} = eventosUI.acciones;
    const descripcion = item.descripcion || [];
    const temario = item.temario || [];

    return `
            <article id="${item.id}" class="tarjeta-contenido dark:glass-mid neon-glow-interactive group relative overflow-hidden rounded-2xl"
                     data-aos="fade-up" data-aos-delay="${retardo}">
                <div class="flex flex-col lg:flex-row">
                    <div class="shrink-0 p-5 md:p-6 lg:w-2/5 lg:p-8 lg:pr-0">
                        <div class="relative aspect-square overflow-hidden rounded-xl">
                            <img src="${item.imagen}" alt="${item.alt}" width="${item.ancho}" height="${item.alto}"
                                 class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                 loading="eager" decoding="async"/>
                            <p class="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 ${estado.clase} text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                                <span aria-hidden="true" class="material-symbols-outlined text-xs">${estado.icono}</span> ${estado.texto}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col p-5 pt-0 md:p-6 md:pt-0 lg:p-8">
                        <div class="flex flex-wrap gap-2">
                            ${insignia(eventosUI.insignias.modalidad.icono, item.modalidad)}
                            ${insignia(eventosUI.insignias.costo.icono, item.costo)}
                        </div>
                        <h3 class="mt-4 text-2xl font-bold leading-tight text-orient-950 transition-colors duration-300 group-hover:text-primary dark:text-orient-50 md:text-3xl">${item.titulo}</h3>
                        ${item.subtitulo ? `<p class="mt-1 text-lg font-semibold text-primary dark:text-primary-vibrant">${item.subtitulo}</p>` : ''}
                        <ul class="mt-4 space-y-2">
                            <li class="flex items-start gap-2 text-sm font-medium text-orient-700 dark:text-orient-300">
                                <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${eventosUI.iconos.fecha}</span>
                                <time datetime="${item.fecha}T${item.horaInicio}${eventosUI.desfaseHorario}">${fechaLegible(item)}</time>
                            </li>
                            ${item.plataforma ? `<li class="flex items-start gap-2 text-sm font-medium text-orient-700 dark:text-orient-300">
                                <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${eventosUI.iconos.plataforma}</span>
                                <span>${item.plataforma}</span>
                            </li>` : ''}
                        </ul>
                        <div class="mt-5 space-y-3">${descripcion.map((parrafo) => `
                            <p class="text-sm leading-relaxed text-orient-700 dark:text-orient-200 md:text-base">${parrafo}</p>`).join('')}
                        </div>
                        ${listaTemario(temario)}
                        ${item.plus ? `<p class="mt-6 flex items-start gap-3 rounded-xl border border-accent-gold/50 bg-accent-gold/10 p-4 text-sm font-semibold text-accent-gold-deep dark:text-accent-gold neon-glow-gold">
                            <span aria-hidden="true" class="material-symbols-outlined text-xl">${eventosUI.iconos.plus}</span>
                            <span>${item.plus}</span>
                        </p>` : ''}
                        ${item.cupos ? `<p class="mt-4 flex items-start gap-2 text-xs text-orient-500 dark:text-orient-400">
                            <span aria-hidden="true" class="material-symbols-outlined text-base">${eventosUI.iconos.cupos}</span>
                            <span>${item.cupos}</span>
                        </p>` : ''}
                        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a class="boton-primario gap-2 py-3 shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all neon-glow-md"
                               href="${item.enlaceInscripcion}" target="_blank" rel="noopener noreferrer">
                                <span aria-hidden="true" class="material-symbols-outlined text-base">${inscripcion.icono}</span>
                                ${inscripcion.texto}
                            </a>
                        </div>
                    </div>
                </div>
            </article>`;
}

export function iniciarEventos() {
    const rejilla = document.getElementById('eventos-grid');
    if (!rejilla) return;

    const validos = soloValidos(eventosData, 'titulo');

    if (validos.length === 0) {
        montar(rejilla, plantillaVacio(eventosUI.vacio));
        return;
    }

    montar(rejilla, construirLista(validos, plantillaEvento), {refrescarAnimaciones: true});
}
