import { ReactNode } from "react";

export interface SectionProps {
  /** Contenido del bloque. */
  children: ReactNode;
  /** Clases CSS adicionales para el wrapper. */
  className?: string;
  /** ID para anclas y accesibilidad. */
  id?: string;
}

/**
 * Wrapper reutilizable con padding y container max-width.
 * Mobile-first: padding y ancho responsivos.
 */
export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 max-w-7xl mx-auto ${className}`.trim()}
    >
      {children}
    </section>
  );
}
