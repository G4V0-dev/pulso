/**
 * Contenido y datos de la landing.
 * Todo el copy vive aquí para poder cambiarlo sin tocar los componentes.
 */

export const SITE = {
  name: "Pulso",
  tagline: "El pulso de tu equipo",
  description:
    "Pulso reúne tableros, tareas, documentos y reportes en un solo lugar para que tu equipo deje de perseguir estados por chat y empiece a entregar.",
  email: "hola@pulso.app",
  url: "https://pulso.app",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Producto", href: "/#producto" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Precios", href: "/#precios" },
  { label: "FAQ", href: "/#faq" },
];

export interface Stat {
  value: string;
  label: string;
}

export const HERO_STATS: Stat[] = [
  { value: "3", label: "vistas: kanban, lista y timeline" },
  { value: "<5 min", label: "para montar tu primer tablero" },
  { value: "14 días", label: "de prueba sin tarjeta" },
];

/** Número de WhatsApp por defecto para CTAs (sin espacios ni +). */
export const DEFAULT_WHATSAPP_NUMBER = "573208112607";

/** Mensaje predefinido para enlace WhatsApp. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola, quiero saber más sobre Pulso para mi equipo";

export interface Feature {
  /** Clave del icono definido en components/icons.tsx */
  icon: "board" | "bolt" | "chart" | "chat" | "shield" | "plug";
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "board",
    title: "Tableros que se adaptan",
    description:
      "Kanban, lista y timeline sobre los mismos datos. Cada equipo elige cómo ver su trabajo sin duplicar tareas.",
  },
  {
    icon: "bolt",
    title: "Automatizaciones sin código",
    description:
      "Cuando una tarea pasa a «En revisión», avisa al revisor y mueve el ticket. Reglas simples, horas ahorradas.",
  },
  {
    icon: "chart",
    title: "Reportes en vivo",
    description:
      "Carga de trabajo, avance por sprint y cuellos de botella calculados al instante, sin exportar hojas de cálculo.",
  },
  {
    icon: "chat",
    title: "Contexto en la tarea",
    description:
      "Comentarios, menciones, archivos y decisiones quedan junto al trabajo. Se acaban los hilos perdidos en el chat.",
  },
  {
    icon: "shield",
    title: "Permisos granulares",
    description:
      "Roles por proyecto, historial de auditoría y SSO para que cada persona vea exactamente lo que necesita.",
  },
  {
    icon: "plug",
    title: "API y webhooks",
    description:
      "Conecta GitHub, Slack, Figma o tu propio backend. Si tu equipo ya usa algo, Pulso se adapta.",
  },
];

export interface Step {
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    title: "Crea tu espacio",
    description:
      "Importa proyectos desde Trello, Asana o un CSV. En menos de cinco minutos tienes todo tu trabajo dentro.",
  },
  {
    title: "Invita a tu equipo",
    description:
      "Asigna roles en un clic. Los tableros se comparten por proyecto, no por carpeta perdida en el drive.",
  },
  {
    title: "Empieza a entregar",
    description:
      "Metas semanales, reportes automáticos y recordatorios que llegan antes de que el plazo se venza.",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Pasamos de tres herramientas y un Excel a un solo tablero. Las reuniones de los lunes se redujeron a la mitad.",
    author: "Laura Restrepo",
    role: "Head of Product, Kora",
    initials: "LR",
  },
  {
    quote:
      "Lo que más nos sirvió fueron las automatizaciones. El equipo dejó de preguntar «¿en qué va esto?».",
    author: "Andrés Molina",
    role: "CTO, Fractal Studio",
    initials: "AM",
  },
  {
    quote:
      "Migramos 14 proyectos en una tarde. Al día siguiente ya estábamos trabajando con reportes reales.",
    author: "Sofía Vargas",
    role: "Operations Lead, Nube",
    initials: "SV",
  },
];

export interface Plan {
  id: string;
  name: string;
  description: string;
  /** Precio mensual por usuario. null = plan a medida ("Hablemos"). */
  priceMonthly: number | null;
  /** Si true, la card se muestra destacada. */
  featured?: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}

/** Planes estáticos: Starter, Pro, Enterprise. */
export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Para equipos que empiezan a ordenarse",
    priceMonthly: 0,
    features: [
      "Hasta 3 proyectos",
      "5 miembros",
      "Tableros kanban y lista",
      "Historial de 30 días",
    ],
    cta: "Empezar gratis",
    ctaHref: "#signup?plan=starter",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para equipos que entregan cada semana",
    priceMonthly: 12,
    featured: true,
    features: [
      "Proyectos ilimitados",
      "Miembros ilimitados",
      "Automatizaciones y reportes",
      "Timeline y dependencias",
      "Historial ilimitado",
    ],
    cta: "Prueba Pro 14 días",
    ctaHref: "#signup?plan=pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Para organizaciones con requisitos propios",
    priceMonthly: null,
    features: [
      "Todo lo de Pro",
      "SSO y auditoría",
      "SLA y soporte dedicado",
      "Onboarding y migración asistida",
    ],
    cta: "Hablemos",
    ctaHref: "/#contacto",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "¿Necesito tarjeta de crédito para la prueba?",
    answer:
      "No. El plan Starter es gratis para siempre y la prueba de Pro dura 14 días sin pedir método de pago.",
  },
  {
    question: "¿Puedo importar mis proyectos actuales?",
    answer:
      "Sí. Tenemos importadores para Trello, Asana y CSV, y la API permite migraciones a medida si tu equipo lo necesita.",
  },
  {
    question: "¿Qué pasa si mi equipo crece?",
    answer:
      "Cambias de plan desde la configuración y solo pagas por los usuarios activos. No hay contratos ni cargos ocultos.",
  },
  {
    question: "¿Dónde se alojan los datos?",
    answer:
      "En servidores con cifrado en tránsito y en reposo. En Enterprise puedes elegir región y aplicar tus propias políticas de retención.",
  },
  {
    question: "¿Ofrecen descuentos para startups o educación?",
    answer:
      "Sí, aplicamos descuentos para equipos pequeños, organizaciones educativas y proyectos de código abierto. Escríbenos.",
  },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Producto",
    links: [
      { label: "Funciones", href: "/#producto" },
      { label: "Cómo funciona", href: "/#como-funciona" },
      { label: "Precios", href: "/#precios" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Preguntas frecuentes", href: "/#faq" },
      { label: "Contacto", href: "/#contacto" },
      { label: "Crear cuenta", href: "#signup" },
    ],
  },
  {
    title: "Proyecto",
    links: [
      { label: "Repositorio", href: "https://github.com/G4V0-dev/pulso" },
      {
        label: "Licencia MIT",
        href: "https://github.com/G4V0-dev/pulso/blob/main/LICENSE",
      },
      {
        label: "Roadmap",
        href: "https://github.com/G4V0-dev/pulso#roadmap",
      },
    ],
  },
];
