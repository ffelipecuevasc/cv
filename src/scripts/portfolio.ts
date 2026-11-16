/*
 * Filtros del portafolio (E70-I02, ADR-068). Mejora progresiva: sin JavaScript el grupo de
 * botones queda oculto (`hidden`) y se ven los 12 proyectos. Este módulo muestra el grupo, y
 * cada botón (un <button> nativo, operable con Tab, Enter y Espacio) marca su estado con
 * `aria-pressed`, oculta con `hidden` los proyectos de otra categoría, recalcula el ritmo del
 * mosaico (7/5, 5/7, 6/6) sobre los visibles y anuncia el resultado en una región
 * `aria-live="polite"`. El foco se queda en el botón. Sin animaciones: nada que reducir con
 * `prefers-reduced-motion`.
 */

/** Ritmo del mosaico de main (portafolio.config.js): se repite cada seis tarjetas. */
export const MOSAIC_SPANS = [7, 5, 5, 7, 6, 6] as const;

const applySpans = (cells: HTMLElement[]) => {
  cells
    .filter((cell) => !cell.hidden)
    .forEach((cell, index) => {
      cell.style.setProperty('--span', String(MOSAIC_SPANS[index % MOSAIC_SPANS.length]));
    });
};

const initPortfolio = (root: HTMLElement) => {
  const group = root.querySelector<HTMLElement>('[data-portfolio-filters]');
  const status = root.querySelector<HTMLElement>('[data-portfolio-status]');
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const cells = [...root.querySelectorAll<HTMLElement>('[data-category]')];
  if (!group || !status || buttons.length === 0 || cells.length === 0) return;

  const template = root.dataset.statusTemplate ?? '{count} / {total}: {filter}';

  const select = (button: HTMLButtonElement) => {
    const filter = button.dataset.filter ?? 'all';
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    cells.forEach((cell) => {
      cell.hidden = filter !== 'all' && cell.dataset.category !== filter;
    });
    applySpans(cells);
    const count = cells.filter((cell) => !cell.hidden).length;
    status.textContent = template
      .replace('{count}', String(count))
      .replace('{total}', String(cells.length))
      .replace('{filter}', button.dataset.label ?? '');
  };

  buttons.forEach((button) => button.addEventListener('click', () => select(button)));
  group.hidden = false;
};

export const initPortfolios = () => {
  document.querySelectorAll<HTMLElement>('[data-portfolio]').forEach(initPortfolio);
};
