/*
 * Progreso de la ruta «Desarrollo Web & IA» (E130-I01, ADR-023 y ADR-079). Mejora progresiva: sin
 * JavaScript la ruta se lee completa y las casillas, contadores, barra y buscador no aparecen.
 * - Clave `rutas-progreso` con el formato de main: {"<ruta>": [ids numéricos]}. Solo se lee y se
 *   escribe `desarrollo-web-ia`; las demás claves del objeto (python, empleabilidad, java…) se
 *   conservan tal cual. Se relee el almacenamiento antes de escribir, por si otra pestaña cambió.
 * - Un id que ya no es paso de la ruta se ignora al contar, pero no se borra.
 * - `?ruta=desarrollo-web-ia` lleva a la ficha de la ruta, como el enlace compartible de main;
 *   otro valor se ignora.
 * - El buscador filtra por título, descripción y tecnología, y oculta las etapas sin coincidencias.
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
  const progress = document.querySelector<HTMLElement>('[data-route-progress]');
  const progressText = progress?.querySelector<HTMLElement>('[data-progress-text]');
  const bar = progress?.querySelector<HTMLElement>('[data-progress-bar]');
  const fill = progress?.querySelector<HTMLElement>('[data-progress-fill]');

  for (const el of section.querySelectorAll<HTMLElement>(
    '[data-step-check], [data-stage-count], [data-route-search]',
  )) {
    el.hidden = false;
  }
  if (progress) progress.hidden = false;

  const render = () => {
    const done = new Set(routeIds(route).filter((id) => stepIds.has(id)));
    for (const step of steps) {
      const isDone = done.has(Number(step.dataset.step));
      step.classList.toggle('is-done', isDone);
      const input = step.querySelector<HTMLInputElement>('input[type="checkbox"]');
      if (input) input.checked = isDone;
    }
    for (const stage of stages) {
      const own = [...stage.querySelectorAll<HTMLElement>('[data-step]')];
      const count = stage.querySelector<HTMLElement>('[data-stage-count]');
      if (count) {
        const n = own.filter((s) => done.has(Number(s.dataset.step))).length;
        count.textContent = `${n} / ${own.length}`;
      }
    }
    const n = done.size;
    if (progressText) {
      progressText.textContent =
        n === total && total > 0
          ? completedText
          : template.replace('{done}', String(n)).replace('{total}', String(total));
    }
    bar?.setAttribute('aria-valuenow', String(n));
    if (fill) fill.style.width = `${total ? (n / total) * 100 : 0}%`;
  };

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

  const search = section.querySelector<HTMLInputElement>('#route-search');
  const noResults = section.querySelector<HTMLElement>('[data-no-results]');
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const step of steps) {
      const match = !query || (step.dataset.search ?? '').includes(query);
      step.hidden = !match;
      if (match) visible += 1;
    }
    for (const stage of stages) {
      stage.hidden = ![...stage.querySelectorAll<HTMLElement>('[data-step]')].some(
        (s) => !s.hidden,
      );
    }
    if (noResults) noResults.hidden = visible > 0;
  });

  render();

  if (new URLSearchParams(location.search).get(PARAM) === route) {
    document.getElementById('route')?.scrollIntoView();
  }
}
