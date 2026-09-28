# E30 · Layout global
- **Prioridad de la épica:** P0 · **Estado:** [ ] Pendiente

## Objetivo
Construir el armazón compartido por todas las páginas: `<head>` y SEO, i18n de interfaz, logotipo intacto, navbar rediseñada con botones de tema e idioma, menú móvil y pie de página.

## Alcance
- BaseLayout y componente de SEO.
- Diccionario de interfaz, mapa de rutas equivalentes y modelo de contenido bilingüe.
- Logotipo con paridad exacta.
- Navbar de escritorio y móvil con las mismas opciones del sitio actual.
- Pie de página.

## Páginas cubiertas
Todas (armazón compartido).

## Dependencias
E10 y E20.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E30-I01](E30-I01-base-layout-seo.md) | BaseLayout, head/SEO y tema sin parpadeo | P0 | M | E20-I02, E10-I07 | [ ] Pendiente |
| [E30-I02](E30-I02-i18n-diccionario-rutas.md) | Diccionario de interfaz, rutas equivalentes y contenido bilingüe | P0 | M | E30-I01 | [ ] Pendiente |
| [E30-I03](E30-I03-logotipo.md) | Logotipo: ícono SVG y máquina de escribir con paridad exacta | P0 | M | E30-I02, E20-I03 | [ ] Pendiente |
| [E30-I04](E30-I04-navbar-escritorio.md) | Navbar de escritorio rediseñada | P0 | M | E30-I03 | [ ] Pendiente |
| [E30-I05](E30-I05-navbar-movil.md) | Navbar móvil | P0 | M | E30-I04 | [ ] Pendiente |
| [E30-I06](E30-I06-footer.md) | Pie de página rediseñado y volver arriba | P0 | S | E30-I04 | [ ] Pendiente |

## Criterios de aceptación de la épica
- [ ] Ninguna página repite a mano el header, el pie ni el `<head>` (resuelve AT-002).
- [ ] La navbar tiene exactamente las opciones del sitio actual (ver auditoría D).
- [ ] El logotipo es idéntico en apariencia y comportamiento, con alternativa estática bajo movimiento reducido.
- [ ] El cambio de tema no produce parpadeo ni CLS.
- [ ] El cambio de idioma lleva a la ruta equivalente.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Regresión en el comportamiento del logotipo.
- Mapa de rutas incompleto que rompa el botón de idioma.
