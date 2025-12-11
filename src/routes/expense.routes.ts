import { Router } from "express";
import controller from "../controllers/expense.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, controller.getExpenses);
router.post("/", auth, controller.createExpense);
router.put("/:id", auth, controller.updateExpense);
router.delete("/:id", auth, controller.deleteExpense);

export default router;
