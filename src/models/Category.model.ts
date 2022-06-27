import { getModelForClass, prop } from "@typegoose/typegoose";

export class Category {
  @prop({ required: true, trim: true, unique: true }) //Mongoose
  name: string; //TypeScript (ts)
}

const categoryModel = getModelForClass(Category);
export default categoryModel;
