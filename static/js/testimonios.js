// =========================================
// CAPA DE LÓGICA Y VISTA — Testimonios
// Expone: iniciarTestimonios()
// =========================================
import {testimoniosData} from './datos/testimonios.datos.js';
import {testimoniosUI} from './config/testimonios.config.js';
import {montar, soloValidos} from './servicios/renderizado.js';

export function iniciarTestimonios() {
    // Un testimonio malformado se descarta en vez de romper el carrusel.
    const testimonios = soloValidos(testimoniosData, 'nombre');
    if (testimonios.length === 0) return;

    const grid = document.getElementById('testimonios-grid');
    const btnPrev = document.getElementById('btn-prev-test');
    const btnNext = document.getElementById('btn-next-test');

    let currentIndex = 1;
    let autoplayInterval;
    const AUTOPLAY_TIME = testimoniosUI.autoplayMs;

    const getVisibleIndices = (center) => {
        const total = testimonios.length;
        const left = (center - 1 + total) % total;
        const right = (center + 1) % total;
        return [left, center, right];
    };

    const renderStandardCard = (data) => `
        <div class="relative flex flex-col items-center bg-white dark:glass-mid rounded-[2rem] p-8 shadow-lg border border-orient-200 transition-transform duration-300 hover:-translate-y-2 h-full neon-glow-interactive">
            <div class="absolute -top-12 w-24 h-24 rounded-full border-4 border-white dark:border-orient-900 overflow-hidden bg-orient-100 shadow-md">
                <img src="${data.imagen}" alt="${data.nombre}" width="${data.ancho}" height="${data.alto}" class="w-full h-full object-cover" loading="lazy" decoding="async" data-sustituto="avatar" data-sustituto-fondo="${testimoniosUI.avatarSustituto.estandar.fondo}" data-sustituto-texto="${testimoniosUI.avatarSustituto.estandar.texto}">
            </div>
            <div class="mt-10 text-center flex flex-col items-center w-full h-full">
                <h3 class="text-lg font-bold text-orient-950 dark:text-white">${data.nombre}</h3>
                <p class="text-[11px] text-orient-500 dark:text-orient-400 mb-4 font-bold uppercase tracking-wider h-8 flex items-center justify-center">${data.cargo}</p>
                <div class="flex gap-1 text-accent-gold mb-4">
                    ${`<span aria-hidden="true" class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">${testimoniosUI.iconos.estrella}</span>`.repeat(testimoniosUI.cantidadEstrellas)}
                </div>
                <span aria-hidden="true" class="material-symbols-outlined text-4xl text-orient-200 dark:text-orient-700 mb-2">${testimoniosUI.iconos.cita}</span>
                <p class="text-orient-600 dark:text-orient-300 text-sm leading-relaxed flex-1 flex items-center">${data.texto}</p>
            </div>
        </div>
    `;

    const renderSpotlightCard = (data) => `
        <div class="relative flex flex-col items-center bg-primary rounded-[2rem] p-8 shadow-2xl lg:scale-105 border border-primary-vibrant/30 z-10 transition-transform duration-300 hover:-translate-y-2 lg:hover:scale-110 h-full neon-glow-interactive">
            <div class="absolute -top-12 w-24 h-24 rounded-full border-4 border-primary overflow-hidden bg-white shadow-md">
                <img src="${data.imagen}" alt="${data.nombre}" width="${data.ancho}" height="${data.alto}" class="w-full h-full object-cover" loading="lazy" decoding="async" data-sustituto="avatar" data-sustituto-fondo="${testimoniosUI.avatarSustituto.destacado.fondo}" data-sustituto-texto="${testimoniosUI.avatarSustituto.destacado.texto}">
            </div>
            <div class="mt-10 text-center flex flex-col items-center w-full h-full">
                <h3 class="text-lg font-bold text-white">${data.nombre}</h3>
                <p class="text-[11px] text-orient-100 mb-4 font-bold uppercase tracking-wider h-8 flex items-center justify-center">${data.cargo}</p>
                <div class="flex gap-1 text-white mb-4">
                    ${`<span aria-hidden="true" class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">${testimoniosUI.iconos.estrella}</span>`.repeat(testimoniosUI.cantidadEstrellas)}
                </div>
                <span aria-hidden="true" class="material-symbols-outlined text-4xl text-white/30 mb-2">${testimoniosUI.iconos.cita}</span>
                <p class="text-white text-sm leading-relaxed font-medium flex-1 flex items-center">${data.texto}</p>
            </div>
        </div>
    `;

    const updateCarousel = () => {
        grid.classList.remove('opacity-100');
        grid.classList.add('opacity-0');

        setTimeout(() => {
            const [idxLeft, idxCenter, idxRight] = getVisibleIndices(currentIndex);

            montar(grid, `
                <div class="hidden lg:block h-full">${renderStandardCard(testimonios[idxLeft])}</div>
                <div class="block h-full">${renderSpotlightCard(testimonios[idxCenter])}</div>
                <div class="hidden lg:block h-full">${renderStandardCard(testimonios[idxRight])}</div>
            `);

            grid.classList.remove('opacity-0');
            grid.classList.add('opacity-100');
        }, testimoniosUI.transicionMs);
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % testimonios.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + testimonios.length) % testimonios.length;
        updateCarousel();
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_TIME);
    };

    btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    btnPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    grid.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    grid.addEventListener('mouseleave', resetAutoplay);

    updateCarousel();
    resetAutoplay();
}