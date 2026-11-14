import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm, SignupBenefits } from "@/components/SignupForm";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description:
    "Crea tu espacio de trabajo en Pulso. 14 días de prueba del plan Pro sin tarjeta de crédito.",
};

interface SignupPageProps {
  searchParams: { plan?: string | string[] };
}

export default function SignupPage({ searchParams }: SignupPageProps) {
  const plan = Array.isArray(searchParams.plan)
    ? searchParams.plan[0]
    : searchParams.plan;

  return (
    <main id="contenido" className="bg-ink-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Prueba gratis 14 días
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Crea el espacio de trabajo de tu equipo
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-600">
            Sin tarjeta, sin instalación y sin llamadas de ventas. Configuras el primer
            tablero en menos de cinco minutos.
          </p>

          <div className="mt-8">
            <SignupBenefits />
          </div>

          <div className="mt-10 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="text-sm leading-relaxed text-ink-600">
              «Migramos 14 proyectos en una tarde. Al día siguiente ya estábamos
              trabajando con reportes reales.»
            </p>
            <p className="mt-3 text-sm font-semibold text-ink-900">Sofía Vargas</p>
            <p className="text-xs text-ink-500">Operations Lead, Nube</p>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Logo />
            <Link
              href="/"
              className="text-sm font-medium text-ink-500 hover:text-ink-800"
            >
              ← Volver
            </Link>
          </div>
          <SignupForm defaultPlan={plan} />
        </div>
      </div>
    </main>
  );
}
