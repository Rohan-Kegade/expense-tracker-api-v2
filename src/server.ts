import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budgets", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
