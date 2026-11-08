import React, { useId } from 'react';

interface LogoProps {
  size?: number;
  dark?: boolean; // true = for dark backgrounds
  withWordmark?: boolean;
}

/**
 * MB AI Group mark (Nov 2026): two faceted pyramids that overlap into an "M"
 * (ink for Cairo, copper for Dubai), with a four-point spark above the valley.
 * Mirrors public/favicon.svg and public/brand/mbai-mark.svg.
 */
export const MBMark: React.FC<{ size: number }> = ({ size }) => {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MB AI Group" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8a07a" /><stop offset="1" stopColor="#9a4a2c" /></linearGradient>
        <linearGradient id={`${id}b`} x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a342e" /><stop offset="1" stopColor="#14110f" /></linearGradient>
      </defs>
      <path d="M14,80 L36,30 L58,80 Z" fill={`url(#${id}b)`} />
      <path d="M42,80 L64,30 L86,80 Z" fill={`url(#${id}a)`} />
      <path d="M42,80 L50,61.8 L58,80 Z" fill="#f7f3ec" fillOpacity={0.55} />
      <path d="M36,30 L36,80" stroke="#f7f3ec" strokeOpacity={0.18} strokeWidth={1.2} />
      <path d="M64,30 L64,80" stroke="#fff" strokeOpacity={0.35} strokeWidth={1.2} />
      <path d="M50,12 L52.2,19.8 L60,22 L52.2,24.2 L50,32 L47.8,24.2 L40,22 L47.8,19.8 Z" fill="#c8683f" />
    </svg>
  );
};

const Logo: React.FC<LogoProps> = ({ size = 40, dark = false, withWordmark = false }) => {
  const ink = dark ? '#F5F3EF' : '#14110f';
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <MBMark size={size} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display font-semibold tracking-tight" style={{ color: ink, fontSize: Math.max(15, size * 0.44) }}>MB AI Group</span>
          <span className="uppercase font-mono" style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#8a8278', fontSize: Math.max(8, size * 0.2), letterSpacing: '0.26em', marginTop: 4 }}>Cairo · Dubai</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
