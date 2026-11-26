# E200-I15 · Miniatura Open Graph: retrato en panel tipo ventana, «> whoami», nombre e insignias
- **Estado:** [x] Terminada (26-11-2026)
- **Épica:** E200 · Ajustes visuales · **Prioridad:** P1 · **Tamaño:** S
- **Depende de:** E200-I14b · **Hallazgos que cierra:** — · **ADR relacionados:** ADR-107, ADR-125

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Origen
Decisión de Felipe del 26-11-2026: una miniatura Open Graph nueva, de estilo tecnológico, sobre campo de puntos. A la izquierda, el retrato del hero en un panel tipo ventana; a la derecha, «> whoami» en IBM Plex Mono, «Felipe» y «Cuevas» en Sora 700 (este último sobre un bloque `vibrant`) y las 4 insignias del hero. Sin enlaces ni dominio. La fuente mide 2.400 × 1.260 px.

## Alcance
- Reemplazar `src/assets/og-portada.jpg` por el archivo entregado por Felipe y actualizar el comentario de `src/components/seo/home-og-image.ts`.
- Registrar ADR-125: imagen nueva y «> whoami» como texto decorativo que no se traduce (sustituye en parte el criterio de `DESIGN.md` 2.4).
- Revisar si `og:image:alt` (es y en) sigue describiendo la imagen.
- Dejar en la bitácora el bloque de `DESIGN.md` 2.4 para que Felipe lo pegue.

## Fuera de alcance
- Cambiar la salida de 1.200 × 630 px, el formato o la calidad del JPG.
- Editar `DESIGN.md` (lo hace Felipe).

## Resultado (26-11-2026)
- `og-portada.jpg`: 2.400 × 1.260 px (305 KB, antes 1.424 × 752 px y 1,1 MB). El build la sigue entregando en 1.200 × 630 px.
- `og:image:alt`: los textos actuales siguen siendo correctos, pero quedan incompletos; la propuesta de texto nuevo está en la bitácora y no se aplicó (la valida Felipe, ADR-017).

## Cierre obligatorio
- [x] Actualizar el estado en este archivo, `epica.md`, `_planificacion/README.md` y `00_producto/registro-log.md`
- [x] Registrar ADR-125 en `decisiones.md`
- [x] Escribir la bitácora en `99_bitacora/`
- [x] Sugerir mensaje de commit (máx. 200 caracteres)
