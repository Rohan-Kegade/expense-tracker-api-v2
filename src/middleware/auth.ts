import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
