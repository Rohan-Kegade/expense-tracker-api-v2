import Budget from "../models/budget.model.js";

export default {
  getBudgets: (userId: string) => {
    return Budget.find({ userId });
  },

  createOrUpdateBudget: async (
    userId: string,
    category: string,
    budget: number,
  ) => {
    let item = await Budget.findOne({ userId, category });

    if (item) {
      item.budget = budget;
      return item.save();
    }

    return Budget.create({ userId, category, budget });
  },

  deleteBudget: (userId: string, category: string) => {
    return Budget.deleteOne({ userId, category });
  },
};
