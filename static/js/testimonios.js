// =========================================
// 1. Base de Datos de Testimonios
// =========================================
const testimoniosData = [
    {
        id: 1,
        nombre: "Camilo Villalobos",
        cargo: "Ing. de Automatización y Control",
        imagen: "static/img/testimonios/camilo.webp",
        texto: "Es ese perfil escaso que combina la rigurosidad y profundidad del mundo de la programación con una habilidad excepcional para la enseñanza. Sus clases son dinámicas y muy orientadas a los desafíos reales del mercado."
    },
    {
        id: 2,
        nombre: "Zuggeits Meriño",
        cargo: "Estudiante de Software (Dev)",
        imagen: "static/img/testimonios/zuggeits.webp",
        texto: "Un excelente profesor, muy dedicado y de gran corazón, se preocupa por los avances educativos de sus alumnos. Le recomiendo a cualquier institución educativa, este es el profesor que necesitan."
    },
    {
        id: 3,
        nombre: "Gonzalo Vera",
        cargo: "Desarrollador Full Stack Jr.",
        imagen: "static/img/testimonios/gonzalo.webp",
        texto: "Destaco especialmente su dedicación y compromiso. Siempre fue muy claro en sus explicaciones, logrando transmitir conceptos complejos de forma simple y práctica, apoyado en su vasta experiencia en proyectos reales."
    },
    {
        id: 4,
        nombre: "Montserrat Espinoza",
        cargo: "Full Stack Developer",
        imagen: "static/img/testimonios/montserrat.webp",
        texto: "Es un excelente instructor, tremendamente dedicado y comprometido. Se esmera por que las clases sean entretenidas y comprensibles. Es muy empático y siempre está preocupado por el avance de todos los alumnos."
    },
    {
        id: 5,
        nombre: "Jacqueline Bastias",
        cargo: "Desarrolladora Python & AI Architect",
        imagen: "static/img/testimonios/jacqueline.webp",
        texto: "Un profesional integral que redefine la docencia. Posee un dominio técnico indiscutible, pero su vocación pedagógica es lo que lo distingue. Un ser humano excepcional que se preocupa genuinamente por sus alumnos."
    },
    {
        id: 6,
        nombre: "Rodrigo Arevalo",
        cargo: "Full Stack Python Developer Junior",
        imagen: "static/img/testimonios/rodrigo.webp",
        texto: "Destaco su calidad humana y su disposición incondicional para resolver hasta la duda más compleja con paciencia. Personas con esta vocación por la enseñanza son las que realmente transforman la carrera de un desarrollador."
    },
    {
        id: 7,
        nombre: "Emilio Delgado",
        cargo: "Desarrollador Full Stack",
        imagen: "static/img/testimonios/emilio.webp",
        texto: "Demuestra un gran dominio técnico y una metodología clara y práctica. Se adapta al perfil de cada alumno, enseña con paciencia y transmite su amplia experiencia. Altamente recomendable como instructor y mentor."
    },
    {
        id: 8,
        nombre: "Sergio Fernandez",
        cargo: "Back-end Developer",
        imagen: "static/img/testimonios/sergio.webp",
        texto: "Un profesional con una vocación auténtica. Su manera de transmitir conocimientos es clara y estructurada, contextualizando con ejemplos reales. Gracias a su paciencia y cercanía, crea un entorno de aprendizaje participativo."
    },
    {
        id: 9,
        nombre: "Liliana Cedeño",
        cargo: "Desarrollador Web | Java | Spring Boot",
        imagen: "static/img/testimonios/liliana.webp",
        texto: "Profesional dedicado y enfocado. Su capacidad de instruir e impulsar el aprendizaje es una de sus cualidades más importantes. Su experticia técnica lo hace un Relator de excelencia y un líder de gran calidad."
    },
    {
        id: 10,
        nombre: "Elio Duran",
        cargo: "Machine Learning | Python-Java",
        imagen: "static/img/testimonios/elio.webp",
        texto: "Dejo constancia de su fortaleza especializada como Relator, tanto en lo teórico como en lo práctico, enseñando Java y Spring Boot. Fue una guía permanente y un excelente apoyo durante todo el bootcamp."
    },
    {
        id: 11,
        nombre: "Oscar Leal",
        cargo: "Desarrollador Backend Junior",
        imagen: "static/img/testimonios/oscar.webp",
        texto: "Excelente profesional con capacidad inestimable para explicar conceptos complejos e inspirar pasión por la tecnología. Los sólidos conocimientos técnicos adquiridos bajo su dirección son una guía muy valiosa."
    },
    {
        id: 12,
        nombre: "Renato Tapia",
        cargo: "Líder Técnico Sénior en BCI",
        imagen: "static/img/testimonios/renato.webp",
        texto: "Líder en el equipo con sólidos conocimientos técnicos y un alto estándar de calidad. Posee una habilidad única para transmitir conceptos de manera clara y concisa. Lo recomendaría sin dudarlo como ingeniero y profesor."
    }
];

// =========================================
// 2. Motor del Carrusel Spotlight
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('testimonios-grid');
    const btnPrev = document.getElementById('btn-prev-test');
    const btnNext = document.getElementById('btn-next-test');

    let currentIndex = 1;
    let autoplayInterval;
    const AUTOPLAY_TIME = 6000;

    const getVisibleIndices = (center) => {
        const total = testimoniosData.length;
        const left = (center - 1 + total) % total;
        const right = (center + 1) % total;
        return [left, center, right];
    };

    const renderStandardCard = (data) => `
        <div class="relative flex flex-col items-center bg-white dark:glass-mid rounded-[2rem] p-8 shadow-lg border border-orient-200 transition-transform duration-300 hover:-translate-y-2 h-full neon-glow-interactive">
            <div class="absolute -top-12 w-24 h-24 rounded-full border-4 border-white dark:border-orient-900 overflow-hidden bg-orient-100 shadow-md">
                <img src="${data.imagen}" alt="${data.nombre}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.nombre)}&background=007EA7&color=fff'">
            </div>
            <div class="mt-10 text-center flex flex-col items-center w-full h-full">
                <h3 class="text-lg font-bold text-orient-950 dark:text-white">${data.nombre}</h3>
                <p class="text-[11px] text-orient-500 dark:text-orient-400 mb-4 font-bold uppercase tracking-wider h-8 flex items-center justify-center">${data.cargo}</p>
                <div class="flex gap-1 text-accent-gold mb-4">
                    ${'<span class="material-symbols-outlined text-lg" style="font-variation-settings: \'FILL\' 1;">star</span>'.repeat(5)}
                </div>
                <span class="material-symbols-outlined text-4xl text-orient-200 dark:text-orient-700 mb-2">format_quote</span>
                <p class="text-orient-600 dark:text-orient-300 text-sm leading-relaxed flex-1 flex items-center">${data.texto}</p>
            </div>
        </div>
    `;

    const renderSpotlightCard = (data) => `
        <div class="relative flex flex-col items-center bg-primary rounded-[2rem] p-8 shadow-2xl lg:scale-105 border border-primary-vibrant/30 z-10 transition-transform duration-300 hover:-translate-y-2 lg:hover:scale-110 h-full neon-glow-interactive">
            <div class="absolute -top-12 w-24 h-24 rounded-full border-4 border-primary overflow-hidden bg-white shadow-md">
                <img src="${data.imagen}" alt="${data.nombre}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.nombre)}&background=ffffff&color=007EA7'">
            </div>
            <div class="mt-10 text-center flex flex-col items-center w-full h-full">
                <h3 class="text-lg font-bold text-white">${data.nombre}</h3>
                <p class="text-[11px] text-orient-100 mb-4 font-bold uppercase tracking-wider h-8 flex items-center justify-center">${data.cargo}</p>
                <div class="flex gap-1 text-white mb-4">
                    ${'<span class="material-symbols-outlined text-lg" style="font-variation-settings: \'FILL\' 1;">star</span>'.repeat(5)}
                </div>
                <span class="material-symbols-outlined text-4xl text-white/30 mb-2">format_quote</span>
                <p class="text-white text-sm leading-relaxed font-medium flex-1 flex items-center">${data.texto}</p>
            </div>
        </div>
    `;

    const updateCarousel = () => {
        grid.classList.remove('opacity-100');
        grid.classList.add('opacity-0');

        setTimeout(() => {
            const [idxLeft, idxCenter, idxRight] = getVisibleIndices(currentIndex);

            grid.innerHTML = `
                <div class="hidden lg:block h-full">${renderStandardCard(testimoniosData[idxLeft])}</div>
                <div class="block h-full">${renderSpotlightCard(testimoniosData[idxCenter])}</div>
                <div class="hidden lg:block h-full">${renderStandardCard(testimoniosData[idxRight])}</div>
            `;

            grid.classList.remove('opacity-0');
            grid.classList.add('opacity-100');
        }, 300);
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % testimoniosData.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + testimoniosData.length) % testimoniosData.length;
        updateCarousel();
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_TIME);
    };

    btnNext.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    btnPrev.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    grid.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    grid.addEventListener('mouseleave', resetAutoplay);

    updateCarousel();
    resetAutoplay();
});