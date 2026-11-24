import { useEffect, useState } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { SignupForm, SignupBenefits } from "@/components/SignupForm";
import { parsePlanFromHash } from "@/lib/plan";

/**
 * Sección de registro de la landing.
 * Preselecciona el plan leyendo el hash (#signup?plan=<id>).
 */
export function SignupSection() {
  const [plan, setPlan] = useState<string>(() =>
    typeof window !== "undefined" ? parsePlanFromHash(window.location.hash) : "pro",
  );

  useEffect(() => {
    const onHashChange = () => {
      setPlan(parsePlanFromHash(window.location.hash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <Section id="signup" ariaLabel="Crear cuenta">
      <SectionHeader
        eyebrow="Empieza hoy"
        title="Crea tu espacio en Pulso"
        description="14 días de prueba del plan Pro, sin tarjeta."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <SignupForm defaultPlan={plan} />
        <SignupBenefits />
      </div>
    </Section>
  );
}
