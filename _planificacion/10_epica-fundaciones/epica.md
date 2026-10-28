# E10 · Fundaciones técnicas
- **Prioridad de la épica:** P0 · **Estado:** [x] Terminada

## Objetivo
Dejar una base técnica nueva, reproducible y estricta en la rama de migración: proyecto Astro desde cero, PNPM obligatorio, Tailwind CSS v4, calidad de código, IDE, entorno agéntico, i18n base, README de la raíz y estructura de despliegue en Cloudflare.

## Alcance
- Rama de migración desde `main` (ADR-014).
- Proyecto Astro 7.x con salida estática (ADR-002, ADR-018).
- Cumplimiento estricto de PNPM (ADR-003).
- Tailwind CSS v4 vía `@tailwindcss/vite` (ADR-004).
- WebStorm (ADR-006).
- Carga verificada de `AGENTS.md` en Claude Code y Antigravity (ADR-011, ADR-024).
- Enrutamiento i18n `/es/` y `/en/` (ADR-001).
- `README.md` de la raíz v1.
- Decisión y estructura de despliegue (D-14) con previews de la sub-rama.

## Páginas cubiertas
Ninguna página de contenido. Solo páginas mínimas de prueba de enrutamiento.

## Dependencias
Ninguna. Es la primera épica.

## Iteraciones
| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E10-I01](E10-I01-rama-migracion.md) | Preparación de la rama de migración | P0 | S | — | [x] Terminada |
| [E10-I02](E10-I02-astro-pnpm-estricto.md) | Proyecto Astro desde cero con PNPM estricto | P0 | M | E10-I01 | [x] Terminada |
| [E10-I03](E10-I03-tailwind-v4.md) | Tailwind CSS v4 con @tailwindcss/vite y prueba de compatibilidad | P0 | S | E10-I02 | [x] Terminada |
| [E10-I04](E10-I04-calidad-codigo.md) | Calidad de código: astro check, ESLint y Prettier | P0 | S | E10-I02 | [x] Terminada |
| [E10-I05](E10-I05-webstorm.md) | Configuración de WebStorm | P1 | S | E10-I04 | [x] Terminada |
| [E10-I06](E10-I06-entorno-agentico.md) | Entorno agéntico: AGENTS.md en Claude Code y Antigravity | P0 | S | E10-I02 | [x] Terminada |
| [E10-I07](E10-I07-i18n-base.md) | i18n base: enrutamiento /es/ y /en/ | P0 | M | E10-I03 | [x] Terminada |
| [E10-I08](E10-I08-readme-raiz-v1.md) | README.md de la raíz, versión 1 | P1 | S | E10-I04, E10-I07 | [x] Terminada |
| [E10-I09](E10-I09-despliegue-cloudflare.md) | Despliegue en Cloudflare: decisión D-14 y previews de la sub-rama | P0 | M | E10-I07 | [x] Terminada |

## Criterios de aceptación de la épica
- [x] `pnpm install`, `pnpm build` y `pnpm check` funcionan desde un clon limpio con Node 24 LTS. (E10-I08 y E10-I09: clon limpio con `--frozen-lockfile`.)
- [x] Cualquier intento de instalar con npm, yarn o bun falla con un mensaje claro. (E10-I02; npm revalidado en E10-I09 con `scripts/only-pnpm.mjs`.)
- [x] Tailwind v4 compila utilidades usadas en `src/` y no escanea los HTML antiguos.
- [x] Claude Code muestra `AGENTS.md` cargado al iniciar y Antigravity lo aplica como regla del workspace. (E10-I06: sin línea de arranque visible, la carga se confirmó preguntando al agente, según ADR-024.)
- [x] Existen `/es/` y `/en/` como rutas funcionales de prueba. (E10-I07: `/` redirige de forma provisoria a `/es/` hasta E180-I03.)
- [x] La propuesta D-14 quedó resuelta como ADR y hay una URL de preview de la rama que no altera producción. (ADR-037: https://felipecuevas-dev.felipe-cuevas.workers.dev; producción en Pages sin cambios, confirmado por Felipe.)
- [x] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Incompatibilidad puntual entre la versión de Vite de Astro y `@tailwindcss/vite` (mitigación: prueba explícita en E10-I03 antes de fijar ADR-004).
- Node 26 entra a LTS durante el proyecto (backlog BL-02).
- Mezclar archivos antiguos con los nuevos en la raíz (mitigación: reglas de AGENTS.md y restricción de fuentes de Tailwind).
