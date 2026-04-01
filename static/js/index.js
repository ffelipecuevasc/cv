// =========================================
// 1. Datos Estáticos de Certificaciones
// =========================================
const certificacionesData = {
    "aws-cloud": {
        titulo: "AWS Cloud Practitioner",
        emisor: "Amazon Web Services",
        fecha: "Ene. 2026",
        habilidades: "Tecnología de la Nube",
        imagen: "static/img/logos/aws_cloud_practitioner.png",
        url: "https://www.credly.com/badges/2d45672a-48b4-4013-808f-31c04072bb73/public_url"
    },
    "aws-ai": {
        titulo: "AWS AI Practitioner",
        emisor: "Amazon Web Services",
        fecha: "Ene. 2026",
        habilidades: "Inteligencia Artificial",
        imagen: "static/img/logos/aws_ai_practitioner.png",
        url: "https://www.credly.com/badges/c988f3a8-7022-43cb-9d65-9aa24e88f97f/public_url"
    },
    "oracle-ai-pro": {
        titulo: "Oracle AI Professional",
        emisor: "Oracle",
        fecha: "Ago. 2025",
        habilidades: "Inteligencia Artificial Generativa",
        imagen: "static/img/logos/oracle_ai_professional.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6582C447AEECF465B74B30D01D884790D1DED49B9AE05C578BE6FC5F87FE6F81"
    },
    "oracle-dev-pro": {
        titulo: "Oracle Developer Professional",
        emisor: "Oracle",
        fecha: "Sep. 2025",
        habilidades: "Desarrollo de Aplicaciones",
        imagen: "static/img/logos/oracle_developer_professional.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4D11E3EE49FE3FEA9B35687602B2C0DC19F0E7199C4AF982770081E4BDC783B5"
    },
    "oracle-oci-assoc": {
        titulo: "Oracle OCI Associate",
        emisor: "Oracle",
        fecha: "Ago. 2025",
        habilidades: "Tecnología en la Nube Oracle",
        imagen: "static/img/logos/oracle_cloud_associate.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FF54D5ABED5E9CB3DC9911C38388286977EA4716538312B45208B541F980CEB9"
    },
    "oracle-ai-assoc": {
        titulo: "Oracle AI Associate",
        emisor: "Oracle",
        fecha: "Sep. 2025",
        habilidades: "Inteligencia Artificial Aprendizaje de Máquina",
        imagen: "static/img/logos/oracle_ai_associate.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D2718C25F892B7E4971471C86FD8B46CB74494922FE11EA5F7CBAB9A064CB45F"
    },
    "oracle-data-pro": {
        titulo: "Oracle Data Science Professional",
        emisor: "Oracle",
        fecha: "Oct. 2025",
        habilidades: "Ciencia de Datos IA",
        imagen: "static/img/logos/oracle_data_science_professional.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=49DC655EC45500898B6310E36C9CF5ABC57B48F1BACA784ED3E296BDEFCC3F98"
    },
    "python-pcep": {
        titulo: "Python Institute PCEP",
        emisor: "Python",
        fecha: "Dic. 2025",
        habilidades: "Desarrollador Python",
        imagen: "static/img/logos/python_pcep.png",
        url: "https://verify.openedg.org/?id=X8Wv.TU7j.416N"
    }
};

// =========================================
// 2. Evento Principal DOMContentLoaded
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar Componentes Globales (Header, Footer y Botón Volver Arriba)
    injectComponents();

    // 2. Inicializar Lógica (Eventos) una vez que el HTML existe
    initializeLogic();

    // 3. Inicializar Lógica del Modal de Certificaciones
    initializeModalLogic();

    // 4. Inicializar Lógica del "Smart Header"
    initializeSmartHeader();
});

// =========================================
// 3. Inyección de Componentes HTML
// =========================================
function injectComponents() {
    // --- A. DEFINICIÓN DEL HEADER ---
    const headerHTML = `
    <div class="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
            <div class="text-primary">
                <span class="material-symbols-outlined text-3xl">terminal</span>
            </div>
            <h1 class="text-xl font-bold tracking-tight text-orient-950 dark:text-white">CV Felipe Cuevas</h1>
        </div>

        <button id="mobile-menu-btn" class="md:hidden text-orient-700 dark:text-orient-200 focus:outline-none">
            <span class="material-symbols-outlined text-3xl">menu</span>
        </button>

        <nav class="hidden md:flex flex-1 justify-center items-center gap-10">
            <a class="nav-link text-sm font-medium hover:text-primary transition-colors" href="index.html">Inicio</a>
            <a class="nav-link text-sm font-medium hover:text-primary transition-colors" href="educacion.html">Educación</a>
            <div class="relative group h-full py-2">
                <a class="nav-link flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors" href="experiencia.html">
                    Experiencia
                    <span class="material-symbols-outlined text-base">expand_more</span>
                </a>
                <div class="dropdown-menu absolute left-1/2 -translate-x-1/2 top-full hidden pt-2">
                    <div class="w-48 bg-white dark:bg-orient-900 border-t-2 border-primary shadow-xl rounded-b-lg overflow-hidden ring-1 ring-black/5">
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-orient-800 transition-colors border-b border-orient-100 dark:border-orient-800" href="desarrollador.html">Desarrollador</a>
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-orient-800 transition-colors border-b border-orient-100 dark:border-orient-800" href="docente.html">Docente Universitario</a>
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-orient-800 transition-colors border-b border-orient-100 dark:border-orient-800" href="instructor.html">Instructor REUF</a>
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-orient-800 transition-colors border-b border-orient-100 dark:border-orient-800" href="talento-digital.html">Talento Digital</a>
                    </div>
                </div>
            </div>
            <a class="nav-link text-sm font-medium hover:text-primary transition-colors" href="recursos.html">Recursos</a>
            <a class="nav-link text-sm font-medium hover:text-primary transition-colors" href="contacto.html">Contacto</a>
        </nav>

        <div class="hidden md:flex items-center gap-4">
            <a href="static/CV_Felipe_Cuevas_2026.pdf" download="CV_Felipe_Cuevas_2026.pdf" class="flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                Descargar CV
            </a>
        </div>
    </div>

    <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-white dark:bg-orient-900 border-b border-orient-200 dark:border-orient-800 shadow-xl">
        <div class="flex flex-col p-4 space-y-4">
            <a class="text-base font-medium hover:text-primary transition-colors" href="index.html">Inicio</a>
            <a class="text-base font-medium hover:text-primary transition-colors" href="educacion.html">Educación</a>
            <a class="text-base font-medium hover:text-primary transition-colors" href="experiencia.html">Experiencia General</a>
            <div class="pl-4 border-l-2 border-orient-100 dark:border-orient-700 space-y-2">
                <a class="block text-sm text-orient-500 hover:text-primary" href="desarrollador.html">Desarrollador</a>
                <a class="block text-sm text-orient-500 hover:text-primary" href="docente.html">Docente</a>
                <a class="block text-sm text-orient-500 hover:text-primary" href="instructor.html">Instructor REUF</a>
                <a class="block text-sm text-orient-500 hover:text-primary" href="talento-digital.html">Talento Digital</a>
            </div>
            <a class="text-base font-medium hover:text-primary transition-colors" href="recursos.html">Recursos</a>
            <a class="text-base font-medium hover:text-primary transition-colors" href="contacto.html">Contacto</a>
            <a href="static/CV_Felipe_Cuevas_2026.pdf" download="CV_Felipe_Cuevas_2026.pdf" class="flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white w-full">
                Descargar CV
            </a>
        </div>
    </div>
    `;

    // --- B. DEFINICIÓN DEL FOOTER ---
    const footerHTML = `
    <div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p class="text-sm font-medium text-orient-400">© <span id="current-year"></span> Sitio Web desarrollado por <a href="https://www.linkedin.com/in/ffelipecuevasc/" class="hover:text-primary transition-colors">Felipe Cuevas</a></p>
        <div class="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/ffelipecuevasc/" target="_blank" class="text-orient-400 hover:text-primary transition-colors" aria-label="LinkedIn Profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.07 0-1.62.8-1.62 2.35V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
            </a>
            <button id="theme-toggle" class="flex items-center gap-2 rounded-full border border-orient-200 dark:border-orient-800 px-5 py-2.5 text-xs font-bold tracking-wide uppercase hover:bg-orient-50 dark:hover:bg-orient-900 transition-colors">
                <span class="material-symbols-outlined text-lg">contrast</span>
                Cambiar Tema
            </button>
        </div>
    </div>
    `;

    // --- C. DEFINICIÓN DEL BOTÓN VOLVER ARRIBA ---
    const backToTopHTML = `
    <button id="back-to-top" class="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 opacity-0 invisible transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 focus:outline-none" aria-label="Volver arriba">
        <span class="material-symbols-outlined text-2xl font-bold">arrow_upward</span>
    </button>
    `;

    // --- D. INYECCIÓN EN EL DOM ---
    const headerElement = document.getElementById('app-header');
    const footerElement = document.getElementById('app-footer');

    if (headerElement) headerElement.innerHTML = headerHTML;
    if (footerElement) footerElement.innerHTML = footerHTML;

    // Inyectamos el botón 'Volver Arriba' directamente al final del body
    document.body.insertAdjacentHTML('beforeend', backToTopHTML);

    // --- E. UX: RESALTAR PÁGINA ACTIVA ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Lógica para detectar si estamos en la página del enlace
        if ((linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) ||
            (linkPath !== 'index.html' && currentPath.includes(linkPath))) {
            link.classList.add('text-primary');
            link.classList.remove('text-orient-700', 'dark:text-orient-300'); // Quitamos color base si existiera
        }
    });
}

// =========================================
// 4. Inicialización de Lógica General
// =========================================
function initializeLogic() {
    // =========================================
    // 1. Lógica del Modo Oscuro
    // =========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // =========================================
    // 2. Lógica del Menú Móvil
    // =========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // =========================================
    // 3. Año Dinámico
    // =========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =========================================
    // 4. Lógica Botón Volver Arriba
    // =========================================
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Mostrar/Ocultar al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Si baja más de 300px
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        // Acción al hacer click (Scroll suave al inicio)
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================
    // 5. Inicialización de Animaciones (AOS)
    // =========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600, // Duración de la animación en milisegundos
            once: true,    // La animación ocurre solo una vez al hacer scroll
            easing: 'ease-out-quad', // Curva de animación profesional
        });
    }
}

// =========================================
// 5. Lógica del Modal de Certificaciones
// =========================================
function initializeModalLogic() {
    const modal = document.getElementById('cert-modal');
    const modalContent = document.getElementById('cert-modal-content');
    const closeBtn = document.getElementById('close-modal-btn');
    const triggers = document.querySelectorAll('.modal-trigger');

    // Si no estamos en la página de educación o no hay modal, salimos de la función
    if (!modal || triggers.length === 0) return;

    // Elementos del DOM a rellenar con datos
    const imgEl = document.getElementById('cert-modal-img');
    const titleEl = document.getElementById('cert-modal-title');
    const issuerEl = document.getElementById('cert-modal-issuer');
    const dateEl = document.getElementById('cert-modal-date');
    const skillsEl = document.getElementById('cert-modal-skills');
    const urlEl = document.getElementById('cert-modal-url');

    // Función para abrir el modal
    const openModal = (certId) => {
        const data = certificacionesData[certId];
        if (!data) return; // Prevención de errores

        // 1. Inyectar los datos en el HTML
        imgEl.src = data.imagen;
        imgEl.alt = "Logo " + data.titulo;
        titleEl.textContent = data.titulo;
        issuerEl.textContent = data.emisor;
        dateEl.textContent = data.fecha;
        skillsEl.textContent = data.habilidades;
        urlEl.href = data.url;

        // 2. Mostrar el modal (animación de entrada)
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Pequeño retraso para que CSS procese la transición fluida
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);

        // 3. Evitar que el usuario haga scroll en el fondo mientras el modal está abierto
        document.body.style.overflow = 'hidden';
    };

    // Función para cerrar el modal
    const closeModal = () => {
        // 1. Animación de salida
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');

        // 2. Esperar a que termine la transición (300ms) para ocultar totalmente
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);

        // 3. Devolver el scroll al body
        document.body.style.overflow = '';
    };

    // --- EVENT LISTENERS ---

    // A. Escuchar clics en las tarjetas
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const certId = trigger.getAttribute('data-cert-id');
            openModal(certId);
        });
    });

    // B. Cerrar al hacer clic en la "X"
    closeBtn.addEventListener('click', closeModal);

    // C. Cerrar al hacer clic afuera (en el fondo oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // D. Cerrar al presionar la tecla "Escape"
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// =========================================
// 6. Inicialización de Animaciones (AOS)
// =========================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 600, // Duración de la animación en milisegundos
        once: true,    // La animación ocurre solo una vez al hacer scroll
        easing: 'ease-out-quad', // Curva de animación profesional
    });
}

// =========================================
// 7. Lógica del "Smart Header"
// =========================================
function initializeSmartHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    // 1. Añadir clases de transición para que el movimiento sea fluido
    header.classList.add('transition-transform', 'duration-300', 'ease-in-out');

    // 2. Variable de estado para registrar la posición anterior del scroll
    let lastScroll = 0;

    // 3. Listener del evento de scroll
    window.addEventListener('scroll', () => {
        // 4. Capturar el scroll actual
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // 5. Validar caso extremo: si el menú móvil está abierto, no hacer nada
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            return;
        }

        // 6. Lógica de ocultamiento: scroll hacia abajo y más de 80px
        if (currentScroll > lastScroll && currentScroll > 80) {
            header.classList.add('-translate-y-full');
        } 
        // 7. Lógica de revelado: scroll hacia arriba
        else if (currentScroll < lastScroll) {
            header.classList.remove('-translate-y-full');
        }

        // 8. Actualizar el estado para la próxima evaluación, evitando números negativos
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// =========================================
// 8. Lógica "Spotlight" del Portafolio
// =========================================
function initializePortfolioSpotlight() {
    const btnFront = document.getElementById('pf-btn-front');
    const btnBack  = document.getElementById('pf-btn-back');
    const cards    = document.querySelectorAll('.pf-card');

    // Si no existen las tarjetas, no hacemos nada
    if (cards.length === 0) return;

    function applySpotlight(activeCategory) {
        cards.forEach(function (card) {
            if (card.dataset.pfCategory === activeCategory) {
                card.classList.remove('pf-dimmed');
                card.classList.add('pf-active');
            } else {
                card.classList.remove('pf-active');
                card.classList.add('pf-dimmed');
            }
        });
    }

    function resetAll() {
        cards.forEach(function (card) {
            card.classList.remove('pf-dimmed', 'pf-active');
        });
    }

    // Bindings de eventos
    if (btnFront) {
        btnFront.addEventListener('mouseenter', function () { applySpotlight('frontend'); });
        btnFront.addEventListener('mouseleave', resetAll);
        btnFront.addEventListener('focus',      function () { applySpotlight('frontend'); });
        btnFront.addEventListener('blur',       resetAll);
    }
    if (btnBack) {
        btnBack.addEventListener('mouseenter', function () { applySpotlight('backend'); });
        btnBack.addEventListener('mouseleave', resetAll);
        btnBack.addEventListener('focus',      function () { applySpotlight('backend'); });
        btnBack.addEventListener('blur',       resetAll);
    }
}