import Category from "../models/category.model.js";
import Budget from "../models/budget.model.js";
import Expense from "../models/expense.model.js";

export default {
  getCategories: (userId: string) => {
    return Category.find({ userId });
  },

  createCategory: async (userId: string, name: string, budget?: number) => {
    const category = await Category.create({ userId, name });

    if (budget) {
      await Budget.create({ userId, category: name, budget });
    }

    return category;
  },

  deleteCategory: async (userId: string, name: string) => {
    // Check if the category is used in any expenses
    const expenseExists = await Expense.exists({ userId, category: name });

    if (expenseExists) {
      throw new Error(
        `Cannot delete category "${name}" because it is used in existing expenses.`
      );
    }
    await Category.deleteOne({ userId, name });
    await Budget.deleteOne({ userId, category: name });
  },
};
