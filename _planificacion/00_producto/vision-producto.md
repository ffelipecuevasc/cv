# Visión de producto · felipecuevas.dev

- **Fuentes:** contenido público del sitio actual (rama `main`, commit `b49a5bb`) y declaraciones de Felipe Cuevas en el prompt maestro.
- **Marca "por validar":** todo dato no confirmado lleva esta marca. No se incluyen datos biográficos que no estén en el sitio actual.

## Propósito
felipecuevas.dev es la presencia profesional de Felipe Cuevas y cumple tres funciones a la vez:
1. **CV online profesional:** trayectoria como instructor de bootcamps, docente universitario y desarrollador full stack, con formación y certificaciones verificables.
2. **Portafolio de proyectos:** proyectos web reales con tecnologías y enlaces.
3. **Comunidad (fecudev, por validar como nombre de marca):** eventos en vivo, foro abierto sobre GitHub Discussions, rutas de aprendizaje con recursos descargables y canal de Discord.

## Objetivo de la migración
- Llevar el sitio a Astro con estructura bilingüe (`es-CL` y `en-US`) y componentes compartidos.
- Rediseñarlo de forma más elegante y tecnológica, sin perder contenido, URLs, posicionamiento ni funcionalidades existentes.

## Perfil profesional según el sitio actual
- **Portada:** instructor senior en bootcamps de Talento Digital (SENCE) y Alura Latam; docente universitario; ingeniero informático con certificaciones de Oracle y AWS.
- **Docencia:** en INACAP, Duoc UC e IPLACEX.
- **Instructor:** en Talento Digital para Chile (Full Stack Java, Python y JavaScript, Ingeniería de Datos con IA), Alura Latam y Skillnest.
- **Desarrollo:** full stack en Java con Spring Boot y en Python con Django, con despliegue en AWS y Oracle Cloud (OCI).
- **Formación:** Ingeniería en Informática y cuatro diplomados.
- **Certificaciones:** el número exacto está **por validar**, porque el sitio actual muestra cifras distintas (AT-014).

## Audiencias
| Audiencia | Necesidad | Páginas clave |
|---|---|---|
| Instituciones de educación superior y organismos de capacitación (OTEC, programas SENCE) | Validar experiencia docente y como relator | Inicio, Docente, Instructor, Talento Digital, Educación |
| Empleadores y clientes de desarrollo de software | Evaluar capacidad técnica y proyectos | Inicio, Desarrollador, Educación, Contacto |
| Estudiantes y egresados de bootcamps (comunidad) | Aprender, resolver dudas y asistir a eventos | Recursos, Foro, Eventos |
| Audiencia internacional (nueva, por validar) | Conocer el perfil en inglés | Todas en `/en/` |

## Propuesta de valor
- **Profesional:** un perfil triple (instructor, docente y desarrollador) respaldado por certificaciones verificables y por un portafolio real.
- **Comunitaria:** material de aprendizaje ordenado, gratuito y abierto, más un foro sin publicidad ni rastreo de terceros.

## Principios
1. **Contenido primero y verificable:** cada afirmación del CV tiene respaldo (credencial, institución o proyecto).
2. **Accesible y rápido:** HTML semántico, legible sin JavaScript y con Core Web Vitals en rango "bueno" (ADR-015).
3. **Bilingüe con paridad:** ninguna página existe en un solo idioma.
4. **Respeto por la privacidad:** mínimo de terceros, carga bajo demanda y nada de rastreo publicitario.
5. **Mantenible:** contenido separado de la presentación, componentes compartidos y decisiones registradas.

## No objetivos
- No es un blog ni un sistema de gestión de contenidos.
- No incorpora cuentas de usuario, pagos ni renderizado en servidor (ADR-018).
- No agrega analítica de terceros sin una decisión explícita.
- No cambia las opciones de la barra de navegación (ADR-008).

## Tono de voz
- **Español de Chile:** con tuteo, cercano y profesional, como en el sitio actual ("Conoce mis programas", "Revisa mi CV", "Escríbeme").
- **Inglés de EE. UU.:** mismo registro cercano y profesional. Los nombres propios de programas e instituciones no se traducen (por ejemplo, "Talento Digital para Chile").
- **Contenido:** claro y concreto, sin exageraciones ni cifras sin respaldo.

## Métricas de éxito (valores meta por validar con Felipe)
| Métrica | Referencia actual | Meta |
|---|---|---|
| Core Web Vitals de campo (p75) | Informes de Cloudflare pendientes (BL-01) | LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 |
| Rendimiento Lighthouse móvil | 53–58 (12-08-2026) | Superior a la línea base en todas las páginas |
| Accesibilidad Lighthouse | 91–96 | ≥ 96 |
| URLs antiguas que siguen funcionando tras el cutover | — | 100 % |
| Páginas con paridad es/en | 0 de 13 | 13 de 13 |
| Mensajes recibidos por el formulario y reuniones agendadas | Por validar | Por validar |
| Participación en foro y eventos | Por validar | Por validar |
