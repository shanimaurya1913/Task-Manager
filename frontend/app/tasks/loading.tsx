import { Navbar } from "@/components/common/Navbar";
import { TaskListSkeleton } from "@/components/tasks/TaskListSkeleton";

export default function TasksLoading() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-6 w-36 animate-pulse rounded bg-slate-200" />
            <div className="mt-5 h-11 animate-pulse rounded bg-slate-100" />
            <div className="mt-4 h-28 animate-pulse rounded bg-slate-100" />
            <div className="mt-4 h-11 animate-pulse rounded bg-blue-100" />
          </aside>
          <section>
            <div className="mb-4 h-24 animate-pulse rounded-lg bg-white" />
            <TaskListSkeleton />
          </section>
        </div>
      </main>
    </div>
  );
}
