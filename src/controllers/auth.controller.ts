import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  handleErrorResponse,
  handleInternalServerError,
} from "../helpers/handleError";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return handleErrorResponse(res, "Usuario no valido", 400);
    }

    const userNew = new User(req.body);
    userNew.password = bcrypt.hashSync(password, 10);
    const userSave = await userNew.save();

    const token = await jwt.sign(
      { uid: userSave._id, name: userSave.name },
      String(process.env.SECRET_JWT),
      { expiresIn: "8h" }
    );

    res.status(200).json({
      ok: true,
      message: "Usuario creado",
      name: userSave.name,
      uid: userSave._id,
      token,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return handleErrorResponse(res, "Correo o contraseña incorrecta", 400);
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return handleErrorResponse(res, "Correo o contraseña incorrecta", 400);
    }

    const token = await jwt.sign(
      { uid: user._id, name: user.name },
      String(process.env.SECRET_JWT),
      { expiresIn: "8h" }
    );

    res.status(200).json({
      ok: true,
      message: "Login correcto",
      name: user.name,
      uid: user._id,
      token,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const renewToken = async (req: Request, res: Response) => {
  const { name, uid } = req;

  try {
    const token = await jwt.sign(
      { uid: uid, name: name },
      String(process.env.SECRET_JWT),
      { expiresIn: "8h" }
    );

    res
      .status(200)
      .json({ ok: true, message: "Se renovo el token", name, uid, token });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};
