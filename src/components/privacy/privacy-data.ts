/*
 * Datos de la página de privacidad (E155-I01, ADR-087): textos en src/content/privacy/page.json y
 * versión en la constante única src/data/privacy-policy.ts (no se duplica).
 */
import { getEntry } from 'astro:content';
import { PRIVACY_POLICY_VERSION } from '../../data/privacy-policy';
import { langCodes, type Lang } from '../../i18n/lang';

export { PRIVACY_POLICY_VERSION };

export async function getPrivacyPage() {
  const page = (await getEntry('privacyPage', 'page'))?.data;
  if (!page) throw new Error('Falta src/content/privacy/page.json');
  return page;
}

/** Fecha de la versión (AAAA-MM-DD) en formato largo del idioma: «7 de noviembre de 2026». */
export const formatPolicyDate = (lang: Lang): string =>
  new Intl.DateTimeFormat(langCodes[lang], {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${PRIVACY_POLICY_VERSION}T00:00:00Z`));
