import { ArrowLeft } from "@untitledui/icons";
import { Link, useLocation } from "react-router";
import type { Prototipo } from "@/prototipos/registro";
import { cx } from "@/utils/cx";

/*
 * Modo revisión: control flotante para saltar entre versiones de un mismo
 * prototipo sin volver a la galería, conservando el caso de uso (?escenario=).
 * No aparece en el modo prueba (/t/...).
 */
export const SelectorVersion = ({ prototipo, ruta }: { prototipo: Prototipo; ruta: string }) => {
    const { search } = useLocation();
    if (prototipo.versiones.length < 2) return null;
    return (
        <>
            {/* Lugar al pie para que el control no tape lo último de la pantalla. */}
            <div aria-hidden className="h-20" />
            <nav
                aria-label="Versiones del prototipo"
                className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary_alt p-1 shadow-lg ring-1 ring-secondary_alt"
            >
                <Link
                    to="/"
                    aria-label="Volver a la galería"
                    className="flex size-8 items-center justify-center rounded-full text-fg-quaternary outline-focus-ring hover:bg-primary_hover focus-visible:outline-2"
                >
                    <ArrowLeft className="size-4" />
                </Link>
                {prototipo.versiones.map((v) => {
                    const actual = v.ruta === ruta;
                    return (
                        <Link
                            key={v.ruta}
                            to={`/p/${v.ruta}${search}`}
                            aria-current={actual ? "page" : undefined}
                            className={cx(
                                "rounded-full px-3 py-1.5 text-sm font-semibold outline-focus-ring focus-visible:outline-2",
                                actual ? "bg-brand-solid text-white" : "text-secondary hover:bg-primary_hover",
                            )}
                        >
                            Versión {v.variante}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
};
