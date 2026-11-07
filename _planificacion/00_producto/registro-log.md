# Registro · Lo que falta

**Fuente única de verdad** del trabajo pendiente. Si discrepa con `_planificacion/README.md`, prevalece este archivo.

- **Épica actual:** E155 · **Iteración actual:** E155-I01 (E150 terminada el 07-11-2026 con E150-I01: página de agradecimiento es/en con la composición B «Confirmación centrada» elegida por Felipe, ADR-086; `noindex, follow` (opción `follow` en `Seo` y `BaseLayout`), `thankYou` pasa a `internalRoutes` y queda fuera del sitemap que genere E180-I02, y la redirección del formulario coincide con `/es/agradecimiento/` y `/en/thank-you/`; textos en el diccionario (`thankYou`); sin JSON-LD, AOS ni JavaScript; `verify:seo` 846/846; cierra AT-099 y AT-030 en su parte de agradecimiento; registra AT-103 (`noindex` frente al `Disallow` de `robots.txt`, para E180); pendiente de Felipe: validar el inglés y aplicar el bloque de `DESIGN.md` de su bitácora. Antes, E140 terminada otra vez el 06-11-2026 con E140-I03, creada ese día por la prueba de Felipe en la preview (ADR-056): el Worker respondía 404 JSON en toda URL inexistente; ahora, fuera de `/api/*`, devuelve `env.ASSETS.fetch(request)` con el binding `ASSETS`, ADR-085; `verify:seo` 846/846; cierra AT-100, AT-101 (`CONTACTO_DESTINO` verificado en Email Routing) y AT-102; pendiente de Felipe: bloque de `wrangler.jsonc`. Antes, E140 terminada el 06-11-2026 con E140-I02: Worker propio solo para `/api/*` (`src/worker/index.ts` y `contact.ts`), `run_worker_first` limitado a `/api/*` y sin `functions/`; POST `/api/contacto` valida en el servidor, exige `consentimiento: true` y `PRIVACY_POLICY_VERSION` importada, verifica Turnstile y envía con la API de correo de Cloudflare la evidencia del consentimiento; registros sin datos personales; ADR-084; cierra AT-029; AT-099 aceptado hasta E150; registra AT-100; pendiente de Felipe: bloque de `wrangler.jsonc`, secretos, hostname de Turnstile y envío real en la preview. E140-I01 terminada el 03-11-2026: página de contacto es/en con la composición A, ADR-083; 4 canales de `main` sin Discord (ADR-044); formulario con checkbox obligatorio de privacidad y botón siempre activo; constante `PRIVACY_POLICY_VERSION` en `src/data/privacy-policy.ts`, que importan E140-I02 y E155-I01; Turnstile al primer foco y Calendly al hacer clic, parte de AT-024; excepción temporal de `verify:seo` para /es/privacidad/ y /en/privacy/ hasta E155-I01; registra AT-098 y AT-099; AT-097 pasa a E170; inglés por validar por Felipe. E130 terminada el 03-11-2026 con E130-I02: recursos 1 al 8 en temáticas Empleabilidad (1, 3), Python (2, 4, 5, 6, 7) y Java (8) en grilla por grupo, ADR-081; 5 archivos de `main` copiados idénticos; peso visible en las 15 descargas y aviso «In Spanish» en /en/; JSON-LD `Course` solo para la ruta, ADR-082; el id 34 no se migra; cierra AT-034 y la parte de recursos de AT-043; registra AT-096 y AT-097; inglés por validar por Felipe. E130-I01 terminada el 03-11-2026: la página pasa a bóveda mixta, ADR-079, con la composición A, ADR-080; ruta `desarrollo-web-ia` con pasos 9 al 33, progreso en `rutas-progreso` sin tocar otras claves, `?ruta=` y hilo `ruta-desarrollo-web-ia`; los hilos de las rutas python, empleabilidad y java dejan de mostrarse; 10 archivos locales de la ruta copiados, AT-095; cierra AT-028 y AT-037; inglés por validar por Felipe. E120 terminada el 02-11-2026 con E120-I01: página del foro es/en con la composición A (cabecera, banda con 3 pasos, categorías 2 × 2 y «Conversación»), Giscus con carga diferida, mismo término `foro-general`, `data-lang` por página y tema en vivo; ADR-078; cierra AT-027 y registra AT-094 («Ocho reglas»); inglés por validar por Felipe. E110 terminada el 02-11-2026 con E110-I01, reconvertida de «Página de eventos» a «Retiro de Eventos»: Eventos sale del sitio porque vive en el sitio de la comunidad Pulso Devs; `/eventos` da 404 sin redirección, sin enlace a Pulso Devs y sin JSON-LD Event; menú Comunidad con Foro y Recursos; el sitio pasa de 14 a 13 páginas por idioma; ADR-077, cierra AT-039, descarta BL-03. E100 terminada el 02-11-2026 con E100-I02: Logros de Talento Digital con lista a dos columnas y banda de cifras desde stats.json, ADR-076; AT-092 aceptado y AT-093 sin JSON-LD; inglés por validar por Felipe. E100-I01 terminada el 02-11-2026: página Talento Digital es/en con la composición B, cabecera y 6 franjas en zigzag, ADR-074; se retira la lista de rutas pendientes de verify:seo, ADR-075; AT-091 y AT-092; inglés por validar por Felipe. E90 terminada el 01-11-2026 con E90-I02: relatoría de Instructor en grilla de 2 columnas, 6 experiencias renderizadas al construir, ADR-073, cierra AT-090; inglés por validar por Felipe. E90-I01 terminada el 01-11-2026: página Instructor es/en con la composición A, ADR-072, certificado REUF en la URL de main, AT-043 en su parte; inglés por validar por Felipe. E80 terminada el 01-11-2026 con E80-I01: página Docente es/en con la composición B, ADR-070, AT-087; inglés por validar por Felipe. E70 terminada otra vez el 01-11-2026 con E70-I04, reabierta ese día por el ajuste del JSON-LD, ADR-056; Felipe pasó el validador de schema.org ese día con 0 errores en la portada y en las dos páginas de Desarrollador. Antes, E70 terminada el 01-11-2026 con E70-I03, creada ese día por los ajustes de la preview (ADR-056) y que resolvió AT-083 con ADR-069; inglés de los 12 proyectos y de los filtros validado por Felipe el 01-11-2026. E70-I02 terminada el 01-11-2026, ADR-068; E70-I01 terminada el 01-11-2026, ADR-067; inglés de la línea de tiempo de Experiencia validado por Felipe el 01-11-2026. E60 terminada otra vez el 31-10-2026 con E60-I02, reabierta ese día por los ajustes de la preview (ADR-056), con el inglés de Experiencia validado por Felipe; antes terminada el 31-10-2026 con E60-I01; los enlaces a E70 a E100 dan 404 hasta que existan, ADR-065. E20 terminada otra vez el 31-10-2026 con E20-I07, reabierta ese día por las estrellas de los testimonios, ADR-056. E30 terminada otra vez el 31-10-2026 con E30-I08, reabierta ese día por el botón de menú móvil, ADR-056. E20 terminada otra vez el 31-10-2026 con E20-I06, reabierta ese día por el cambio de íconos, ADR-056. E50 terminada el 31-10-2026 con E50-I03, reabierta ese día por los ajustes de la preview (ADR-056), con el inglés validado y su cierre documental en `99_bitacora/2026-10-31_E50-cierre.md`; E40 terminada el 31-10-2026, con el inglés validado por Felipe el 30-10-2026; ver `99_bitacora/2026-10-31_E40-cierre.md`)
- **Resumen:** 20 épicas · 63 iteraciones · 50 terminadas
- **Orden de ejecución de épicas:** E10 → E20 → E30 → E40 → E50 → E60 → E70 → E80 → E90 → E100 → E110 → E120 → E130 → E140 → E150 → E155 → E160 → E170 → E180 → E190. Dentro de cada épica se respetan las dependencias declaradas. E155 depende de E140-I02; la constante de versión de la política la define E140-I01 (ADR-083, sustituye en ese punto a ADR-035).
- Estados: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Iteraciones por épica (ordenadas por prioridad)

### E10 · Fundaciones técnicas (`10_epica-fundaciones/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E10-I01 | Preparación de la rama de migración | S | — | [x] Terminada |
| P0 | E10-I02 | Proyecto Astro desde cero con PNPM estricto | M | E10-I01 | [x] Terminada |
| P0 | E10-I03 | Tailwind CSS v4 con @tailwindcss/vite y prueba de compatibilidad | S | E10-I02 | [x] Terminada |
| P0 | E10-I04 | Calidad de código: astro check, ESLint y Prettier | S | E10-I02 | [x] Terminada |
| P0 | E10-I06 | Entorno agéntico: AGENTS.md en Claude Code y Antigravity | S | E10-I02 | [x] Terminada |
| P0 | E10-I07 | i18n base: enrutamiento /es/ y /en/ | M | E10-I03 | [x] Terminada |
| P0 | E10-I09 | Despliegue en Cloudflare: decisión D-14 y previews de la sub-rama | M | E10-I07 | [x] Terminada |
| P1 | E10-I05 | Configuración de WebStorm | S | E10-I04 | [x] Terminada |
| P1 | E10-I08 | README.md de la raíz, versión 1 | S | E10-I04, E10-I07 | [x] Terminada |

### E20 · Sistema de diseño (`20_epica-sistema-diseno/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E20-I01 | Definición del DESIGN.md v1 | M | E10-I03 | [x] Terminada |
| P0 | E20-I02 | Tokens en @theme y tema claro/oscuro | M | E20-I01 | [x] Terminada |
| P0 | E20-I03 | Tipografía autoalojada e iconografía SVG | M | E20-I02 | [x] Terminada |
| P0 | E20-I04 | Sistema de movimiento sin AOS | M | E20-I02 | [x] Terminada |
| P0 | E20-I05 | Primitivas de componentes | M | E20-I03, E20-I04 | [x] Terminada |
| P1 | E20-I06 | Íconos Material Symbols Light | M | E20-I03, E20-I05 | [x] Terminada |
| P1 | E20-I07 | Estrellas rellenas en testimonios | S | E20-I06 | [x] Terminada |

### E30 · Layout global (`30_epica-layout-global/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E30-I01 | BaseLayout, head/SEO y tema sin parpadeo | M | E20-I02, E10-I07 | [x] Terminada |
| P0 | E30-I02 | Diccionario de interfaz, rutas equivalentes y contenido bilingüe | M | E30-I01 | [x] Terminada |
| P0 | E30-I03 | Logotipo: ícono SVG y máquina de escribir con paridad exacta | M | E30-I02, E20-I03 | [x] Terminada |
| P0 | E30-I04 | Navbar de escritorio rediseñada | M | E30-I03 | [x] Terminada |
| P0 | E30-I05 | Navbar móvil | M | E30-I04 | [x] Terminada |
| P0 | E30-I06 | Pie de página rediseñado y volver arriba | S | E30-I04 | [x] Terminada |
| P0 | E30-I07 | Ajustes de navbar y pie tras la revisión en la preview | M | E30-I06 | [x] Terminada |
| P1 | E30-I08 | Botón de menú móvil oculto desde 1.280 px | S | E30-I05, E30-I07 | [x] Terminada |

### E40 · Página Inicio (index.html) (`40_epica-inicio/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E40-I01 | Hero rediseñado sin scroll en escritorio | M | E30-I06, E20-I05 | [x] Terminada |
| P1 | E40-I02 | Franja de trayectoria y testimonios | M | E40-I01 | [x] Terminada |
| P1 | E40-I03 | SEO y datos estructurados de la portada | S | E40-I02 | [x] Terminada |
| P0 | E40-I04 | Hero simplificado y separadores de la banda | M | E30-I07 | [x] Terminada |

### E50 · Página Educación (educacion.html) (`50_epica-educacion/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E50-I01 | Formación académica y diplomados | M | E30-I06 | [x] Terminada |
| P1 | E50-I02 | Gabinete de certificaciones y JSON-LD | M | E50-I01 | [x] Terminada |
| P1 | E50-I03 | Ajustes de certificaciones tras la revisión en la preview | S | E50-I02 | [x] Terminada |

### E60 · Página Experiencia (experiencia.html) (`60_epica-experiencia/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E60-I01 | Página de resumen de experiencia | M | E30-I06 | [x] Terminada |
| P1 | E60-I02 | Ajustes de Experiencia tras la revisión en la preview | S | E60-I01 | [x] Terminada |

### E70 · Página Desarrollador (desarrollador.html) (`70_epica-desarrollador/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E70-I01 | Aspectos técnicos y muro de tecnologías | M | E60-I01 | [x] Terminada |
| P1 | E70-I02 | Portafolio filtrable y JSON-LD | M | E70-I01 | [x] Terminada |
| P1 | E70-I03 | Ajustes de Desarrollador tras la revisión en la preview | S | E70-I02 | [x] Terminada |
| P1 | E70-I04 | Ajuste del JSON-LD del portafolio | S | E70-I03 | [x] Terminada |

### E80 · Página Docente (docente.html) (`80_epica-docente/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E80-I01 | Página de docencia universitaria | M | E60-I01 | [x] Terminada |

### E90 · Página Instructor (instructor.html) (`90_epica-instructor/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E90-I01 | Trayectoria como instructor REUF | M | E60-I01 | [x] Terminada |
| P2 | E90-I02 | Trayectoria como relator (capa de datos) | S | E90-I01 | [x] Terminada |

### E100 · Página Talento Digital (talento-digital.html) (`100_epica-talento-digital/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E100-I01 | Talento Digital, primera mitad de secciones | M | E60-I01 | [x] Terminada |
| P1 | E100-I02 | Talento Digital, segunda mitad de secciones | M | E100-I01 | [x] Terminada |

### E110 · Retiro de Eventos (`110_epica-eventos/`, ADR-077)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E110-I01 | Retiro de Eventos | S | E30-I06 | [x] Terminada |

### E120 · Página Foro (foro.html) (`120_epica-foro/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E120-I01 | Página del foro con Giscus bilingüe | M | E30-I06 | [x] Terminada |

### E130 · Página Recursos (recursos.html) (`130_epica-recursos/`, bóveda mixta por ADR-079)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E130-I01 | Bóveda mixta: página, modelo y ruta Web & IA | M | E30-I06 | [x] Terminada |
| P1 | E130-I02 | Bóveda mixta: temáticas, descargables y JSON-LD | M | E130-I01 | [x] Terminada |

### E140 · Página Contacto (contacto.html) (`140_epica-contacto/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E140-I01 | Página, formulario, Turnstile y Calendly | M | E30-I06 | [x] Terminada |
| P1 | E140-I02 | Función de envío del formulario | M | E140-I01, E10-I09 | [x] Terminada |
| P1 | E140-I03 | Corrección: el Worker no atiende los 404 del sitio | S | E140-I02 | [x] Terminada |

### E150 · Página Agradecimiento (agradecimiento.html) (`150_epica-agradecimiento/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P2 | E150-I01 | Página de agradecimiento | S | E140-I02 | [x] Terminada |

### E155 · Página Política de privacidad (`155_epica-privacidad/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E155-I01 | Página de política de privacidad | S | E30-I06, E10-I09, E140-I02 | [ ] Pendiente |

### E160 · Página 404 (404.html) (`160_epica-404/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E160-I01 | Página 404 por idioma | S | E30-I06, E10-I09 | [ ] Pendiente |

### E170 · Calidad transversal (`170_epica-calidad-transversal/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E170-I01 | Revisión de accesibilidad global | M | E40–E160 (todas las épicas de página) | [ ] Pendiente |
| P1 | E170-I02 | Rendimiento y Core Web Vitals | M | E40–E160 (todas las épicas de página) | [ ] Pendiente |
| P1 | E170-I03 | Cabeceras de seguridad | M | E40–E160 (todas las épicas de página) | [ ] Pendiente |
| P1 | E170-I04 | Enlaces rotos y paridad es/en automatizada | S | E40–E160 (todas las épicas de página) | [ ] Pendiente |

### E180 · Migración de URLs y SEO (`180_epica-migracion-urls/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E180-I01 | Mapa de URLs y redirecciones 301 | S | E160-I01 | [ ] Pendiente |
| P0 | E180-I02 | Sitemap bilingüe, robots.txt y canónicas | S | E180-I01 | [ ] Pendiente |
| P0 | E180-I03 | Comportamiento de / y x-default | S | E180-I01 | [ ] Pendiente |

### E190 · Despliegue y cutover (`190_epica-cutover/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E190-I01 | Checklist de precondiciones y ensayo en preview | S | E170-I04, E180-I03 | [ ] Pendiente |
| P0 | E190-I02 | Plan de cambio de despliegue y plan de reversa | M | E190-I01 | [ ] Pendiente |
| P0 | E190-I03 | README final y retiro de archivos del sitio antiguo | S | E190-I02 | [ ] Pendiente |
| P0 | E190-I04 | Verificación posterior al cutover | S | E190-I03 | [ ] Pendiente |

## Backlog no agendado
Estas tareas **no están agendadas** en ninguna iteración. Se agendan con una iteración nueva o se descartan con una entrada en `decisiones.md`.

| ID | Tarea | Origen | Responsable | Fecha |
|---|---|---|---|---|
| BL-01 | Revisar los informes de rendimiento que emita Cloudflare para el sitio actual y actualizar la línea base de ADR-015 y de E170-I02 | ADR-015 | Felipe | Fines de octubre de 2026 |
| BL-02 | Migrar de Node 24 a Node 26 (Active LTS desde el 28-10-2026): verificar compatibilidad con Astro 7, Tailwind CSS v4, PNPM y la plataforma de despliegue; registrar un ADR nuevo que sustituya a ADR-027 (al 28-10-2026 Workers Builds no ofrece Node 26: solo 22 y 24). **Se hace en E190-I01 (ADR-083)** | AT-041, ADR-002, ADR-027, ADR-083 | Agente + Felipe | En E190-I01 |
| BL-03 | ~~Datos estructurados Event en la página de eventos~~ **Descartado por ADR-077 (02-11-2026): la página Eventos no se migra** | AT-038 | — | — |
| BL-04 | Versiones en inglés del CV y de los PDFs de recursos, cuando Felipe las entregue | ADR-017, AT-034 | Felipe | Sin fecha |
| BL-05 | Definir si "fecudev" es la marca de la comunidad y dónde se usa, sin alterar el menú (D-08) | Propuesta P-05 | Felipe | Sin fecha |
| BL-06 | Confirmar el consentimiento de uso de nombres y fotos de los 12 testimonios | AT-025 | Felipe | Antes de E190 |
| BL-08 | Validar el texto de la política de privacidad con un especialista (ADR-035) | ADR-035, AT-047, E155-I01 | Felipe | Antes de E190 |
| BL-09 | Artículos en la bóveda de recursos: páginas y contenido del tipo «artículo», que el modelo ya prevé | ADR-079 | Felipe + agente | Después del cutover (E190) |
