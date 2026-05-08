"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { clearAuth, getUser } from "@/lib/auth";
import { User } from "@/types/auth";

export function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <PageContainer className="py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold text-slate-950">Task Manager</p>
            {user ? (
              <p className="mt-1 text-sm text-slate-500">
                Signed in as {user.name} · {user.email}
              </p>
            ) : null}
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </PageContainer>
    </header>
  );
}
