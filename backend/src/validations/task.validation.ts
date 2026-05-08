import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional()
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "completed"], {
      required_error: "Status is required"
    })
  })
});

export const taskQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : 1))
      .pipe(z.number().int().min(1, "Page must be at least 1")),
    limit: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : 10))
      .pipe(z.number().int().min(1).max(50, "Limit cannot be more than 50")),
    search: z.string().trim().optional().default(""),
    status: z.enum(["all", "pending", "completed"]).optional().default("all")
  })
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"];
export type TaskQueryInput = z.infer<typeof taskQuerySchema>["query"];
