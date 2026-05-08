"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { api, getApiErrorMessage } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { AuthResponse } from "@/types/auth";
import { ApiResponse } from "@/types/task";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (values: {
    name?: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        "/auth/signup",
        values
      );
      saveAuth(response.data.data);
      router.push("/tasks");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        mode="signup"
        isLoading={isLoading}
        error={error}
        onSubmit={handleSignup}
      />
    </AuthLayout>
  );
}
