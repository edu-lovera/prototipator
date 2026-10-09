import type { ComponentType } from "react";
import { MiCategoria } from "@/prototipos/chau-contador/mi-categoria";
import { MiCategoriaA } from "@/prototipos/chau-contador/mi-categoria-a";

/*
 * Registro de prototipos: lo que muestra la galería y las rutas que existen.
 *
 * Un prototipo es UNA tarjeta. Puede tener varias versiones (A/B) que comparten
 * los mismos casos de uso, para que la comparación sea limpia. Las rutas salen
 * de acá: cada versión se abre en /p/<ruta>, y un caso de uso con ?escenario=<id>.
 *
 * Modo revisión (/p/...): para el equipo, stakeholders y desarrollo, con el
 * selector de versión a mano. El modo prueba (/t/...) llega con la capa de pruebas.
 */

/** El recorrido (los tres primeros) y para qué sirve (los dos últimos). */
export type Estado = "exploracion" | "para-validar" | "listo-para-dev" | "para-demos" | "archivado";

/** De dónde salió el prototipo. */
export type Origen = "figma" | "boceto" | "pregunta";

export interface CasoDeUso {
    /** Va en la dirección: ?escenario=<id>. */
    id: string;
    etiqueta: string;
    /** Una línea: qué situación muestra. */
    descripcion: string;
    /** Armado para medir algo: la galería lo muestra aparte, para no abrirlo en una demo creyendo que es lo normal. */
    paraPruebas?: boolean;
}

export interface Version {
    /** Corta: una letra o un número. El selector dice "Versión {variante}". */
    variante: string;
    /** También es la ruta: /p/<ruta>. */
    ruta: string;
    descripcion: string;
    componente: ComponentType;
    figma?: string;
    /** Cuando el prototipo se cierra: la versión elegida y las que quedaron. */
    rol?: "elegida" | "archivada";
}

export interface Prototipo {
    id: string;
    nombre: string;
    /** La línea de la tarjeta. Hasta 90 caracteres. */
    resumen: string;
    producto: string;
    origen: Origen;
    estado: Estado;
    /** AAAA-MM-DD en que se entregó a desarrollo. No se borra si vuelve a moverse. */
    entregado?: string;
    /** Si se archivó porque el trabajo siguió en otro prototipo: su id. */
    sigueEn?: string;
    /** Versión del prototipo, por ejemplo "0.1.0". */
    version: string;
    creado: string;
    /** Se actualiza a mano en la misma pasada que cambia el prototipo. */
    actualizado: string;
    autor: string | string[];
    /** La pregunta de investigación, si salió de una. */
    pregunta?: string;
    versiones: Version[];
    casosDeUso?: CasoDeUso[];
}

export const ORIGENES: Record<Origen, string> = {
    figma: "Desde Figma",
    boceto: "Boceto sin frame",
    pregunta: "Desde una pregunta",
};

export const ESTADOS: Record<Estado, { nombre: string; color: "gray" | "brand" | "success" | "warning" | "purple" | "sky" }> = {
    exploracion: { nombre: "Exploración", color: "sky" },
    "para-validar": { nombre: "Para validar", color: "warning" },
    "listo-para-dev": { nombre: "Listo para desarrollo", color: "success" },
    "para-demos": { nombre: "Para demos", color: "purple" },
    archivado: { nombre: "Archivado", color: "gray" },
};

export const PROTOTIPOS: Prototipo[] = [
    {
        id: "chau-contador-mi-categoria",
        nombre: "Chau Contador · Mi categoría",
        resumen: "Cuánto te queda en tu categoría del monotributo y qué pasa si facturás más.",
        producto: "Chau Contador",
        origen: "pregunta",
        estado: "exploracion",
        version: "0.2.0",
        creado: "2026-10-09",
        actualizado: "2026-10-09",
        autor: "Edu",
        pregunta: "¿Los monotributistas pueden anticipar en qué categoría van a quedar y cuánto van a pagar?",
        versiones: [
            {
                variante: "A",
                ruta: "chau-contador-mi-categoria-a",
                descripcion: "Tabla de categorías con la tuya marcada, como la da el sitio oficial. Referencia.",
                componente: MiCategoriaA,
            },
            {
                variante: "B",
                ruta: "chau-contador-mi-categoria",
                descripcion: "Barra de margen hasta el tope, aviso y simulador de una factura.",
                componente: MiCategoria,
                figma: "https://www.figma.com/design/ViNzzQOTZMFqYHyWZbDbE0?node-id=4-47299",
            },
        ],
        casosDeUso: [
            { id: "lejos", etiqueta: "Lejos del tope", descripcion: "Categoría D al 55 %: mucho margen." },
            { id: "limite", etiqueta: "Al límite", descripcion: "Categoría D al 92 %: una factura grande la cambia de categoría." },
            { id: "pasada", etiqueta: "Pasada", descripcion: "Categoría D al 108 %: ya superó el tope." },
        ],
    },
];

/** Todas las versiones, con su prototipo, para armar las rutas. */
export const VERSIONES = PROTOTIPOS.flatMap((p) => p.versiones.map((v) => ({ prototipo: p, version: v })));

/** Dirección completa de una versión, que anda igual en la compu y publicada. */
export const direccion = (ruta: string, escenario?: string) => {
    const base = `${window.location.origin}${window.location.pathname}`;
    return `${base}#/p/${ruta}${escenario ? `?escenario=${escenario}` : ""}`;
};
