import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { sendError } from "../utils/apiResponse";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Authorization token is required");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("_id name email");

    if (!user) {
      return sendError(res, 401, "Invalid or expired token");
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    };

    return next();
  } catch {
    return sendError(res, 401, "Invalid or expired token");
  }
};
