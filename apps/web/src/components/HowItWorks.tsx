import { Section, SectionHeader } from "@/components/Section";
import { STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <div className="border-y border-ink-200 bg-white">
      <Section id="como-funciona" ariaLabel="Cómo funciona Pulso">
        <SectionHeader
          eyebrow="Cómo funciona"
          title="De la hoja de cálculo al tablero en una tarde"
          description="Sin consultores, sin migraciones eternas. Tres pasos y tu equipo ya está trabajando dentro."
        />

        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-gradient-to-r from-brand-200 to-transparent md:block"
                  />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
