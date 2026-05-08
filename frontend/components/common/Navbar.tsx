"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { clearAuth, getUser } from "@/lib/auth";
import { User } from "@/types/auth";
import { Button } from "./Button";

export function Navbar() {
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
      <PageContainer className="flex items-center justify-between gap-4 py-4">
        <div>
          <p className="text-lg font-semibold text-slate-950">Task Manager</p>
          {user ? (
            <p className="text-sm text-slate-500">Signed in as {user.name}</p>
          ) : null}
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </PageContainer>
    </header>
  );
}
