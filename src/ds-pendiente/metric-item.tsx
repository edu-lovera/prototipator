import { cx } from "@/utils/cx";

/*
 * Pieza pendiente del design system Ready: existe en Figma ("Metric item", Type=Simple)
 * pero no en los componentes gratis de Untitled UI. Sólo tokens del design system.
 */

interface MetricItemProps {
    title: string;
    value: string;
    className?: string;
}

export const MetricItem = ({ title, value, className }: MetricItemProps) => (
    <div className={cx("flex flex-col gap-2 rounded-xl bg-primary p-5 shadow-xs ring-1 ring-secondary ring-inset", className)}>
        <h3 className="text-sm font-medium text-tertiary">{title}</h3>
        <p className="font-display text-display-sm font-semibold text-primary tabular-nums">{value}</p>
    </div>
);
