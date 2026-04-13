// =========================================
// 1. Evento Principal DOMContentLoaded
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar Componentes Globales (Header, Footer y Botón Volver Arriba)
    injectComponents();

    // 2. Inicializar Lógica (Eventos) una vez que el HTML existe
    initializeLogic();

    // 3. Inicializar Lógica del Modal de Certificaciones
    initializeModalLogic();
});

// =========================================
// 2. Inyección de Componentes HTML (MODIFICADO FASE 2 - GLASSMORPHISM)
// =========================================
function injectComponents() {
    // --- A. DEFINICIÓN DEL HEADER ---
    // Se aplica FASE 2: glass-low al mobile-menu y se prepara la estructura
    // --- A. DEFINICIÓN DEL HEADER ---
    // Se aplica FASE 2: glass-low al mobile-menu y se prepara la estructura
    const headerHTML = `
    <div class="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-orient-600 dark:bg-orient-400 transition-colors duration-300" style="-webkit-mask-image: url('static/img/favicon.svg'); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; mask-image: url('static/img/favicon.svg'); mask-size: contain; mask-repeat: no-repeat;" aria-label="Terminal Icon" role="img"></div>
            <h1 class="text-xl font-bold tracking-tight text-orient-950 dark:text-white">
                Felipe Cuevas
            </h1>
        </div>

        <button id="mobile-menu-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu" class="md:hidden text-orient-700 dark:text-orient-200 focus:outline-none">
            <span class="material-symbols-outlined text-3xl transition-transform duration-300" id="menu-icon">menu</span>
        </button>

        <nav aria-label="Navegación principal" class="hidden md:flex flex-1 justify-center items-center gap-8">
            <a class="nav-link relative py-2 text-sm font-medium text-orient-700 dark:text-orient-300 transition-colors hover:text-primary dark:hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" href="index.html">Inicio</a>
            <a class="nav-link relative py-2 text-sm font-medium text-orient-700 dark:text-orient-300 transition-colors hover:text-primary dark:hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" href="educacion.html">Educación</a>
            
            <div class="relative group h-full py-2">
                <a class="nav-link flex items-center gap-1 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer" aria-haspopup="true" aria-expanded="false" href="experiencia.html">
                    Experiencia
                    <span class="material-symbols-outlined text-base transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                </a>
                <div class="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div class="w-52 bg-white/90 dark:bg-orient-900/90 backdrop-blur-xl border border-orient-100 dark:border-white/10 shadow-xl rounded-xl overflow-hidden">
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-white/5 transition-colors" href="desarrollador.html">Desarrollador</a>
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-white/5 transition-colors" href="docente.html">Docente Universitario</a>
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-white/5 transition-colors" href="instructor.html">Instructor REUF</a>
                        <a class="block px-5 py-3 text-sm font-medium text-orient-700 dark:text-orient-300 hover:text-primary dark:hover:text-primary hover:bg-orient-50 dark:hover:bg-white/5 transition-colors" href="talento-digital.html">Talento Digital</a>
                    </div>
                </div>
            </div>
            
            <a class="nav-link relative py-2 text-sm font-medium text-orient-700 dark:text-orient-300 transition-colors hover:text-primary dark:hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" href="recursos.html">Recursos</a>
            <a class="nav-link relative py-2 text-sm font-medium text-orient-700 dark:text-orient-300 transition-colors hover:text-primary dark:hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" href="contacto.html">Contacto</a>
        </nav>

        <div class="hidden md:flex items-center gap-4">
            <a href="static/CV_Felipe_Cuevas_2026.pdf" download="CV_Felipe_Cuevas_2026.pdf" class="flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all">
                Descargar CV
            </a>
        </div>
    </div>

    <div id="mobile-menu" class="md:hidden overflow-hidden max-h-0 transition-all duration-500 ease-in-out bg-white/95 dark:bg-orient-950/95 backdrop-blur-md border-b-0 dark:border-white/5 shadow-xl">
        <div class="flex flex-col p-6 space-y-5">
            <a class="mobile-nav-link text-base font-medium text-orient-700 dark:text-orient-200" href="index.html">Inicio</a>
            <a class="mobile-nav-link text-base font-medium text-orient-700 dark:text-orient-200" href="educacion.html">Educación</a>
            <a class="mobile-nav-link text-base font-medium text-orient-700 dark:text-orient-200" href="experiencia.html">Experiencia General</a>
            <div class="pl-4 border-l-2 border-orient-100 dark:border-white/10 space-y-3">
                <a class="block text-sm text-orient-500 hover:text-primary dark:text-orient-400" href="desarrollador.html">Desarrollador</a>
                <a class="block text-sm text-orient-500 hover:text-primary dark:text-orient-400" href="docente.html">Docente</a>
                <a class="block text-sm text-orient-500 hover:text-primary dark:text-orient-400" href="instructor.html">Instructor REUF</a>
                <a class="block text-sm text-orient-500 hover:text-primary dark:text-orient-400" href="talento-digital.html">Talento Digital</a>
            </div>
            <a class="mobile-nav-link text-base font-medium text-orient-700 dark:text-orient-200" href="recursos.html">Recursos</a>
            <a class="mobile-nav-link text-base font-medium text-orient-700 dark:text-orient-200" href="contacto.html">Contacto</a>
            <a href="static/CV_Felipe_Cuevas_2026.pdf" download="CV_Felipe_Cuevas_2026.pdf" class="flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white w-full mt-4 hover:scale-105 transition-transform duration-300">
                Descargar CV
            </a>
        </div>
    </div>
    `;

    const headerElement = document.getElementById('app-header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        // Se elimina w-screen y el margen negativo. Se aplica Glassmorphism real.
        headerElement.className = "sticky top-0 z-50 w-full border-b border-orient-200 dark:border-white/10 bg-white/80 dark:bg-orient-950/80 backdrop-blur-md transition-all duration-300 ease-in-out";
    }

    // --- B. DEFINICIÓN DEL FOOTER ---
    const footerHTML = `
    <div class="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-12 md:grid-cols-4 md:gap-8">
        
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
                <div class="h-6 w-6 bg-orient-600 transition-colors duration-300 dark:bg-orient-400" style="-webkit-mask-image: url('static/img/favicon.svg'); mask-image: url('static/img/favicon.svg'); -webkit-mask-size: contain; mask-size: contain; mask-repeat: no-repeat;" aria-label="Terminal Icon" role="img"></div>
                <span class="text-lg font-bold tracking-tight text-orient-950 dark:text-white">Felipe Cuevas</span>
            </div>
            <p class="text-sm leading-relaxed text-orient-600 dark:text-orient-400">
                <em>"Formando desarrolladores en <strong>Inteligencia Artificial</strong> y <strong>Desarrollo de Aplicaciones</strong>."</em>
            </p>
            <div class="mt-2 flex items-center gap-4">
                <a href="https://www.linkedin.com/in/ffelipecuevasc/" target="_blank" class="text-orient-600 transition-transform hover:scale-110 hover:text-[#0076b2] dark:text-orient-400" aria-label="LinkedIn">
                    <svg viewBox="0 0 128 128" class="h-6 w-6"><path fill="currentColor" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"></path><path fill="currentColor" class="text-white dark:text-orient-900" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"></path></svg>
                </a>
                <a href="#" target="_blank" class="text-orient-600 transition-transform hover:scale-110 hover:text-orient-950 dark:text-orient-400 dark:hover:text-white" aria-label="GitHub">
                    <svg viewBox="0 0 128 128" class="h-6 w-6" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path></svg>
                </a>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-orient-900 dark:text-white">Explorar</h3>
            <nav class="flex flex-col gap-2">
                <a href="index.html" class="text-sm text-orient-600 transition-colors hover:text-primary dark:text-orient-400 dark:hover:text-primary">Inicio</a>
                <a href="educacion.html" class="text-sm text-orient-600 transition-colors hover:text-primary dark:text-orient-400 dark:hover:text-primary">Certificaciones</a>
                <a href="experiencia.html" class="text-sm text-orient-600 transition-colors hover:text-primary dark:text-orient-400 dark:hover:text-primary">Experiencia Laboral</a>                
                <a href="contacto.html" class="text-sm text-orient-600 transition-colors hover:text-primary dark:text-orient-400 dark:hover:text-primary">Contacto</a>
            </nav>
        </div>

        <div class="flex flex-col gap-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-orient-900 dark:text-white">Tecnologías</h3>
            <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3">
                    <svg viewBox="0 0 128 128" class="h-6 w-6"><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#386f9f" d="M51.834 23.017c3.756 0 7.512.058 11.263-.04.995-.026 2.78.797 2.7-1.271-.061-1.683-1.622-1.074-2.568-1.089-4.237-.067-8.488-.228-12.708.037-3.003.187-3.888-.953-3.511-3.707.13-.95.005-1.934.025-2.902.132-6.446 1.69-8.64 7.942-10.23 6.888-1.75 13.937-1.692 20.806-.184 6.175 1.356 8.74 6.16 8.428 10.604-.38 5.423-.086 10.893-.091 16.343-.009 6.853-3.55 10.49-10.459 10.585-5.69.078-11.387.14-17.074-.018-6.778-.19-11.75 5.44-11.784 11.82 0 .484.083.984-.013 1.451-.488 2.343 1.462 6.13-1.022 6.826-3.78 1.062-8.206 1.062-11.54-2.311-1.13-1.14-2.082-2.417-2.584-3.893-2.679-7.865-3.102-15.83-.58-23.818 1.572-4.986 5.848-8.087 11.145-8.176 3.874-.065 7.749-.013 11.623-.013l.002-.014zm6.902-11.12c-.162-1.903-1.185-3.292-3.296-3.35-2.309-.06-3.502 1.336-3.505 3.608-.002 2.106 1.145 3.455 3.241 3.516 2.303.067 3.418-1.36 3.56-3.774z"></path><path fill="#ffcf46" d="M80.824 61.572c-4.24 0-8.482-.037-12.722.03-.955.012-2.557-.592-2.607 1.041-.056 1.852 1.663 1.37 2.755 1.381 4.24.053 8.484.098 12.723-.02 2.178-.06 3.067.357 3.23 2.925.737 11.625-4.308 12.63-13.613 14.745-5.338 1.213-11.061.57-16.325-1.788-4.353-1.947-7.024-4.753-6.687-10.007.334-5.186.39-10.439-.009-15.62-.48-6.253 3.41-10.852 10.975-10.854 5.09-.001 10.214-.389 15.26.075 7.215.662 12.872-5.592 13.12-12.864.01-.241-.052-.5.01-.724.636-2.235-1.626-5.557 1.4-6.686 4.573-1.705 9.73.087 12.066 3.557 2.945 4.369 3.343 9.51 3.819 14.53.515 5.411-1.003 10.505-3.276 15.386-1.544 3.31-4.14 4.91-7.757 4.915-4.12.003-8.239 0-12.36 0-.002-.008-.002-.015-.002-.022zm-1.104 10.8c-.453-2.066-1.385-3.476-3.785-3.535-2.496-.06-3.14 1.807-3.127 3.474.014 1.772.508 3.952 3.21 3.748 2.246-.172 3.341-1.563 3.702-3.687z"></path><path fill="#386f9f" d="M14.129 114.849c0 2.582.117 5-.055 7.397-.074 1.034 1.066 2.98-1.103 2.978-1.912 0-2.403-1.522-2.342-3.361.117-3.51.034-7.027.034-10.54v-7.998c0-4.82 1.293-6.452 5.903-7.45 4.286-.932 7.654.511 9.386 4.263 1.732 3.753 1.866 7.62.133 11.438-1.708 3.762-4.854 5.166-8.884 4.051-.918-.25-1.845-.467-3.072-.778zm0-9.448c0 1.33.18 2.686-.037 3.98-.502 2.991 1.408 3.728 3.66 4.26 2.227.526 3.754-.421 4.647-2.383 1.501-3.29 1.753-6.683.613-10.162-1.012-3.092-3.349-3.454-6.077-3.07-2.694.383-3.059 2.215-2.824 4.48.1.955.018 1.93.018 2.895zM43.116 114.689c-1.845.48-3.447.992-5.087 1.3-3.59.671-6.248-1.3-7.183-4.894-1.16-4.448-.178-8.879-.148-13.317.013-2.023 1.885-1.234 3.18-2.318 0 4.75.018 8.85-.006 12.947-.013 2.058.519 3.75 2.465 4.835 2.148 1.198 3.91.057 5.78-.712 1.34-.551 1.173-1.676 1.175-2.746.01-3.872-.001-7.74.012-11.612.002-.955-.097-2.122 1.313-2.075 1.257.041 1.804.788 1.783 2.158-.091 6.407.09 12.823-.17 19.221-.197 4.838-3.61 7.793-8.52 8.01-.735.031-1.505.099-1.78-.813-.419-1.404.718-1.139 1.465-1.378 5.401-1.718 6.107-2.744 5.721-8.606zM65.94 98.064c1.429-.675 2.25-1.293 3.153-1.46 5.067-.937 8.95-.58 8.94 6.245-.007 3.515.002 7.031-.007 10.545-.002.984.061 1.942-1.406 2.027-1.547.092-1.887-.793-1.88-2.006.018-3.387.11-6.774.107-10.16-.002-2.63-.539-4.958-3.884-4.95-2.934.005-5.012 2.195-5.027 5.217a899.58 899.58 0 00.003 9.814c.003 1.162.028 2.181-1.652 2.085-1.513-.09-1.327-1.11-1.327-2.049-.01-8.6.032-17.209-.041-25.815-.013-1.508.582-2.444 1.92-2.508 1.888-.087 1.023 1.564 1.051 2.392.123 3.371.05 6.75.05 10.623zM81.93 105.775c-.191-6.715 2.994-10.3 8.76-10.092 2.894.106 5.065 1.39 6.466 3.89 2.475 4.422 2.14 8.846-.538 12.987-1.84 2.844-4.67 4.185-8.12 3.453-3.402-.72-6.066-3.783-6.548-7.353-.128-.945-.02-1.924-.02-2.885zm13.32.157c-.152-1.172-.125-2.806-.613-4.264-.667-2-1.883-3.61-4.364-3.72-2.503-.108-3.752 1.355-4.587 3.38-1.311 3.179-1.226 6.371.194 9.493.912 2.011 2.32 3.483 4.76 3.075 2.403-.401 3.821-1.976 4.312-4.313.223-1.059.187-2.168.298-3.65zM102.257 106.827c0-1.212-.023-2.422.004-3.628.056-2.325-.685-4.901 2.45-6.089 3.59-1.356 7.148-2.372 10.762-.273 1.352.786 1.85 2.214 1.864 3.73.037 4.231-.019 8.464.038 12.695.02 1.476-.368 2.214-2.027 2.174-1.818-.043-1.435-1.283-1.423-2.273.043-3.38.278-6.757.214-10.132-.084-4.25-2.416-5.983-6.389-4.94-1.648.434-2.678 1.234-2.597 3.274.161 3.982.037 7.978.052 11.967.004 1.156.021 2.18-1.647 2.083-1.528-.088-1.278-1.145-1.29-2.062-.028-2.176-.008-4.353-.011-6.526zM58.689 97.403c-.25.296-.46.76-.68.764-3.964.055-2.864 3.014-2.966 5.209-.097 2.045 0 4.1-.029 6.151-.03 2.038.147 3.932 2.627 4.473.711.154 1.035.564.887 1.274-.163.784-.788.753-1.407.745-2.85-.05-4.963-2.065-5.047-5.015-.086-3.014.031-6.035-.04-9.046-.037-1.43.706-3.255-1.6-3.822-.253-.061-.343-.778-.508-1.187 3.076-.965 1.8-3.618 2.222-5.631.2-.953 1.105-1.214 1.96-1.295.865-.082.872.618.9 1.203.114 2.32-1.087 5.425 3.184 5.256.143-.005.31.562.497.92z"></path></g></svg>
                    <span class="text-sm font-medium text-orient-600 dark:text-orient-400">Python (Django)</span>
                </div>
                <div class="flex items-center gap-3">
                    <svg viewBox="0 0 128 128" class="h-6 w-6"><path fill="#0074BD" d="M52.581 67.817s-3.284 1.911 2.341 2.557c6.814.778 10.297.666 17.805-.753 0 0 1.979 1.237 4.735 2.309-16.836 7.213-38.104-.418-24.881-4.113zm-2.059-9.415s-3.684 2.729 1.945 3.311c7.28.751 13.027.813 22.979-1.103 0 0 1.373 1.396 3.536 2.157-20.352 5.954-43.021.469-28.46-4.365z"></path><path fill="#EA2D2E" d="M67.865 42.431c4.151 4.778-1.088 9.074-1.088 9.074s10.533-5.437 5.696-12.248c-4.519-6.349-7.982-9.502 10.771-20.378.001 0-29.438 7.35-15.379 23.552z"></path><path fill="#0074BD" d="M90.132 74.781s2.432 2.005-2.678 3.555c-9.716 2.943-40.444 3.831-48.979.117-3.066-1.335 2.687-3.187 4.496-3.576 1.887-.409 2.965-.334 2.965-.334-3.412-2.403-22.055 4.719-9.469 6.762 34.324 5.563 62.567-2.506 53.665-6.524zm-35.97-26.134s-15.629 3.713-5.534 5.063c4.264.57 12.758.439 20.676-.225 6.469-.543 12.961-1.704 12.961-1.704s-2.279.978-3.93 2.104c-15.874 4.175-46.533 2.23-37.706-2.038 7.463-3.611 13.533-3.2 13.533-3.2zM82.2 64.317c16.135-8.382 8.674-16.438 3.467-15.353-1.273.266-1.845.496-1.845.496s.475-.744 1.378-1.063c10.302-3.62 18.223 10.681-3.322 16.345 0 0 .247-.224.322-.425z"></path><path fill="#EA2D2E" d="M72.474 1.313s8.935 8.939-8.476 22.682c-13.962 11.027-3.184 17.313-.006 24.498-8.15-7.354-14.128-13.828-10.118-19.852 5.889-8.842 22.204-13.131 18.6-27.328z"></path><path fill="#0074BD" d="M55.749 87.039c15.484.99 39.269-.551 39.832-7.878 0 0-1.082 2.777-12.799 4.981-13.218 2.488-29.523 2.199-39.191.603 0 0 1.98 1.64 12.158 2.294z"></path><path fill="#EA2D2E" d="M94.866 100.181h-.472v-.264h1.27v.264h-.47v1.317h-.329l.001-1.317zm2.535.066h-.006l-.468 1.251h-.216l-.465-1.251h-.005v1.251h-.312v-1.581h.457l.431 1.119.432-1.119h.454v1.581h-.302v-1.251zm-44.19 14.79c-1.46 1.266-3.004 1.978-4.391 1.978-1.974 0-3.045-1.186-3.045-3.085 0-2.055 1.146-3.56 5.738-3.56h1.697v4.667h.001zm4.031 4.548v-14.077c0-3.599-2.053-5.973-6.997-5.973-2.886 0-5.416.714-7.473 1.622l.592 2.493c1.62-.595 3.715-1.147 5.771-1.147 2.85 0 4.075 1.147 4.075 3.521v1.779h-1.424c-6.921 0-10.044 2.685-10.044 6.723 0 3.479 2.058 5.456 5.933 5.456 2.49 0 4.351-1.028 6.088-2.533l.316 2.137h3.163v-.001zm13.452 0h-5.027l-6.051-19.689h4.391l3.756 12.099.835 3.635c1.896-5.258 3.24-10.596 3.912-15.733h4.271c-1.143 6.481-3.203 13.598-6.087 19.688zm19.288-4.548c-1.465 1.266-3.01 1.978-4.392 1.978-1.976 0-3.046-1.186-3.046-3.085 0-2.055 1.149-3.56 5.736-3.56h1.701v4.667h.001zm4.033 4.548v-14.077c0-3.599-2.059-5.973-6.999-5.973-2.889 0-5.418.714-7.475 1.622l.593 2.493c1.62-.595 3.718-1.147 5.774-1.147 2.846 0 4.074 1.147 4.074 3.521v1.779h-1.424c-6.923 0-10.045 2.685-10.045 6.723 0 3.479 2.056 5.456 5.93 5.456 2.491 0 4.349-1.028 6.091-2.533l.318 2.137h3.163v-.001zm-56.693 3.346c-1.147 1.679-3.005 3.008-5.037 3.757l-1.989-2.345c1.547-.794 2.872-2.075 3.489-3.269.532-1.063.753-2.43.753-5.701V92.891h4.284v22.173c0 4.375-.348 6.144-1.5 7.867z"></path></svg>
                    <span class="text-sm font-medium text-orient-600 dark:text-orient-400">Java (Spring Boot)</span>
                </div>
                <div class="flex items-center gap-3">
                    <svg viewBox="0 0 128 128" class="h-6 w-6"><path fill="currentColor" d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"></path><path fill="#f90" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"></path></svg>
                    <span class="text-sm font-medium text-orient-600 dark:text-orient-400">Amazon Web Services</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-orient-900 dark:text-white">Certificaciones</h3>
            <div class="mb-2 flex flex-col gap-3">
                <div class="flex items-center gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded border border-orient-200 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <svg viewBox="0 0 128 128" class="h-full w-full text-orient-900 dark:text-white"><path fill="currentColor" d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"></path><path fill="#f90" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"></path></svg>
                    </div>
                    <span class="text-xs font-medium leading-tight text-orient-600 dark:text-orient-400">AWS</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded border border-orient-200 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <svg viewBox="0 0 128 128" class="h-full w-full"><path fill="#EA1B22" d="M55.387 66.469h8.333l-4.407-7.09-8.088 12.819h-3.681L57.382 56.8a2.324 2.324 0 011.931-.998c.765 0 1.478.363 1.892.972l9.876 15.424H67.4l-1.736-2.865h-8.438l-1.839-2.864zm38.235 2.864V55.958h-3.123v14.685c0 .402.156.791.454 1.089.298.298.7.466 1.141.466h14.244l1.841-2.865H93.622zm-51.677-2.397c3.033 0 5.496-2.449 5.496-5.482s-2.462-5.496-5.496-5.496H28.28v16.241h3.123V58.822h10.335c1.452 0 2.618 1.18 2.618 2.631s-1.167 2.631-2.618 2.631l-8.806-.013 9.324 8.127h4.538l-6.274-5.263h1.425zM9.059 72.198c-4.483 0-8.122-3.629-8.122-8.114s3.638-8.127 8.122-8.127h9.439c4.485 0 8.121 3.643 8.121 8.127s-3.636 8.114-8.121 8.114H9.059zm9.229-2.865a5.25 5.25 0 005.258-5.249 5.262 5.262 0 00-5.258-5.263H9.267a5.262 5.262 0 00-5.256 5.263 5.25 5.25 0 005.256 5.249h9.021zm59.314 2.865c-4.484 0-8.126-3.629-8.126-8.114s3.642-8.127 8.126-8.127h11.212l-1.829 2.864H77.81a5.267 5.267 0 00-5.264 5.263c0 2.903 2.36 5.249 5.264 5.249h11.263l-1.84 2.865h-9.631zm38.197-2.865a5.25 5.25 0 01-5.055-3.824h13.35l1.84-2.864h-15.19a5.266 5.266 0 015.055-3.824h9.163l1.854-2.864h-11.225c-4.484 0-8.126 3.643-8.126 8.127s3.642 8.114 8.126 8.114h9.631l1.841-2.865h-11.264"></path></svg>
                    </div>
                    <span class="text-xs font-medium leading-tight text-orient-600 dark:text-orient-400">Oracle</span>
                </div>
            </div>

            <button id="theme-toggle" class="group mt-2 flex w-fit items-center gap-2 rounded-lg border border-orient-200 bg-white px-4 py-2 text-xs font-semibold text-orient-700 shadow-sm transition-all hover:border-primary hover:text-primary dark:border-orient-800 dark:bg-orient-900 dark:text-orient-300 dark:hover:border-primary">
                <span class="material-symbols-outlined text-base transition-transform group-hover:rotate-180">contrast</span>
                Apariencia
            </button>
        </div>
    </div>

    <div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-orient-200 px-6 py-6 dark:border-white/10 md:flex-row">
        <p class="text-xs text-orient-500 dark:text-orient-400">
            © <span id="current-year"></span> Felipe Cuevas. Todos los derechos reservados.
        </p>
    </div>
    `;

    const footerElement = document.getElementById('app-footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
        // Asignamos las clases principales de Tailwind al contenedor <footer id="app-footer">
        footerElement.className = "mt-auto w-full bg-orient-50/80 backdrop-blur-md transition-colors duration-300 dark:bg-orient-950/80 border-t border-orient-200 dark:border-white/10";
    }

    // --- C. DEFINICIÓN DEL BOTÓN VOLVER ARRIBA ---
    const backToTopHTML = `
    <button id="back-to-top" class="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 opacity-0 invisible transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 focus:outline-none" aria-label="Volver arriba">
        <span class="material-symbols-outlined text-2xl font-bold">arrow_upward</span>
    </button>
    `;

    // --- D. INYECCIÓN EN EL DOM (CORREGIDO) ---
    // El Header y Footer ya fueron inyectados en sus respectivos bloques arriba.
    // Solo inyectamos el botón 'Volver Arriba' directamente al final del body:
    if (!document.getElementById('back-to-top')) {
        document.body.insertAdjacentHTML('beforeend', backToTopHTML);
    }

    // --- E. UX: RESALTAR PÁGINA ACTIVA ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const setActiveLink = (links) => {
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            if ((linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) ||
                (linkPath !== 'index.html' && currentPath.includes(linkPath))) {

                // Forzar el color primario
                link.classList.remove('text-orient-700', 'dark:text-orient-300', 'dark:text-orient-200');
                link.classList.add('text-primary', 'dark:text-primary');

                // Si es link de desktop, fijar la línea indicadora debajo
                if(link.classList.contains('nav-link')) {
                    link.classList.add('after:w-full');
                }
            }
        });
    };

    setActiveLink(navLinks);
    setActiveLink(mobileLinks);
}

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