import type { FC, ReactNode } from "react";
import { AlertCircle, X } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/*
 * Pieza pendiente del design system Ready: existe en Figma ("Alert", Size=Floating)
 * pero no en los componentes gratis de Untitled UI. Sólo tokens del design system.
 */

type Color = "gray" | "brand" | "warning" | "error" | "success";

interface AlertProps {
    color?: Color;
    title: string;
    description?: ReactNode;
    icon?: FC<{ className?: string }>;
    /** Botones o links al pie, por ejemplo "Ahora no" y "Simular una factura". */
    actions?: ReactNode;
    onClose?: () => void;
    className?: string;
}

export const Alert = ({ color = "gray", title, description, icon = AlertCircle, actions, onClose, className }: AlertProps) => (
    <div role="status" className={cx("relative flex flex-col gap-3 rounded-xl bg-primary_alt p-4 shadow-xs ring-1 ring-primary ring-inset md:flex-row md:gap-4", className)}>
        <FeaturedIcon icon={icon} color={color} theme="outline" size="md" />
        <div className="flex flex-1 flex-col gap-3 pr-8">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-secondary">{title}</p>
                {description && <p className="text-sm text-tertiary">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
        {onClose && (
            <button
                type="button"
                aria-label="Cerrar aviso"
                onClick={onClose}
                className="absolute top-2 right-2 flex size-9 items-center justify-center rounded-lg text-fg-quaternary outline-focus-ring hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2"
            >
                <X className="size-5" />
            </button>
        )}
    </div>
);
