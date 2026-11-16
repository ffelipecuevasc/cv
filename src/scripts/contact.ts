/*
 * Formulario de contacto y Calendly (E140-I01; ADR-035 y ADR-083). Mejora progresiva: sin
 * JavaScript el formulario se ve, el navegador valida los campos y un aviso ofrece el correo.
 * - Validación propia (novalidate): cada error se muestra bajo su campo, se asocia con
 *   aria-describedby solo mientras existe, marca aria-invalid y el foco va al primer error.
 * - El botón de envío nunca se deshabilita (ADR-035): un segundo clic mientras se envía no hace nada.
 * - Turnstile se descarga al primer foco en el formulario (o al enviar si aún no está), con el
 *   idioma de la página y el tema de la clase `.dark` de <html> (ADR-023).
 * - Envío: POST JSON a /api/contacto (E140-I02), con la versión de la política y el idioma. Si
 *   responde bien, redirige a la página de agradecimiento del idioma (E150). Si falla, el error se
 *   anuncia en la región de estado, que queda asociada al botón con aria-describedby.
 * - Calendly: no se descarga nada hasta que se pulsa «Cargar el calendario» (AT-024).
 */

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error(src)), { once: true });
    document.head.appendChild(script);
  });

const isDark = () => document.documentElement.classList.contains('dark');

function initTurnstile(form: HTMLFormElement, onDown: () => void) {
  const container = form.querySelector<HTMLElement>('[data-turnstile]');
  let token = '';
  let widgetId: string | undefined;
  let loading: Promise<void> | undefined;

  const start = (): Promise<void> => {
    if (!container) return Promise.resolve();
    loading ??= loadScript(container.dataset.script ?? '')
      .then(() => {
        if (!window.turnstile) throw new Error('turnstile');
        widgetId = window.turnstile.render(container, {
          sitekey: container.dataset.sitekey,
          language: container.dataset.language,
          theme: isDark() ? 'dark' : 'light',
          retry: 'auto',
          callback: (value: string) => {
            token = value;
          },
          'expired-callback': () => {
            token = '';
          },
          'error-callback': () => {
            token = '';
            onDown();
            return true;
          },
        });
      })
      .catch(() => onDown());
    return loading;
  };

  form.addEventListener('focusin', () => void start(), { once: true });

  return {
    start,
    token: () => token,
    reset: () => {
      token = '';
      if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
    },
  };
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  form.noValidate = true;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('[data-submit] button');
  const data = form.dataset;
  let sending = false;

  const say = (text: string, isError: boolean) => {
    if (!status) return;
    status.textContent = text;
    if (!button) return;
    if (isError) button.setAttribute('aria-describedby', status.id);
    else button.removeAttribute('aria-describedby');
  };

  const turnstile = initTurnstile(form, () => say(data.errorTurnstileDown ?? '', true));

  const controls = [
    ...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input[required], textarea[required]',
    ),
  ];

  const isValid = (control: HTMLInputElement | HTMLTextAreaElement): boolean => {
    if (control instanceof HTMLInputElement && control.type === 'checkbox') return control.checked;
    const value = control.value.trim();
    if (control.type === 'email') return EMAIL.test(value);
    return value.length > 0;
  };

  const setError = (control: HTMLInputElement | HTMLTextAreaElement, show: boolean) => {
    const error = form.querySelector<HTMLElement>(`[data-error-for="${control.id}"]`);
    if (!error) return;
    error.hidden = !show;
    if (show) {
      control.setAttribute('aria-invalid', 'true');
      control.setAttribute('aria-describedby', error.id);
    } else {
      control.removeAttribute('aria-invalid');
      control.removeAttribute('aria-describedby');
    }
  };

  // Un error se retira en cuanto el campo queda bien; no se muestran errores al escribir.
  for (const control of controls) {
    const event = control.type === 'checkbox' ? 'change' : 'input';
    control.addEventListener(event, () => {
      if (control.getAttribute('aria-invalid') === 'true' && isValid(control)) {
        setError(control, false);
      }
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;

    const invalid = controls.filter((control) => !isValid(control));
    controls.forEach((control) => setError(control, invalid.includes(control)));
    if (invalid.length > 0) {
      say('', false);
      invalid[0]?.focus();
      return;
    }

    await turnstile.start();
    const token = turnstile.token();
    if (!token) {
      say(data.errorTurnstile ?? '', true);
      return;
    }

    const fields = new FormData(form);
    sending = true;
    say(data.sending ?? '', false);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: fields.get('nombre'),
          correo: fields.get('correo'),
          asunto: fields.get('asunto'),
          mensaje: fields.get('mensaje'),
          consentimiento: fields.get('consentimiento') === 'si',
          versionPolitica: fields.get('versionPolitica'),
          idioma: fields.get('idioma'),
          turnstileToken: token,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && result.ok) {
        window.location.href = data.thankYou ?? '/';
        return;
      }
      say(
        typeof result.error === 'string' && result.error ? result.error : (data.errorSend ?? ''),
        true,
      );
    } catch {
      say(data.errorSend ?? '', true);
    }
    // El token de Turnstile es de un solo uso: se pide otro para el siguiente intento.
    turnstile.reset();
    sending = false;
  });

  initCalendly();
}

function initCalendly(): void {
  const panel = document.querySelector<HTMLElement>('[data-calendly]');
  const button = panel?.querySelector<HTMLButtonElement>('[data-calendly-load] button');
  if (!panel || !button) return;
  const status = panel.querySelector<HTMLElement>('[data-calendly-status]');

  button.addEventListener(
    'click',
    () => {
      if (status) status.textContent = panel.dataset.loadingText ?? '';
      const widget = document.createElement('div');
      widget.className = 'calendly-inline-widget';
      widget.dataset.url = panel.dataset.url ?? '';
      // El widget se agrega oculto y reemplaza al marcador cuando existe su iframe (sin CLS).
      widget.hidden = true;
      panel.appendChild(widget);
      const watcher = new MutationObserver(() => {
        if (!widget.querySelector('iframe')) return;
        watcher.disconnect();
        panel.querySelector('[data-calendly-placeholder]')?.remove();
        widget.hidden = false;
      });
      watcher.observe(widget, { childList: true, subtree: true });
      loadScript(panel.dataset.script ?? '').catch(() => {
        watcher.disconnect();
        if (status) status.textContent = '';
        button.focus();
      });
    },
    { once: true },
  );
}
