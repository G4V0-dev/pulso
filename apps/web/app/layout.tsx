import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "StartUp | Bienvenido",
  description:
    "Next.js App Router + TypeScript + TailwindCSS. Planes y contacto por WhatsApp.",
  openGraph: {
    title: "StartUp | Bienvenido",
    description:
      "Next.js App Router + TypeScript + TailwindCSS. Planes y contacto por WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
