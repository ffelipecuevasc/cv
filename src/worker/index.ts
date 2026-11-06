/*
 * Entrada del Worker `felipecuevas-dev` (E140-I02, ADR-084; E140-I03, ADR-085).
 * `assets.run_worker_first` manda siempre `/api/*` aquí. Además, Cloudflare entrega al Worker toda
 * URL que no existe en dist/ (AT-102): esas se devuelven a los assets con `env.ASSETS.fetch` para que
 * se aplique `not_found_handling: "404-page"`. El 404 JSON queda solo para `/api/*`.
 * No se usa la carpeta functions/ de Pages (AT-029).
 */
import { handleContact, json, type ContactEnv } from './contact.ts';

/** Binding de assets estáticos (`assets.binding: "ASSETS"` en wrangler.jsonc). */
export interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

export interface WorkerEnv extends ContactEnv {
  ASSETS: AssetsBinding;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contacto' || pathname === '/api/contacto/') {
      return handleContact(request, env);
    }
    if (pathname === '/api' || pathname.startsWith('/api/')) {
      return json({ ok: false, error: 'Not found' }, 404);
    }
    return env.ASSETS.fetch(request);
  },
};
