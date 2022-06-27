import isMongoId from "validator/lib/isMongoId";
import { z } from "zod";

const GENDERS = ["hombre", "mujer"] as const;

export const createMedicSchema = z.object({
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
    gender: z.enum(GENDERS, {
      description: "sssss",
      required_error: "Genero requerido",
      invalid_type_error: "Genero invalido",
    }),
    dayOfBirth: z.string({
      required_error: "Fecha nacimiento requerida",
      invalid_type_error: "Fecha de nacimiento no valida",
    }),
    address: z
      .string({
        required_error: "Dirección es requerida",
        invalid_type_error: "Dirección no valida",
      })
      .min(21, "Dirección debe tener más de 20 letras")
      .trim(),
    phone: z
      .string({
        required_error: "Teléfono es requerido",
        invalid_type_error: "Teléfono invalido",
      })
      .min(10, "Teléfono debe tener 10 digitos")
      .max(10, "Teléfono debe tener 10 digitos")
      .trim(),
    category: z
      .string({
        required_error: "Categoria es requerida",
        invalid_type_error: "Categoria invalida",
      })
      .refine(isMongoId, {
        message: "Categoria no valida",
      }),
  }),
});

export const updateMedicSchema = z.object({
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
    gender: z.enum(GENDERS, {
      description: "sssss",
      required_error: "Genero requerido",
      invalid_type_error: "Genero invalido",
    }),
    dayOfBirth: z.string({
      required_error: "Fecha nacimiento requerida",
      invalid_type_error: "Fecha de nacimiento no valida",
    }),
    address: z
      .string({
        required_error: "Dirección es requerida",
        invalid_type_error: "Dirección no valida",
      })
      .min(21, "Dirección debe tener más de 20 letras")
      .trim(),
    phone: z
      .string({
        required_error: "Teléfono es requerido",
        invalid_type_error: "Teléfono invalido",
      })
      .min(10, "Teléfono debe tener 10 digitos")
      .max(10, "Teléfono debe tener 10 digitos")
      .trim(),
    category: z
      .string({
        required_error: "Categoria es requerida",
        invalid_type_error: "Categoria invalida",
      })
      .refine(isMongoId, {
        message: "Categoria no valida",
      }),
  }),
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id invalido",
    }),
  }),
});

export const deleteMedicSchema = z.object({
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id invalido",
    }),
  }),
});
