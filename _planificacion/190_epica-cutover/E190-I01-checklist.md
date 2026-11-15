# E190-I01 · Checklist de precondiciones y ensayo en preview

- **Creado:** 15-11-2026 (Fase 1, agente) · **Preview:** `https://felipecuevas-dev.felipe-cuevas.workers.dev` · **Producción** (Pages `felipe-cuevas-cv`, desde `main`): no se toca.
- Estados: [ ] Pendiente · [x] Hecho · [!] Con observación. Los resultados manuales se anotan con su fecha y la marca «dicho por el desarrollador»; el agente no los repite ni los inventa.

## A. Hecho por el agente en la Fase 1 (verificado en local el 15-11-2026)
| Ítem | Responsable | Evidencia | Estado |
|---|---|---|---|
| Puerta: rama `migracion-astro`, E170-I04 y E180-I03 terminadas | Agente | `git branch`, `registro-log.md` | [x] |
| ADR-099 (política vigente, validación a BL-08) | Agente | `decisiones.md` | [x] |
| BL-02: Node 26 no está en Workers Builds → ADR-100 (Node 24 hasta después del cutover) | Agente | Página oficial de la build image, 29-10-2026: 22.23.4 y 24.22.1 | [x] |
| AT-126: `public/static/img/felipe_cuevas_cv.png` | Agente | SHA-256 idéntico a `main` (`54016ca2…07c81`); `dist/static/img/` lo contiene | [x] local; [ ] 200 `image/png` en la preview (Fase 2) |
| AT-136: `public/robots.txt` en ASCII | Agente | 0 bytes fuera de ASCII; reglas intactas | [x] local; [ ] comprobar en la preview (Fase 2) |
| AT-085: texto del proyecto `cv` | Agente | `page.json`; `dist/` es/en con «Astro, Tailwind CSS y TypeScript»; sin AOS; el único «Cloudflare Pages» de la página es de otro proyecto | [x] local; [ ] contrastar en la preview (Fase 2) |
| AT-109 aceptado, AT-048 decisión 2, AT-123 como ítem manual | Agente | `auditoria-tecnica.md` | [x] |
| Revisión de `main` | Agente | `git log main --not HEAD --oneline` vacío; `git diff --stat HEAD...main` vacío | [x] sin commits nuevos que portar |
| `pnpm build`, `check`, `lint`, `verify`, `check:i18n`, `verify:seo`, `check:redirects` | Agente | build ok; check 0/0/0; lint ok; verify sin roturas; i18n 354; seo 1194/1194; redirects 331/331 (25 reglas) | [x] |

## B. Pendiente de Felipe (manual)
| Ítem | Responsable | Evidencia (se anota al cumplirse) | Estado |
|---|---|---|---|
| AT-085: confirmar etiquetas y lenguaje del proyecto `cv` | Felipe | | [ ] |
| Confirmar los secretos del Worker en Cloudflare, solo nombres: `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY`, `CONTACTO_DESTINO` | Felipe | | [ ] |
| AT-123: revisar Observability (excepciones y 4xx de la versión `2f39c966` y de la actual), reproducir con el formulario y anotar el origen; si no se resuelve, decidir si bloquea el cutover | Felipe | | [ ] |
| BL-06: confirmar el consentimiento de uso de nombres y fotos de los 12 testimonios, o decidir qué se retira | Felipe | | [ ] |
| Ensayo en la preview: navegación, selector de idioma, tema claro y oscuro, Foro (Giscus), 15 descargas de Recursos, redirecciones antiguas, 404 por idioma | Felipe | | [ ] |
| Formulario real: rechazo sin checkbox con error accesible; envío con checkbox y correo con fecha, hora y versión de la política (ADR-035) | Felipe | | [ ] |
| Confirmar que `AGENTS.md` quedó corregido (sin «P-01 pendiente» ni «desde AT-044») | Felipe | Verificado por el Tech Lead el 15-11-2026 | [ ] |
| **Ley 21.719: reconfirmar el estado en fuentes oficiales antes del cutover.** El agente no pudo hacerlo (ver bitácora): senado.cl y camara.cl dieron 403, bcn.cl no cargó y el Diario Oficial del 15-11-2026 no trae publicaciones | Felipe | | [ ] |
| Commit y push, esperar el despliegue de la preview y avisar al agente (Fase 2) | Felipe | | [ ] |

## C. Fase 2 (agente, con la preview desplegada)
| Ítem | Responsable | Evidencia | Estado |
|---|---|---|---|
| `pnpm check:redirects --base https://felipecuevas-dev.felipe-cuevas.workers.dev` sin fallos | Agente | | [ ] |
| `curl -I`: `/robots.txt` (sin tildes rotas), `/static/img/felipe_cuevas_cv.png` (200, `image/png`), `/es/`, `/en/`, `/x` (404 por idioma) y `X-Robots-Tag` de workers.dev (registrar en AT-048) | Agente | | [ ] |
| Contrastar en la preview el texto nuevo de AT-085 | Agente | | [ ] |
| Anotar aquí los resultados manuales de Felipe | Agente | | [ ] |

## D. Firma de Felipe
La iteración queda `[~] En curso` hasta que Felipe firme. Con su firma, el agente cierra la Fase 2.

- Firma: ______________________ · Fecha: ____-__-____ · Observaciones:
