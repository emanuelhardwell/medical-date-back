import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ required: true, trim: true }) //mongoose
  name: string; //typescript (ts)

  @prop({ required: true, trim: true })
  lastname: string;

  @prop({ trim: true })
  lastname2: string;

  @prop({ required: true, trim: true, unique: true })
  email: string;

  @prop({ required: true, trim: true })
  password: string;

  @prop({ required: true, default: false })
  isActive: boolean;

  @prop({ required: true, default: false })
  isAdmin: boolean;
}

const userModel = getModelForClass(User);
export default userModel;
