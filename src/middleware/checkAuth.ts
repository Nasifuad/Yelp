import jwt from "jsonwebtoken";
import config from "../../config/config";
import { Request, Response, NextFunction } from "express";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized because no token" });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
    req.user = decoded;
    console.log(
      "🚀 ~ file: checkAuth.ts:12 ~ verifyToken ~ req.user:",
      req.user
    );
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized error" });
  }
};

export { verifyToken };
