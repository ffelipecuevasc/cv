/*
 * Entrada del Worker `felipecuevas-dev` (E140-I02, ADR-084). Con `assets.run_worker_first` limitado
 * a `/api/*`, este código solo recibe esas rutas; el resto del sitio lo sirven los assets estáticos
 * de dist/ sin pasar por aquí. No se usa la carpeta functions/ de Pages (AT-029).
 */
import { handleContact, json, type ContactEnv } from './contact.ts';

export default {
  async fetch(request: Request, env: ContactEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contacto' || pathname === '/api/contacto/') {
      return handleContact(request, env);
    }
    return json({ ok: false, error: 'Not found' }, 404);
  },
};
