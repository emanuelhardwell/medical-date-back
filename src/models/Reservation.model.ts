import {
  prop,
  Ref,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { Medic } from "./Medic.model";
import { Pacient } from "./Pacient.model";
import { User } from "./User.model";

// Forma 1 de implementar enum para ZOD
module Constants {
  export enum Payment {
    pendiente = "pendiente",
    pagado = "pagado",
    anulado = "anulado",
  }
}

// Forma 2 de implementar enum para ZOD
export enum Status {
  pendiente = "pendiente",
  aplicada = "aplicada",
  falto = "falto",
  cancelada = "cancelada",
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
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
  payment: Constants.Payment;

  @prop({ required: true, type: String, enum: Status })
  status: Status;
}

const reservationModel = getModelForClass(Reservation);
export default reservationModel;
