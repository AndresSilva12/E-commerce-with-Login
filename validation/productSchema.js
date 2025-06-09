import {z} from "zod";

export const productSchema = z.object({
    name: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser una cadena de texto"
    }).trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios")
    .min(2, "Debe tener almenos 2 caracteres")
    ,
    purchasePrice: z.number({
        required_error: "El precio de compra es obligatorio"
    })
    ,
    salePrice: z.number({
        required_error: "El precio de venta es obligatorio"
    })
    ,
    brand: z.string({
        required_error: "La marca es obligatoria"
    }).trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios")
    .min(2, "Debe tener almenos 2 caracteres")
    ,
    description: z.string().trim().optional()
})

export const updateProductSchema = productSchema.partial()

export const idCuidSchema = z.string().cuid("El id no es válido")