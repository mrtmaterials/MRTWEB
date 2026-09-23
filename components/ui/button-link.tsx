import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
};

const variants = {
  primary:
    "bg-[var(--green-700)] text-white shadow-[0_10px_24px_rgba(14,118,81,0.2)] hover:bg-[var(--ink)]",
  secondary:
    "bg-white text-[var(--ink)] ring-1 ring-inset ring-[var(--line)] hover:bg-[var(--green-50)] hover:ring-[var(--green-400)]",
  text: "px-0 text-[var(--green-600)] hover:text-[var(--ink)]",
} as const;

export function ButtonLink({ children, className, variant = "primary", ...props }: ButtonLinkProps) {
  const spacing = variant === "text" ? "min-h-0" : "min-h-12 px-5";

  return (
    <Link
      className={`magnetic-target inline-flex ${spacing} items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[color,background-color,box-shadow,transform] duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
