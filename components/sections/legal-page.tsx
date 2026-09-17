import { Container } from "@/components/ui/container";

type LegalPageProps = {
  copy: { title: string; updated: string; intro: string; sections: readonly { title: string; body: string }[] };
};

export function LegalPage({ copy }: LegalPageProps) {
  return <section className="py-20 sm:py-28"><Container className="max-w-4xl"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--green-600)]">{copy.updated}</p><h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">{copy.title}</h1><p className="mt-7 text-lg leading-8 text-[var(--muted)]">{copy.intro}</p><div className="mt-14 grid gap-10">{copy.sections.map((section) => <section key={section.title}><h2 className="font-display text-2xl font-semibold tracking-[-0.035em]">{section.title}</h2><p className="mt-3 leading-7 text-[var(--muted)]">{section.body}</p></section>)}</div></Container></section>;
}

