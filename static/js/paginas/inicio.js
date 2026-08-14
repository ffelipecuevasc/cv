// =========================================
// PUNTO DE ENTRADA — index.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarTestimonios} from '../testimonios.js';

iniciarSitio();
ejecutarSeguro('motor de testimonios', iniciarTestimonios);