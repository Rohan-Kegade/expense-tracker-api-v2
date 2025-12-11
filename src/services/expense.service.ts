import Expense from "../models/expense.model.js";

export default {
  getExpenses: (userId: string) => {
    return Expense.find({ userId });
  },

  createExpense: (data: any) => {
    return Expense.create(data);
  },

  updateExpense: (id: string, userId: string, data: any) => {
    return Expense.findOneAndUpdate({ _id: id, userId }, data, { new: true });
  },

  deleteExpense: (id: string, userId: string) => {
    return Expense.deleteOne({ _id: id, userId });
  },
};
