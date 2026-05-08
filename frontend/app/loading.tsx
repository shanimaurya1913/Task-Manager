export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-7 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-6 space-y-4">
          <div className="h-11 animate-pulse rounded bg-slate-100" />
          <div className="h-11 animate-pulse rounded bg-slate-100" />
          <div className="h-11 animate-pulse rounded bg-blue-100" />
        </div>
      </div>
    </main>
  );
}
