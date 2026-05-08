export type TaskStatus = "pending" | "completed";
export type TaskStatusFilter = "all" | TaskStatus;

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  tasks: Task[];
  totalTasks: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
