import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValition =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          // path: issue.path,
          message: issue.message,
        }));
        return res.status(400).json({ ok: false, errors: errors });
      }

      return res
        .status(500)
        .json({ ok: false, message: "Comuniquese con el administrador" });
    }
  };
