import { describe, it, expect } from "vitest";
import { parsePlanFromHash } from "@/lib/plan";

describe("parsePlanFromHash", () => {
  it("extrae el plan starter del hash", () => {
    expect(parsePlanFromHash("#signup?plan=starter")).toBe("starter");
  });

  it("usa pro por defecto cuando el hash no tiene plan", () => {
    expect(parsePlanFromHash("#otra")).toBe("pro");
  });

  it("usa pro por defecto cuando el hash está vacío", () => {
    expect(parsePlanFromHash("")).toBe("pro");
  });

  it("extrae el plan enterprise del hash", () => {
    expect(parsePlanFromHash("#signup?plan=enterprise")).toBe("enterprise");
  });

  it("usa pro por defecto cuando el plan del hash no existe", () => {
    expect(parsePlanFromHash("#signup?plan=business")).toBe("pro");
  });
});
