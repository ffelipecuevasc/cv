/*
 * Aparición al hacer scroll (DESIGN.md 8, ADR-045). Reemplaza a AOS (AT-018).
 *
 * Garantías:
 * - Sin JavaScript no se oculta nada: el CSS solo oculta cuando <html> tiene la clase
 *   `reveal-ready`, y esa clase la pone este script.
 * - Con prefers-reduced-motion: reduce el script no hace nada y todo queda visible.
 * - Lo que ya está en pantalla al cargar se marca visible antes de activar el modo,
 *   para que no parpadee.
 * - Solo anima opacidad y un desplazamiento de 4 px con `translate`, que no cuenta
 *   para CLS.
 * - No se usa en Inicio (DESIGN.md 8): esa página no importa este módulo.
 */
const SELECTOR = '[data-reveal]';
const VISIBLE = 'is-revealed';

export function initReveal(root: ParentNode = document): void {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
  if (items.length === 0) return;

  const viewportHeight = window.innerHeight;
  const pending = items.filter((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    const onScreen = top < viewportHeight && bottom > 0;
    if (onScreen) el.classList.add(VISIBLE);
    return !onScreen;
  });

  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(VISIBLE);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  pending.forEach((el) => observer.observe(el));
}
