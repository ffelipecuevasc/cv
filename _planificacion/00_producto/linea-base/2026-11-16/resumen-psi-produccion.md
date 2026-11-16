# Línea base de producción · 16-11-2026

- **Fuente:** PageSpeed Insights (laboratorio) sobre `https://felipecuevas.dev`, con `node scripts/psi.mjs --base https://felipecuevas.dev --category performance --only /es/,/en/`.
- **Método:** una corrida por página y estrategia. Sitio Astro tras el cutover (ADR-104). Solo las dos portadas; no se midieron las 26 URL.

| Página | Estrategia | Puntaje | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|
| `/es/` | móvil | 99 | 1,68 s | 0 | 0 ms | 211 KB |
| `/es/` | escritorio | 100 | 0,47 s | 0,0004 | 0 ms | 203 KB |
| `/en/` | móvil | 99 | 1,68 s | 0 | 0 ms | 211 KB |
| `/en/` | escritorio | 100 | 0,47 s | 0,0004 | 0 ms | 203 KB |

## Notas
- Frente a E190-I03 (preview, 15-11-2026: `/es/` 100 y 100, `/en/` 98 y 100): ±1 punto, dentro del ruido de una corrida.
- Frente a ADR-015: LCP ≤ 2,5 s y CLS ≤ 0,1. INP no se mide en laboratorio. Sin datos de campo (BL-01).
- Las dos portadas dieron métricas idénticas; no se repitió la corrida.
- Detalle y contexto: `_planificacion/190_epica-cutover/E190-I04-verificacion-post-cutover.md`.
