import User from "../models/user.model.js";

export default {
  updateUser: async (
    userId: string,
    data: { name?: string; email?: string },
  ) => {
    // Check if user is trying to change email to one already in use
    if (data.email) {
      const existing = await User.findOne({ email: data.email });
      if (existing && existing._id.toString() !== userId) {
        throw new Error("Email is already taken");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true },
    ).select("-password"); // don't send password

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  },

  deleteUser: async (userId: string) => {
    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      throw new Error("User not found or already deleted");
    }

    return { message: "Account deleted" };
  },
};
