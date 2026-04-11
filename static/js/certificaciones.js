// =========================================
// 1. Base de Datos de Certificaciones (Línea de Tiempo Asimétrica)
// =========================================
const certificacionesData = [
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

// =========================================
// 2. Motor de Renderizado (Línea de Tiempo Eje Izquierdo)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('certificaciones-timeline');
    if (!timelineContainer) return;

    let htmlContent = '';

    certificacionesData.forEach((cert) => {
        htmlContent += `
        <div class="relative pl-16 md:pl-28 mb-12 w-full" data-aos="fade-left">
            
            <div class="absolute left-6 md:left-12 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white dark:border-orient-700 bg-primary z-10 transform -translate-x-1/2 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                <span class="material-symbols-outlined text-white text-sm md:text-base">workspace_premium</span>
            </div>

            <div class="bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-[2rem] shadow-none hover:shadow-2xl border border-orient-200 dark:border-white/10 dark:ring-1 dark:ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/50 overflow-hidden group">
                <div class="flex flex-col md:flex-row">
                    
                    <div class="md:w-1/3 lg:w-1/4 bg-orient-50 dark:bg-white/5 group-hover:bg-orient-500 dark:group-hover:bg-orient-900 transition-colors duration-500 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-orient-100 dark:border-white/5 relative overflow-hidden">
                        <div class="absolute inset-0 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                        
                        <img src="${cert.imagen}" alt="Logo ${cert.titulo}" class="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                    </div>

                    <div class="md:w-2/3 lg:w-3/4 p-6 md:p-8 flex flex-col justify-center">
                        
                        <div class="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 mb-4">
                            <div>
                                <h3 class="text-2xl md:text-3xl font-black text-orient-950 dark:text-white group-hover:text-orient-900 transition-colors leading-tight">${cert.titulo}</h3>
                                <p class="text-base font-bold text-primary dark:text-orient-200 mt-1">${cert.emisor}</p>
                            </div>
                            
                            <span class="inline-flex items-center gap-1.5 px-4 py-2 bg-orient-50 dark:bg-orient-900/50 text-orient-700 dark:text-orient-300 text-xs font-bold uppercase tracking-widest rounded-xl border border-orient-200 dark:border-white/5 shrink-0">
                                <span class="material-symbols-outlined text-base text-primary">event_available</span>
                                ${cert.fecha}
                            </span>
                        </div>

                        <p class="text-sm md:text-base text-orient-600 dark:text-white leading-relaxed mb-8">
                            ${cert.descripcion}
                        </p>

                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-auto pt-6 border-t border-orient-100 dark:border-orient-600">
                            <div class="flex-1">
                                <p class="text-[10px] font-black uppercase tracking-widest text-orient-400 dark:text-orient-200 mb-1">
                                    Habilidades Validadas
                                </p>
                                <p class="text-sm font-bold text-orient-800 dark:text-white">
                                    ${cert.habilidades}
                                </p>
                            </div>
                            
                            <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-primary px-6 py-3 rounded-xl hover:bg-primary-vibrant transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 shrink-0 w-full sm:w-auto">
                                <span class="material-symbols-outlined text-lg">verified</span>
                                Verificar Credencial
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        `;
    });

    timelineContainer.innerHTML = htmlContent;
});