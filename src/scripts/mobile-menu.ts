/*
 * Menú móvil (E30-I05, DESIGN.md 7.2, AT-011). Patrón de divulgación:
 * - El botón alterna aria-expanded y su nombre ("Abrir menú" / "Cerrar menú").
 * - Cerrado, el panel lleva `inert`: sus enlaces no reciben foco ni clics.
 * - Escape cierra y devuelve el foco al botón.
 * - Clic fuera, foco que sale de la barra, clic en una opción, paso a escritorio y
 *   regreso desde el historial (bfcache) también cierran. Una navegación a otra ruta
 *   recarga la página, que parte cerrada.
 * Sin JavaScript el panel queda abierto y en el flujo (noscript en BaseLayout).
 */
export const initMobileMenu = (header: HTMLElement) => {
  const toggle = header.querySelector<HTMLButtonElement>('[data-mobile-toggle]');
  const panel = header.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !panel) return;

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '',
    );
    panel.inert = !open;
  };

  setOpen(false);
  toggle.addEventListener('click', () => setOpen(!isOpen()));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target as Node)) setOpen(false);
  });
  header.addEventListener('focusout', (event) => {
    const next = event.relatedTarget as Node | null;
    if (isOpen() && next && !header.contains(next)) setOpen(false);
  });
  panel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
  matchMedia('(min-width: 80rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) setOpen(false);
  });
};
