"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export interface ModalSimpleProps {
  /** Si el modal está abierto. */
  isOpen: boolean;
  /** Callback al cerrar. */
  onClose: () => void;
  /** Título del modal. */
  title?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal con formulario (nombre, email, mensaje).
 * Accesible: cierra con Escape, atrapa el foco, bloquea el scroll y anuncia el éxito.
 */
export function ModalSimple({
  isOpen,
  onClose,
  title = "Agenda una demo",
}: ModalSimpleProps) {
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    firstFieldRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement)?.value,
    };

    // Punto de integración: aquí iría el POST a /api/demo.
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "demo_form_submit",
        form_name: "demo_modal",
        ...data,
      });
    }

    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 p-4 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-semibold text-ink-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Cerrar modal"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {submitted ? "Gracias, te contactaremos pronto." : ""}
        </p>

        {submitted ? (
          <div data-testid="demo-success" className="py-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path
                  d="m5 12 4.5 4.5L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="mt-4 font-medium text-ink-900">
              Gracias, te contactaremos pronto.
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Te escribimos al correo que dejaste en menos de 24 horas.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="demo-nombre"
                className="mb-1 block text-sm font-medium text-ink-700"
              >
                Nombre
              </label>
              <input
                ref={firstFieldRef}
                id="demo-nombre"
                name="nombre"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-ink-300 px-3 py-2 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label
                htmlFor="demo-email"
                className="mb-1 block text-sm font-medium text-ink-700"
              >
                Email
              </label>
              <input
                id="demo-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-ink-300 px-3 py-2 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label
                htmlFor="demo-mensaje"
                className="mb-1 block text-sm font-medium text-ink-700"
              >
                Mensaje
              </label>
              <textarea
                id="demo-mensaje"
                name="mensaje"
                rows={3}
                className="w-full resize-none rounded-lg border border-ink-300 px-3 py-2 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-ink-300 bg-white px-4 py-2 text-ink-700 hover:bg-ink-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
