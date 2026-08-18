// =========================================
// CAPA DE LÓGICA Y VISTA — Muro de tecnologías (Fase 5.3)
// Expone: iniciarTecnologias()
//
// Una sola presentación en todos los tamaños: rejilla estática con panel de
// contexto desplegable. Sustituye a la cinta de desplazamiento continuo,
// retirada por completo (marcado, estilo y lógica).
//
// El marcado de desarrollador.html ya contiene el muro con las diez fichas:
// este módulo lo reemplaza por su versión interactiva. Sin JavaScript se ve
// exactamente el mismo muro, sin panel. El movimiento desaparece del alcance,
// de modo que la degradación por rango de dispositivo deja de ser necesaria.
// =========================================

import {tecnologiasData} from './datos/tecnologias.datos.js';
import {tecnologiasUI} from './config/tecnologias.config.js';
import {portafolioData} from './datos/portafolio.datos.js';
import {construirLista, montar, soloValidos} from './servicios/renderizado.js';

const ANIO_ACTUAL = new Date().getFullYear();

const proyecto = (id) => portafolioData.find((p) => p.id === id);

/** Ficha del muro: botón accesible que abre el panel de contexto. */
function plantillaTarjeta(item, indice) {
    // Escalonado corto: a partir de la quinta ficha el retardo se estabiliza
    // para que la segunda fila no entre notoriamente tarde.
    const retardo = Math.min(indice, 4) * 60;

    return `
            <li data-aos="fade-up" data-aos-delay="${retardo}">
                <button aria-controls="tecnologias-panel" aria-expanded="false"
                        class="tarjeta-contenido tarjeta-reactiva dark:glass-mid neon-glow-interactive tecnologia-tarjeta group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-orient-950"
                        data-tecnologia="${item.id}" type="button">
                    <span aria-hidden="true" class="tecnologia-filo"></span>
                    <span class="tecnologia-icono md:h-14 md:w-14">
                        <svg aria-hidden="true" class="h-7 w-7 transition-transform duration-500 group-hover:scale-110"><use href="#${item.simbolo}"></use></svg>
                    </span>
                    <span class="flex w-full items-end justify-between gap-2">
                        <span class="flex flex-col">
                            <span class="tecnologia-nombre">${item.nombre}</span>
                            <span class="tecnologia-rol">${item.rol}</span>
                        </span>
                        <span aria-hidden="true" class="material-symbols-outlined tecnologia-indicador">${tecnologiasUI.iconos.indicador}</span>
                    </span>
                </button>
            </li>`;
}

function bloqueLista(titulo, icono, elementos) {
    if (elementos.length === 0) return '';
    return `
                <div>
                    <p class="etiqueta-categoria flex items-center gap-2 text-orient-500 dark:text-orient-400">
                        <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${icono}</span>${titulo}
                    </p>
                    <ul class="mt-3 space-y-2">${elementos.join('')}</ul>
                </div>`;
}

function plantillaPanel(item) {
    const anios = Math.max(1, ANIO_ACTUAL - item.desde);

    const proyectos = item.proyectos
        .map(proyecto)
        .filter(Boolean)
        .map((p) => `
                        <li>
                            <a class="group/enlace flex items-start gap-2 text-sm text-orient-700 transition-colors hover:text-primary dark:text-orient-200 dark:hover:text-primary-vibrant"
                               data-tecnologia-proyecto href="#${p.id}">
                                <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">arrow_right_alt</span>
                                <span class="underline decoration-primary/30 underline-offset-4 group-hover/enlace:decoration-primary">${p.title}</span>
                            </a>
                        </li>`);

    const cursos = item.cursos.map((c) => `
                        <li class="flex items-start gap-2 text-sm text-orient-700 dark:text-orient-200">
                            <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">check_small</span>
                            <span>${c}</span>
                        </li>`);

    const certificaciones = item.certificaciones.map((c) => `
                        <li class="flex items-start gap-2 text-sm text-orient-700 dark:text-orient-200">
                            <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">check_small</span>
                            <span>${c}</span>
                        </li>`);

    const sinProyectos = item.proyectos.length === 0
        ? `<p class="text-sm italic text-orient-500 dark:text-orient-400">${tecnologiasUI.textos.sinProyectos}</p>`
        : '';

    return `
            <div class="tarjeta-contenido dark:glass-mid relative overflow-hidden p-6 md:p-8">
                <span aria-hidden="true"
                      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></span>
                <div class="relative flex flex-wrap items-start justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <span class="tecnologia-icono">
                            <svg aria-hidden="true" class="w-7 h-7"><use href="#${item.simbolo}"></use></svg>
                        </span>
                        <span class="flex flex-col">
                            <span class="text-xl font-bold text-orient-950 dark:text-orient-50">${item.nombre}</span>
                            <span class="etiqueta-categoria text-orient-500 dark:text-orient-400">${item.rol} · desde ${item.desde} · ${tecnologiasUI.textos.anios(anios)}</span>
                        </span>
                    </div>
                    <button class="boton-secundario" data-tecnologia-cerrar type="button">
                        <span aria-hidden="true" class="material-symbols-outlined text-base">${tecnologiasUI.iconos.cerrar}</span>
                        ${tecnologiasUI.textos.cerrar}
                    </button>
                </div>
                <div class="relative mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <p class="etiqueta-categoria flex items-center gap-2 text-orient-500 dark:text-orient-400">
                            <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${tecnologiasUI.iconos.proyecto}</span>${tecnologiasUI.textos.proyectos}
                        </p>
                        ${proyectos.length ? `<ul class="mt-3 space-y-2">${proyectos.join('')}</ul>` : `<div class="mt-3">${sinProyectos}</div>`}
                    </div>
                    ${bloqueLista(tecnologiasUI.textos.cursos, tecnologiasUI.iconos.curso, cursos)}
                    ${bloqueLista(tecnologiasUI.textos.certificaciones, tecnologiasUI.iconos.certificacion, certificaciones)}
                </div>
            </div>`;
}

export function iniciarTecnologias() {
    const seccion = document.getElementById('tecnologias-seccion');
    const rejilla = document.getElementById('tecnologias-grid');
    const panel = document.getElementById('tecnologias-panel');
    if (!seccion || !rejilla || !panel) return;

    const items = soloValidos(tecnologiasData, 'nombre');
    if (items.length === 0) return;

    let activa = null;

    // Sustitución única: el muro del marcado pasa a su versión accionable.
    montar(rejilla, construirLista(items, plantillaTarjeta), {refrescarAnimaciones: true});

    function marcarBoton(id) {
        rejilla.querySelectorAll('[data-tecnologia]').forEach((boton) => {
            boton.setAttribute('aria-expanded', String(boton.dataset.tecnologia === id));
        });
    }

    function cerrarPanel({devolverFoco = true} = {}) {
        const anterior = activa;
        activa = null;
        panel.innerHTML = '';
        panel.hidden = true;
        marcarBoton(null);

        if (devolverFoco && anterior) {
            const boton = rejilla.querySelector(`[data-tecnologia="${anterior}"]`);
            if (boton) boton.focus();
        }
    }

    function abrirPanel(id) {
        const item = items.find((t) => t.id === id);
        if (!item) return;

        activa = id;
        panel.innerHTML = plantillaPanel(item);
        panel.hidden = false;
        marcarBoton(id);
        // El panel se anuncia y recibe el foco (5.3.5).
        panel.focus();
    }

    seccion.addEventListener('click', (evento) => {
        const ficha = evento.target.closest('[data-tecnologia]');
        if (ficha) {
            if (ficha.dataset.tecnologia === activa) cerrarPanel();
            else abrirPanel(ficha.dataset.tecnologia);
            return;
        }
        if (evento.target.closest('[data-tecnologia-cerrar]')) cerrarPanel();
    });

    // Un enlace a un proyecto reinicia el filtro del portafolio para que la
    // tarjeta de destino esté visible al llegar.
    seccion.addEventListener('click', (evento) => {
        if (!evento.target.closest('[data-tecnologia-proyecto]')) return;
        const todos = document.getElementById('pf-btn-all');
        if (todos) todos.click();
    });

    seccion.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && activa) cerrarPanel();
    });
    panel.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') cerrarPanel();
    });
}