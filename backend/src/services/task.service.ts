import { FilterQuery, Types } from "mongoose";
import { AppError } from "../middlewares/error.middleware";
import { ITask, Task } from "../models/task.model";
import {
  CreateTaskInput,
  TaskQueryInput,
  UpdateTaskInput
} from "../validations/task.validation";

export const createTask = async (userId: string, input: CreateTaskInput) => {
  return Task.create({
    userId,
    title: input.title,
    description: input.description || "",
    status: "pending"
  });
};

export const getTasks = async (userId: string, query: TaskQueryInput) => {
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;

  const filter: FilterQuery<ITask> = {
    userId: new Types.ObjectId(userId)
  };

  if (query.status !== "all") {
    filter.status = query.status;
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ];
  }

  const [tasks, totalTasks] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Task.countDocuments(filter)
  ]);

  return {
    tasks,
    totalTasks,
    currentPage: page,
    totalPages: Math.ceil(totalTasks / limit) || 1
  };
};

export const updateTaskStatus = async (
  userId: string,
  taskId: string,
  input: UpdateTaskInput
) => {
  if (!Types.ObjectId.isValid(taskId)) {
    throw new AppError("Task not found", 404);
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    { status: input.status },
    { new: true }
  );

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export const deleteTask = async (userId: string, taskId: string) => {
  if (!Types.ObjectId.isValid(taskId)) {
    throw new AppError("Task not found", 404);
  }

  const task = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};
