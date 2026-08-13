// Subtle decorative backdrop for the hero headline column — a scattered
// pattern of crosses, dots, and a soft glow in the brand colors. Kept very
// low-opacity and placed behind the text (z-index below it) so it adds
// texture without hurting legibility.
export function HeroTextBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 560"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="backdropBrand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffa649" />
          <stop offset="100%" stopColor="#ff4c88" />
        </linearGradient>
        <radialGradient id="backdropGlow" cx="30%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffa649" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffa649" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="140" cy="200" r="230" fill="url(#backdropGlow)" />

      <g fill="none" stroke="url(#backdropBrand)" strokeWidth="3" strokeLinecap="round" opacity="0.18">
        {/* scattered plus / cross marks */}
        <path d="M40,60 v22 M29,71 h22" />
        <path d="M430,40 v18 M421,49 h18" />
        <path d="M460,260 v20 M450,270 h20" />
        <path d="M20,320 v18 M11,329 h18" />
        <path d="M60,470 v20 M50,480 h20" />
        <path d="M400,480 v18 M391,489 h18" />
        <path d="M250,20 v16 M242,28 h16" />
      </g>

      <g fill="url(#backdropBrand)" opacity="0.15">
        <circle cx="120" cy="120" r="4" />
        <circle cx="380" cy="120" r="5" />
        <circle cx="440" cy="200" r="3.5" />
        <circle cx="70" cy="230" r="3.5" />
        <circle cx="350" cy="380" r="4.5" />
        <circle cx="150" cy="430" r="3.5" />
        <circle cx="30" cy="410" r="4" />
        <circle cx="280" cy="500" r="4" />
      </g>

      <circle cx="420" cy="340" r="120" fill="none" stroke="url(#backdropBrand)" strokeWidth="1.5" opacity="0.12" />
      <circle cx="10" cy="480" r="90" fill="none" stroke="url(#backdropBrand)" strokeWidth="1.5" opacity="0.12" />
    </svg>
  )
}
