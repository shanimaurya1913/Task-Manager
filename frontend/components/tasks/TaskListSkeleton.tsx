export function TaskListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="h-5 w-2/5 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
