import {z} from 'zod'

export const saleSchema = z.object({
    userId: z.coerce.number()
    .int("Debe ingresar un número entero")
    .gte(1, "Debe ser un número positivo")
    ,
    totalPrice: z.coerce.number()
    .gte(1, "Debe ser un numero mayor a 0")
    ,
    items: z.array(z.object({
            variantId: z.string()
                .cuid("El id no es válido")
                .min(1, "El id de la variante es obligatorio"),
            quantity: z.coerce.number({
                required_error: "La cantidad es obligatorio",
                invalid_type_error: "Formato no valido",
            })
                .int("Debe ingresar un numero entero")
                .gte(1, "Debe ser un numero mayor a 0"),
        })
    ).min(1, "Debe tener al menos un item de venta")
})