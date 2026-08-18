// =========================================
// PUNTO DE ENTRADA — comunidad.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarComunidad} from '../comunidad.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';

iniciarSitio();
ejecutarSeguro('comunidad', iniciarComunidad);
ejecutarSeguro('máquina de escribir del logotipo', iniciarMaquinaEscribir);