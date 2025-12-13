import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../middleware/auth.js";

export default {
  async signup(
    name: string,
    email: string,
    password: string,
    defaultCategories: string[],
  ) {
    // 1. Create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 2. Insert default categories for this user
    const categoriesToInsert = defaultCategories.map((cat) => ({
      userId: user._id,
      name: cat,
    }));

    await Category.insertMany(categoriesToInsert);

    const token = generateToken({ id: user._id });

    return { message: "Signup successful", user, token };
  },

  login: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    return { user, token };
  },
};
