import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.put("/update", auth, userController.updateUser);
router.delete("/delete", auth, userController.deleteUser);

export default router;
