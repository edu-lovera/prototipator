import { Check, Copy01, LinkExternal01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useClipboard } from "@/hooks/use-clipboard";
import { ESTADOS, ORIGENES, PROTOTIPOS, type Prototipo, direccion } from "@/prototipos/registro";

/*
 * Panel de detalle de un prototipo: entra desde la derecha (Slideout menu de
 * Untitled UI, el equivalente al drawer de Multi). Versiones y casos de uso,
 * cada uno con su link y un botón para copiarlo.
 */

export const formatearFecha = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });

const FilaLink = ({ titulo, detalle, href, id }: { titulo: string; detalle: string; href: string; id: string }) => {
    const { copied, copy } = useClipboard();
    return (
        <li className="flex items-start justify-between gap-3 border-b border-secondary py-3 last:border-b-0">
            <a href={href} target="_blank" rel="noreferrer" className="group flex min-w-0 flex-1 flex-col gap-0.5 outline-focus-ring focus-visible:outline-2">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                    {titulo}
                    <LinkExternal01 className="size-3.5 text-fg-quaternary" aria-hidden />
                </span>
                <span className="text-sm text-tertiary">{detalle}</span>
            </a>
            <Button
                color="tertiary"
                size="sm"
                iconLeading={copied === id ? Check : Copy01}
                aria-label={`Copiar el link de ${titulo}`}
                onPress={() => copy(href, id)}
            />
        </li>
    );
};

const Dato = ({ nombre, valor }: { nombre: string; valor: string }) => (
    <div className="flex justify-between gap-4 text-sm">
        <dt className="text-tertiary">{nombre}</dt>
        <dd className="text-right font-medium text-secondary">{valor}</dd>
    </div>
);

export const PanelDetalle = ({
    prototipo,
    isOpen,
    onOpenChange,
}: {
    prototipo: Prototipo | null;
    isOpen: boolean;
    onOpenChange: (abierto: boolean) => void;
}) => (
    <SlideoutMenu isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
        {({ close }) =>
            prototipo && (
                <>
                    <SlideoutMenu.Header onClose={close} className="flex flex-col gap-2 pr-12">
                        <Badge type="pill-color" color={ESTADOS[prototipo.estado].color} size="sm" className="w-max">
                            {ESTADOS[prototipo.estado].nombre}
                        </Badge>
                        <h2 className="font-display text-lg font-semibold text-primary">{prototipo.nombre}</h2>
                        <p className="text-sm text-tertiary">{prototipo.resumen}</p>
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content className="pb-6">
                        {prototipo.pregunta && (
                            <section className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
                                <h3 className="text-xs font-semibold text-tertiary">Pregunta de investigación</h3>
                                <p className="text-sm text-secondary">{prototipo.pregunta}</p>
                            </section>
                        )}

                        <section className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold text-primary">{prototipo.versiones.length > 1 ? "Versiones" : "Prototipo"}</h3>
                            <ul>
                                {prototipo.versiones.map((v) => (
                                    <FilaLink
                                        key={v.ruta}
                                        id={v.ruta}
                                        titulo={
                                            prototipo.versiones.length > 1
                                                ? `Versión ${v.variante}${v.rol === "elegida" ? " · elegida" : ""}`
                                                : prototipo.nombre
                                        }
                                        detalle={v.descripcion}
                                        href={direccion(v.ruta)}
                                    />
                                ))}
                            </ul>
                        </section>

                        {prototipo.casosDeUso && prototipo.casosDeUso.length > 0 && (
                            <section className="flex flex-col gap-1">
                                <h3 className="text-sm font-semibold text-primary">Casos de uso</h3>
                                <p className="text-xs text-tertiary">
                                    Abren la versión {prototipo.versiones[0].variante}; adentro se cambia de versión sin perder el caso.
                                </p>
                                <ul>
                                    {prototipo.casosDeUso
                                        .filter((c) => !c.paraPruebas)
                                        .map((c) => (
                                            <FilaLink
                                                key={c.id}
                                                id={`caso-${c.id}`}
                                                titulo={c.etiqueta}
                                                detalle={c.descripcion}
                                                href={direccion(prototipo.versiones[0].ruta, c.id)}
                                            />
                                        ))}
                                </ul>
                            </section>
                        )}

                        <dl className="flex flex-col gap-2 border-t border-secondary pt-4">
                            <Dato nombre="Producto" valor={prototipo.producto} />
                            <Dato nombre="Origen" valor={ORIGENES[prototipo.origen]} />
                            <Dato nombre="Autor" valor={([] as string[]).concat(prototipo.autor).join(", ")} />
                            <Dato nombre="Versión" valor={prototipo.version} />
                            <Dato nombre="Creado" valor={formatearFecha(prototipo.creado)} />
                            <Dato nombre="Actualizado" valor={formatearFecha(prototipo.actualizado)} />
                            {prototipo.entregado && <Dato nombre="Entregado a desarrollo" valor={formatearFecha(prototipo.entregado)} />}
                            {prototipo.sigueEn && (
                                <Dato nombre="El trabajo siguió en" valor={PROTOTIPOS.find((p) => p.id === prototipo.sigueEn)?.nombre ?? prototipo.sigueEn} />
                            )}
                        </dl>

                        {prototipo.versiones.some((v) => v.figma) && (
                            <div className="flex flex-col gap-2">
                                {prototipo.versiones
                                    .filter((v) => v.figma)
                                    .map((v) => (
                                        <Button key={v.ruta} color="secondary" size="sm" href={v.figma!} target="_blank" iconTrailing={LinkExternal01}>
                                            {prototipo.versiones.length > 1 ? `Figma de la versión ${v.variante}` : "Ver en Figma"}
                                        </Button>
                                    ))}
                            </div>
                        )}
                    </SlideoutMenu.Content>
                </>
            )
        }
    </SlideoutMenu>
);
