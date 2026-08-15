// =========================================
// SERVICIO DE FILTROS (Fase 5.2.4)
// Expone: iniciarGrupoFiltros()
//
// Motor conceptual único de los grupos de botones excluyentes del sitio:
// la bóveda de recursos y el bento académico. Se encarga del estado declarado
// (aria-pressed) y del intercambio de clases; qué hacer con el valor elegido
// es responsabilidad de quien lo consume.
// =========================================

/**
 * Activa un grupo de botones mutuamente excluyentes.
 *
 * @param {Object} opciones
 * @param {Element|null} opciones.contenedor  ámbito de búsqueda de los botones
 * @param {string} opciones.selector          selector de los botones del grupo
 * @param {string} opciones.atributo          atributo del que se lee el valor de cada botón
 * @param {string[]} opciones.clasesActivas   clases del botón seleccionado
 * @param {string[]} opciones.clasesInactivas clases de los botones no seleccionados
 * @param {(valor: string) => void} opciones.alElegir
 * @returns {boolean} si el grupo quedó activo
 */
export function iniciarGrupoFiltros({
                                        contenedor = document,
                                        selector,
                                        atributo,
                                        clasesActivas = [],
                                        clasesInactivas = [],
                                        alElegir
                                    }) {
    const botones = [...contenedor.querySelectorAll(selector)];
    if (botones.length === 0) return false;

    const marcar = (elegido) => {
        botones.forEach((boton) => {
            const activo = boton === elegido;
            boton.setAttribute('aria-pressed', String(activo));
            clasesActivas.forEach((clase) => boton.classList.toggle(clase, activo));
            clasesInactivas.forEach((clase) => boton.classList.toggle(clase, !activo));
        });
    };

    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            marcar(boton);
            alElegir(boton.getAttribute(atributo));
        });
    });

    return true;
}