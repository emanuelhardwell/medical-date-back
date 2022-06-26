import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./db/db";
import { routerAuth } from "./routes/auth.routes";

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

//server
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
