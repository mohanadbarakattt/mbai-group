import React from 'react';

interface LogoProps {
  size?: number;
  dark?: boolean;      // dark = for use on dark backgrounds (light chip / bright ink)
  withWordmark?: boolean;
  /**
   * 'chip' — the shared ecosystem "solid chip" mark (rounded square, rx ratio
   *   6/22, solid fill + inverse "MB" text) matching the MbaiBadge standard
   *   used across sibling MBAI Solutions products. This is the default and
   *   should be used everywhere the brand mark appears in navigation, footers,
   *   or anywhere it needs to read as "part of the same family."
   * 'hero' — the animated orbital mark, reserved for large hero/brand-home
   *   placements where the extra motion and glow earn their keep. Its core
   *   shape now shares the same rounded-square geometry as the chip so the
   *   two variants read as one mark at different scales, not two logos.
   */
  variant?: 'chip' | 'hero';
}

/** Ratio shared with MbaiBadge (rx=6 on a 22-unit square) so every product renders the same silhouette. */
const CHIP_RX_RATIO = 6 / 22;

/**
 * The mark: three ascending peaks (frontier — and a nod to Cairo's skyline)
 * tipped by a small signal dot (the "AI"), on a 22-unit grid. Shared by the
 * chip and hero variants below at different scales.
 */
const Peaks: React.FC<{ ink: string; dot: string }> = ({ ink, dot }) => (
  <>
    <polygon points="3.8,16.8 8.2,16.8 6.0,12.2" fill={ink} />
    <polygon points="8.6,16.8 13.4,16.8 11.0,9.4" fill={ink} />
    <polygon points="13.8,16.8 18.2,16.8 16.0,6.0" fill={ink} />
    <circle cx="16" cy="4.4" r="1.15" fill={dot} />
  </>
);

const ChipMark: React.FC<{ size: number; dark: boolean }> = ({ size, dark }) => {
  // dark=true → chip sits on the site's dark navy pages, so the chip itself
  // needs a light, warm ivory fill to read against it (navy-on-navy would
  // vanish). dark=false → chip sits on a light page, so it flips to a solid
  // navy fill instead. Same peaks-and-signal silhouette either way.
  const fill = dark ? '#f2ede1' : '#0b1022';
  const ink = dark ? '#12182c' : '#f2ede1';
  const dot = dark ? '#c9852f' : '#22d3ee';
  const rx = 22 * CHIP_RX_RATIO;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MB AI Group logo"
      style={{ display: 'block' }}
    >
      <rect x="0" y="0" width="22" height="22" rx={rx} fill={fill} />
      <Peaks ink={ink} dot={dot} />
    </svg>
  );
};

const HeroMark: React.FC<{ size: number; dark: boolean }> = ({ size, dark }) => {
  const faint = dark ? 'rgba(255,255,255,0.35)' : 'rgba(17,17,17,0.3)';
  const fill = dark ? '#f2ede1' : '#0b1022';
  const ink = dark ? '#12182c' : '#f2ede1';
  const dot = dark ? '#c9852f' : '#22d3ee';
  // Same rx ratio as the chip, scaled to the 66-unit core square used here.
  const coreRx = 66 * CHIP_RX_RATIO;

  return (
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
          <stop offset="0%" stopColor="#f4cd7c" />
          <stop offset="55%" stopColor="#e3a83f" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
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
        <circle cx="48" cy="93" r="1.8" fill="#f4cd7c">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <animateTransform attributeName="transform" type="rotate" from="0 48 48" to="-360 48 48" dur="20s" repeatCount="indefinite" />
      </g>

      {/* Core — the same solid rounded-square "chip" as ChipMark, just bigger,
          with the gradient ring + glow as the hero-only flourish. */}
      <rect x="15" y="15" width="66" height="66" rx={coreRx} fill={fill} stroke="url(#mbGrad)" strokeWidth="2.25" filter="url(#mbGlow)" />
      <g transform="translate(15 15) scale(3)">
        <Peaks ink={ink} dot={dot} />
      </g>
    </svg>
  );
};

/**
 * MB AI Group — unified brand mark.
 * Defaults to the shared ecosystem "chip" silhouette (see ChipMark); pass
 * `variant="hero"` for the animated orbital treatment on large hero placements.
 */
const Logo: React.FC<LogoProps> = ({ size = 48, dark = false, withWordmark = false, variant = 'chip' }) => {
  const ink = dark ? '#ffffff' : '#111111';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {variant === 'hero' ? <HeroMark size={size} dark={dark} /> : <ChipMark size={size} dark={dark} />}

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
