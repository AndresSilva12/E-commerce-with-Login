import { z } from "zod";
import { variantSchema } from "./productVariantsSchema.js";

export const productSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser una cadena de texto",
    })
    .trim()
    .min(1, "El nombre del producto es obligatorio")
    .min(2, "Debe tener almenos 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios"),
  purchasePrice: z.coerce
    .number()
    .min(1, "El precio de compra es obligatorio")
    .gte(1, "El precio de compra debe ser mayor a 0"),
  salePrice: z.coerce
    .number()
    .min(1, "El precio de venta es obligatorio")
    .gte(1, "El precio de venta debe ser mayor a 0"),
  brand: z
    .string({
      required_error: "La marca es obligatoria",
    })
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Debe incluir solo letras y espacios")
    .min(2, "Debe tener almenos 2 caracteres"),
  description: z.string().trim().optional(),
  variants: z.array(variantSchema.omit({ productId: true })).default([]),
});

export const updateProductSchema = productSchema.partial();

export const idCuidSchema = z.string().cuid("El id no es válido");
