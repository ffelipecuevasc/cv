/*
 * POST /api/contacto (E140-I02; ADR-035, ADR-083 y ADR-084). Reescribe para Workers la función de
 * Pages de main (functions/api/contacto.js): valida en el servidor, verifica Turnstile y entrega el
 * mensaje con la API de correo de Cloudflare, el mismo proveedor de main.
 * - Contrato con el formulario (src/scripts/contact.ts): JSON con `nombre`, `correo`, `asunto`,
 *   `mensaje`, `consentimiento` (booleano), `versionPolitica`, `idioma` y `turnstileToken`.
 *   Responde `{ ok: true }` o `{ ok: false, error }`, con `error` en el idioma del formulario.
 * - Consentimiento (ADR-035): se exige `consentimiento: true` y la versión vigente de la política,
 *   importada de la constante única (ADR-083). La evidencia (fecha, hora y versión) viaja en el
 *   correo; no hay base de datos.
 * - Registros: solo códigos de error, nunca datos personales ni respuestas de terceros completas.
 * - Secretos (los configura Felipe en el panel, sin valores en el repositorio): CF_ACCOUNT_ID,
 *   CF_EMAIL_TOKEN, TURNSTILE_SECRET_KEY y CONTACTO_DESTINO.
 */
import { PRIVACY_POLICY_VERSION } from '../data/privacy-policy.ts';

export interface ContactEnv {
  CF_ACCOUNT_ID?: string;
  CF_EMAIL_TOKEN?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACTO_DESTINO?: string;
}

type Lang = 'es' | 'en';

/** Remitente de main: dominio incorporado a Email Routing. */
const SENDER = 'formulario@felipecuevas.dev';
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
/** Tope del cuerpo: los 4 campos en su largo máximo caben con holgura. */
const MAX_BODY_BYTES = 16_384;
/** Mismos topes que los `maxlength` del formulario (E140-I01). */
const LIMITS = { nombre: 120, correo: 254, asunto: 150, mensaje: 5000, turnstileToken: 2048 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGES = {
  es: {
    badRequest: 'La solicitud no tiene un formato válido.',
    missing: 'Faltan campos obligatorios.',
    tooLong: 'Uno de los campos excede el largo permitido.',
    email: 'La dirección de correo no es válida.',
    consent: 'Para enviar el mensaje debes aceptar la política de privacidad.',
    policy: 'La política de privacidad cambió. Recarga la página y vuelve a aceptarla.',
    human: 'No pudimos verificar que el envío proviene de una persona. Vuelve a intentarlo.',
    delivery:
      'No se pudo entregar el mensaje. Inténtalo más tarde o escríbeme a contacto@felipecuevas.dev.',
    method: 'Método no permitido.',
    origin: 'Origen no permitido.',
  },
  en: {
    badRequest: 'The request is not in a valid format.',
    missing: 'Some required fields are missing.',
    tooLong: 'One of the fields is longer than allowed.',
    email: 'The email address is not valid.',
    consent: 'You must accept the privacy policy to send your message.',
    policy: 'The privacy policy has changed. Reload the page and accept it again.',
    human: 'We could not verify that the message comes from a person. Please try again.',
    delivery:
      'The message could not be delivered. Please try again later or email me at contacto@felipecuevas.dev.',
    method: 'Method not allowed.',
    origin: 'Origin not allowed.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

type MessageKey = keyof (typeof MESSAGES)['es'];

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });

const fail = (lang: Lang, key: MessageKey, status: number, headers?: Record<string, string>) =>
  json({ ok: false, error: MESSAGES[lang][key] }, status, headers);

/** Registro sin datos personales: solo un código y, si aplica, un detalle técnico breve. */
const log = (code: string, detail?: string) =>
  console.error(`[contacto] ${code}${detail ? ` ${detail}` : ''}`);

export interface ContactFields {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
  idioma: Lang;
  turnstileToken: string;
}

type Validation = { ok: true; fields: ContactFields } | { ok: false; key: MessageKey };

/** Validación en el servidor: es la que gobierna; la del navegador es comodidad. */
export function validate(input: unknown): Validation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, key: 'badRequest' };
  }
  const raw = input as Record<string, unknown>;
  const text = (name: keyof typeof LIMITS) =>
    typeof raw[name] === 'string' ? (raw[name] as string).trim() : '';
  const fields: ContactFields = {
    nombre: text('nombre'),
    correo: text('correo'),
    asunto: text('asunto'),
    mensaje: text('mensaje'),
    idioma: raw.idioma === 'en' ? 'en' : 'es',
    turnstileToken: text('turnstileToken'),
  };
  if (!fields.nombre || !fields.correo || !fields.asunto || !fields.mensaje) {
    return { ok: false, key: 'missing' };
  }
  for (const [name, max] of Object.entries(LIMITS)) {
    if (fields[name as keyof typeof LIMITS].length > max) return { ok: false, key: 'tooLong' };
  }
  if (!EMAIL.test(fields.correo)) return { ok: false, key: 'email' };
  if (raw.consentimiento !== true) return { ok: false, key: 'consent' };
  if (raw.versionPolitica !== PRIVACY_POLICY_VERSION) return { ok: false, key: 'policy' };
  if (!fields.turnstileToken) return { ok: false, key: 'human' };
  return { ok: true, fields };
}

/** Comprueba el token de Turnstile con Cloudflare (siteverify). */
async function isHuman(token: string, ip: string | null, secret: string): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  try {
    const response = await fetch(SITEVERIFY, { method: 'POST', body });
    const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (result.success === true) return true;
    log('turnstile_rejected', (result['error-codes'] ?? []).join(',').slice(0, 120));
    return false;
  } catch {
    log('turnstile_unreachable');
    return false;
  }
}

/** Una cabecera de correo no admite saltos de línea (evita inyección de cabeceras). */
const oneLine = (value: string) => value.replace(/[\r\n\t]+/g, ' ');

/** Correo que recibe Felipe, con la evidencia del consentimiento (ADR-035). */
export function buildEmail(fields: ContactFields, acceptedAt: Date) {
  const utc = acceptedAt.toISOString();
  const local = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/Santiago',
  }).format(acceptedAt);
  const subject = `[Contacto] ${oneLine(fields.asunto)} — ${oneLine(fields.nombre)}`;
  const text = [
    `Nombre: ${oneLine(fields.nombre)}`,
    `Correo: ${fields.correo}`,
    `Asunto: ${oneLine(fields.asunto)}`,
    `Idioma del formulario: ${fields.idioma === 'en' ? 'en-US' : 'es-CL'}`,
    '',
    fields.mensaje,
    '',
    '— Consentimiento (Ley 21.719, ADR-035) —',
    'Aceptó la política de privacidad: sí',
    `Versión de la política: ${PRIVACY_POLICY_VERSION}`,
    `Fecha y hora: ${local} (${utc})`,
  ].join('\n');
  return { subject, text };
}

/** Entrega el mensaje con la API de correo de Cloudflare (proveedor de main). */
async function deliver(fields: ContactFields, env: Required<ContactEnv>): Promise<boolean> {
  const { subject, text } = buildEmail(fields, new Date());
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CF_EMAIL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER,
        to: env.CONTACTO_DESTINO,
        reply_to: fields.correo,
        subject,
        text,
      }),
    });
    // La API responde 200 con success:false ante errores de validación: se miran los dos.
    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
    if (response.ok && result?.success === true) return true;
    log('email_rejected', `status=${response.status}`);
    return false;
  } catch {
    log('email_unreachable');
    return false;
  }
}

const missingSecrets = (env: ContactEnv) =>
  (['CF_ACCOUNT_ID', 'CF_EMAIL_TOKEN', 'TURNSTILE_SECRET_KEY', 'CONTACTO_DESTINO'] as const).filter(
    (name) => !env[name],
  );

/** Idioma de los errores previos a leer el cuerpo: el de la página que envía, si se conoce. */
const langFromReferer = (request: Request): Lang =>
  /\/en\//.test(request.headers.get('Referer') ?? '') ? 'en' : 'es';

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  let lang = langFromReferer(request);

  if (request.method !== 'POST') return fail(lang, 'method', 405, { Allow: 'POST' });

  // Solo se acepta el envío desde el propio sitio (el navegador manda Origin en un POST).
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return fail(lang, 'origin', 403);

  if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) {
    return fail(lang, 'badRequest', 415);
  }
  const declared = Number(request.headers.get('Content-Length') ?? 0);
  if (declared > MAX_BODY_BYTES) return fail(lang, 'tooLong', 413);

  let input: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) return fail(lang, 'tooLong', 413);
    input = JSON.parse(body);
  } catch {
    return fail(lang, 'badRequest', 400);
  }
  if (input && typeof input === 'object' && (input as { idioma?: unknown }).idioma === 'en') {
    lang = 'en';
  }

  const result = validate(input);
  if (!result.ok) {
    if (result.key === 'consent' || result.key === 'policy') log(`rejected_${result.key}`);
    return fail(lang, result.key, result.key === 'human' ? 403 : 400);
  }
  const { fields } = result;

  const missing = missingSecrets(env);
  if (missing.length > 0) {
    log('config_missing', missing.join(','));
    return fail(lang, 'delivery', 500);
  }
  const config = env as Required<ContactEnv>;

  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await isHuman(fields.turnstileToken, ip, config.TURNSTILE_SECRET_KEY))) {
    return fail(lang, 'human', 403);
  }

  if (!(await deliver(fields, config))) return fail(lang, 'delivery', 502);

  return json({ ok: true });
}
