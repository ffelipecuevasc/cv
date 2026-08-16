// =========================================
// PUNTO DE ENTRADA — comunidad.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarComunidad} from '../comunidad.js';

iniciarSitio();
ejecutarSeguro('comunidad', iniciarComunidad);