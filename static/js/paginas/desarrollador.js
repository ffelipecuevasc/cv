// =========================================
// PUNTO DE ENTRADA — desarrollador.html
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarTecnologias} from '../tecnologias.js';
import {iniciarPortafolio} from '../portafolio.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';

iniciarSitio();
ejecutarSeguro('máquina de escribir del logotipo', iniciarMaquinaEscribir);
ejecutarSeguro('riel de tecnologías', iniciarTecnologias);
ejecutarSeguro('motor de portafolio', iniciarPortafolio);