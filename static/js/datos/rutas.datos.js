// =========================================
// CAPA DE DATOS — Rutas de aprendizaje (Fase 5.4)
// Colección declarativa. Sin lógica, sin clases de presentación.
//
//   pasos      identificadores de recursos (recursos.datos.js), en orden pedagógico.
//              Un recurso puede aparecer en más de una ruta y en distinta posición.
//   previos    conocimientos que el alumno necesita antes de empezar
//   duracion   tiempo estimado de dedicación
//   proximamente  nota visible al final de la ruta cuando aún faltan recursos
//
// Los recursos no se modificaron: la pertenencia y la secuencia viven acá, de modo
// que reordenar una ruta no toca la ficha de ningún recurso.
// =========================================

export const rutasData = [
    {
        id: "python",
        nombre: "Full Stack Python",
        resumen: "Del lenguaje al despliegue en producción: fundamentos, framework y publicación de una aplicación web real.",
        objetivo: "Al terminar puedes construir una aplicación web con Django y dejarla publicada en un servicio de alojamiento.",
        previos: "Ninguno. La ruta parte desde cero.",
        duracion: "Alrededor de 8 horas",
        icono: "code",
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
        icono: "work",
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
        icono: "coffee",
        pasos: [8],
        proximamente: "Próximamente más recursos: fundamentos de Java SE, Spring Boot y despliegue de APIs REST."
    }
];