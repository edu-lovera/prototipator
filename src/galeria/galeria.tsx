import { useState } from "react";
import { ArrowRight, ChevronRight, LayersThree01, Plus } from "@untitledui/icons";
import { Link } from "react-router";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Badge } from "@/components/base/badges/badges";
import { Toggle } from "@/components/base/toggle/toggle";
import { PanelDetalle, formatearFecha } from "@/galeria/panel-detalle";
import { SelectorMarcaModo } from "@/galeria/selector-marca-modo";
import { ESTADOS, ORIGENES, PROTOTIPOS, type Prototipo, direccion } from "@/prototipos/registro";
import { cx } from "@/utils/cx";

/*
 * Galería de prototipos de Prototypator.
 * Arriba, el design system activo; abajo, los prototipos del registro.
 */

const TarjetaPrototipo = ({ prototipo, onDetalle }: { prototipo: Prototipo; onDetalle: () => void }) => {
    const estado = ESTADOS[prototipo.estado];
    const principal = prototipo.versiones.find((v) => v.rol === "elegida") ?? prototipo.versiones[0];
    const archivado = prototipo.estado === "archivado";
    return (
        <article className={cx("flex flex-col rounded-xl border border-secondary bg-primary transition hover:border-brand", archivado && "opacity-70")}>
            <a
                href={direccion(principal.ruta)}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 flex-col gap-3 rounded-t-xl p-5 outline-brand focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <Badge type="pill-color" color={estado.color} size="sm" className="w-max">
                    {estado.nombre}
                </Badge>
                <div>
                    <h3 className="font-display text-lg font-semibold text-primary">{prototipo.nombre}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-tertiary">{prototipo.resumen}</p>
                </div>
                <p className="mt-auto text-xs text-tertiary">
                    {prototipo.producto} · {ORIGENES[prototipo.origen]}
                    {prototipo.versiones.length > 1 && ` · Versiones ${prototipo.versiones.map((v) => v.variante).join(", ")}`}
                </p>
                {prototipo.entregado && prototipo.estado === "exploracion" && (
                    <p className="text-xs text-warning-primary">Se entregó el {formatearFecha(prototipo.entregado)} y volvió a moverse.</p>
                )}
            </a>
            <button
                type="button"
                onClick={onDetalle}
                className="flex items-center justify-between gap-2 rounded-b-xl border-t border-secondary px-5 py-3 text-left text-xs text-tertiary outline-brand hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <span>
                    v{prototipo.version} · {formatearFecha(prototipo.actualizado)}
                </span>
                <span className="flex items-center gap-1 font-semibold text-brand-secondary">
                    Ver detalle <ChevronRight className="size-4" />
                </span>
            </button>
        </article>
    );
};

export const Galeria = () => {
    const [detalle, setDetalle] = useState<Prototipo | null>(null);
    const [verArchivados, setVerArchivados] = useState(false);
    const archivados = PROTOTIPOS.filter((p) => p.estado === "archivado").length;
    const visibles = PROTOTIPOS.filter((p) => verArchivados || p.estado !== "archivado").sort(
        (a, b) => Number(a.estado === "archivado") - Number(b.estado === "archivado"),
    );
    return (
        <div className="min-h-dvh bg-primary">
            <header className="border-b border-secondary">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
                    <div>
                        <h1 className="font-display text-display-xs font-semibold text-primary">Prototypator</h1>
                        <p className="text-sm text-tertiary">De la pregunta de investigación a la especificación validada.</p>
                    </div>
                    <SelectorMarcaModo />
                </div>
            </header>

            <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 md:px-8">
                <section className="flex flex-col gap-4">
                    <h2 className="font-display text-lg font-semibold text-primary">Design system</h2>
                    <Link
                        to="/fundamentos"
                        className="group flex items-center justify-between gap-4 rounded-xl bg-brand-primary p-5 ring-1 ring-brand outline-brand ring-inset focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-solid">
                                <LayersThree01 className="size-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-primary">Ready · Fundamentos</p>
                                <p className="text-sm text-tertiary">Capas de color, tipografía y componentes de Brío, Ancla y Boceto.</p>
                            </div>
                        </div>
                        <ArrowRight className="size-5 shrink-0 text-fg-brand-primary transition group-hover:translate-x-0.5" />
                    </Link>
                </section>

                <section className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="font-display text-lg font-semibold text-primary">Prototipos</h2>
                        {archivados > 0 && (
                            <Toggle size="sm" label={`Mostrar archivados (${archivados})`} isSelected={verArchivados} onChange={setVerArchivados} />
                        )}
                    </div>
                    {PROTOTIPOS.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-primary py-12">
                            <EmptyState size="md">
                                <EmptyState.Header pattern="none">
                                    <EmptyState.FeaturedIcon icon={Plus} color="brand" theme="light" />
                                </EmptyState.Header>
                                <EmptyState.Content>
                                    <EmptyState.Title>Todavía no hay prototipos</EmptyState.Title>
                                    <EmptyState.Description>
                                        Pedile uno a Claude con un frame de Figma, un pedido en texto o una pregunta de investigación.
                                    </EmptyState.Description>
                                </EmptyState.Content>
                            </EmptyState>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {visibles.map((p) => (
                                <TarjetaPrototipo key={p.id} prototipo={p} onDetalle={() => setDetalle(p)} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <PanelDetalle prototipo={detalle} isOpen={detalle !== null} onOpenChange={(abierto) => !abierto && setDetalle(null)} />

            <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs text-quaternary md:px-8">
                Prototipos para investigación. Sin datos privados ni dinero real.
            </footer>
        </div>
    );
};
