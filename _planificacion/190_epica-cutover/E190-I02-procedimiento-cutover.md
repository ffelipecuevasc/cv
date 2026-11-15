# E190-I02 · Procedimiento de cutover y de reversa

- **Versión:** borrador del 15-11-2026 (agente), pendiente de la lectura conjunta con Felipe. **Ejecuta todo Felipe**; el agente no toca Cloudflare ni hace el merge (ADR-012, ADR-033).
- **Decisiones que lo fijan:** ADR-037 (plan base), ADR-099 (política vigente), ADR-101 (decisiones de Felipe del 15-11-2026: orden, workers.dev, HSTS, Analytics y Observability).
- Los tiempos son **estimaciones, no medidas**. Las marcas «(no verificado)» indican lo que la documentación oficial leída no confirma; se comprueban en el panel durante el procedimiento.

## 1. Fuentes oficiales leídas (15-11-2026, `developers.cloudflare.com`)
| Tema | Página (última actualización) | Qué se tomó |
|---|---|---|
| Custom Domains | `/workers/configuration/routing/custom-domains/` (12-11-2026) | Exige zona activa; «You cannot create a Custom Domain on a hostname with an existing CNAME DNS record»; crea el registro DNS y un Advanced Certificate; al quitar el dominio el certificado **no** se borra solo; no cubre `www` por sí solo. No documenta los pasos para quitar un Custom Domain |
| `www` → apex | `/rules/url-forwarding/examples/redirect-www-to-root/` (05-05-2026) | Registro A proxied `www` → `192.0.2.0` (o AAAA `100::`) y regla de redirección `https://www.*` → `https://${1}`, 301, conservando la query |
| Rollback de Workers | `/workers/configuration/versions-and-deployments/` y `.../rollbacks/` (12-11-2026) | Dashboard: Worker > Deployments > Rollback; también `wrangler rollback` (sintaxis no leída). Revierte código, assets, bindings y configuración; no revierte KV/R2/D1; solo las últimas 100 versiones |
| Workers Builds, rama | `/workers/ci-cd/builds/build-branches/` (08-11-2026) | Settings > Build > Branch control; cada push a esa rama dispara un build de producción; «Enable Preview Builds». La página de configuración dice que el valor por defecto es `main` y la de ramas dice que es la rama por defecto del repo: discrepancia, se mira en el panel |
| Pages, builds | `/pages/configuration/git-integration/` (15-10-2026) y `.../branch-build-controls/` (21-04-2026) | Cada push a la rama de producción despliega. Para pararlo: Build > Branch control > desactivar «Enable automatic production branch deployments» |
| Pages, rollback y dominios | `/pages/configuration/rollbacks/` (21-04-2026) y `.../custom-domains/` (11-11-2026) | Rollback: Deployments > menú del deployment > «Rollback to this deployment». Quitar dominio: borrar antes el CNAME y luego «Remove domain». Asociar: Custom domains > «Set up a domain»; un CNAME manual sin asociar da error 522 |
| HSTS | `/ssl/edge-certificates/additional-options/http-strict-transport-security/` (15-10-2026) | max-age de 1 a 12 meses; `includeSubDomains` deja inaccesibles los subdominios sin HTTPS; preload exige 12 meses; hay que mantener HTTPS activo |
| workers.dev | `/workers/configuration/routing/workers-dev/` (06-11-2026) | `"workers_dev": false` y redeploy; si se apaga solo en el panel, el siguiente `wrangler deploy` lo reactiva; no hay forma documentada de poner `noindex` |

## 2. Riesgos declarados (no verificados)
1. **Qué hace Pages con el código nuevo de `main` (AT-138).** La documentación dice que despliega cada push a la rama de producción, pero no describe el merge ni qué haría con este repositorio. Se evita con el paso 2 (pausar Pages antes del merge).
2. **Transición de dominio (AT-139).** La documentación no describe cómo quitar un Custom Domain de Workers ni si un dominio puede estar a la vez en Pages y en un Worker. El procedimiento lo quita primero de Pages y borra el CNAME; hay un hueco de minutos con el dominio sin servir.
3. **Hostname de Turnstile (AT-140).** El widget debe autorizar `felipecuevas.dev` (y `www`, si corresponde) además de workers.dev. No se verificó.
4. **Cambio de rama de Workers Builds.** No se sabe si cambiar la rama dispara un build por sí solo (no verificado): el paso 4 prevé un `Retry`/commit si no lo hace.
5. **DNS actual del apex y de `www`** (CNAME a Pages, MX/TXT de Email Routing): no se leyó; se exporta en el paso 1. Email Routing no se toca (ADR-037); crear el Custom Domain no debería afectar a los MX (no verificado).

## 3. Precondiciones (todas deben estar cumplidas)
| # | Precondición | Responsable | Comprobación |
|---|---|---|---|
| P1 | E190-I01 firmada (hecho, 15-11-2026) | Felipe | Checklist, sección D |
| P2 | **Ley 21.719 reconfirmada en fuente oficial** (Diario Oficial, BCN, camara.cl, senado.cl), con fuente y fecha anotadas en el checklist de I02 (traspasada de I01, ADR-099) | Felipe | Anotación con URL y fecha |
| P3 | Secretos del Worker presentes en Production (hecho, 15-11-2026) | Felipe | Captura del panel |
| P4 | Turnstile autoriza `felipecuevas.dev` (y `www` si hace falta) en la lista de hostnames del widget (AT-140) | Felipe | Captura del panel |
| P5 | E190-I03 terminada (README final y retiro de archivos antiguos en la rama, listo para el merge) y E190-I02 confirmada | Felipe y agente | `registro-log.md` |
| P6 | Rama `migracion-astro` en verde: `pnpm build`, `check`, `lint`, `verify`, `check:i18n`, `verify:seo` y `check:redirects` | Agente | Salida de los comandos |
| P7 | Preview con las comprobaciones de I01 ya hechas (hecho, 15-11-2026) | Agente | `E190-I01-checklist.md` |

## 4. Ventana recomendada
- Un **sábado o domingo temprano en la mañana (hora de Chile)**, con unas 2 horas libres y sin otros cambios en curso. Para separar variables, **no el mismo día del cambio de vigencia de la ley** (01-12-2026).
- El hueco sin servicio, entre los pasos 5 y 6, se estima en **minutos (no medido)**. Con la reversa lista, el procedimiento completo se estima en **30 a 60 minutos**.
- No iniciar con un incidente abierto en Cloudflare ni con builds en curso.

## 5. Pasos (Felipe ejecuta; «Agente» solo comprueba y registra)
| Paso | Qué se hace | Resp. | Tiempo | Comprobación | Reversa |
|---|---|---|---|---|---|
| 1 | **Congelar y anotar el punto de reversa:** sin commits en `main` ni `migracion-astro`; anotar el ID y la fecha del último deployment de producción de Pages, el ID de la versión activa del Worker y exportar los registros DNS de la zona (apex, `www`, MX, TXT) | Felipe | 10 min | Los tres datos anotados en el checklist | — |
| 2 | **Pausar Pages:** proyecto `felipe-cuevas-cv` > Build > Branch control > desactivar «Enable automatic production branch deployments» (las previews ya están en «None») y guardar | Felipe | 3 min | Opción guardada; `felipecuevas.dev` sigue respondiendo el sitio antiguo | Reactivar la opción |
| 3 | **Merge** de `migracion-astro` a `main` (lo hace Felipe, ADR-012) | Felipe | 5 min | La lista de Deployments de Pages **no** crea un deployment nuevo; el sitio antiguo sigue en producción | El sitio en producción no cambia (Pages pausado); si hubiera que deshacer el merge, `git revert -m 1` del commit de merge, hecho por Felipe |
| 4 | **Workers Builds:** Worker `felipecuevas-dev` > Settings > Build > Branch control > rama de producción `main` (previews siguen desactivados); si no se dispara un build solo, «Retry build» o un commit mínimo | Felipe | 10 min | Build verde; versión activa nueva; `https://felipecuevas-dev.felipe-cuevas.workers.dev/es/` 200; **Agente:** `pnpm check:redirects --base <workers.dev>` sin fallos | Devolver la rama a `migracion-astro` y revertir el Worker a la versión anotada en el paso 1 (Deployments > Rollback) |
| 5 | **Liberar el dominio** (inicio del hueco): DNS > borrar el CNAME del apex; Pages > Custom domains > quitar `felipecuevas.dev` («Remove domain») | Felipe | 3 min | El apex deja de resolver al sitio antiguo | Pages > Custom domains > «Set up a domain» > `felipecuevas.dev` (Pages recrea el CNAME). No crear el CNAME a mano antes de asociarlo (error 522) |
| 6 | **Custom Domain al Worker:** `felipecuevas-dev` > Settings > Domains & Routes > Add > Custom Domain > `felipecuevas.dev` (fin del hueco). Cloudflare crea el registro DNS y el certificado | Felipe | 5 a 15 min | `curl -I https://felipecuevas.dev/` → 301 a `/es/`; `/es/` 200; certificado válido; **Agente:** `pnpm check:redirects --base https://felipecuevas.dev` | Quitar el Custom Domain del Worker y aplicar la reversa del paso 5. Luego, borrar el Advanced Certificate que quedó (SSL/TLS > Edge Certificates; no se borra solo) |
| 7 | **`www`:** si existe un CNAME de `www`, reemplazarlo por un registro **A proxied** `www` → `192.0.2.0` (o AAAA `100::`); regla de redirección: `https://www.*` → `https://${1}`, 301, conservando la query | Felipe | 10 min | `curl -I https://www.felipecuevas.dev/es/` → 301 a `https://felipecuevas.dev/es/` | Borrar la regla y el registro y restaurar el `www` exportado en el paso 1 |
| 8 | **Verificación inmediata:** `/es/`, `/en/`, `/x` (404), `/sitemap.xml` → 301, `/robots.txt`, `/static/img/felipe_cuevas_cv.png`, 5 redirecciones antiguas; formulario real (rechazo sin checkbox y envío con checkbox; correo con fecha, hora y versión de la política) | Felipe y agente | 15 min | Todo en verde | Ver sección 6 |
| 9 | **A las ~48 h con el sitio estable:** (a) HSTS en la zona con max-age de 1 mes, sin `includeSubDomains`, sin preload y sin no-sniff (SSL/TLS > Edge Certificates > HTTP Strict Transport Security); (b) apagar workers.dev con el bloque de la sección 7 (commit de Felipe) | Felipe | 15 min | Cabecera `Strict-Transport-Security` en `https://felipecuevas.dev/`; workers.dev deja de responder | (a) Max-age 0 (los navegadores que ya la vieron la respetan hasta que venza, **mientras HTTPS siga activo**); (b) `"workers_dev": true` y redeploy |
| 10 | **No hacer todavía:** borrar el proyecto Pages ni sus deployments; subir HSTS a 6 meses (tras 2 semanas sin incidentes); quitar el hostname de workers.dev de Turnstile (AT-100) y enviar el sitemap a Search Console (AT-131), que son de E190-I04 | Felipe | — | — | — |

## 6. Reversa (sirve sin el agente)
**Criterios para revertir** (cualquiera): `/es/` o `/en/` con 5xx o certificado inválido pasados 10 minutos; el formulario falla en un envío real; el hueco del dominio supera los 30 minutos; Felipe lo decide por cualquier otro motivo.

**Pasos, en este orden** (solo con el panel de Cloudflare; ~10 a 15 min, estimado):
1. Worker `felipecuevas-dev` > Settings > Domains & Routes: **quitar el Custom Domain** `felipecuevas.dev`.
2. Pages `felipe-cuevas-cv` > Custom domains > «Set up a domain» > `felipecuevas.dev`. Pages recrea el CNAME.
3. Pages > Deployments: si el sitio antiguo no responde, «Rollback to this deployment» sobre el deployment anotado en el paso 1.
4. Restaurar `www` como estaba en la exportación del paso 1 y borrar la regla de redirección de `www` y el registro `192.0.2.0`.
5. Comprobar `https://felipecuevas.dev/` con el sitio antiguo (enlaces, formulario).
6. Si se activó HSTS: dejar max-age en 0 y **mantener HTTPS activo** (la documentación advierte que, sin HTTPS, el sitio queda inaccesible durante el max-age).
7. Dejar **desactivado** el despliegue automático de Pages hasta entender qué falló. No hacer `git push` a `main` mientras Pages esté activo sin revisar.
8. Si el problema fue solo del Worker (dominio sano): Worker > Deployments > «Rollback» a la versión anotada en el paso 1 (el rollback crea un nuevo deployment al 100 %).

## 7. Bloques para Felipe (el agente no edita estos archivos)
- **`wrangler.jsonc` (paso 9b, ADR-101):** cambiar solo la línea `"workers_dev": true,` por:
```jsonc
  "workers_dev": false,
```
  Efecto: apaga `felipecuevas-dev.felipe-cuevas.workers.dev` en el siguiente deploy (si se apaga solo en el panel, el siguiente `wrangler deploy` lo reactiva). Reversa: volver a `true`. **No se agrega `observability`** (decisión de Felipe).
- **`public/_redirects` y `public/_headers`: sin cambios.** La redirección de `www` va en una regla de la zona (no en `_redirects`) y HSTS va en la zona (no en `_headers`); la CSP no cambia porque no se activa Web Analytics.

## 8. Decisiones de Felipe que este procedimiento aplica (ADR-101)
workers.dev: se apaga tras verificar (paso 9b) · Web Analytics: no se activa (AT-121) · Observability: no se activa (AT-123 queda cerrada como no reproducible) · HSTS: 1 mes, sin subdominios ni preload (AT-122) · orden: Pages pausado, merge, Workers, dominio.

## 9. Lectura conjunta
- [ ] Felipe y el agente revisan este documento juntos. Hasta que Felipe confirme, E190-I02 queda `[~]`.
- Observaciones de la lectura:
