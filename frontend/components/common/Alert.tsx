interface AlertProps {
  message: string;
  variant?: "error" | "success";
  className?: string;
}

const variants = {
  error: "border-red-100 bg-red-50 text-red-700",
  success: "border-emerald-100 bg-emerald-50 text-emerald-700"
};

export function Alert({ message, variant = "error", className = "" }: AlertProps) {
  if (!message) {
    return null;
  }

  return (
    <p className={`rounded-xl border px-4 py-3 text-sm ${variants[variant]} ${className}`}>
      {message}
    </p>
  );
}
