/*
 * Certificaciones profesionales (E40-I01, ADR-053). Fuente única de la cifra que muestra el
 * sitio: la portada la deriva de este arreglo y no escribe ninguna cifra a mano (AT-014).
 *
 * Para agregar una certificación, basta sumar un objeto a `certifications`: el conteo, la
 * cifra del hero y el párrafo del perfil Desarrollador se actualizan solos. E50-I02 amplía
 * cada entrada (categoría, insignia, habilidades y descripción es/en) sobre este mismo arreglo.
 * La cifra cuenta todas las entradas: no se filtran vencimientos (ADR-061, AT-067).
 * Los nombres son nombres propios y no se traducen (ADR-025).
 */

export type CertificationIssuer = 'oracle' | 'aws' | 'python-institute' | 'anthropic';

/** Categoría de la franja temática de Educación (E50-I02, ADR-036, ADR-061). */
export type CertificationCategory = 'ai' | 'cloud' | 'dev-data';

/** Texto con paridad es-CL / en-US (ADR-001). Los textos `en` los valida Felipe (ADR-017). */
export interface CertificationText {
  es: string;
  en: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: CertificationIssuer;
  /** Código del examen, si el emisor lo publica. */
  code?: string;
  /** Fecha de emisión (AAAA-MM o AAAA-MM-DD). */
  issuedAt: string;
  /** Fecha de vencimiento (AAAA-MM-DD), si la credencial vence. */
  expiresAt?: string;
  /** Enlace público de verificación. */
  url: string;
  /** Franja de Educación en la que se muestra (ADR-061). */
  category: CertificationCategory;
  /**
   * Nombre del archivo de la insignia en src/assets/badges/, sin extensión. `null` si aún no
   * existe: la página usa la insignia del emisor como marcador (AT-077).
   */
  badge: string | null;
  /** Habilidades validadas, en una línea. */
  skills: CertificationText;
  description: CertificationText;
}

// Las 9 primeras vienen de main:static/js/datos/certificaciones.datos.js (fechas al mes);
// las 2 últimas las agregó Felipe el 30-10-2026.
export const certifications: readonly Certification[] = [
  {
    id: 'aws-developer',
    name: 'AWS Developer Associate',
    issuer: 'aws',
    issuedAt: '2026-04',
    url: 'https://www.credly.com/badges/356ec70b-b54a-47f3-9966-8ac8e1552913/public_url',
    category: 'cloud',
    badge: 'aws_developer_associate',
    skills: {
      es: 'Desarrollo Cloud, Serverless, APIs, CI/CD',
      en: 'Cloud Development, Serverless, APIs, CI/CD',
    },
    description: {
      es: 'Certificación clave que acredita mi capacidad técnica para desarrollar, desplegar y depurar aplicaciones nativas de la nube en AWS. Valida mi dominio en el uso de las APIs de AWS, servicios serverless (como Lambda y API Gateway) y gestión de bases de datos NoSQL, garantizando la creación de software seguro, escalable y optimizado para el ecosistema cloud.',
      en: 'A key certification that attests to my technical ability to develop, deploy and debug cloud-native applications on AWS. It validates my command of the AWS APIs, serverless services (such as Lambda and API Gateway) and NoSQL database management, ensuring secure, scalable software optimized for the cloud ecosystem.',
    },
  },
  {
    id: 'aws-cloud',
    name: 'AWS Cloud Practitioner',
    issuer: 'aws',
    issuedAt: '2026-01',
    url: 'https://www.credly.com/badges/2d45672a-48b4-4013-808f-31c04072bb73/public_url',
    category: 'cloud',
    badge: 'aws_cloud_practitioner',
    skills: {
      es: 'Infraestructura Global, Seguridad, Arquitectura Cloud',
      en: 'Global Infrastructure, Security, Cloud Architecture',
    },
    description: {
      es: 'Valida mi comprensión integral de la infraestructura global de AWS, sus servicios principales y los principios de seguridad en la nube. Esta credencial me permite diseñar soluciones resilientes y comunicar estrategias cloud efectivas tanto a nivel técnico como de negocio.',
      en: 'Validates my comprehensive understanding of the AWS global infrastructure, its core services and cloud security principles. This credential enables me to design resilient solutions and communicate effective cloud strategies at both the technical and business level.',
    },
  },
  {
    id: 'aws-ai',
    name: 'AWS AI Practitioner',
    issuer: 'aws',
    issuedAt: '2026-01',
    url: 'https://www.credly.com/badges/c988f3a8-7022-43cb-9d65-9aa24e88f97f/public_url',
    category: 'ai',
    badge: 'aws_ai_practitioner',
    skills: {
      es: 'Machine Learning, GenAI, Servicios Cognitivos AWS',
      en: 'Machine Learning, GenAI, AWS Cognitive Services',
    },
    description: {
      es: 'Acredita mi dominio en conceptos de Inteligencia Artificial y Machine Learning dentro del ecosistema AWS. Me faculta para identificar casos de uso de IA de alto impacto, seleccionar los modelos fundacionales adecuados y liderar la adopción de tecnologías disruptivas.',
      en: 'Attests to my command of Artificial Intelligence and Machine Learning concepts within the AWS ecosystem. It enables me to identify high-impact AI use cases, select the right foundation models and lead the adoption of disruptive technologies.',
    },
  },
  {
    id: 'python-pcep',
    name: 'Python Institute PCEP',
    issuer: 'python-institute',
    issuedAt: '2025-12',
    url: 'https://verify.openedg.org/?id=X8Wv.TU7j.416N',
    category: 'dev-data',
    badge: 'python_pcep',
    skills: {
      es: 'Sintaxis Core, Estructuras de Datos, POO',
      en: 'Core Syntax, Data Structures, OOP',
    },
    description: {
      es: 'Certifica conocimientos sólidos y formales en la semántica y la biblioteca estándar de Python. Garantiza mi capacidad para escribir código limpio, eficiente y mantenible, siendo el pilar algorítmico fundamental para mis desarrollos en backend y ciencia de datos.',
      en: 'Certifies solid, formal knowledge of Python semantics and its standard library. It backs my ability to write clean, efficient and maintainable code, the algorithmic foundation of my backend and data science work.',
    },
  },
  {
    id: 'oracle-data-pro',
    name: 'Oracle Data Science Professional',
    issuer: 'oracle',
    issuedAt: '2025-10',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=49DC655EC45500898B6310E36C9CF5ABC57B48F1BACA784ED3E296BDEFCC3F98',
    category: 'dev-data',
    badge: 'oracle_data_science_professional',
    skills: {
      es: 'Modelado Predictivo, OCI Data Science, MLOps',
      en: 'Predictive Modeling, OCI Data Science, MLOps',
    },
    description: {
      es: 'Demuestra experiencia avanzada en el ciclo de vida completo del Machine Learning usando Oracle Cloud Infrastructure (OCI). Avala mi capacidad para construir, entrenar, desplegar y gestionar flujos de modelos predictivos a escala empresarial.',
      en: 'Demonstrates advanced experience across the full Machine Learning lifecycle on Oracle Cloud Infrastructure (OCI). It backs my ability to build, train, deploy and manage predictive model pipelines at enterprise scale.',
    },
  },
  {
    id: 'oracle-dev-pro',
    name: 'Oracle Developer Professional',
    issuer: 'oracle',
    issuedAt: '2025-09',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=4D11E3EE49FE3FEA9B35687602B2C0DC19F0E7199C4AF982770081E4BDC783B5',
    category: 'dev-data',
    badge: 'oracle_developer_professional',
    skills: {
      es: 'Cloud Native, Microservicios, APIs RESTful',
      en: 'Cloud Native, Microservices, RESTful APIs',
    },
    description: {
      es: 'Valida habilidades de nivel experto en el desarrollo de aplicaciones nativas de la nube. Me certifica para diseñar arquitecturas de microservicios robustas y aplicaciones seguras y altamente escalables integradas a ecosistemas modernos.',
      en: 'Validates expert-level skills in cloud-native application development. It certifies me to design robust microservice architectures and secure, highly scalable applications integrated into modern ecosystems.',
    },
  },
  {
    id: 'oracle-ai-assoc',
    name: 'Oracle AI Associate',
    issuer: 'oracle',
    issuedAt: '2025-09',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D2718C25F892B7E4971471C86FD8B46CB74494922FE11EA5F7CBAB9A064CB45F',
    category: 'ai',
    badge: 'oracle_ai_associate',
    skills: {
      es: 'Visión Computacional, NLP, Servicios AI OCI',
      en: 'Computer Vision, NLP, OCI AI Services',
    },
    description: {
      es: 'Acredita competencias prácticas en la aplicación directa de Inteligencia Artificial. Me permite integrar servicios de IA preentrenados (como NLP y Visión) para desarrollar soluciones inteligentes que optimizan procesos y automatizan decisiones.',
      en: 'Attests to practical skills in applying Artificial Intelligence. It enables me to integrate pretrained AI services (such as NLP and Vision) to build intelligent solutions that streamline processes and automate decisions.',
    },
  },
  {
    id: 'oracle-ai-pro',
    name: 'Oracle AI Professional',
    issuer: 'oracle',
    issuedAt: '2025-08',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6582C447AEECF465B74B30D01D884790D1DED49B9AE05C578BE6FC5F87FE6F81',
    category: 'ai',
    badge: 'oracle_ai_professional',
    skills: {
      es: 'IA Generativa, LLMs, Fine-Tuning, Prompt Engineering',
      en: 'Generative AI, LLMs, Fine-Tuning, Prompt Engineering',
    },
    description: {
      es: 'Certificación de élite que valida el dominio absoluto en Inteligencia Artificial Generativa. Demuestra mi capacidad para arquitectar, implementar y realizar fine-tuning a Modelos de Lenguaje Grande (LLMs) resolviendo desafíos empresariales complejos con IA de vanguardia.',
      en: 'An elite certification that validates full command of Generative Artificial Intelligence. It demonstrates my ability to architect, implement and fine-tune Large Language Models (LLMs) to solve complex business challenges with cutting-edge AI.',
    },
  },
  {
    id: 'oracle-oci-assoc',
    name: 'Oracle OCI Associate',
    issuer: 'oracle',
    issuedAt: '2025-08',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=FF54D5ABED5E9CB3DC9911C38388286977EA4716538312B45208B541F980CEB9',
    category: 'cloud',
    badge: 'oracle_cloud_associate',
    skills: {
      es: 'Networking, Compute, Bases de Datos Autónomas',
      en: 'Networking, Compute, Autonomous Databases',
    },
    description: {
      es: 'Confirma un sólido entendimiento operativo de los servicios core de Oracle Cloud Infrastructure. Me habilita para provisionar redes virtuales seguras, gestionar bases de datos autónomas y asegurar el rendimiento de aplicaciones críticas en la nube.',
      en: 'Confirms a solid operational understanding of Oracle Cloud Infrastructure core services. It enables me to provision secure virtual networks, manage autonomous databases and ensure the performance of critical cloud applications.',
    },
  },
  {
    id: 'claude-developer-foundations',
    name: 'Claude Certified Developer – Foundations',
    issuer: 'anthropic',
    issuedAt: '2026-10-30',
    expiresAt: '2027-10-30',
    url: 'https://www.credly.com/badges/4611d265-46a0-47e7-a03d-14b026828e2d/public_url',
    category: 'ai',
    badge: null,
    skills: {
      es: 'Claude API, Prompt Engineering, Uso de Herramientas, Agentes',
      en: 'Claude API, Prompt Engineering, Tool Use, Agents',
    },
    description: {
      es: 'Acredita los fundamentos para construir aplicaciones con los modelos Claude de Anthropic: uso de la API, diseño de prompts, uso de herramientas y flujos con agentes, con atención a la seguridad y a la evaluación de los resultados.',
      en: "Attests to the fundamentals of building applications with Anthropic's Claude models: API usage, prompt design, tool use and agentic workflows, with attention to safety and to evaluating results.",
    },
  },
  {
    id: 'oracle-agentic-ai-foundations',
    name: 'Agentic AI Certified Foundations Associate',
    issuer: 'oracle',
    code: '1Z0-1157-26',
    issuedAt: '2026-10-30',
    expiresAt: '2028-10-30',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=CB0A36191B4730C4946D526E49D1F327469DE1372376326DD6823DBA36E29D50',
    category: 'ai',
    badge: null,
    skills: {
      es: 'IA Agéntica, Agentes, Orquestación, OCI',
      en: 'Agentic AI, Agents, Orchestration, OCI',
    },
    description: {
      es: 'Valida los fundamentos de la IA agéntica en Oracle: conceptos de agentes, orquestación de herramientas y flujos autónomos, y su aplicación responsable en soluciones empresariales.',
      en: 'Validates the fundamentals of agentic AI at Oracle: agent concepts, tool orchestration and autonomous workflows, and their responsible use in business solutions.',
    },
  },
];

/** Orden de las franjas de Educación (ADR-061). */
export const certificationCategories: readonly CertificationCategory[] = [
  'ai',
  'cloud',
  'dev-data',
];

export interface CountDisplay {
  /** Número que se imprime. */
  value: number;
  /** `true` si el número es un piso y se muestra con "+" (ADR-053). */
  plus: boolean;
}

/**
 * Regla de la cifra (ADR-053): menos de 10 → el número exacto; desde 10 → "+" y el
 * múltiplo de 10 hacia abajo (9 → 9, 10 → +10, 11 → +10, 19 → +10, 20 → +20).
 */
export const getCountDisplay = (count: number): CountDisplay =>
  count < 10 ? { value: count, plus: false } : { value: Math.floor(count / 10) * 10, plus: true };

/** Cifra de certificaciones del sitio, derivada de `certifications`. */
export const certificationCount = (): CountDisplay => getCountDisplay(certifications.length);
