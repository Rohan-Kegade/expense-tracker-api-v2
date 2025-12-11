import type { Request, Response } from "express";
import userService from "../services/user.service.js";

export default {
  updateUser: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const userId = req.user.id; // assuming you have auth middleware

      const updatedUser = await userService.updateUser(userId, { name, email });

      res.json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;

      await userService.deleteUser(userId);

      res.json({ message: "Account deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
