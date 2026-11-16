/*
 * Datos de la página Contacto (E140-I01, ADR-083): textos en src/content/contact/page.json y
 * configuración pública en src/data/contact.ts.
 */
import { getEntry } from 'astro:content';

export { CONTACT, TURNSTILE_LANG } from '../../data/contact';

export async function getContactPage() {
  const page = (await getEntry('contactPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/contact/page.json');
  return page;
}
