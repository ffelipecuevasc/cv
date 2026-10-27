# Guía de configuración de WebStorm

Configuración del IDE para felipecuevas.dev (E10-I05, ADR-031). Verificada contra la documentación de WebStorm 2026.2.

- `.idea/` **no** se versiona: cada persona aplica estos pasos en su máquina.
- Las configuraciones de ejecución compartidas están en `.run/` (`pnpm dev`, `pnpm build`, `pnpm check`) y WebStorm las carga solo.

## Requisitos

- WebStorm 2026.2 o superior.
- Node 24.x instalado (versión indicada en `.nvmrc`, ADR-027) y PNPM 12 vía Corepack (`packageManager` en `package.json`).
- `pnpm install` ejecutado en la raíz.

## Pasos

1. **Plugin de Astro.** Settings > Plugins > Marketplace > buscar "Astro" > Install > reiniciar.
2. **Astro Language Server.** Settings > Languages & Frameworks > TypeScript > Astro: elegir "Enabled". En el paquete del language server, dejar la versión incluida en el IDE.
3. **TypeScript del proyecto.** Settings > Languages & Frameworks > TypeScript > TypeScript: seleccionar `node_modules/typescript` (6.0.3, ADR-030).
4. **Intérprete Node.** Settings > Languages & Frameworks > Node.js: elegir el Node 24 indicado en `.nvmrc`. Con nvm-windows o fnm, seleccionar esa instalación. WebStorm no cambia de versión solo con `.nvmrc`; por eso se elige a mano.
5. **Gestor de paquetes.** En la misma pantalla, Package manager: `pnpm` (el de Corepack). No usar npm, yarn ni bun (ADR-003).
6. **Tailwind CSS v4.** Settings > Languages & Frameworks > Style Sheets > Tailwind CSS: viene incluido. El language server detecta v4 por el archivo CSS con `@import "tailwindcss"` en `src/`. No hay `tailwind.config.js` (ADR-029).
7. **ESLint.** Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint: "Automatic ESLint configuration" y marcar "Run eslint --fix on save". Usa `eslint.config.js` (configuración plana).
8. **Prettier.** Settings > Languages & Frameworks > JavaScript > Prettier: "Automatic Prettier configuration" y "Run on save". En "Run for files", agregar `astro`: `**/*.{js,ts,mjs,cjs,astro,css,json}`. Respeta `.prettierignore`, así que no toca el sitio antiguo.
9. **Fin de línea LF.** Settings > Editor > Code Style > General > Line separator: `Unix and macOS (\n)` (ADR-032).
10. **Configuraciones de ejecución.** En el selector de ejecución, arriba a la derecha, deben aparecer `pnpm dev`, `pnpm build` y `pnpm check` (desde `.run/`). Ejecutar cada una para comprobarlas.
11. **Comprobación.** Abrir un `.astro` de `src/` y verificar resaltado, autocompletado (incluidas las clases de Tailwind) y errores del language server. Luego revisar que `git status` no muestre archivos de `.idea/`.

## Archivos relacionados

- `.run/*.run.xml`: configuraciones de ejecución compartidas.
- `.gitignore`: ignora `.idea/`, `*.iml`, `*.iws` y `*.ipr`.
- `.gitattributes`: LF en todo el repositorio.
