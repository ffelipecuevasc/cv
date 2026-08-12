# CV Online — Felipe Cuevas

Sitio web personal de currículum en línea de **Felipe Cuevas**, Ingeniero Informático, Docente Universitario e Instructor Certificado REUF (SENCE Chile), con más de 10 años de experiencia formando desarrolladores en Java, Python e Inteligencia Artificial.

🔗 **Sitio en producción:** [felipecuevas.dev](https://felipecuevas.dev)

## Sobre el proyecto

Este repositorio contiene el código fuente completo del sitio: currículum interactivo, historial de certificaciones profesionales, portafolio de proyectos, bóveda de recursos educativos y formulario de contacto.

El sitio está construido como una aplicación **100% estática**, sin backend ni base de datos, priorizando velocidad de carga, accesibilidad y un diseño responsivo cuidado tanto para escritorio como para dispositivos móviles.

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Marcado | HTML5 semántico |
| Estilos | Tailwind CSS 3 (compilado vía CLI) |
| Lógica | JavaScript (Vanilla ES6+) |
| Animaciones | AOS — Animate On Scroll |
| Gestión de dependencias | NPM |
| Hosting y CDN | Cloudflare Pages |
| Control de versiones | Git / GitHub |

## Estructura del proyecto

```
.
├── index.html               # Página principal — Hero, métricas, testimonios
├── educacion.html           # Educación y certificaciones profesionales
├── experiencia.html         # Experiencia general
├── desarrollador.html       # Perfil como desarrollador — stack técnico, portafolio
├── docente.html             # Perfil como docente universitario
├── instructor.html          # Perfil como instructor certificado REUF
├── talento-digital.html     # Colaboración con Talento Digital para Chile
├── recursos.html            # Bóveda de recursos educativos descargables
├── contacto.html            # Formulario de contacto y agenda de reuniones
├── agradecimiento.html      # Confirmación de envío del formulario
├── static/
│   ├── css/                 # index.css (fuente) y tailwind.css (compilado)
│   ├── js/                  # Módulos de lógica por sección
│   ├── img/                 # Imágenes, logos e insignias
│   └── recursos/             # Material descargable (PDF) por categoría
├── tailwind.config.js
└── package.json
```

## Puesta en marcha local

Requisitos: Node.js 18 o superior.

```bash
# Clonar el repositorio
git clone https://github.com/ffelipecuevasc/cv.git
cd cv

# Instalar dependencias
npm install

# Modo desarrollo (recompila Tailwind al guardar cambios)
npm run dev

# Build de producción (CSS minificado)
npm run build
```

El proyecto no requiere servidor de desarrollo: basta con abrir cualquier archivo `.html` en el navegador, o servirlo con la extensión Live Server de tu editor.

## 🚀 Despliegue

El sitio se despliega automáticamente en **Cloudflare Pages** ante cada `push` a la rama `main`. Cloudflare clona el repositorio, ejecuta `npm run build` y publica el resultado en [felipecuevas.dev](https://felipecuevas.dev), sin intervención manual.

Cualquier otra rama genera además su propia URL de vista previa, sin afectar el sitio en producción.

## 🗺️ Hoja de ruta

El proyecto está en un proceso activo de refactorización incremental: migración a HTML5 semántico completo, modularización de JavaScript, y rediseño de cinco secciones clave (hero, certificaciones, stack tecnológico, bóveda de recursos y una nueva sección de comunidad). El trabajo avanza módulo por módulo, verificando cada bloque en producción antes de continuar con el siguiente.

## Autor

**Felipe Cuevas**
Ingeniero Informático · Docente Universitario · Instructor Certificado REUF (SENCE)

- Sitio web: [felipecuevas.dev](https://felipecuevas.dev)
- LinkedIn: [ffelipecuevasc](https://www.linkedin.com/in/ffelipecuevasc/)
- GitHub: [@ffelipecuevasc](https://github.com/ffelipecuevasc)

## Licencia

El código base de este sitio puede consultarse libremente con fines de aprendizaje. El contenido —textos, fotografías, certificaciones, material de la bóveda de recursos y marca personal— es propiedad de Felipe Cuevas y no está autorizado para reutilización sin permiso expreso.