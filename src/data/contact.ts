/*
 * Configuración pública de Contacto (E140-I01, ADR-083). Solo valores públicos: la clave de sitio
 * de Turnstile se publica en el HTML por diseño (main:contacto.html). La clave secreta vive en el
 * panel de Cloudflare y la usa E140-I02; nunca se escribe en el repositorio.
 */
export const CONTACT = {
  /** Destino del formulario: la función de envío de E140-I02. */
  endpoint: '/api/contacto',
  email: 'contacto@felipecuevas.dev',
  turnstile: {
    siteKey: '0x4AAAAAAEWzkOxGXy4tlBVL',
    script: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
  },
  calendly: {
    /** Página pública del evento: enlace directo y alternativa sin JavaScript. */
    page: 'https://calendly.com/ffelipecuevasc/entrevista-breve',
    /** Parámetros del widget de main; `primary_color` = `primary` (DESIGN.md 4.1). */
    embed:
      'https://calendly.com/ffelipecuevasc/entrevista-breve?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=007ea7',
    script: 'https://assets.calendly.com/assets/external/widget.js',
  },
} as const;

/** Idioma del widget de Turnstile por página (AT-027 en Giscus, mismo criterio). */
export const TURNSTILE_LANG = { es: 'es', en: 'en' } as const;
