/*
 * Datos de la página Recursos (E130-I01, ADR-079). Los recursos viven en
 * src/content/resources/items.json con el id numérico de main; la ruta, en page.json, solo guarda
 * el orden de sus pasos. Si un paso no existe o no tiene etapa, `pnpm build` falla.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Resource = CollectionEntry<'resources'>['data'] & { id: number };

export async function getResourcesPage() {
  const page = (await getEntry('resourcesPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/resources/page.json');
  return page;
}

export async function getResources(): Promise<Resource[]> {
  const entries = await getCollection('resources');
  return entries.map((entry) => ({ ...entry.data, id: Number(entry.id) }));
}

/** Pasos de la ruta agrupados por etapa, en el orden de `steps` (numeración de corrido). */
export async function getRouteStages() {
  const { route } = await getResourcesPage();
  const byId = new Map((await getResources()).map((r) => [r.id, r]));
  const steps = route.steps.map((id, index) => {
    const resource = byId.get(id);
    if (!resource) throw new Error(`El paso ${id} de la ruta no existe en items.json`);
    if (!resource.stage) throw new Error(`El paso ${id} de la ruta no tiene etapa`);
    return { ...resource, number: index + 1 };
  });
  const stages = route.stages.map((stage, index) => ({
    ...stage,
    number: index,
    steps: steps.filter((step) => step.stage === stage.id),
  }));
  // Cada etapa es un bloque seguido y ninguna queda vacía.
  const order = steps.map((step) => step.stage);
  const blocks = order.filter((stage, i) => i === 0 || stage !== order[i - 1]);
  if (blocks.length !== stages.length || stages.some((s) => s.steps.length === 0)) {
    throw new Error('Cada etapa de la ruta debe tener sus pasos seguidos y al menos uno');
  }
  return { route, stages, total: steps.length };
}

/** Un archivo local se descarga; el resto abre en otra pestaña. */
export const isLocal = (url: string) => url.startsWith('/static/');

export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
