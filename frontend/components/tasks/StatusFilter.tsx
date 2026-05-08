"use client";

import { Select } from "@/components/common/Select";
import { TaskStatusFilter } from "@/types/task";

interface StatusFilterProps {
  value: TaskStatusFilter;
  onChange: (value: TaskStatusFilter) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select
      label="Status"
      value={value}
      onChange={(event) => onChange(event.target.value as TaskStatusFilter)}
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </Select>
  );
}
