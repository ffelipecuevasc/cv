// =========================================
// CAPA DE DATOS — Conjunto de tecnologías (Fase 5.3)
// Colección declarativa. Sin lógica, sin clases de presentación.
//
//   simbolo    identificador del logotipo en la colección de símbolos del documento
//   desde      año de inicio de uso; el panel calcula los años transcurridos
//   proyectos  identificadores de tarjetas del portafolio (portafolio.datos.js)
//   cursos     programas donde se imparte la tecnología
//
// Para agregar una tecnología: añadir su símbolo al sprite de desarrollador.html
// y una entrada acá. No hay que tocar lógica.
// =========================================

export const tecnologiasData = [
    {
        id: "java",
        nombre: "Java",
        rol: "Lenguaje Core",
        simbolo: "tec-java",
        desde: 2011,
        proyectos: ["pf-card-monolito", "pf-card-oauth2"],
        cursos: [
            "Full Stack Java — Talento Digital SENCE",
            "Instructor certificado de Java — Alura Latam",
            "Programación en Java — IPLACEX"
        ],
        certificaciones: ["Oracle Developer Professional"]
    },
    {
        id: "spring",
        nombre: "Spring",
        rol: "Framework",
        simbolo: "tec-spring",
        desde: 2018,
        proyectos: ["pf-card-monolito", "pf-card-oauth2"],
        cursos: [
            "Full Stack Java — Talento Digital SENCE",
            "APIs REST con Spring Security — Alura Latam"
        ],
        certificaciones: []
    },
    {
        id: "python",
        nombre: "Python",
        rol: "Lenguaje Core",
        simbolo: "tec-python",
        desde: 2020,
        proyectos: ["pf-card-manza", "pf-card-gestion"],
        cursos: [
            "Full Stack Python — Talento Digital SENCE",
            "Ingeniería de Datos con IA — Talento Digital SENCE",
            "Programación en Python — IPLACEX"
        ],
        certificaciones: ["Python Institute PCEP"]
    },
    {
        id: "django",
        nombre: "Django",
        rol: "Framework",
        simbolo: "tec-django",
        desde: 2021,
        proyectos: ["pf-card-manza", "pf-card-gestion"],
        cursos: [
            "Full Stack Python — Talento Digital SENCE",
            "Programación web con Django — IPLACEX"
        ],
        certificaciones: []
    },
    {
        id: "aws",
        nombre: "AWS",
        rol: "Infraestructura",
        simbolo: "tec-aws",
        desde: 2024,
        proyectos: ["pf-card-monolito"],
        cursos: ["Ingeniería de Datos con IA — Talento Digital SENCE"],
        certificaciones: ["AWS Developer Associate", "AWS Cloud Practitioner", "AWS AI Practitioner"]
    },
    {
        id: "docker",
        nombre: "Docker",
        rol: "Contenedores",
        simbolo: "tec-docker",
        desde: 2024,
        proyectos: ["pf-card-monolito", "pf-card-manza", "pf-card-gestion"],
        cursos: ["Contenedorización y despliegue — Alura Latam"],
        certificaciones: []
    },
    {
        id: "git",
        nombre: "Git & GitHub",
        rol: "Control de Versiones",
        simbolo: "tec-git",
        desde: 2014,
        proyectos: ["pf-card-monolito", "pf-card-gestion", "pf-card-cv"],
        cursos: [
            "Módulo de GIT y GitHub — Plan Formativo PF1163",
            "Transversal a todos los bootcamps de Talento Digital"
        ],
        certificaciones: []
    },
    {
        id: "alwaysdata",
        nombre: "AlwaysData",
        rol: "Hosting / PaaS",
        simbolo: "tec-alwaysdata",
        desde: 2024,
        proyectos: ["pf-card-gestion"],
        cursos: ["Taller de despliegue en AlwaysData — Bóveda de Recursos"],
        certificaciones: []
    },
    {
        id: "oracle-cloud",
        nombre: "Oracle Cloud",
        rol: "Infraestructura OCI",
        simbolo: "tec-oracle-cloud",
        desde: 2025,
        proyectos: [],
        cursos: ["Tecnología de la Nube — Talento Digital SENCE"],
        certificaciones: ["Oracle OCI Associate"]
    },
    {
        id: "oracle-db",
        nombre: "Oracle DB",
        rol: "Base de Datos",
        simbolo: "tec-oracle-db",
        desde: 2010,
        proyectos: [],
        cursos: [
            "Administración de Bases de Datos — IPLACEX",
            "Bases de datos SQL — Talento Digital SENCE"
        ],
        certificaciones: []
    }
];