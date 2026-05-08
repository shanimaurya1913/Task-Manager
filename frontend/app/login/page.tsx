"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { api, getApiErrorMessage } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { ApiResponse } from "@/types/task";
import { AuthResponse } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values: {
    email: string;
    password: string;
    name?: string;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        {
          email: values.email,
          password: values.password
        }
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
        mode="login"
        isLoading={isLoading}
        error={error}
        onSubmit={handleLogin}
      />
    </AuthLayout>
  );
}
