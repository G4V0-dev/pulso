/**
 * Utilidades de enlaces compartidas por Hero y CTA.
 */

/** Construye un deep link de WhatsApp a partir de un número y un mensaje. */
export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Une clases condicionales sin dependencias externas. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
