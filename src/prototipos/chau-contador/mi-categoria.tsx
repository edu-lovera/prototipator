import { useRef, useState } from "react";
import { BarChartSquare02, Calculator, CalendarDate, HomeLine, LifeBuoy01, Receipt, Settings01, Users01 } from "@untitledui/icons";
import { TableCard, Table } from "@/components/application/table/table";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Alert } from "@/ds-pendiente/alert";
import { MetricItem } from "@/ds-pendiente/metric-item";
import { PageHeader } from "@/ds-pendiente/page-header";
import { InvoiceRow } from "./componentes/invoice-row";
import { ESCENARIO, categoria, categoriaPara, fecha, pesos } from "./datos";

/*
 * Chau Contador · Mi categoría · versión B (barra de margen + simulador).
 * Pregunta: ¿los monotributistas pueden anticipar en qué categoría van a quedar
 * y cuánto van a pagar? Escenario: Lucía, categoría D, al 92 % del tope.
 * Figma: https://www.figma.com/design/ViNzzQOTZMFqYHyWZbDbE0?node-id=4-47299 (escritorio)
 *        https://www.figma.com/design/ViNzzQOTZMFqYHyWZbDbE0?node-id=34-1017 (teléfono)
 */

const RUTA = "/p/chau-contador-mi-categoria";

const Logo = () => (
    <span className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand-solid">
            <Receipt className="size-4 text-white" />
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

export const MiCategoria = () => {
    const facturas = ESCENARIO.facturas;
    const facturado = facturas.reduce((s, f) => s + f.monto, 0);
    const actual = categoria(ESCENARIO.categoriaActual);
    const siguiente = categoria(String.fromCharCode(actual.letra.charCodeAt(0) + 1));
    const margen = actual.tope - facturado;
    const porcentaje = (facturado / actual.tope) * 100;

    const [mostrarAviso, setMostrarAviso] = useState(true);
    const [monto, setMonto] = useState("");
    const [simulado, setSimulado] = useState<number | null>(null);
    const campo = useRef<HTMLDivElement>(null);

    const simular = () => {
        const n = Number(monto.replace(/\D/g, ""));
        setSimulado(n > 0 ? n : null);
    };

    const resultado = (() => {
        if (simulado === null) return null;
        const total = facturado + simulado;
        const nueva = categoriaPara(total);
        if (!nueva) return { titulo: "Quedarías fuera del monotributo", detalle: `Con ${pesos(total)} en 12 meses superás el tope de la categoría K.` };
        if (nueva.letra === actual.letra)
            return { titulo: `Seguís en la categoría ${actual.letra}`, detalle: `Te quedarían ${pesos(actual.tope - total)} de margen. La cuota sigue en ${pesos(actual.cuotaServicios)} por mes.` };
        const diferencia = nueva.cuotaServicios - actual.cuotaServicios;
        return {
            titulo: `Pasarías a la categoría ${nueva.letra}`,
            detalle: `Cuota nueva: ${pesos(nueva.cuotaServicios)} por mes (${pesos(diferencia)} más que hoy), a partir de febrero de 2027.`,
        };
    })();

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSimple
                logo={<Logo />}
                searchPlaceholder="Buscar"
                activeUrl={RUTA}
                showAccountCard={false}
                featureCard={<AvisoRecategorizacion />}
                items={[
                    { label: "Inicio", href: `${RUTA}?seccion=inicio`, icon: HomeLine },
                    { label: "Mi categoría", href: RUTA, icon: BarChartSquare02 },
                    { label: "Facturas", href: `${RUTA}?seccion=facturas`, icon: Receipt },
                    { label: "Vencimientos", href: `${RUTA}?seccion=vencimientos`, icon: CalendarDate, badge: <Badge size="sm" type="modern">2</Badge> },
                    { label: "Simulador", href: `${RUTA}?seccion=simulador`, icon: Calculator },
                    { label: "Clientes", href: `${RUTA}?seccion=clientes`, icon: Users01 },
                ]}
                footerItems={[
                    { label: "Configuración", href: `${RUTA}?seccion=configuracion`, icon: Settings01 },
                    { label: "Ayuda", href: `${RUTA}?seccion=ayuda`, icon: LifeBuoy01 },
                ]}
            />

            <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
                <div className="mx-auto flex max-w-container flex-col gap-6 md:gap-8">
                    <PageHeader
                        title="Mi categoría"
                        description={`Monotributo · ${ESCENARIO.persona.actividad} · Categoría ${actual.letra} · Datos al ${fecha(ESCENARIO.hoy)}`}
                        actions={
                            <>
                                <Button color="secondary" size="md">
                                    Ver escalas vigentes
                                </Button>
                                <Button color="primary" size="md">
                                    Emitir factura
                                </Button>
                            </>
                        }
                    />

                    {mostrarAviso && (
                        <Alert
                            color="warning"
                            title={`Estás al ${Math.round(porcentaje)} % del tope de la categoría ${actual.letra}`}
                            description={`Si en los próximos meses facturás más de ${pesos(margen)}, en la recategorización de febrero pasás a la categoría ${siguiente.letra} y la cuota sube de ${pesos(actual.cuotaServicios)} a ${pesos(siguiente.cuotaServicios)} por mes.`}
                            onClose={() => setMostrarAviso(false)}
                            actions={
                                <>
                                    <Button color="link-gray" size="sm" onPress={() => setMostrarAviso(false)}>
                                        Ahora no
                                    </Button>
                                    <Button
                                        color="link-color"
                                        size="sm"
                                        onPress={() => {
                                            campo.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                                            campo.current?.querySelector("input")?.focus();
                                        }}
                                    >
                                        Simular una factura
                                    </Button>
                                </>
                            }
                        />
                    )}

                    <div className="grid gap-3 md:grid-cols-3 md:gap-6">
                        <MetricItem title="Facturado en los últimos 12 meses" value={pesos(facturado)} />
                        <MetricItem title={`Margen hasta el tope de la ${actual.letra}`} value={pesos(margen)} />
                        <MetricItem title="Cuota mensual actual" value={pesos(actual.cuotaServicios)} />
                    </div>

                    <section className="flex flex-col gap-5 rounded-xl bg-primary p-4 shadow-xs ring-1 ring-secondary ring-inset md:p-6" aria-labelledby="titulo-margen">
                        <div className="flex flex-col gap-1">
                            <h2 id="titulo-margen" className="text-lg font-semibold text-primary">
                                Cuánto te queda en la categoría {actual.letra}
                            </h2>
                            <p className="text-sm text-tertiary">
                                Se calcula con lo facturado en los últimos 12 meses. Tope de la {actual.letra} para servicios: {pesos(actual.tope)}.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <ProgressBar value={porcentaje} labelPosition="right" valueFormatter={(_, p) => `${Math.round(p)} %`} />
                            <div className="flex justify-between gap-2 text-sm text-tertiary max-md:hidden">
                                <span>{pesos(0)}</span>
                                <span>Facturado: {pesos(facturado)}</span>
                                <span>
                                    Tope {actual.letra}: {pesos(actual.tope)}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-secondary" />

                        <div ref={campo} className="flex flex-col gap-1.5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-end">
                                <Input
                                    className="flex-1"
                                    label="¿Cuánto pensás facturar en noviembre?"
                                    placeholder="$ 0"
                                    inputMode="numeric"
                                    value={monto}
                                    onChange={(v) => {
                                        const n = v.replace(/\D/g, "");
                                        setMonto(n ? pesos(Number(n)) : "");
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && simular()}
                                />
                                <Button color="primary" size="lg" className="max-md:w-full" onPress={simular}>
                                    Simular
                                </Button>
                            </div>
                            <p className="text-sm text-tertiary">Te mostramos en qué categoría quedarías y cuánto pagarías.</p>
                        </div>

                        {resultado && (
                            <div className="flex flex-col gap-1" role="status">
                                <p className="text-md font-semibold text-primary">{resultado.titulo}</p>
                                <p className="text-sm text-tertiary">{resultado.detalle}</p>
                            </div>
                        )}
                    </section>

                    {/* Escritorio: tabla */}
                    <TableCard.Root className="max-lg:hidden">
                        <TableCard.Header
                            title="Facturas de los últimos 12 meses"
                            description={`Mostrando 6 de ${facturas.length} comprobantes · Total: ${pesos(facturado)}`}
                        />
                        <Table aria-label="Facturas de los últimos 12 meses">
                            <Table.Header>
                                <Table.Head id="fecha" label="Fecha" isRowHeader />
                                <Table.Head id="comprobante" label="Comprobante" />
                                <Table.Head id="cliente" label="Cliente" />
                                <Table.Head id="concepto" label="Concepto" />
                                <Table.Head id="monto" label="Monto" />
                            </Table.Header>
                            <Table.Body items={facturas.slice(0, 6).map((f) => ({ ...f, id: f.comprobante }))}>
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

                    {/* Teléfono: lista */}
                    <section className="overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset lg:hidden" aria-labelledby="titulo-facturas">
                        <div className="flex flex-col gap-1 border-b border-secondary p-4">
                            <h2 id="titulo-facturas" className="text-lg font-semibold text-primary">
                                Últimas facturas
                            </h2>
                            <p className="text-sm text-tertiary">
                                6 de {facturas.length} · Total 12 meses: {pesos(facturado)}
                            </p>
                        </div>
                        <ul>
                            {facturas.slice(0, 6).map((f) => (
                                <InvoiceRow key={f.comprobante} client={f.cliente} details={`${f.concepto} · ${fecha(f.fecha)}`} amount={pesos(f.monto)} />
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
};
