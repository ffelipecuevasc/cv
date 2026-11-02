/*
 * Lectura de cifras por id desde src/content/home/stats.json (ADR-053, ADR-070 y ADR-072).
 * Busca primero en `items` (las 5 cifras de la banda de Inicio) y luego en `facts` (cifras que
 * la banda no pinta, como los bootcamps de Educación). Así ninguna cifra se escribe dos veces.
 */
import { getEntry } from 'astro:content';
import type { StatId } from '../content.config';

export async function getStat(id: StatId) {
  const stats = (await getEntry('homeStats', 'stats'))?.data;
  const item = stats?.items.find((i) => i.kind === 'number' && i.id === id);
  if (item && item.kind === 'number') return { value: item.value, plus: item.plus };
  const fact = stats?.facts.find((f) => f.id === id);
  if (fact) return { value: fact.value, plus: fact.plus };
  throw new Error(`Falta la cifra «${id}» en stats.json`);
}
