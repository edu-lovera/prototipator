import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Rutas relativas: la galería anda igual en edu-lovera.github.io/prototypator/, en prototypator.com y en la compu.
// Funciona porque las pantallas van después de "#" (HashRouter).
export default defineConfig(() => ({
    base: "./",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
}));
