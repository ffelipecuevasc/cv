/*
 * Detalle de certificaciones de Educación (E50-I02, ADR-061). Mejora progresiva:
 * - Sin JavaScript (o sin `showModal`), el detalle de cada credencial se ve en su franja.
 * - Con JavaScript, el detalle se oculta en la franja y el botón «Ver detalle» lo abre en un
 *   único <dialog> nativo: `showModal()` deja inerte el resto de la página (foco atrapado),
 *   Escape lo cierra y, al cerrar, el foco vuelve al botón que lo abrió.
 */
export const initCertifications = (): void => {
  const root = document.querySelector<HTMLElement>('[data-certs]');
  const dialog = root?.querySelector<HTMLDialogElement>('[data-cert-dialog]');
  if (!root || !dialog || typeof dialog.showModal !== 'function') return;
  const title = dialog.querySelector<HTMLElement>('[data-cert-dialog-title]');
  const body = dialog.querySelector<HTMLElement>('[data-cert-dialog-body]');
  if (!title || !body) return;

  let trigger: HTMLButtonElement | null = null;
  root.setAttribute('data-js', '');

  root.querySelectorAll<HTMLButtonElement>('[data-cert-open]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const item = button.closest('[data-cert]');
      const detail = item?.querySelector('[data-cert-detail]');
      if (!item || !detail) return;
      title.textContent = item.querySelector('[data-cert-name]')?.textContent ?? '';
      body.replaceChildren(detail.cloneNode(true));
      trigger = button;
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-cert-close]')?.addEventListener('click', () => dialog.close());
  // Clic fuera del panel (sobre el fondo del diálogo) también cierra.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    trigger?.focus();
    trigger = null;
  });
};
