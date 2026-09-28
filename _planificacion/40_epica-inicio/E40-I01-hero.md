# E40-I01 · Hero rediseñado sin scroll en escritorio
- **Estado:** [ ] Pendiente
- **Épica:** E40 · Página Inicio (index.html) · **Prioridad:** P0 · **Tamaño:** M
- **Depende de:** E30-I06, E20-I05 · **Hallazgos que cierra:** AT-001, AT-013, AT-014, AT-028 · **ADR relacionados:** ADR-007, ADR-009, ADR-016, ADR-017, ADR-023

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Rediseñar el hero para que en escritorio navbar + hero + 3 certificaciones + redes sociales se vean completos al cargar, sin perder ningún elemento ni interacción.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Referencia de solo lectura: `git show main:index.html` (líneas 379–654), `static/js/hero.js`, `static/js/config/perfiles.config.js`.
- AT-001 (medido): el bloque termina en ~1.052 px (claro) y ~1.101 px (oscuro); causas: retrato 3:4 de 555 px de alto, `py-20` en `main` y franja de certificaciones bajo el retrato.
- Elementos que deben conservarse: rótulo "Ingeniero Informático"; conmutador de 3 perfiles (Instructor, Docente, Desarrollador) como `tablist`, oculto sin JavaScript y con perfil recordado en `localStorage` bajo la clave `perfil-hero`; `<h1>` con un titular por perfil y máquina de escribir en la parte destacada; párrafo por perfil; dos llamados a la acción por perfil (programas / experiencia docente / portafolio, y "Revisa mi CV"); 3 métricas por perfil; retrato con carga prioritaria; 3 certificaciones (Oracle, AWS, Python Institute); 5 redes (LinkedIn, GitHub, REUF en chilefacilitadores.cl, correo, Discord).
- AT-013: las insignias usan `loading="lazy"` estando sobre el pliegue y PNG de 400×400 (hasta 163 KB) mostrados a 40 px.
- AT-014: cifras inconsistentes ("Nueve" en `index.html:527`, "+10" en `:566`, "8+" en `:680`, 9 credenciales en JSON-LD): validar con Felipe.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Rediseño libre según `DESIGN.md`, conservando todos los elementos listados.
- Imágenes optimizadas con dimensiones declaradas; retrato como candidato LCP.
- Textos en ambos idiomas.

## Fuera de alcance
- Franja de trayectoria y testimonios (E40-I02).

## Tareas
- [ ] Diseñar la composición del hero y validarla con Felipe antes de implementar.
- [ ] Implementar el conmutador accesible (flechas, Home/End) con mejora progresiva.
- [ ] Reutilizar el motor de máquina de escribir de E30-I03 para los titulares.
- [ ] Validar con Felipe la cifra correcta de certificaciones.
- [ ] Medir el ajuste sin scroll en toda la matriz de ADR-016, en ambos temas e idiomas.

## Archivos previstos (crear / modificar)
- Crear: `src/pages/es/index.astro`, `src/pages/en/index.astro`, `src/components/inicio/*`, contenido bilingüe del hero.

## Criterios de aceptación (verificables)
- [ ] En 1366×638, 1440×770, 1536×734 y 1920×950 px de área visible (ADR-016), navbar + hero + 3 certificaciones + redes se ven completos sin scroll, en claro y oscuro, en `es-CL` y `en-US`.
- [ ] Ningún elemento de la lista de conservación falta.
- [ ] Sin JavaScript se ve completo el perfil Instructor; con movimiento reducido no hay máquina de escribir.
- [ ] LCP es el retrato o el `<h1>` y no empeora respecto de la línea base (ADR-015).
- [ ] CLS del hero igual a 0.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build` sin errores (DoD)
- `pnpm check` y `pnpm lint` sin errores (DoD)
- Área de contenido ajustada con el modo de dispositivos de DevTools a cada medida de la matriz.
- Lighthouse escritorio y móvil.
- Recorrido con teclado del conmutador.

## Riesgos y notas
- Textos en inglés más largos: diseñar con holgura.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
