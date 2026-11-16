import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FOOTER_COLUMNS, SITE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { whatsappUrl } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-ink-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              {SITE.tagline}. Planificación, ejecución y reportes para equipos que quieren
              dejar de improvisar.
            </p>
            <a
              href={whatsappUrl(
                DEFAULT_WHATSAPP_NUMBER,
                "Hola, quiero saber más sobre Pulso",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-medium text-emerald-300 hover:text-emerald-200"
            >
              Escríbenos por WhatsApp →
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-semibold text-white">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-500">
            <Link href="/signup" className="hover:text-ink-200">
              Crear cuenta
            </Link>
            <a href={`mailto:${SITE.email}`} className="hover:text-ink-200">
              {SITE.email}
            </a>
            <span className="hidden sm:inline">Hecho en Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
