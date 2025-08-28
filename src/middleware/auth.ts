import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Define a type for the decoded token payload
export interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extend Request to include a typed `user`
export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Invalid token";
    res.status(400).json({ message: "Invalid token", error: errorMessage });
  }
};
