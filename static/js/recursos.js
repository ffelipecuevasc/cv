// =========================================
// 1. Base de Datos de Recursos Educativos
// =========================================
const recursosData = [
    {
        id: 1,
        titulo: "Optimización de Perfil LinkedIn para Devs",
        descripcion: "Manual de estrategia y posicionamiento digital para destacar en búsquedas de reclutadores IT.",
        categoriaPadre: "Empleabilidad",
        categoriaFiltro: "Empleabilidad",
        formato: "pdf",
        dificultad: "Básico",
        tecnologia: "LinkedIn",
        url: "static/recursos/empleabilidad/MANUAL - Perfil LinkedIn.pdf"
    },
    {
        id: 2,
        titulo: "Hackatón de Estudio para Django & Python",
        descripcion: "Actividad en modalidad Hackatón para profundizar en Django y Python.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Python",
        url: "static/recursos/python/ACTIVIDAD - Hackatón de Estudio.pdf"
    },
    {
        id: 3,
        titulo: "Taller: Despliega tu CV Online",
        descripcion: "Actividad guiada para construir y desplegar tu propio portafolio web utilizando la IA Stitch.",
        categoriaPadre: "Empleabilidad",
        categoriaFiltro: "Empleabilidad",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "HTML/CSS & GitHub",
        url: "static/recursos/empleabilidad/TALLER - CV Online.pdf"
    },
    {
        id: 4,
        titulo: "Taller: Despliegue en AlwaysData",
        descripcion: "Procedimiento técnico paso a paso para llevar tu proyecto Django a producción conectando GitHub y bases de datos MySQL.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "pdf",
        dificultad: "Intermedio",
        tecnologia: "Django & MySQL",
        url: "static/recursos/python/TALLER - Despliegue Plataforma AlwaysData.pdf"
    },
    {
        id: 5,
        titulo: "Taller: Despliegue en Google Cloud Platform",
        descripcion: "Taller práctico para el despliegue profesional de aplicaciones web en una arquitectura Serverless utilizando Cloud Run.",
        categoriaPadre: "Desarrollo Full Stack Python",
        categoriaFiltro: "Python",
        formato: "pdf",
        dificultad: "Avanzado",
        tecnologia: "Google Cloud",
        url: "static/recursos/python/TALLER - Despliegue Plataforma Google Cloud.pdf"
    }
];

// =========================================
// 2. Diccionarios de UI (Colores e Iconos)
// =========================================
const uiConfig = {
    formato: {
        "pdf": { icon: "picture_as_pdf", bgClass: "bg-red-100 dark:bg-red-900/30", textClass: "text-red-600 dark:text-red-400", btnText: "Descargar", btnIcon: "download" },
        "github": { icon: "folder_zip", bgClass: "bg-gray-100 dark:bg-gray-800", textClass: "text-gray-700 dark:text-gray-300", btnText: "Ver Repo", btnIcon: "open_in_new" },
        "video": { icon: "play_circle", bgClass: "bg-blue-100 dark:bg-blue-900/30", textClass: "text-blue-600 dark:text-blue-400", btnText: "Ver Clase", btnIcon: "play_arrow" }
    },
    dificultad: {
        "Básico": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/50",
        "Intermedio": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50",
        "Avanzado": "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50"
    }
};

// =========================================
// 3. Motor de Renderizado y Filtrado
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('recursos-grid');
    const searchInput = document.getElementById('search-recursos');
    const filterBtns = document.querySelectorAll('.filtro-btn');

    let currentFilter = 'Todos';
    let currentSearch = '';

    const renderCards = (data) => {
        grid.innerHTML = '';

        if (data.length === 0) {
            grid.innerHTML = `
                <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                    <span class="material-symbols-outlined text-5xl text-orient-300 dark:text-orient-700 mb-2">search_off</span>
                    <p class="text-orient-600 dark:text-orient-400 font-medium">No se encontraron recursos con esos parámetros.</p>
                </div>`;
            return;
        }

        data.forEach((item, index) => {
            const formatUI = uiConfig.formato[item.formato];
            const diffUI = uiConfig.dificultad[item.dificultad];
            const delay = (index % 6) * 100;

            // Se elimina el bg-white/60 y el backdrop-blur de la tarjeta para mantener coherencia visual plana
            const cardHTML = `
                <div data-aos="fade-up" data-aos-delay="${delay}" class="group flex flex-col bg-white dark:bg-orient-900 rounded-2xl border border-orient-200 dark:border-orient-800 shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div class="p-6 flex flex-col h-full">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center justify-center w-12 h-12 rounded-xl ${formatUI.bgClass} ${formatUI.textClass} shadow-inner group-hover:scale-110 transition-transform">
                                <span class="material-symbols-outlined text-2xl">${formatUI.icon}</span>
                            </div>
                            <span class="${diffUI} text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest border">${item.dificultad}</span>
                        </div>
                        <p class="text-[11px] font-bold text-orient-500 uppercase tracking-widest mb-1">${item.categoriaPadre}</p>
                        <h3 class="text-xl font-bold text-orient-950 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">${item.titulo}</h3>
                        <p class="text-sm text-orient-600 dark:text-orient-400 line-clamp-2 mb-4 flex-1">${item.descripcion}</p>
                        <div class="pt-4 border-t border-orient-100 dark:border-orient-800 flex items-center justify-between mt-auto">
                            <div class="flex items-center gap-1 text-orient-700 dark:text-orient-300 bg-orient-50 dark:bg-orient-800/50 px-2 py-1 rounded text-xs font-semibold">
                                <span class="material-symbols-outlined text-[14px]">code</span> ${item.tecnologia}
                            </div>
                            <a href="${item.url}" target="_blank" ${item.formato === 'pdf' ? 'download' : ''} class="text-primary hover:text-white hover:bg-primary px-4 py-2 rounded-lg text-sm font-bold transition-all border border-transparent hover:border-primary/50 flex items-center gap-1">
                                ${formatUI.btnText} <span class="material-symbols-outlined text-sm">${formatUI.btnIcon}</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });

        if (typeof AOS !== 'undefined') AOS.refreshHard();
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

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.getAttribute('data-filter');

            filterBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-md');
                b.classList.add('bg-white/50', 'dark:bg-orient-800/50', 'text-orient-700', 'dark:text-orient-200', 'border-orient-200', 'dark:border-orient-700');
            });

            e.target.classList.remove('bg-white/50', 'dark:bg-orient-800/50', 'text-orient-700', 'dark:text-orient-200', 'border-orient-200', 'dark:border-orient-700');
            e.target.classList.add('bg-primary', 'text-white', 'shadow-md');

            filterAndRender();
        });
    });

    renderCards(recursosData);
});