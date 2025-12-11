import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseSchema: Schema = new Schema({
  userId: String,
  amount: Number,
  category: String,
  description: String,
  date: String,
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
