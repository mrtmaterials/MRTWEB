import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white bg-[var(--silver)] py-20 sm:py-28">
      <div aria-hidden="true" className="molecular-grid absolute inset-0 opacity-50" />
      <Container className="relative">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-600)]">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-[var(--ink)] sm:text-6xl lg:text-8xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

