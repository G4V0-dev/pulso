import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";

/**
 * Raíz de la SPA. Sin router: la landing y la sección de registro conviven en
 * una sola página (el CTA apunta a #signup).
 */
export function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
