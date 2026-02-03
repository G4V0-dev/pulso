import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingTable } from "@/components/PricingTable";
import { PLANS } from "@/lib/constants";

describe("PricingTable", () => {
  it("renderiza 3 planes", () => {
    render(<PricingTable plans={PLANS} />);
    expect(screen.getByRole("list", { name: /planes de precios/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /starter/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pro/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /enterprise/i })).toBeInTheDocument();
    const planCards = screen.getAllByRole("listitem").filter(
      (el) => (el as HTMLElement).tagName === "ARTICLE"
    );
    expect(planCards).toHaveLength(3);
  });

  it("muestra el botón Empezar en cada plan", () => {
    render(<PricingTable plans={PLANS} />);
    const buttons = screen.getAllByRole("button", { name: /empezar/i });
    expect(buttons).toHaveLength(3);
    buttons.forEach((btn) => {
      expect(btn).toHaveTextContent("Empezar");
    });
  });

  it("coincide con el snapshot de la estructura", () => {
    const { container } = render(<PricingTable plans={PLANS} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
