import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Hero } from "@/components/Hero";

describe("Hero", () => {
  it("renderiza título, subtítulo y eyebrow cuando se pasan", () => {
    render(
      <Hero eyebrow="Nuevo" title="Bienvenido" subtitle="Descripción del producto" />,
    );
    expect(screen.getByRole("heading", { name: /bienvenido/i })).toBeInTheDocument();
    expect(screen.getByText(/descripción del producto/i)).toBeInTheDocument();
    expect(screen.getByText(/nuevo/i)).toBeInTheDocument();
  });

  it("muestra el CTA WhatsApp cuando hay ctaWhatsApp y whatsappNumber", () => {
    render(
      <Hero
        title="Test"
        ctaWhatsApp="Hablar por WhatsApp"
        whatsappNumber="5491112345678"
      />,
    );
    const cta = screen.getByRole("link", {
      name: /abrir whatsapp: hablar por whatsapp/i,
    });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "https://wa.me/5491112345678");
  });

  it("incluye mensaje en el enlace WhatsApp cuando se pasa whatsappMessage", () => {
    render(
      <Hero
        title="Test"
        ctaWhatsApp="WhatsApp"
        whatsappNumber="573208112607"
        whatsappMessage="Hola, quiero una demo de Pulso"
      />,
    );
    const cta = screen.getByRole("link", { name: /abrir whatsapp: whatsapp/i });
    expect(cta).toHaveAttribute(
      "href",
      "https://wa.me/573208112607?text=Hola%2C%20quiero%20una%20demo%20de%20Pulso",
    );
  });

  it("muestra el link a /signup cuando se pasa ctaSignup", () => {
    render(<Hero title="Test" ctaSignup="Prueba gratis 14 días" />);
    const link = screen.getByRole("link", { name: /prueba gratis 14 días/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("enlaza el CTA secundario a #precios por defecto", () => {
    render(<Hero title="Test" ctaSecondary="Ver precios" />);
    const secondaryCta = screen.getByRole("link", { name: /ver precios/i });
    expect(secondaryCta).toHaveAttribute("href", "#precios");
  });

  it("abre el modal demo al hacer clic en ctaDemo", () => {
    render(<Hero title="Test" ctaDemo="Ver demo de 2 min" />);
    fireEvent.click(screen.getByRole("button", { name: /ver demo de 2 min/i }));
    expect(screen.getByRole("dialog", { name: /agenda una demo/i })).toBeInTheDocument();
  });

  it("cierra el modal demo con Escape", () => {
    render(<Hero title="Test" ctaDemo="Ver demo de 2 min" />);
    fireEvent.click(screen.getByRole("button", { name: /ver demo de 2 min/i }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("no muestra CTAs cuando no se pasan props de CTA", () => {
    render(<Hero title="Solo título" />);
    expect(screen.getByRole("heading", { name: /solo título/i })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("muestra las métricas cuando se pasan stats", () => {
    render(<Hero title="Test" stats={[{ value: "3", label: "vistas de tablero" }]} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getAllByText(/vistas de tablero/i)).not.toHaveLength(0);
  });
});
