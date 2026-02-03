import { ReactNode } from "react";

export interface HeroProps {
  /** Título principal. */
  title: string;
  /** Subtítulo o descripción. */
  subtitle?: string;
  /** Texto del botón CTA principal. */
  ctaPrimary?: string;
  /** Texto del botón CTA secundario. */
  ctaSecondary?: string;
  /** Número WhatsApp (sin + ni espacios) para enlaces. */
  whatsappNumber?: string;
  /** Contenido opcional bajo los CTAs. */
  children?: ReactNode;
}

const whatsappUrl = (number: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}`;

/**
 * Hero accesible y mobile-first.
 * Incluye CTAs opcionales con enlace a WhatsApp.
 */
export function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  whatsappNumber = "",
}: HeroProps) {
  const hasPrimary = Boolean(ctaPrimary && whatsappNumber);
  const hasSecondary = Boolean(ctaSecondary);

  return (
    <header className="text-center px-4 py-12 sm:py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-600 sm:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        {hasPrimary && (
          <a
            href={whatsappUrl(whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
            aria-label={`Abrir WhatsApp: ${ctaPrimary}`}
          >
            {ctaPrimary}
          </a>
        )}
        {hasSecondary && (
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors w-full sm:w-auto"
            aria-label={ctaSecondary}
          >
            {ctaSecondary}
          </a>
        )}
      </div>
    </header>
  );
}
