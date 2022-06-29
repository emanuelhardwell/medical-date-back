import { Response, Request } from "express";
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const createPacient = async (req: Request, res: Response) => {
  const { name, lastname, lastname2, email } = req.body;

  try {
    let pacient = await Pacient.findOne({ name, lastname, lastname2 });

    if (pacient) {
      return res
        .status(400)
        .json({ ok: false, message: "Este paciente ya existe" });
    }

    pacient = await Pacient.findOne({ email });
    if (pacient) {
      return res
        .status(400)
        .json({ ok: false, message: "Este email ya esta en uso" });
    }

    const pacientNew = new Pacient(req.body);
    const pacientSave = await pacientNew.save();

    res.status(200).json({
      ok: true,
      message: "Paciente creado",
      pacient: pacientSave,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const updatePacient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, lastname, lastname2 } = req.body;

  try {
    const pacient = await Pacient.findById(id);

    if (!pacient) {
      return res
        .status(400)
        .json({ ok: false, message: "Este paciente no existe" });
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
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const deletePacient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pacient = await Pacient.findById(id);

    if (!pacient) {
      return res
        .status(400)
        .json({ ok: false, message: "Este paciente no existe" });
    }

    await Pacient.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Paciente eliminado",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};
