# Registro · Lo que falta

**Fuente única de verdad** del trabajo pendiente. Si discrepa con `_planificacion/README.md`, prevalece este archivo.

- **Épica actual:** E10 · **Iteración actual:** E10-I01
- **Resumen:** 19 épicas · 52 iteraciones · 0 terminadas
- **Orden de ejecución de épicas:** E10 → E20 → E30 → E40 → E50 → E60 → E70 → E80 → E90 → E100 → E110 → E120 → E130 → E140 → E150 → E160 → E170 → E180 → E190. Dentro de cada épica se respetan las dependencias declaradas.
- Estados: [ ] Pendiente · [~] En curso · [x] Terminada · [!] Bloqueada

## Iteraciones por épica (ordenadas por prioridad)

### E10 · Fundaciones técnicas (`10_epica-fundaciones/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E10-I01 | Preparación de la rama de migración | S | — | [ ] Pendiente |
| P0 | E10-I02 | Proyecto Astro desde cero con PNPM estricto | M | E10-I01 | [ ] Pendiente |
| P0 | E10-I03 | Tailwind CSS v4 con @tailwindcss/vite y prueba de compatibilidad | S | E10-I02 | [ ] Pendiente |
| P0 | E10-I04 | Calidad de código: astro check, ESLint y Prettier | S | E10-I02 | [ ] Pendiente |
| P0 | E10-I06 | Entorno agéntico: AGENTS.md en Claude Code y Antigravity | S | E10-I02 | [ ] Pendiente |
| P0 | E10-I07 | i18n base: enrutamiento /es/ y /en/ | M | E10-I03 | [ ] Pendiente |
| P0 | E10-I09 | Despliegue en Cloudflare: decisión D-14 y previews de la sub-rama | M | E10-I07 | [ ] Pendiente |
| P1 | E10-I05 | Configuración de WebStorm | S | E10-I04 | [ ] Pendiente |
| P1 | E10-I08 | README.md de la raíz, versión 1 | S | E10-I04, E10-I07 | [ ] Pendiente |

### E20 · Sistema de diseño (`20_epica-sistema-diseno/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E20-I01 | Definición del DESIGN.md v1 | M | E10-I03 | [ ] Pendiente |
| P0 | E20-I02 | Tokens en @theme y tema claro/oscuro | M | E20-I01 | [ ] Pendiente |
| P0 | E20-I03 | Tipografía autoalojada e iconografía SVG | M | E20-I02 | [ ] Pendiente |
| P0 | E20-I04 | Sistema de movimiento sin AOS | M | E20-I02 | [ ] Pendiente |
| P0 | E20-I05 | Primitivas de componentes | M | E20-I03, E20-I04 | [ ] Pendiente |

### E30 · Layout global (`30_epica-layout-global/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E30-I01 | BaseLayout, head/SEO y tema sin parpadeo | M | E20-I02, E10-I07 | [ ] Pendiente |
| P0 | E30-I02 | Diccionario de interfaz, rutas equivalentes y contenido bilingüe | M | E30-I01 | [ ] Pendiente |
| P0 | E30-I03 | Logotipo: ícono SVG y máquina de escribir con paridad exacta | M | E30-I02, E20-I03 | [ ] Pendiente |
| P0 | E30-I04 | Navbar de escritorio rediseñada | M | E30-I03 | [ ] Pendiente |
| P0 | E30-I05 | Navbar móvil | M | E30-I04 | [ ] Pendiente |
| P0 | E30-I06 | Pie de página rediseñado y volver arriba | S | E30-I04 | [ ] Pendiente |

### E40 · Página Inicio (index.html) (`40_epica-inicio/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E40-I01 | Hero rediseñado sin scroll en escritorio | M | E30-I06, E20-I05 | [ ] Pendiente |
| P1 | E40-I02 | Franja de trayectoria y testimonios | M | E40-I01 | [ ] Pendiente |
| P1 | E40-I03 | SEO y datos estructurados de la portada | S | E40-I02 | [ ] Pendiente |

### E50 · Página Educación (educacion.html) (`50_epica-educacion/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E50-I01 | Formación académica y diplomados | M | E30-I06 | [ ] Pendiente |
| P1 | E50-I02 | Gabinete de certificaciones y JSON-LD | M | E50-I01 | [ ] Pendiente |

### E60 · Página Experiencia (experiencia.html) (`60_epica-experiencia/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E60-I01 | Página de resumen de experiencia | M | E30-I06 | [ ] Pendiente |

### E70 · Página Desarrollador (desarrollador.html) (`70_epica-desarrollador/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E70-I01 | Aspectos técnicos y muro de tecnologías | M | E60-I01 | [ ] Pendiente |
| P1 | E70-I02 | Portafolio filtrable y JSON-LD | M | E70-I01 | [ ] Pendiente |

### E80 · Página Docente (docente.html) (`80_epica-docente/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E80-I01 | Página de docencia universitaria | M | E60-I01 | [ ] Pendiente |

### E90 · Página Instructor (instructor.html) (`90_epica-instructor/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E90-I01 | Trayectoria como instructor REUF | M | E60-I01 | [ ] Pendiente |
| P2 | E90-I02 | Trayectoria como relator (capa de datos) | S | E90-I01 | [ ] Pendiente |

### E100 · Página Talento Digital (talento-digital.html) (`100_epica-talento-digital/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E100-I01 | Talento Digital, primera mitad de secciones | M | E60-I01 | [ ] Pendiente |
| P1 | E100-I02 | Talento Digital, segunda mitad de secciones | M | E100-I01 | [ ] Pendiente |

### E110 · Página Eventos (eventos.html) (`110_epica-eventos/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E110-I01 | Página de eventos con estado por fecha | M | E30-I06 | [ ] Pendiente |

### E120 · Página Foro (foro.html) (`120_epica-foro/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E120-I01 | Página del foro con Giscus bilingüe | M | E30-I06 | [ ] Pendiente |

### E130 · Página Recursos (recursos.html) (`130_epica-recursos/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E130-I01 | Rutas de aprendizaje con progreso | M | E30-I06 | [ ] Pendiente |
| P1 | E130-I02 | Bóveda de recursos y JSON-LD Course | M | E130-I01 | [ ] Pendiente |

### E140 · Página Contacto (contacto.html) (`140_epica-contacto/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E140-I01 | Página, formulario, Turnstile y Calendly | M | E30-I06 | [ ] Pendiente |
| P1 | E140-I02 | Función de envío del formulario | M | E140-I01, E10-I09 | [ ] Pendiente |

### E150 · Página Agradecimiento (agradecimiento.html) (`150_epica-agradecimiento/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P2 | E150-I01 | Página de agradecimiento | S | E140-I02 | [ ] Pendiente |

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
| BL-02 | Reevaluar Node.js cuando la versión 26 pase a Active LTS; registrar ADR nuevo si se cambia | AT-041, ADR-002 | Agente + Felipe | Cuando ocurra |
| BL-03 | Datos estructurados Event en la página de eventos | AT-038 | Agente | Sin fecha |
| BL-04 | Versiones en inglés del CV y de los PDFs de recursos, cuando Felipe las entregue | ADR-017, AT-034 | Felipe | Sin fecha |
| BL-05 | Definir si "fecudev" es la marca de la comunidad y dónde se usa, sin alterar el menú (D-08) | Propuesta P-05 | Felipe | Sin fecha |
| BL-06 | Confirmar el consentimiento de uso de nombres y fotos de los 12 testimonios | AT-025 | Felipe | Antes de E190 |
