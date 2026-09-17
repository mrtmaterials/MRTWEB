"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type MobileNavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  closeLabel: string;
  items: MobileNavItem[];
  openLabel: string;
  quoteHref: string;
  quoteLabel: string;
};

export function MobileNav({ closeLabel, items, openLabel, quoteHref, quoteLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : openLabel}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--green-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span aria-hidden="true" className="grid gap-1.5">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>
      {isOpen ? (
        <div
          className="absolute inset-x-0 top-full border-t border-[var(--line)] bg-[color:rgba(244,246,247,0.98)] px-5 py-7 shadow-xl backdrop-blur-xl"
          id={panelId}
        >
          <nav className="mx-auto flex max-w-[1440px] flex-col gap-1" aria-label={openLabel}>
            {items.map((item) => (
              <Link
                className="rounded-xl px-3 py-3 text-lg font-medium text-[var(--ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--green-700)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] focus-visible:ring-offset-2"
              href={quoteHref}
              onClick={() => setIsOpen(false)}
            >
              {quoteLabel}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
