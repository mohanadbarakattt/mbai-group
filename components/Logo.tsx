import React from 'react';

interface LogoProps {
  size?: number;
  dark?: boolean; // true = for dark backgrounds; false = for light backgrounds
  withWordmark?: boolean;
}

/**
 * MB AI Group mark (Nov 2026 refresh): an ink tile holding a geometric "MB"
 * monogram. The M is cream; the B's bowls are copper and grow out of the M's
 * right leg, so the two letters share one spine. Same coordinates as
 * public/favicon.svg and public/brand/mbai-mark.svg.
 */
export const MBMark: React.FC<{ size: number; onDark?: boolean }> = ({ size, onDark }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MB AI Group" style={{ display: 'block' }}>
    <rect width="100" height="100" rx="22" fill={onDark ? '#211c18' : '#14110f'} />
    <g fill="none" strokeWidth={8.5}>
      <path d="M24,74 V28 L41,53 L58,28 V74" stroke="#f7f3ec" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M58,28 H64 A11,11 0 0 1 64,50 H58 M58,51 H65.5 A11.5,11.5 0 0 1 65.5,74 H58" stroke="#c8683f" />
    </g>
  </svg>
);

const Logo: React.FC<LogoProps> = ({ size = 48, dark = false, withWordmark = false }) => {
  const ink = dark ? '#F5F3EF' : '#14110f';
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <MBMark size={size} onDark={dark} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display font-semibold tracking-tight" style={{ color: ink, fontSize: Math.max(15, size * 0.42) }}>
            MB AI Group
          </span>
          <span className="uppercase font-mono" style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#6b645c', fontSize: Math.max(8, size * 0.16), letterSpacing: '0.24em', marginTop: 4 }}>
            Cairo · Dubai
          </span>
        </span>
      )}
    </span>
  );
};

export default Logo;
