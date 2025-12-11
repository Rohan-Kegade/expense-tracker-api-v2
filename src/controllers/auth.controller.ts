import type { Request, Response } from "express";
import authService from "../services/auth.service.js";

export default {
 signup: async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const defaultCategories = [
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Other',
    ];

    const result = await authService.signup(name, email, password, defaultCategories);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
},


  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  logout: (req: Request, res: Response) => {
    res.json({ message: "Logged out" });
  },
};
