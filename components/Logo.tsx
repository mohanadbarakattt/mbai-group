import React from 'react';

interface LogoProps {
  size?: number;
  dark?: boolean; // true = light ink, for the site's dark background; false = near-black ink, for light backgrounds
  withWordmark?: boolean;
}

/**
 * The MB AI Group mark — a single-weight geometric "MB" monogram where the
 * M's right leg doubles as the B's stem (one shared spine, not two letters
 * bolted together). One ink color, no ring, no container: just the
 * letterforms, so it reads the same at 16px (favicon) as it does at hero
 * scale. This is the single source of truth for the mark; the static SVG/PNG
 * copies in public/ (favicons, OG image, brand/mbai-mark.svg) mirror these
 * exact path coordinates.
 */
const MBMark: React.FC<{ size: number; ink: string }> = ({ size, ink }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="MB AI Group"
    style={{ display: 'block' }}
  >
    <path d="M63.5,18 A15,15 0 0 1 63.5,48" fill="none" stroke={ink} strokeWidth={11} />
    <path d="M63.5,50 A16,16 0 0 1 63.5,82" fill="none" stroke={ink} strokeWidth={11} />
    <path
      d="M20,82 L20,18 L39,47 L58,18 L58,82"
      fill="none"
      stroke={ink}
      strokeWidth={11}
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

/** MB AI Group — unified brand mark. */
const Logo: React.FC<LogoProps> = ({ size = 48, dark = false, withWordmark = false }) => {
  const ink = dark ? '#F5F3EF' : '#0e0e0d';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <MBMark size={size} ink={ink} />

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
