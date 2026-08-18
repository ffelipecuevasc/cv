// =========================================
// PUNTO DE ENTRADA — recursos.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarRutas} from '../rutas.js';
import {iniciarComunidad} from '../comunidad.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';

iniciarSitio();
ejecutarSeguro('máquina de escribir del logotipo', iniciarMaquinaEscribir);
ejecutarSeguro('sincronización del foro', iniciarComunidad);
ejecutarSeguro('rutas de aprendizaje', iniciarRutas);