"use client";

import { useState } from "react";
import Link from "next/link";
import { ModalSimple } from "@/components/ModalSimple";

export interface HeroProps {
  /** Título principal. */
  title: string;
  /** Subtítulo o descripción. */
  subtitle?: string;
  /** Texto del botón que lleva a /signup. */
  ctaSignup?: string;
  /** Texto del botón que abre el modal demo. */
  ctaDemo?: string;
  /** Texto del botón WhatsApp. */
  ctaWhatsApp?: string;
  /** Texto del botón secundario (ej. Ver planes). */
  ctaSecondary?: string;
  /** Número WhatsApp (sin + ni espacios). */
  whatsappNumber?: string;
  /** Mensaje predefinido para el enlace WhatsApp (se envía como ?text=). */
  whatsappMessage?: string;
}

const whatsappUrl = (number: string, message?: string) => {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  if (message?.trim()) {
    return `${base}?text=${encodeURIComponent(message.trim())}`;
  }
  return base;
};

/**
 * Hero accesible y mobile-first.
 * CTAs: signup (/signup), demo (modal), WhatsApp (deep link con mensaje).
 */
export function Hero({
  title,
  subtitle,
  ctaSignup,
  ctaDemo,
  ctaWhatsApp,
  ctaSecondary,
  whatsappNumber = "",
  whatsappMessage = "",
}: HeroProps) {
  const [demoOpen, setDemoOpen] = useState(false);

  const openDemo = () => {
    console.log("[Hero] Demo CTA clicked");
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "cta_click", cta: "demo" });
    }
    setDemoOpen(true);
  };

  const hasSignup = Boolean(ctaSignup);
  const hasDemo = Boolean(ctaDemo);
  const hasWhatsApp = Boolean(ctaWhatsApp && whatsappNumber);
  const hasSecondary = Boolean(ctaSecondary);

  const btnClass =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors w-full sm:w-auto";
  const primaryClass = "bg-emerald-600 text-white shadow hover:bg-emerald-700 focus:ring-emerald-500";
  const secondaryClass =
    "border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400";

  return (
    <header className="text-center px-4 py-12 sm:py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-600 sm:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
        {hasSignup && (
          <Link
            href="/signup"
            className={`${btnClass} ${primaryClass}`}
            aria-label={ctaSignup}
          >
            {ctaSignup}
          </Link>
        )}
        {hasDemo && (
          <button
            type="button"
            onClick={openDemo}
            className={`${btnClass} ${secondaryClass}`}
            aria-haspopup="dialog"
            aria-expanded={demoOpen}
          >
            {ctaDemo}
          </button>
        )}
        {hasWhatsApp && (
          <a
            href={whatsappUrl(whatsappNumber, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnClass} ${primaryClass}`}
            aria-label={`Abrir WhatsApp: ${ctaWhatsApp}`}
          >
            {ctaWhatsApp}
          </a>
        )}
        {hasSecondary && (
          <a
            href="#pricing"
            className={`${btnClass} ${secondaryClass}`}
            aria-label={ctaSecondary}
          >
            {ctaSecondary}
          </a>
        )}
      </div>
      <ModalSimple
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Agenda una demo"
      />
    </header>
  );
}
