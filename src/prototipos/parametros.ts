import { useSearchParams } from "react-router";

/*
 * Lee un parámetro de la dirección de los dos lados del "#":
 * antes (link armado afuera, por ejemplo desde la galería) y después
 * (navegación de adentro del prototipo). Primero el de adentro.
 */
export const useParametro = (nombre: string): string | null => {
    const [params] = useSearchParams();
    return params.get(nombre) ?? new URLSearchParams(window.location.search).get(nombre);
};
