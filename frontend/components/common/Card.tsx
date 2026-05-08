import { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, subtitle, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {title || subtitle ? (
        <div className="mb-5">
          {title ? (
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
