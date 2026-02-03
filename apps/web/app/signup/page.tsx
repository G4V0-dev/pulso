import Link from "next/link";

/**
 * Página placeholder de registro. Redirige conceptualmente a /signup.
 */
export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-slate-900">Registro</h1>
      <p className="mt-2 text-slate-600 text-center">
        Prueba gratis 7 días. Página en construcción.
      </p>
      <Link
        href="/"
        className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
