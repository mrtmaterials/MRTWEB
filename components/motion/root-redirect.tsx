"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const locale = navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--bg)] p-6 text-center">
      <div>
        <p className="font-display text-2xl font-semibold text-[var(--ink)]">MRT Materials</p>
        <div className="mt-5 flex justify-center gap-3 text-sm font-semibold text-[var(--green-600)]">
          <Link href="/en">English</Link><span aria-hidden="true">/</span><Link href="/vi">Tiếng Việt</Link>
        </div>
      </div>
    </main>
  );
}
