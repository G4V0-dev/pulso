"use client";

import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ModalSimple } from "@/components/ModalSimple";
import { AppPreview } from "@/components/AppPreview";
import { ArrowRightIcon, SparklesIcon } from "@/components/icons";
import type { Stat } from "@/lib/constants";
import { whatsappUrl } from "@/lib/links";

const HeroScene = lazy(() => import("@/components/HeroScene"));

export interface HeroProps {
  /** Título principal. */
  title: string;
  /** Subtítulo o descripción. */
  subtitle?: string;
  /** Texto pequeño sobre el título. */
  eyebrow?: string;
  /** Texto del botón que lleva a /signup. */
  ctaSignup?: string;
  /** Texto del botón que abre el modal demo. */
  ctaDemo?: string;
  /** Texto del botón WhatsApp. */
  ctaWhatsApp?: string;
  /** Texto del botón secundario. */
  ctaSecondary?: string;
  /** Destino del botón secundario. */
  ctaSecondaryHref?: string;
  /** Número WhatsApp (sin + ni espacios). */
  whatsappNumber?: string;
  /** Mensaje predefinido para el enlace WhatsApp (se envía como ?text=). */
  whatsappMessage?: string;
  /** Métricas de confianza bajo los CTAs. */
  stats?: Stat[];
  /** Muestra la vista previa del producto. */
  showPreview?: boolean;
}

const btnBase =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 sm:w-auto";

/**
 * Hero accesible y mobile-first.
 * CTAs: signup (/signup), demo (modal), WhatsApp (deep link con mensaje).
 */
export function Hero({
  title,
  subtitle,
  eyebrow,
  ctaSignup,
  ctaDemo,
  ctaWhatsApp,
  ctaSecondary,
  ctaSecondaryHref = "#precios",
  whatsappNumber = "",
  whatsappMessage = "",
  stats = [],
  showPreview = false,
}: HeroProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const openDemo = () => {
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "cta_click", cta: "demo" });
    }
    setDemoOpen(true);
  };

  const hasSignup = Boolean(ctaSignup);
  const hasDemo = Boolean(ctaDemo);
  const hasWhatsApp = Boolean(ctaWhatsApp && whatsappNumber);
  const hasSecondary = Boolean(ctaSecondary);

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-ink-950 pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.28),transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.12),transparent_45%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="absolute inset-0 -z-10 opacity-100">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      {/* Dos capas sobre la escena: la horizontal oscurece la columna de texto (izquierda)
          y la vertical suaviza arriba/abajo sin apagar el orbe de la derecha. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        <div className="animate-fade-up text-center lg:text-left">
          {eyebrow && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-ink-200"
            >
              <SparklesIcon className="h-3.5 w-3.5 text-brand-300" />
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            id="hero-title"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-300 sm:text-xl lg:mx-0"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
          >
            {hasSignup && (
              <a
                href="#signup"
                className={`${btnBase} bg-white text-ink-950 shadow-lg shadow-black/20 hover:bg-ink-100 focus-visible:ring-white`}
              >
                {ctaSignup}
                <ArrowRightIcon />
              </a>
            )}
            {hasDemo && (
              <button
                type="button"
                onClick={openDemo}
                aria-haspopup="dialog"
                aria-expanded={demoOpen}
                className={`${btnBase} border border-white/15 bg-white/5 text-white hover:bg-white/10 focus-visible:ring-white`}
              >
                {ctaDemo}
              </button>
            )}
            {hasWhatsApp && (
              <a
                href={whatsappUrl(whatsappNumber, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir WhatsApp: ${ctaWhatsApp}`}
                className={`${btnBase} border border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15 focus-visible:ring-emerald-400`}
              >
                {ctaWhatsApp}
              </a>
            )}
            {hasSecondary && (
              <a
                href={ctaSecondaryHref}
                aria-label={ctaSecondary}
                className={`${btnBase} text-ink-300 hover:text-white focus-visible:ring-white`}
              >
                {ctaSecondary}
              </a>
            )}
          </motion.div>

          <p className="mt-6 text-sm text-ink-400">
            Sin tarjeta de crédito · Configúralo en 5 minutos · Cancela cuando quieras
          </p>

          {stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 text-center lg:text-left">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs text-ink-400">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {showPreview && (
          <div className="animate-fade-up [animation-delay:150ms]">
            <AppPreview />
          </div>
        )}
      </div>

      <ModalSimple
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Agenda una demo"
      />
    </section>
  );
}
