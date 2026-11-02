/*
 * Datos de la página Talento Digital (E100-I01, ADR-074). «2.000 horas» sale de
 * src/content/home/stats.json por id (`class-hours`, ADR-053) y las horas de cada bootcamp, de
 * src/data/training-plans.ts, la misma fuente que leen los planes SENCE de Instructor.
 */
import { getEntry } from 'astro:content';

export { getStat } from '../../data/stats';
export { TRAINING_PLAN_HOURS } from '../../data/training-plans';

export async function getTalentoDigitalPage() {
  const page = (await getEntry('talentoDigitalPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/talento-digital/page.json');
  return page;
}

/** Nombre de una entrada de Educación (la insignia del diploma, DESIGN.md 11.4). */
export async function getEducationTitle(id: string) {
  const entry = (await getEntry('educationEntries', id))?.data;
  if (!entry) throw new Error(`Falta la entrada de Educación «${id}»`);
  return entry.title;
}
