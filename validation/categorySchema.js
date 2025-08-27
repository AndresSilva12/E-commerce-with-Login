import { z } from "zod";

export const categorySchema = z.object({
    name: z
    .string({
        required_error: "El nombre de categoria es obligatorio",
        invalid_type_error: "El nombre debe de ser una cadena de texto",
    })
    .min(1, "El nombre de la categoria es obligatorio")
    .min(4, "Debe de tener almenos 4 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios")
    .transform((val) => val.toLowerCase().trim()),
})