import { Router } from "express";
import {
  createMedic,
  deleteMedic,
  getMedics,
  updateMedic,
} from "../controllers/medic.controller";

import { schemaValition } from "../middlewares/schemaValidator";
import { validateJwt } from "../middlewares/validateJwt";
import {
  createMedicSchema,
  deleteMedicSchema,
  updateMedicSchema,
} from "../schemas/medic.schema";

export const routerMedic = Router();

routerMedic.use(validateJwt);

routerMedic.get("/", getMedics);

routerMedic.post("/", schemaValition(createMedicSchema), createMedic);

routerMedic.put("/:id", schemaValition(updateMedicSchema), updateMedic);

routerMedic.delete("/:id", schemaValition(deleteMedicSchema), deleteMedic);
