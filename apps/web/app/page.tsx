import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { PricingTable } from "@/components/PricingTable";
import { CTA } from "@/components/CTA";
import { PLANS, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Bienvenido a la app"
        subtitle="Next.js + TypeScript + TailwindCSS (App Router)"
        ctaPrimary="Hablar por WhatsApp"
        ctaSecondary="Ver planes"
        whatsappNumber={DEFAULT_WHATSAPP_NUMBER}
      />
      <Section id="pricing">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
          Planes
        </h2>
        <PricingTable plans={PLANS} />
      </Section>
      <Section>
        <CTA
          title="¿Listo para empezar?"
          description="Contáctanos por WhatsApp y te respondemos al instante."
          buttonText="Contactar por WhatsApp"
          whatsappNumber={DEFAULT_WHATSAPP_NUMBER}
        />
      </Section>
    </main>
  );
}
