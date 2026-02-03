/**
 * Plan de precios para PricingTable.
 */
export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  /** Si true, la card se muestra destacada (plan Pro). */
  pro?: boolean;
}

/** Planes estáticos: Starter, Pro, Enterprise. */
export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "29",
    description: "Para empezar",
    features: ["5 proyectos", "Soporte email", "Actualizaciones"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "79",
    description: "Lo más popular",
    features: ["Proyectos ilimitados", "Soporte prioritario", "API", "Dashboard"],
    pro: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contactar",
    description: "Para equipos grandes",
    features: ["Todo en Pro", "SLA", "Onboarding dedicado", "SSO"],
  },
];

/** Número de WhatsApp por defecto para CTAs (sin espacios ni +). */
export const DEFAULT_WHATSAPP_NUMBER = "5491112345678";

/** Número WhatsApp Colombia para contacto. */
export const WHATSAPP_COLOMBIA_NUMBER = "573208112607";

/** Mensaje predefinido para enlace WhatsApp. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "estoy interesado en la pagina web para mi negocio";
