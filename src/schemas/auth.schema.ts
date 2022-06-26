import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Verifica el nombre"),
    lastname: z.string().min(2, "Verifica el apellido paterno"),
    lastname2: z.string().min(2, "Verifica el apellido materno"),
    email: z.string().email("Escribe un correo valido"),
    password: z
      .string()
      .min(7, "Escribe una contraseña con más de 6 caracteres"),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email("Escribe un correo valido"),
    password: z
      .string()
      .min(7, "Escribe una contraseña con más de 6 caracteres"),
  }),
});
