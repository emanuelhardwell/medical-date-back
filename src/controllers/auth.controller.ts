import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ ok: false, message: "Usuario no valido" });
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: "Correo o contraseña incorrecta" });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ ok: false, message: "Correo o contraseña incorrecta" });
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const renewToken = (req: Request, res: Response) => {
  try {
    res.status(200).json({ ok: true, message: "Se renovo el token" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};
