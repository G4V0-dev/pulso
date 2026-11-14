import Link from "next/link";
import type { Plan } from "@/lib/constants";
import { formatPlanPrice } from "@/lib/format";
import { cn } from "@/lib/links";
import { CheckIcon } from "@/components/icons";

export interface PricingTableProps {
  /** Lista de planes a mostrar. */
  plans: Plan[];
}

/**
 * Tabla de precios en cards.
 * Destaca visualmente el plan con featured: true y alinea los CTAs al pie.
 */
export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div
      className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Planes de precios"
    >
      {plans.map((plan) => {
        const price = formatPlanPrice(plan);

        return (
          <article
            key={plan.id}
            role="listitem"
            className={cn(
              "relative flex h-full flex-col rounded-2xl border bg-white p-7 transition-shadow",
              plan.featured
                ? "border-brand-500 shadow-card-hover ring-1 ring-brand-500/20 lg:-my-2 lg:py-9"
                : "border-ink-200 shadow-card",
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Más popular
              </span>
            )}

            <h3 className="text-lg font-semibold text-ink-900">{plan.name}</h3>
            <p className="mt-1 min-h-[2.5rem] text-sm text-ink-500">{plan.description}</p>

            <p className="mt-6 flex flex-wrap items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-ink-900">
                {price.amount}
              </span>
              {price.suffix && (
                <span className="text-sm font-normal text-ink-500">{price.suffix}</span>
              )}
            </p>

            <ul className="mt-7 flex-1 space-y-3" role="list">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-ink-700"
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full",
                      plan.featured
                        ? "bg-brand-600 text-white"
                        : "bg-brand-50 text-brand-600",
                    )}
                    aria-hidden="true"
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref}
              className={cn(
                "mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                plan.featured
                  ? "bg-brand-600 text-white shadow-sm hover:bg-brand-700"
                  : "border border-ink-300 bg-white text-ink-800 hover:bg-ink-50",
              )}
              aria-label={`${plan.cta} — plan ${plan.name}`}
            >
              {plan.cta}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
