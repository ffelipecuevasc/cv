# E200-I03 · Tipografía: Sora, Work Sans e IBM Plex Mono
- **Estado:** [~] En curso (fase 2 en local terminada; espera que Felipe pegue los bloques de `DESIGN.md` y `AGENTS.md` y haga el push para la fase 3)
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I02 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-015, ADR-016, ADR-041, ADR-043, ADR-049, ADR-107, ADR-109

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Reemplazar la tipografía de todo el sitio (Cinzel y Josefin Sans) por la combinación de la identidad visual de Felipe: Sora, Work Sans e IBM Plex Mono, en ambos temas e idiomas, sin romper el hero sin scroll, el logotipo ni el presupuesto de rendimiento.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Hoy: Cinzel (`--font-cinzel`, 400–600) en titulares, cifras y nombre del logotipo; Josefin Sans (`--font-josefin-sans`, 300–600 y cursiva 300–400) en el resto. Autoalojadas con la API de fuentes de Astro y `fontProviders.local()` (`astro.config.mjs`, ADR-043), archivos WOFF2 variables en `src/assets/fonts/` con sus licencias OFL.
- Tokens en `src/styles/global.css`: `--font-display: var(--font-cinzel)` y `--font-sans: var(--font-josefin-sans)`. Unos 40 archivos de `src/` dependen de esos tokens o nombran las familias.
- Cursivas en uso: la frase destacada del hero (`Hero.astro`, Josefin 300 cursiva) y la nota «traducido» de los testimonios (`TestimonialCard.astro`).
- Presupuesto de `verify:seo`: fuentes de hasta **120 KB en total** en `_astro/fonts`.
- `DESIGN.md` 3.2 (logotipo, vinculante), 5.1 a 5.3 (tipografía), 7.3 (texto de botones) y 2.2 (matriz del hero, ADR-016). En 5.2, el tope de 2,75 rem del h1 está calculado para Cinzel.
- Vista previa aprobada por Felipe en el chat el 16-11-2026 (opción 1 de 3).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- Familias: **Sora** (titulares), **Work Sans** (texto) e **IBM Plex Mono** (rótulos), por coherencia con su identidad visual (presentaciones, PDF y PPTX).

## Reparto de roles propuesto (lo valida Felipe en la tarea 1, antes de implementar)
| Token | Familia | Pesos | Uso |
|---|---|---|---|
| `font-display` | Sora | 300, 400 y 600 | h1 a h3, cifras, nombre del logotipo, frase destacada del hero |
| `font-sans` | Work Sans | 400, 500 y 600 | Párrafos, navegación, botones, enlaces, citas |
| `font-mono` | IBM Plex Mono | 400 y 500 | Rótulos (kicker), `dt` de cifras, etiquetas (chips), pestañas del hero, renglón 2 del logotipo |

- **Sin cursivas cargadas:** la frase destacada del hero pasa a Sora 300 recta (como en la vista previa) y la nota «traducido» de los testimonios se distingue por color y tamaño. Así el total cabe en el presupuesto de 120 KB.
- **Texto fino:** el peso 300 queda solo para Sora en tamaños de 28 px o más. El texto de cuerpo pasa a Work Sans 400 y la regla de Josefin 300 de 5.3 deja de aplicar.

## Alcance
- Archivos WOFF2 con subconjunto latino y licencias OFL de las tres familias; cambio de `astro.config.mjs` y de los tokens de `global.css`.
- Escala tipográfica nueva (tamaños, alto de línea e interletraje por rol) aplicada en todos los componentes.
- Logotipo: nombre en Sora y renglón 2 con la reserva de ancho recalculada (CLS 0).
- Hero: tamaño del h1 recalculado para la matriz de ADR-016.
- Bloque de `DESIGN.md` (2.2, 3.2, 5.1 a 5.3 y 7.3) para Felipe.

## Fuera de alcance
- Colores, espaciado y composición de cualquier página, salvo el ajuste mínimo que exija una medida tipográfica.
- El pie de página (E200-I04), más allá del cambio de familias.
- La imagen Open Graph (sigue sin texto traducible).

## Tareas
- [x] **Validar roles:** presentar a Felipe la tabla de roles y la escala propuesta (rol, familia, peso, tamaño, alto de línea, interletraje) y esperar su visto bueno antes de tocar código.
- [x] **Fuentes:** obtener Sora y Work Sans variables e IBM Plex Mono (400 y 500) de sus repositorios oficiales con licencia OFL, con subconjunto latino (incluye á é í ó ú ñ ü ¿ ¡ « » – —), en WOFF2; dejar las licencias junto a los archivos y retirar Cinzel y Josefin. Medir el total: si pasa de 120 KB, detenerse y consultar a Felipe.
- [x] **Configuración:** `astro.config.mjs` (tres familias con `fontProviders.local()` y respaldos con métricas ajustadas) y `global.css` (`--font-display`, `--font-sans` y el token nuevo `--font-mono`).
- [x] **Escala:** aplicar los roles en los componentes que nombran familias o pesos (búsqueda de `font-display`, `font-sans`, `Cinzel`, `Josefin`, `font-weight: 300` y `italic` en `src/`), sin valores fuera de los tokens.
- [x] **Logotipo:** nombre en Sora y renglón 2 en IBM Plex Mono; recalcular la reserva de ancho de la máquina de escribir y comprobar el umbral de 420 px de ADR-051 y que el cursor siga pegado al texto.
- [x] **Hero:** recalcular el `clamp()` del h1 para que «Docente Universitario en» y su versión en inglés quepan según 5.2, y repetir la matriz sin scroll de ADR-016 en los dos temas e idiomas.
- [ ] **Revisión visual:** protocolo de la épica en las 12 páginas por idioma y la 404, con foco en desbordes del inglés, botones, chips, pestañas, cifras y formularios.
- [ ] **Registro y bloques:** ADR-111 y bloque de `DESIGN.md` (2.2, 3.2, 5.1 a 5.3 y 7.3) en la bitácora; PageSpeed Insights de `/es/` y `/en/` en la preview frente a la línea base de E190-I04.

## Archivos previstos (crear / modificar)
- Crear: `src/assets/fonts/` con los WOFF2 y las licencias OFL de Sora, Work Sans e IBM Plex Mono.
- Eliminar: `cinzel-latin-wght.woff2`, `josefin-sans-latin-wght.woff2`, `josefin-sans-latin-wght-italic.woff2`, `OFL-cinzel.txt` y `OFL-josefinsans.txt`.
- Modificar: `astro.config.mjs`, `src/styles/global.css`, `src/components/layout/Logo.astro`, `src/components/home/Hero.astro`, `src/components/ui/TestimonialCard.astro` y los componentes que nombren familias o pesos; `README.md` (créditos de las fuentes, si los lista).

## Criterios de aceptación (verificables)
- [x] El `dist/` carga solo Sora, Work Sans e IBM Plex Mono, autoalojadas, sin peticiones a Google Fonts.
- [x] Fuentes de 120 KB o menos en total (`verify:seo`).
- [x] Ningún componente nombra Cinzel ni Josefin; ninguna familia se declara fuera de los tokens.
- [x] La matriz de ADR-016 se cumple en claro y oscuro, en es y en.
- [x] El logotipo anima con CLS 0, el cursor sigue al texto y el renglón 2 no salta.
- [ ] Sin desbordes del inglés en 360, 768, 1.366 y 1.920 px.
- [ ] Contrastes de 4.4 sin cambios (solo cambian las familias) y texto de cuerpo en 400 o más.
- [ ] PageSpeed Insights sin regresión frente a la línea base de E190-I04 (ADR-015).
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Protocolo de revisión visual de la épica, con el navegador de ADR-109, en local y en la URL de rama.
- PageSpeed Insights de `/es/` y `/en/` en la URL de rama (móvil y escritorio).

## ADR a registrar (texto para `decisiones.md`)

### ADR-111 · Tipografía Sora, Work Sans e IBM Plex Mono (sustituye a ADR-041 y en parte a ADR-049)
- **Contexto:** E200-I03. Felipe compara en el chat tres sistemas aplicados al hero (16-11-2026): Sora + Work Sans + IBM Plex Mono, Newsreader + Hanken Grotesk + JetBrains Mono, y Geist + Geist Mono. Cinzel en mayúsculas romanas cuesta en titulares largos y en inglés, y Josefin 300 obligó a reglas de contraste propias (AT-115).
- **Decisión (de Felipe, 16-11-2026):** Sora para titulares, cifras y nombre del logotipo; Work Sans para el texto; IBM Plex Mono para rótulos, chips, pestañas y el renglón 2 del logotipo. Las tres con licencia OFL y autoalojadas (ADR-043). Sin cursivas cargadas. Reparto de roles y escala según la tabla validada en la tarea 1.
- **Sustituye:** ADR-041 (Cinzel y Josefin Sans) y ADR-049 en la tipografía del nombre del logotipo (ícono, frases, ritmo y comportamiento no cambian).
- **Consecuencias:** el sitio usa la misma tipografía que la identidad visual de Felipe. Se recalculan el h1 del hero (ADR-016) y la reserva del logotipo. La regla de Josefin 300 de `DESIGN.md` 5.3 se retira. Felipe edita `DESIGN.md` 2.2, 3.2, 5.1 a 5.3 y 7.3 (ADR-033).
- **Origen:** E200-I03, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- Sora es más ancha que Cinzel en minúsculas: el h1 y el nombre del logotipo pueden necesitar un tamaño menor para la matriz sin scroll.
- IBM Plex Mono no tiene versión variable: son dos archivos estáticos (400 y 500).
- Si el presupuesto de 120 KB no alcanza, no se sube el límite sin un ADR: primero se reducen pesos o el subconjunto.
- Toca todas las páginas: un error aquí se ve en todo el sitio. Se revisa en la URL de rama antes de cualquier merge.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)

## Avance
- **Fase 1 (24-11-2026):** roles, escala, fuentes y método presentados; visto bueno de Felipe el 25-11-2026 (tabla tal cual; frase destacada con el `clamp()` del h1, desde 2 rem; precarga solo de Sora y Work Sans).
- **Fase 2 en local (25-11-2026):** fuentes en `dist/_astro/fonts` = 113.520 B (110,9 KiB; AT-152 resuelto); precarga antes: Josefin normal y Cinzel, ahora: Work Sans y Sora; h1 `clamp(2rem, 3vw, 2.75rem)` (tope medido: 3,46 rem por «Docente Universitario en», 2,98 rem por la frase destacada más larga); matriz de ADR-016 correcta en 16 casos (h1 de 2 líneas como máximo, credenciales y riel dentro del área visible); logotipo de 161 px bajo 640 px y 203 px desde 640 px, barra sin desborde a 360, 419 y 420 px, CLS 0 y renglón 2 sin saltos en 16 s del ciclo; sin scroll horizontal en 24 páginas (es, en y 404) a 360, 768, 1.366 y 1.920 px; las cifras «+2.000» y «+150» de las bandas invaden unos 9 px el relleno de su celda sin tocar la vecina (se les aplica el −0,01 em de la escala); ningún hash de CSP cambia (sin bloque de `public/_headers`); ADR-111 registrado; bloques de `DESIGN.md` y `AGENTS.md` en la bitácora.
