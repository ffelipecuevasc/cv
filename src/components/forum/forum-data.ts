/*
 * Datos de la página Foro (E120-I01, ADR-078): textos en src/content/forum/page.json y
 * configuración pública de Giscus en src/data/giscus.ts.
 */
import { getEntry } from 'astro:content';

export { GISCUS, GISCUS_LANG } from '../../data/giscus';

export async function getForumPage() {
  const page = (await getEntry('forumPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/forum/page.json');
  return page;
}
