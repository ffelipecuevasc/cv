/*
 * Datos compartidos de la página Docente (E80-I01, ADR-070). Las cifras «+10 años» y «+2.000»
 * salen de src/content/home/stats.json (ADR-053) y el periodo y la modalidad de la cabecera, del
 * perfil «lecturer» de Experiencia (AT-081): ninguno se escribe dos veces.
 */
import { getEntry } from 'astro:content';
import type { StatId } from '../../content.config';

export async function getLecturerPage() {
  const page = (await getEntry('lecturerPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/lecturer/page.json');
  return page;
}

export async function getStat(id: StatId) {
  const stats = (await getEntry('homeStats', 'stats'))?.data;
  const item = stats?.items.find((i) => i.kind === 'number' && i.id === id);
  if (!item || item.kind !== 'number') throw new Error(`Falta la cifra «${id}» en stats.json`);
  return { value: item.value, plus: item.plus };
}

export async function getLecturerProfile() {
  const experience = (await getEntry('experiencePage', 'page'))?.data;
  const profile = experience?.profiles.find((p) => p.id === 'lecturer');
  if (!profile) throw new Error('Falta el perfil «lecturer» en src/content/experience/page.json');
  return profile;
}
