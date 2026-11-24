import { Hero } from "@/components/Hero";
import { SignupSection } from "@/components/SignupSection";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Section, SectionHeader } from "@/components/Section";
import { PricingTable } from "@/components/PricingTable";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import {
  HERO_STATS,
  PLANS,
  DEFAULT_WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/constants";

export function Home() {
  return (
    <main id="contenido">
      <Hero
        eyebrow="Nuevo · Automatizaciones con IA"
        title="Tus proyectos, tu equipo y tus plazos. Por fin en un solo lugar."
        subtitle="Pulso reúne tableros, tareas, documentos y reportes para que tu equipo deje de perseguir estados por chat y empiece a entregar."
        ctaSignup="Prueba gratis 14 días"
        ctaDemo="Ver demo de 2 min"
        ctaWhatsApp="Hablar por WhatsApp"
        ctaSecondary="Ver precios"
        whatsappNumber={DEFAULT_WHATSAPP_NUMBER}
        whatsappMessage={WHATSAPP_DEFAULT_MESSAGE}
        stats={HERO_STATS}
        showPreview
      />

      <Features />

      <HowItWorks />

      <Testimonials />

      <Section id="precios" ariaLabel="Planes y precios">
        <SectionHeader
          eyebrow="Precios"
          title="Empieza gratis, escala cuando el equipo crezca"
          description="Todos los planes incluyen tableros ilimitados y actualizaciones. Pagas solo por los usuarios activos, sin contratos anuales."
        />
        <PricingTable plans={PLANS} />
        <p className="mt-8 text-center text-xs text-ink-500">
          Precios en USD por usuario y mes, facturados mensualmente. Impuestos no
          incluidos. Cancela cuando quieras.
        </p>
      </Section>

      <SignupSection />

      <FAQ />

      <CTA
        title="Tu próximo sprint puede empezar hoy"
        description="Cuéntanos cómo trabaja tu equipo por WhatsApp y te mostramos cómo se vería dentro de Pulso. Sin compromiso."
        buttonText="Hablar con el equipo"
        whatsappNumber={DEFAULT_WHATSAPP_NUMBER}
        whatsappMessage={WHATSAPP_DEFAULT_MESSAGE}
      />
    </main>
  );
}
