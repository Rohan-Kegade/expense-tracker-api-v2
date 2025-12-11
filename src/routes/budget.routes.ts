import { Router } from "express";
import controller from "../controllers/budget.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, controller.getBudgets);
router.post("/", auth, controller.createOrUpdateBudget);
router.delete("/:category", auth, controller.deleteBudget);

export default router;
