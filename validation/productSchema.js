import {z} from "zod";

export const productSchema = z.object({
    code: z.string({
        required_error: "El código es obligatorio",
        invalid_type_error: "El código debe ser una cadena de texto"
    }).trim()
    .min(2, "Debe tener almenos 2 caracteres")
    ,
    name: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser una cadena de texto"
    }).trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios")
    .min(2, "Debe tener almenos 2 caracteres")
    ,
    price: z.number({
        required_error: "El precio es obligatorio"
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