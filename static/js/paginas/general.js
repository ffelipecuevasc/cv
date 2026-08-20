// =========================================
// PUNTO DE ENTRADA — Páginas sin motor de contenido
// (experiencia, docente, instructor, talento-digital, contacto, agradecimiento, 404)
// Único módulo que carga el documento; declara explícitamente lo que necesita.
// =========================================
import {iniciarSitio} from '../servicios/sitio.js';
import {ejecutarSeguro} from '../servicios/resiliencia.js';
import {iniciarMaquinaEscribir} from '../maquina-escribir.js';
import {iniciarContacto} from '../contacto.js';

iniciarSitio();
ejecutarSeguro('máquina de escribir del logotipo', iniciarMaquinaEscribir);
ejecutarSeguro('formulario de contacto', iniciarContacto);