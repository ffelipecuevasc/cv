// =========================================
// CAPA DE DATOS — Rutas de aprendizaje (Fase 5.4)
// Colección declarativa. Sin lógica, sin clases de presentación.
//
//   pasos      identificadores de recursos (recursos.datos.js), en orden pedagógico.
//              Un recurso puede aparecer en más de una ruta y en distinta posición.
//   previos    conocimientos que el alumno necesita antes de empezar
//   duracion   tiempo estimado de dedicación
//   icono      logo SVG de la ruta (static/img/iconos/), dibujado en el selector
//   proximamente  nota visible al final de la ruta cuando aún faltan recursos
//
// Los recursos no se modificaron: la pertenencia y la secuencia viven acá, de modo
// que reordenar una ruta no toca la ficha de ningún recurso.
// =========================================

export const rutasData = [
    {
        id: "desarrollo-web-ia",
        nombre: "Desarrollo Web & IA",
        resumen: "De la intuición al criterio: planifica, diseña, estructura, publica y delega tu propio portafolio con ayuda de Claude.",
        objetivo: "Al terminar tienes tu propio portafolio diseñado, estructurado, publicado en internet, y un flujo de trabajo real con Claude Code para seguir construyendo.",
        previos: "Ninguno para empezar. Antes de la Etapa 5 necesitas una cuenta de GitHub y el plan Claude Pro.",
        duracion: "Alrededor de 8 horas",
        icono: "static/img/iconos/claude.svg",
        pasos: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        proximamente: "Próximamente: la grabación completa del taller en video."
    },
    {
        id: "python",
        nombre: "Full Stack Python",
        resumen: "Del lenguaje al despliegue en producción: fundamentos, framework y publicación de una aplicación web real.",
        objetivo: "Al terminar puedes construir una aplicación web con Django y dejarla publicada en un servicio de alojamiento.",
        previos: "Ninguno. La ruta parte desde cero.",
        duracion: "Alrededor de 8 horas",
        icono: "static/img/iconos/python.svg",
        pasos: [7, 8, 6, 2, 4, 5],
        proximamente: ""
    },
    {
        id: "empleabilidad",
        nombre: "Empleabilidad",
        resumen: "Construye la presencia profesional con la que vas a postular: perfil, portafolio y currículum publicados.",
        objetivo: "Al terminar tienes un perfil de LinkedIn optimizado y un CV en línea publicado con dominio propio.",
        previos: "Manejo básico de un navegador y una cuenta de GitHub.",
        duracion: "Alrededor de 3 horas",
        icono: "static/img/iconos/linkedin.svg",
        pasos: [1, 3],
        proximamente: ""
    },
    {
        id: "java",
        nombre: "Full Stack Java",
        resumen: "Punto de partida para quienes vienen del ecosistema Java. La ruta está en construcción.",
        objetivo: "Situar el lenguaje frente a sus alternativas antes de entrar al desarrollo con Spring.",
        previos: "Ninguno.",
        duracion: "Alrededor de 30 minutos por ahora",
        icono: "static/img/iconos/java.svg",
        pasos: [8],
        proximamente: "Próximamente más recursos: fundamentos de Java SE, Spring Boot y despliegue de APIs REST."
    }
];