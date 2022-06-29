import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";

module Constants {
  export enum Gender {
    hombre = "hombre",
    mujer = "mujer",
  }
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Pacient {
  @prop({ required: true, trim: true }) //mongoose
  name: string; //typescript (ts)

  @prop({ required: true, trim: true })
  lastname: string;

  @prop({ trim: true })
  lastname2: string;

  @prop({ required: true, trim: true, unique: true })
  email: string;

  @prop({ required: true, type: String, enum: Constants.Gender })
  gender: Constants.Gender;

  @prop({ required: true })
  dayOfBirth: Date;

  @prop({ required: true })
  address: string;

  @prop({ required: true })
  phone: string;

  @prop({ required: true })
  sick: string;

  @prop({ required: true })
  medicaments: string;

  @prop({ trim: true })
  alergy: string;

  @prop({ required: true, default: false })
  isFavorite: boolean;

  @prop({ required: true, default: false })
  isActive: boolean;
}

const pacientModel = getModelForClass(Pacient);
export default pacientModel;
