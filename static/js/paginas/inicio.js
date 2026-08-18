// =========================================
// PUNTO DE ENTRADA — index.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';
import {iniciarHero} from '../hero.js';
import {iniciarTestimonios} from '../testimonios.js';

iniciarSitio();
ejecutarSeguro('máquina de escribir del titular', iniciarMaquinaEscribir);
ejecutarSeguro('conmutador del hero', iniciarHero);
ejecutarSeguro('motor de testimonios', iniciarTestimonios);