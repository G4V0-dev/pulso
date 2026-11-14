import type { ReactNode } from "react";
import { cn } from "@/lib/links";

export interface SectionProps {
  /** Contenido del bloque. */
  children: ReactNode;
  /** Clases CSS adicionales para el wrapper. */
  className?: string;
  /** ID para anclas y accesibilidad. */
  id?: string;
  /** Etiqueta accesible que describe la sección. */
  ariaLabel?: string;
}

/**
 * Wrapper reutilizable con padding y container max-width.
 * Mobile-first: padding y ancho responsivos.
 */
export function Section({ children, className, id, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Alineación del bloque de cabecera. */
  align?: "left" | "center";
  /** ID del título para enlazarlo con aria-labelledby. */
  titleId?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  titleId,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className="text-balance text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-600">
          {description}
        </p>
      )}
    </div>
  );
}
