import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Web App",
  description: "Next.js App Router + TypeScript + TailwindCSS",
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
