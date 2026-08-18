// =========================================
// CAPA DE LÓGICA Y VISTA — Máquinas de escribir (Fase 5.1)
// Expone: iniciarMaquinaEscribir()
//
// Reescribe únicamente el contenido de cada <span data-maquina>. Jamás toca el
// texto que lo rodea. Sirve a dos escenarios con el mismo motor:
//   · titular del hero  → gobernado por el conmutador de perfil
//   · logotipo de la barra → autónomo, presente en todas las páginas
//
// Mejora progresiva: sin JavaScript, o bajo preferencia de movimiento reducido,
// el texto queda tal cual está escrito en el marcado.
// =========================================

import {maquinaUI} from './config/maquina-escribir.config.js';
import {perfilesUI} from './config/perfiles.config.js';
import {frasesMaquina} from './datos/maquina-escribir.datos.js';
import {movimientoReducido} from './servicios/animacion.js';

/** Única fuente de temporización del módulo. */
const pausa = (ms) => new Promise((seguir) => setTimeout(seguir, ms));

/**
 * Compuerta de ejecución. Detiene una ranura mientras la pestaña está oculta o
 * mientras queda fuera de pantalla, sin destruir su estado ni encolar trabajo.
 */
function crearCompuerta() {
    let abierta = true;
    let enEspera = [];

    return {
        abrir() {
            abierta = true;
            enEspera.splice(0).forEach((seguir) => seguir());
        },
        cerrar() {
            abierta = false;
        },
        pasar() {
            return abierta ? Promise.resolve() : new Promise((seguir) => enEspera.push(seguir));
        }
    };
}

/**
 * Sustituye el texto plano del span por la estructura del efecto:
 *   [sr-only]        nombre accesible fijo, para tecnologías asistivas
 *   [maquina-medida] frase más larga, invisible: reserva el espacio (CLS 0)
 *   [maquina-texto]  lo que se teclea, decorativo
 */
function prepararRanura(span, frases) {
    const original = span.textContent.trim();

    if (original !== frases[0]) {
        console.warn(
            `Máquina de escribir: el marcado dice "${original}" y los datos empiezan con "${frases[0]}". ` +
            'Deben coincidir para que no haya salto al iniciar.'
        );
    }

    const masLarga = frases.reduce((larga, frase) => (frase.length > larga.length ? frase : larga), original);

    const accesible = document.createElement('span');
    accesible.className = 'sr-only';
    accesible.textContent = original;

    const medida = document.createElement('span');
    medida.className = maquinaUI.clases.medida;
    medida.setAttribute('aria-hidden', 'true');
    medida.textContent = masLarga;

    const texto = document.createElement('span');
    texto.className = maquinaUI.clases.texto;
    texto.setAttribute('aria-hidden', 'true');
    texto.textContent = original;

    span.textContent = '';
    span.classList.add(maquinaUI.clases.contenedor);
    span.append(accesible, medida, texto);

    return texto;
}

/** Espera, cede si la compuerta está cerrada y responde si el ciclo sigue vigente. */
async function respirar(ranura, ms, vigente) {
    await pausa(ms);
    await ranura.compuerta.pasar();
    return vigente();
}

async function borrar(ranura, vigente) {
    ranura.span.classList.add(maquinaUI.clases.tecleando);

    while ([...ranura.texto.textContent].length > 0) {
        if (!await respirar(ranura, ranura.ritmo.borradoMs, vigente)) return false;

        const letras = [...ranura.texto.textContent];
        letras.pop();
        ranura.texto.textContent = letras.join('');
    }

    return true;
}

async function escribir(ranura, frase, vigente) {
    const letras = [...frase];
    ranura.span.classList.add(maquinaUI.clases.tecleando);

    for (let i = 1; i <= letras.length; i += 1) {
        // Ritmo humano: nunca dos teclas exactamente a la misma velocidad.
        const espera = ranura.ritmo.escrituraMs + Math.random() * ranura.ritmo.variacionMs;
        if (!await respirar(ranura, espera, vigente)) return false;

        ranura.texto.textContent = letras.slice(0, i).join('');
    }

    ranura.span.classList.remove(maquinaUI.clases.tecleando);
    return true;
}

/**
 * Bucle del efecto. El testigo `ciclo` es el mecanismo de cancelación: al
 * cambiar de perfil se incrementa y este bucle se retira en su próximo respiro.
 */
async function rodar(ranura) {
    const miCiclo = ranura.ciclo;
    const vigente = () => ranura.ciclo === miCiclo;

    // Entrada limpia: la ranura siempre aparece con su frase canónica completa.
    ranura.texto.textContent = ranura.frases[0];
    ranura.span.classList.remove(maquinaUI.clases.tecleando);

    if (!await respirar(ranura, ranura.ritmo.arranqueMs, vigente)) return;

    let indice = 0;

    while (vigente()) {
        if (!await respirar(ranura, ranura.ritmo.esperaCompletaMs, vigente)) return;
        if (!await borrar(ranura, vigente)) return;

        indice = (indice + 1) % ranura.frases.length;

        if (!await respirar(ranura, ranura.ritmo.esperaVaciaMs, vigente)) return;
        if (!await escribir(ranura, ranura.frases[indice], vigente)) return;
    }
}

export function iniciarMaquinaEscribir() {
    // El servicio de animación manda: si el sistema pide quietud, no hay efecto.
    if (movimientoReducido()) return;

    const ranuras = [];
    const porElemento = new Map();

    document.querySelectorAll(`[${maquinaUI.atributo}]`).forEach((span) => {
        const clave = span.getAttribute(maquinaUI.atributo);
        const frases = frasesMaquina[clave];

        // Con menos de dos frases no hay nada que rotar: se deja el texto estático.
        if (!Array.isArray(frases) || frases.length < 2) return;

        const ranura = {
            clave,
            span,
            frases,
            texto: prepararRanura(span, frases),
            ritmo: {...maquinaUI.ritmo, ...(maquinaUI.ritmos[clave] ?? {})},
            compuerta: crearCompuerta(),
            gobernada: Boolean(span.closest(maquinaUI.selectorGobernado)),
            enPantalla: true,
            ciclo: 0
        };

        ranuras.push(ranura);
        porElemento.set(span, ranura);
    });

    if (ranuras.length === 0) return;

    let pestanaVisible = !document.hidden;
    const revisar = (ranura) => (pestanaVisible && ranura.enPantalla
        ? ranura.compuerta.abrir()
        : ranura.compuerta.cerrar());

    document.addEventListener('visibilitychange', () => {
        pestanaVisible = !document.hidden;
        ranuras.forEach(revisar);
    });

    if (typeof IntersectionObserver === 'function') {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                const ranura = porElemento.get(entrada.target);
                if (!ranura) return;

                ranura.enPantalla = entrada.isIntersecting;
                revisar(ranura);
            });
        }, {threshold: 0});

        ranuras.forEach((ranura) => observador.observe(ranura.span));
    }

    // Ranuras autónomas (logotipo): no dependen de nadie.
    ranuras
        .filter((ranura) => !ranura.gobernada)
        .forEach((ranura) => {
            ranura.ciclo += 1;
            rodar(ranura);
        });

    // Ranuras del hero: solo teclea el perfil visible; el anterior se cancela.
    const delHero = new Map(
        ranuras.filter((ranura) => ranura.gobernada).map((ranura) => [ranura.clave, ranura])
    );

    if (delHero.size === 0) return;

    let activa = null;

    document.addEventListener(perfilesUI.evento, (evento) => {
        const ranura = delHero.get(evento.detail?.perfil);
        if (!ranura || ranura === activa) return;

        if (activa) activa.ciclo += 1;
        activa = ranura;
        ranura.ciclo += 1;

        rodar(ranura);
    });
}