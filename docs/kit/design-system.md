# Design system activo

**Ready**, sobre Untitled UI.

| | |
|---|---|
| Base de código | Untitled UI React, componentes gratis (MIT), instalados con `untitledui@0.1.69 init --vite` el 06/10/2026. Versiones exactas en `package.json` (React 19.3.0, React Aria Components 1.21.1, Tailwind 4.3.3, Vite 8.3.3). |
| Biblioteca de Figma | Untitled UI Figma PRO VARIABLES v8.0, copia en la cuenta de Edu: https://www.figma.com/design/Ue3QCW2RKfkTfYluDNRPOW (falta renombrarla "Ready" y publicarla). |
| Nombres de tokens | Los de Untitled UI tal cual (`text-primary`, `bg-brand-solid`, `border-secondary`, `fg-quaternary`…). |

## Capas

Archivos: capa Brand en `src/styles/marcas.css`; capa Mapped en `src/styles/theme.css` (de Untitled UI, no se toca). La marca se elige con `data-marca` en `<html>` (`MarcaProvider`); el modo, con la clase `dark-mode` (`ThemeProvider`). Página de muestra: Fundamentos (`src/pages/fundamentos.tsx`).

- **Brand**: la paleta de cada marca, `brand-50` a `brand-950`. En Figma, un modo por marca.
- **Mapped**: tokens por uso (texto, fondo, borde, ícono), en claro y oscuro. Los componentes sólo leen esta capa.

## Marcas ficticias

| | Brío | Ancla | Boceto |
|---|---|---|---|
| Qué es | App de inversión para gente joven que empieza | Banca de inversión sobria, carteras grandes | Baja fidelidad, para cuando todavía no hay decisiones visuales |
| Color base de la escala | Violeta `#6D4AFF` | Azul profundo `#1F3A5F` | Grises: la escala neutra de Untitled UI, sin valores literales |
| Tipografía | Plus Jakarta Sans | Source Serif 4 (títulos) + Inter (texto) | Balsamiq Sans (títulos) + tipografía del sistema (texto) |
| Radios | Muy redondeados (botón píldora, tarjeta 16 px) | Casi rectos (4 px) | Un mismo radio para todo (4 px) |
| Sombras | Las de Untitled UI | Las de Untitled UI | Ninguna |
| Tono | Cercano, tutea | Formal, de usted | El del producto que se prueba |

Boceto conserva los colores de estado (error, éxito, aviso) porque son parte de la interacción.
Las fotos, ilustraciones y gráficos no cambian solos: hace falta una pieza que en Boceto muestre un recuadro con una cruz.

El color base es el único valor literal: se usa sólo para generar la escala Brand.

## En Figma

Colección **0. Marca** con un modo por marca (Brío, Ancla, Boceto): escala `Brand/brand-50…950`, familias y pesos (`Typography/…`) y radios (`Radius/…`). Las variables del kit (`Colors/Brand/*`, `Font family/*`, `Font weight/*`, `radius-*`) apuntan a ella, así que se cambia de marca eligiendo el modo de **0. Marca** en un frame. Claro y oscuro siguen en **1. Color modes**. Muestra: página "Ready · Marcas".

- Boceto en Figma: Balsamiq Sans en títulos e Inter en texto; Medium pasa a Regular y Semibold a Bold, porque Balsamiq sólo tiene esos dos pesos.
- Los radios de Figma no se llaman igual que las clases de Tailwind: se igualan por píxeles (Figma `radius-md` 8 px = Tailwind `rounded-lg`).

| Figma | xxs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl |
|---|---|---|---|---|---|---|---|---|---|
| Brío | 2 | 6 | 8 | 12 | 14 | 16 | 20 | 24 | 28 |
| Ancla | 2 | 2 | 3 | 4 | 4 | 4 | 4 | 4 | 4 |
| Boceto | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 |

## Equivalencias con lo que se conocía

En Untitled UI, `bg` es lo que antes se llamaba surface y `fg` lo que se llamaba icon.

## Buzón de piezas pendientes

(vacío)
