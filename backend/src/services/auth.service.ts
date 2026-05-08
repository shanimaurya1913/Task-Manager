import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { AppError } from "../middlewares/error.middleware";
import { LoginInput, SignupInput } from "../validations/auth.validation";
import { signToken } from "../utils/jwt";

const sanitizeUser = (user: { _id: unknown; name: string; email: string }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email
});

export const signupUser = async (input: SignupInput) => {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword
  });

  const token = signToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token
  };
};

export const loginUser = async (input: LoginInput) => {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token
  };
};
