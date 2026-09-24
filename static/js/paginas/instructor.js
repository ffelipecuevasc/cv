// =========================================
// PUNTO DE ENTRADA — instructor.html
// Lo mismo que general.js, más el motor de relatoría.
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';
import {iniciarContacto} from '../contacto.js';
import {iniciarRelatoria} from '../relatoria.js';

iniciarSitio();
ejecutarSeguro('máquina de escribir del logotipo', iniciarMaquinaEscribir);
ejecutarSeguro('formulario de contacto', iniciarContacto);
ejecutarSeguro('motor de relatoría', iniciarRelatoria);
