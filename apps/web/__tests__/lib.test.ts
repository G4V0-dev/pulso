import { describe, it, expect } from "vitest";
import { whatsappUrl, cn } from "@/lib/links";
import { formatPlanPrice } from "@/lib/format";
import { PLANS } from "@/lib/constants";

describe("whatsappUrl", () => {
  it("limpia caracteres no numéricos del número", () => {
    expect(whatsappUrl("+57 320 811 2607")).toBe("https://wa.me/573208112607");
  });

  it("codifica el mensaje como query param", () => {
    expect(whatsappUrl("573208112607", "Hola, quiero una demo")).toBe(
      "https://wa.me/573208112607?text=Hola%2C%20quiero%20una%20demo",
    );
  });

  it("ignora mensajes vacíos", () => {
    expect(whatsappUrl("573208112607", "   ")).toBe("https://wa.me/573208112607");
  });
});

describe("whatsappUrl — casos límite", () => {
  it("deja solo los dígitos de un número con letras y guiones", () => {
    expect(whatsappUrl("+1 (800) ABC-1234")).toBe("https://wa.me/18001234");
  });

  it("produce la URL base cuando el número no tiene dígitos", () => {
    expect(whatsappUrl("ABC-xyz")).toBe("https://wa.me/");
  });

  it("percent-encoda emojis y caracteres especiales de forma reversible", () => {
    const url = whatsappUrl("573208112607", "Hola 👋 & amigos");
    const encoded = url.split("?text=")[1];
    expect(url).toContain("?text=");
    expect(decodeURIComponent(encoded)).toBe("Hola 👋 & amigos");
  });

  it("recorta los espacios al inicio y al final antes de codificar", () => {
    expect(whatsappUrl("573208112607", "  Hola  ")).toBe(
      "https://wa.me/573208112607?text=Hola",
    );
  });
});

describe("formatPlanPrice", () => {
  it("devuelve Hablemos cuando no hay precio", () => {
    const enterprise = PLANS.find((plan) => plan.id === "enterprise")!;
    expect(formatPlanPrice(enterprise)).toEqual({ amount: "Hablemos" });
  });

  it("devuelve $0 para el plan gratuito", () => {
    const starter = PLANS.find((plan) => plan.id === "starter")!;
    expect(formatPlanPrice(starter)).toEqual({ amount: "$0", suffix: "/mes" });
  });

  it("incluye el sufijo por usuario en planes de pago", () => {
    const pro = PLANS.find((plan) => plan.id === "pro")!;
    expect(formatPlanPrice(pro)).toEqual({
      amount: "$12",
      suffix: "/usuario/mes",
    });
  });
});

describe("cn", () => {
  it("filtra false, null, undefined y cadenas vacías conservando el orden", () => {
    expect(cn("a", false, "b", null, "c", undefined, "", "d")).toBe("a b c d");
  });

  it("une las clases con un solo espacio", () => {
    expect(cn("flex", "items-center", "gap-2")).toBe("flex items-center gap-2");
  });

  it("devuelve una cadena vacía sin argumentos", () => {
    expect(cn()).toBe("");
  });

  it("no duplica los espacios internos de cada clase", () => {
    expect(cn("px-4  py-2", "bg-white")).toBe("px-4  py-2 bg-white");
  });
});
