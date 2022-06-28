import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservation.controller";

import { schemaValition } from "../middlewares/schemaValidator";
import { validateJwt } from "../middlewares/validateJwt";
import {
  createReservationSchema,
  deleteReservationSchema,
  updateReservationSchema,
} from "../schemas/reservation.schema";

export const routerReservation = Router();

routerReservation.use(validateJwt);

routerReservation.get("/", getReservations);

routerReservation.post(
  "/",
  schemaValition(createReservationSchema),
  createReservation
);

routerReservation.put(
  "/:id",
  schemaValition(updateReservationSchema),
  updateReservation
);

routerReservation.delete(
  "/:id",
  schemaValition(deleteReservationSchema),
  deleteReservation
);
