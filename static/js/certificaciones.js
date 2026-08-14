// =========================================
// CAPA DE LÓGICA Y VISTA — Certificaciones
// Expone: iniciarCertificaciones()
// =========================================
import {certificacionesData} from './datos/certificaciones.datos.js';
import {certificacionesUI} from './config/certificaciones.config.js';
import {construirLista, montar, soloValidos} from './servicios/renderizado.js';

export function iniciarCertificaciones() {
    const timelineContainer = document.getElementById('certificaciones-timeline');
    if (!timelineContainer) return;

    const marcado = construirLista(soloValidos(certificacionesData, 'titulo'), (cert) => `
        <div class="relative pl-16 md:pl-28 mb-12 w-full" data-aos="fade-left">
            
            <div class="absolute left-6 md:left-12 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white dark:border-orient-700 bg-primary z-10 transform -translate-x-1/2 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 neon-glow-sm">
                <span aria-hidden="true" class="material-symbols-outlined text-white text-sm md:text-base">${certificacionesUI.iconos.hito}</span>
            </div>

            <div class="bg-white dark:glass-mid rounded-[2rem] border border-orient-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/50 overflow-hidden group neon-glow-interactive">
                <div class="flex flex-col md:flex-row">
                    
                    <div class="md:w-1/3 lg:w-1/4 bg-orient-50 dark:bg-white/5 group-hover:bg-orient-500 dark:group-hover:bg-orient-900 transition-colors duration-500 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-orient-100 dark:border-white/5 relative overflow-hidden">
                        <div class="absolute inset-0 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                        
                        <img src="${cert.imagen}" alt="" width="${cert.ancho}" height="${cert.alto}" class="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" loading="lazy" decoding="async">
                    </div>

                    <div class="md:w-2/3 lg:w-3/4 p-6 md:p-8 flex flex-col justify-center">
                        
                        <div class="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 mb-4">
                            <div>
                                <h3 class="text-2xl md:text-3xl font-black text-orient-950 dark:text-white group-hover:text-orient-900 transition-colors leading-tight">${cert.titulo}</h3>
                                <p class="text-base font-bold text-primary dark:text-orient-200 mt-1">${cert.emisor}</p>
                            </div>
                            
                            <span class="inline-flex items-center gap-1.5 px-4 py-2 bg-orient-50 dark:bg-orient-900/50 text-orient-700 dark:text-orient-300 text-xs font-bold uppercase tracking-widest rounded-xl border border-orient-200 dark:border-white/5 shrink-0">
                                <span aria-hidden="true" class="material-symbols-outlined text-base text-primary">${certificacionesUI.iconos.fecha}</span>
                                ${cert.fecha}
                            </span>
                        </div>

                        <p class="text-sm md:text-base text-orient-600 dark:text-white leading-relaxed mb-8">
                            ${cert.descripcion}
                        </p>

                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-auto pt-6 border-t border-orient-100 dark:border-orient-600">
                            <div class="flex-1">
                                <p class="text-[10px] font-black uppercase tracking-widest text-orient-400 dark:text-orient-200 mb-1">
                                    ${certificacionesUI.textos.habilidades}
                                </p>
                                <p class="text-sm font-bold text-orient-800 dark:text-white">
                                    ${cert.habilidades}
                                </p>
                            </div>
                            
                            <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-primary px-6 py-3 rounded-xl hover:bg-primary-vibrant transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 shrink-0 w-full sm:w-auto neon-glow-md">
                                <span aria-hidden="true" class="material-symbols-outlined text-lg">${certificacionesUI.iconos.verificar}</span>
                                ${certificacionesUI.textos.accion}
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        `);

    montar(timelineContainer, marcado);
}