import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-2xl font-bold text-slate-950">Task Manager</p>
          <p className="mt-2 text-sm text-slate-500">
            A simple workspace for everyday tasks.
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}
