import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Category } from "./Category.model";

module Constants {
  export enum Gender {
    hombre = "hombre",
    mujer = "mujer",
  }
}

export class Medic {
  @prop({ required: true, trim: true }) //mongoose
  name: string; //typescript (ts)

  @prop({ required: true, trim: true })
  lastname: string;

  @prop({ required: true, trim: true })
  lastname2: string;

  @prop({ required: true, trim: true })
  email: string;

  //   @prop({ required: true })
  //   gender: string; //verificar
  @prop({ required: true, type: String, enum: Constants.Gender })
  gender: Constants.Gender[];

  @prop({ required: true })
  dayOfBirth: Date;

  @prop({ required: true })
  address: string;

  @prop({ required: true })
  phone: string;

  @prop({ required: true, default: false })
  isActive: boolean;

  @prop({ ref: () => Category })
  category: Ref<Category>;
}

const medicModel = getModelForClass(Medic);
export default medicModel;
