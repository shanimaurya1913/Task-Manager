import { Card } from "@/components/common/Card";

interface TaskStatsProps {
  total: number;
  pending: number;
  completed: number;
}

export function TaskStats({ total, pending, completed }: TaskStatsProps) {
  const stats = [
    { label: "Total tasks", value: total },
    { label: "Pending", value: pending },
    { label: "Completed", value: completed }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 sm:p-5">
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
