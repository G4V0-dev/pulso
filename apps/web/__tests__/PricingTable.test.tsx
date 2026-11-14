import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PricingTable } from "@/components/PricingTable";
import { PLANS } from "@/lib/constants";

describe("PricingTable", () => {
  it("renderiza los 3 planes con sus nombres", () => {
    render(<PricingTable plans={PLANS} />);
    expect(screen.getByRole("list", { name: /planes de precios/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /starter/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pro/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /enterprise/i })).toBeInTheDocument();
    const planCards = screen
      .getAllByRole("listitem")
      .filter((element) => element.tagName === "ARTICLE");
    expect(planCards).toHaveLength(3);
  });

  it("destaca solo el plan marcado como featured", () => {
    render(<PricingTable plans={PLANS} />);
    expect(screen.getByText(/más popular/i)).toBeInTheDocument();
    expect(screen.getAllByText(/más popular/i)).toHaveLength(1);
  });

  it("formatea los precios según el tipo de plan", () => {
    render(<PricingTable plans={PLANS} />);

    const starter = screen.getByRole("heading", { name: /starter/i }).closest("article")!;
    const pro = screen.getByRole("heading", { name: /pro/i }).closest("article")!;
    const enterprise = screen
      .getByRole("heading", { name: /enterprise/i })
      .closest("article")!;

    expect(within(starter).getByText("$0")).toBeInTheDocument();
    expect(within(pro).getByText("$12")).toBeInTheDocument();
    // Precio y CTA comparten el texto en el plan a medida.
    expect(within(enterprise).getAllByText("Hablemos")).toHaveLength(2);
  });

  it("enlaza cada CTA al signup con el plan correspondiente", () => {
    render(<PricingTable plans={PLANS} />);
    expect(
      screen.getByRole("link", { name: /empezar gratis — plan starter/i }),
    ).toHaveAttribute("href", "/signup?plan=starter");
    expect(
      screen.getByRole("link", { name: /prueba pro 14 días — plan pro/i }),
    ).toHaveAttribute("href", "/signup?plan=pro");
    expect(
      screen.getByRole("link", { name: /hablemos — plan enterprise/i }),
    ).toHaveAttribute("href", "/#contacto");
  });
});
