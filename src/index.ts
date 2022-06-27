import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./db/db";
import { routerAuth } from "./routes/auth.routes";
import { routerCategory } from "./routes/category.routes";
import { routerMedic } from "./routes/medic.routes";
import { routerPacient } from "./routes/pacient.routes";

declare module "express-serve-static-core" {
  interface Request {
    uid: any;
    name: any;
  }
}

dotenv.config();

const app = express();

//db
dbConnection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//rutas
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/category", routerCategory);
app.use("/api/v1/medic", routerMedic);
app.use("/api/v1/pacient", routerPacient);

//server
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
