import { z } from "zod";

export const variantSchema = z.object({
  id: z.string().cuid().optional(),
  code: z
    .string({
      required_error: "El código es obligatorio",
      invalid_type_error: "El codigo debe ser formato texto",
    })
    .trim()
    .min(2, "Debe contener minimo 2 caracteres")
    .min(1, "El código es obligatorio"),
  size: z
    .string({
      required_error: "El talle es obligatorio",
      invalid_type_error: "Formato no valido",
    })
    .trim()
    .min(1, "El talle es obligatorio")
    .max(3, "Debe contener máximo 3 caracteres"),
  color: z
    .string({
      required_error: "El color es obligatorio",
      invalid_type_error: "Formato no valido",
    })
    .trim()
    .min(3, "Debe contener minimo 3 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El color solo puede incluir letras y espacios"
    )
    .min(1, "El color es obligatorio")
    .transform((val) => val.toLowerCase().trim()),
  stock: z.coerce
    .number({
      required_error: "La cantidad en stock es obligatorio",
      invalid_type_error: "Formato no valido",
    })
    .gte(1, "Debe tener almenos 1 unidad en stock"),
  productId: z
    .string({
      required_error: "El id de producto es obligatorio",
      invalid_type_error: "Formato no valido",
    })
    .trim()
    .min(1, "El id es obligatorio")
  ,
  image: z.union([
    z.string().url("La imagen debe ser una URL válida"),
    z.any().refine((file) => file instanceof File, {
      message: "La imagen del producto es obligatoria",
    }),
  ]),
});

export const updateVariantSchema = z.object({
  id: z.string().cuid().optional(),
  code: z.string().trim().optional(),
  size: z.string().trim().optional(),
  color: z.string().trim().optional(),
  image: z.union([z.string(), z.any()]).optional(),
  stock: z.number().optional(),
});

export const variantSchemaWithOutProductId = variantSchema.omit({
  productId: true,
});

export const idVariantSchema = z.string().cuid("El id no es válido");
