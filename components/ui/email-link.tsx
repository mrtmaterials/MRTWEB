"use client";

import { useEffect, useState } from "react";

type EmailLinkProps = {
  className?: string;
  local: string;
  domain: string;
};

export function EmailLink({ className, local, domain }: EmailLinkProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsHydrated(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const email = isHydrated ? `${local}@${domain}` : `${local} [at] ${domain}`;

  return (
    <a className={className} href={email.includes("@") ? `mailto:${email}` : undefined}>
      {email}
    </a>
  );
}
