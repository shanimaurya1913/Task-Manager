"use client";

import { Button } from "@/components/common/Button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-lg border border-red-100 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-slate-950">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-500">{error.message}</p>
        <Button className="mt-5" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
