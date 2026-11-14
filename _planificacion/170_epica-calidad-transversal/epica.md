# E170 · Calidad transversal
- **Prioridad de la épica:** P1 · **Estado:** [~] En curso (E170-I01 terminada el 12-11-2026 y E170-I05 y E170-I02 el 13-11-2026; E170-I03 el 13-11-2026; sigue E170-I04)

## Objetivo
Verificar el sitio completo en accesibilidad, rendimiento, seguridad y enlaces antes de preparar el cutover, y dejar limpia la deuda técnica que dejaron las épicas de página.

## Alcance
- Accesibilidad global.
- Limpieza técnica (AT-079, AT-080, AT-081 y AT-089).
- Core Web Vitals frente a los umbrales de ADR-015.
- Cabeceras de seguridad.
- Enlaces rotos y paridad automatizada es/en.

## Páginas cubiertas
Todas.

## Dependencias
E40–E160 (todas las épicas de página)

## Iteraciones
**Orden de ejecución (ADR-090): I01, I05, I02, I03, I04.** Los IDs son estables y no se renumeran: I05 se ejecuta segunda.

| ID | Iteración | Prioridad | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| [E170-I01](E170-I01-accesibilidad.md) | Revisión de accesibilidad global | P1 | M | E40–E160 (todas las épicas de página) | [x] Terminada |
| [E170-I05](E170-I05-limpieza-tecnica.md) | Limpieza técnica | P1 | S | E170-I01 | [x] Terminada |
| [E170-I02](E170-I02-rendimiento-cwv.md) | Rendimiento y Core Web Vitals | P1 | M | E40–E160 (todas las épicas de página) | [x] Terminada |
| [E170-I03](E170-I03-cabeceras-seguridad.md) | Cabeceras de seguridad | P1 | M | E40–E160 (todas las épicas de página) | [x] Terminada |
| [E170-I04](E170-I04-enlaces-paridad.md) | Enlaces rotos y paridad es/en automatizada | P1 | S | E40–E160 (todas las épicas de página) | [ ] Pendiente |

## Criterios de aceptación de la épica
- [x] Sin errores críticos de accesibilidad en las 26 URL medidas (22 indexables, Agradecimiento ×2 y las 404 de idioma), o con un AT que justifique cada excepción. (E170-I01, 12-11-2026: pa11y + axe sobre la preview, 0 violaciones; PSI mínimo 96 antes de las correcciones y 100 en Contacto después.)
- [x] Limpieza técnica hecha: AT-079, AT-080, AT-081 y AT-089 resueltos (E170-I05, 13-11-2026: `dist/` sin cambios salvo el nombre de una hoja CSS; `verify:seo` 962/962).
- [x] Umbrales de ADR-015 cumplidos. (E170-I02, 13-11-2026: en laboratorio, LCP ≤ 1,69 s local y ≤ 1,35 s en la preview, CLS ≤ 0,0004 salvo una corrida aislada, TBT ≤ 10 ms, ninguna página bajo su línea base; los datos de campo siguen en BL-01.)
- [x] CSP activa sin romper Turnstile, Calendly ni Giscus. (E170-I03, 13-11-2026: `public/_headers` con CSP estricta, ADR-092; Observatory A+ 115/100 y SecurityHeaders A, sin HSTS; sin violaciones de CSP en la consola y envío real del formulario, dicho por el desarrollador.)
- [ ] Cero enlaces rotos internos.
- [ ] Todas sus iteraciones están terminadas y cumplen la Definition of Done global.

## Riesgos
- Una CSP estricta puede romper integraciones de terceros.
