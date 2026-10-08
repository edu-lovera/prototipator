import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// En GitHub Pages la galería vive en /prototypator/; en la compu, en la raíz.
export default defineConfig(({ command }) => ({
    base: command === "build" ? "/prototypator/" : "/",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
}));
