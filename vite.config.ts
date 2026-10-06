import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// En GitHub Pages la galería vive en /prototipator/; en la compu, en la raíz.
export default defineConfig(({ command }) => ({
    base: command === "build" ? "/prototipator/" : "/",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
}));
