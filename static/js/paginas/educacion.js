// =========================================
// PUNTO DE ENTRADA — educacion.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarFormacion} from '../formacion.js';
import {iniciarCertificaciones} from '../certificaciones.js';

iniciarSitio();
ejecutarSeguro('bento académico', iniciarFormacion);
ejecutarSeguro('motor de certificaciones', iniciarCertificaciones);