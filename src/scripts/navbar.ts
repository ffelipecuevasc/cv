/*
 * Desplegables de la navbar de escritorio (E30-I04, DESIGN.md 7.2, AT-010).
 * Patrón de divulgación: el disparador es un <button> con aria-expanded y aria-controls.
 * - Clic, Enter o Espacio alternan (comportamiento nativo del botón).
 * - Con el cursor: abre al entrar y cierra al salir del grupo.
 * - Escape cierra y devuelve el foco al disparador.
 * - Clic fuera o foco fuera del grupo cierra.
 * - Solo un desplegable abierto a la vez.
 * Sin JavaScript, el CSS abre el grupo con :hover y :focus-within (mejora progresiva);
 * la clase `is-enhanced` desactiva ese respaldo.
 */
export const initNavbar = (nav: HTMLElement) => {
  nav.classList.add('is-enhanced');
  const groups = [...nav.querySelectorAll<HTMLElement>('[data-nav-group]')];
  const triggerOf = (group: HTMLElement) =>
    group.querySelector<HTMLButtonElement>('[aria-expanded]')!;

  const setOpen = (group: HTMLElement, open: boolean) => {
    triggerOf(group).setAttribute('aria-expanded', String(open));
  };
  const closeAll = (except?: HTMLElement) => {
    for (const group of groups) if (group !== except) setOpen(group, false);
  };

  for (const group of groups) {
    const trigger = triggerOf(group);
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') !== 'true';
      closeAll(group);
      setOpen(group, open);
    });
    group.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      closeAll(group);
      setOpen(group, true);
    });
    group.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse') setOpen(group, false);
    });
    group.addEventListener('focusout', (event) => {
      if (!group.contains(event.relatedTarget as Node | null)) setOpen(group, false);
    });
    group.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || trigger.getAttribute('aria-expanded') !== 'true') return;
      setOpen(group, false);
      trigger.focus();
    });
  }

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target as Node)) closeAll();
  });
};
