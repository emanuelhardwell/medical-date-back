import { Router } from "express";
import {
  createUser,
  loginUser,
  renewToken,
} from "../controllers/auth.controller";
import { schemaValition } from "../middlewares/schemaValidator";
import { validateJwt } from "../middlewares/validateJwt";
import { createUserSchema, loginUserSchema } from "../schemas/auth.schema";

export const routerAuth = Router();

routerAuth.post("/create", schemaValition(createUserSchema), createUser);

routerAuth.post("/login", schemaValition(loginUserSchema), loginUser);

routerAuth.get("/renew", validateJwt, renewToken);
