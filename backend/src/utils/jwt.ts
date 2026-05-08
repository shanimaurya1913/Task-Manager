import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const signToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  };

  return jwt.sign({ userId }, env.jwtSecret, {
    ...options
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret) as { userId: string };
};
