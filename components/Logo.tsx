import React from 'react';

interface LogoProps {
  size?: number;
  dark?: boolean;      // dark = for use on dark backgrounds (white strokes)
  withWordmark?: boolean;
}

/**
 * MB AI Group — animated SVG monogram.
 * An orbital "neural" ring with the MB monogram, drawn as pure SVG so it
 * scales perfectly and animates (slow orbit + pulse) without any JS.
 */
const Logo: React.FC<LogoProps> = ({ size = 48, dark = false, withWordmark = false }) => {
  const ink = dark ? '#ffffff' : '#111111';
  const faint = dark ? 'rgba(255,255,255,0.35)' : 'rgba(17,17,17,0.3)';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MB AI Group logo"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="mbGrad" x1="10" y1="10" x2="86" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="45%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <radialGradient id="mbCore" cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor={dark ? 'rgba(99,102,241,0.30)' : 'rgba(255,255,255,0.85)'} />
            <stop offset="100%" stopColor={dark ? 'rgba(20,26,51,0.55)' : 'rgba(255,255,255,0.4)'} />
          </radialGradient>
          <filter id="mbGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* outer orbital ring — dashed, slow spin */}
        <circle cx="48" cy="48" r="45" fill="none" stroke={faint} strokeWidth="1.25" strokeDasharray="2 8" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 48 48" to="360 48 48" dur="30s" repeatCount="indefinite" />
        </circle>

        {/* orbiting nodes on the outer ring */}
        <g>
          <circle cx="48" cy="3" r="2.6" fill="#22d3ee">
            <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <animateTransform attributeName="transform" type="rotate" from="0 48 48" to="360 48 48" dur="14s" repeatCount="indefinite" />
        </g>
        <g>
          <circle cx="48" cy="93" r="1.8" fill="#c084fc">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <animateTransform attributeName="transform" type="rotate" from="0 48 48" to="-360 48 48" dur="20s" repeatCount="indefinite" />
        </g>

        {/* soft round core */}
        <circle cx="48" cy="48" r="33" fill="url(#mbCore)" stroke="url(#mbGrad)" strokeWidth="2.25" filter="url(#mbGlow)" />
        {/* thin inner accent ring */}
        <circle cx="48" cy="48" r="26" fill="none" stroke={dark ? 'rgba(255,255,255,0.12)' : 'rgba(17,17,17,0.12)'} strokeWidth="1" />
        {/* accent arc detail */}
        <path d="M26 60 A26 26 0 0 0 70 60" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />

        {/* MB monogram */}
        <text
          x="48"
          y="58"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="27"
          letterSpacing="-1.5"
          fill={ink}
        >
          MB
        </text>
      </svg>

      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-bold tracking-tight"
            style={{ color: ink, fontSize: size * 0.38 }}
          >
            MB AI GROUP
          </span>
          <span
            className="uppercase"
            style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6b6460', fontSize: size * 0.17, letterSpacing: '0.32em', marginTop: 3 }}
          >
            Frontier AI · MENA
          </span>
        </span>
      )}
    </span>
  );
};

export default Logo;
