# Bitácora · E40 · Revisión del inglés y cierre de AT-069 y AT-071

- **Épica:** E40 · Página Inicio (no es una iteración nueva)
- **Fecha:** 2026-10-30
- **Agente:** Claude Code · modelo: Claude Sonnet 5.5
- **Rama:** `migracion-astro` (no es `main`)
- **Estado final:** inglés validado por Felipe el 30-10-2026. Los ajustes de la revisión y las opciones de AT-071 elegidas se aplicaron el 31-10-2026 (ver `2026-10-31_E40-cierre.md`); las tablas de abajo muestran el texto publicado. AT-069 y AT-071 resueltas.

## Cómo usar este archivo
Cada sección (1 a 6) es independiente y se puede pegar por partes al asesor. Las tablas se generaron leyendo los JSON de `src/content/`, sin transcribir a mano. Tras la validación de Felipe se actualizaron las filas que cambiaron (el inglés de 7 textos y el título y la descripción de la portada), así que las tablas muestran el texto publicado.

Criterios que conviene pedirle al asesor:
- Registro: inglés profesional y neutro (en-US), no traducción literal.
- Nombres propios sin traducir (ADR-025): Talento Digital, SENCE, Alura Latam, REUF, INACAP, Duoc UC, IPLACEX.
- Cargos: «Instructor Senior» (Senior Instructor) y «Docente Universitario» (University Lecturer) pueden ser «Professor» o «Lecturer» según el uso estadounidense; Felipe eligió «University Lecturer».
- Marcadores `{certifications}` y `{current}` / `{total}` se sustituyen al construir: deben quedar intactos.
- El Markdown `**negrita**` de los párrafos se conserva.

## Cambios por E40-I04 (30-10-2026)
El hero se simplificó (ADR-058) y esta revisión se actualizó: los textos retirados salieron de las tablas y los nuevos están marcados «texto nuevo». Ningún texto en inglés ya validado cambió.
- **Retirados** (ya no se publican; no hace falta revisarlos): los 3 llamados a la acción de los perfiles («Conoce mis programas» / «Explore my programs», «Conoce mi experiencia docente» / «See my teaching experience», «Revisa mi portafolio» / «Browse my portfolio»), el botón «Revisa mi CV» / «Review my CV» con su nombre accesible, y las 9 etiquetas de métricas (Horas dictadas, Módulos SENCE aprobados, Bootcamps dictados, Años en aula, Instituciones, Asignaturas impartidas, Lenguajes, Frameworks y Certificaciones).
- **Nuevos:** «Profesional certificado» / «Certified professional» (rótulo de la fila de insignias) y «Resumen» / «Overview» (titular de la banda, en lugar de «Impacto medido» / «Measured impact»).
- **Sin cambio de texto:** los 3 titulares, las frases, los 3 párrafos, el rótulo y las pestañas del hero, el resto de la banda y los testimonios.
- **El pie** (E30-I07) agregó textos de interfaz que tampoco están en estas tablas: «Descargar CV» / «Download CV» y «Download CV (PDF, Spanish)» (en `src/i18n/ui.ts`, `footer`). Conviene sumarlos a la tanda del asesor.

## Imagen Open Graph (AT-069): reemplazada y optimizada
Durante la sesión Felipe subió primero `src/assets/og-portada.png` (una captura del hero con texto en español y datos que el sitio no tiene, como «Cuevas AI Academy · 4.800+ alumnos»); no se usó, y a los pocos minutos reemplazó el archivo por `src/assets/og-portada.jpg`, que es el que rige.
- **Archivo recibido:** JPEG de 1424 × 752 px y 1,1 MB. No cumple los 1200 × 630 px ni un peso razonable, así que no se publica tal cual.
- **Qué se hizo:** `src/components/seo/home-og-image.ts` lo optimiza en el build con `astro:assets` (1200 × 630 px, JPEG calidad 80): el resultado pesa unos 100 KB. La fuente queda intacta en `src/assets/`, no sale a `dist/`. Las dos portadas usan el mismo archivo; `og:image:alt` sigue por idioma sin cambios. Se eliminó el recorte provisorio `src/assets/og/og-home.jpg`.
- **Verificación:** `pnpm verify:seo` ahora lee el JPEG real de `dist/` y comprueba 1200 × 630 px y 300 KB o menos (94 comprobaciones).
- **Texto en la imagen:** lleva «FELIPE CUEVAS» y las insignias oficiales (AWS Developer Associate, Oracle Certified Professional, PCEP de Python Institute y Claude Certified Developer). Es nombre propio y marcas, no frases traducibles, y sirve a los dos idiomas. Va contra la lectura literal de «sin texto» (`DESIGN.md` 2.4), por eso la excepción queda en el bloque de abajo para que Felipe la confirme.
- **Alt:** el texto alternativo actual («Retrato de Felipe Cuevas, ingeniero informático e instructor certificado» / «Portrait of Felipe Cuevas, computer engineer and certified instructor») sigue siendo correcto, aunque no menciona las insignias. Se deja como estaba, según lo pedido.
- **Pendiente de Felipe:** el PNG ya no está en `src/assets/`; la imagen real se ve en la preview con un depurador de vista previa social.

## 1. Hero y 3 perfiles
Origen: `src/content/hero/shared.json` y `src/content/hero/profiles/*.json`.

### Textos compartidos
| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/hero/shared.json · kicker` | Ingeniero Informático | Computer Engineer |
| `src/content/hero/shared.json · tablistLabel` | Elige el perfil profesional que quieres ver | Choose the professional profile you want to see |
| `src/content/hero/shared.json · portraitAlt` | Retrato de Felipe Cuevas | Portrait of Felipe Cuevas |
| `src/content/hero/shared.json · credentials.title` (rótulo de la fila de insignias; texto nuevo) | Profesional certificado | Certified professional |
| `src/content/hero/shared.json · credentials.label` | Certificaciones profesionales vigentes | Current professional certifications |
| `src/components/home/HeroCertifications.astro` · nombres bajo las insignias (nombres propios, no se traducen) | Oracle · AWS · Python · Anthropic | Oracle · AWS · Python · Anthropic |
| `src/content/hero/shared.json · social.label` | Redes sociales y contacto | Social networks and contact |
| `src/content/hero/shared.json · social.email` | Correo | Email |
| `src/content/hero/shared.json · moreThan` | más de | more than |

#### Perfil 1: Instructor (`src/content/hero/profiles/instructor.json`)

| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/hero/profiles/instructor.json · tab` | Instructor | Instructor |
| `src/content/hero/profiles/instructor.json · headline` | Instructor Senior en | Senior Instructor in |
| `src/content/hero/profiles/instructor.json · phrases[0]` | Bootcamps de Programación | Programming Bootcamps |
| `src/content/hero/profiles/instructor.json · phrases[1]` | Bootcamps de Talento Digital | Talento Digital Bootcamps |
| `src/content/hero/profiles/instructor.json · phrases[2]` | Bootcamps de IA | AI Bootcamps |
| `src/content/hero/profiles/instructor.json · phrases[3]` | Bootcamps Full Stack | Full Stack Bootcamps |
| `src/content/hero/profiles/instructor.json · paragraph` | Instructor senior en cursos intensivos de **Talento Digital — SENCE**, iniciativa del Gobierno de Chile: desarrollo full stack en Java, Python y JavaScript, e Ingeniería de Datos con Machine Learning sobre AWS. También instructor senior de Java en **Alura Latam**, como Oracle Developer Professional. | Senior instructor in intensive **Talento Digital — SENCE** courses, an initiative of the Government of Chile: full stack development in Java, Python and JavaScript, and Data Engineering with Machine Learning on AWS. Also senior Java instructor at **Alura Latam**, certified as an Oracle Developer Professional. |

#### Perfil 2: Docente (`src/content/hero/profiles/docente.json`)

| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/hero/profiles/docente.json · tab` | Docente | Lecturer |
| `src/content/hero/profiles/docente.json · headline` | Docente Universitario en | University Lecturer in |
| `src/content/hero/profiles/docente.json · phrases[0]` | Desarrollo Full Stack | Full Stack Development |
| `src/content/hero/profiles/docente.json · phrases[1]` | Bases de Datos | Databases |
| `src/content/hero/profiles/docente.json · phrases[2]` | Desarrollo & IA | Development & AI |
| `src/content/hero/profiles/docente.json · phrases[3]` | Ciencia de Datos | Data Science |
| `src/content/hero/profiles/docente.json · paragraph` | Más de **10 años** formando técnicos e ingenieros informáticos en **INACAP, Duoc UC e IPLACEX**, donde ejerzo actualmente. Desarrollo de aplicaciones full stack, bases de datos y programación en Java y Python, con formación andragógica y foco en la empleabilidad del titulado. | Over **10 years** training IT technicians and engineers at **INACAP, Duoc UC and IPLACEX**, where I currently teach. Full stack application development, databases and programming in Java and Python, with training in adult education and a focus on graduate employability. |

#### Perfil 3: Desarrollador (`src/content/hero/profiles/desarrollador.json`)

| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/hero/profiles/desarrollador.json · tab` | Desarrollador | Developer |
| `src/content/hero/profiles/desarrollador.json · headline` | Desarrollador Full Stack | Full Stack Developer |
| `src/content/hero/profiles/desarrollador.json · phrases[0]` | Java & Spring | Java & Spring |
| `src/content/hero/profiles/desarrollador.json · phrases[1]` | Python & Django | Python & Django |
| `src/content/hero/profiles/desarrollador.json · phrases[2]` | Web asistido con IA | AI-assisted Web |
| `src/content/hero/profiles/desarrollador.json · paragraph` | Aplicaciones **end-to-end** con Spring Boot y Django, desplegadas en **AWS y Oracle Cloud (OCI)**. Diseño de APIs REST, modelado de bases de datos relacionales y contenedorización con Docker. Respaldado por {certifications} certificaciones profesionales vigentes de Oracle, Amazon Web Services, Python Institute y Anthropic. | **End-to-end** applications with Spring Boot and Django, deployed on **AWS and Oracle Cloud (OCI)**. REST API design, relational database modeling and containerization with Docker. Backed by {certifications} current professional certifications from Oracle, Amazon Web Services, Python Institute and Anthropic. |

## 2. Cinco cifras y contextos
Origen: `src/content/home/stats.json`. La cifra de certificaciones sale de los datos (ADR-053); el resto de los números son iguales en los dos idiomas.

| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/home/stats.json · items[0].label` | Certificaciones | Certifications |
| `src/content/home/stats.json · items[0].context` | Oracle, AWS, Python Institute y Anthropic | Oracle, AWS, Python Institute and Anthropic |
| `src/content/home/stats.json · items[1].label` | Años Relator REUF | Years as REUF instructor |
| `src/content/home/stats.json · items[1].context` | Instructor Talento Digital para Chile — SENCE | Instructor, Talento Digital para Chile — SENCE |
| `src/content/home/stats.json · items[2].label` | Módulos REUF | REUF modules |
| `src/content/home/stats.json · items[2].context` | Planes formativos aprobados por SENCE | Training plans approved by SENCE |
| `src/content/home/stats.json · items[3].label` | Años Docente | Years teaching |
| `src/content/home/stats.json · items[3].context` | INACAP, Duoc UC e IPLACEX | INACAP, Duoc UC and IPLACEX |
| `src/content/home/stats.json · items[4].label` | Alumnos | Students |
| `src/content/home/stats.json · items[4].context` | Formados en Java, Python, IA y Datos | Trained in Java, Python, AI and Data |

## 3. Encabezados
Origen: `src/content/home/stats.json` y `src/content/home/testimonials-section.json`.

| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/home/stats.json · kicker` | Trayectoria profesional | Professional track record |
| `src/content/home/stats.json · title` (texto nuevo) | Resumen | Overview |
| `src/content/home/testimonials-section.json · kicker` | Testimonios | Testimonials |
| `src/content/home/testimonials-section.json · title` | Lo que dicen mis alumnos | What my students say |
| `src/content/home/testimonials-section.json · carousel.label` | Testimonios de alumnos | Student testimonials |
| `src/content/home/testimonials-section.json · carousel.previous` | Testimonios anteriores | Previous testimonials |
| `src/content/home/testimonials-section.json · carousel.next` | Testimonios siguientes | Next testimonials |
| `src/content/home/testimonials-section.json · carousel.page` | Página {current} de {total} | Page {current} of {total} |

## 4. Los 12 testimonios
Origen: `src/content/testimonials/*.json`. Los nombres no se traducen; se tradujeron el cargo y la cita. Las citas son opiniones reales de alumnos: conviene que el asesor confirme que el sentido y el tono se mantienen, sin embellecer.

### Cargos
| Archivo | Nombre (no se traduce) | Cargo en español | Cargo en inglés |
|---|---|---|---|
| `src/content/testimonials/camilo.json` | Camilo Villalobos | Ing. de Automatización y Control | Automation and Control Engineer |
| `src/content/testimonials/zuggeits.json` | Zuggeits Meriño | Estudiante de Software (Dev) | Software Development Student |
| `src/content/testimonials/gonzalo.json` | Gonzalo Vera | Desarrollador Full Stack Jr. | Junior Full Stack Developer |
| `src/content/testimonials/montserrat.json` | Montserrat Espinoza | Full Stack Developer | Full Stack Developer |
| `src/content/testimonials/jacqueline.json` | Jacqueline Bastias | Desarrolladora Python & AI Architect | Python Developer & AI Architect |
| `src/content/testimonials/rodrigo.json` | Rodrigo Arevalo | Full Stack Python Developer Junior | Junior Full Stack Python Developer |
| `src/content/testimonials/emilio.json` | Emilio Delgado | Desarrollador Full Stack | Full Stack Developer |
| `src/content/testimonials/sergio.json` | Sergio Fernandez | Back-end Developer | Back-end Developer |
| `src/content/testimonials/liliana.json` | Liliana Cedeño | Desarrollador Web \| Java \| Spring Boot | Web Developer \| Java \| Spring Boot |
| `src/content/testimonials/elio.json` | Elio Duran | Machine Learning \| Python-Java | Machine Learning \| Python-Java |
| `src/content/testimonials/oscar.json` | Oscar Leal | Desarrollador Backend Junior | Junior Backend Developer |
| `src/content/testimonials/renato.json` | Renato Tapia | Líder Técnico Sénior en BCI | Senior Tech Lead at BCI |

### Citas
| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/testimonials/camilo.json · quote (Camilo Villalobos)` | Es ese perfil escaso que combina la rigurosidad y profundidad del mundo de la programación con una habilidad excepcional para la enseñanza. Sus clases son dinámicas y muy orientadas a los desafíos reales del mercado. | He is a rare kind of professional who combines the rigor and depth of the programming world with exceptional teaching ability. His classes are dynamic and strongly oriented to real market challenges. |
| `src/content/testimonials/zuggeits.json · quote (Zuggeits Meriño)` | Un excelente profesor, muy dedicado y de gran corazón, se preocupa por los avances educativos de sus alumnos. Le recomiendo a cualquier institución educativa, este es el profesor que necesitan. | An excellent teacher, very dedicated and big-hearted, who cares about his students’ academic progress. I recommend him to any educational institution; he is the teacher they need. |
| `src/content/testimonials/gonzalo.json · quote (Gonzalo Vera)` | Destaco especialmente su dedicación y compromiso. Siempre fue muy claro en sus explicaciones, logrando transmitir conceptos complejos de forma simple y práctica, apoyado en su vasta experiencia en proyectos reales. | I especially highlight his dedication and commitment. He was always very clear in his explanations, managing to convey complex concepts in a simple and practical way, backed by his vast experience in real projects. |
| `src/content/testimonials/montserrat.json · quote (Montserrat Espinoza)` | Es un excelente instructor, tremendamente dedicado y comprometido. Se esmera por que las clases sean entretenidas y comprensibles. Es muy empático y siempre está preocupado por el avance de todos los alumnos. | He is an excellent instructor, tremendously dedicated and committed. He makes an effort to keep classes entertaining and easy to follow. He is very empathetic and always concerned about the progress of every student. |
| `src/content/testimonials/jacqueline.json · quote (Jacqueline Bastias)` | Un profesional integral que redefine la docencia. Posee un dominio técnico indiscutible, pero su vocación pedagógica es lo que lo distingue. Un ser humano excepcional que se preocupa genuinamente por sus alumnos. | A well-rounded professional who redefines teaching. His technical mastery is undeniable, but it is his pedagogical vocation that sets him apart. An exceptional human being who genuinely cares about his students. |
| `src/content/testimonials/rodrigo.json · quote (Rodrigo Arevalo)` | Destaco su calidad humana y su disposición incondicional para resolver hasta la duda más compleja con paciencia. Personas con esta vocación por la enseñanza son las que realmente transforman la carrera de un desarrollador. | I highlight his human qualities and his unconditional willingness to resolve even the most complex question with patience. People with this vocation for teaching are the ones who truly transform a developer’s career. |
| `src/content/testimonials/emilio.json · quote (Emilio Delgado)` | Demuestra un gran dominio técnico y una metodología clara y práctica. Se adapta al perfil de cada alumno, enseña con paciencia y transmite su amplia experiencia. Altamente recomendable como instructor y mentor. | He shows great technical mastery and a clear, practical methodology. He adapts to each student’s profile, teaches with patience and shares his broad experience. Highly recommended as an instructor and mentor. |
| `src/content/testimonials/sergio.json · quote (Sergio Fernandez)` | Un profesional con una vocación auténtica. Su manera de transmitir conocimientos es clara y estructurada, contextualizando con ejemplos reales. Gracias a su paciencia y cercanía, crea un entorno de aprendizaje participativo. | A professional with an authentic vocation. His way of conveying knowledge is clear and structured, grounded in real examples. Thanks to his patience and approachability, he creates a participatory learning environment. |
| `src/content/testimonials/liliana.json · quote (Liliana Cedeño)` | Profesional dedicado y enfocado. Su capacidad de instruir e impulsar el aprendizaje es una de sus cualidades más importantes. Su experticia técnica lo hace un Relator de excelencia y un líder de gran calidad. | A dedicated and focused professional. His ability to instruct and drive learning is one of his most important qualities. His technical expertise makes him an outstanding instructor and a high-quality leader. |
| `src/content/testimonials/elio.json · quote (Elio Duran)` | Dejo constancia de su fortaleza especializada como Relator, tanto en lo teórico como en lo práctico, enseñando Java y Spring Boot. Fue una guía permanente y un excelente apoyo durante todo el bootcamp. | I want to acknowledge his specialized strength as an instructor, both in theory and in practice, teaching Java and Spring Boot. He was a constant guide and an excellent support throughout the entire bootcamp. |
| `src/content/testimonials/oscar.json · quote (Oscar Leal)` | Excelente profesional con capacidad inestimable para explicar conceptos complejos e inspirar pasión por la tecnología. Los sólidos conocimientos técnicos adquiridos bajo su dirección son una guía muy valiosa. | An excellent professional with an invaluable ability to explain complex concepts and inspire a passion for technology. The solid technical knowledge acquired under his direction is a very valuable guide. |
| `src/content/testimonials/renato.json · quote (Renato Tapia)` | Líder en el equipo con sólidos conocimientos técnicos y un alto estándar de calidad. Posee una habilidad única para transmitir conceptos de manera clara y concisa. Lo recomendaría sin dudarlo como ingeniero y profesor. | A leader on the team with solid technical knowledge and a high standard of quality. He has a unique ability to convey concepts clearly and concisely. I would recommend him without hesitation as an engineer and as a teacher. |

## 5. Metadatos y JSON-LD
Origen: `src/content/pages/home.json` y `src/content/seo/person.json`. Estos textos aparecen en `<title>`, `<meta description>`, Open Graph y en los datos estructurados Person que leen los buscadores.

### Metadatos de la portada
| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/pages/home.json · title` | Felipe Cuevas \| Instructor Senior y Docente Universitario | Felipe Cuevas \| Senior Instructor and University Lecturer |
| `src/content/pages/home.json · description` | Instructor senior en bootcamps de Talento Digital SENCE y Alura Latam y docente universitario. Certificado por Oracle, AWS, Python Institute y Anthropic. | Senior bootcamp instructor for Talento Digital SENCE and Alura Latam, and university lecturer. Certified by Oracle, AWS, Python Institute and Anthropic. |
| `src/content/pages/home.json · ogImageAlt` | Retrato de Felipe Cuevas, ingeniero informático e instructor certificado | Portrait of Felipe Cuevas, computer engineer and certified instructor |

### Person (JSON-LD)
Los 13 temas de `knowsAbout` van en la tabla; los marcados «(igual)» no cambian entre idiomas (nombres propios o tecnologías).

| Archivo · campo | Español | Inglés |
|---|---|---|
| `src/content/seo/person.json · jobTitle[0]` | Instructor Senior | Senior Instructor |
| `src/content/seo/person.json · jobTitle[1]` | Docente Universitario | University Lecturer |
| `src/content/seo/person.json · jobTitle[2]` | Ingeniero Informático | Computer Engineer |
| `src/content/seo/person.json · description` | Instructor senior en bootcamps de Talento Digital SENCE y Alura Latam, docente universitario e ingeniero informático. Más de 10 años formando profesionales en Java, Python y JavaScript. | Senior instructor in Talento Digital SENCE and Alura Latam bootcamps, university lecturer and computer engineer. Over 10 years training professionals in Java, Python and JavaScript. |
| `src/content/seo/person.json · contactType` | Contacto profesional | Professional contact |
| `src/content/seo/person.json · knowsAbout[0] (igual)` | Java | Java |
| `src/content/seo/person.json · knowsAbout[1] (igual)` | Spring Boot | Spring Boot |
| `src/content/seo/person.json · knowsAbout[2] (igual)` | Python | Python |
| `src/content/seo/person.json · knowsAbout[3] (igual)` | Django | Django |
| `src/content/seo/person.json · knowsAbout[4]` | Desarrollo Full Stack | Full Stack Development |
| `src/content/seo/person.json · knowsAbout[5] (igual)` | Amazon Web Services | Amazon Web Services |
| `src/content/seo/person.json · knowsAbout[6] (igual)` | Oracle Cloud Infrastructure | Oracle Cloud Infrastructure |
| `src/content/seo/person.json · knowsAbout[7] (igual)` | Docker | Docker |
| `src/content/seo/person.json · knowsAbout[8]` | Bases de Datos Oracle | Oracle Databases |
| `src/content/seo/person.json · knowsAbout[9]` | Inteligencia Artificial | Artificial Intelligence |
| `src/content/seo/person.json · knowsAbout[10]` | Ingeniería de Datos | Data Engineering |
| `src/content/seo/person.json · knowsAbout[11]` | Docencia Universitaria | University Teaching |
| `src/content/seo/person.json · knowsAbout[12]` | Educación Andragógica | Adult Education |

## 6. AT-071 · Opciones de título y descripción
Felipe eligió el **título B** y la **descripción A** (30-10-2026); se aplicaron el 31-10-2026 en `src/content/pages/home.json` (un solo archivo). Los títulos miden 60 caracteres o menos; las descripciones, 160 o menos. Todas las descripciones mencionan los 4 emisores (Oracle, AWS, Python Institute y Anthropic).

### Títulos
| Opción | Español | Largo es | Inglés | Largo en |
|---|---|---|---|---|
| Anterior (referencia) | Felipe Cuevas \| Instructor de Bootcamps y Docente Universitario | 63 | Felipe Cuevas \| Bootcamp Instructor and University Lecturer | 59 |
| A | Felipe Cuevas \| Instructor de Bootcamps y Docente TI | 52 | Felipe Cuevas \| Bootcamp Instructor and Lecturer | 48 |
| B | Felipe Cuevas \| Instructor Senior y Docente Universitario | 57 | Felipe Cuevas \| Senior Instructor and University Lecturer | 57 |

- **A** es la más corta y mantiene el posicionamiento actual (bootcamps y docencia); «Docente TI» y «Lecturer» son más genéricos.
- **B** pone el cargo «Senior» y «Universitario» al frente, más cercano a lo que dice el hero; es más largo, pero dentro del límite.

### Descripciones
| Opción | Español | Largo es | Inglés | Largo en |
|---|---|---|---|---|
| Anterior (referencia) | Instructor senior en bootcamps de Talento Digital SENCE y Alura Latam. Docente universitario e ingeniero informático, con certificaciones de Oracle y AWS. | 154 | Senior bootcamp instructor for Talento Digital SENCE and Alura Latam. University lecturer and computer engineer, certified by Oracle and AWS. | 141 |
| A | Instructor senior en bootcamps de Talento Digital SENCE y Alura Latam y docente universitario. Certificado por Oracle, AWS, Python Institute y Anthropic. | 153 | Senior bootcamp instructor for Talento Digital SENCE and Alura Latam, and university lecturer. Certified by Oracle, AWS, Python Institute and Anthropic. | 152 |
| B | Ingeniero informático, instructor de bootcamps y docente universitario. Certificaciones vigentes de Oracle, AWS, Python Institute y Anthropic. | 142 | Computer engineer, bootcamp instructor and university lecturer. Current certifications from Oracle, AWS, Python Institute and Anthropic. | 136 |

- **A** conserva la estructura actual (SENCE y Alura Latam) y reemplaza «con certificaciones de Oracle y AWS» por los 4 emisores; quita «ingeniero informático».
- **B** abre con el perfil profesional y deja los emisores como cierre; quita los nombres de SENCE y Alura Latam (siguen en el JSON-LD y en el hero).
- Ninguna incluye la cifra de certificaciones, para que no quede desfasada cuando cambien los datos (ADR-053); decir «11» a mano reabriría AT-014.
- El inglés de las opciones lo redactó el agente: también lo valida Felipe (ADR-017).
- **Resultado:** título B y descripción A, en español y en inglés. `pnpm verify:seo` dio 98 de 98 tras aplicarlas.

## Resultados de verificación
| Comprobación | Resultado |
|---|---|
| `pnpm build` | ok (4 páginas); la imagen OG sale como `/_astro/og-portada.<hash>.jpg`, 1200 × 630 px, 103 KB |
| `pnpm check` | ok (0 errores, 0 avisos, 0 sugerencias) |
| `pnpm lint` y `pnpm format:check` | ok |
| `pnpm verify:seo` | 94 de 94 (4 más que antes: dimensiones reales y peso de la imagen, por idioma) |
| Textos | sin cambios en `src/content/`: las tablas de las secciones 1 a 5 son los textos vigentes |
| Git | sin `git add`, commit ni push; el agente no dejó nada en el índice |

Archivos de la tarea:

| Acción | Ruta |
|---|---|
| Crear | `src/components/seo/home-og-image.ts` |
| Modificar | `src/pages/es/index.astro`, `src/pages/en/index.astro`, `scripts/verify-seo.mjs` |
| Eliminar | `src/assets/og/og-home.jpg` (recorte provisorio) |
| Aporte de Felipe | `src/assets/og-portada.jpg` (sin seguimiento hasta que lo agregues) |
| Documentos | `auditoria-tecnica.md` (AT-069 resuelto, AT-071 con opciones), `decisiones.md` (ADR-055 al día), `registro-log.md`, E40-I03, esta bitácora |

## Bloque para DESIGN.md (lo edita Felipe)
Reemplaza al bloque opcional de la bitácora de E40-I03. Agregar un punto a **2.4 Internacionalización**:
- La imagen Open Graph (1.200 × 630 px) es única para los dos idiomas y no lleva frases traducibles: solo el nombre propio y las insignias oficiales de las certificaciones. El título y la descripción viajan en las metaetiquetas de cada idioma, y el texto alternativo se declara por idioma.

## Mensaje de commit sugerido
```
E40: imagen OG de Felipe optimizada a 1200×630 en el build; verify:seo 94; cierra AT-069; AT-071 con opciones; bitácora con tablas es/en para revisar el inglés (sin cambiar textos).
```
