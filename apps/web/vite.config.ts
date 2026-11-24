import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    // three entra en el chunk del lazy import de HeroScene: no pesa en el
    // arranque del documento. Vite 8 (rolldown) ya no acepta manualChunks en
    // forma de objeto, así que se deja que el code splitting lo resuelva.
  },
  server: { port: 5173 },
  preview: {
    port: 4173,
    // Render sirve el sitio detrás de un proxy y envía su propio Host
    // (pulso-xxxx.onrender.com). Vite bloquea hosts desconocidos por defecto y
    // responde 403 "Blocked request. This host is not allowed."
    allowedHosts: [".onrender.com", "localhost", "127.0.0.1"],
  },
});
