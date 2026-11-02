/*
 * Horas de cada plan formativo de Talento Digital para Chile (E100-I01). Es la única fuente: la
 * leen las franjas de Talento Digital y los planes SENCE de Instructor (PF1163), para que una
 * página no contradiga a la otra. `verify:seo` compara ambas páginas.
 */
export const TRAINING_PLAN_HOURS = {
  PF1162: 480,
  PF1487: 207,
  PF1164: 462,
  PF1479: 475,
  PF1163: 472,
} as const;

export type PlanCode = keyof typeof TRAINING_PLAN_HOURS;

export const PLAN_CODES = Object.keys(TRAINING_PLAN_HOURS) as [PlanCode, ...PlanCode[]];

/** Reemplaza «{hours}» por las horas del plan. */
export const withPlanHours = (text: string, plan: PlanCode | undefined): string =>
  plan ? text.replaceAll('{hours}', String(TRAINING_PLAN_HOURS[plan])) : text;
