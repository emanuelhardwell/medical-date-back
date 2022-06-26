import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Nombre es requerido" })
      .min(2, "Verifica el nombre")
      .trim(),
    lastname: z
      .string({ required_error: "Apellido paterno es requerido" })
      .min(2, "Verifica el apellido paterno")
      .trim(),
    lastname2: z
      .string({ required_error: "Apellido materno es requerido" })
      .trim()
      .optional(),
    email: z
      .string({ required_error: "Correo es requerido" })
      .email("Escribe un correo valido")
      .trim(),
    password: z
      .string({ required_error: "Contraseña es requerida" })
      .min(9, "Escribe una contraseña con más de 8 caracteres")
      .trim(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Correo es requerido" })
      .email("Escribe un correo valido")
      .trim(),
    password: z
      .string({ required_error: "Contraseña es requerida" })
      .min(9, "Escribe una contraseña con más de 8 caracteres")
      .trim(),
  }),
});
