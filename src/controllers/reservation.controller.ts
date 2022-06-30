import { Response, Request } from "express";
import {
  handleErrorResponse,
  handleInternalServerError,
} from "../helpers/handleError";
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
    handleInternalServerError(res, error);
  }
};

export const createReservation = async (req: Request, res: Response) => {
  const { title, note } = req.body;

  try {
    const reservation = await Reservation.findOne({ title, note });

    if (reservation) {
      return handleErrorResponse(res, "Este reservación ya existe", 400);
    }

    const reservationNew = new Reservation(req.body);
    const reservationSave = await reservationNew.save();

    res.status(200).json({
      ok: true,
      message: "Reservación creada",
      reservation: reservationSave,
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return handleErrorResponse(res, "Este reservación no existe", 400);
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
    handleInternalServerError(res, error);
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return handleErrorResponse(res, "Este reservación no existe", 400);
    }

    await Reservation.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: "Reservación eliminada",
    });
  } catch (error) {
    handleInternalServerError(res, error);
  }
};
