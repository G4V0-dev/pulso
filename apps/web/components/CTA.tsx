export interface CTAProps {
  /** Texto del título de la sección. */
  title: string;
  /** Descripción o subtítulo. */
  description?: string;
  /** Texto del botón principal (WhatsApp). */
  buttonText?: string;
  /** Número WhatsApp (sin + ni espacios). */
  whatsappNumber?: string;
}

const whatsappUrl = (number: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}`;

/**
 * Bloque CTA final con botón WhatsApp y mensaje principal.
 */
export function CTA({
  title,
  description,
  buttonText = "Contactar por WhatsApp",
  whatsappNumber = "",
}: CTAProps) {
  const hasNumber = Boolean(whatsappNumber);

  return (
    <section
      className="text-center px-4 py-12 sm:py-16 bg-slate-100 rounded-2xl"
      aria-labelledby="cta-title"
    >
      <h2
        id="cta-title"
        className="text-2xl font-bold text-slate-900 sm:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">{description}</p>
      )}
      {hasNumber && (
        <a
          href={whatsappUrl(whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          aria-label={`Abrir WhatsApp: ${buttonText}`}
        >
          {buttonText}
        </a>
      )}
    </section>
  );
}
