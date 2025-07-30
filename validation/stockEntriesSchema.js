import { z } from "zod";

export const stockEntriesSchema = z.object({
    userId: z.number({
        required_error: "El id de Usuario es obligatorio",
        invalid_type_error: "Formato no valido",
    })
        .int("Debe ser un numero entero")
        .gte(1, "Debe ser un numero positivo"),
    items: z.array(z.object({
        variantId: z.string()
            .cuid("El id no es válido")
            .min(1, "El Id de la variante es obligatorio"),
        quantity: z.preprocess((val) => Number(val),
            z.number({ invalid_type_error: "Debe ser un número" })
            .int("Debe ser un número entero")
            .gte(1, "Debe ser mayor a 0")
        ),
    })).min(1, "Debe tener al menos un item de entrada")
})