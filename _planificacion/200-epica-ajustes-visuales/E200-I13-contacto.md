# E200-I13 · Contacto: campo de puntos en la cabecera, curvas de nivel en «Canales de contacto» y envío con contorno trazado
- **Estado:** [ ] Pendiente
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** M
- **Depende de:** E200-I12 · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-083, ADR-084, ADR-086, ADR-092, ADR-104, ADR-106, ADR-110, ADR-111

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Aplicar en Contacto (`/es/contacto/` y `/en/contact/`) los mismos fondos que ya usan las otras páginas y reemplazar el texto «Enviando tu mensaje…» por un efecto en el propio botón «Enviar mensaje». Todo en `es-CL` y `en-US` y en claro y oscuro.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Revisión de Felipe el 16-11-2026 en producción.
- Orden de la página (`src/pages/es/contacto.astro` y `src/pages/en/contact.astro`), composición A de ADR-083:
    - `ContactHeader` (fondo `bg`);
    - `ChannelsBand` («Canales de contacto», `Band.astro` con la cuadrícula; tarjetas de canal con fondo `surface`);
    - `ContactSection` (formulario, Turnstile y Calendly).
- **Envío del formulario hoy** (`src/scripts/contact.ts` y `src/components/contact/ContactForm.astro`):
    - al enviar, el script escribe `data-sending` («Enviando tu mensaje…» / «Sending your message…», `src/i18n/ui.ts`) en la región `role="status"` (`data-form-status`), que se ve como un párrafo en negrita sobre el botón;
    - si el envío sale bien, redirige de inmediato a Agradecimiento (ADR-086);
    - si falla, muestra el error en la misma región y pide un token nuevo de Turnstile.
- El botón es el primario de `Button.astro` (`--button-primary-bg` y `--button-primary-fg`), con el ícono `send` de Material Symbols Light, y `check` (círculo con ✓) ya está en `icons.ts`.
- `verify:seo` exige la región `role="status"` con `data-form-status`. La CSP (ADR-092) se comprueba con `verify:seo`.
- Herramientas de la épica: `texture-dots` y `texture-halo` con la variable de E200-I06, y el componente de curvas de nivel de E200-I05 con composición por parámetros y la variante de `Band`.
- Composiciones de curvas ya usadas, que esta iteración **no** debe repetir:
    - Inicio: esquinas inferior izquierda y superior derecha;
    - Educación: borde derecho, y cordillera desde la esquina inferior izquierda;
    - Desarrollador: caída desde el borde superior al centro;
    - Docente: ladera desde la esquina superior izquierda, y loma desde el borde inferior al centro;
    - Instructor: relieves enfrentados en los bordes laterales;
    - Talento Digital: diagonal desde la esquina superior derecha, dos cimas en la esquina inferior derecha, valle desde el borde izquierdo, y esquinas superior izquierda e inferior derecha;
    - Foro: sendero en diagonal desde la esquina inferior izquierda.
- `DESIGN.md` 4.5, 7.3 (botones), 7.10 (formularios), 8 (movimiento) y 11.12 (Contacto).
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.

## Decisiones de Felipe (16-11-2026)
- **Campo de puntos** (dos capas, máscara radial y halo solo en oscuro, 4.5) en la sección principal (`ContactHeader`).
- **Curvas de nivel** con composición propia en «Canales de contacto».
- **Efecto del botón «Enviar mensaje»: opción 2, «Contorno que se traza»**, elegida entre 3 vistas previas en el chat (despegue y estela, contorno que se traza y compresión a sello). Es la más elegante y sobria:
    - **enviando:** el botón pasa a contorno (fondo transparente, texto `text`, borde fino `border`) y un trazo de 2 px con el degradado `gold` → `vibrant` recorre su perímetro en bucle; texto e ícono se mantienen;
    - **enviado:** el dorado llena el botón de izquierda a derecha (texto `orient-950`) y el ícono `send` se transforma en `check`; después se redirige a Agradecimiento;
    - **error:** el botón vuelve a su estado normal y el mensaje de error se muestra como hoy;
    - la frase «Enviando tu mensaje…» deja de verse.

## Propuesta del agente para las curvas (la valida Felipe en la URL de rama)
- **«Canales de contacto»:** dos lóbulos que asoman por el borde superior, uno a la izquierda y otro a la derecha, dejando libre el centro donde va el encabezado de la banda. Se desvanecen antes de las tarjetas de canal. Cada quinta curva en dorado, con los mismos tokens de color.

## Alcance
- Campo de puntos detrás de `ContactHeader`.
- Curvas de nivel en `ChannelsBand` con la composición nueva.
- Estados «enviando», «enviado» y «error» del botón de envío, en CSS con los tokens del sitio y JavaScript vanilla (ES2017+) en `contact.ts`, sin dependencias.
- Bloque de `DESIGN.md` 4.5, 7.3, 7.10 y 11.12 para Felipe.

## Fuera de alcance
- Los campos, las validaciones, el consentimiento, Turnstile, Calendly y la función de envío del Worker (ADR-084).
- Los textos de error y la página de Agradecimiento.
- El formulario sobre `ContactSection`: no lleva textura.

## Tareas
- [ ] **Fondos:** campo de puntos (`aria-hidden`) detrás de `ContactHeader`, con la variable de E200-I06 ajustada a la alineación de su encabezado; variante de curvas de `Band` en `ChannelsBand.astro`, sin la cuadrícula, con la composición nueva pasada como parámetros al componente de E200-I05 (trazos suavizados, 10 KB o menos). Las tarjetas de canal quedan sobre su fondo `surface`.
- [ ] **Marcado del botón:** en `ContactForm.astro`, el botón de envío suma tres capas decorativas (`aria-hidden`): el relleno dorado, un SVG con un `rect` de `pathLength="100"` y el degradado `gold` → `vibrant` para el trazo, y el par de íconos `send` / `check` superpuestos. El texto y el nombre accesible del botón no cambian. El `id` del degradado es único en la página.
- [ ] **Estilos de los estados:** con clases o atributos (`data-state="sending"` / `"done"`), con los tokens del sitio y sin colores sueltos:
    - **enviando:** contorno y trazo en bucle de 1,3 s, sin efecto de hover;
    - **enviado:** relleno con `scaleX` de 0 a 1 en 550 ms y cambio de `send` a `check`;
    - **movimiento reducido:** el trazo se muestra fijo alrededor del botón (sin recorrerlo), el relleno aparece sin desplazarse y el cambio de ícono es inmediato.
- [ ] **Script (`contact.ts`):**
    - al empezar el envío, marcar el botón como ocupado (`aria-busy="true"`), ignorar un segundo clic y aplicar «enviando»;
    - la región `role="status"` sigue recibiendo «Enviando tu mensaje…» para los lectores de pantalla, pero se oculta visualmente mientras no haya un error (clase `sr-only`);
    - si el envío sale bien, aplicar «enviado» y redirigir a Agradecimiento a los 600 ms, o de inmediato con movimiento reducido;
    - si falla, quitar el estado, `aria-busy` y `sr-only`, mostrar el error como hoy y pedir el token nuevo de Turnstile.
- [ ] **Controles y CSP:** mantener la región `role="status"` con `data-form-status` que exige `verify:seo`. Si cambia un hash de script en línea, entregar a Felipe la línea exacta de `public/_headers` y verificar de nuevo cuando la pegue.
- [ ] **Pruebas del envío en la URL de rama** (con el formulario real y Turnstile): envío correcto hasta Agradecimiento, error de validación, error del servidor y doble clic, en es y en, claro y oscuro, con teclado y con movimiento reducido. Revisar con NVDA o el lector disponible que se anuncie «Enviando tu mensaje…» y, si falla, el error.
- [ ] **Revisión visual:** protocolo de la épica en `/es/contacto/` y `/en/contact/`, a 360, 768, 1.024, 1.366 y 1.920 px, incluida la carga de Calendly.
- [ ] **Registro y bloques:** ADR-118, bloque de `DESIGN.md` 4.5, 7.3, 7.10 y 11.12 en la bitácora, y PageSpeed Insights de las dos URL en la URL de rama.

## Archivos previstos (crear / modificar)
- Modificar: `src/components/contact/ContactHeader.astro`, `ChannelsBand.astro`, `ContactForm.astro`, `src/scripts/contact.ts`, el componente de curvas de nivel de E200-I05 y, si hace falta, `src/styles/global.css`.
- Felipe: `public/_headers` (solo si cambia un hash).

## Criterios de aceptación (verificables)
- [ ] La cabecera muestra el campo de puntos (halo solo en oscuro), en es y en.
- [ ] «Canales de contacto» muestra curvas de nivel suavizadas, sin cuadrícula, con una composición distinta de todas las anteriores; las tarjetas de canal se leen igual que antes.
- [ ] Al enviar, no aparece el texto «Enviando tu mensaje…»: el botón pasa a contorno con el trazo en movimiento; al terminar bien, se llena de dorado con el ✓ y la página pasa a Agradecimiento.
- [ ] Si el envío falla, el botón vuelve a la normalidad y el error se ve y se anuncia como hoy.
- [ ] El botón no acepta un segundo envío mientras está ocupado.
- [ ] Los lectores de pantalla anuncian el envío en curso; con movimiento reducido no hay animaciones.
- [ ] Contraste del texto del botón en los tres estados según 4.4 (en «enviado», `orient-950` sobre `gold`, 12,43:1).
- [ ] `verify:seo` en verde, con la CSP al día; sin dependencias nuevas; CLS 0; PageSpeed Insights sin regresión frente a la línea base de E190-I04.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm verify`, `pnpm check:i18n` y `pnpm verify:seo` sin errores.
- Pruebas de la tarea 6 y protocolo de revisión visual de la épica con el navegador de ADR-106, con la consola abierta (sin errores ni violaciones de CSP).

## ADR a registrar (texto para `decisiones.md`)

### ADR-118 · Contacto: fondos de la épica y envío con contorno trazado
- **Contexto:** E200-I13. En Contacto, la cabecera va sobre fondo liso y «Canales de contacto» usa la cuadrícula. Al enviar el formulario aparece sobre el botón el texto «Enviando tu mensaje…», que Felipe considera burdo (revisión en producción, 16-11-2026).
- **Decisión (de Felipe, 16-11-2026, entre 3 vistas previas en el chat):**
    - campo de puntos en la cabecera y curvas de nivel con composición propia en «Canales de contacto» (dos lóbulos en el borde superior);
    - el envío se muestra en el propio botón con la opción «Contorno que se traza»: contorno con un trazo `gold` → `vibrant` que recorre el perímetro mientras se envía, y relleno dorado con ✓ al terminar bien;
    - la frase de envío deja de verse, pero se sigue anunciando a los lectores de pantalla;
    - la redirección a Agradecimiento espera 600 ms para que se vea la confirmación (inmediata con movimiento reducido).
- **Consecuencias:** el botón de envío deja de ser un `Button` primario sin estados y suma tres capas decorativas. Si cambia un hash, Felipe actualiza `public/_headers` (ADR-092). Felipe edita `DESIGN.md` 4.5, 7.3, 7.10 y 11.12 (ADR-033).
- **Origen:** E200-I13, decisión de Felipe, 16-11-2026. **Estado:** Aceptada.

## Riesgos y notas
- La redirección espera 600 ms tras una respuesta correcta: si la red es lenta, el tiempo total crece solo en ese margen.
- El trazo usa `pathLength` sobre un `rect` dimensionado con CSS: se comprueba en Chrome, Firefox y Safari en la URL de rama; si algún navegador no dibuja el trazo, el botón igual queda en contorno y el envío funciona.
- La composición de curvas es una propuesta del agente; si Felipe prefiere otra, se cambia en esta misma iteración.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en `epica.md`, en `_planificacion/README.md` y en `00_producto/registro-log.md`
- [ ] Registrar hallazgos nuevos en `auditoria-tecnica.md` y decisiones nuevas en `decisiones.md`
- [ ] Escribir la bitácora en `99_bitacora/`
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
