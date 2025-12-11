import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  userId: string;
  name: string;
}

const CategorySchema: Schema = new Schema({
  userId: String,
  name: String,
});

export default mongoose.model<ICategory>("Category", CategorySchema);
