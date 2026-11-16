/*
 * Conmutador de perfil del hero (E40-I01, DESIGN.md 7.4), portado de main:static/js/hero.js.
 *
 * Mejora progresiva: el HTML trae los tres perfiles completos y el CSS muestra solo el que
 * indica `data-profile` en la sección (de partida, Instructor). Sin JavaScript el conmutador
 * está oculto y se ve completo el perfil Instructor.
 * Un script en línea al inicio de la sección (Hero.astro) elige el perfil antes del primer
 * pintado, para que no haya destello ni CLS; este módulo lo toma de ahí y agrega la
 * interacción. Si ese script no corrió, este módulo hace la misma resolución.
 *
 * Perfil inicial: `?perfil=` en la URL, luego la clave `perfil-hero` de localStorage
 * (ADR-023), luego el de partida. Al elegir uno se guarda y se refleja en la URL con
 * replaceState, sin agregar entradas al historial.
 */
import { createTypewriter, heroRhythm, prefersReducedMotion, type Typewriter } from './typewriter';

const PARAM = 'perfil';
const STORAGE_KEY = 'perfil-hero';

const readStored = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // Almacenamiento bloqueado: se sigue con el perfil de partida.
  }
};

const remember = (profile: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, profile);
  } catch {
    // Modo privado: la elección vale solo para esta sesión.
  }
};

const reflectInUrl = (profile: string) => {
  const url = new URL(location.href);
  url.searchParams.set(PARAM, profile);
  history.replaceState(history.state, '', url);
};

export const initHero = () => {
  const root = document.querySelector<HTMLElement>('[data-hero]');
  const list = root?.querySelector<HTMLElement>('[role="tablist"]');
  if (!root || !list) return;

  const tabs = [...list.querySelectorAll<HTMLElement>('[role="tab"]')];
  const ids = tabs.map((tab) => tab.dataset.profileId ?? '');
  const isProfile = (value: string | null | undefined): value is string =>
    value != null && ids.includes(value);

  // El script en línea ya eligió el perfil y mostró el conmutador; si no corrió, se hace aquí.
  if (!root.hasAttribute('data-js')) {
    root.setAttribute('data-js', '');
    const fromUrl = new URLSearchParams(location.search).get(PARAM);
    const stored = readStored();
    if (isProfile(fromUrl)) root.dataset.profile = fromUrl;
    else if (isProfile(stored)) root.dataset.profile = stored;
  }

  // Un motor por titular; solo corre el del perfil visible (los demás están ocultos).
  const writers = new Map<string, Typewriter>();
  if (!prefersReducedMotion()) {
    for (const slot of root.querySelectorAll<HTMLElement>('[data-typewriter]')) {
      const id = slot.closest<HTMLElement>('[data-profile-id]')?.dataset.profileId;
      const phrases = JSON.parse(slot.dataset.typewriter ?? '[]') as string[];
      const writer = createTypewriter(slot, phrases, heroRhythm);
      if (id && writer) writers.set(id, writer);
    }
  }

  const show = (profile: string, persist: boolean) => {
    root.dataset.profile = profile;
    for (const tab of tabs) {
      const active = tab.dataset.profileId === profile;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    }
    for (const [id, writer] of writers) {
      if (id === profile) writer.start();
      else writer.stop();
    }
    if (persist) {
      remember(profile);
      reflectInUrl(profile);
    }
  };

  for (const tab of tabs) {
    tab.addEventListener('click', () => show(tab.dataset.profileId ?? ids[0], true));
  }

  // Teclado del patrón de pestañas: flechas (con vuelta), Inicio y Fin; activa al enfocar.
  list.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;
    const steps: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let target: number | null = null;
    if (event.key in steps) target = (current + steps[event.key] + tabs.length) % tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tabs.length - 1;
    if (target === null) return;
    event.preventDefault();
    tabs[target].focus();
    show(tabs[target].dataset.profileId ?? ids[0], true);
  });

  const initial = root.dataset.profile;
  show(isProfile(initial) ? initial : ids[0], false);
};
