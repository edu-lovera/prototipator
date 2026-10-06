import { Moon01, Sun } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { MARCAS, type Marca, useMarca } from "@/providers/marca-provider";
import { useTheme } from "@/providers/theme-provider";

// Marca más visible la opción elegida (en Untitled UI el cambio es muy sutil).
const ELEGIDO = "selected:bg-brand-primary selected:text-brand-secondary";

/** Selector de marca (Brío / Ancla) y de modo (claro / oscuro). Se usa en la galería y en los prototipos. */
export const SelectorMarcaModo = () => {
    const { marca, setMarca } = useMarca();
    const { theme, setTheme } = useTheme();

    const modoActual = theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <ButtonGroup
                aria-label="Marca"
                size="sm"
                selectedKeys={[marca]}
                disallowEmptySelection
                onSelectionChange={(claves) => {
                    const elegida = [...claves][0] as Marca | undefined;
                    if (elegida) setMarca(elegida);
                }}
            >
                {MARCAS.map((m) => (
                    <ButtonGroupItem key={m.id} id={m.id} className={ELEGIDO}>
                        {m.nombre}
                    </ButtonGroupItem>
                ))}
            </ButtonGroup>

            <ButtonGroup
                aria-label="Modo"
                size="sm"
                selectedKeys={[modoActual]}
                disallowEmptySelection
                onSelectionChange={(claves) => {
                    const elegido = [...claves][0] as "light" | "dark" | undefined;
                    if (elegido) setTheme(elegido);
                }}
            >
                <ButtonGroupItem id="light" iconLeading={Sun} className={ELEGIDO}>
                    Claro
                </ButtonGroupItem>
                <ButtonGroupItem id="dark" iconLeading={Moon01} className={ELEGIDO}>
                    Oscuro
                </ButtonGroupItem>
            </ButtonGroup>
        </div>
    );
};
