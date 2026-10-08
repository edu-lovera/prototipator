import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

/** Marcas ficticias del design system Ready. */
export const MARCAS = [
    { id: "brio", nombre: "Brío" },
    { id: "ancla", nombre: "Ancla" },
    { id: "boceto", nombre: "Boceto" },
] as const;

export type Marca = (typeof MARCAS)[number]["id"];

const CLAVE_GUARDADA = "ready-marca";
const MARCA_POR_DEFECTO: Marca = "brio";

interface MarcaContextType {
    marca: Marca;
    setMarca: (marca: Marca) => void;
}

const MarcaContext = createContext<MarcaContextType | undefined>(undefined);

export const useMarca = (): MarcaContextType => {
    const context = useContext(MarcaContext);
    if (context === undefined) {
        throw new Error("useMarca tiene que usarse dentro de MarcaProvider");
    }
    return context;
};

const leerMarcaGuardada = (): Marca => {
    try {
        const guardada = localStorage.getItem(CLAVE_GUARDADA);
        if (MARCAS.some((m) => m.id === guardada)) return guardada as Marca;
    } catch {
        // Sin acceso al almacenamiento del navegador: se usa la marca por defecto.
    }
    return MARCA_POR_DEFECTO;
};

/**
 * Pone la marca elegida en el atributo data-marca de <html>.
 * La capa Brand (styles/marcas.css) lee ese atributo.
 */
export const MarcaProvider = ({ children }: { children: ReactNode }) => {
    const [marca, setMarca] = useState<Marca>(leerMarcaGuardada);

    useEffect(() => {
        document.documentElement.dataset.marca = marca;
        try {
            localStorage.setItem(CLAVE_GUARDADA, marca);
        } catch {
            // Si no se puede guardar, la marca vale sólo para esta visita.
        }
    }, [marca]);

    return <MarcaContext.Provider value={{ marca, setMarca }}>{children}</MarcaContext.Provider>;
};
