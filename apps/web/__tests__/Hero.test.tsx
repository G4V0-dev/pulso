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

  it("muestra el link a #signup cuando se pasa ctaSignup", () => {
    render(<Hero title="Test" ctaSignup="Prueba gratis 14 días" />);
    const link = screen.getByRole("link", { name: /prueba gratis 14 días/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#signup");
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

  it("usa dos capas de gradiente oscuras sobre la escena, no blancas", () => {
    const { container } = render(<Hero title="Test" />);
    const classesOf = (el: Element) =>
      (el.getAttribute("class") ?? "").split(/\s+/).filter(Boolean);
    const withClass = (token: string) =>
      Array.from(container.querySelectorAll("div")).filter((el) =>
        classesOf(el).includes(token),
      );

    const horizontal = withClass("bg-gradient-to-r");
    const vertical = withClass("bg-gradient-to-b");

    expect(horizontal).toHaveLength(1);
    expect(vertical).toHaveLength(1);

    for (const layer of [horizontal[0], vertical[0]]) {
      expect(layer.className).toContain("pointer-events-none");
      expect(layer.className).toContain("absolute");
      expect(layer.className).toContain("inset-0");
      expect(layer.className).toContain("-z-10");
      expect(layer.className).not.toContain("from-white");
      expect(layer.className).not.toContain("via-white");
    }

    // Capa horizontal: protege la columna de texto a la izquierda.
    expect(horizontal[0].className).toContain("from-ink-950");
    expect(horizontal[0].className).toContain("via-ink-950/80");
    expect(horizontal[0].className).toContain("to-transparent");

    // Capa vertical suave encima de la horizontal.
    expect(vertical[0].className).toContain("from-ink-950/60");
    expect(vertical[0].className).toContain("via-transparent");
    expect(vertical[0].className).toContain("to-ink-950");

    // Ambas capas se pintan por encima de la escena (más tarde en el DOM).
    const scene = container.querySelector(".opacity-100");
    expect(scene).not.toBeNull();
    const all = Array.from(container.querySelectorAll("div"));
    const sceneIndex = all.indexOf(scene as HTMLDivElement);
    expect(all.indexOf(horizontal[0])).toBeGreaterThan(sceneIndex);
    expect(all.indexOf(vertical[0])).toBeGreaterThan(sceneIndex);
  });

  it("deja la escena a opacity-100 y no la apaga con opacity-90", () => {
    const { container } = render(<Hero title="Test" />);

    expect(container.querySelector(".opacity-100")).not.toBeNull();
    expect(container.querySelector(".opacity-90")).toBeNull();
  });

  it("muestra las métricas cuando se pasan stats", () => {
    render(<Hero title="Test" stats={[{ value: "3", label: "vistas de tablero" }]} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getAllByText(/vistas de tablero/i)).not.toHaveLength(0);
  });
});
