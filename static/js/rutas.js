// =========================================
// CAPA DE LÓGICA Y VISTA — Rutas de aprendizaje (Fase 5.4)
// Expone: iniciarRutas()
//
// La bóveda deja de ser un catálogo plano y pasa a itinerarios ordenados con
// progreso marcable y persistente. Decisión D-07: las rutas reemplazan al
// catálogo filtrable; todos los recursos siguen siendo alcanzables porque cada
// uno pertenece al menos a una ruta.
// =========================================

import {rutasData} from './datos/rutas.datos.js';
import {recursosData} from './datos/recursos.datos.js';
import {rutasUI} from './config/rutas.config.js';
import {recursosUI} from './config/recursos.config.js';
import {construirLista, montar, plantillaVacio, soloValidos} from './servicios/renderizado.js';
import {iniciarGrupoFiltros} from './servicios/filtros.js';
import {montarDiscusion} from './comunidad.js';

const recurso = (id) => recursosData.find((r) => r.id === id);

// ---------------------------------------------------------------
// Persistencia local del progreso
// ---------------------------------------------------------------
function leerProgreso() {
    try {
        const bruto = localStorage.getItem(rutasUI.clave);
        const datos = bruto ? JSON.parse(bruto) : {};
        return datos && typeof datos === 'object' ? datos : {};
    } catch (error) {
        // Almacenamiento no disponible o dato corrupto: se parte de cero.
        return {};
    }
}

function guardarProgreso(progreso) {
    try {
        localStorage.setItem(rutasUI.clave, JSON.stringify(progreso));
    } catch (error) {
        // Modo privado: el progreso vale solo para esta sesión.
    }
}

// ---------------------------------------------------------------
// Plantillas
// ---------------------------------------------------------------
function plantillaSelector(ruta, activa, hechos) {
    const total = ruta.pasos.length;
    const completa = total > 0 && hechos === total;
    return `
                <button aria-pressed="${activa}" data-ruta="${ruta.id}" type="button"
                        class="tarjeta-reactiva min-h-[44px] shrink-0 snap-start rounded-xl border px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activa ? 'border-primary bg-primary text-white shadow-sm' : 'border-orient-200 bg-white text-orient-700 hover:border-primary dark:border-orient-800 dark:bg-orient-900 dark:text-orient-300'}">
                    <span class="flex items-center gap-2">
                        <span aria-hidden="true" class="material-symbols-outlined text-base">${completa ? rutasUI.iconos.completado : ruta.icono}</span>
                        <span class="text-sm font-bold">${ruta.nombre}</span>
                    </span>
                    <span class="etiqueta-categoria mt-1 block ${activa ? 'text-white/80' : 'text-orient-500 dark:text-orient-400'}">${hechos}/${total}</span>
                </button>`;
}

function plantillaPaso(item, indice, hecho) {
    const formato = recursosUI.formato[item.formato] || {};
    const dificultad = recursosUI.dificultad[item.dificultad] || '';
    const accion = item.formato === 'video' ? rutasUI.textos.ver : rutasUI.textos.descargar;
    const externo = item.formato === 'video' ? ' target="_blank" rel="noopener noreferrer"' : ` download`;

    return `
                <li class="relative pl-12 md:pl-16" data-paso="${item.id}">
                    <span aria-hidden="true"
                          class="absolute left-4 top-14 bottom-0 w-px bg-orient-200 dark:bg-white/10 last:hidden md:left-6"></span>
                    <span aria-hidden="true"
                          class="absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black tabular-nums transition-colors duration-300 md:left-2 ${hecho ? 'border-primary bg-primary text-white' : 'border-orient-200 bg-white text-orient-500 dark:border-orient-800 dark:bg-orient-900 dark:text-orient-400'}">${indice + 1}</span>
                    <article class="tarjeta-contenido dark:glass-mid p-5 ${hecho ? 'opacity-80' : ''}">
                        <div class="flex flex-wrap items-start justify-between gap-3">
                            <div class="min-w-0">
                                <h3 class="text-lg font-bold leading-tight text-orient-950 dark:text-orient-50">${item.titulo}</h3>
                                <p class="mt-1 text-sm text-orient-600 dark:text-orient-300">${item.descripcion}</p>
                            </div>
                            <span class="etiqueta-categoria shrink-0 rounded-full border px-3 py-1 ${dificultad}">${item.dificultad}</span>
                        </div>
                        <div class="mt-4 flex flex-wrap items-center gap-3">
                            <a class="flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider ${formato.bgClass || ''} ${formato.textClass || ''} transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                               href="${item.url}"${externo}>
                                <span aria-hidden="true" class="material-symbols-outlined text-base">${formato.btnIcon || 'download'}</span>${accion}
                            </a>
                            <button aria-pressed="${hecho}" data-marcar="${item.id}" type="button"
                                    class="flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${hecho ? 'border-primary bg-primary/10 text-primary' : 'border-orient-200 text-orient-600 hover:border-primary hover:text-primary dark:border-orient-800 dark:text-orient-300'}">
                                <span aria-hidden="true" class="material-symbols-outlined text-base">${hecho ? rutasUI.iconos.completado : rutasUI.iconos.pendiente}</span>
                                <span>${hecho ? rutasUI.textos.desmarcar : rutasUI.textos.marcar}</span>
                            </button>
                            <span class="etiqueta-categoria text-orient-500 dark:text-orient-400">${item.tecnologia}</span>
                        </div>
                    </article>
                </li>`;
}

function plantillaCabecera(ruta, hechos) {
    const total = ruta.pasos.length;
    const porcentaje = total ? Math.round((hechos / total) * 100) : 0;
    const dato = (icono, titulo, valor) => `
                    <div>
                        <p class="etiqueta-categoria flex items-center gap-2 text-orient-500 dark:text-orient-400">
                            <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${icono}</span>${titulo}
                        </p>
                        <p class="mt-2 text-sm text-orient-700 dark:text-orient-200">${valor}</p>
                    </div>`;

    return `
            <div class="tarjeta-contenido dark:glass-mid relative overflow-hidden p-6 md:p-8">
                <span aria-hidden="true"
                      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></span>
                <h2 class="text-2xl font-black tracking-tight text-orient-950 dark:text-orient-50">${ruta.nombre}</h2>
                <p class="mt-2 max-w-2xl text-sm leading-relaxed text-orient-700 dark:text-orient-200">${ruta.resumen}</p>
                <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    ${dato(rutasUI.iconos.objetivo, rutasUI.textos.objetivo, ruta.objetivo)}
                    ${dato(rutasUI.iconos.previos, rutasUI.textos.previos, ruta.previos)}
                    ${dato(rutasUI.iconos.duracion, rutasUI.textos.duracion, ruta.duracion)}
                </div>
                <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div class="min-w-[240px] flex-1">
                        <div class="flex items-center justify-between gap-3">
                            <p class="text-sm font-semibold text-orient-700 dark:text-orient-200" data-progreso-texto>
                                ${porcentaje === 100 ? rutasUI.textos.completada : rutasUI.textos.progreso(hechos, total)}
                            </p>
                            <p class="text-sm font-black tabular-nums text-primary">${porcentaje}%</p>
                        </div>
                        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="${porcentaje}"
                             aria-label="Progreso de la ruta ${ruta.nombre}" role="progressbar"
                             class="mt-2 h-2 w-full overflow-hidden rounded-full bg-orient-100 dark:bg-white/10">
                            <div class="h-full rounded-full bg-primary transition-[width] duration-500" style="width: ${porcentaje}%"></div>
                        </div>
                    </div>
                    <button class="boton-secundario shrink-0" data-reiniciar type="button">
                        <span aria-hidden="true" class="material-symbols-outlined text-base">${rutasUI.iconos.reiniciar}</span>
                        ${rutasUI.textos.reiniciar}
                    </button>
                </div>
                <p class="mt-4 text-xs text-orient-500 dark:text-orient-400">${rutasUI.textos.avisoLocal}</p>
            </div>`;
}

// ---------------------------------------------------------------
// Motor
// ---------------------------------------------------------------
export function iniciarRutas() {
    const selector = document.getElementById('rutas-selector');
    const contenido = document.getElementById('rutas-contenido');
    const buscador = document.getElementById('search-recursos');
    if (!selector || !contenido) return;

    const rutas = soloValidos(rutasData, 'nombre').filter((r) => r.pasos.length > 0);
    if (rutas.length === 0) return;

    let progreso = leerProgreso();
    let consulta = '';

    const hechosDe = (ruta) => (progreso[ruta.id] || []).filter((id) => ruta.pasos.includes(id)).length;

    const rutaInicial = () => {
        const pedida = new URLSearchParams(window.location.search).get(rutasUI.parametro);
        return rutas.find((r) => r.id === pedida) || rutas[0];
    };

    let activa = rutaInicial();

    const reflejarEnUrl = (id) => {
        const url = new URL(window.location.href);
        url.searchParams.set(rutasUI.parametro, id);
        window.history.replaceState({}, '', url);
    };

    const dibujarSelector = () => {
        montar(selector, construirLista(rutas, (ruta) =>
            plantillaSelector(ruta, ruta.id === activa.id, hechosDe(ruta))));
    };

    const dibujarContenido = () => {
        const hechos = progreso[activa.id] || [];
        const pasos = activa.pasos.map(recurso).filter(Boolean);

        const texto = consulta.trim().toLowerCase();
        const visibles = texto
            ? pasos.filter((p) => `${p.titulo} ${p.descripcion} ${p.tecnologia}`.toLowerCase().includes(texto))
            : pasos;

        const lista = visibles.length
            ? `<ol class="mt-8 space-y-6">${visibles.map((p) =>
                plantillaPaso(p, pasos.indexOf(p), hechos.includes(p.id))).join('')}</ol>`
            : `<div class="mt-8">${plantillaVacio({
                icono: 'search_off',
                mensaje: rutasUI.textos.sinResultados,
                clases: 'text-center py-10'
            })}</div>`;

        const proximamente = activa.proximamente && !texto
            ? `<p class="mt-6 flex items-start gap-2 rounded-xl border border-dashed border-orient-300 p-5 text-sm text-orient-600 dark:border-orient-700 dark:text-orient-300">
                    <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${rutasUI.iconos.proximamente}</span>
                    <span>${activa.proximamente}</span>
               </p>`
            : '';

        // Hilo contextual: la duda se plantea donde nace (5.5.3). Un hilo por ruta,
        // identificado por su clave, de modo que las conversaciones no se mezclen.
        const hilo = `
                <section aria-labelledby="sec-hilo-${activa.id}" class="mt-12">
                    <div class="inline-flex items-center gap-3 mb-3">
                        <div class="h-px w-8 bg-primary"></div>
                        <p class="etiqueta-categoria text-primary">Dudas de esta ruta</p>
                    </div>
                    <h2 class="mb-4 text-xl font-black tracking-tight text-orient-950 dark:text-orient-50"
                        id="sec-hilo-${activa.id}">¿Te trabaste en algún paso?</h2>
                    <p class="mb-6 flex items-start gap-2 rounded-xl border border-orient-200 bg-orient-50 p-4 text-sm text-orient-700 dark:border-orient-800 dark:bg-white/5 dark:text-orient-200">
                        <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">info</span>
                        <span>La conversación se aloja en GitHub Discussions. Para participar necesitas una cuenta
                            de GitHub; leer no requiere ninguna.</span>
                    </p>
                    <div class="min-h-[420px] rounded-2xl border border-orient-200 bg-white p-4 dark:border-transparent dark:glass-mid md:p-6"
                         data-comunidad-hilo="ruta-${activa.id}">
                        <div class="flex min-h-[380px] flex-col items-center justify-center gap-3 text-center"
                             data-comunidad-marcador>
                            <span aria-hidden="true"
                                  class="material-symbols-outlined animate-spin text-4xl text-orient-300 dark:text-orient-700">progress_activity</span>
                            <p class="text-sm text-orient-600 dark:text-orient-300" role="status" aria-live="polite">Cargando la conversación…</p>
                        </div>
                    </div>
                    <p class="mt-6 text-center">
                        <a class="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                           href="https://github.com/ffelipecuevasc/comunidad/discussions" target="_blank"
                           rel="noopener noreferrer">Abrir la conversación completa en GitHub</a>
                    </p>
                </section>`;

        montar(contenido, plantillaCabecera(activa, hechosDe(activa)) + lista + proximamente + hilo,
            {refrescarAnimaciones: true});

        const contenedorHilo = contenido.querySelector('[data-comunidad-hilo]');
        if (contenedorHilo) montarDiscusion(contenedorHilo, contenedorHilo.dataset.comunidadHilo);
    };

    const redibujar = () => {
        dibujarSelector();
        dibujarContenido();
    };

    // Selección de ruta: mismo servicio de filtros que la bóveda y el bento (5.2.4).
    selector.addEventListener('click', (evento) => {
        const boton = evento.target.closest('[data-ruta]');
        if (!boton) return;
        activa = rutas.find((r) => r.id === boton.dataset.ruta) || activa;
        consulta = '';
        if (buscador) buscador.value = '';
        reflejarEnUrl(activa.id);
        redibujar();
    });

    contenido.addEventListener('click', (evento) => {
        const marcar = evento.target.closest('[data-marcar]');
        if (marcar) {
            const id = Number(marcar.dataset.marcar);
            const hechos = new Set(progreso[activa.id] || []);
            if (hechos.has(id)) hechos.delete(id);
            else hechos.add(id);
            progreso = {...progreso, [activa.id]: [...hechos]};
            guardarProgreso(progreso);
            redibujar();
            // El foco vuelve al mismo control para no perder el lugar en la lista.
            const devuelto = contenido.querySelector(`[data-marcar="${id}"]`);
            if (devuelto) devuelto.focus();
            return;
        }

        if (evento.target.closest('[data-reiniciar]')) {
            progreso = {...progreso, [activa.id]: []};
            guardarProgreso(progreso);
            redibujar();
        }
    });

    if (buscador) {
        buscador.addEventListener('input', () => {
            consulta = buscador.value;
            dibujarContenido();
        });
    }

    redibujar();
}