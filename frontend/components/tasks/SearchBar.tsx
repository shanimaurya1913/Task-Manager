"use client";

import { Input } from "@/components/common/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      label="Search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by title or description"
    />
  );
}
