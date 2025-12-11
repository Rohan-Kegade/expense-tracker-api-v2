import { Router } from "express";
import controller from "../controllers/category.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, controller.getCategories);
router.post("/", auth, controller.createCategory);
router.delete("/:name", auth, controller.deleteCategory);

export default router;
