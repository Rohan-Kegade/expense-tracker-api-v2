import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import expenseService from "../services/expense.service.js";

export default {
  getExpenses: async (req: AuthRequest, res: Response) => {
    const expenses = await expenseService.getExpenses(req.user.id);
    res.json(expenses);
  },

  createExpense: async (req: AuthRequest, res: Response) => {
    const expense = await expenseService.createExpense({
      ...req.body,
      userId: req.user.id,
    });
    res.json(expense);
  },

  updateExpense: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const expenseId = req.params?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID missing" });
    }

    const updated = await expenseService.updateExpense(
      expenseId,
      userId,
      req.body
    );

    res.json(updated);
  },

  deleteExpense: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const expenseId = req.params?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID missing" });
    }

    await expenseService.deleteExpense(expenseId, userId);

    res.json({ message: "Deleted" });
  },
};
