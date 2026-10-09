import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import { Galeria } from "@/galeria/galeria";
import { Fundamentos } from "@/pages/fundamentos";
import { MiCategoria } from "@/prototipos/chau-contador/mi-categoria";
import { NotFound } from "@/pages/not-found";
import { MarcaProvider } from "@/providers/marca-provider";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <MarcaProvider>
                <HashRouter>
                    <RouteProvider>
                        <Routes>
                            <Route path="/" element={<Galeria />} />
                            <Route path="/fundamentos" element={<Fundamentos />} />
                            <Route path="/p/chau-contador-mi-categoria" element={<MiCategoria />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </RouteProvider>
                </HashRouter>
            </MarcaProvider>
        </ThemeProvider>
    </StrictMode>,
);
