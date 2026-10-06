import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { Link } from "react-router";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Toggle } from "@/components/base/toggle/toggle";
import { SelectorMarcaModo } from "@/galeria/selector-marca-modo";
import { type Marca, useMarca } from "@/providers/marca-provider";

/*
 * Página de fundamentos del design system Ready.
 * Muestra las dos capas de tokens y algunos componentes, con un selector de
 * marca y de modo para ver el cambio en vivo.
 */

// Capa Brand: la escala de cada marca. Las clases van escritas completas para que Tailwind las genere.
const ESCALA_BRAND = [
    { paso: "50", clase: "bg-brand-50" },
    { paso: "100", clase: "bg-brand-100" },
    { paso: "200", clase: "bg-brand-200" },
    { paso: "300", clase: "bg-brand-300" },
    { paso: "400", clase: "bg-brand-400" },
    { paso: "500", clase: "bg-brand-500" },
    { paso: "600", clase: "bg-brand-600" },
    { paso: "700", clase: "bg-brand-700" },
    { paso: "800", clase: "bg-brand-800" },
    { paso: "900", clase: "bg-brand-900" },
    { paso: "950", clase: "bg-brand-950" },
];

// Capa Mapped: tokens por uso, con el nombre que tienen en Untitled UI (y en Figma).
const TOKENS_FONDO = [
    { nombre: "bg-primary", clase: "bg-primary" },
    { nombre: "bg-secondary", clase: "bg-secondary" },
    { nombre: "bg-tertiary", clase: "bg-tertiary" },
    { nombre: "bg-brand-primary", clase: "bg-brand-primary" },
    { nombre: "bg-brand-secondary", clase: "bg-brand-secondary" },
    { nombre: "bg-brand-solid", clase: "bg-brand-solid" },
    { nombre: "bg-brand-section", clase: "bg-brand-section" },
];

const TOKENS_TEXTO = [
    { nombre: "text-primary", clase: "text-primary" },
    { nombre: "text-secondary", clase: "text-secondary" },
    { nombre: "text-tertiary", clase: "text-tertiary" },
    { nombre: "text-brand-primary", clase: "text-brand-primary" },
    { nombre: "text-brand-secondary", clase: "text-brand-secondary" },
];

const TOKENS_BORDE = [
    { nombre: "border-primary", clase: "border-primary" },
    { nombre: "border-secondary", clase: "border-secondary" },
    { nombre: "border-brand", clase: "border-brand" },
];

const ESCALA_TIPOGRAFICA = [
    { nombre: "display-lg", clase: "font-display text-display-lg font-semibold" },
    { nombre: "display-sm", clase: "font-display text-display-sm font-semibold" },
    { nombre: "text-xl", clase: "text-xl font-semibold" },
    { nombre: "text-md", clase: "text-md" },
    { nombre: "text-sm", clase: "text-sm" },
];

// Cada marca tiene su tono: Brío tutea, Ancla trata de usted.
const TEXTOS: Record<Marca, { saludo: string; bajada: string; accion: string }> = {
    brio: {
        saludo: "Hola, empezá a invertir hoy",
        bajada: "Armá tu primera cartera en minutos y seguila desde el celular.",
        accion: "Empezar",
    },
    ancla: {
        saludo: "Su patrimonio, administrado con criterio",
        bajada: "Consulte el estado de sus carteras y los informes de su asesor.",
        accion: "Ingresar",
    },
};

const Seccion = ({ titulo, descripcion, children }: { titulo: string; descripcion?: string; children: React.ReactNode }) => (
    <section className="flex flex-col gap-5 border-t border-secondary pt-8">
        <div>
            <h2 className="font-display text-xl font-semibold text-primary">{titulo}</h2>
            {descripcion && <p className="mt-1 text-md text-tertiary">{descripcion}</p>}
        </div>
        {children}
    </section>
);

export const Fundamentos = () => {
    const { marca } = useMarca();
    const textos = TEXTOS[marca];

    return (
        <div className="min-h-dvh bg-primary">
            <header className="sticky top-0 z-10 border-b border-secondary bg-primary">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
                    <div>
                        <Link to="/" className="flex items-center gap-1 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                            <ArrowLeft className="size-4" /> Galería
                        </Link>
                        <h1 className="font-display text-display-xs font-semibold text-primary">Ready · Fundamentos</h1>
                    </div>

                    <SelectorMarcaModo />
                </div>
            </header>

            <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 md:px-8">
                {/* Muestra de marca */}
                <div className="flex flex-col gap-4 rounded-2xl bg-brand-section p-8 md:p-10">
                    <h2 className="font-display text-display-sm font-semibold text-primary_on-brand">{textos.saludo}</h2>
                    <p className="max-w-xl text-lg text-secondary_on-brand">{textos.bajada}</p>
                    <div>
                        <Button size="lg" color="secondary" iconTrailing={ArrowRight}>
                            {textos.accion}
                        </Button>
                    </div>
                </div>

                <Seccion titulo="Capa Brand" descripcion="La paleta de cada marca. Es lo único que cambia entre Brío y Ancla; nadie la usa directo.">
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-11">
                        {ESCALA_BRAND.map((c) => (
                            <div key={c.paso} className="flex flex-col gap-1.5">
                                <div className={`h-14 rounded-lg ring-1 ring-secondary ring-inset ${c.clase}`} />
                                <span className="text-xs text-tertiary">{c.paso}</span>
                            </div>
                        ))}
                    </div>
                </Seccion>

                <Seccion titulo="Capa Mapped" descripcion="Tokens por uso. Los componentes leen sólo estos, y cambian solos con la marca y el modo.">
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                        {TOKENS_FONDO.map((t) => (
                            <div key={t.nombre} className="flex items-center gap-3">
                                <div className={`size-10 shrink-0 rounded-lg ring-1 ring-secondary ring-inset ${t.clase}`} />
                                <code className="text-sm text-secondary">{t.nombre}</code>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {TOKENS_TEXTO.map((t) => (
                            <p key={t.nombre} className={`text-md font-medium ${t.clase}`}>
                                {t.nombre}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {TOKENS_BORDE.map((t) => (
                            <div key={t.nombre} className={`rounded-lg border-2 px-3 py-2 ${t.clase}`}>
                                <code className="text-sm text-secondary">{t.nombre}</code>
                            </div>
                        ))}
                    </div>
                </Seccion>

                <Seccion titulo="Tipografía" descripcion="Títulos con la tipografía display de la marca; textos con la de lectura.">
                    <div className="flex flex-col gap-4">
                        {ESCALA_TIPOGRAFICA.map((t) => (
                            <div key={t.nombre} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                <code className="w-28 shrink-0 text-xs text-quaternary">{t.nombre}</code>
                                <p className={`text-primary ${t.clase}`}>Cartera de inversión</p>
                            </div>
                        ))}
                    </div>
                </Seccion>

                <Seccion titulo="Componentes" descripcion="Componentes de Untitled UI sin tocar: toman la marca y el modo de los tokens.">
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="md">{textos.accion}</Button>
                        <Button size="md" color="secondary">
                            Ver detalle
                        </Button>
                        <Button size="md" color="tertiary">
                            Cancelar
                        </Button>
                        <Button size="md" color="link-color">
                            Más información
                        </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge type="pill-color" color="brand" size="md">
                            Nuevo
                        </Badge>
                        <Badge type="pill-color" color="success" size="md">
                            +2,4 %
                        </Badge>
                        <Badge type="pill-color" color="error" size="md">
                            −1,1 %
                        </Badge>
                        <Badge type="color" color="gray" size="md">
                            Simulado
                        </Badge>
                    </div>
                    <div className="grid max-w-md gap-5">
                        <Input label="Monto a invertir" placeholder="0,00" hint="Datos ficticios: no se mueve dinero real." />
                        <Checkbox label="Acepto el perfil de riesgo" defaultSelected />
                        <Toggle label="Avisarme cuando cambie el precio" defaultSelected />
                    </div>
                </Seccion>
            </main>
        </div>
    );
};
