interface Card {
  title: string;
  tag: string;
  tagClass: string;
  assignee: string;
  done?: boolean;
}

interface Column {
  title: string;
  count: number;
  cards: Card[];
}

const COLUMNS: Column[] = [
  {
    title: "Por hacer",
    count: 4,
    cards: [
      {
        title: "Definir onboarding del workspace",
        tag: "Producto",
        tagClass: "bg-amber-400/15 text-amber-300",
        assignee: "LR",
      },
      {
        title: "Revisar copy de la landing",
        tag: "Marketing",
        tagClass: "bg-fuchsia-400/15 text-fuchsia-300",
        assignee: "AM",
      },
    ],
  },
  {
    title: "En curso",
    count: 3,
    cards: [
      {
        title: "Reportes de carga por sprint",
        tag: "Ingeniería",
        tagClass: "bg-brand-400/15 text-brand-300",
        assignee: "SV",
      },
      {
        title: "Migrador de Trello",
        tag: "Ingeniería",
        tagClass: "bg-brand-400/15 text-brand-300",
        assignee: "AM",
      },
    ],
  },
  {
    title: "Hecho",
    count: 12,
    cards: [
      {
        title: "SSO con Google",
        tag: "Seguridad",
        tagClass: "bg-emerald-400/15 text-emerald-300",
        assignee: "JD",
        done: true,
      },
      {
        title: "Webhooks v2",
        tag: "API",
        tagClass: "bg-sky-400/15 text-sky-300",
        assignee: "LR",
        done: true,
      },
    ],
  },
];

const SIDEBAR = ["Inicio", "Mis tareas", "Proyectos", "Reportes", "Equipo"];

/**
 * Mock decorativo del producto para el hero.
 * No es interactivo: se expone como una sola imagen accesible.
 */
export function AppPreview() {
  return (
    <div
      role="img"
      aria-label="Vista previa del tablero de Pulso con columnas Por hacer, En curso y Hecho"
      className="relative"
    >
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl shadow-black/40 ring-1 ring-white/5 backdrop-blur"
      >
        {/* Barra del navegador */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-3 flex-1 rounded-md bg-black/20 px-3 py-1 text-[10px] text-ink-400">
            app.pulso.app / lanzamiento-q3
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-36 shrink-0 border-r border-white/10 p-3 sm:block">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-[10px] font-bold text-white">
                P
              </span>
              <span className="text-[11px] font-semibold text-white">Pulso</span>
            </div>
            <ul className="space-y-1">
              {SIDEBAR.map((item, i) => (
                <li
                  key={item}
                  className={`rounded-md px-2 py-1.5 text-[10px] ${
                    i === 2 ? "bg-white/10 font-medium text-white" : "text-ink-400"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="text-[9px] font-medium text-white">Sprint 14</p>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div className="h-1 w-2/3 rounded-full bg-brand-400" />
              </div>
              <p className="mt-1.5 text-[9px] text-ink-400">67% completado</p>
            </div>
          </div>

          {/* Tablero */}
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-ink-400">
                  Proyecto
                </p>
                <p className="text-sm font-semibold text-white">Lanzamiento Q3</p>
              </div>
              <div className="flex -space-x-1.5">
                {["LR", "AM", "SV", "JD"].map((initials, i) => (
                  <span
                    key={initials}
                    className={`grid h-6 w-6 place-items-center rounded-full border-2 border-ink-900 text-[8px] font-semibold text-white ${
                      [
                        "bg-brand-500",
                        "bg-emerald-500",
                        "bg-amber-500",
                        "bg-fuchsia-500",
                      ][i]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
                <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-ink-900 bg-white/10 text-[8px] text-white">
                  +3
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {COLUMNS.map((column) => (
                <div key={column.title} className="min-w-0">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-ink-300">
                      {column.title}
                    </span>
                    <span className="rounded bg-white/10 px-1 text-[8px] text-ink-400">
                      {column.count}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {column.cards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-lg border border-white/10 bg-white/[0.06] p-2"
                      >
                        <span
                          className={`inline-block rounded px-1.5 py-0.5 text-[7px] font-medium ${card.tagClass}`}
                        >
                          {card.tag}
                        </span>
                        <p
                          className={`mt-1.5 text-[9px] leading-snug ${
                            card.done ? "text-ink-400 line-through" : "text-ink-100"
                          }`}
                        >
                          {card.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[7px] text-ink-500">12 sep</span>
                          <span className="grid h-4 w-4 place-items-center rounded-full bg-white/10 text-[7px] font-semibold text-white">
                            {card.assignee}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante de automatización */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-5 hidden items-center gap-2 rounded-xl border border-white/10 bg-ink-800/95 px-3 py-2 shadow-xl sm:flex lg:-left-8"
      >
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="m5 12 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="text-[9px] font-medium text-white">Automatización ejecutada</p>
          <p className="text-[8px] text-ink-400">Ticket movido a «En revisión»</p>
        </div>
      </div>
    </div>
  );
}
