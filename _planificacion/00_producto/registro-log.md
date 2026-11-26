# Registro · Lo que falta

**Fuente única de verdad** del trabajo pendiente. Si discrepa con `_planificacion/README.md`, prevalece este archivo.

- **Épica actual:** ninguna. **E200 · Ajustes visuales `[x]` terminada el 26-11-2026** (cierre final: `99_bitacora/2026-11-26_E200-cierre.md`); 81 de 81 iteraciones terminadas; 17 iteraciones (E200-I00 a E200-I15). `preview_urls` apagado en `main` (`322f4e7`, ADR-124) y Turnstile sin workers.dev (AT-100).
- **Producción:** `main` en `322f4e7` (26-11-2026), con E200 hasta I14b y el cierre de ADR-124. E200-I15 y el cierre final viven en `ajustes-visuales` hasta que Felipe los mergee.
- **Resumen:** 21 épicas · 81 iteraciones · 81 terminadas · 21 épicas terminadas (E200 cerrada el 26-11-2026).
- **Pendientes fuera de épica:** AT-131 (sitemap en Search Console), AT-157 (reenvío redundante del tema a Giscus, backlog), AT-168 (CSP y Web Analytics en Agradecimiento, abierto y sin decidir), BL-02 (Node 26), BL-09 (artículos en la bóveda), BL-10 (HSTS a 6 meses, desde el 08-12-2026), ramas viejas del remoto (las borra Felipe si quiere, ADR-026) y el retiro del proyecto Pages `felipe-cuevas-cv` de reversa (ADR-037; al retirarlo, también sale `felipe-cuevas-cv.pages.dev` del widget de Turnstile).
- **Orden de ejecución de épicas:** E10 → E20 → E30 → E40 → E50 → E60 → E70 → E80 → E90 → E100 → E110 → E120 → E130 → E140 → E150 → E155 → E160 → E170 → E180 → E190 → E200. Dentro de cada épica se respetan las dependencias declaradas. E155 depende de E140-I02; la constante de versión de la política la define E140-I01 (ADR-083, sustituye en ese punto a ADR-035).
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
| P0 | E155-I01 | Página de política de privacidad | S | E30-I06, E10-I09, E140-I02 | [x] Terminada |

### E160 · Página 404 (404.html) (`160_epica-404/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E160-I01 | Página 404 por idioma | S | E30-I06, E10-I09 | [x] Terminada |

### E170 · Calidad transversal (`170_epica-calidad-transversal/`)
Orden de ejecución (ADR-090): I01, I05, I02, I03, I04. Los IDs no se renumeran.

| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P1 | E170-I01 | Revisión de accesibilidad global | M | E40–E160 (todas las épicas de página) | [x] Terminada |
| P1 | E170-I05 | Limpieza técnica | S | E170-I01 | [x] Terminada |
| P1 | E170-I02 | Rendimiento y Core Web Vitals | M | E40–E160 (todas las épicas de página) | [x] Terminada |
| P1 | E170-I03 | Cabeceras de seguridad | M | E40–E160 (todas las épicas de página) | [x] Terminada |
| P1 | E170-I04 | Enlaces rotos y paridad es/en automatizada | S | E40–E160 (todas las épicas de página) | [x] Terminada |

### E180 · Migración de URLs y SEO (`180_epica-migracion-urls/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E180-I01 | Mapa de URLs y redirecciones 301 | S | E160-I01 | [x] Terminada |
| P0 | E180-I02 | Sitemap bilingüe, robots.txt y canónicas | S | E180-I01 | [x] Terminada |
| P0 | E180-I03 | Comportamiento de / y x-default | S | E180-I01 | [x] Terminada |

### E190 · Despliegue y cutover (`190_epica-cutover/`)
| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E190-I01 | Checklist de precondiciones y ensayo en preview | S | E170-I04, E180-I03 | [x] Terminada |
| P0 | E190-I02 | Plan de cambio de despliegue y plan de reversa | M | E190-I01 | [x] Terminada |
| P0 | E190-I03 | README final y retiro de archivos del sitio antiguo | S | E190-I02 | [x] Terminada |
| P0 | E190-I04 | Verificación posterior al cutover | S | E190-I03 | [x] Terminada |

### E200 · Ajustes visuales (`200_epica-ajustes-visuales/`)
Épica terminada el 26-11-2026: la cerró Felipe de forma expresa (ADR-107). Rama de trabajo prevista `ajustes-visuales` (la crea E200-I01 con autorización de Felipe). ADR previstos en `epica.md` (ADR-107 a ADR-122, aún sin registrar en `decisiones.md`; renumerados en E200-I00).

| Prioridad | ID | Iteración | Tamaño | Depende de | Estado |
|---|---|---|---|---|---|
| P0 | E200-I00 | Registro de E200 y renumeración de sus ADR | S | E190-I04 | [x] Terminada |
| P0 | E200-I01 | Preparación estructural: preview por rama, workers.dev, navegador y documentos | M | E200-I00 | [x] Terminada (24-11-2026) |
| P1 | E200-I02 | Transición de tema con barrido diagonal | S | E200-I01 | [x] Terminada (24-11-2026) |
| P1 | E200-I03 | Tipografía: Sora, Work Sans e IBM Plex Mono | M | E200-I02 | [x] Terminada (25-11-2026) |
| P1 | E200-I04 | Ajustes del pie de página | S | E200-I03 | [x] Terminada (25-11-2026) |
| P1 | E200-I05 | Inicio: curvas de nivel y cifras centradas en la banda de Resumen | S | E200-I03 | [x] Terminada (25-11-2026) |
| P1 | E200-I06 | Educación: puntos, curvas de nivel por franja y bloque REUF con panel de cifras | M | E200-I05 | [x] Terminada (25-11-2026) |
| P1 | E200-I07 | Experiencia: hitos con el año como protagonista, línea de tiempo horizontal y campo de puntos | M | E200-I06 | [x] Terminada |
| P1 | E200-I08 | Desarrollador: campo de puntos y curvas de nivel en «Conjunto de Tecnologías» | S | E200-I07 | [x] Terminada |
| P1 | E200-I09 | Docente: campo de puntos y curvas de nivel por sección, y cargos especiales en dos columnas | M | E200-I08 | [x] Terminada |
| P1 | E200-I10 | Instructor: campo de puntos por sección, curvas de nivel en «Instructor Titular» y planes SENCE a todo el ancho | M | E200-I09 | [x] Terminada |
| P1 | E200-I11 | Talento Digital: puntos y curvas de nivel por franja, cifras centradas y OTEC en cada bootcamp | M | E200-I10 | [x] Terminada |
| P1 | E200-I12 | Foro: campo de puntos en la cabecera y en «Conversación», y curvas de nivel en «Participar en tres pasos» | S | E200-I11 | [x] Terminada |
| P1 | E200-I13 | Contacto: campo de puntos en la cabecera, curvas de nivel en «Canales de contacto» y envío con contorno trazado | M | E200-I12 | [x] Terminada (26-11-2026) |
| P1 | E200-I14 | Recursos: catálogo de rutas con página propia por ruta, «Más recursos» con logos y fondos de la épica | M | E200-I13 | [x] Terminada |
| P1 | E200-I14b | Recursos: «Más recursos» con logos, campo de puntos en la cabecera y cierre de la épica | S | E200-I14 | [x] Terminada |
| P1 | E200-I15 | Miniatura Open Graph: retrato en panel tipo ventana, «> whoami», nombre e insignias | S | E200-I14b | [x] Terminada |

## Backlog no agendado
Estas tareas **no están agendadas** en ninguna iteración. Se agendan con una iteración nueva o se descartan con una entrada en `decisiones.md`.

| ID | Tarea | Origen | Responsable | Fecha |
|---|---|---|---|---|
| BL-01 | Revisar los informes de rendimiento que emita Cloudflare para el sitio actual y actualizar la línea base de ADR-015 y de E170-I02 | ADR-015 | Felipe | Fines de octubre de 2026 |
| BL-02 | Migrar de Node 24 a Node 26 (Active LTS desde el 28-10-2026): verificar compatibilidad con Astro 7, Tailwind CSS v4, PNPM y la plataforma de despliegue; registrar un ADR nuevo que sustituya a ADR-027 (al 28-10-2026 Workers Builds no ofrece Node 26: solo 22 y 24). **E190-I01 (15-11-2026): Node 26 no está en la documentación oficial de Workers Builds (22.23.4 y 24.22.1); se mantiene Node 24 hasta después del cutover (ADR-100)** | AT-041, ADR-002, ADR-027, ADR-100 | Agente + Felipe | Después del cutover (E190) |
| BL-03 | ~~Datos estructurados Event en la página de eventos~~ **Descartado por ADR-077 (02-11-2026): la página Eventos no se migra** | AT-038 | — | — |
| BL-04 | Versiones en inglés del CV y de los PDFs de recursos, cuando Felipe las entregue | ADR-017, AT-034 | Felipe | Sin fecha |
| BL-05 | Definir si "fecudev" es la marca de la comunidad y dónde se usa, sin alterar el menú (D-08) | Propuesta P-05 | Felipe | Sin fecha |
| BL-06 | ~~Confirmar el consentimiento de uso de nombres y fotos de los 12 testimonios~~ **Cerrado el 15-11-2026 (E190-I01 Fase 2): son recomendaciones públicas de LinkedIn ya publicadas en `main`; riesgo aceptado por Felipe (dicho por el desarrollador)** | AT-025 | Felipe | — |
| BL-08 | Validar el texto de la política de privacidad con un especialista (ADR-035). El borrador de E155-I01 solo describe hechos del sitio: faltan conservación, base legal, domicilio y derechos (AT-105) | ADR-035, ADR-087, AT-047, AT-105, E155-I01 | Felipe | Antes de la entrada en vigencia real de la Ley 21.719 (ADR-099; Felipe reconfirma el estado de la ley antes del cutover) |
| BL-09 | Artículos en la bóveda de recursos: páginas y contenido del tipo «artículo», que el modelo ya prevé | ADR-079 | Felipe + agente | Después del cutover (E190) |
| BL-10 | Subir HSTS de 1 mes a 6 meses en la zona (SSL/TLS > Edge Certificates), sin `includeSubDomains` ni preload salvo decisión aparte. Condición: 2 semanas sin incidentes desde el 24-11-2026. Decisión de Felipe | AT-122, ADR-101 | Felipe | Desde el 08-12-2026 |
