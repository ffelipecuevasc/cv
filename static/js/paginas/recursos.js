// =========================================
// PUNTO DE ENTRADA — recursos.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarRutas} from '../rutas.js';

iniciarSitio();
ejecutarSeguro('rutas de aprendizaje', iniciarRutas);