import { Section, SectionHeader } from "@/components/Section";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <Section ariaLabel="Testimonios de clientes">
      <SectionHeader
        eyebrow="Escenarios de ejemplo"
        title="Menos persecución, más entregas"
        description="Así describen el cambio los equipos que usan tableros, automatizaciones y reportes en su día a día."
      />

      <ul role="list" className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <li
            key={testimonial.author}
            className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
          >
            <div aria-hidden="true" className="flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
              <p>«{testimonial.quote}»</p>
            </blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700"
              >
                {testimonial.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{testimonial.author}</p>
                <p className="text-xs text-ink-500">{testimonial.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-xs text-ink-500">
        Testimonios y nombres ilustrativos para esta demo de portafolio.
      </p>
    </Section>
  );
}
