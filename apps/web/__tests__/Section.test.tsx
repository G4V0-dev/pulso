import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "@/components/Section";

const originalMatchMedia = window.matchMedia;

function mockReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? matches : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("Section", () => {
  it("no oculta el contenido cuando el usuario pide movimiento reducido", () => {
    mockReducedMotion(true);
    const { container } = render(
      <Section>
        <p>Contenido visible</p>
      </Section>,
    );

    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.style.opacity).not.toBe("0");
    expect(screen.getByText("Contenido visible")).toBeVisible();
  });
});
