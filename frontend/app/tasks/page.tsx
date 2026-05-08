"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "@/components/common/Alert";
import { Card } from "@/components/common/Card";
import { PageContainer } from "@/components/common/PageContainer";
import { DashboardHeader } from "@/components/tasks/DashboardHeader";
import { Pagination } from "@/components/tasks/Pagination";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskStats } from "@/components/tasks/TaskStats";
import { TaskToolbar } from "@/components/tasks/TaskToolbar";
import { api, getApiErrorMessage } from "@/lib/api";
import { clearAuth } from "@/lib/auth";
import {
  ApiResponse,
  Task,
  TasksResponse,
  TaskStatusFilter,
} from "@/types/task";

const PAGE_LIMIT = 5;

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<TaskStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const handleUnauthorized = useCallback(() => {
    clearAuth();
    router.replace("/login");
  }, [router]);

  const fetchStats = useCallback(async () => {
    const [allResponse, pendingResponse, completedResponse] = await Promise.all([
      api.get<ApiResponse<TasksResponse>>("/tasks", {
        params: { page: 1, limit: 1, status: "all" }
      }),
      api.get<ApiResponse<TasksResponse>>("/tasks", {
        params: { page: 1, limit: 1, status: "pending" }
      }),
      api.get<ApiResponse<TasksResponse>>("/tasks", {
        params: { page: 1, limit: 1, status: "completed" }
      })
    ]);

    setStats({
      total: allResponse.data.data.totalTasks,
      pending: pendingResponse.data.data.totalTasks,
      completed: completedResponse.data.data.totalTasks
    });
  }, []);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.get<ApiResponse<TasksResponse>>("/tasks", {
        params: {
          page,
          limit: PAGE_LIMIT,
          search: debouncedSearch,
          status,
        },
      });

      setTasks(response.data.data.tasks);
      setTotalPages(response.data.data.totalPages);
      setTotalTasks(response.data.data.totalTasks);
      await fetchStats();
    } catch (err) {
      const message = getApiErrorMessage(err);
      if (message.toLowerCase().includes("token")) {
        handleUnauthorized();
        return;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, fetchStats, handleUnauthorized, page, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (values: {
    title: string;
    description: string;
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/tasks", values);
      if (page === 1) {
        await fetchTasks();
      } else {
        setPage(1);
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    setError("");

    try {
      await api.patch(`/tasks/${task._id}`, { status: nextStatus });
      await fetchTasks();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleDelete = async (taskId: string) => {
    setError("");

    try {
      await api.delete(`/tasks/${taskId}`);
      if (tasks.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      } else {
        await fetchTasks();
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <PageContainer>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">My tasks</h1>
            <p className="mt-1 text-sm text-slate-500">
              Add, organize, and track your tasks easily.
            </p>
          </div>
          <div className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            <span className="font-semibold text-slate-950">{totalTasks}</span>{" "}
            task{totalTasks === 1 ? "" : "s"} found
          </div>
        </div>

        <div className="space-y-5">
          <TaskStats
            total={stats.total}
            pending={stats.pending}
            completed={stats.completed}
          />

          <Card
            title="Add a new task"
            subtitle="Keep it short now, add details only when needed."
          >
            <TaskForm isSubmitting={isSubmitting} onCreate={handleCreateTask} />
          </Card>

          <Card>
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Task list
                </h2>
                <p className="text-sm text-slate-500">
                  Showing page {page} of {totalPages}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <TaskToolbar
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
              />
            </div>

            <Alert message={error} className="mb-4" />

            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />

            <div className="mt-5 border-t border-slate-200 pt-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}
