/*
 * Giscus en el foro (E120-I01, ADR-022 y ADR-078). Mejora progresiva: sin JavaScript el panel no
 * se muestra y el <noscript> enlaza a GitHub.
 * - Carga diferida: el script de giscus.app no se pide hasta que el panel queda a 400 px de la
 *   pantalla (IntersectionObserver). Sin IntersectionObserver se carga de inmediato.
 * - El marcador estático se retira recién cuando existe el iframe, para que el hueco reservado
 *   nunca quede vacío (sin CLS).
 * - Tema en vivo: observa la clase `.dark` de <html>, que pone ThemeToggle (ADR-023), y la envía
 *   al iframe con postMessage. También la envía al cargar el iframe, por si cambió entremedio.
 */
const FRAME = 'iframe.giscus-frame';

interface ThreadData {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  term: string;
  lang: string;
  themeLight: string;
  themeDark: string;
  rootMargin: string;
  script: string;
  origin: string;
}

const isDark = () => document.documentElement.classList.contains('dark');

const themeFor = (data: ThreadData): string => (isDark() ? data.themeDark : data.themeLight);

function sendTheme(panel: HTMLElement, data: ThreadData): void {
  const frame = panel.querySelector<HTMLIFrameElement>(FRAME);
  frame?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: themeFor(data) } } },
    data.origin,
  );
}

function inject(panel: HTMLElement, data: ThreadData): void {
  const script = document.createElement('script');
  script.src = data.script;
  script.async = true;
  script.crossOrigin = 'anonymous';
  const attributes: Record<string, string> = {
    'data-repo': data.repo,
    'data-repo-id': data.repoId,
    'data-category': data.category,
    'data-category-id': data.categoryId,
    'data-mapping': 'specific',
    'data-term': data.term,
    'data-strict': '0',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'bottom',
    'data-lang': data.lang,
    'data-loading': 'lazy',
    'data-theme': themeFor(data),
  };
  for (const [name, value] of Object.entries(attributes)) script.setAttribute(name, value);

  const placeholder = panel.querySelector('[data-forum-placeholder]');
  const frameWatcher = new MutationObserver(() => {
    const frame = panel.querySelector<HTMLIFrameElement>(FRAME);
    if (!frame) return;
    frameWatcher.disconnect();
    placeholder?.remove();
    frame.addEventListener('load', () => sendTheme(panel, data), { once: true });
  });
  frameWatcher.observe(panel, { childList: true, subtree: true });

  panel.appendChild(script);
}

export function initGiscus(): void {
  const panel = document.querySelector<HTMLElement>('[data-forum-thread]');
  if (!panel) return;
  const data = panel.dataset as unknown as ThreadData;

  new MutationObserver(() => sendTheme(panel, data)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  if (!('IntersectionObserver' in window)) {
    inject(panel, data);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      inject(panel, data);
    },
    { rootMargin: data.rootMargin },
  );
  observer.observe(panel);
}
