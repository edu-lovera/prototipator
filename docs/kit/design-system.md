# Design system activo

**Ready**, sobre Untitled UI.

| | |
|---|---|
| Base de código | Untitled UI React, componentes gratis (MIT). Versión: se fija al instalar (07/10). |
| Biblioteca de Figma | Untitled UI Figma PRO duplicado y renombrado "Ready" (se arma el 08/10). |
| Nombres de tokens | Los de Untitled UI tal cual (`text-primary`, `bg-brand-solid`, `border-secondary`, `fg-quaternary`…). |

## Capas

- **Brand**: la paleta de cada marca, `brand-50` a `brand-950`. En Figma, un modo por marca.
- **Mapped**: tokens por uso (texto, fondo, borde, ícono), en claro y oscuro. Los componentes sólo leen esta capa.

## Marcas ficticias

| | Brío | Ancla |
|---|---|---|
| Qué es | App de inversión para gente joven que empieza | Banca de inversión sobria, carteras grandes |
| Color base de la escala | Violeta `#6D4AFF` | Azul profundo `#1F3A5F` |
| Tipografía | Plus Jakarta Sans | Source Serif 4 (títulos) + Inter (texto) |
| Radios | Muy redondeados (botón píldora, tarjeta 16 px) | Casi rectos (4 px) |
| Tono | Cercano, tutea | Formal, de usted |

El color base es el único valor literal: se usa sólo para generar la escala Brand.

## Equivalencias con lo que se conocía

En Untitled UI, `bg` es lo que antes se llamaba surface y `fg` lo que se llamaba icon.

## Buzón de piezas pendientes

(vacío)
