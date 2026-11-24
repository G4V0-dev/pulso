import { Section, SectionHeader } from "@/components/Section";
import { FeatureIcon } from "@/components/icons";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <Section id="producto" ariaLabel="Funciones del producto">
      <SectionHeader
        eyebrow="Producto"
        title="Todo el trabajo del equipo, sin el ruido"
        description="Las herramientas que usas a diario dejan de competir entre sí. Pulso une planificación, ejecución y seguimiento en un mismo lugar."
      />

      <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <FeatureIcon name={feature.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-ink-900">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
