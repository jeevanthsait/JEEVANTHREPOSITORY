import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";
import { MESSAGES } from "../constants/messages";
import { CONFIG } from "../constants/config";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: MESSAGES.USER_EXISTS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    return res.status(201).json({ message: MESSAGES.REGISTER_SUCCESS, user });
  } catch (error) {
    console.error(" Register error:", error);
    return res.status(500).json({
      message: MESSAGES.REGISTER_ERROR,
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: MESSAGES.INVALID_CREDENTIALS });

const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  CONFIG.JWT_SECRET,  
  { expiresIn: CONFIG.TOKEN_EXPIRY } 
);
    return res.json({
      message: MESSAGES.LOGIN_SUCCESS,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(" Login error:", error);
    return res.status(500).json({
      message: MESSAGES.LOGIN_ERROR,
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });

    return res.json({ message: MESSAGES.PROFILE_FETCH_SUCCESS, user });
  } catch (error) {
    console.error(" Profile error:", error);
    return res.status(500).json({
      message: MESSAGES.PROFILE_ERROR,
      error: error instanceof Error ? error.message : error,
    });
  }
};
