/*
 * Certificaciones profesionales (E40-I01, ADR-053). Fuente única de la cifra que muestra el
 * sitio: la portada la deriva de este arreglo y no escribe ninguna cifra a mano (AT-014).
 *
 * Para agregar una certificación, basta sumar un objeto a `certifications`: el conteo, la
 * cifra del hero y el párrafo del perfil Desarrollador se actualizan solos. E50-I02 amplía
 * cada entrada (categoría, descripción) sobre este mismo arreglo, sin cambiar su forma base.
 * Los nombres son nombres propios y no se traducen (ADR-025).
 */

export type CertificationIssuer = 'oracle' | 'aws' | 'python-institute' | 'anthropic';

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
  },
  {
    id: 'aws-cloud',
    name: 'AWS Cloud Practitioner',
    issuer: 'aws',
    issuedAt: '2026-01',
    url: 'https://www.credly.com/badges/2d45672a-48b4-4013-808f-31c04072bb73/public_url',
  },
  {
    id: 'aws-ai',
    name: 'AWS AI Practitioner',
    issuer: 'aws',
    issuedAt: '2026-01',
    url: 'https://www.credly.com/badges/c988f3a8-7022-43cb-9d65-9aa24e88f97f/public_url',
  },
  {
    id: 'python-pcep',
    name: 'Python Institute PCEP',
    issuer: 'python-institute',
    issuedAt: '2025-12',
    url: 'https://verify.openedg.org/?id=X8Wv.TU7j.416N',
  },
  {
    id: 'oracle-data-pro',
    name: 'Oracle Data Science Professional',
    issuer: 'oracle',
    issuedAt: '2025-10',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=49DC655EC45500898B6310E36C9CF5ABC57B48F1BACA784ED3E296BDEFCC3F98',
  },
  {
    id: 'oracle-dev-pro',
    name: 'Oracle Developer Professional',
    issuer: 'oracle',
    issuedAt: '2025-09',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=4D11E3EE49FE3FEA9B35687602B2C0DC19F0E7199C4AF982770081E4BDC783B5',
  },
  {
    id: 'oracle-ai-assoc',
    name: 'Oracle AI Associate',
    issuer: 'oracle',
    issuedAt: '2025-09',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D2718C25F892B7E4971471C86FD8B46CB74494922FE11EA5F7CBAB9A064CB45F',
  },
  {
    id: 'oracle-ai-pro',
    name: 'Oracle AI Professional',
    issuer: 'oracle',
    issuedAt: '2025-08',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6582C447AEECF465B74B30D01D884790D1DED49B9AE05C578BE6FC5F87FE6F81',
  },
  {
    id: 'oracle-oci-assoc',
    name: 'Oracle OCI Associate',
    issuer: 'oracle',
    issuedAt: '2025-08',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=FF54D5ABED5E9CB3DC9911C38388286977EA4716538312B45208B541F980CEB9',
  },
  {
    id: 'claude-developer-foundations',
    name: 'Claude Certified Developer – Foundations',
    issuer: 'anthropic',
    issuedAt: '2026-10-30',
    expiresAt: '2027-10-30',
    url: 'https://www.credly.com/badges/4611d265-46a0-47e7-a03d-14b026828e2d/public_url',
  },
  {
    id: 'oracle-agentic-ai-foundations',
    name: 'Agentic AI Certified Foundations Associate',
    issuer: 'oracle',
    code: '1Z0-1157-26',
    issuedAt: '2026-10-30',
    expiresAt: '2028-10-30',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=CB0A36191B4730C4946D526E49D1F327469DE1372376326DD6823DBA36E29D50',
  },
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
