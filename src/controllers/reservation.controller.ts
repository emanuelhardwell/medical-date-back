import { Response, Request } from "express";
import Reservation from "../models/Reservation.model";

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({
      ok: true,
      message: "Reservaciones obtenidas",
      reservations,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  const { title, note } = req.body;

  try {
    const reservation = await Reservation.findOne({ title, note });

    if (reservation) {
      return res
        .status(400)
        .json({ ok: false, message: "Este reservación ya existe" });
    }

    const reservationNew = new Reservation(req.body);
    const reservationSave = await reservationNew.save();

    res.status(200).json({
      ok: true,
      message: "Reservación creada",
      reservation: reservationSave,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res
        .status(400)
        .json({ ok: false, message: "Este reservación no existe" });
    }

    const reservationNew = await Reservation.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: "Reservación actualizada",
      reservation: reservationNew,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res
        .status(400)
        .json({ ok: false, message: "Este reservación no existe" });
    }

    await Reservation.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Reservación eliminada",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, message: "Comunicate con el administrador" });
  }
};
