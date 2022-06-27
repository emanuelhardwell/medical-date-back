import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
import { schemaValition } from "../middlewares/schemaValidator";
import { validateJwt } from "../middlewares/validateJwt";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";

export const routerCategory = Router();

routerCategory.use(validateJwt);

routerCategory.get("/", getCategories);

routerCategory.post("/", schemaValition(createCategorySchema), createCategory);

routerCategory.put(
  "/:id",
  schemaValition(updateCategorySchema),
  updateCategory
);

routerCategory.delete(
  "/:id",
  schemaValition(deleteCategorySchema),
  deleteCategory
);
