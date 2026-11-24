# E200-I02 · Transición de tema con barrido diagonal
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I01 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-021, ADR-023, ADR-033, ADR-092, ADR-107, ADR-109

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

> **Aviso (DESIGN.md §8, agregado en E200-I00):** `DESIGN.md:377` no permite «animar el fondo de la página al cambiar de tema» y `DESIGN.md:13` (§1.5) limita el movimiento a respuestas a la interacción. Esta iteración resuelve la contradicción con su ADR-110 (que sustituye esa restricción solo para el cambio de tema), con `prefers-reduced-motion` (sin transición, tarea de estilos) y con un bloque de §8 (más §1.5 y §9 por los tokens de duración y curva) que se entrega a Felipe en la bitácora; `DESIGN.md` lo edita Felipe (ADR-033). Si Felipe no acepta la excepción, la iteración se detiene (AGENTS.md §6).

## Objetivo
Cambiar el paso entre tema claro y oscuro, que hoy es instantáneo, por un barrido diagonal con la API View Transitions, en todo el sitio y en ambos idiomas. Sin parpadeo, sin CLS y respetando el movimiento reducido.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- `src/components/layout/ThemeToggle.astro`: el clic alterna la clase `.dark` en `<html>`, guarda la clave `theme` en `localStorage` (ADR-023) y sincroniza el nombre accesible de todos los botones de tema (barra y menú móvil).
- El script del `<head>` que aplica el tema antes de pintar (sin parpadeo, E30-I01) no cambia.
- Giscus (`src/scripts/giscus.ts`) y Turnstile (`src/scripts/contact.ts`) siguen el tema observando la clase `.dark`: no hay que tocarlos.
- CSP estricta con hashes de los scripts en línea (`public/_headers`, ADR-092). `verify:seo` falla si a la CSP le sobra o le falta un hash.
- `DESIGN.md` 2.3 (sin parpadeo ni CLS al alternar) y 8 (movimiento: solo respuestas a la interacción, `prefers-reduced-motion`).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- Efecto entregado por Felipe en el chat: al pasar a oscuro, el tema nuevo entra en diagonal desde la esquina superior izquierda (`reveal-dark`); al pasar a claro, desde la inferior derecha (`reveal-light`). Duración de 0,7 s con curva *expo out*. La vista anterior queda quieta debajo.
- Va en todo el sitio, como iteración propia y antes de la tipografía.

## Correcciones al código entregado (revisión del 16-11-2026)
1. **Doble ejecución:** a `if (!document.startViewTransition) switchTheme()` le falta un `return`. Sin él, en un navegador sin soporte el tema cambia y luego `document.startViewTransition` lanza un error.
2. **`--expo-out` no existe:** se declara como token de movimiento junto a las demás duraciones. Valor de partida: `cubic-bezier(0.16, 1, 0.3, 1)` (curva *ease-out expo* habitual; se ajusta a ojo si hace falta).
3. **Movimiento reducido:** con `prefers-reduced-motion: reduce` el tema cambia al instante, sin transición.
4. **CSP:** si el script del botón queda en línea en el HTML, su hash cambia y hay que actualizarlo en `public/_headers` (lo edita Felipe, ADR-033).
5. **Sin soporte:** los navegadores sin la API cambian al instante, como hoy (mejora progresiva).

Referencia de implementación (el agente la adapta al código actual):

```ts
// Dentro del manejador de clic de ThemeToggle.astro
const switchTheme = () => {
  const dark = root.classList.toggle('dark');
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    // Almacenamiento bloqueado: el cambio vale solo para esta página.
  }
  syncAll();
};
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!document.startViewTransition || reduce) {
  switchTheme();
  return;
}
document.startViewTransition(switchTheme);
```

```css
/* global.css: el token de curva va con los demás tokens de movimiento */
::view-transition-group(root) {
  animation-duration: var(--duration-theme); /* 700ms */
  animation-timing-function: var(--ease-expo-out);
}
::view-transition-new(root) {
  animation-name: reveal-light;
  animation-fill-mode: both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
.dark::view-transition-new(root) {
  animation-name: reveal-dark;
}
@keyframes reveal-dark {
  from { clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%); }
  to { clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%); }
}
@keyframes reveal-light {
  from { clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%); }
  to { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(root),
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

## Alcance
- Barrido diagonal al alternar el tema desde cualquier botón de tema (barra y menú móvil), en todas las páginas.
- Tokens `--duration-theme` y `--ease-expo-out` en `global.css`.
- Respaldo sin animación para movimiento reducido y navegadores sin soporte.
- Bloque de `public/_headers` si cambia un hash, y bloque de `DESIGN.md` 2.3 y 8 para Felipe.

## Fuera de alcance
- Transiciones entre páginas (navegación con View Transitions o `ClientRouter`).
- El script del `<head>` que aplica el tema al cargar.
- Los colores de cualquiera de los dos temas.

## Tareas
- [ ] **Soporte:** consultar en MDN la compatibilidad vigente de `document.startViewTransition` (Chrome, Edge, Safari y Firefox) y anotarla con su fecha en la bitácora.
- [ ] **Script:** adaptar `ThemeToggle.astro` con la referencia de arriba: un solo camino que alterna, guarda y sincroniza; `return` en el respaldo; sin transición con movimiento reducido.
- [ ] **Estilos:** tokens `--duration-theme` (700 ms) y `--ease-expo-out` en `global.css`; pseudoelementos `::view-transition-*` y `@keyframes` `reveal-dark` y `reveal-light`; bloque de movimiento reducido.
- [ ] **Transiciones dobles:** comprobar si las transiciones de color propias de los componentes (por ejemplo, los 300 ms del ícono del logotipo) se suman al barrido. Si se ve un segundo fundido dentro del tema nuevo, desactivarlas solo mientras dura la transición.
- [ ] **CSP:** `pnpm build && pnpm verify:seo`. Si cambia un hash, entregar a Felipe la línea exacta de `public/_headers` y volver a verificar después de que la pegue.
- [ ] **Revisión visual:** con el navegador de ADR-109, alternar el tema en Inicio, Foro (Giscus), Contacto (Turnstile) y la 404, en `/es/` y `/en/`, a 360 y 1.920 px, en ambas direcciones; repetir con movimiento reducido, con varios clics seguidos y con el menú móvil abierto.
- [ ] **Registro y bloques:** ADR-110 y bloque de `DESIGN.md` 1.5, 2.3, 8 y 9 (tokens `--duration-theme` y `--ease-expo-out`) en la bitácora.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/layout/ThemeToggle.astro` y `src/styles/global.css`.
- Felipe: `public/_headers` (solo si cambia un hash).

## Criterios de aceptación (verificables)
- [ ] Al pasar a oscuro, el tema nuevo entra en diagonal desde arriba a la izquierda; al pasar a claro, desde abajo a la derecha; en 0,7 s, en todas las páginas y en ambos idiomas.
- [ ] Con `prefers-reduced-motion: reduce`, y en navegadores sin la API, el tema cambia al instante y sin errores en la consola.
- [ ] Sin parpadeo al cargar, CLS 0 al alternar y la clave `theme` se sigue guardando.
- [ ] Giscus y Turnstile cambian de tema igual que antes.
- [ ] Los clics seguidos no dejan el tema ni el nombre accesible del botón desincronizados.
- [ ] `verify:seo` en verde, con la CSP al día.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Revisión visual de la tarea 6, en local y en la URL de rama, con la consola abierta (sin errores ni violaciones de CSP).

## ADR a registrar (texto para `decisiones.md`)

### ADR-110 · Transición de tema con barrido diagonal (View Transitions)
- **Contexto:** E200-I02. El cambio entre tema claro y oscuro es instantáneo. Felipe entregó el 16-11-2026 un efecto de barrido diagonal con la API View Transitions para todo el sitio.
- **Decisión (de Felipe, 16-11-2026):** al alternar el tema, `document.startViewTransition` anima la vista nueva con un `clip-path` diagonal: hacia oscuro desde la esquina superior izquierda y hacia claro desde la inferior derecha, en 700 ms con curva *expo out* (tokens `--duration-theme` y `--ease-expo-out`). Sin animación con movimiento reducido o sin soporte de la API.
- **Consecuencias:** el script del botón de tema cambia; si su hash cambia, Felipe actualiza `public/_headers` (ADR-092). `DESIGN.md` 2.3 y 8 describen la transición (ADR-033). No hay dependencias nuevas.
- **Origen:** E200-I02, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- Durante los 0,7 s la página captura una imagen de la vista anterior; los iframes de terceros (Giscus, Turnstile) pueden cambiar con un pequeño desfase, que se revisa en la tarea 6.
- `clip-path` con porcentajes fuera de 0–100 % es intencional: el polígono parte fuera de la ventana para que el barrido cubra las esquinas.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
