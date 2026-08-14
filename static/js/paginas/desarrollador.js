// =========================================
// PUNTO DE ENTRADA — desarrollador.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarPortafolio} from '../portafolio.js';

iniciarSitio();
ejecutarSeguro('motor de portafolio', iniciarPortafolio);