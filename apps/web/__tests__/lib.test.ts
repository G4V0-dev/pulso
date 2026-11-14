import { describe, it, expect } from "vitest";
import { whatsappUrl } from "@/lib/links";
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
