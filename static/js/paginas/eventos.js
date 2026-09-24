// =========================================
// PUNTO DE ENTRADA — eventos.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarEventos} from '../eventos.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';

iniciarSitio();
ejecutarSeguro('máquina de escribir del logotipo', iniciarMaquinaEscribir);
ejecutarSeguro('motor de eventos', iniciarEventos);
