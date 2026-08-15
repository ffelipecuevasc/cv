// =========================================
// CAPA DE LÓGICA Y VISTA — Bóveda de recursos
// Expone: iniciarRecursos()
// =========================================
import {recursosData} from './datos/recursos.datos.js';
import {recursosUI, recursosTextos, recursosAnimacion} from './config/recursos.config.js';
import {construirLista, montar, plantillaVacio, soloValidos} from './servicios/renderizado.js';
import {iniciarGrupoFiltros} from './servicios/filtros.js';

export function iniciarRecursos() {
    const grid = document.getElementById('recursos-grid');
    const searchInput = document.getElementById('search-recursos');
    let currentFilter = 'Todos';
    let currentSearch = '';

    const renderCards = (data) => {
        if (data.length === 0) {
            montar(grid, plantillaVacio(recursosTextos.vacio));
            return;
        }

        const marcado = construirLista(soloValidos(data, 'titulo'), (item, index) => {
            const formatUI = recursosUI.formato[item.formato];
            const diffUI = recursosUI.dificultad[item.dificultad];
            const delay = (index % recursosAnimacion.tarjetasPorCiclo) * recursosAnimacion.retardoPorTarjeta;

            // FASE 3: APLICACIÓN DEL MATERIAL GLASS-MID
            // - Se eliminan: dark:bg-orient-900 y dark:border-orient-800
            // - Se inyectan: dark:glass-mid y dark:ring-1 dark:ring-orient-300/10
            return `
                <div data-aos="fade-up" data-aos-delay="${delay}" class="group flex flex-col bg-white dark:glass-mid rounded-2xl border border-orient-200 shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden neon-glow-interactive">
                    <div class="p-6 flex flex-col h-full">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center justify-center w-12 h-12 rounded-xl ${formatUI.bgClass} ${formatUI.textClass} shadow-inner group-hover:scale-110 transition-transform">
                                <span aria-hidden="true" class="material-symbols-outlined text-2xl">${formatUI.icon}</span>
                            </div>
                            <span class="${diffUI} text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest border">${item.dificultad}</span>
                        </div>
                        <p class="text-[11px] font-bold text-orient-500 uppercase tracking-widest mb-1">${item.categoriaPadre}</p>
                        <h2 class="text-xl font-bold text-orient-950 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">${item.titulo}</h2>
                        <p class="text-sm text-orient-600 dark:text-orient-400 line-clamp-2 mb-4 flex-1">${item.descripcion}</p>
                        <div class="pt-4 border-t border-orient-100 dark:border-orient-800 flex items-center justify-between mt-auto">
                            <div class="flex items-center gap-1 text-orient-700 dark:text-orient-300 bg-orient-50 dark:bg-orient-800/50 px-2 py-1 rounded text-xs font-semibold">
                                <span aria-hidden="true" class="material-symbols-outlined text-[14px]">code</span> ${item.tecnologia}
                            </div>
                            <a href="${item.url}" target="_blank" ${item.formato === 'pdf' ? 'download' : ''} class="text-primary hover:text-white hover:bg-primary px-4 py-2 rounded-lg text-sm font-bold transition-all border border-transparent hover:border-primary/50 flex items-center gap-1">
                                ${formatUI.btnText} <span aria-hidden="true" class="material-symbols-outlined text-sm">${formatUI.btnIcon}</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        montar(grid, marcado, {refrescarAnimaciones: true});
    };

    const filterAndRender = () => {
        let filteredData = recursosData;

        if (currentFilter !== 'Todos') {
            filteredData = filteredData.filter(item => item.categoriaFiltro === currentFilter);
        }

        if (currentSearch.trim() !== '') {
            const term = currentSearch.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.titulo.toLowerCase().includes(term) ||
                item.descripcion.toLowerCase().includes(term) ||
                item.tecnologia.toLowerCase().includes(term)
            );
        }

        renderCards(filteredData);
    };

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterAndRender();
    });

    // FASE 5.2.4: el grupo de filtros pasa al servicio compartido, que sincroniza
    // el estado declarado (aria-pressed) y el intercambio de clases.
    iniciarGrupoFiltros({
        selector: '.filtro-btn',
        atributo: 'data-filter',
        clasesActivas: ['bg-primary', 'text-white', 'shadow-md'],
        clasesInactivas: ['bg-white/50', 'dark:bg-orient-800/50', 'text-orient-700', 'dark:text-orient-200', 'border-orient-200', 'dark:border-orient-700'],
        alElegir: (valor) => {
            currentFilter = valor;
            filterAndRender();
        }
    });

    renderCards(recursosData);
}