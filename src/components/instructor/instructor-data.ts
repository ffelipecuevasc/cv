/*
 * Datos de la página Instructor (E90-I01, ADR-072). Las cifras «+3 años» y «+150 módulos»
 * salen de src/content/home/stats.json por id (ADR-053): no se escriben aquí.
 */
import { getEntry } from 'astro:content';

export { getStat } from '../../data/stats';

export async function getInstructorPage() {
  const page = (await getEntry('instructorPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/instructor/page.json');
  return page;
}

/** URL pública del certificado: la misma de main (AT-043). */
export const REUF_CERTIFICATE_URL = '/static/Certificado_REUF_Aprobados_Felipe_Cuevas_2026.pdf';
