// =========================================
// CAPA DE DATOS — Certificaciones profesionales
// Colección declarativa de contenido. Sin lógica, sin clases de presentación.
// Para agregar, quitar o editar contenido, este es el único archivo a tocar.
// =========================================

export const certificacionesData = [
    {
        id: "aws-developer",
        titulo: "AWS Developer Associate",
        emisor: "Amazon Web Services",
        fecha: "Abr. 2026",
        habilidades: "Desarrollo Cloud, Serverless, APIs, CI/CD",
        imagen: "static/img/logos/aws_developer_associate.png",
        url: "https://www.credly.com/badges/356ec70b-b54a-47f3-9966-8ac8e1552913/public_url",
        descripcion: "Certificación clave que acredita mi capacidad técnica para desarrollar, desplegar y depurar aplicaciones nativas de la nube en AWS. Valida mi dominio en el uso de las APIs de AWS, servicios serverless (como Lambda y API Gateway) y gestión de bases de datos NoSQL, garantizando la creación de software seguro, escalable y optimizado para el ecosistema cloud."
    },
    {
        id: "aws-cloud",
        titulo: "AWS Cloud Practitioner",
        emisor: "Amazon Web Services",
        fecha: "Ene. 2026",
        habilidades: "Infraestructura Global, Seguridad, Arquitectura Cloud",
        imagen: "static/img/logos/aws_cloud_practitioner.png",
        url: "https://www.credly.com/badges/2d45672a-48b4-4013-808f-31c04072bb73/public_url",
        descripcion: "Valida mi comprensión integral de la infraestructura global de AWS, sus servicios principales y los principios de seguridad en la nube. Esta credencial me permite diseñar soluciones resilientes y comunicar estrategias cloud efectivas tanto a nivel técnico como de negocio."
    },
    {
        id: "aws-ai",
        titulo: "AWS AI Practitioner",
        emisor: "Amazon Web Services",
        fecha: "Ene. 2026",
        habilidades: "Machine Learning, GenAI, Servicios Cognitivos AWS",
        imagen: "static/img/logos/aws_ai_practitioner.png",
        url: "https://www.credly.com/badges/c988f3a8-7022-43cb-9d65-9aa24e88f97f/public_url",
        descripcion: "Acredita mi dominio en conceptos de Inteligencia Artificial y Machine Learning dentro del ecosistema AWS. Me faculta para identificar casos de uso de IA de alto impacto, seleccionar los modelos fundacionales adecuados y liderar la adopción de tecnologías disruptivas."
    },
    {
        id: "python-pcep",
        titulo: "Python Institute PCEP",
        emisor: "Python Institute",
        fecha: "Dic. 2025",
        habilidades: "Sintaxis Core, Estructuras de Datos, POO",
        imagen: "static/img/logos/python_pcep.png",
        url: "https://verify.openedg.org/?id=X8Wv.TU7j.416N",
        descripcion: "Certifica conocimientos sólidos y formales en la semántica y la biblioteca estándar de Python. Garantiza mi capacidad para escribir código limpio, eficiente y mantenible, siendo el pilar algorítmico fundamental para mis desarrollos en backend y ciencia de datos."
    },
    {
        id: "oracle-data-pro",
        titulo: "Oracle Data Science Professional",
        emisor: "Oracle",
        fecha: "Oct. 2025",
        habilidades: "Modelado Predictivo, OCI Data Science, MLOps",
        imagen: "static/img/logos/oracle_data_science_professional.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=49DC655EC45500898B6310E36C9CF5ABC57B48F1BACA784ED3E296BDEFCC3F98",
        descripcion: "Demuestra experiencia avanzada en el ciclo de vida completo del Machine Learning usando Oracle Cloud Infrastructure (OCI). Avala mi capacidad para construir, entrenar, desplegar y gestionar flujos de modelos predictivos a escala empresarial."
    },
    {
        id: "oracle-dev-pro",
        titulo: "Oracle Developer Professional",
        emisor: "Oracle",
        fecha: "Sep. 2025",
        habilidades: "Cloud Native, Microservicios, APIs RESTful",
        imagen: "static/img/logos/oracle_developer_professional.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4D11E3EE49FE3FEA9B35687602B2C0DC19F0E7199C4AF982770081E4BDC783B5",
        descripcion: "Valida habilidades de nivel experto en el desarrollo de aplicaciones nativas de la nube. Me certifica para diseñar arquitecturas de microservicios robustas y aplicaciones seguras y altamente escalables integradas a ecosistemas modernos."
    },
    {
        id: "oracle-ai-assoc",
        titulo: "Oracle AI Associate",
        emisor: "Oracle",
        fecha: "Sep. 2025",
        habilidades: "Visión Computacional, NLP, Servicios AI OCI",
        imagen: "static/img/logos/oracle_ai_associate.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D2718C25F892B7E4971471C86FD8B46CB74494922FE11EA5F7CBAB9A064CB45F",
        descripcion: "Acredita competencias prácticas en la aplicación directa de Inteligencia Artificial. Me permite integrar servicios de IA preentrenados (como NLP y Visión) para desarrollar soluciones inteligentes que optimizan procesos y automatizan decisiones."
    },
    {
        id: "oracle-ai-pro",
        titulo: "Oracle AI Professional",
        emisor: "Oracle",
        fecha: "Ago. 2025",
        habilidades: "IA Generativa, LLMs, Fine-Tuning, Prompt Engineering",
        imagen: "static/img/logos/oracle_ai_professional.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6582C447AEECF465B74B30D01D884790D1DED49B9AE05C578BE6FC5F87FE6F81",
        descripcion: "Certificación de élite que valida el dominio absoluto en Inteligencia Artificial Generativa. Demuestra mi capacidad para arquitectar, implementar y realizar fine-tuning a Modelos de Lenguaje Grande (LLMs) resolviendo desafíos empresariales complejos con IA de vanguardia."
    },
    {
        id: "oracle-oci-assoc",
        titulo: "Oracle OCI Associate",
        emisor: "Oracle",
        fecha: "Ago. 2025",
        habilidades: "Networking, Compute, Bases de Datos Autónomas",
        imagen: "static/img/logos/oracle_cloud_associate.png",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FF54D5ABED5E9CB3DC9911C38388286977EA4716538312B45208B541F980CEB9",
        descripcion: "Confirma un sólido entendimiento operativo de los servicios core de Oracle Cloud Infrastructure. Me habilita para provisionar redes virtuales seguras, gestionar bases de datos autónomas y asegurar el rendimiento de aplicaciones críticas en la nube."
    }
];