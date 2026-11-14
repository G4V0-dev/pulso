import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/links";

export interface LogoProps {
  /** Tema del logotipo según el fondo donde se use. */
  tone?: "dark" | "light";
  className?: string;
}

export function Logo({ tone = "dark", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        className,
      )}
      aria-label={`${SITE.name} — inicio`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
          <path
            d="M3.5 13h3.2l1.8-5.5 3.2 10 2.2-7 1.4 2.5h5.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          tone === "dark" ? "text-ink-900" : "text-white",
        )}
      >
        {SITE.name}
      </span>
    </Link>
  );
}
