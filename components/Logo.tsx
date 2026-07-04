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
          <linearGradient id="mbGrad" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={ink} />
            <stop offset="55%" stopColor={dark ? '#c8bfb4' : '#4a4540'} />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {/* outer orbital ring */}
        <circle cx="48" cy="48" r="44" stroke={faint} strokeWidth="1.5" strokeDasharray="4 6">
          <animateTransform attributeName="transform" type="rotate" from="0 48 48" to="360 48 48" dur="24s" repeatCount="indefinite" />
        </circle>

        {/* orbiting node */}
        <g>
          <circle cx="48" cy="4" r="3" fill="#6366f1">
            <animate attributeName="opacity" values="1;0.4;1" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <animateTransform attributeName="transform" type="rotate" from="0 48 48" to="360 48 48" dur="12s" repeatCount="indefinite" />
        </g>

        {/* inner hex frame */}
        <path
          d="M48 14 L77 31 L77 65 L48 82 L19 65 L19 31 Z"
          stroke="url(#mbGrad)"
          strokeWidth="2"
          fill={dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)'}
        />

        {/* MB monogram */}
        <text
          x="48"
          y="59"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="30"
          letterSpacing="-2"
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
