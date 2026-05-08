"use client";

import { Card } from "@/components/common/Card";
import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { TaskListSkeleton } from "./TaskListSkeleton";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleStatus: (task: Task) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export function TaskList({
  tasks,
  isLoading,
  onToggleStatus,
  onDelete
}: TaskListProps) {
  if (isLoading) {
    return <TaskListSkeleton />;
  }

  if (tasks.length === 0) {
    return (
      <Card className="py-10 text-center">
        <p className="font-medium text-slate-900">No tasks found</p>
        <p className="mt-1 text-sm text-slate-500">
          Create a task or adjust your search and filter.
        </p>
      </Card>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
