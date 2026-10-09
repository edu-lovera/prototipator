import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import { Galeria } from "@/galeria/galeria";
import { SelectorVersion } from "@/galeria/selector-version";
import { Fundamentos } from "@/pages/fundamentos";
import { NotFound } from "@/pages/not-found";
import { VERSIONES } from "@/prototipos/registro";
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
                            {/* Modo revisión: cada versión del registro, con el selector de versión. */}
                            {VERSIONES.map(({ prototipo, version: { ruta, componente: Pantalla } }) => (
                                <Route
                                    key={ruta}
                                    path={`/p/${ruta}`}
                                    element={
                                        <>
                                            <Pantalla />
                                            <SelectorVersion prototipo={prototipo} ruta={ruta} />
                                        </>
                                    }
                                />
                            ))}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </RouteProvider>
                </HashRouter>
            </MarcaProvider>
        </ThemeProvider>
    </StrictMode>,
);
