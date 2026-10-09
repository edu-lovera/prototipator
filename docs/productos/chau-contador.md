# Chau Contador

Producto ficticio para la demo: ayuda a monotributistas con tareas simples sin pagarle a un contador. Nombre provisorio (no sirve como nombre comercial).

- Figma: carpeta Chau Contador. Prototipos: https://www.figma.com/design/ViNzzQOTZMFqYHyWZbDbE0 · Componentes locales: https://www.figma.com/design/MYnVGksmvQQHOk4HAcexv8
- Código: `src/prototipos/chau-contador/` (datos del escenario en `datos.ts`, escalas reales de agosto 2026 a enero 2027).

## Mi categoría · versión B (0.1.0, 09/10/2026)

- Ruta: `#/p/chau-contador-mi-categoria`. Escenario: Lucía Ferreyra, servicios, categoría D, 92 % del tope.
- Tareas previstas: 1) ¿en qué categoría vas a quedar en febrero?; 2) si facturás $ 3.000.000 en noviembre, ¿cuánto pagarías?; 3) ¿cuánto podés facturar sin cambiar de categoría? Se mide acierto, tiempo y dificultad (1 a 7).
- El simulador suma el monto a lo facturado en 12 meses y busca la categoría (simplificación: no descuenta lo que sale de la ventana de 12 meses).

## Mi categoría · versión A (0.1.0, 09/10/2026)

- Ruta: `#/p/chau-contador-mi-categoria-a`. Referencia de la comparación: la tabla de categorías como la da el sitio oficial, con la actual marcada. Sin aviso, sin barra de margen, sin simulador y sin la métrica de margen. Mismo escenario y mismas facturas que la B.
- Lo común a las dos versiones (menú, contenedor, facturas) está en `compartido.tsx`.
- Falta en Figma.

## Casos de uso (09/10/2026)

`?escenario=lejos` (55 %), `limite` (92 %, el de siempre) y `pasada` (108 %): la misma Lucía en la D; los montos del escenario base se escalan y se redondean a miles (`escenarioPara` en `datos.ts`). En la B, el aviso aparece desde el 80 % y en rojo cuando ya pasó el tope, y la métrica de margen pasa a "Por encima del tope". Las dos versiones son un solo prototipo en el registro (versión 0.2.0).
