import isMongoId from "validator/lib/isMongoId";
import { ostring, z } from "zod";

const PAYMENT = ["pendiente", "pagado", "anulado"] as const;
const STATUS = ["pendiente", "aplicada", "falto", "cancelada"] as const;

export const createReservationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Titulo es requerido",
        invalid_type_error: "Titulo invalido",
      })
      .min(3, "Titulo debe tener más de 2 letras")
      .trim(),
    note: z
      .string({
        required_error: "Nota es requerida",
        invalid_type_error: "Nota invalida",
      })
      .min(10, "Nota debe tener más de 9 letras")
      .trim(),
    dateTime: z.string({
      required_error: "Fecha y hora requerida",
      invalid_type_error: "Fecha y hora no valida",
    }),
    symtoms: z
      .string({
        required_error: "Sintomas son requeridos",
        invalid_type_error: "Sintomas no validos",
      })
      .min(3, "Sintomas debe tener más de 2 letras")
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
        required_error: "Medicamentos son requeridos",
        invalid_type_error: "Medicamentos no validos",
      })
      .min(10, "Medicamentos debe tener más de 9 letras")
      .trim(),
    price: z.number({
      required_error: "Precio es requerido",
      invalid_type_error: "Precio no valido",
    }),
    payment: z.enum(PAYMENT, {
      description: "sssss",
      required_error: "Pago requerido",
      invalid_type_error: "Pago invalido",
    }),
    status: z.enum(STATUS, {
      description: "sssss",
      required_error: "Status requerido",
      invalid_type_error: "Status invalido",
    }),
    user: z.string().refine(isMongoId, {
      message: "Usuario invalido",
    }),
    pacient: z.string().refine(isMongoId, {
      message: "Paciente invalido",
    }),
    medic: z.string().refine(isMongoId, {
      message: "Medico invalido",
    }),
  }),
});

export const updateReservationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Titulo es requerido",
        invalid_type_error: "Titulo invalido",
      })
      .min(3, "Titulo debe tener más de 2 letras")
      .trim(),
    note: z
      .string({
        required_error: "Nota es requerida",
        invalid_type_error: "Nota invalida",
      })
      .min(10, "Nota debe tener más de 9 letras")
      .trim(),
    dateTime: z.string({
      required_error: "Fecha y hora requerida",
      invalid_type_error: "Fecha y hora no valida",
    }),
    symtoms: z
      .string({
        required_error: "Sintomas son requeridos",
        invalid_type_error: "Sintomas no validos",
      })
      .min(3, "Sintomas debe tener más de 2 letras")
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
        required_error: "Medicamentos son requeridos",
        invalid_type_error: "Medicamentos no validos",
      })
      .min(10, "Medicamentos debe tener más de 9 letras")
      .trim(),
    price: z.number({
      required_error: "Precio es requerido",
      invalid_type_error: "Precio no valido",
    }),
    payment: z.enum(PAYMENT, {
      description: "sssss",
      required_error: "Pago requerido",
      invalid_type_error: "Pago invalido",
    }),
    status: z.enum(STATUS, {
      description: "sssss",
      required_error: "Status requerido",
      invalid_type_error: "Status invalido",
    }),
    user: z.string().refine(isMongoId, {
      message: "Usuario invalido",
    }),
    pacient: z.string().refine(isMongoId, {
      message: "Paciente invalido",
    }),
    medic: z.string().refine(isMongoId, {
      message: "Medico invalido",
    }),
  }),
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id invalido",
    }),
  }),
});

export const deleteReservationSchema = z.object({
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id invalido",
    }),
  }),
});
