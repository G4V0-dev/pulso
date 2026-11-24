"use client";

import { FormEvent, useId, useState } from "react";
import { PLANS } from "@/lib/constants";
import { CheckIcon } from "@/components/icons";

const BENEFITS = [
  "14 días de Pro sin tarjeta de crédito",
  "Importa tus proyectos desde Trello, Asana o CSV",
  "Invita a todo el equipo desde el primer día",
  "Soporte humano por chat y WhatsApp",
];

interface Errors {
  nombre?: string;
  email?: string;
}

export function SignupForm({ defaultPlan = "pro" }: { defaultPlan?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const planId = useId();
  const errorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const nextErrors: Errors = {};

    if (nombre.length < 2) nextErrors.nombre = "Escribe tu nombre completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Escribe un email válido, por ejemplo nombre@empresa.com.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      (form.elements.namedItem(firstField) as HTMLInputElement | null)?.focus();
      return;
    }

    // Demo sin backend: el formulario valida en cliente y no envía correos.
    // Punto de integración para producción: POST a /api/signup.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-ink-900">Solicitud registrada</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-600">
          Esta es una demo de portafolio: no se envía ningún correo ni se crea una cuenta
          real. En producción, aquí recibirías el enlace de activación.
        </p>
        <a
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-ink-700">
          Nombre completo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? `${errorId}-nombre` : undefined}
          className="w-full rounded-lg border border-ink-300 px-3.5 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 aria-[invalid=true]:border-rose-500"
        />
        {errors.nombre && (
          <p
            id={`${errorId}-nombre`}
            role="alert"
            className="mt-1.5 text-sm text-rose-600"
          >
            {errors.nombre}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
          Email de trabajo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${errorId}-email` : undefined}
          className="w-full rounded-lg border border-ink-300 px-3.5 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 aria-[invalid=true]:border-rose-500"
        />
        {errors.email && (
          <p
            id={`${errorId}-email`}
            role="alert"
            className="mt-1.5 text-sm text-rose-600"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="empresa"
          className="mb-1.5 block text-sm font-medium text-ink-700"
        >
          Empresa <span className="font-normal text-ink-400">(opcional)</span>
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          className="w-full rounded-lg border border-ink-300 px-3.5 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor={planId} className="mb-1.5 block text-sm font-medium text-ink-700">
          Plan
        </label>
        <select
          id={planId}
          name="plan"
          defaultValue={
            PLANS.some((plan) => plan.id === defaultPlan) ? defaultPlan : "pro"
          }
          className="w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {PLANS.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
              {plan.priceMonthly === null
                ? " — a medida"
                : ` — $${plan.priceMonthly}/usuario/mes`}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Crear mi espacio de trabajo
      </button>

      <p className="text-center text-xs text-ink-500">
        Al continuar aceptas los términos del servicio y la política de privacidad.
      </p>
    </form>
  );
}

export function SignupBenefits() {
  return (
    <ul className="space-y-3">
      {BENEFITS.map((benefit) => (
        <li key={benefit} className="flex items-start gap-3 text-sm text-ink-700">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  );
}
