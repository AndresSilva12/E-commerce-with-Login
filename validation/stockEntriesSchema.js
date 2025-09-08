import { z } from "zod";

export const stockEntriesSchema = z.object({
    items: z.array(z.object({
        variantId: z.string()
            .cuid("El id no es válido")
            .min(1, "El Id de la variante es obligatorio"),
        quantity: z.preprocess((val) => Number(val),
            z.number({ invalid_type_error: "Debe ser un número" })
            .int("Debe ser un número entero")
            .gte(1, "Debe ser mayor a 0")
        ),
        purchasePrice: z.preprocess((val) => Number(val),
            z.number({ invalid_type_error: "Debe ser un número" })
            .int("Debe ser un número entero")
            .gte(1, "Debe ser mayor a 0")
        ),
    })).min(1, "Debe tener al menos un item de entrada"),
    total: z.coerce.number({
        required_error: "El precio total es obligatorio",
        invalid_type_error: "Formato no valido. Debe ser un Numero",
    })
    .gte(1, "Debe ser un numero mayor a 0")
    ,
    motive: z.string()
})