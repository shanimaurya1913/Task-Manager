import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "../validations/auth.validation";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
