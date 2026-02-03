"use client";

import { FormEvent } from "react";

export interface ModalSimpleProps {
  /** Si el modal está abierto. */
  isOpen: boolean;
  /** Callback al cerrar. */
  onClose: () => void;
  /** Título del modal. */
  title?: string;
}

/**
 * Modal simple con formulario (nombre, email, mensaje).
 * Handlers: console.log y window.dataLayer.push si existe.
 */
export function ModalSimple({
  isOpen,
  onClose,
  title = "Agenda una demo",
}: ModalSimpleProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement)
        ?.value,
    };
    console.log("[ModalSimple] Form submit:", data);
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "demo_form_submit",
        form_name: "demo_modal",
        ...data,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Cerrar modal"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="demo-nombre" className="block text-sm font-medium text-slate-700 mb-1">
              Nombre
            </label>
            <input
              id="demo-nombre"
              name="nombre"
              type="text"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="demo-email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="demo-email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="demo-mensaje" className="block text-sm font-medium text-slate-700 mb-1">
              Mensaje
            </label>
            <textarea
              id="demo-mensaje"
              name="mensaje"
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
