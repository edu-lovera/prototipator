import type { ReactNode } from "react";
import { BarChartSquare02, Calculator, CalendarDate, Hand, HomeLine, LifeBuoy01, Receipt, Settings01, Users01 } from "@untitledui/icons";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { useParametro } from "@/prototipos/parametros";
import { InvoiceRow } from "./componentes/invoice-row";
import { ESCENARIO, escenarioPara, fecha, pesos } from "./datos";

/*
 * Chau Contador · piezas compartidas por las versiones de un mismo prototipo:
 * el marco de la app (menú y contenedor) y la sección de facturas.
 * Lo que cambia entre la versión A y la B queda en cada pantalla.
 */

/** Logo provisorio: una mano que saluda ("chau"), con el ícono Hand de Untitled UI. */
const Logo = () => (
    <span className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand-solid">
            <Hand className="size-4 -rotate-12 text-white" aria-hidden />
        </span>
        <span className="font-display text-md font-semibold text-primary">Chau Contador</span>
    </span>
);

const AvisoRecategorizacion = () => (
    <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
        <p className="text-sm font-semibold text-primary">Recategorización de febrero</p>
        <p className="text-sm text-tertiary">Tenés hasta el {ESCENARIO.proximaRecategorizacion}. Te avisamos antes.</p>
    </div>
);

/** Marco de la app. `ruta` es la de la pantalla actual: el menú la marca como activa en "Mi categoría". */
export const MarcoChauContador = ({ ruta, children }: { ruta: string; children: ReactNode }) => (
    <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
        <SidebarNavigationSimple
            logo={<Logo />}
            searchPlaceholder="Buscar"
            activeUrl={ruta}
            showAccountCard={false}
            featureCard={<AvisoRecategorizacion />}
            items={[
                { label: "Inicio", href: `${ruta}?seccion=inicio`, icon: HomeLine },
                { label: "Mi categoría", href: ruta, icon: BarChartSquare02 },
                { label: "Facturas", href: `${ruta}?seccion=facturas`, icon: Receipt },
                {
                    label: "Vencimientos",
                    href: `${ruta}?seccion=vencimientos`,
                    icon: CalendarDate,
                    badge: (
                        <Badge size="sm" type="modern">
                            2
                        </Badge>
                    ),
                },
                { label: "Simulador", href: `${ruta}?seccion=simulador`, icon: Calculator },
                { label: "Clientes", href: `${ruta}?seccion=clientes`, icon: Users01 },
            ]}
            footerItems={[
                { label: "Configuración", href: `${ruta}?seccion=configuracion`, icon: Settings01 },
                { label: "Ayuda", href: `${ruta}?seccion=ayuda`, icon: LifeBuoy01 },
            ]}
        />
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto flex max-w-container flex-col gap-6 md:gap-8">{children}</div>
        </main>
    </div>
);

/** Facturas de los últimos 12 meses: tabla en escritorio, lista en teléfono. */
export const SeccionFacturas = () => {
    const facturas = escenarioPara(useParametro("escenario")).facturas;
    const total = facturas.reduce((s, f) => s + f.monto, 0);
    const visibles = facturas.slice(0, 6);
    return (
        <>
            <TableCard.Root className="max-lg:hidden">
                <TableCard.Header
                    title="Facturas de los últimos 12 meses"
                    description={`Mostrando 6 de ${facturas.length} comprobantes · Total: ${pesos(total)}`}
                />
                <Table aria-label="Facturas de los últimos 12 meses">
                    <Table.Header>
                        <Table.Head id="fecha" label="Fecha" isRowHeader />
                        <Table.Head id="comprobante" label="Comprobante" />
                        <Table.Head id="cliente" label="Cliente" />
                        <Table.Head id="concepto" label="Concepto" />
                        <Table.Head id="monto" label="Monto" />
                    </Table.Header>
                    <Table.Body items={visibles.map((f) => ({ ...f, id: f.comprobante }))}>
                        {(f) => (
                            <Table.Row id={f.id}>
                                <Table.Cell>{fecha(f.fecha)}</Table.Cell>
                                <Table.Cell>{f.comprobante}</Table.Cell>
                                <Table.Cell className="text-primary">{f.cliente}</Table.Cell>
                                <Table.Cell>{f.concepto}</Table.Cell>
                                <Table.Cell className="font-medium text-primary tabular-nums">{pesos(f.monto)}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </TableCard.Root>

            <section className="overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset lg:hidden" aria-labelledby="titulo-facturas">
                <div className="flex flex-col gap-1 border-b border-secondary p-4">
                    <h2 id="titulo-facturas" className="text-lg font-semibold text-primary">
                        Últimas facturas
                    </h2>
                    <p className="text-sm text-tertiary">
                        6 de {facturas.length} · Total 12 meses: {pesos(total)}
                    </p>
                </div>
                <ul>
                    {visibles.map((f) => (
                        <InvoiceRow key={f.comprobante} client={f.cliente} details={`${f.concepto} · ${fecha(f.fecha)}`} amount={pesos(f.monto)} />
                    ))}
                </ul>
            </section>
        </>
    );
};
