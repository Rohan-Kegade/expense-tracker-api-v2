import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import categoryService from "../services/category.service.js";

export default {
  getCategories: async (req: AuthRequest, res: Response) => {
    const categories = await categoryService.getCategories(req.user.id);
    res.json(categories);
  },

  createCategory: async (req: AuthRequest, res: Response) => {
    const { name, budget } = req.body;
    const category = await categoryService.createCategory(
      req.user.id,
      name,
      budget,
    );
    res.json(category);
  },

  deleteCategory: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const name = req.params?.name;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    if (!name) {
      return res.status(400).json({ message: "Category name missing" });
    }

    await categoryService.deleteCategory(userId, name);
    res.json({ message: "Deleted" });
  },
};
