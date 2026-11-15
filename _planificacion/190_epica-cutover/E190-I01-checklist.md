# E190-I01 · Checklist de precondiciones y ensayo en preview

- **Creado:** 15-11-2026 (Fase 1, agente) · **Preview:** `https://felipecuevas-dev.felipe-cuevas.workers.dev` · **Producción** (Pages `felipe-cuevas-cv`, desde `main`): no se toca.
- Estados: [ ] Pendiente · [x] Hecho · [!] Con observación. Los resultados manuales se anotan con su fecha y la marca «dicho por el desarrollador»; el agente no los repite ni los inventa.

## A. Hecho por el agente en la Fase 1 (verificado en local el 15-11-2026)
| Ítem | Responsable | Evidencia | Estado |
|---|---|---|---|
| Puerta: rama `migracion-astro`, E170-I04 y E180-I03 terminadas | Agente | `git branch`, `registro-log.md` | [x] |
| ADR-099 (política vigente, validación a BL-08) | Agente | `decisiones.md` | [x] |
| BL-02: Node 26 no está en Workers Builds → ADR-100 (Node 24 hasta después del cutover) | Agente | Página oficial de la build image, 29-10-2026: 22.23.4 y 24.22.1 | [x] |
| AT-126: `public/static/img/felipe_cuevas_cv.png` | Agente | SHA-256 idéntico a `main`; en la preview, `/static/img/felipe_cuevas_cv.png` responde 200 `image/png` (Fase 2, 15-11-2026) | [x] |
| AT-136: `public/robots.txt` en ASCII | Agente | 0 bytes fuera de ASCII también en la preview; las reglas intactas. La preview sigue sirviendo `Content-Type: text/plain` sin `charset` (no afecta: es ASCII) | [x] |
| AT-085: texto del proyecto `cv` | Agente | `page.json`; en la preview, `/es/desarrollador/` y `/en/developer/` muestran «Astro, Tailwind CSS y TypeScript» / «Astro, Tailwind CSS and TypeScript», `programmingLanguage` TypeScript, 0 «AOS»; el único «Cloudflare Pages» es de otro proyecto | [x] |
| AT-109 aceptado, AT-048 decisión 2, AT-123 como ítem manual | Agente | `auditoria-tecnica.md` | [x] |
| Revisión de `main` | Agente | `git log main --not HEAD --oneline` vacío; `git diff --stat HEAD...main` vacío | [x] sin commits nuevos que portar |
| `pnpm build`, `check`, `lint`, `verify`, `check:i18n`, `verify:seo`, `check:redirects` | Agente | build ok; check 0/0/0; lint ok; verify sin roturas; i18n 354; seo 1194/1194; redirects 331/331 (25 reglas) | [x] |

## B. Pendiente de Felipe (manual)
| Ítem | Responsable | Evidencia (se anota al cumplirse) | Estado |
|---|---|---|---|
| AT-085: confirmar etiquetas y lenguaje del proyecto `cv` | Sin informar por Felipe en esta fase | [ ] |
| Confirmar los secretos del Worker en Cloudflare, solo nombres: `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `TURNSTILE_SECRET_KEY`, `CONTACTO_DESTINO` | Captura del panel, verificada por el Tech Lead (15-11-2026): los 4 nombres presentes en Production, valores cifrados | [x] |
| AT-123: revisar Observability (excepciones y 4xx de la versión `2f39c966` y de la actual), reproducir con el formulario y anotar el origen; si no se resuelve, decidir si bloquea el cutover | PDF de Metrics, 7 días, 15-11-2026 17:38, verificado por el Tech Lead: versiones `d1fc8452` y `980c6939` (activa) con 0 errores y 0 excepciones no capturadas; `2f39c966` no aparece y Observability está desactivada. **Origen no determinado: se cierra como «no reproducible», no «resuelta».** Decidir si se activa Observability pasa a E190-I02 | [x] |
| BL-06: confirmar el consentimiento de uso de nombres y fotos de los 12 testimonios, o decidir qué se retira | Dicho por Felipe (15-11-2026): los 12 testimonios son recomendaciones públicas de su LinkedIn y ya estaban en `main`. Riesgo aceptado por Felipe; cierra BL-06 y AT-025 | [x] |
| Ensayo en la preview: navegación, selector de idioma, tema claro y oscuro, Foro (Giscus), 15 descargas de Recursos, redirecciones antiguas, 404 por idioma | Dicho por Felipe (15-11-2026): correcto | [x] |
| Formulario real: rechazo sin checkbox con error accesible; envío con checkbox y correo con fecha, hora y versión de la política (ADR-035) | Rechazo sin checkbox con error accesible (dicho por Felipe, 15-11-2026). Correo recibido (captura verificada por el Tech Lead): consentimiento «sí», versión `2026-11-07`, 15-11-2026 17:03:41 CLST | [x] |
| Confirmar que `AGENTS.md` quedó corregido (sin «P-01 pendiente» ni «desde AT-044») | Felipe | Verificado por el Tech Lead (15-11-2026) | [x] |
| **Ley 21.719: reconfirmar el estado en fuentes oficiales antes del cutover.** El agente no pudo hacerlo (ver bitácora): senado.cl y camara.cl dieron 403, bcn.cl no cargó y el Diario Oficial del 15-11-2026 no trae publicaciones | Pendiente. Referencia del 15-11-2026, sin fuente oficial: Senado aprobó la postergación el 28-10-2026; la Comisión de Constitución de la Cámara la aprobó en general el 05-11-2026 y pasó a Hacienda; Diario Constitucional (opinión, 09-11-2026): «no es aún ley», rige el 01-12-2026 mientras no se publique. Ver complemento de ADR-099 | [ ] |
| Commit y push, esperar el despliegue de la preview y avisar al agente (Fase 2) | Commit `f79e164` (15-11-2026 16:59 -03:00); preview desplegada | [x] |

## C. Fase 2 (agente, con la preview desplegada)
| Ítem | Responsable | Evidencia | Estado |
|---|---|---|---|
| `pnpm check:redirects --base https://felipecuevas-dev.felipe-cuevas.workers.dev` sin fallos | 483 de 483 comprobaciones correctas (25 reglas; `/eventos` y `/eventos.html` en 404; 24 archivos de `/static/` en 200); informe sin regla: `/static/img/felipe_cuevas_cv.png` 200 y `/educacion/` 404 (AT-127) | [x] |
| `curl -I`: `/robots.txt` (sin tildes rotas), `/static/img/felipe_cuevas_cv.png` (200, `image/png`), `/es/`, `/en/`, `/x` (404 por idioma) y `X-Robots-Tag` de workers.dev (registrar en AT-048) | 15-11-2026: `/robots.txt` 200 `text/plain`, 0 bytes fuera de ASCII; imagen 200 `image/png`; `/es/` 200; `/en/` 200; `/x` 404 `text/html`; **sin `X-Robots-Tag`** en `/es/` (registrado en AT-048) | [x] |
| Contrastar en la preview el texto nuevo de AT-085 | Ver AT-085 arriba: es y en con el texto nuevo | [x] |
| Anotar aquí los resultados manuales de Felipe | Registrados en la sección B con su origen. Además, POST a `/api/contacto` con datos ficticios y `consentimiento: false`: **400** `{"ok":false,"error":"Para enviar el mensaje debes aceptar la política de privacidad."}`, sin llegar a Turnstile ni al correo (la validación va primero en `contact.ts`) | [x] |

## D. Firma de Felipe
Fase 2 ejecutada el 15-11-2026 (agente). La iteración queda `[~] En curso` hasta que Felipe firme explícitamente. Quedan abiertos solo: confirmar etiquetas y lenguaje de AT-085, la reconfirmación de la Ley 21.719 antes del cutover y la firma.

- Firma: ______________________ · Fecha: ____-__-____ · Observaciones:
