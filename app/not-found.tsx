import Link from "next/link";
import { MaterialOrb } from "@/components/visuals/material-orb";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[var(--silver)] p-6 text-center">
      <div className="relative max-w-2xl">
        <MaterialOrb className="mx-auto h-44 w-44 opacity-55" />
        <p className="mt-5 font-mono text-xs tracking-[0.2em] text-[var(--green-600)]">[ 404 ]</p>
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.05em]">Page not found</h1>
        <p className="mt-5 text-[var(--muted)]">The requested page is not available.</p>
        <Link className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--green-700)] px-6 text-sm font-semibold text-white" href="/en">Return home</Link>
      </div>
    </main>
  );
}
