import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <header className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className ?? ""}`}>
      {eyebrow ? (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--green-600)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-[-0.045em] text-[var(--ink)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
