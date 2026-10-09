import { useRef, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Alert } from "@/ds-pendiente/alert";
import { MetricItem } from "@/ds-pendiente/metric-item";
import { PageHeader } from "@/ds-pendiente/page-header";
import { useParametro } from "@/prototipos/parametros";
import { MarcoChauContador, SeccionFacturas } from "./compartido";
import { categoria, categoriaPara, escenarioPara, fecha, pesos } from "./datos";

/*
 * Chau Contador · Mi categoría · versión B (barra de margen + simulador).
 * Pregunta: ¿los monotributistas pueden anticipar en qué categoría van a quedar
 * y cuánto van a pagar? Escenario: Lucía, categoría D, al 92 % del tope.
 * Figma: https://www.figma.com/design/ViNzzQOTZMFqYHyWZbDbE0?node-id=4-47299 (escritorio)
 *        https://www.figma.com/design/ViNzzQOTZMFqYHyWZbDbE0?node-id=34-1017 (teléfono)
 */

const RUTA = "/p/chau-contador-mi-categoria";

export const MiCategoria = () => {
    const ESCENARIO = escenarioPara(useParametro("escenario"));
    const facturas = ESCENARIO.facturas;
    const facturado = facturas.reduce((s, f) => s + f.monto, 0);
    const actual = categoria(ESCENARIO.categoriaActual);
    const siguiente = categoria(String.fromCharCode(actual.letra.charCodeAt(0) + 1));
    const margen = actual.tope - facturado;
    const porcentaje = (facturado / actual.tope) * 100;
    const pasada = margen < 0;
    const destino = (pasada ? categoriaPara(facturado) : null) ?? siguiente;

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
            return {
                titulo: `Seguís en la categoría ${actual.letra}`,
                detalle: `Te quedarían ${pesos(actual.tope - total)} de margen. La cuota sigue en ${pesos(actual.cuotaServicios)} por mes.`,
            };
        const diferencia = nueva.cuotaServicios - actual.cuotaServicios;
        return {
            titulo: `Pasarías a la categoría ${nueva.letra}`,
            detalle: `Cuota nueva: ${pesos(nueva.cuotaServicios)} por mes (${pesos(diferencia)} más que hoy), a partir de febrero de 2027.`,
        };
    })();

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

            {mostrarAviso && porcentaje >= 80 && (
                <Alert
                    color={pasada ? "error" : "warning"}
                    title={
                        pasada
                            ? `Superaste el tope de la categoría ${actual.letra}`
                            : `Estás al ${Math.round(porcentaje)} % del tope de la categoría ${actual.letra}`
                    }
                    description={
                        pasada
                            ? `Facturaste ${pesos(-margen)} más que el tope. Si sigue así, en la recategorización de febrero pasás a la categoría ${destino.letra} y la cuota sube de ${pesos(actual.cuotaServicios)} a ${pesos(destino.cuotaServicios)} por mes.`
                            : `Si en los próximos meses facturás más de ${pesos(margen)}, en la recategorización de febrero pasás a la categoría ${siguiente.letra} y la cuota sube de ${pesos(actual.cuotaServicios)} a ${pesos(siguiente.cuotaServicios)} por mes.`
                    }
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
                <MetricItem
                    title={pasada ? `Por encima del tope de la ${actual.letra}` : `Margen hasta el tope de la ${actual.letra}`}
                    value={pesos(Math.abs(margen))}
                />
                <MetricItem title="Cuota mensual actual" value={pesos(actual.cuotaServicios)} />
            </div>

            <section
                className="flex flex-col gap-5 rounded-xl bg-primary p-4 shadow-xs ring-1 ring-secondary ring-inset md:p-6"
                aria-labelledby="titulo-margen"
            >
                <div className="flex flex-col gap-1">
                    <h2 id="titulo-margen" className="text-lg font-semibold text-primary">
                        Cuánto te queda en la categoría {actual.letra}
                    </h2>
                    <p className="text-sm text-tertiary">
                        Se calcula con lo facturado en los últimos 12 meses. Tope de la {actual.letra} para servicios: {pesos(actual.tope)}.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <ProgressBar value={Math.min(porcentaje, 100)} labelPosition="right" valueFormatter={() => `${Math.round(porcentaje)} %`} />
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

            <SeccionFacturas />
        </MarcoChauContador>
    );
};
