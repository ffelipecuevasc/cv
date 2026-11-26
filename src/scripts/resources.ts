/*
 * Rutas de aprendizaje de Recursos (E130-I01, ADR-023 y ADR-079; E200-I14, ADR-122). Mejora
 * progresiva: sin JavaScript se leen todas las etapas y sus pasos, y las tarjetas del catálogo
 * enlazan a su ruta; las casillas, contadores, barras y botones de etapa no aparecen.
 * - Clave `rutas-progreso` con el formato de main: {"<ruta>": [ids numéricos]}. Cada ruta solo lee
 *   y escribe su propia entrada; las demás (python, empleabilidad, java…) se conservan tal cual. Se
 *   relee el almacenamiento antes de escribir, por si otra pestaña cambió.
 * - Un id que ya no es paso de la ruta se ignora al contar, pero no se borra.
 * - Catálogo (`initRouteCatalog`): `?ruta=<id>` de una ruta existente lleva a su página (enlace
 *   compartible de main); otro valor se ignora. Cada tarjeta muestra su avance.
 * - Página de ruta (`initRouteProgress`): casillas, avance de la ruta y de cada etapa, y la etapa
 *   actual marcada en el índice. Qué etapa se ve lo decide el CSS con :target (RouteExplorer).
 */
const STORAGE_KEY = 'rutas-progreso';
const PARAM = 'ruta';

type Progress = Record<string, unknown>;

function readAll(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data: unknown = raw ? JSON.parse(raw) : {};
    return data && typeof data === 'object' && !Array.isArray(data) ? (data as Progress) : {};
  } catch {
    // Almacenamiento bloqueado o dato corrupto: se parte de cero sin tocar lo guardado.
    return {};
  }
}

function writeRoute(route: string, ids: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readAll(), [route]: ids }));
  } catch {
    // Modo privado o cuota llena: el progreso vale solo para esta visita.
  }
}

function routeIds(route: string): number[] {
  const value = readAll()[route];
  return Array.isArray(value) ? value.map(Number).filter(Number.isInteger) : [];
}

const progressText = (template: string, completed: string, done: number, total: number) =>
  done === total && total > 0
    ? completed
    : template.replace('{done}', String(done)).replace('{total}', String(total));

/** Catálogo de Recursos: avance de cada tarjeta y redirección de `?ruta=`. */
export function initRouteCatalog(): void {
  const cards = [...document.querySelectorAll<HTMLElement>('[data-route-card]')];
  const wanted = new URLSearchParams(location.search).get(PARAM);
  const target = cards.find((card) => card.dataset.routeCard === wanted);
  const link = target?.querySelector<HTMLAnchorElement>('[data-card-cta]');
  if (link) {
    location.replace(link.href);
    return;
  }

  const render = () => {
    for (const card of cards) {
      const steps = new Set((card.dataset.steps ?? '').split(' ').map(Number));
      const done = routeIds(card.dataset.routeCard ?? '').filter((id) => steps.has(id)).length;
      const total = steps.size;
      const text = card.querySelector<HTMLElement>('[data-card-progress-text]');
      const bar = card.querySelector<HTMLElement>('[data-card-bar]');
      const fill = card.querySelector<HTMLElement>('[data-card-fill]');
      const cta = card.querySelector<HTMLElement>('[data-card-cta-text]');
      if (text) {
        text.textContent = progressText(
          card.dataset.progressTemplate ?? '',
          card.dataset.completed ?? '',
          done,
          total,
        );
      }
      bar?.setAttribute('aria-valuenow', String(done));
      if (fill) fill.style.width = `${total ? (done / total) * 100 : 0}%`;
      if (cta && done > 0 && card.dataset.continue) cta.textContent = card.dataset.continue;
    }
  };

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) render();
  });
  render();
}

/** Página de una ruta: casillas, avance de la ruta y de cada etapa, índice y detalle. */
export function initRouteProgress(): void {
  const section = document.querySelector<HTMLElement>('[data-route]');
  if (!section) return;
  const route = section.dataset.route ?? '';
  const total = Number(section.dataset.total);
  const template = section.dataset.progressTemplate ?? '';
  const completedText = section.dataset.completed ?? '';
  const steps = [...section.querySelectorAll<HTMLElement>('[data-step]')];
  const stepIds = new Set(steps.map((step) => Number(step.dataset.step)));
  const stages = [...section.querySelectorAll<HTMLElement>('[data-stage]')];
  const links = [...section.querySelectorAll<HTMLAnchorElement>('[data-stage-link]')];
  const progress = document.querySelector<HTMLElement>('[data-route-progress]');
  const text = progress?.querySelector<HTMLElement>('[data-progress-text]');
  const bar = progress?.querySelector<HTMLElement>('[data-progress-bar]');
  const fill = progress?.querySelector<HTMLElement>('[data-progress-fill]');

  const render = () => {
    const done = new Set(routeIds(route).filter((id) => stepIds.has(id)));
    for (const step of steps) {
      const isDone = done.has(Number(step.dataset.step));
      step.classList.toggle('is-done', isDone);
      const input = step.querySelector<HTMLInputElement>('input[type="checkbox"]');
      if (input) input.checked = isDone;
    }
    stages.forEach((stage, index) => {
      const own = [...stage.querySelectorAll<HTMLElement>('[data-step]')];
      const n = own.filter((s) => done.has(Number(s.dataset.step))).length;
      const link = links[index];
      const count = link?.querySelector<HTMLElement>('[data-stage-count]');
      if (count) count.textContent = `${n} / ${own.length}`;
      link?.classList.toggle('is-done', n === own.length);
    });
    if (text) text.textContent = progressText(template, completedText, done.size, total);
    bar?.setAttribute('aria-valuenow', String(done.size));
    if (fill) fill.style.width = `${total ? (done.size / total) * 100 : 0}%`;
  };

  // Detalle: la etapa visible la decide el CSS con :target (RouteExplorer); aquí solo se marca en el
  // índice. Los enlaces del índice y de etapa anterior y siguiente son anclas normales.
  const mark = () => {
    const current = stages.find((stage) => `#${stage.id}` === location.hash) ?? stages[0];
    links.forEach((link, index) => {
      if (stages[index] === current) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('hashchange', mark);

  section.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'checkbox') return;
    const id = Number(input.value);
    const current = routeIds(route);
    const next = input.checked
      ? [...current.filter((x) => x !== id), id]
      : current.filter((x) => x !== id);
    writeRoute(route, next);
    render();
  });

  progress?.querySelector('[data-progress-reset]')?.addEventListener('click', () => {
    // Solo se quitan los pasos de esta ruta; lo demás de la clave queda igual.
    writeRoute(
      route,
      routeIds(route).filter((id) => !stepIds.has(id)),
    );
    render();
  });

  // Otra pestaña cambió el progreso.
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) render();
  });

  render();
  mark();
}
