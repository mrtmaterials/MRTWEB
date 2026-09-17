"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LegacyRedirect({ suffix }: { suffix: string }) {
  const router = useRouter();
  useEffect(() => {
    const locale = navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
    router.replace(`/${locale}/${suffix}`);
  }, [router, suffix]);
  return <main className="grid min-h-screen place-items-center bg-[var(--bg)]"><a className="font-semibold text-[var(--green-600)]" href={`/en/${suffix}`}>MRT Materials</a></main>;
}

