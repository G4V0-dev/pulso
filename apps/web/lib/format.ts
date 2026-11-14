import type { Plan } from "@/lib/constants";

/** Formatea el precio mensual de un plan. null = "Hablemos". */
export function formatPlanPrice(plan: Plan): { amount: string; suffix?: string } {
  if (plan.priceMonthly === null) {
    return { amount: "Hablemos" };
  }
  if (plan.priceMonthly === 0) {
    return { amount: "$0", suffix: "/mes" };
  }
  return { amount: `$${plan.priceMonthly}`, suffix: "/usuario/mes" };
}
