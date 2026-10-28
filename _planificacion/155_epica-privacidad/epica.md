# E155 · Página Política de privacidad
- **Prioridad de la épica:** P0 · **Estado:** [ ] Pendiente

## Objetivo
Publicar una política de privacidad breve y bilingüe que informe todos los tratamientos de datos del sitio, como requisito legal antes del cutover (Ley 21.719, vigente desde el 1 de diciembre de 2026; ADR-035).

## Alcance
- Página completa en ambos idiomas, con fecha de vigencia y versión visibles.
- Identificador de versión de la política reutilizable por el formulario de contacto (E140).
- Composición propia de la página: el patrón se define y valida con Felipe al inicio de E155-I01 y se documenta en `DESIGN.md` (ADR-036).

## Páginas cubiertas
Página nueva, sin equivalente en el sitio actual → `/es/privacidad` y `/en/privacy`.

## Dependencias
E30 completa y la decisión de plataforma P-01 (E10-I09), porque la política debe nombrar los servicios de terceros reales. Se ejecuta antes de E140, que depende de E155-I01.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E155-I01](E155-I01-pagina-completa.md) | Página de política de privacidad | P0 | S | E30-I06, E10-I09 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] La página existe en `es-CL` y `en-US` con paridad de contenido y el botón de idioma lleva a la equivalente.
- [ ] No se eliminó contenido del sitio actual salvo por un ADR que lo autorice.
- [ ] HTML semántico con un único `<h1>` y `<main>` que contiene todo el contenido principal.
- [ ] Metadatos propios (title, description, canonical, hreflang, OG) en ambos idiomas.
- [ ] El pie de todas las páginas enlaza a la política del idioma activo.
- [ ] La fecha de vigencia y la versión de la política son visibles en la página.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Texto legal sin validar: la política no es asesoría legal y la valida un especialista externo antes del cutover (BL-08).
- Desactualización: si se agrega un servicio de terceros nuevo, la política debe actualizarse y cambiar de versión.
