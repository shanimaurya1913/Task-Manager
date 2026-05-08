"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/Textarea";

interface TaskFormProps {
  isSubmitting: boolean;
  onCreate: (values: { title: string; description: string }) => Promise<void>;
}

export function TaskForm({ isSubmitting, onCreate }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError("Title is required.");
      return;
    }

    setTitleError("");
    await onCreate({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <Input
          label="Task title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleError("");
          }}
          placeholder="Example: Finish API documentation"
          error={titleError}
          required
        />
        <Textarea
          label="Description"
          rows={2}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Optional notes"
        />
        <Button
          type="submit"
          className="w-full lg:w-auto lg:min-w-28"
          loading={isSubmitting}
        >
          Add task
        </Button>
      </div>
    </form>
  );
}
