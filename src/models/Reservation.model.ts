import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Medic } from "./Medic.model";
import { Pacient } from "./Pacient.model";
import { User } from "./User.model";

module Constants {
  export enum Payment {
    pendiente = "pendiente",
    pagado = "pagado",
    anulado = "anulado",
  }

  export enum Status {
    pendiente = "pendiente",
    aplicada = "aplicada",
    falto = "falto",
    cancelada = "cancelada",
  }
}

export class Reservation {
  @prop({ required: true, trim: true }) //mongoose
  title: string; //typescript (ts)

  @prop({ required: true })
  note: string;

  @prop({ required: true })
  dateTime: Date;

  @prop({ required: true })
  symtoms: string;

  @prop({ required: true })
  sick: string;

  @prop({ required: true })
  medicaments: string;

  @prop({ required: true })
  price: number;

  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ ref: () => Pacient })
  pacient: Ref<Pacient>;

  @prop({ ref: () => Medic })
  medic: Ref<Medic>;

  @prop({ required: true, type: String, enum: Constants.Payment })
  payment: Constants.Payment[];

  @prop({ required: true, type: String, enum: Constants.Status })
  status: Constants.Status[];
}

const reservationModel = getModelForClass(Reservation);
export default reservationModel;
