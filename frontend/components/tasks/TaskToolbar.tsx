"use client";

import { SearchBar } from "./SearchBar";
import { StatusFilter } from "./StatusFilter";
import { TaskStatusFilter } from "@/types/task";

interface TaskToolbarProps {
  search: string;
  status: TaskStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatusFilter) => void;
}

export function TaskToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange
}: TaskToolbarProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_220px]">
      <SearchBar value={search} onChange={onSearchChange} />
      <StatusFilter value={status} onChange={onStatusChange} />
    </div>
  );
}
