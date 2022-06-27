import { Response, Request } from "express";
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const createMedic = async (req: Request, res: Response) => {
  const { name, lastname, lastname2 } = req.body;

  try {
    const medic = await Medic.findOne({ name, lastname, lastname2 });

    if (medic) {
      return res
        .status(400)
        .json({ ok: false, message: "Este medico ya existe" });
    }

    const medicNew = new Medic(req.body);
    const medicSave = await medicNew.save();

    res.status(200).json({
      ok: true,
      message: "Medico creado",
      medic: medicSave,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const updateMedic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const medic = await Medic.findById(id);

    if (!medic) {
      return res
        .status(400)
        .json({ ok: false, message: "Este medico no existe" });
    }

    const medicNew = await Medic.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      ok: true,
      message: "Medico actualizado",
      medic: medicNew,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const deleteMedic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const medic = await Medic.findById(id);

    if (!medic) {
      return res
        .status(400)
        .json({ ok: false, message: "Este medico no existe" });
    }

    await Medic.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Medico eliminado",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};
