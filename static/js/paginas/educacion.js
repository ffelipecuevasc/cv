// =========================================
// PUNTO DE ENTRADA — educacion.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarCertificaciones} from '../certificaciones.js';

iniciarSitio();
ejecutarSeguro('motor de certificaciones', iniciarCertificaciones);