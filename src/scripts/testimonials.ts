/*
 * Carrusel de testimonios (E40-I02, DESIGN.md 7.12). Controla un carril con `scroll-snap`:
 * flechas con vuelta, indicador de líneas y contador. Sin avance automático.
 *
 * Mejora progresiva: sin JavaScript el carril no existe (las 12 tarjetas se ven en grilla).
 * Este módulo pone `data-js` en el carrusel, que activa el carril y muestra los controles.
 * La página se calcula con el ancho: tarjetas visibles por vez = ancho del carril / ancho de
 * una tarjeta (3 desde 1.100 px, 2 desde 768 px, 1 bajo esa medida).
 * Accesibilidad: el texto de la región `aria-live="polite"` se actualiza una sola vez por
 * cambio de página (también al saltar con una flecha, sin anunciar las páginas intermedias)
 * y el foco se queda en la flecha que se pulsó.
 */
import { prefersReducedMotion } from './typewriter';

const pad = (n: number) => String(n).padStart(2, '0');

const initCarousel = (root: HTMLElement) => {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const dots = root.querySelector<HTMLElement>('[data-carousel-dots]');
  const count = root.querySelector<HTMLElement>('[data-carousel-count]');
  const status = root.querySelector<HTMLElement>('[data-carousel-status]');
  const prev = root.querySelector<HTMLElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLElement>('[data-carousel-next]');
  const template = root.dataset.pageTemplate ?? '{current} / {total}';
  const cards = track
    ? [...track.children].filter((c): c is HTMLElement => c instanceof HTMLElement)
    : [];
  if (!track || !dots || !count || !status || !prev || !next || cards.length === 0) return;

  root.setAttribute('data-js', '');

  let perView = 3;
  let pages = 1;
  let page = 0;
  // Mientras una flecha desplaza el carril, el scroll no cambia la página (evita anuncios
  // intermedios). Se libera al terminar el desplazamiento.
  let lock = false;
  let lockTimer = 0;

  const measure = () => {
    perView = Math.max(1, Math.round(track.clientWidth / cards[0].offsetWidth));
    pages = Math.ceil(cards.length / perView);
  };

  const buildDots = () => {
    dots.replaceChildren(...Array.from({ length: pages }, () => document.createElement('span')));
  };

  const render = () => {
    [...dots.children].forEach((dot, i) => dot.classList.toggle('is-active', i === page));
    count.textContent = `${pad(page + 1)} / ${pad(pages)}`;
    status.textContent = template
      .replace('{current}', String(page + 1))
      .replace('{total}', String(pages));
  };

  /** Página según la tarjeta más cercana al borde izquierdo del carril. */
  const pageFromScroll = () => {
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - left);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    return Math.min(pages - 1, Math.floor(nearest / perView));
  };

  const goTo = (target: number) => {
    page = (target + pages) % pages;
    render();
    lock = true;
    window.clearTimeout(lockTimer);
    // `scrollend` no existe en todos los navegadores: el temporizador es el respaldo.
    lockTimer = window.setTimeout(() => (lock = false), 800);
    track.scrollTo({
      left: cards[Math.min(cards.length - 1, page * perView)].offsetLeft,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  prev.addEventListener('click', () => goTo(page - 1));
  next.addEventListener('click', () => goTo(page + 1));
  track.addEventListener('scrollend', () => {
    lock = false;
    window.clearTimeout(lockTimer);
  });

  let frame = 0;
  track.addEventListener(
    'scroll',
    () => {
      if (lock || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const current = pageFromScroll();
        if (current !== page) {
          page = current;
          render();
        }
      });
    },
    { passive: true },
  );

  // Si cambia el ancho, cambia cuántas tarjetas caben: se recalcula y se mantiene la tarjeta.
  let lastWidth = track.clientWidth;
  new ResizeObserver(() => {
    if (track.clientWidth === lastWidth) return;
    lastWidth = track.clientWidth;
    const firstVisible = page * perView;
    measure();
    page = Math.min(pages - 1, Math.floor(firstVisible / perView));
    buildDots();
    render();
    track.scrollTo({
      left: cards[Math.min(cards.length - 1, page * perView)].offsetLeft,
      behavior: 'auto',
    });
  }).observe(track);

  // Una foto que no carga se reemplaza por las iniciales (4.3); no se consulta ningún servicio.
  const showInitials = (img: HTMLImageElement) => {
    img.hidden = true;
    const initials = img.parentElement?.querySelector<HTMLElement>('[data-avatar-initials]');
    if (initials) initials.hidden = false;
  };
  for (const img of track.querySelectorAll<HTMLImageElement>('img[data-avatar-photo]')) {
    img.addEventListener('error', () => showInitials(img), { once: true });
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) showInitials(img);
  }

  measure();
  buildDots();
  render();
};

export const initTestimonials = () => {
  for (const root of document.querySelectorAll<HTMLElement>('[data-carousel]')) initCarousel(root);
};
