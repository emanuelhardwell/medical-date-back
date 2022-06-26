import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, message: "Usuario no autorizado" });
  }

  try {
    const tokenVerify = jwt.verify(token, String(process.env.SECRET_JWT));
    req.uid = (<any>tokenVerify).uid;
    req.name = (<any>tokenVerify).name;

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).json({ ok: false, message: "Token no valido" });
  }
};
