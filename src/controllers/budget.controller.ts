import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import budgetService from "../services/budget.service.js";

export default {
  getBudgets: async (req: AuthRequest, res: Response) => {
    const budgets = await budgetService.getBudgets(req.user.id);
    res.json(budgets);
  },

  createOrUpdateBudget: async (req: AuthRequest, res: Response) => {
    const { category, budget } = req.body;
    const result = await budgetService.createOrUpdateBudget(
      req.user.id,
      category,
      budget
    );
    res.json(result);
  },

  deleteBudget: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const category = req.params?.category;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category missing" });
    }

    await budgetService.deleteBudget(userId, category);
    res.json({ message: "Deleted" });
  },
};
