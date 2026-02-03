import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("muestra el CTA principal cuando hay ctaPrimary y whatsappNumber", () => {
    render(
      <Hero
        title="Test"
        ctaPrimary="Hablar por WhatsApp"
        whatsappNumber="5491112345678"
      />
    );
    const primaryCta = screen.getByRole("link", { name: /abrir whatsapp: hablar por whatsapp/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute("href", "https://wa.me/5491112345678");
  });

  it("muestra el CTA secundario cuando se pasa ctaSecondary", () => {
    render(
      <Hero
        title="Test"
        ctaSecondary="Ver planes"
      />
    );
    const secondaryCta = screen.getByRole("link", { name: /ver planes/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute("href", "#pricing");
  });

  it("no muestra CTAs cuando no se pasan ctaPrimary/ctaSecondary o whatsappNumber", () => {
    render(<Hero title="Solo título" />);
    expect(screen.getByRole("heading", { name: /solo título/i })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
