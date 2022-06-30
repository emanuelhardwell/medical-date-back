import { Response, Request } from "express";
import {
  handleErrorResponse,
  handleInternalServerError,
} from "../helpers/handleError";
import Medic from "../models/Medic.model";

export const getMedics = async (req: Request, res: Response) => {
  try {
    const medics = await Medic.find();

    res.status(200).json({
      ok: true,
      message: "Medicos obtenidos",
      medics,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const createMedic = async (req: Request, res: Response) => {
  const { name, lastname, lastname2 } = req.body;

  try {
    const medic = await Medic.findOne({ name, lastname, lastname2 });

    if (medic) {
      return handleErrorResponse(res, "Este medico ya existe", 400);
    }

    const medicNew = new Medic(req.body);
    const medicSave = await medicNew.save();

    res.status(200).json({
      ok: true,
      message: "Medico creado",
      medic: medicSave,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const updateMedic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const medic = await Medic.findById(id);

    if (!medic) {
      return handleErrorResponse(res, "Este medico no existe", 400);
    }

    const medicNew = await Medic.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      ok: true,
      message: "Medico actualizado",
      medic: medicNew,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const deleteMedic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const medic = await Medic.findById(id);

    if (!medic) {
      return handleErrorResponse(res, "Este medico no existe", 400);
    }

    await Medic.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Medico eliminado",
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};
