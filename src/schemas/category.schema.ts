import { z } from "zod";
import mongoose from "mongoose";
import isMongoId from "validator/lib/isMongoId";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Categoria requerida",
        invalid_type_error: "Categoria invalida",
      })
      .min(3, "La categoria debe tener más de 2 letras")
      .trim(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Categoria requerida",
        invalid_type_error: "Categoria invalida",
      })
      .min(3, "La categoria debe tener más de 2 letras")
      .trim(),
  }),
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id no valido",
    }),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().refine(isMongoId, {
      message: "Id no valido",
    }),
  }),
});
