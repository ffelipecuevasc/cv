// =========================================
// 1. Evento Principal DOMContentLoaded
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // El header, footer y botón 'volver arriba' ahora son marcado estático (Fase 2.1 / H-03).
    // Solo inicializamos el comportamiento interactivo sobre el DOM ya presente.
    initializeLogic();

    // 3. Inicializar Lógica del Modal de Certificaciones
    if (typeof initializeModalLogic === 'function') initializeModalLogic();

    // 4. Inicializar Motor Sensorial del Efecto Linterna (Modo Claro)
    initializeFlashlightEffect();
});



// =========================================
// 3. Inicialización de Lógica General
// =========================================
function initializeLogic() {
    // =========================================
    // 1. Lógica del Modo Oscuro
    // =========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // FASE 8: Añadir clase temporal para transición suave
            htmlElement.classList.add('theme-transitioning');

            htmlElement.classList.toggle('dark');
            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }

            // FASE 8: Remover la clase temporal exactamente después de la transición
            setTimeout(() => {
                htmlElement.classList.remove('theme-transitioning');
            }, 400);
        });
    }

    // =========================================
    // 2. Lógica del Menú Móvil (Slide-over)
    // =========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isClosed = mobileMenu.classList.contains('max-h-0');

            if (isClosed) {
                // Abrir menú
                mobileMenu.classList.remove('max-h-0', 'border-b-0');
                mobileMenu.classList.add('max-h-[800px]', 'border-b');
                menuIcon.textContent = 'close';
                menuIcon.classList.add('rotate-90'); // Pequeño giro al icono
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                // Cerrar menú
                mobileMenu.classList.add('max-h-0', 'border-b-0');
                mobileMenu.classList.remove('max-h-[800px]', 'border-b');
                menuIcon.textContent = 'menu';
                menuIcon.classList.remove('rotate-90');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
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
// 4. Inicialización de Animaciones (AOS)
// =========================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 600, // Duración de la animación en milisegundos
        once: true,    // La animación ocurre solo una vez al hacer scroll
        easing: 'ease-out-quad', // Curva de animación profesional
    });
}

// =========================================
// 5. Motor Sensorial: Efecto Linterna (Modo Claro)
// =========================================
function initializeFlashlightEffect() {
    const flashlightLayer = document.getElementById('flashlight-layer');

    // Blindaje: Si el contenedor no existe, no ejecutamos nada.
    if (!flashlightLayer) return;

    let rafId = null;

    // Escuchador global de movimiento de ratón
    document.addEventListener('mousemove', (e) => {
        // Cancelamos el frame anterior si aún no se ha renderizado (evita cuellos de botella)
        if (rafId) {
            cancelAnimationFrame(rafId);
        }

        // Delegamos el cálculo al refresco nativo de la pantalla del navegador
        rafId = requestAnimationFrame(() => {
            // Capturamos posición física exacta en pixeles
            const x = e.clientX;
            const y = e.clientY;

            // Inyectamos las coordenadas como variables CSS directamente en la capa
            flashlightLayer.style.setProperty('--mouse-x', `${x}px`);
            flashlightLayer.style.setProperty('--mouse-y', `${y}px`);
        });
    }, { passive: true }); // passive:true mejora el rendimiento permitiendo un scroll fluido
}