/*
 * Sitemap bilingüe generado en el build (E180-I02, ADR-094).
 * - Se arma solo con `routes` (las 11 páginas indexables × 2 idiomas = 22 URL). Lo que vive en
 *   `internalRoutes` (404, agradecimiento, muestra de tokens) queda fuera sin lista aparte (AT-106).
 * - Cada <url> lleva alternativas es-CL y en-US, incluida ella misma, así que son recíprocas.
 * - Sin `lastmod`, `changefreq` ni `priority`: son opcionales y no hay una fecha de modificación real
 *   por página. Sin `x-default` ni la raíz `/`: son de E180-I03.
 */
import type { APIRoute } from 'astro';
import { langCodes, langs } from '../i18n/lang';
import { routes } from '../i18n/routes';

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('astro.config.mjs necesita `site` para generar el sitemap');
  const abs = (path: string) => escapeXml(new URL(path, site).href);

  const entries = Object.values(routes).flatMap((paths) =>
    langs.map((lang) => {
      const alternates = langs
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${langCodes[alt]}" href="${abs(paths[alt])}"/>`,
        )
        .join('\n');
      return `  <url>\n    <loc>${abs(paths[lang])}</loc>\n${alternates}\n  </url>`;
    }),
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
