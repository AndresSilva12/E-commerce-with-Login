import {z} from 'zod'


export const userSchema = z.object({
    username: z.string().trim()
    .min(1, "El nombre de usuario es obligatorio")
    .min(2, "Debe tener almenos 2 caracteres")
    .max(20,"Usuario muy largo"),

    password: z.string().trim()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener almenos 8 caracteres")
    .regex(/[a-z]/, "Debe contener una letra minúscula")
    .regex(/[A-Z]/, "Debe contener una letra mayúscula")
    .regex(/\d/, "Debe contener un número")
    .regex(/[^a-zA-Z0-9]/, "Debe contener un caracter especial"),

    email: z.string().trim()
    .min(1, "El correo es obligatorio")
    .email("Correo inválido"),

    phoneNumber: z.string().trim()
    .min(1, "El teléfono es obligatorio")
    .regex(/^\d+$/, "El N° de teléfono debe contener solo numeros")
    .min(8, "El N° de teléfono debe tener 8 digitos")
    .max(8, "El N° de teléfono debe tener 8 digitos"),

    name: z.string().trim()
    .min(1, "El Nombre es obligatorio")
    .min(2, "Nombre muy corto")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: "El nombre debe inlcuir solo letras y espacios"
    }),

    lastName: z.string().trim()
    .min(1, "El Apellido es obligatorio")
    .min(2, "Apellido muy corto")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: "El apellido debe inlcuir solo letras y espacios"
    }),

    age: z.coerce.number()
    .min(1, "La edad es obligatoria")
    .int("La edad debe ser un numero entero")
    .gte(18, "Debe ser mayor a 18 años")
    .lte(100, "No tan mayor")
})

export const updateUserSchema = userSchema.partial()