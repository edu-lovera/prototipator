import { ArrowRight, LayersThree01, Plus } from "@untitledui/icons";
import { Link } from "react-router";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Badge } from "@/components/base/badges/badges";
import { SelectorMarcaModo } from "@/galeria/selector-marca-modo";
import { ESTADOS, ORIGENES, PROTOTIPOS, type Prototipo } from "@/prototipos/registro";

/*
 * Galería de prototipos de Prototypator.
 * Arriba, el design system activo; abajo, los prototipos del registro.
 */

const formatearFecha = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });

const TarjetaPrototipo = ({ prototipo }: { prototipo: Prototipo }) => {
    const estado = ESTADOS[prototipo.estado];
    return (
        <Link
            to={`/p/${prototipo.id}`}
            className="group flex flex-col gap-3 rounded-xl border border-secondary bg-primary p-5 outline-brand transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2"
        >
            <div className="flex flex-wrap items-center gap-2">
                <Badge type="pill-color" color={estado.color} size="sm">
                    {estado.nombre}
                </Badge>
                <Badge type="color" color="gray" size="sm">
                    {ORIGENES[prototipo.origen]}
                </Badge>
                {prototipo.varianteDe && (
                    <Badge type="color" color="gray" size="sm">
                        Variante A/B
                    </Badge>
                )}
            </div>
            <div>
                <h3 className="font-display text-lg font-semibold text-primary">{prototipo.nombre}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-tertiary">{prototipo.descripcion}</p>
            </div>
            <p className="mt-auto text-xs text-quaternary">
                v{prototipo.version} · {formatearFecha(prototipo.actualizado)}
            </p>
        </Link>
    );
};

export const Galeria = () => {
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
                                <p className="text-sm text-tertiary">Capas de color, tipografía y componentes de Brío y Ancla.</p>
                            </div>
                        </div>
                        <ArrowRight className="size-5 shrink-0 text-fg-brand-primary transition group-hover:translate-x-0.5" />
                    </Link>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="font-display text-lg font-semibold text-primary">Prototipos</h2>
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
                            {PROTOTIPOS.map((p) => (
                                <TarjetaPrototipo key={p.id} prototipo={p} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs text-quaternary md:px-8">
                Prototipos para investigación. Sin datos privados ni dinero real.
            </footer>
        </div>
    );
};
