# Decisiones

Una línea por decisión: fecha, qué se decidió y por qué.

- 06/10/2026 · Repo nuevo y público `edu-lovera/prototipator`, licencia MIT: GitHub Pages gratis lo pide y no lleva nada de Gallo.
- 06/10/2026 · Nombre del workflow: **Prototipator**. En el repo y en los links va en minúsculas, para no fallar al tipearlo.
- 06/10/2026 · Carpeta local `Documentos/Prototypator/` con `repo/` (lo que se publica) y `Claude outputs/` (no se publica): se puede mostrar en una charla sin exponer nada privado.
- 06/10/2026 · Galería y pruebas se reescriben desde cero, sin copiar código de Gallo.
- 06/10/2026 · Base del design system: Untitled UI (código gratis MIT + Figma PRO), con marcas ficticias encima.
- 06/10/2026 · Design system **Ready**, por el concepto de *AI readiness* que Edu quiere desarrollar.
- 06/10/2026 · Dos marcas ficticias del mismo rubro y públicos opuestos, para mostrar el cambio de marca en vivo: **Brío** y **Ancla**.
- 06/10/2026 · Grabación en Clarity, proyecto propio `Prototypator` (ID `ytjcq3higt`). Resultados en una hoja de Google propia, privada, en la carpeta Prototypator del Drive personal.
- 06/10/2026 · Claude no borra archivos de Edu: lo que sobra va a `Prototypator/_para_borrar/` y lo borra Edu. Única excepción: los temporales internos de `.git` al hacer un commit.
- 06/10/2026 · Las marcas cambian con `data-marca` en `<html>` y una capa Brand propia; la capa Mapped de Untitled UI queda intacta, así una actualización de Untitled no pisa las marcas.
- 06/10/2026 · Los paquetes se instalan desde la Terminal de Edu (el entorno de Claude no llega a npm). Para abrir el proyecto: doble clic en `Abrir Prototypator.command`.
- 06/10/2026 · Galería en `/` con registro de prototipos en `src/prototipos/registro.ts` (origen, estado, versión, fecha, variante A/B). Rutas con `#` (HashRouter) para que GitHub Pages no dé 404 al recargar.
- 06/10/2026 · Publicación automática en GitHub Pages con GitHub Actions (`.github/workflows/publicar.yml`) en cada push a main.
- 06/10/2026 · El método y la arquitectura Brand → Mapped son de Edu. En charlas, Edu decide qué muestra de su trabajo en Gallo (por ejemplo, compartiendo pantalla de lo que ya está público). Lo que no se hace: copiar código, archivos de Figma o prototipos de Gallo a este repo ni ofrecerlos para descargar.
- 08/10/2026 · Gallo autorizó a Edu a usar Multi con fines didácticos, educativos y de portfolio, sin uso comercial. Multi queda como caso para charlas, no como base: está atado a Material UI.
- 08/10/2026 · Tercera marca **Boceto** (baja fidelidad): grises, un solo radio, sin sombras. Para probar interacción cuando todavía no hay decisiones visuales, sin que el feedback se vaya a la estética.
- 08/10/2026 · Comprado Untitled UI Figma PRO SOLO (trae LITE, STYLES y VARIABLES); se trabaja sobre PRO VARIABLES. Los recursos PRO (íconos, logos, avatares, gradientes) quedan en `Prototypator/Additional assets – Untitled UI/`, fuera del repo: la licencia no permite publicarlos.
- 08/10/2026 · Nombre cambiado a **Prototypator** (con y): suena igual en castellano y en inglés y es más universal. Repo `edu-lovera/prototypator`, galería en `edu-lovera.github.io/prototypator/`; la dirección vieja deja de andar.
- 08/10/2026 · Dominio prototypator.com registrado por un año.
- 08/10/2026 · En Figma, las marcas viven en una colección propia **0. Marca** (un modo por marca) y las variables del kit apuntan a ella: un solo selector cambia color, tipografía y radios, igual que `data-marca` en el código.
- 08/10/2026 · La galería se arma con rutas relativas (`base: "./"`), así anda igual en github.io, en prototypator.com y en la compu sin tocar el código al cambiar de dirección.
- 08/10/2026 · Dos conceptos a desarrollar: **Prototypator** (workflow de prototipado con pruebas, para servicios y quizás producto) y **Ready** (design system propio "AI ready", sin depender de la propiedad intelectual de terceros). El Ready actual sobre Untitled UI es un primer paso para la demo.
- 08/10/2026 · ready-ds.com en evaluación (estaba libre el 08/10). El dominio de la galería se configura cuando exista la marca gráfica.
- 08/10/2026 · El 14/10 es un plazo razonable para cerrar Prototypator, no una demo. Ritmo más lento: cerrar lo abierto antes de sumar frentes. Conceptos en el doc "Prototypator y Ready: dos conceptos" (https://claude.ai/code/artifact/084a6e41-2062-405f-b600-c3783b431570).
- 09/10/2026 · Caso de demo: **Chau Contador** (monotributo, nombre provisorio). Pregunta: ¿pueden anticipar en qué categoría van a quedar y cuánto van a pagar? Comparación A (tabla de categorías) contra B (barra de margen + simulador). Se presenta como hipótesis a refutar, no como producto validado.
- 09/10/2026 · Contraste de Ready: `border-primary` claro 400 / oscuro 500; en oscuro `border-secondary` 600, `border-tertiary` 700, `text-secondary` 200, `text-tertiary` 300, `fg-quaternary` 400. En código va en `src/styles/ajustes-ready.css`, que pisa a `theme.css` sin tocarlo; en Figma, publicado en Ready.
- 09/10/2026 · Componentes: lo que sirve a varios productos va en Ready; lo propio de un producto va en un archivo "Componentes locales" de su carpeta en Figma, publicado como biblioteca, y en código en `src/prototipos/<producto>/componentes/`. Nombres en inglés, iguales en Figma y código (Invoice row = `InvoiceRow`).
- 09/10/2026 · Los prototipos y las pruebas tienen que andar en el teléfono: el público de charlas abre el link ahí. Escritorio hasta 1280 de contenido (`max-w-container`) y centrado en pantallas anchas.
- 09/10/2026 · `SidebarNavigationSimple` y `MobileNavigationHeader` aceptan `logo` (y el lateral, `searchPlaceholder`): Ready es de marca blanca y el logo de Untitled no puede quedar fijo.
- 09/10/2026 · Los commits los hace Claude, con resumen y descripción por partes (qué cambió y por qué), para que cualquier conversación o agente entienda el historial; el push lo hace Edu desde GitHub Desktop.
- 09/10/2026 · Galería con el esquema de Gallo, reescrito desde su documentación: un prototipo es una tarjeta con sus versiones (A/B) y sus casos de uso, todo declarado en `src/prototipos/registro.ts`; las rutas salen de ahí. Estados: Exploración, Para validar, Listo para desarrollo (recorrido), Para demos y Archivado (para qué sirve). No hay "reabierto": vuelve a Exploración y `entregado` queda. Los archivados arrancan ocultos.
- 09/10/2026 · Detalle del prototipo en un panel lateral (Slideout menu de Untitled, el equivalente al drawer de Multi), que se abre desde el pie de la tarjeta; el clic en la tarjeta abre el prototipo en otra pestaña. Cada versión y cada caso de uso, con su link y botón para copiarlo.
- 09/10/2026 · Dos modos: revisión (`/p/<ruta>`, con el selector flotante "Versión A / B" que conserva el caso de uso) y prueba (`/t/<id>`, sin controles de revisión, versión y caso fijados por la prueba). Los casos de uso van con `?escenario=` y se leen de los dos lados del `#`. Las versiones de un grupo comparten los casos.
- 09/10/2026 · Logo provisorio de Chau Contador: el ícono Hand de Untitled (una mano que saluda), blanco sobre `bg-brand-solid`.
