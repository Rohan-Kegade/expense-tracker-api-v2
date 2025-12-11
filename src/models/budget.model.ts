import mongoose, { Document, Schema } from "mongoose";

export interface IBudget extends Document {
  userId: string;
  category: string;
  budget: number;
}

const BudgetSchema: Schema = new Schema({
  userId: String,
  category: String,
  budget: Number,
});

export default mongoose.model<IBudget>("Budget", BudgetSchema);
