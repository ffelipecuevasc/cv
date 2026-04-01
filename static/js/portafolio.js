// =========================================
// 1. Base de Datos de Proyectos
// =========================================
const portafolioData = [
    {
        id: "pf-card-cv",
        category: "frontend",
        delay: 0,
        gridSpan: "col-span-12 md:col-span-7",
        image: "static/img/felipe_cuevas_cv.png",
        alt: "Sitio Web Presentacional Felipe Cuevas",
        link: "https://ffelipecuevasc.github.io/ffelipecuevasccv/",
        overlayBadge: {icon: "open_in_new", text: "Ver Proyecto", bgClass: "bg-primary"},
        categoryPill: {icon: "web", text: "Front-End", bgClass: "bg-primary"},
        title: "CV Online — Este Sitio Web",
        description: "Sitio web personal construido con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Tailwind CSS</strong>, HTML5 semántico y JavaScript vanilla. Diseño responsivo con dark mode, animaciones AOS, sistema de componentes reutilizables y despliegue en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">GitHub Pages</strong>.",
        tags: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"]
    },
    {
        id: "pf-card-manza",
        category: "backend",
        delay: 100,
        gridSpan: "col-span-12 md:col-span-5",
        image: "static/img/manzagrafica.png",
        alt: "Manza Gráfica App Django",
        link: null, // Si no hay link, renderiza un badge informativo en vez de un botón clickeable
        overlayBadge: {icon: "terminal", text: "Python · Django", bgClass: "bg-orient-700"},
        categoryPill: {icon: "api", text: "Back-End", bgClass: "bg-orient-800 dark:bg-orient-700"},
        title: "Manza Gráfica App",
        description: "App web de gestión para servicios gráficos. Backend completo en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Python + Django</strong> con ORM, sistema de autenticación, panel de administración y base de datos relacional.",
        tags: ["Python", "Django", "MySQL", "AlwaysData"]
    },
    {
        id: "pf-card-ricardo",
        category: "backend",
        delay: 150,
        gridSpan: "col-span-12 md:col-span-5",
        image: "static/img/ricardo_ortiz.png",
        alt: "Ricardo Ortiz Orfebre",
        link: null,
        overlayBadge: {icon: "terminal", text: "Python · Django", bgClass: "bg-orient-700"},
        categoryPill: {icon: "api", text: "Back-End", bgClass: "bg-orient-800 dark:bg-orient-700"},
        title: "Ricardo Ortiz Orfebre",
        description: "Sitio con catálogo dinámico para orfebrería artesanal. Backend en <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Django</strong> con gestión de inventario de productos y galería administrada desde el panel de Django Admin.",
        tags: ["Python", "Django", "SQLite"]
    },
    {
        id: "pf-card-abogados",
        category: "frontend",
        delay: 200,
        gridSpan: "col-span-12 md:col-span-7",
        image: "static/img/abogados.png",
        alt: "Sitio Web Estudio Abogados",
        link: null,
        overlayBadge: {icon: "web", text: "HTML5 · Bootstrap", bgClass: "bg-primary"},
        categoryPill: {icon: "web", text: "Front-End", bgClass: "bg-primary"},
        title: "Sitio Web Estudio de Abogados",
        description: "Sitio corporativo para estudio jurídico. Front-End con <strong class=\"text-orient-800 dark:text-orient-200 font-semibold\">Bootstrap 5</strong>, landing page optimizada para conversión, formulario de contacto integrado y diseño adaptado al rubro legal con paleta de colores sobria y profesional.",
        tags: ["HTML5", "Bootstrap 5", "CSS3", "JavaScript"]
    }
];

// =========================================
// 2. Motor de Renderizado Dinámico
// =========================================
const renderPortfolio = (filtro = 'all') => {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    let htmlContent = '';

    // Lógica de Filtrado: Si es 'all' pasan todos, si no, solo los que coinciden con la categoría
    const filteredData = portafolioData.filter(item => filtro === 'all' || item.category === filtro);

    filteredData.forEach(item => {
        const overlayHTML = item.link
            ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 ${item.overlayBadge.bgClass} text-white text-xs font-bold rounded-lg hover:opacity-90 transition-colors">
                    <span class="material-symbols-outlined text-sm">${item.overlayBadge.icon}</span> ${item.overlayBadge.text}
               </a>`
            : `<span class="flex items-center gap-2 px-4 py-2 ${item.overlayBadge.bgClass} text-white text-xs font-bold rounded-lg">
                    <span class="material-symbols-outlined text-sm">${item.overlayBadge.icon}</span> ${item.overlayBadge.text}
               </span>`;

        const tagsHTML = item.tags.map(tag => `<span class="px-2 py-1 bg-orient-100 dark:bg-orient-800 text-orient-700 dark:text-orient-300 text-[10px] font-bold rounded uppercase tracking-wider">${tag}</span>`).join('');

        htmlContent += `
            <article id="${item.id}" data-pf-category="${item.category}" class="pf-card ${item.gridSpan} group relative rounded-2xl overflow-hidden border border-orient-200 dark:border-orient-800 bg-white dark:bg-orient-950 shadow-sm" data-aos="fade-up" data-aos-delay="${item.delay}">
                <div class="relative aspect-video overflow-hidden">
                    <img src="${item.image}" alt="${item.alt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-orient-950/80 via-orient-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        ${overlayHTML}
                    </div>
                    <div class="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 ${item.categoryPill.bgClass} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        <span class="material-symbols-outlined text-xs">${item.categoryPill.icon}</span> ${item.categoryPill.text}
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

    // Inyectar HTML
    grid.innerHTML = htmlContent;

    // Refrescar AOS para que las animaciones funcionen en los elementos recién inyectados
    if (typeof AOS !== 'undefined') {
        AOS.refreshHard();
    }
};

// =========================================
// 3. Inicialización y Eventos de Filtrado
// =========================================
document.addEventListener('DOMContentLoaded', () => {
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
            });

            // 4. Aplicar el estado visual 'activo' SOLO al botón clickeado
            targetBtn.classList.remove('border-orient-300', 'dark:border-orient-700', 'bg-white', 'dark:bg-orient-950', 'text-orient-600', 'dark:text-orient-300', 'shadow-sm');
            targetBtn.classList.add('active', 'border-primary', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/30');

            // 5. Re-renderizar la grilla con los proyectos filtrados
            renderPortfolio(filterValue);
        });
    });
});