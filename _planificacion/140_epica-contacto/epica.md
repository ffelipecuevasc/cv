# E140 · Página Contacto (contacto.html)
- **Prioridad de la épica:** P1 · **Estado:** [ ] Pendiente

## Objetivo
Reconstruir la página de contacto con formulario protegido por Turnstile, envío por función de Cloudflare y agenda de Calendly, en ambos idiomas.

## Alcance
- Página y formulario.
- Función de envío adaptada a i18n y a la plataforma de ADR D-14.

## Páginas cubiertas
`contacto.html` → `/es/contacto` y `/en/contact`.

## Dependencias
E30 completa y E10-I09.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E140-I01](E140-I01-formulario.md) | Página, formulario, Turnstile y Calendly | P1 | M | E30-I06 | [ ] Pendiente |
| [E140-I02](E140-I02-funcion-envio.md) | Función de envío del formulario | P1 | M | E140-I01, E10-I09 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Secretos de producción: no se exponen ni se copian a archivos versionados.
