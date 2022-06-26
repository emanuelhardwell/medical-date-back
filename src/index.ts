import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./db/db";

dotenv.config();

const app = express();

//db
dbConnection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//rutas

//server
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
