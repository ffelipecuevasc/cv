/*
 * Motor de máquina de escribir (E30-I03, DESIGN.md 3.3), portado de
 * main:static/js/maquina-escribir.js sin dependencias. Sirve al logotipo y al titular
 * del hero (E40-I01).
 *
 * Mejora progresiva: el marcado ya trae la primera frase y una copia invisible de cada
 * frase en la misma celda, que reservan el ancho de la más ancha (CLS 0). Sin JavaScript o con movimiento reducido no arranca y la primera frase
 * queda fija, con el cursor quieto (el parpadeo solo existe con `.typewriter--running`).
 *
 * Estructura esperada:
 *   <span class="typewriter" data-typewriter='["Frase 1","Frase 2"]'>
 *     <span class="typewriter-measure">Frase 1</span> (una por frase)
 *     <span class="typewriter-text">Frase 1</span>
 *   </span>
 */

export interface Rhythm {
  /** Espera antes del primer borrado. */
  startMs: number;
  /** Base entre carácter y carácter al escribir. */
  typeMs: number;
  /** Variación aleatoria que se suma a typeMs (0 a jitterMs). */
  jitterMs: number;
  /** Espera entre carácter y carácter al borrar. */
  deleteMs: number;
  /** Espera con la frase completa. */
  holdFullMs: number;
  /** Espera con el texto vacío. */
  holdEmptyMs: number;
}

/** Ritmo del logotipo (DESIGN.md 3.3, ADR-049). */
export const logoRhythm: Rhythm = {
  startMs: 1400,
  typeMs: 84,
  jitterMs: 34,
  deleteMs: 42,
  holdFullMs: 3600,
  holdEmptyMs: 500,
};

/*
 * Ritmo del titular del hero (E40-I01), portado de main:static/js/config/maquina-escribir.config.js.
 * Es más ágil que el del logotipo, que entra más tarde y es más lento para que las dos
 * máquinas no tecleen al unísono y compitan entre sí.
 */
export const heroRhythm: Rhythm = {
  startMs: 0,
  typeMs: 68,
  jitterMs: 34,
  deleteMs: 32,
  holdFullMs: 2000,
  holdEmptyMs: 420,
};

const RUNNING = 'typewriter--running';
const TYPING = 'typewriter--typing';

const sleep = (ms: number) => new Promise<void>((resume) => setTimeout(resume, ms));

/** Compuerta: detiene el ciclo sin perder su estado mientras está cerrada. */
const createGate = () => {
  let open = true;
  const waiting: (() => void)[] = [];
  return {
    set(isOpen: boolean) {
      open = isOpen;
      if (open) waiting.splice(0).forEach((resume) => resume());
    },
    pass: () => (open ? Promise.resolve() : new Promise<void>((resume) => waiting.push(resume))),
  };
};

export interface Typewriter {
  /** Arranca (o reinicia) el ciclo desde la primera frase. */
  start(): void;
  /** Cancela el ciclo y deja la primera frase fija. */
  stop(): void;
}

/** Crea el efecto sobre un contenedor `.typewriter`. Devuelve null si no hay qué rotar. */
export const createTypewriter = (
  root: HTMLElement,
  phrases: readonly string[],
  rhythm: Rhythm,
): Typewriter | null => {
  const text = root.querySelector<HTMLElement>('.typewriter-text');
  if (!text || phrases.length < 2) return null;

  const gate = createGate();
  let tabVisible = !document.hidden;
  let onScreen = true;
  let cycle = 0;
  const refresh = () => gate.set(tabVisible && onScreen);

  document.addEventListener('visibilitychange', () => {
    tabVisible = !document.hidden;
    refresh();
  });
  // Un elemento oculto con display: none nunca intersecta: el ciclo queda en pausa.
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    refresh();
  }).observe(root);

  const run = async (myCycle: number) => {
    const alive = () => cycle === myCycle;
    const breathe = async (ms: number) => {
      await sleep(ms);
      await gate.pass();
      return alive();
    };
    const chars = (s: string | null) => [...(s ?? '')];

    text.textContent = phrases[0];
    root.classList.remove(TYPING);
    if (!(await breathe(rhythm.startMs))) return;

    let index = 0;
    for (;;) {
      if (!(await breathe(rhythm.holdFullMs))) return;

      root.classList.add(TYPING);
      while (chars(text.textContent).length > 0) {
        if (!(await breathe(rhythm.deleteMs))) return;
        text.textContent = chars(text.textContent).slice(0, -1).join('');
      }

      index = (index + 1) % phrases.length;
      if (!(await breathe(rhythm.holdEmptyMs))) return;

      const letters = chars(phrases[index]);
      for (let i = 1; i <= letters.length; i += 1) {
        // Ritmo humano: nunca dos teclas a la misma velocidad.
        if (!(await breathe(rhythm.typeMs + Math.random() * rhythm.jitterMs))) return;
        text.textContent = letters.slice(0, i).join('');
      }
      root.classList.remove(TYPING);
    }
  };

  return {
    start() {
      cycle += 1;
      root.classList.add(RUNNING);
      void run(cycle);
    },
    stop() {
      cycle += 1;
      root.classList.remove(RUNNING, TYPING);
      text.textContent = phrases[0];
    },
  };
};

/** Movimiento reducido: el efecto no arranca (DESIGN.md 3.4). */
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Arranca todas las ranuras autónomas `[data-typewriter]` con un ritmo dado. */
export const initTypewriters = (selector: string, rhythm: Rhythm) => {
  if (prefersReducedMotion()) return;
  for (const root of document.querySelectorAll<HTMLElement>(selector)) {
    const phrases = JSON.parse(root.dataset.typewriter ?? '[]') as string[];
    createTypewriter(root, phrases, rhythm)?.start();
  }
};
