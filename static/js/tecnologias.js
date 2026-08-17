// =========================================
// CAPA DE LÓGICA Y VISTA — Riel de tecnologías (Fase 5.3)
// Expone: iniciarTecnologias()
//
// Estrategia de degradación (5.3.4), en orden de prioridad:
//   movimiento reducido o sin JavaScript → rejilla estática
//   ancho < 768 px                       → rejilla estática
//   768–1023 px                          → cinta desplazable a mano
//   >= 1024 px                           → cinta en movimiento continuo
//
// El movimiento nunca es la única vía de acceso: la cinta contiene las mismas
// fichas que la rejilla y todas son alcanzables con teclado.
// =========================================

import {tecnologiasData} from './datos/tecnologias.datos.js';
import {tecnologiasUI} from './config/tecnologias.config.js';
import {portafolioData} from './datos/portafolio.datos.js';
import {construirLista, montar, soloValidos} from './servicios/renderizado.js';
import {movimientoReducido} from './servicios/animacion.js';

const ANIO_ACTUAL = new Date().getFullYear();

const proyecto = (id) => portafolioData.find((p) => p.id === id);

/** Ficha de una tecnología: botón accesible que abre el panel de contexto. */
function plantillaFicha(item, {duplicada = false} = {}) {
    // La copia que hace posible el bucle continuo no se anuncia ni recibe foco.
    const oculto = duplicada ? ' aria-hidden="true" tabindex="-1"' : '';
    return `
            <li class="w-44 shrink-0">
                <button aria-controls="tecnologias-panel" aria-expanded="false"
                        class="tarjeta-contenido tarjeta-reactiva dark:glass-mid group w-full p-5 text-left neon-glow-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        data-tecnologia="${item.id}" type="button"${oculto}>
                    <span class="tecnologia-icono">
                        <svg aria-hidden="true" class="w-7 h-7 transition-transform duration-500 group-hover:scale-110"><use href="#${item.simbolo}"></use></svg>
                    </span>
                    <span class="mt-4 flex flex-col">
                        <span class="tecnologia-nombre">${item.nombre}</span>
                        <span class="tecnologia-rol">${item.rol}</span>
                    </span>
                </button>
            </li>`;
}

/** Rejilla estática: presentación por omisión y respaldo de todas las degradaciones. */
function plantillaRejilla(item) {
    return `
            <li>
                <button aria-controls="tecnologias-panel" aria-expanded="false"
                        class="tarjeta-contenido tarjeta-reactiva dark:glass-mid group h-full w-full p-5 text-left neon-glow-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        data-tecnologia="${item.id}" type="button">
                    <span class="tecnologia-icono">
                        <svg aria-hidden="true" class="w-7 h-7 transition-transform duration-500 group-hover:scale-110"><use href="#${item.simbolo}"></use></svg>
                    </span>
                    <span class="mt-4 flex flex-col">
                        <span class="tecnologia-nombre">${item.nombre}</span>
                        <span class="tecnologia-rol">${item.rol}</span>
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
    const riel = document.getElementById('tecnologias-riel');
    const panel = document.getElementById('tecnologias-panel');
    const controles = document.getElementById('tecnologias-controles');
    const botonPausa = document.getElementById('tecnologias-pausa');
    if (!seccion || !rejilla || !riel || !panel) return;

    const items = soloValidos(tecnologiasData, 'nombre');
    if (items.length === 0) return;

    let pista = null;
    let modo = null;
    let activa = null;

    // ---------------------------------------------------------------
    // Presentación según el rango de dispositivo
    // ---------------------------------------------------------------
    const modoActual = () => {
        if (movimientoReducido()) return 'rejilla';
        if (window.matchMedia(tecnologiasUI.consultaRiel).matches) return 'riel';
        if (window.matchMedia(tecnologiasUI.consultaDeslizar).matches) return 'deslizar';
        return 'rejilla';
    };

    const dibujarRejilla = () => {
        montar(rejilla, construirLista(items, plantillaRejilla));
        rejilla.hidden = false;
        riel.hidden = true;
        riel.innerHTML = '';
        if (controles) controles.hidden = true;
        pista = null;
    };

    const dibujarRiel = (conMovimiento) => {
        const originales = construirLista(items, (item) => plantillaFicha(item));
        // La pista se duplica para que el bucle no muestre un corte al reiniciarse.
        const copias = conMovimiento
            ? construirLista(items, (item) => plantillaFicha(item, {duplicada: true}))
            : '';

        riel.innerHTML = `
            <ul class="flex w-max gap-4 md:gap-6 ${conMovimiento ? 'riel-pista' : ''}"
                style="--riel-duracion: ${tecnologiasUI.duracionVuelta}">${originales}${copias}</ul>`;
        riel.classList.toggle('overflow-x-auto', !conMovimiento);
        riel.classList.toggle('overflow-hidden', conMovimiento);
        riel.hidden = false;
        rejilla.hidden = true;
        rejilla.innerHTML = '';
        pista = riel.querySelector('.riel-pista');

        if (controles) controles.hidden = !conMovimiento;
        if (botonPausa) marcarPausa(false);
    };

    const aplicarModo = () => {
        const nuevo = modoActual();
        if (nuevo === modo) return;
        modo = nuevo;
        if (modo === 'rejilla') dibujarRejilla();
        else dibujarRiel(modo === 'riel');
        if (activa) marcarBoton(activa);
    };

    // ---------------------------------------------------------------
    // Control explícito de pausa y reanudación (5.3.5)
    // ---------------------------------------------------------------
    function marcarPausa(pausado) {
        if (!botonPausa) return;
        botonPausa.setAttribute('aria-pressed', String(pausado));
        const icono = botonPausa.querySelector('[data-icono]');
        const etiqueta = botonPausa.querySelector('[data-etiqueta]');
        if (icono) icono.textContent = pausado ? tecnologiasUI.iconos.reanudar : tecnologiasUI.iconos.pausar;
        if (etiqueta) etiqueta.textContent = pausado ? tecnologiasUI.textos.reanudar : tecnologiasUI.textos.pausar;
        if (pista) pista.classList.toggle('riel-pista--pausado', pausado);
    }

    if (botonPausa) {
        botonPausa.addEventListener('click', () => {
            marcarPausa(botonPausa.getAttribute('aria-pressed') !== 'true');
        });
    }

    // ---------------------------------------------------------------
    // Panel de contexto
    // ---------------------------------------------------------------
    function marcarBoton(id) {
        document.querySelectorAll('[data-tecnologia]').forEach((boton) => {
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
            const boton = document.querySelector(`[data-tecnologia="${anterior}"]:not([tabindex="-1"])`);
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

    // ---------------------------------------------------------------
    // La animación se detiene cuando la sección no está en pantalla (5.3.4)
    // ---------------------------------------------------------------
    if (typeof IntersectionObserver === 'function') {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!pista) return;
                pista.classList.toggle('riel-pista--fuera', !entrada.isIntersecting);
            });
        }, {threshold: 0});
        observador.observe(seccion);
    }

    aplicarModo();
    window.addEventListener('resize', aplicarModo, {passive: true});
}