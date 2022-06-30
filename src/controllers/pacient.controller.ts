import { Response, Request } from "express";
import {
  handleErrorResponse,
  handleInternalServerError,
} from "../helpers/handleError";
import Pacient from "../models/Pacient.model";

export const getPacients = async (req: Request, res: Response) => {
  try {
    const pacients = await Pacient.find();

    res.status(200).json({
      ok: true,
      message: "Pacientes obtenidos",
      pacients,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const createPacient = async (req: Request, res: Response) => {
  const { name, lastname, lastname2, email } = req.body;

  try {
    let pacient = await Pacient.findOne({ name, lastname, lastname2 });

    if (pacient) {
      return handleErrorResponse(res, "Este paciente ya existe", 400);
    }

    pacient = await Pacient.findOne({ email });
    if (pacient) {
      return handleErrorResponse(res, "Este email ya esta en uso", 400);
    }

    const pacientNew = new Pacient(req.body);
    const pacientSave = await pacientNew.save();

    res.status(200).json({
      ok: true,
      message: "Paciente creado",
      pacient: pacientSave,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const updatePacient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pacient = await Pacient.findById(id);

    if (!pacient) {
      return handleErrorResponse(res, "Este paciente no existe", 400);
    }

    const pacientNew = await Pacient.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: "Paciente actualizado",
      pacient: pacientNew,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const deletePacient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pacient = await Pacient.findById(id);

    if (!pacient) {
      return handleErrorResponse(res, "Este paciente no existe", 400);
    }

    await Pacient.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Paciente eliminado",
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};
