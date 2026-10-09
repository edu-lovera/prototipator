import { cx } from "@/utils/cx";

/*
 * Componente local de Chau Contador (no es del design system).
 * En Figma: "Invoice row", biblioteca "Chau Contador · Componentes locales".
 * Fila de la lista de facturas en pantallas angostas, donde reemplaza a la tabla.
 */

interface InvoiceRowProps {
    client: string;
    details: string;
    amount: string;
    className?: string;
}

export const InvoiceRow = ({ client, details, amount, className }: InvoiceRowProps) => (
    <li className={cx("flex items-center gap-3 border-b border-secondary px-4 py-3 last:border-b-0", className)}>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-md font-semibold text-primary">{client}</p>
            <p className="text-sm text-tertiary">{details}</p>
        </div>
        <p className="shrink-0 text-md font-semibold text-primary tabular-nums">{amount}</p>
    </li>
);
