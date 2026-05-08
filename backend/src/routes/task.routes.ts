import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController
} from "../controllers/task.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createTaskSchema,
  taskQuerySchema,
  updateTaskSchema
} from "../validations/task.validation";

const router = Router();

router.use(authenticate);

router.post("/", validate(createTaskSchema), asyncHandler(createTaskController));
router.get("/", validate(taskQuerySchema), asyncHandler(getTasksController));
router.patch("/:id", validate(updateTaskSchema), asyncHandler(updateTaskController));
router.delete("/:id", asyncHandler(deleteTaskController));

export default router;
