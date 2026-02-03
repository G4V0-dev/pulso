import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Hero } from "@/components/Hero";

describe("Hero", () => {
  it("renderiza título y subtítulo cuando se pasan", () => {
    render(
      <Hero
        title="Bienvenido"
        subtitle="Descripción del producto"
      />
    );
    expect(screen.getByRole("heading", { name: /bienvenido/i })).toBeInTheDocument();
    expect(screen.getByText(/descripción del producto/i)).toBeInTheDocument();
  });

  it("muestra el CTA WhatsApp cuando hay ctaWhatsApp y whatsappNumber", () => {
    render(
      <Hero
        title="Test"
        ctaWhatsApp="Hablar por WhatsApp"
        whatsappNumber="5491112345678"
      />
    );
    const cta = screen.getByRole("link", { name: /abrir whatsapp: hablar por whatsapp/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "https://wa.me/5491112345678");
  });

  it("incluye mensaje en el enlace WhatsApp cuando se pasa whatsappMessage", () => {
    render(
      <Hero
        title="Test"
        ctaWhatsApp="WhatsApp"
        whatsappNumber="573208112607"
        whatsappMessage="estoy interesado en la pagina web para mi negocio"
      />
    );
    const cta = screen.getByRole("link", { name: /abrir whatsapp: whatsapp/i });
    expect(cta).toHaveAttribute(
      "href",
      "https://wa.me/573208112607?text=estoy%20interesado%20en%20la%20pagina%20web%20para%20mi%20negocio"
    );
  });

  it("muestra el link a /signup cuando se pasa ctaSignup", () => {
    render(
      <Hero title="Test" ctaSignup="Prueba gratis 7 días" />
    );
    const link = screen.getByRole("link", { name: /prueba gratis 7 días/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("muestra el CTA secundario cuando se pasa ctaSecondary", () => {
    render(
      <Hero title="Test" ctaSecondary="Ver planes" />
    );
    const secondaryCta = screen.getByRole("link", { name: /ver planes/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute("href", "#pricing");
  });

  it("abre el modal demo al hacer clic en ctaDemo", () => {
    render(<Hero title="Test" ctaDemo="Agenda demo" />);
    const demoBtn = screen.getByRole("button", { name: /agenda demo/i });
    expect(demoBtn).toBeInTheDocument();
    fireEvent.click(demoBtn);
    expect(screen.getByRole("dialog", { name: /agenda una demo/i })).toBeInTheDocument();
  });

  it("no muestra CTAs cuando no se pasan props de CTA", () => {
    render(<Hero title="Solo título" />);
    expect(screen.getByRole("heading", { name: /solo título/i })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
