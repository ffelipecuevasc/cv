// =========================================
// COMPOSICIÓN DE SERVICIOS TRANSVERSALES
// Expone: iniciarSitio()
// No contiene lógica: decide qué servicios se activan en toda página y en qué
// orden. Cada uno se ejecuta aislado, para que el fallo de uno no impida los demás.
// =========================================

import {iniciarTema} from './tema.js';
import {iniciarNavegacion} from './navegacion.js';
import {iniciarAnimacion, iniciarLinterna} from './animacion.js';
import {ejecutarSeguro, iniciarImagenesResilientes} from './resiliencia.js';
import {iniciarTarjetasReactivas} from './reactividad.js';

export function iniciarSitio() {
    ejecutarSeguro('servicio de imágenes', iniciarImagenesResilientes);
    ejecutarSeguro('servicio de tema', iniciarTema);
    ejecutarSeguro('servicio de navegación', iniciarNavegacion);
    ejecutarSeguro('servicio de animación', iniciarAnimacion);
    ejecutarSeguro('efecto linterna', iniciarLinterna);
    ejecutarSeguro('tarjetas reactivas', iniciarTarjetasReactivas);
}