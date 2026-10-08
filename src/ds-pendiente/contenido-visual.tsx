import type { ReactNode } from "react";
import { useMarca } from "@/providers/marca-provider";
import { cx } from "@/utils/cx";

/*
 * Pieza pendiente del design system Ready (no existe en Untitled UI).
 *
 * Envuelve fotos, ilustraciones y gráficos. Con las marcas normales muestra el
 * contenido tal cual; con Boceto lo reemplaza por un recuadro con una cruz y
 * una etiqueta, como en un wireframe, para que en la prueba se opine sobre la
 * interacción y no sobre la imagen.
 */

interface ContenidoVisualProps {
    /** Qué hay en ese lugar, por ejemplo "Foto del producto" o "Gráfico de rendimiento". */
    etiqueta: string;
    /** El contenido real: una imagen, una ilustración o un gráfico. */
    children: ReactNode;
    /** Tamaño y ubicación. El recuadro de Boceto usa las mismas medidas. */
    className?: string;
}

export const ContenidoVisual = ({ etiqueta, children, className }: ContenidoVisualProps) => {
    const { marca } = useMarca();

    if (marca !== "boceto") return <div className={className}>{children}</div>;

    return (
        <div
            role="img"
            aria-label={etiqueta}
            className={cx("relative flex min-h-24 items-center justify-center overflow-hidden rounded-lg border border-secondary bg-secondary", className)}
        >
            <svg className="absolute inset-0 size-full text-fg-quaternary" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="relative rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-tertiary">{etiqueta}</span>
        </div>
    );
};

/** Atajo para fotos: en Boceto muestra el recuadro con el texto alternativo como etiqueta. */
export const Imagen = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <ContenidoVisual etiqueta={alt} className={className}>
        <img src={src} alt={alt} className="size-full rounded-lg object-cover" />
    </ContenidoVisual>
);
