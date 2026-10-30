/*
 * Utilidades de texto del hero y la banda (E40-I01): énfasis de los párrafos, cifra de
 * certificaciones y números con separador de miles.
 */
import { langCodes, type Lang } from '../../i18n/lang';
import { certificationCount } from '../../data/certifications';

export interface TextPart {
  text: string;
  strong: boolean;
}

/** Parte `**texto**` en segmentos con y sin énfasis (el contenido no lleva HTML). */
export const parseEmphasis = (source: string): TextPart[] =>
  source
    .split('**')
    .map((text, index) => ({ text, strong: index % 2 === 1 }))
    .filter((part) => part.text !== '');

/**
 * Reemplaza `{certifications}` por la cifra derivada de los datos (ADR-053): el número
 * exacto bajo 10 y "más de N" desde 10.
 */
export const fillCertificationCount = (source: string, moreThan: string): string => {
  const { value, plus } = certificationCount();
  return source.replaceAll('{certifications}', plus ? `${moreThan} ${value}` : String(value));
};

/** Número con separador de miles según el idioma (es-CL "2.000", en-US "2,000"). */
export const formatNumber = (value: number, lang: Lang): string =>
  new Intl.NumberFormat(langCodes[lang], { useGrouping: 'always' }).format(value);
