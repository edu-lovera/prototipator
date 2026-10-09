import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { MetricItem } from "@/ds-pendiente/metric-item";
import { PageHeader } from "@/ds-pendiente/page-header";
import { cx } from "@/utils/cx";
import { MarcoChauContador, SeccionFacturas } from "./compartido";
import { ESCALAS, ESCENARIO, categoria, fecha, pesos } from "./datos";

/*
 * Chau Contador · Mi categoría · versión A (tabla de categorías).
 * Es la referencia de la comparación A/B: muestra la información como la da el
 * sitio oficial, la tabla de escalas con la categoría actual marcada, sin barra
 * de margen, sin aviso y sin simulador. Mismo escenario que la versión B.
 */

const RUTA = "/p/chau-contador-mi-categoria-a";

export const MiCategoriaA = () => {
    const facturado = ESCENARIO.facturas.reduce((s, f) => s + f.monto, 0);
    const actual = categoria(ESCENARIO.categoriaActual);

    return (
        <MarcoChauContador ruta={RUTA}>
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

            <div className="grid gap-3 md:grid-cols-2 md:gap-6">
                <MetricItem title="Facturado en los últimos 12 meses" value={pesos(facturado)} />
                <MetricItem title="Cuota mensual actual" value={pesos(actual.cuotaServicios)} />
            </div>

            <TableCard.Root size="sm">
                <TableCard.Header
                    title="Categorías del monotributo · Servicios"
                    description={`Tope de ingresos brutos de los últimos 12 meses. Vigentes de agosto de 2026 a enero de 2027. Próxima recategorización: hasta el ${ESCENARIO.proximaRecategorizacion}.`}
                />
                <div className="overflow-x-auto">
                    <Table aria-label="Categorías del monotributo para servicios">
                        <Table.Header>
                            <Table.Head id="categoria" label="Categoría" isRowHeader className="max-md:px-3" />
                            <Table.Head id="tope" label="Tope anual" className="max-md:px-3" />
                            <Table.Head id="cuota" label="Cuota" className="max-md:px-3" />
                        </Table.Header>
                        <Table.Body items={ESCALAS.map((c) => ({ ...c, id: c.letra }))}>
                            {(c) => {
                                const esActual = c.letra === actual.letra;
                                return (
                                    <Table.Row id={c.id} className={cx(esActual && "bg-brand-primary")}>
                                        <Table.Cell className="font-medium text-primary max-md:px-3">
                                            <span className="flex items-center gap-2">
                                                {c.letra}
                                                {esActual && (
                                                    <Badge type="pill-color" color="brand" size="sm">
                                                        <span className="max-md:hidden">Tu categoría</span>
                                                        <span className="md:hidden">Tuya</span>
                                                    </Badge>
                                                )}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell className="tabular-nums max-md:px-3">{pesos(c.tope)}</Table.Cell>
                                        <Table.Cell className="tabular-nums max-md:px-3">{pesos(c.cuotaServicios)}</Table.Cell>
                                    </Table.Row>
                                );
                            }}
                        </Table.Body>
                    </Table>
                </div>
            </TableCard.Root>

            <SeccionFacturas />
        </MarcoChauContador>
    );
};
