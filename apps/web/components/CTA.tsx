import { whatsappUrl } from "@/lib/links";
import { ArrowRightIcon } from "@/components/icons";

export interface CTAProps {
  /** Texto del título de la sección. */
  title: string;
  /** Descripción o subtítulo. */
  description?: string;
  /** Texto del botón principal (WhatsApp). */
  buttonText?: string;
  /** Número WhatsApp (sin + ni espacios). */
  whatsappNumber?: string;
  /** Mensaje predefinido para el enlace (?text=). */
  whatsappMessage?: string;
  /** ID de ancla de la sección. */
  id?: string;
}

/**
 * Bloque CTA final con botón WhatsApp y mensaje principal.
 */
export function CTA({
  title,
  description,
  buttonText = "Contactar por WhatsApp",
  whatsappNumber = "",
  whatsappMessage = "",
  id = "contacto",
}: CTAProps) {
  const hasNumber = Boolean(whatsappNumber);

  return (
    <section id={id} className="px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="cta-title">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.35),transparent_60%),radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.18),transparent_50%)]"
        />
        <div className="relative">
          <h2
            id="cta-title"
            className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-ink-300">
              {description}
            </p>
          )}
          {hasNumber && (
            <a
              href={whatsappUrl(whatsappNumber, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir WhatsApp: ${buttonText}`}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-ink-950 shadow-lg shadow-black/20 transition-colors hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              {buttonText}
              <ArrowRightIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
