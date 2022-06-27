import { Router } from "express";
import {
  createPacient,
  deletePacient,
  getPacients,
  updatePacient,
} from "../controllers/pacient.controller";

import { schemaValition } from "../middlewares/schemaValidator";
import { validateJwt } from "../middlewares/validateJwt";
import {
  createPacientSchema,
  deletePacientSchema,
  updatePacientSchema,
} from "../schemas/pacient.schema";

export const routerPacient = Router();

routerPacient.use(validateJwt);

routerPacient.get("/", getPacients);

routerPacient.post("/", schemaValition(createPacientSchema), createPacient);

routerPacient.put("/:id", schemaValition(updatePacientSchema), updatePacient);

routerPacient.delete(
  "/:id",
  schemaValition(deletePacientSchema),
  deletePacient
);
