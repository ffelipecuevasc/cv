// =========================================
// PUNTO DE ENTRADA — desarrollador.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarTecnologias} from '../tecnologias.js';
import {iniciarPortafolio} from '../portafolio.js';

iniciarSitio();
ejecutarSeguro('riel de tecnologías', iniciarTecnologias);
ejecutarSeguro('motor de portafolio', iniciarPortafolio);