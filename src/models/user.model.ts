import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model<IUser>("User", UserSchema);
