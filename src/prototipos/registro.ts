/*
 * Registro de prototipos: lo que muestra la galería.
 * Cada prototipo nuevo se agrega acá, con su ruta y sus datos para la tarjeta.
 */

/** De dónde salió el prototipo. */
export type Origen = "figma" | "boceto" | "pregunta";

/** En qué punto del proceso está. */
export type Estado = "borrador" | "para-validar" | "validado";

export interface Prototipo {
    /** Identificador corto, en minúsculas y con guiones. También es la ruta: /p/<id> */
    id: string;
    nombre: string;
    descripcion: string;
    origen: Origen;
    estado: Estado;
    /** Versión del prototipo, por ejemplo "0.1.0". */
    version: string;
    /** Fecha de la última actualización, en formato AAAA-MM-DD. */
    actualizado: string;
    /** Link al frame de Figma, si salió de uno. */
    figma?: string;
    /** Si es una variante A/B, el id del prototipo con el que se compara. */
    varianteDe?: string;
}

export const ORIGENES: Record<Origen, string> = {
    figma: "Desde Figma",
    boceto: "Boceto sin frame",
    pregunta: "Desde una pregunta",
};

export const ESTADOS: Record<Estado, { nombre: string; color: "gray" | "brand" | "success" }> = {
    borrador: { nombre: "Borrador", color: "gray" },
    "para-validar": { nombre: "Para validar", color: "brand" },
    validado: { nombre: "Validado", color: "success" },
};

export const PROTOTIPOS: Prototipo[] = [];
