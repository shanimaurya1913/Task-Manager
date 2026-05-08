import { Request, Response } from "express";
import { loginUser, signupUser } from "../services/auth.service";
import { sendSuccess } from "../utils/apiResponse";

export const signup = async (req: Request, res: Response) => {
  const data = await signupUser(req.body);
  sendSuccess(res, 201, "Account created successfully", data);
};

export const login = async (req: Request, res: Response) => {
  const data = await loginUser(req.body);
  sendSuccess(res, 200, "Logged in successfully", data);
};
