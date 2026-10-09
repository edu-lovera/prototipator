/*
 * Chau Contador · escenario de datos.
 * Personas y clientes ficticios. Las escalas del monotributo son las reales,
 * vigentes de agosto de 2026 a enero de 2027 (servicios), según lo publicado
 * por ARCA y la prensa especializada el 02/08/2026.
 */

export interface Categoria {
    letra: string;
    /** Ingresos brutos anuales máximos. */
    tope: number;
    /** Cuota mensual total para servicios. */
    cuotaServicios: number;
}

export const ESCALAS: Categoria[] = [
    { letra: "A", tope: 12_009_410, cuotaServicios: 49_527 },
    { letra: "B", tope: 17_595_182, cuotaServicios: 56_379 },
    { letra: "C", tope: 24_670_494, cuotaServicios: 66_020 },
    { letra: "D", tope: 30_628_651, cuotaServicios: 84_614 },
    { letra: "E", tope: 36_028_231, cuotaServicios: 119_811 },
    { letra: "F", tope: 45_151_659, cuotaServicios: 150_784 },
    { letra: "G", tope: 53_995_798, cuotaServicios: 230_612 },
    { letra: "H", tope: 81_924_660, cuotaServicios: 522_706 },
    { letra: "I", tope: 91_699_761, cuotaServicios: 963_747 },
    { letra: "J", tope: 105_012_519, cuotaServicios: 1_167_299 },
    { letra: "K", tope: 126_610_830, cuotaServicios: 1_614_446 },
];

export interface Factura {
    fecha: string; // AAAA-MM-DD
    comprobante: string;
    cliente: string;
    concepto: string;
    monto: number;
}

/** Escenario "al límite": Lucía, diseñadora freelance, categoría D, al 92 % del tope. */
export const ESCENARIO = {
    persona: { nombre: "Lucía Ferreyra", email: "lucia@ejemplo.com", actividad: "Servicios" },
    hoy: "2026-10-09",
    categoriaActual: "D",
    proximaRecategorizacion: "5 de febrero de 2027",
    facturas: [
        { fecha: "2026-10-03", comprobante: "C 0002-00000141", cliente: "Estudio Ñandú", concepto: "Identidad visual", monto: 2_400_000 },
        { fecha: "2026-09-22", comprobante: "C 0002-00000140", cliente: "Cooperativa La Huella", concepto: "Rediseño de sitio web", monto: 3_150_000 },
        { fecha: "2026-09-05", comprobante: "C 0002-00000139", cliente: "Estudio Ñandú", concepto: "Piezas para redes", monto: 1_200_000 },
        { fecha: "2026-08-18", comprobante: "C 0002-00000138", cliente: "Librería Mandrágora", concepto: "Catálogo digital", monto: 2_750_000 },
        { fecha: "2026-08-01", comprobante: "C 0002-00000137", cliente: "Panadería El Molino", concepto: "Diseño de packaging", monto: 1_980_000 },
        { fecha: "2026-07-14", comprobante: "C 0002-00000136", cliente: "Cooperativa La Huella", concepto: "Mantenimiento web", monto: 2_300_000 },
        { fecha: "2026-06-28", comprobante: "C 0002-00000135", cliente: "Estudio Ñandú", concepto: "Rediseño de logo", monto: 1_850_000 },
        { fecha: "2026-06-10", comprobante: "C 0002-00000134", cliente: "Agencia Lumbre", concepto: "Banners de campaña", monto: 1_620_000 },
        { fecha: "2026-05-15", comprobante: "C 0002-00000133", cliente: "Librería Mandrágora", concepto: "Señalética", monto: 2_100_000 },
        { fecha: "2026-04-22", comprobante: "C 0002-00000132", cliente: "Cooperativa La Huella", concepto: "Sitio web, etapa 1", monto: 2_480_000 },
        { fecha: "2026-03-03", comprobante: "C 0002-00000131", cliente: "Panadería El Molino", concepto: "Menú y carta", monto: 1_150_000 },
        { fecha: "2026-02-12", comprobante: "C 0002-00000130", cliente: "Estudio Ñandú", concepto: "Presentación institucional", monto: 1_700_000 },
        { fecha: "2025-12-18", comprobante: "C 0002-00000129", cliente: "Agencia Lumbre", concepto: "Piezas de fin de año", monto: 1_400_000 },
        { fecha: "2025-11-05", comprobante: "C 0002-00000128", cliente: "Librería Mandrágora", concepto: "Catálogo de primavera", monto: 2_098_359 },
    ] as Factura[],
};

export const pesos = (n: number) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
export const fecha = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });

export const categoriaPara = (ingresos: number): Categoria | null => ESCALAS.find((c) => ingresos <= c.tope) ?? null;
export const categoria = (letra: string) => ESCALAS.find((c) => c.letra === letra)!;
