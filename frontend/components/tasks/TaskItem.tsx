"use client";

import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (task: Task) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export function TaskItem({ task, onToggleStatus, onDelete }: TaskItemProps) {
  const isCompleted = task.status === "completed";

  return (
    <li>
      <Card className="p-4 transition hover:border-slate-300">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`break-words text-base font-semibold ${
                isCompleted ? "text-slate-500 line-through" : "text-slate-950"
              }`}
            >
              {task.title}
            </h3>
            <Badge status={task.status} />
          </div>
          {task.description ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
              {task.description}
            </p>
          ) : null}
          <p className="mt-3 text-xs text-slate-400">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="sm:min-w-36"
            variant="secondary"
            onClick={() => onToggleStatus(task)}
          >
            Mark {isCompleted ? "pending" : "completed"}
          </Button>
          <Button
            className="sm:min-w-24"
            variant="danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </div>
      </div>
      </Card>
    </li>
  );
}
