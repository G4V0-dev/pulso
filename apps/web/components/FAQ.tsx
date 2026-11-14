import { Section, SectionHeader } from "@/components/Section";
import { FAQS } from "@/lib/constants";

export function FAQ() {
  return (
    <div className="border-y border-ink-200 bg-white">
      <Section id="faq" ariaLabel="Preguntas frecuentes">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader
            align="left"
            eyebrow="FAQ"
            title="Preguntas frecuentes"
            description="Si te queda alguna duda, escríbenos y te responde una persona del equipo, no un bot."
          />

          <div className="divide-y divide-ink-200 border-y border-ink-200">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-left text-base font-medium text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition-transform group-open:rotate-45"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-prose pr-10 text-sm leading-relaxed text-ink-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
