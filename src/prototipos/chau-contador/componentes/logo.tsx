import { cx } from "@/utils/cx";

/*
 * Componente local de Chau Contador: el símbolo (una mano que saluda, "chau")
 * y el logo (símbolo en el cuadrado de marca + nombre). Dibujo propio, provisorio.
 * En Figma: "Logo", biblioteca "Chau Contador · Componentes locales".
 * El símbolo usa currentColor: toma el color del texto que lo rodea.
 */

export const LogoSymbol = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
        <g transform="rotate(-24 32 40)" stroke="currentColor" strokeLinecap="round" fill="currentColor">
            <rect x="21" y="33" width="22" height="22" rx="8" stroke="none" />
            <line x1="23.8" y1="37" x2="18.95" y2="23.87" strokeWidth="5.6" />
            <line x1="29.3" y1="35" x2="26.83" y2="14.15" strokeWidth="5.6" />
            <line x1="34.8" y1="35" x2="36.96" y2="12.1" strokeWidth="5.6" />
            <line x1="40.2" y1="37" x2="46.23" y2="17.93" strokeWidth="5.6" />
            <line x1="40.5" y1="47" x2="51.52" y2="40.11" strokeWidth="6" />
        </g>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6">
            <path d="M47 8.5 q5.5 2.5 7.5 8.5" />
            <path d="M9 42 q0.5 6.5 5.5 10.5" />
        </g>
    </svg>
);

export const Logo = ({ className }: { className?: string }) => (
    <span className={cx("flex items-center gap-2.5", className)}>
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-solid">
            <LogoSymbol className="size-6 text-white" />
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-primary">Chau Contador</span>
    </span>
);
