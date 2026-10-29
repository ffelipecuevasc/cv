/*
 * Frases del renglón 2 del logotipo, en ciclo circular (DESIGN.md 3.3, ADR-049).
 * es-CL: fijadas en DESIGN.md. en-US: propuestas por el agente en E30-I03; Felipe las
 * valida (ADR-017). Ambas listas deben tener el mismo largo (paridad).
 */
import type { Lang } from '../../i18n/lang';

export const logoPhrases = {
  es: ['Instructor Dev', 'Dev Full Stack', 'Instructor IA'],
  en: ['Dev Instructor', 'Full Stack Dev', 'AI Instructor'],
} as const satisfies Record<Lang, readonly [string, string, string]>;
