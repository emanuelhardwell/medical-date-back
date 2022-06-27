import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Nombre es requerido",
        invalid_type_error: "Nombre invalido",
      })
      .min(3, "Nombre debe tener más de 2 letras")
      .trim(),
    lastname: z
      .string({
        required_error: "Apellido paterno es requerido",
        invalid_type_error: "Apellido paterno invalido",
      })
      .min(3, "Apellido paterno debe tener más de 2 letras")
      .trim(),
    lastname2: z
      .string({
        required_error: "Apellido materno es requerido",
        invalid_type_error: "Apellido materno invalido",
      })
      .trim()
      .optional(),
    email: z
      .string({
        required_error: "Correo es requerido",
        invalid_type_error: "Correo invalido",
      })
      .email("Escribe un correo valido")
      .trim(),
    password: z
      .string({
        required_error: "Contraseña es requerida",
        invalid_type_error: "Contraseña invalida",
      })
      .min(9, "Escribe una contraseña con más de 8 caracteres")
      .trim(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Correo es requerido",
        invalid_type_error: "Correo invalido",
      })
      .email("Escribe un correo valido")
      .trim(),
    password: z
      .string({
        required_error: "Contraseña es requerida",
        invalid_type_error: "Contraseña invalida",
      })
      .min(9, "Escribe una contraseña con más de 8 caracteres")
      .trim(),
  }),
});
