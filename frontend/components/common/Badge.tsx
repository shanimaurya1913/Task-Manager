import { TaskStatus } from "@/types/task";

interface BadgeProps {
  status: TaskStatus;
}

export function Badge({ status }: BadgeProps) {
  const isCompleted = status === "completed";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
        isCompleted
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}
