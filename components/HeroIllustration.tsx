// Hand-built vector illustration for the homepage hero — replaces a
// previously broken external stock-photo URL with a self-contained asset
// that can't 404 and needs no network request.
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 450"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Illustration of a doctor with a globe, representing worldwide medical care"
    >
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3e6" />
          <stop offset="55%" stopColor="#fff7f2" />
          <stop offset="100%" stopColor="#ffeef4" />
        </linearGradient>
        <linearGradient id="heroBrand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffa649" />
          <stop offset="100%" stopColor="#ff4c88" />
        </linearGradient>
        <radialGradient id="globeFill" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffcf9e" />
          <stop offset="100%" stopColor="#ff8fae" />
        </radialGradient>
        <linearGradient id="coatFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fdeef1" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <rect x="0" y="0" width="600" height="450" fill="url(#heroBg)" />
      <circle cx="60" cy="380" r="140" fill="url(#heroBrand)" opacity="0.08" />
      <circle cx="560" cy="60" r="110" fill="url(#heroBrand)" opacity="0.1" />

      {/* globe, representing patients arriving from around the world */}
      <g transform="translate(378,190)">
        <circle r="150" fill="url(#globeFill)" opacity="0.9" />
        <circle r="150" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
        <ellipse rx="150" ry="52" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
        <ellipse rx="150" ry="52" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" transform="rotate(60)" />
        <ellipse rx="150" ry="52" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" transform="rotate(120)" />
        <line x1="-150" y1="0" x2="150" y2="0" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />

        {/* location pins for a few of the countries GD Healthcare serves */}
        <g fill="#ffffff">
          <circle cx="-70" cy="-55" r="7" />
          <circle cx="86" cy="-30" r="6" />
          <circle cx="30" cy="90" r="7" />
          <circle cx="-96" cy="60" r="5" />
        </g>
      </g>

      {/* floating medical cross badge */}
      <g transform="translate(470,88)">
        <circle r="34" fill="#ffffff" />
        <circle r="34" fill="none" stroke="url(#heroBrand)" strokeWidth="3" />
        <rect x="-5" y="-18" width="10" height="36" rx="3" fill="url(#heroBrand)" />
        <rect x="-18" y="-5" width="36" height="10" rx="3" fill="url(#heroBrand)" />
      </g>

      {/* heartbeat pulse line, kept clear of the globe and the doctor below */}
      <path
        d="M30,210 H90 L110,175 L135,245 L158,210 L178,210 L192,185 L206,210 H220"
        fill="none"
        stroke="url(#heroBrand)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="220" cy="210" r="6" fill="#ff4c88" className="animate-pulse" />

      {/* doctor, bust portrait */}
      <g transform="translate(225,270)">
        {/* grounding shadow */}
        <ellipse cx="0" cy="196" rx="100" ry="14" fill="#c96a86" opacity="0.15" />

        {/* coat shoulders/torso */}
        <path
          d="M-118,196 C-118,104 -62,54 0,54 C62,54 118,104 118,196 Z"
          fill="#ffffff"
          stroke="url(#heroBrand)"
          strokeOpacity="0.35"
          strokeWidth="3"
        />
        {/* coat lapels */}
        <path d="M0,54 L-38,150 L-12,196 L0,146 Z" fill="#ffe9ee" />
        <path d="M0,54 L38,150 L12,196 L0,146 Z" fill="#ffe9ee" />
        {/* scrub collar */}
        <path d="M-24,58 L0,92 L24,58 L24,74 L0,110 L-24,74 Z" fill="url(#heroBrand)" />

        {/* stethoscope draped around the neck */}
        <path
          d="M-30,64 C-52,80 -54,118 -28,134 C-2,150 8,128 2,112"
          fill="none"
          stroke="url(#heroBrand)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="-30" cy="64" r="6" fill="url(#heroBrand)" />
        <circle cx="2" cy="112" r="11" fill="url(#heroBrand)" />
        <circle cx="2" cy="112" r="4" fill="#ffffff" />

        {/* neck + head */}
        <rect x="-16" y="8" width="32" height="38" rx="12" fill="#f3b58b" />
        <circle cx="0" cy="-24" r="58" fill="#f8c79a" />

        {/* hair */}
        <path
          d="M-58,-32 C-58,-74 -30,-84 0,-84 C30,-84 58,-74 58,-32 C58,-48 40,-42 30,-48 C18,-55 12,-66 0,-66 C-12,-66 -18,-55 -30,-48 C-40,-42 -58,-48 -58,-32 Z"
          fill="#3a2b25"
        />

        {/* friendly face */}
        <circle cx="-20" cy="-24" r="5.5" fill="#3a2b25" />
        <circle cx="20" cy="-24" r="5.5" fill="#3a2b25" />
        <path d="M-22,0 C-10,12 10,12 22,0" fill="none" stroke="#8a4a34" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}
