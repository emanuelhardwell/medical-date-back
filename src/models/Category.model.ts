import { getModelForClass, prop } from "@typegoose/typegoose";

export class Category {
  @prop({ required: true, trim: true }) //Mongoose
  name: string; //TypeScript (ts)
}

export const categoryModel = getModelForClass(Category);
