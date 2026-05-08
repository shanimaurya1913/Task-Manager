"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Alert } from "@/components/common/Alert";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";

interface AuthFormProps {
  mode: "login" | "signup";
  isLoading: boolean;
  error: string;
  onSubmit: (values: {
    name?: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

interface AuthFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export function AuthForm({ mode, isLoading, error, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [formError, setFormError] = useState("");
  const isSignup = mode === "signup";

  const validateForm = () => {
    const nextErrors: AuthFormErrors = {};

    if (isSignup && !name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (validateForm()) {
      await onSubmit({ name, email, password });
    }
  };

  return (
    <Card
      title={isSignup ? "Create your account" : "Welcome back"}
      subtitle={
        isSignup
          ? "Start managing your tasks in one place."
          : "Log in to view your task dashboard."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {isSignup ? (
          <Input
            label="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((current) => ({ ...current, name: "" }));
            }}
            error={errors.name}
          />
        ) : null}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => {
            const nextEmail = event.target.value;
            setEmail(nextEmail);
            setErrors((current) => ({
              ...current,
              email:
                nextEmail && !isValidEmail(nextEmail)
                  ? "Please enter a valid email address."
                  : "",
            }));
          }}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => {
            const nextPassword = event.target.value;
            setPassword(nextPassword);
            setErrors((current) => ({
              ...current,
              password:
                isSignup && nextPassword && nextPassword.length < 6
                  ? "Password must be at least 6 characters."
                  : "",
            }));
          }}
          error={errors.password}
        />

        <Alert message={formError || error} />

        <Button type="submit" className="w-full" loading={isLoading}>
          {isSignup ? "Create account" : "Log in"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          className="font-medium text-blue-700 hover:underline"
          href={isSignup ? "/login" : "/signup"}
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </Card>
  );
}
