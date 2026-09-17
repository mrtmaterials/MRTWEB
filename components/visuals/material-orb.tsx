type MaterialOrbProps = {
  className?: string;
};

/** Decorative, static SVG: no motion is required to understand page content. */
export function MaterialOrb({ className }: MaterialOrbProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 560 560"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="orb-core" cx="0" cy="0" r="1" gradientTransform="translate(278 262) rotate(90) scale(214)">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#E8F6EF" />
          <stop offset="1" stopColor="#DDE3E6" />
        </radialGradient>
        <linearGradient id="orb-ring" x1="94" x2="469" y1="83" y2="470" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2FBF84" />
          <stop offset="1" stopColor="#0E8A5F" />
        </linearGradient>
      </defs>
      <circle cx="280" cy="280" r="213" fill="url(#orb-core)" />
      <circle cx="280" cy="280" r="181" stroke="#FFFFFF" strokeOpacity="0.82" strokeWidth="2" />
      <ellipse cx="280" cy="280" rx="220" ry="118" stroke="url(#orb-ring)" strokeWidth="2" />
      <ellipse cx="280" cy="280" rx="118" ry="220" stroke="#0E8A5F" strokeOpacity="0.36" strokeWidth="2" transform="rotate(42 280 280)" />
      <path d="M137 336C198 198 362 172 431 228" stroke="#0E8A5F" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="140" cy="336" r="10" fill="#0E8A5F" />
      <circle cx="431" cy="228" r="10" fill="#2FBF84" />
      <circle cx="320" cy="162" r="7" fill="#0E8A5F" />
      <circle cx="238" cy="388" r="7" fill="#2FBF84" />
    </svg>
  );
}
