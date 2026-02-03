import type { Plan } from "@/lib/constants";

export interface PricingTableProps {
  /** Lista de planes a mostrar. */
  plans: Plan[];
}

/**
 * Tabla de precios en cards.
 * Destaca visualmente el plan con pro: true.
 */
export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Planes de precios"
    >
      {plans.map((plan) => (
        <article
          key={plan.id}
          role="listitem"
          className={`rounded-2xl border-2 p-6 shadow-sm transition-shadow hover:shadow-md ${
            plan.pro
              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
              : "border-slate-200 bg-white"
          }`}
        >
          {plan.pro && (
            <span
              className="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white mb-4"
              aria-hidden
            >
              Recomendado
            </span>
          )}
          <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{plan.description}</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            {plan.price}
            {plan.price !== "Contactar" && (
              <span className="text-base font-normal text-slate-500">/mes</span>
            )}
          </p>
          <ul className="mt-6 space-y-3" role="list">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-slate-700"
                role="listitem"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
