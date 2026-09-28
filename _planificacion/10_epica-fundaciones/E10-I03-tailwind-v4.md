# E10-I03 · Tailwind CSS v4 con @tailwindcss/vite y prueba de compatibilidad
- **Estado:** [ ] Pendiente
- **Épica:** E10 · Fundaciones técnicas · **Prioridad:** P0 · **Tamaño:** S
- **Depende de:** E10-I02 · **Hallazgos que cierra:** AT-019 · **ADR relacionados:** ADR-004

> Estados posibles: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Objetivo
Integrar Tailwind CSS v4 compilado localmente mediante `@tailwindcss/vite`, verificando compatibilidad real con la versión de Vite que trae Astro.

## Contexto y referencias (DESIGN.md, ADR, hallazgos, archivos del sitio actual)
- Verificado el 28-09-2026: Astro 7.3.5 depende de Vite `^8.0.13`; `@tailwindcss/vite` 4.3.3 declara peer `vite ^5.2.0 || ^6 || ^7 || ^8`.
- `@astrojs/tailwind` está obsoleta y no se usa.
- AT-019: el sitio antiguo usa Tailwind 3.4.19 con `tailwind.config.js` y plugins `forms` y `container-queries`; en v4 las container queries son nativas.
- Documentos obligatorios: `DESIGN.md`, `_planificacion/00_producto/decisiones.md`, `_planificacion/00_producto/auditoria-tecnica.md`.
- El sitio actual es referencia de solo lectura: se consulta con `git show main:<ruta>` y nunca se edita.

## Alcance
- Instalar `tailwindcss` y `@tailwindcss/vite` con PNPM.
- Registrar el plugin en la configuración de Vite dentro de Astro.
- Hoja de estilos global con la importación de Tailwind y restricción explícita de fuentes a `src/` para no escanear los HTML antiguos presentes en la rama.
- Decidir por ADR si se necesita el plugin de formularios en v4.

## Fuera de alcance
- Tokens de diseño (E20-I02).

## Tareas
- [ ] Instalar dependencias con `pnpm add -D`.
- [ ] Configurar el plugin y la hoja global.
- [ ] Crear una página de prueba que use una utilidad arbitraria y comprobar que aparece en el CSS generado.
- [ ] Comprobar que una clase presente solo en los HTML antiguos de la raíz NO aparece en el CSS generado.
- [ ] Actualizar ADR-004 con el resultado de la verificación (entrada nueva si cambia algo).

## Archivos previstos (crear / modificar)
- Modificar: `package.json`, `astro.config.mjs`.
- Crear: `src/styles/global.css`.

## Criterios de aceptación (verificables)
- [ ] `pnpm build` compila sin advertencias de peer dependencies de Vite.
- [ ] Las utilidades usadas en `src/` aparecen en el CSS final y las exclusivas de los HTML antiguos no.
- [ ] No se instaló `@astrojs/tailwind` ni `tailwind.config.js`.
- [ ] Cumple la Definition of Done global de `_planificacion/README.md`.

## Verificación (comandos pnpm y comprobaciones manuales)
- `pnpm build`
- `pnpm why vite`
- Búsqueda de una clase exclusiva del sitio antiguo en el CSS de `dist/`.

## Riesgos y notas
- Si hay incompatibilidad, no forzar versiones: detenerse y consultar.

## Cierre obligatorio
- [ ] Actualizar estado en este archivo, en _planificacion/README.md y en 00_producto/registro-log.md
- [ ] Registrar hallazgos nuevos en auditoria-tecnica.md y decisiones nuevas en decisiones.md
- [ ] Escribir la bitácora en 99_bitacora/
- [ ] Sugerir mensaje de commit (máx. 200 caracteres)
