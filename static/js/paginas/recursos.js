// =========================================
// PUNTO DE ENTRADA — recursos.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarRecursos} from '../recursos.js';

iniciarSitio();
ejecutarSeguro('motor de recursos', iniciarRecursos);