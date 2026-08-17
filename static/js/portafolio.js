// =========================================
// CAPA DE LÓGICA Y VISTA — Portafolio
// Expone: iniciarPortafolio()
// =========================================
import {portafolioData} from './datos/portafolio.datos.js';
import {portafolioUI} from './config/portafolio.config.js';
import {construirLista, montar} from './servicios/renderizado.js';

const renderPortfolio = (filtro = 'all') => {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    // Lógica de Filtrado: Si es 'all' pasan todos, si no, solo los que coinciden con la categoría
    const filteredData = portafolioData.filter(item => item && item.title && (filtro === 'all' || item.category === filtro));

    const marcado = construirLista(filteredData, (item, indice) => {
        const categoria = portafolioUI.categorias[item.category] || portafolioUI.categorias.frontend;
        const pastilla = categoria.pastilla;
        // La acción se deriva del destino: repositorio o sitio publicado.
        const accion = /github\.com/.test(item.link || '')
            ? portafolioUI.acciones.repositorio
            : portafolioUI.acciones.sitio;
        // El ancho sale del patrón repetible, no de una tabla por identificador.
        const maqueta = {
            ancho: portafolioUI.patronAncho[indice % portafolioUI.patronAncho.length],
            retardo: (indice % portafolioUI.tarjetasPorCiclo) * portafolioUI.retardoPorTarjeta
        };

        const overlayHTML = item.link
            ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 ${categoria.accionClase} text-white text-xs font-bold rounded-lg hover:opacity-90 transition-colors">
                    <span aria-hidden="true" class="material-symbols-outlined text-sm">${accion.icono}</span> ${accion.texto}
               </a>`
            : `<span class="flex items-center gap-2 px-4 py-2 ${categoria.accionClase} text-white text-xs font-bold rounded-lg">
                    <span aria-hidden="true" class="material-symbols-outlined text-sm">${accion.icono}</span> ${accion.texto}
               </span>`;

        const tagsHTML = item.tags.map(tag => `<span class="${portafolioUI.etiquetaClase}">${tag}</span>`).join('');

        return `
            <article id="${item.id}" data-pf-category="${item.category}" class="pf-card tarjeta-reactiva ${maqueta.ancho} group relative rounded-2xl overflow-hidden border border-orient-200 bg-white shadow-sm dark:glass-mid neon-glow-interactive" data-aos="fade-up" data-aos-delay="${maqueta.retardo}">
                <div class="relative aspect-video overflow-hidden">
                    <img src="${item.image}" alt="${item.alt}" width="${item.ancho}" height="${item.alto}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-orient-950/80 via-orient-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        ${overlayHTML}
                    </div>
                    <div class="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 ${pastilla.clase} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        <span aria-hidden="true" class="material-symbols-outlined text-xs">${pastilla.icono}</span> ${pastilla.texto}
                    </div>
                </div>
                <div class="p-5 md:p-6">
                    <h3 class="text-lg md:text-xl font-bold text-orient-950 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        ${item.title}
                    </h3>
                    <p class="text-sm text-orient-600 dark:text-orient-400 leading-relaxed mb-4">
                        ${item.description}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHTML}
                    </div>
                </div>
            </article>
        `;
    });

    montar(grid, marcado, {refrescarAnimaciones: true});
};

// =========================================
// Inicialización y eventos de filtrado
// =========================================

export function iniciarPortafolio() {
    // 1. Renderizado inicial mostrando todos los proyectos
    renderPortfolio('all');

    // 2. Capturar todos los botones de filtro
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Asegurar que capturamos el botón y no el icono <span> de adentro
            const targetBtn = e.currentTarget;
            const filterValue = targetBtn.getAttribute('data-filter');

            // 3. Resetear el estado visual de TODOS los botones a 'inactivo'
            filterBtns.forEach(b => {
                b.classList.remove('active', 'border-primary', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');
                b.classList.add('border-orient-300', 'dark:border-orient-700', 'bg-white', 'dark:bg-orient-950', 'text-orient-600', 'dark:text-orient-300', 'shadow-sm');
                // FASE 2.3: el estado del filtro deja de ser solo cromático
                b.setAttribute('aria-pressed', 'false');
            });

            // 4. Aplicar el estado visual 'activo' SOLO al botón clickeado
            targetBtn.classList.remove('border-orient-300', 'dark:border-orient-700', 'bg-white', 'dark:bg-orient-950', 'text-orient-600', 'dark:text-orient-300', 'shadow-sm');
            targetBtn.classList.add('active', 'border-primary', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');
            targetBtn.setAttribute('aria-pressed', 'true');

            // 5. Re-renderizar la grilla con los proyectos filtrados
            renderPortfolio(filterValue);
        });
    });
}