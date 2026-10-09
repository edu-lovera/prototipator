import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/*
 * Pieza pendiente del design system Ready: existe en Figma ("Page header", Style=Simple)
 * pero no en los componentes gratis de Untitled UI. Sólo tokens del design system.
 */

interface PageHeaderProps {
    title: string;
    description?: ReactNode;
    actions?: ReactNode;
    className?: string;
}

export const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => (
    <div className={cx("flex flex-col gap-4 border-b border-secondary pb-5 md:flex-row md:items-start md:justify-between", className)}>
        <div className="flex flex-col gap-1">
            <h1 className="font-display text-display-xs font-semibold text-primary">{title}</h1>
            {description && <p className="text-md text-tertiary">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
);
