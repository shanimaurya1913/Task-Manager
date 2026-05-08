"use client";

import { Button } from "@/components/common/Button";
import { Navbar } from "@/components/common/Navbar";

export default function TasksError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-lg border border-red-100 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-950">
            Could not load the dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please try again. If the problem continues, log in again.
          </p>
          <Button className="mt-5" onClick={reset}>
            Retry
          </Button>
        </div>
      </main>
    </div>
  );
}
