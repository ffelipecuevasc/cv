# E180 · Migración de URLs y SEO
- **Prioridad de la épica:** P0 · **Estado:** [x] Terminada (15-11-2026)

## Objetivo
Garantizar que ninguna URL pública actual se pierda y que los buscadores entiendan la nueva estructura bilingüe.

## Alcance
- Mapa URL antigua → nueva y redirecciones 301.
- Sitemap bilingüe, `robots.txt` y canónicas.
- Comportamiento de `/` y `x-default`.

## Páginas cubiertas
Todas.

## Dependencias
E160 y el resto de épicas de página.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E180-I01](E180-I01-mapa-redirecciones.md) | Mapa de URLs y redirecciones 301 | P0 | S | E160-I01 | [x] Terminada |
| [E180-I02](E180-I02-sitemap-robots.md) | Sitemap bilingüe, robots.txt y canónicas | P0 | S | E180-I01 | [x] Terminada |
| [E180-I03](E180-I03-raiz-xdefault.md) | Comportamiento de / y x-default | P0 | S | E180-I01 | [x] Terminada |

> **Complemento E180-I02c (15-11-2026):** se quita la excepción de antigüedad de pnpm; `@astrojs/sitemap` queda en `3.7.5` exacta, que ya cumple el filtro (ADR-096). AT-132 se cerró en E180-I03.

> **Complemento E180-I02b (14-11-2026):** el sitemap de E180-I02 se sustituyó por `@astrojs/sitemap` 3.7.5 (ADR-095, decisión de Felipe); `/sitemap.xml` del sitio antiguo ya no existe (AT-132). No cambia el estado de las iteraciones.

## Resumen de la épica (cerrada el 15-11-2026)
- **E180-I01:** `public/_redirects` con reglas 301 de un solo salto y `pnpm check:redirects` (ADR-093).
- **E180-I02, I02b y I02c:** sitemap bilingüe con `@astrojs/sitemap` 3.7.5 exacta y sin excepción de antigüedad (ADR-094, ADR-095 y ADR-096) y `robots.txt` sin `Disallow` (AT-103).
- **E180-I03:** `/` y `/sitemap.xml` con 301 (25 reglas, ADR-098), `x-default` en el sitemap y `minimumReleaseAge: 1440` (ADR-097).
- **Controles:** `verify:seo` 1194 comprobaciones; `check:redirects` 480 contra la preview.
- **Abiertos que pasan a E190-I01:** AT-109, AT-126, AT-127, AT-131 (Search Console) y AT-136.
- **E180 termina en E180-I03; no hay E180-I04.** El traspaso a E190 lo hace Felipe en el chat.

## Criterios de aceptación de la épica
- [x] Cada URL del sitio actual (incluidas variantes `.html`, `/comunidad` y archivos públicos) responde 301 a su destino o 200 en la misma ruta. **Verificado** en la preview con 25 reglas 301 y 23 archivos de `static/` en 200. **Excepciones decididas por Felipe (dicho por el desarrollador):** `/eventos` y `/eventos.html` responden 404 (ADR-077); los 134 archivos de `static/` que no estaban en `public/` no se sirven (AT-096); `static/img/felipe_cuevas_cv.png` se copia en E190-I01 (AT-126); `/educacion/` con barra final no redirige (AT-127).
- [x] Sitemap con `hreflang` recíprocos. **Verificado** con `verify:seo` (22 URL, es-CL, en-US y `x-default`; ADR-095 y ADR-098).
- [x] Sin cadenas de redirección. **Verificado** con `check:redirects` (un solo salto por regla, 480 de 480 en la preview).
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global. **Verificado:** E180-I01, E180-I02 y E180-I03 en `[x]`; no hay E180-I04.

## Riesgos
- Perder posicionamiento por redirecciones incorrectas.
