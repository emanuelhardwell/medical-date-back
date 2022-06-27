import isMongoId from "validator/lib/isMongoId";
import { z } from "zod";

const GENDERS = ["hombre", "mujer"] as const;

export const createPacientSchema = z.object({
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
    sick: z
      .string({
        required_error: "Enfermedad es requerida",
        invalid_type_error: "Enfermedad no valida",
      })
      .min(3, "Enfermedad debe tener más de 2 letras")
      .trim(),
    medicaments: z
      .string({
        required_error: "Medicamentos es requerido",
        invalid_type_error: "Medicamentos no valido",
      })
      .min(10, "Medicamentos debe tener más de 9 letras")
      .trim(),
    alergy: z
      .string({
        required_error: "Alergia es requerida",
        invalid_type_error: "Alergia no valida",
      })
      .trim()
      .optional(),
  }),
});

export const updatePacientSchema = z.object({
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
    sick: z
      .string({
        required_error: "Enfermedad es requerida",
        invalid_type_error: "Enfermedad no valida",
      })
      .min(3, "Enfermedad debe tener más de 2 letras")
      .trim(),
    medicaments: z
      .string({
        required_error: "Medicamentos es requerido",
        invalid_type_error: "Medicamentos no valido",
      })
      .min(10, "Medicamentos debe tener más de 9 letras")
      .trim(),
    alergy: z
      .string({
        required_error: "Alergia es requerida",
        invalid_type_error: "Alergia no valida",
      })
      .trim()
      .optional(),
  }),
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id invalido",
    }),
  }),
});

export const deletePacientSchema = z.object({
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id invalido",
    }),
  }),
});
