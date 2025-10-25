import { z } from "zod";

export const expensesSchema = z.object({
    name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser una cadena de texto",
    })
    .trim()
    .min(1, "El nombre del gasto es obligatorio")
    .min(2, "Debe tener almenos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios")
    .transform((val) => val.toLowerCase().trim()),
    amount: z.coerce
    .number({
      invalid_type_error: "El monto debe ser un número"
    })
    .int("El monto debe ser un número entero")
    .min(1, "El monto es obligatorio")
    .gte(1, "El monto debe ser mayor a 0"),
})

export const updateExpensesSchema = expensesSchema.partial()