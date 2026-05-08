import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus
} from "../services/task.service";
import { sendSuccess } from "../utils/apiResponse";
import { TaskQueryInput } from "../validations/task.validation";

const getUserId = (req: Request) => {
  if (!req.user) {
    throw new Error("Authenticated user missing from request");
  }

  return req.user.id;
};

export const createTaskController = async (req: Request, res: Response) => {
  const task = await createTask(getUserId(req), req.body);
  sendSuccess(res, 201, "Task created successfully", task);
};

export const getTasksController = async (req: Request, res: Response) => {
  const data = await getTasks(getUserId(req), req.query as unknown as TaskQueryInput);
  sendSuccess(res, 200, "Tasks fetched successfully", data);
};

export const updateTaskController = async (req: Request, res: Response) => {
  const task = await updateTaskStatus(getUserId(req), String(req.params.id), req.body);
  sendSuccess(res, 200, "Task updated successfully", task);
};

export const deleteTaskController = async (req: Request, res: Response) => {
  await deleteTask(getUserId(req), String(req.params.id));
  sendSuccess(res, 200, "Task deleted successfully");
};
